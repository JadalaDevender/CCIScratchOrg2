({
    handleClick : function(component, event, helper) {
        var compEvent = component.getEvent("sampleComponentEvent");
         compEvent.setParams({"message" : "Static Text" });
         compEvent.fire();

    }
})