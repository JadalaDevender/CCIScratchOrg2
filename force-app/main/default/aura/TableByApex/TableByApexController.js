({
    
     init: function (cmp, event, helper) {
         
             cmp.set('v.mycolumns', [
                 { label: 'Contact Name',
                  fieldName: 'Name',
                  type: 'text',
                   },
                 { label: 'Phone', fieldName: 'Phone', type: 'phone'},
                 { label: 'Email', fieldName: 'Email', type: 'email'}
             ]);
             var action = cmp.get('c.getContacts');
             action.setCallback(this, $A.getCallback(function (response) {
                 var state = response.getState();
                 if (state === "SUCCESS") {
                     cmp.set('v.mydata', response.getReturnValue());
                 } else if (state === "ERROR") {
                     var errors = response.getError();
                     console.error(errors);
                 }
             }));
             $A.enqueueAction(action);
         }
     
})