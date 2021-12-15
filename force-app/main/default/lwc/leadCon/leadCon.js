import { LightningElement, track, wire } from 'lwc';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import leadLists from '@salesforce/apex/leadData.leadLists';
import leadConvert from '@salesforce/apex/leadData.doConvert';

const actions = [
    { label: 'Convert', name: 'convert' }];
const columns=[
   
      {
        label: 'Name',
        fieldName: 'Name'
    },
   
    {
        label: 'Email',
        fieldName: 'Email'
    },
    {
        label: 'Phone',
        fieldName: 'Phone'
    },
    {
        type: "action",
                        typeAttributes: { 
                            rowActions: actions, 
                            label: 'Convert',  
                            name: 'Convert',  
                            title: 'Convert',  
                            disabled: false,  
                            value: 'convert',  
                            iconPosition: 'left', 
                            variant:"brand",
                            class:"slds-visible" 
                        }
      }
];
 
export default class leadCon extends LightningElement {
  @track columns = columns;
  @track leadRow={};//store lead values  what ever we convert by convert button
  @track rowOffset = 0;  
  @track modalContainer = false;//now it is inVisible ..when it is true then that tab is visible
 
  //convert1;
  
  @wire(leadLists) 
  wireLead;

   handleRowAction(event){
      const dataRow = event.detail.row;
      window.console.log('dataRow@@ ', dataRow);
      this.leadRow=dataRow;
     window.console.log('leadRow## ',JSON.stringify(dataRow) );
      this.modalContainer=true;
   }
 
   handleClick(){
    console.log('Convert Button was Clicked!');
    console.log('Record Id:');
    console.log(this.recordId);
    leadConvert({leadId : this.leadRow.Id})
        .then(result => {
            console.log('Convert Result:');
            console.log(result);
        })
        .catch(error => {
            console.log('There was an Error :( ...');
            this.error = error;
            console.log(error);
        })
        this.modalContainer=false;
    }
}