import { LightningElement, api, wire,track } from 'lwc';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { reduceErrors } from 'c/ldsUtils';
import LeadList from '@salesforce/apex/LeadController.LeadList';
const actions = [
    { label: 'Convert Lead', name: 'Convert Lead' },
];
const columns = [{
    label: 'Name',
    fieldName: 'Name',
    type: 'text',
    sortable: true
},
{
label: 'Company',
    fieldName: 'Company',
    type: 'text',
    sortable: true
},
{
    label: 'Email',
    fieldName: 'Email',
    type: 'email',
    sortable: true
},
{
    label: 'Phone',
    fieldName: 'Phone',
    type: 'phone',
    sortable: true
}
];

export default class LeadConversion extends LightningElement {
    @track data = [];
    @track columns = columns;
    @track sortBy;
    @track sortDirection;
    @track searchKey;
    @track Acc;
    userId = Id;

    @wire(LeadList)
    //Store Into Data Base
   opp({error, data}) {
        if(data) {

            let currentData = [];

            data.forEach((row) => {

                /* 
                * Creating the an empty object
                * To reslove "TypeError: 'set' on proxy: trap returned falsish for property"
               */

                let rowData = {};

                rowData.Name = row.Name;
                rowData.Comapny = row.Company;
                rowData.Email = row.Email;
                rowData.Phone = row.Phone;
                

                // Account related data

                currentData.push(rowData);
            });

            this.data = currentData;
        }
        else if(error) {
            window.console.log(error);
        }
    } 
}