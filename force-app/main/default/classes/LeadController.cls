public with sharing class LeadController {
    @AuraEnabled(cacheable=true)
    public static List<Lead> LeadList() {
        return [
            SELECT Id,Name,Company,Email,Phone
            FROM Lead
            WITH SECURITY_ENFORCED
        ];

    }
}