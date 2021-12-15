public class FieldSetHandler {
    
    @AuraEnabled
    public static String getJSONFieldSet(String sObjectName,String sFieldSetName){
        String sFieldSet='';
        sFieldSet=getFieldSet(sObjectName,sFieldSetName);
        return sFieldSet;
    }    
 	
    public static String getFieldSet(String sObjectName,String fieldSetName) {
        String result = '';
        try{
            SObjectType objToken = Schema.getGlobalDescribe().get(sObjectName);
            Schema.DescribeSObjectResult d = objToken.getDescribe();
            Map<String, Schema.FieldSet> FsMap = d.fieldSets.getMap();
            system.debug('>>>>>>> FsMap >>> ' + FsMap);
            if(FsMap.containsKey(fieldSetName))
                for(Schema.FieldSetMember f : FsMap.get(fieldSetName).getFields()) {
                     
                    if(result != ''){
                        result += ',';
                    }
                    String jsonPart = '{';
                    jsonPart += '"helpText":"' + gethelpText(sObjectName,f.getLabel()) + '",';
                    jsonPart += '"required":"' + (f.getDBRequired() || f.getRequired()) + '",';
                    jsonPart += '"type":"' + (f.getType()) + '",';
                    jsonPart += '"label":"' + (f.getLabel()) + '",';
                    jsonPart += '"name":"' + f.getFieldPath() + '"';
                    jsonPart += '}';
                    result += jsonPart;
                }
        }
        catch(Exception e){
            result += e.getLineNumber() + ' : ' + e.getMessage();
        }
        return '['+result+']';
    }
    
    public static string gethelpText(String sObjectName,String sField){
        String helptext='';
        String[] types = new String[]{sObjectName};
            List<Schema.DescribeSobjectResult> results = Schema.describeSObjects(types);
        for (Schema.DescribeSobjectResult result : results) {
            Map<String, Schema.SObjectField> fieldMap = result.fields.getMap();
            for(String fieldName :  fieldMap.keySet()){
                Schema.SObjectField field = fieldMap.get(fieldName);
                Schema.DescribeFieldResult f = field.getDescribe();
                if(f.getLabel()==sField){helptext=f.getInlineHelpText();
                    if(helptext==null)helptext=f.getLabel();
                }
            }
        }
        return helptext;
    }
}