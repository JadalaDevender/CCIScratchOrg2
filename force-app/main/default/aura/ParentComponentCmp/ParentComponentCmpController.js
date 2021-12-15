({
    handleComponentEvent : function(component, event, helper) {
        const valueFromChild1 = event.getParam("Fname");
        const valueFromChild2 = event.getParam("Lname");
        const valueFromChild3 = event.getParam("Phone");
        const valueFromChild4 = event.getParam("Email");
       // alert(valueFromChild)
        component.set("v.FirstName", valueFromChild1);
        component.set("v.LastName", valueFromChild2);
        component.set("v.Phone", valueFromChild3);
        component.set("v.Email", valueFromChild4);
    }
})