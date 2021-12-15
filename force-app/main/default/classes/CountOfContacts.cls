public class CountOfContacts implements Database.Batchable<SObject> 
{
     public Database.QueryLocator start(Database.BatchableContext context) 
     {
        return Database.getQueryLocator([select Id from Account order by Name]);
     }
      public void execute(Database.BatchableContext context, List<Account> scope) 
      {
        List<Account> updateAccList = new List<Account>();
        for (Account acc : [SELECT Id,(SELECT Id FROM Contacts) FROM Account WHERE Id in :scope])
        {
            acc.No_Of_Contacts__c = acc.contacts.size();
           
            updateAccList.add(acc);
        }
        if(updateAccList.size()>0){
            update updateAccList ;
        }
    }

    public void finish(Database.BatchableContext context) {
    }
}