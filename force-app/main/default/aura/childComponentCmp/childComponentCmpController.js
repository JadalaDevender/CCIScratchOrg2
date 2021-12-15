({
    handleClick : function(component, event, helper) {
        var compEvent = component.getEvent("sampleComponentEvent");
        compEvent.setParams({
            "Fname" : component.get("v.enteredFname") ,
            "Lname" : component.get("v.enteredLname") ,
            "Phone" : component.get("v.enteredPhone") ,
            "Email" : component.get("v.enteredEmail") 
        });
        compEvent.fire();
        
    }
})