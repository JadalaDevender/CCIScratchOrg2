@isTest
public class LeadDuplicatesFieldsTest {
    @isTest
     public static void firstTestCase(){
        Test.startTest();
        try{
            Lead recordList =new Lead();
            recordList.FirstName='abc';
            recordList.LastName='xyz';
            recordList.Email='abc@xyz.com';
            insert recordList;
        }
        catch(Exception ex){
            ex.getMessage();
        }
         Test.stopTest();
         //System.assertEquals( true,[SELECT FirstName,LastName,Email from Lead] );
    }
    @isTest public static void seondTestCase(){
        Test.startTest();
        String message;
        try{
            Lead teamMemberList=new Lead();
            teamMemberList.FirstName='neelu';
            teamMemberList.LastName='kani';
            teamMemberList.Email='neelima@gmail.net';
          List<Lead> listlead=new List<Lead>();
            listlead.add(teamMemberList);
             listlead.add(teamMemberList);
            insert listlead;
        }
        catch(Exception ex){
            message=ex.getMessage();
        }
        Test.stopTest();
        System.assertEquals('Same Lead Type Alrdy Exist!!!!', message);
    }
}