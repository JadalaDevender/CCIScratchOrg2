public class EmailToContactAttachments implements Messaging.InboundEmailHandler  {
    //  Protected Case cas = null;
    private static final Integer MEGA_BYTE_BYTE_SIZE = 1048576;
    private static final Decimal MAX_ATTACHMENT_SIZE = 240.99;// Give soem wiggle room.
    public Messaging.InboundEmailResult  handleInboundEmail(Messaging.inboundEmail email, Messaging.InboundEnvelope env){
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
        List<Case> lstOfCasesToBeInserted = new  List<Case>();
        String myPlainText= '';
        myPlainText = email.plainTextBody;
        
        //get The Contact using Email
        Contact Con1 = [SELECT Id, Name, Email FROM Contact WHERE Email = :email.fromAddress LIMIT 1];
        system.debug('Con1--->' +Con1);
        //Case Creation
        Case cas = new Case();
        cas.Description =  myPlainText;
        cas.Priority = 'High';
        cas.Status = 'Closed';
        cas.Subject = email.subject;
        cas.ContactId = Con1.id;
        cas.Origin = email.fromName;
        insert cas;
        system.debug('cas--->' +cas);
        insertNewAttachments(cas, email);
        result.success = true;
        
        return result;
        
    }
    
    
    
    private void insertNewAttachments(Case cas, Messaging.InboundEmail email)
    {
        List<String> largeFileNames = new List<String>();
        List<Attachment> docList = new List<Attachment>();
        if(email.binaryAttachments != null){
            for(Messaging.Inboundemail.Binaryattachment att : email.binaryAttachments)
            {
                Attachment doc = new Attachment
                    (
                        ParentId = cas.Id,
                        Body = att.body,
                        Name = att.fileName
                    );
                if( (att.body.size() / MEGA_BYTE_BYTE_SIZE) < MAX_ATTACHMENT_SIZE )
                {
                    docList.add( doc );
                }
                
                else
                {
                    largeFileNames.add( att.fileName );
                }
                system.debug('doc--->' +doc);
            }
        }
        if(email.textAttachments != null)
        {
            for(Messaging.Inboundemail.TextAttachment att : email.textAttachments)
            {
                Attachment doc = new Attachment
                    (
                        ParentId = cas.Id,
                        Body = Blob.valueOf( att.body ),
                        Name = att.fileName
                    );
                if( (att.body.length() / MEGA_BYTE_BYTE_SIZE) < MAX_ATTACHMENT_SIZE )
                {
                    docList.add( doc );
                }
                else
                {
                    largeFileNames.add( att.fileName );
                }
                system.debug('doc--->' +doc);
                
            }
        }
        insert docList;
        system.debug('docList--->' +docList);
        
    }
}