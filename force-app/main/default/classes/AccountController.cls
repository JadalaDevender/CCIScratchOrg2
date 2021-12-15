public with sharing class AccountController {
 
    @AuraEnabled( cacheable = true )
    public static List< Account > fetchAccounts() {
     
        return [SELECT Id, Name, Industry FROM Account LIMIT 10 ];
         
    }

    @AuraEnabled
    public static string updateAccounts( Object data ) {
        
        List < Account > accsForUpdate = ( List < Account > ) JSON.deserialize(
            JSON.serialize( data ),
            List < Account >.class
        );
        try {
            update accsForUpdate;
            return 'Success: Account(s) updated successfully';
        }
        catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }

    }
     
}