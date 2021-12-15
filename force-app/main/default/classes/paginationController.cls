public class paginationController {
    @AuraEnabled
    public static  List<Account> getAccounts(Integer pageSize, Integer pageNumber){
        Integer offset = (pageNumber - 1) * pageSize;
        List<Account> accList = new List<Account>();
        accList = [SELECT Id, Name, AccountNumber, Industry, Phone FROM Account LIMIT :pageSize OFFSET :offset];
      
        if(accList != null && accList.size()>0){
            return accList;
        }
        else{
            return null;
        }
    }
     
    //Delete Account
    @AuraEnabled
    public static void delAccount(Account accountRec){
        delete accountRec;
    }
    @AuraEnabled
    public static void updateAccount(List<Account> acc ){
        update acc;
    }
}