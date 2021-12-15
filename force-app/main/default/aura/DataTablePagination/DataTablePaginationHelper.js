({
    getColumnAndAction : function(component) {
        var actions = [
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'},
            {label: 'View', name: 'view'}
        ];
        component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text',sortable:true,editable:'true'},
            {label: 'AccountNumber', fieldName: 'AccountNumber', type: 'text',sortable:true,editable:'true'},
            {label: 'Industry', fieldName: 'Industry', type: 'text',sortable:true,editable:'true'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone',sortable:true,editable:'true'},
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
    },
     
    getAccounts : function(component, helper) {
        var action = component.get("c.getAccounts");
        var pageSize = component.get("v.pageSize").toString();
        var pageNumber = component.get("v.pageNumber").toString();
         
        action.setParams({
            'pageSize' : pageSize,
            'pageNumber' : pageNumber
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                if(resultData.length < component.get("v.pageSize")){
                    component.set("v.isLastPage", true);
                } else{
                    component.set("v.isLastPage", false);
                }
                component.set("v.dataSize", resultData.length);
                component.set("v.data", resultData);
                component.set("v.allData", resultData);
            }
        });
        $A.enqueueAction(action);
    },
     
    viewRecord : function(component, event) {
        var row = event.getParam('row');
        var recordId = row.Id;
        var navEvt = $A.get("event.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
     
    deleteRecord : function(component, event) {
        component.set("v.isLoading", true);
        var accountRec = event.getParam('row');        
        var action = component.get("c.delAccount");
        action.setParams({
            "accountRec": accountRec
        });
        $A.get('e.force:refreshView').fire();
        $A.enqueueAction(action);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Success',
            message: ' Record Deleted Sucessfully',
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
     
    editRecord : function(component, event) {
        var row = event.getParam('row');
        var recordId = row.Id;
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recordId
            
        });
        editRecordEvent.fire();
        $A.get('e.force:refreshView').fire();
       
    }, 
    sortData: function (cmp, fieldName, sortDirection) {
        var fname = fieldName;
        var data = cmp.get("v.data");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.data", data);
    },
    sortBy: function (field, reverse) {
        var key = function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    
})