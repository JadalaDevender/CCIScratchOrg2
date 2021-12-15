trigger AccountToContact on Account (after insert,after update) {
    /*Map<Id,Account> getaccountid =new Map<Id,Account>();
    for(account a:trigger.new)
    {
        getaccountid.put(a.Id,a);
    }
    list<contact> c=[select id,accountid from contact where accountid in:getaccountid.keyset()];
    list<contact> updatecontact =new list<contact>();
    for(contact c1:c)
    {
        Account acc= getaccountid.get(c1.accountId);
        c1.MailingStreet=acc.BillingStreet;
        updatecontact.add(c1);
    }
    update updatecontact; */
    
    
}