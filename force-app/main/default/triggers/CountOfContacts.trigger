trigger CountOfContacts on Contact (after INSERT, after UPDATE, after DELETE)
{
    Map<Id, List<Contact>> AcctContactList = new Map<Id, List<Contact>>();
    Set<Id> AcctIds = new Set<Id>();   
    List<schema.Account> AcctList = new List<schema.Account>();
    List<schema.Contact> ConList = new List<schema.Contact>();
   
    if(trigger.isInsert || trigger.isUPdate) {
        for(Contact Con : trigger.New) {
            if(String.isNotBlank(Con.AccountId)){
                AcctIds.add(Con.AccountId); 
            }  
        } 
    }
   
    if(trigger.isDelete) {
        for(Contact Con : trigger.Old) {
            AcctIds.add(Con.AccountId);    
        } 
    }          
   
    if(AcctIds.size() > 0){
        ConList = [SELECT Id, AccountId FROM Contact WHERE AccountId IN : AcctIds];
       
        for(Contact Con : ConList) {
            if(!AcctContactList.containsKey(Con.AccountId)){
                AcctContactList.put(Con.AccountId, new List<Contact>());
            }
            AcctContactList.get(Con.AccountId).add(Con);     
        }                          
      
           
        AcctList = [SELECT Count__c FROM Account WHERE Id IN : AcctIds];
        for(Account Acc : AcctList) {
            List<schema.Contact> ContList = new List<schema.Contact>();
            ContList = AcctContactList.get(Acc.Id);
            Acc.Count__c = ContList.size();
        }   
       
      
        update AcctList;   
    }

}