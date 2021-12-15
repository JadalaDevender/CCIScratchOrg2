trigger CaseCreateNotiToUser on Case (After insert) {
    List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();
    List<String> sendTo = new List<String>();
    String userName = UserInfo.getUserName();
    User activeUser = [Select Email From User where Username = : userName limit 1];
    system.debug('active user===>'+activeUser);
    String userEmail = activeUser.Email;
    
    sendTo.add(userEmail);
    for(Case cases : trigger.new){
        string caseNum= cases.CaseNumber;
        Messaging.SingleEmailMessage mail =  new Messaging.SingleEmailMessage();
        mail.setToAddresses(sendTo);
        mail.setSubject('Case is Created  for Record ID:'+ caseNum);
        string body = 'A Case was created, Subject'+cases.Subject;
        String messageBody ='Your case:<b> ' + cases.Id +' </b>has been created.<p>'+
            'To view your case <a href=https://na1.salesforce.com/'+case.Id+'>click here.</a>';
        mail.setHtmlBody(messageBody);
        mails.add(mail);
    }
    Messaging.sendEmail(mails);
    
}