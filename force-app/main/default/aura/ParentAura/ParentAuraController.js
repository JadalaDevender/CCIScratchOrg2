/* parentExprController.js */
({
    doInit : function(component, event, helper) {
        var valueFromChild = event.getParam("message");
        alert(valueFromChild)
        component.set("v.enteredValue", valueFromChild);
    }
})