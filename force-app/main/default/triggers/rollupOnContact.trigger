trigger rollupOnContact on Contact (after insert, after update, after delete, after undelete) {
    
    if(Trigger.isinsert || Trigger.isupdate || trigger.isdelete || Trigger.isundelete){
       
        Countcontact.Countcontacts(trigger.new,trigger.old);
        
    }
}