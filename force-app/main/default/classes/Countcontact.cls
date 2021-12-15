public class Countcontact {
    public static void countcontacts(List<contact> newcontact,List<contact> oldcontact){
     
        set<id> accids= new set<id>();
                try{
        if(newcontact !=null){
            for(Contact c:newcontact){
                if(c.AccountId!=null){
                accids.add(c.accountid);
                }
            }      
       }if(oldcontact!=null){
            for(Contact c:oldcontact){
                accids.add(c.accountid);
            }
       }
     List<Account> acc = [Select id, Count__c,(Select id from Contacts) from Account where id IN: accids];
        if(acc!=null){
        for(Account accValue:acc){
            accValue.Count__c = accValue.Contacts.size();
        } 
        }
        if(!acc.isempty()){
        update acc;
        }
        }
        catch(exception e){
            System.debug('Get Message'+e.getMessage());
        }
    } 
}