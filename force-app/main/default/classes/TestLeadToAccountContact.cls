@isTest()
public class TestLeadToAccountContact {
    @isTest
    public static void firstTestCase(){
        Test.startTest();
        try{
            Lead recordList =new Lead();
            recordList.FirstName='abc';
            recordList.LastName='xyz';
            recordList.Email='abc@xyz.com';
            recordList.Phone='9182';
            insert recordList;
            
            Lead recordList1 =new Lead();
            recordList.FirstName='abc1';
            recordList.LastName='xyz1';
            recordList.Email='abc@xyz1.com';
            recordList.Phone='91821';
            UPDATE recordList;
        }
        catch(Exception ex){
           // ex.getMessage();
        }
        Test.stopTest();
       // System.assertEquals( true,[SELECT FirstName,LastName,Email from Lead] );
    }
    @isTest public static void seondTestCase(){
        Test.startTest();
        try{
            Lead teamMemberList=new Lead();
            teamMemberList.FirstName='neelu';
            teamMemberList.LastName='kani';
            teamMemberList.Email='neelima@gmail.net';
            teamMemberList.Phone='91821';
            List<Lead> listlead=new List<Lead>();
            listlead.add(teamMemberList);
            listlead.add(teamMemberList);
            insert listlead;
            UPDATE listlead;
            System.assert(False,'Same Lead Type Alrdy Exist!!!!');
         
        }
        catch(Exception ex){
            //message=ex.getMessage();
           
        }
        Test.stopTest();
        
       
    }
    
    
}