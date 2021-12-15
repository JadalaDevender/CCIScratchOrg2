public class DataTableExampleController {
    
    @AuraEnabled
    public static DataTableDetails getDataTableDetails(String objApi, String fieldSetName){
        DataTableDetails dataTableDtls = new DataTableDetails();
        List<FieldSetExample.FieldSetProperties> lstOfFieldSetProperties = FieldSetExample.getFieldFromFieldSet(objApi, fieldSetName);
        
        if(lstOfFieldSetProperties != null && lstOfFieldSetProperties.size() > 0){
            String strQuery = 'SELECT ';
            for(FieldSetExample.FieldSetProperties inst : lstOfFieldSetProperties){
                dataTableDtls.lstOfFieldLabels.add(inst);
                
                strQuery = strQuery + inst.fieldName + ',';
            }
            if(!strQuery.equalsIgnoreCase('SELECT '))
                strQuery = strQuery + 'Id FROM ' + objApi;
            
            dataTableDtls.lstOfSObjs = Database.query(strQuery);
        }
        
     return dataTableDtls;
    }
    
    
    public class DataTableDetails{
        @AuraEnabled
        public List<sObject> lstOfSObjs = new List<sObject>();
        @AuraEnabled
        public List<FieldSetExample.FieldSetProperties> lstOfFieldLabels = new List<FieldSetExample.FieldSetProperties>();
    }
}