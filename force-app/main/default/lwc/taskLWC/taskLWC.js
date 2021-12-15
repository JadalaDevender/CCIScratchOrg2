import { LightningElement, wire,api,track } from 'lwc';
import taskLists1 from '@salesforce/apex/TaskController.taskLists';
import dateLists1 from '@salesforce/apex/TaskController.dateLists';
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
const COLUMNS =  [
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
export default class DatatableDemo extends LightningElement {
    @track date1;
    @track date2;
    records=[];
    wiredRecords;
    error;
    DateAll=[];
    columns = COLUMNS;

    ALL_CASES = [];
    latestActions = [];
    showTable = true;
    connectedCallback(){
        dateLists1()
        .then(result => {
            this.records = result;
            this.error = undefined;
            let today = new Date().toISOString().slice(0, 10)//Today Date Function 
            this.records = result.map(item=>{
                let ActivityDateColor =item.ActivityDate > today? "slds-theme_offline":item.ActivityDate == today? "slds-theme_success":"slds-theme_error"
                return {...item, 
                    "ActivityDateColor":ActivityDateColor,
                    "StatusColor":ActivityDateColor,
                    "PriorityColor":ActivityDateColor,
                    "subjectColor":ActivityDateColor
   
                }
            })
            
        })
       
        .catch(error => {
            this.error = error;
            this.records = undefined;
        });
   } 
    @wire(taskLists1,{date1: '$date1',date2:'$date2'})
    TaskHandler(value){
        this.wiredRecords = value;
        this.ALL_CASES=value; 
        const { data, error } = value; 
        if(data)
        { 
            //this.wiredRecords = data;
            this.ALL_CASES= data;
            this.records = data;
            this.error = undefined;
            let today = new Date().toISOString().slice(0, 10)//Today Date Function 
            this.records = data.map(item=>{
                let ActivityDateColor =item.ActivityDate > today? "slds-theme_offline":item.ActivityDate == today? "slds-theme_success":"slds-theme_error"
                return {...item, 
                    "ActivityDateColor":ActivityDateColor,
                    "StatusColor":ActivityDateColor,
                    "PriorityColor":ActivityDateColor,
                    "subjectColor":ActivityDateColor
   
                }
            })
            console.log(this.records)
            
        }
        if(error){
            console.error(error)
        }
      
    }
    async handleSave( event ) {
        const updatedFields = event.detail.draftValues;

        await updateTask( { data: updatedFields } )
        .then( result => {

            console.log( JSON.stringify( "Apex update result: " + result ) );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Date Field updated',
                    variant: 'success'
                })
            );
            
            refreshApex( this.wiredRecords ).then( () => {
                this.draftValues = [];
            });        

        }).catch( error => {

            console.log( 'Error is ' + JSON.stringify( error ) );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );

        });

    }
    @wire(getPicklistValues, {recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Priority_STATUS,fieldApiName: Status_STATUS,fieldApiName:Date_field })
    cases_status({ error, data }) {
        if (data) {
            data.values.forEach(pl => {
                this.latestActions.push({ label: pl.label, checked: false, name: pl.value });
            });
            this.columns.forEach(col => {
                if (col.label === 'StatusColor'|| col.label === 'ActivityDateColor')  {
                    col.actions = [...col.actions, ...this.latestActions];
                }
            });
            
            this.showTable = this.latestActions.length > 0;
        } else if (error) {
            console.error(error);
        }
    }
   
    handleHeaderAction(event) {
        const actionName = event.detail.action.name;
        const colDef = event.detail.columnDefinition;
        const cols = this.columns;

        if (actionName !== undefined && actionName !== 'all') {
            this.records = this.ALL_CASES.filter(_case => _case[colDef.label] === actionName);
        } else if (actionName === 'all') {
            this.records = this.ALL_CASES;
        }

        cols.find(col => col.label === colDef.label).actions.forEach(action => action.checked = action.name === actionName);
        this.columns = [...cols];
        
    }
    datehandler1(event) {
        this.date1 = new Date(event.target.value);
        
        console.log("date1  "+event.target.value);
    
    
    }
    datehandler2(event) {
        
        this.date2 = new Date(event.target.value);
        console.log("date2 " +event.target.value);
        
    }
       
    
    
    

}