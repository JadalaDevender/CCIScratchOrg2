public with sharing class ContactController {
    @AuraEnabled
    public static Contact getContact() {
        return [select Id, Name from Contact Limit 1];
    }
}