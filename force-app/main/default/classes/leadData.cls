public with sharing class leadData {
    @AuraEnabled(cacheable=true)
    public static List<Lead> leadLists() {
        List<Lead> leadlis= [
            SELECT Id,Name,  Email,Phone
            FROM Lead
            WITH SECURITY_ENFORCED
        ];
        return leadlis;
        
        //throw new AuraHandledException('Forced error');
    }
    @AuraEnabled
      Public static Map<String,Id> doConvert(String leadId){
          System.debug('doConvert LeadId: ' + leadId);
          Map<String,Id> mapResult = new Map<String,Id>();
          Database.LeadConvert lc = new database.LeadConvert();
          lc.setLeadId(leadId);
          lc.setDoNotCreateOpportunity(True);
          LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
          System.debug('doConvert ConvertStatus: ' + convertStatus);
          lc.setConvertedStatus(convertStatus.MasterLabel);
          Database.LeadConvertResult lcr = Database.convertLead(lc);
          System.debug('doConvert LeadConvertResult: ' + lcr);
          id accountId = lcr.getAccountId();
          id contactId = lcr.getcontactId();
          mapResult.put('accountId', accountId);
          mapResult.put('contactId', contactId);
          System.debug('doConvert AccountId Result: ' + accountId);
          System.debug('doConvert ContactId Result: ' + contactId);
          return mapResult;
       }
}