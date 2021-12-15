public class EmailToCaseHandller implements Messaging.InboundEmailHandler 
{
    
    Protected Case theCase = null;
    public Messaging.InboundEmailResult  handleInboundEmail(Messaging.inboundEmail email, Messaging.InboundEnvelope env){
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
        List<Case> lstOfCasesToBeInserted = new  List<Case>();
        String myPlainText= '';
        myPlainText = email.plainTextBody;
            
            //get The Contact using Email
            Contact vCon = [SELECT Id, Name, Email FROM Contact WHERE Email = :email.fromAddress LIMIT 1];
            //Case Creation
            this.theCase = new Case();
            theCase.Description =  myPlainText;
            theCase.Priority = 'Normal';
            theCase.Status = 'Open';
            theCase.Subject = email.subject;
            theCase.ContactId = vCon.id;
           // theCase.Source_System__c = 'CTC';
            //theCase.RecordTypeId = recordTypeId;
            theCase.Origin = email.fromName;
          //  theCase.OwnerId = grpId;
            insert theCase;
            //To Show Email and Attachments
           // createEmailMessage(theCase,email);
            handleAttachments(theCase, email);
       
        result.success = true;
       
        return result;
    }
   
    private void handleAttachments(Case theCase, Messaging.InboundEmail email) {
        if(email.textAttachments!=null && email.textAttachments.size() >0) {
            List<ContentVersion> cvTextList = new List<ContentVersion>();
            List<ContentDocumentLink> cdlTextList = new List<ContentDocumentLink>();
            for (Messaging.InboundEmail.TextAttachment tAttachment : email.textAttachments) {
                ContentVersion textContentInsert = new ContentVersion();
                textContentInsert.Title = tAttachment.fileName;
                textContentInsert.VersionData = Blob.valueOf(tAttachment.body);
                textContentInsert.PathOnClient = '/' + tAttachment.fileName ;
                cvTextList.add(textContentInsert);
            }
            insert cvTextList;
            cvTextList = [select id, ContentDocumentId from ContentVersion WHERE Id in :cvTextList];
            for (ContentVersion cv : cvTextList) {
                ContentDocumentLink cl = new ContentDocumentLink();
                cl.ContentDocumentId = cv.ContentDocumentId;
                cl.LinkedEntityId = theCase.Id; //Shared with record ID
                cl.ShareType = 'V';
                cl.Visibility = 'AllUsers';
                cdlTextList.add(cl);
            }
            insert cdlTextList;
        }
        if(email.binaryAttachments!=null && email.binaryAttachments.size() >0) {
            List<ContentVersion> cvBinaryList = new List<ContentVersion>();
            List<ContentDocumentLink> cdlBinaryList = new List<ContentDocumentLink>();
            for (Messaging.InboundEmail.BinaryAttachment binAttach : email.binaryAttachments) {
                ContentVersion binaryContentInsert = new ContentVersion();
                binaryContentInsert.Title = binAttach.fileName;
                binaryContentInsert.VersionData = binAttach.body;
                binaryContentInsert.PathOnClient = '/' + binAttach.fileName;
                cvBinaryList.add(binaryContentInsert);
            }
            insert cvBinaryList;
            cvBinaryList = [select id, ContentDocumentId from ContentVersion WHERE Id in :cvBinaryList];
            for (ContentVersion cv : cvBinaryList) {
                ContentDocumentLink cl = new ContentDocumentLink();
                cl.ContentDocumentId = cv.ContentDocumentId;
                cl.LinkedEntityId = theCase.Id; //Shared with record ID
                cl.ShareType = 'V';
                cl.Visibility = 'AllUsers';
                cdlBinaryList.add(cl);
            }
            insert cdlBinaryList;
        }
    }
}