public with sharing class AccountControllers {
 
    @AuraEnabled( cacheable = true )
    public static List< InstaShare__c > fetchAccounts() {
     
        return [ SELECT Id, Name, Email__c, Status__c
                   FROM InstaShare__c
                  LIMIT 100 ];
         
    }
     
}