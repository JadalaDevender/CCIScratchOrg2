({
    init:function(component, event, helper) {
        var action = component.get('c.getEmailTemplate'); 
        action.setCallback(this, function(a){
            debugger;
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                component.set('v.templateList', a.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    selectTemplate: function (cmp, evt, helper) {
        var selectedTemplateId = cmp.find('templateId').get('v.value');
        cmp.set("v.selectedTemplateId", selectedTemplateId);
    },
    sendEmail: function (component, event, helper) {
        var selectedTemplateId =  component.get("v.selectedTemplateId");
        if(selectedTemplateId!= undefined && selectedTemplateId!="" && selectedTemplateId!="undefined")
        {
            helper.getEmailBody(component, event, helper);  
             
        }
        else
        {
            var inputCmp = component.find("templateId");
            inputCmp.setCustomValidity("Please select a value");
 
            inputCmp.reportValidity();
             
        }
    }
})