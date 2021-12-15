public with sharing class datess {
    @AuraEnabled(cacheable=true)
    public static List<Task> dateLists(Date date1,Date date2) {
        List<Task> gatewaylis= [
            SELECT Id,Subject,Priority,Status,ActivityDate
            FROM Task WHERE ActivityDate > :date1 AND ActivityDate < :date2
            ];
        return gatewaylis;
        
    } 
    }