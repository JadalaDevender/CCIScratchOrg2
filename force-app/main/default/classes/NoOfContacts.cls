public class NoOfContacts implements Database.Batchable <sObject> {
 public Database.QueryLocator start(Database.BatchableContext info){
        String SOQL='SELECT Id, NumberOfEmployees,(SELECT Id FROM Contacts) FROM Account';
        return Database.getQueryLocator(SOQL);
    }
    public void execute(Database.BatchableContext info, List<Account> scope){
        List<Account> accListToUpdate = new List<Account>();
        List<Contact> conList = new List<Contact>();
        List<Contact> conListToUpdate = new List<Contact>();
        for(Account accObj : scope)
        {
            accObj.No_Of_Contacts__c = accObj.contacts.size();
            accListToUpdate.add(accObj);
            conList.addAll(accObj.contacts);
        }
         for (Contact conObj : conList){
             conListToUpdate.add(conObj);
            }
        // Here we are cheking conListToUpdate is not empty and then Update it
        if(!conListToUpdate.isEmpty()){
            Database.update(conListToUpdate);
        }
        //Here we are cheking accListToUpdate is not empty and then Update it
        if(!accListToUpdate.isEmpty()){
            Database.update(accListToUpdate);
        }
    }
    public void finish(Database.BatchableContext info){
    }
}