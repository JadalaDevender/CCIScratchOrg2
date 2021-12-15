public with sharing class TaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task> taskLists(Date date1, Date date2) {
     
            List<Task> gatewaylis= [
            SELECT Id,Subject,Priority,Status,ActivityDate
            FROM Task WHERE ActivityDate > :date1 AND ActivityDate < :date2
            ];
        return gatewaylis;
        
        
    }
    @AuraEnabled (cacheable=true)
    public static List<Task> dateLists() {
        List<Task> gatewaylis= [
            SELECT Id,Subject,Priority,Status,ActivityDate
            FROM Task 
            ];
        return gatewaylis;
    
       }
        

    
  
    
    @AuraEnabled
    public static string updateTask( Object data ) {
        
        List < Task > taskForUpdate = ( List < Task > ) JSON.deserialize(
            JSON.serialize( data ),
            List < Task >.class
        );
        try {
            update taskForUpdate;
            return 'Success: Task(s) updated successfully';
        }
        catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }

    }
}