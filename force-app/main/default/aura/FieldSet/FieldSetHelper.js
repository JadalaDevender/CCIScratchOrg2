({
    getFieldSet :function(component){
        var action = component.get("c.getJSONFieldSet");
        action.setParams({
            "sObjectName":"Contact",
            "sFieldSetName":"AuraBaseFieldSet"
        })
        action.setCallback(this, function(response) {            
            if(response.getState()=="SUCCESS"){
                var fieldSetObj = JSON.parse(response.getReturnValue());                
                component.set("v.fieldSetValues", fieldSetObj);
                console.log('get fieldset=>'+JSON.stringify(fieldSetObj));
            }
            else{
                console.log(response.getError());
            }
        })
        $A.enqueueAction(action);
    }
})