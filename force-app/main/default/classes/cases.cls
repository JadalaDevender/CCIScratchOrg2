public with sharing class cases {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases() {
        List<Case> gatewaylis= [
            SELECT Id,CaseNumber,Status,Subject,Priority
            FROM Case
            WITH SECURITY_ENFORCED
        ];
        return gatewaylis;
        
        
    }
}