public class GlobalDescribe {
    public static void Describe()
    {
List<String> flds = new List<String>{'name','id','phone','accountnumber'};  
  List<sobject> recs = [select name, id, phone, accountnumber from account limit 10];
  SObjectType objToken = Schema.getGlobalDescribe().get('Account'); 
  DescribeSObjectResult objDef = objToken.getDescribe();
  Map<String, SObjectField> fields = objDef.fields.getMap();

  String newname = '';

  for (sObject rec: recs){
   if (rec.get('Name') != 'auto'|| rec.get('Name') != 'auto-name'){
       for (Integer f=0; f< flds.size();f++){
          newname = newname+fields.get(flds[f])+'||';
          }
       system.debug(newname);
       rec.put('Name',+newname); 
    }
  } 
  
  update recs;
}
}