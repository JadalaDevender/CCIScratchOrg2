import { LightningElement, wire,api,track } from 'lwc';
import taskLists1 from '@salesforce/apex/TaskController.taskLists';
import dateLists1 from '@salesforce/apex/datess.dateLists';
import updateTask from '@salesforce/apex/TaskController.updateTask';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Priority_STATUS from '@salesforce/schema/Task.Priority';
import Status_STATUS from '@salesforce/schema/Task.Status';
import Date_field from '@salesforce/schema/Task.ActivityDate';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ActivityDate from '@salesforce/schema/Task.ActivityDate';
let DEFAULT_ACTIONS = [{ label: 'All', checked: true, name: 'all' }];
//let todayDate=new Date().toISOString().slice(0, 10);

export default class DatatableDemo extends LightningElement {
    @track  columns  =  [
        {
            label:'Subject' , 
            fieldName:'Subject',
            editable: "true",
            sortable: "true",
            cellAttributes:
               {
                  class:
                    {
                        fieldName:'subjectColor'  
                    }   }
        },
        {
            label:'Priority',
            fieldName:'Priority',
            type:'Picklist',
            editable: "true",
            sortable: "true",
            cellAttributes:
               {
                  class:
                    {
                        fieldName:'PriorityColor'        
                    }
                },
            actions: [{ label: 'All', checked: true, name: 'all' },
            { label: 'Low', checked: false, name: 'Low' },
            { label: 'Normal', checked: false, name: 'Normal' },
            { label: 'High', checked: false, name: 'High' }]
        },
        {
            label:'Due Date',
            fieldName:'ActivityDate', 
            sortable: "true",
            editable: "true",
            type:'text',
            cellAttributes:
               {
                  class:
                    {
                        fieldName:'ActivityDateColor'   
                    }
               },
            actions: [{ label: 'All', checked: true, name: 'all' },
            { label: 'Today', checked: false, name:'' },
            { label: 'Tomorrow', checked: false, name: '' },
            { label: 'Crosed', checked: false, name: '' }]
        },
        {
            label:'Status', 
            fieldName:'Status', 
            editable: "true",
            sortable: "true",
            actions: DEFAULT_ACTIONS,
            type:'Picklist',
            cellAttributes:
               {
                    class:
                    {
                         fieldName:'StatusColor',   
                    }
               },
            actions: [{ label: 'All', checked: true, name: 'all' },
            { label: 'Completed', checked: false, name: 'Completed' },
            { label: 'Inprogress', checked: false, name: 'In Progress' },
            { label: 'Not ', checked: false, name: 'Not Started' }]
        },
    ]
    @track date1;
    @track date2;
    @track error;
    @track accList ;
    @wire(dateLists1,{date1: '$date1',date2:'$date2'})
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.accList = data;
        } else if (error) {
            this.error = error;
        }
        
    }
    datehandler1(event) {
        this.date1 = new Date(event.target.value);
        console.log("date1"+event.target.value);
    
    
    }
    datehandler2(event) {
        this.date2 = new Date(event.target.value);
        console.log("date2"+event.target.value);
        wiredAccounts();
    
    }
    

}