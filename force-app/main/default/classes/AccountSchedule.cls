public class AccountSchedule implements Schedulable{
    public void execute(SchedulableContext sc){
        List<Account> lstAccount = new List<Account>();
        for(Account objAccount : [SELECT Type FROM Account WHERE Type != 'Customer - Direct' ORDER BY CreatedDate LIMIT 5]){
            objAccount.Type = 'Customer - Direct';
            lstAccount.add(objAccount);
        }
        update lstAccount;
    }
}