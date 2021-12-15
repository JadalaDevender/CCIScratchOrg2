({
    getDataTableRespone : function(component, event) {
        component.set('v.columnsHeader', [
            {label: 'N° de ligne de vérification', fieldName: 'Name', type: 'text'},
            {label: 'Objets', fieldName: 'objet__c', type: 'text'},
            {label: ' Charge Name', fieldName: 'ChargeName__c', type: 'text'},
            {label: 'Fonctionnel', fieldName: 'Functional__c', type: 'text'},
            {label: 'Présent', fieldName: 'Present__c', type: 'text'},
            {type:  'button',typeAttributes:{
              iconName: 'utility:edit',
              label: 'Edit', 
              name: 'editRecord', 
              title: 'editTitle', 
              disabled: false, 
              value: 'test'
              }
            }
        ]);
           var action = component.get("c.getDataTableDetails");
           action.setParams({
               objApi : 'Contact',
               fieldSetName : 'AuraBaseFieldSet',
               taskId : component.get("v.RecordId")
           });
           action.setCallback(this, function(response){
               var state = response.getState();
               if(state === 'SUCCESS'){
                   component.set("v.columnsHeader", response.getReturnValue().lstOfFieldLabels);
                   
                   component.set("v.lstOfRecords", response.getReturnValue().lstOfSObjs);    
               }else if (state === 'ERROR'){
                   console.log('ERROR ');
               }
           });
           $A.enqueueAction(action);
    },
    editRow: function (component,event,helper){
        console.log("###Avant");
        var recId = event.getParam('row').Id;
        console.log('###########');
        console.log('###Id='+recId);
      } 
   })