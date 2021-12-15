trigger AccountAddressTrigger on Account (before insert, before update) {
    
 List<Account> acc=[select Id,Name,Match_Billing_Address__c,ShippingAddress,BillingAddress From Account];
    
}