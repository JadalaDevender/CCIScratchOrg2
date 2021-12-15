trigger LeadToAccountContact on Lead (before insert,after update, before Update){
    
    List<Contact> conInsertList = new List<Contact>();
    List<Account> accounttList = new List<Account>();
    
    if((Trigger.isInsert || Trigger.isUpdate ) && Trigger.isBefore)
    {
        for(Lead ld : Trigger.new) {
            
            Contact cnt = new Contact();
            cnt.FirstName = ld.FirstName;
            cnt.LastName =  ld.LastName;
            cnt.Phone=ld.Phone;
            cnt.Email=ld.Email;
            conInsertList.add(cnt);
            
            Account acc= new Account();
            acc.Phone=ld.Phone;
            acc.BillingCity=ld.City;
            acc.ShippingCountry=ld.Email;
            acc.Name=ld.Company;
            accounttList.add(acc);
            
            
            List<Lead> recordList=[SELECT FirstName,LastName,Email from Lead Where FirstName=:ld.FirstName OR LastName=:ld.LastName OR Email=:ld.Email];
            if(recordList.size()>0)
            {    
                ld.addError('Same Lead Type Alrdy Exist!!!! Check Email or Name') ;
            }
            
            INSERT conInsertList;
            UPDATE conInsertList;
            INSERT accounttList;
            UPDATE accounttList;     
        }
    }    
}