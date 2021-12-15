({
    getEmailBody:  function(component, event, helper) {
        debugger;
        var action = component.get('c.getEmailBodyfromApex'); 
        var selectedTemplateId =  component.get("v.selectedTemplateId");
        var recordId =  component.get("v.recordId");
        var self=this;
         
        action.setParams({
            "emailTemplateId" :selectedTemplateId,
            "recordId":recordId
        });
         
        action.setCallback(this, function(a){
            debugger;
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                component.set('v.templateBody', a.getReturnValue());
                self.callQuickAction(component, event, helper);
            }
        });
        $A.enqueueAction(action);
         
    },
     
    callQuickAction:function(component, event, helper) {
        var recordId =  component.get("v.recordId");
        var templateBody=component.get("v.templateBody");
        var emailActionName =component.get("v.emailActionName");
        var actionAPI = component.find("quickActionAPI");
        var targetFields={Subject: {value: templateBody.emailSubject}, HtmlBody: {value: templateBody.emailBody, insertType: "replace"}};
        var args = { actionName :emailActionName,targetFields : targetFields};
        console.log('About to fire quick action');
        actionAPI.setActionFieldValues(args)
        .then(function(result){
            console.log('Fired Quick Action');})
        .catch(function(e){
            console.error(e);
            alert('Hi' + JSON.stringify(e) );
        });
    },
})