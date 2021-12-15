public class ContactListCompController
{
    @auraEnabled
    public static list<emailTemplate> getEmailTemplate() {
        list<emailTemplate>lstEmailTemplate= [select id,name,foldername from emailTemplate  where isactive=true and folder.name = 'SampleFolder'];
        return lstEmailTemplate;
    }
     
    @auraEnabled
    public static emailTemplateWrapper getEmailBodyfromApex(string emailTemplateId,string recordId) {
        Case c = [Select AccountId from Case where id = :recordId];
        emailTemplateWrapper objemailTemplateWrapper = new emailTemplateWrapper();
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail = Messaging.renderStoredEmailTemplate(emailTemplateId, userinfo.getUserId(), c.AccountId);
         
        objemailTemplateWrapper.emailSubject = mail.getSubject();
        string emailhtmlBody=mail.getHtmlBody();
        string emailtextBody=mail.getPlainTextBody(); 
        if(string.isNotBlank(emailhtmlBody))
            objemailTemplateWrapper.emailBody = emailhtmlBody;
        else {
           string replaceStr= emailtextBody.replace('\n', '<br/>');
           objemailTemplateWrapper.emailBody =replaceStr;
        }
        return objemailTemplateWrapper;        
    }
     
    public class emailTemplateWrapper {
        @auraenabled public string emailSubject;
        @auraenabled public string emailBody;        
    }
}