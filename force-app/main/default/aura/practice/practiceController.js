({
    
    handleChange: function (component, event) {
        alert(event.getParam('value'));
        var selectedOptionValue = event.getParam("value");
        alert("Option selected with value: '" + selectedOptionValue.toString() + "'");
    },
    handleCreateLoad: function (cmp, event, helper) {
        var nameFieldValue = cmp.find("nameField").set("v.value", "My New Account");
    },
    handleSubmit: function(component, event, helper) {
        event.preventDefault();
        const fields = event.getParam('fields');
        fields.ContactId = component.get("v.recordId");
        component.find('recordEditForm').submit(fields);
    },
    
    handleSuccess : function(component,event,helper) {
        // Return to the contact page and
        // display the new case under the case related list
        var record = event.getParams();  
        console.log(record.id);
    
        var navService = component.find("navService");        
        var pageReference = {
            "type": 'standard__recordPage',         
            "attributes": {              
                "recordId": component.get("v.recordId"),
                "actionName": "view",               
                "objectApiName":"Contact"              
            }        
        };
                
        component.set("v.pageReference", pageReference);
            
        var pageReference = component.get("v.pageReference");
        navService.navigate(pageReference); 
    },
    handleSubmit : function(cmp, event, helper) {
        event.preventDefault();       // stop the form from submitting
        const fields = event.getParam('fields');
        fields.LastName = 'My Custom Last Name'; // modify a field
        cmp.find('myRecordForm').submit(fields);
    }

    
})