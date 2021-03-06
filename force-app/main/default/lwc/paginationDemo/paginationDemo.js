import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
//import ACCOUNT_NAME_FIELD from '@salesforce/schema/Contact.AccountId';
//import OWNER_FIELD from '@salesforce/schema/Contact.Owner';
import getContactList from '@salesforce/apex/DataController.getContactList';
const COLUMNS = [
    { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text', sortable: 'true' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'email' },
    { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'phone' },
    { label: 'Title', fieldName: TITLE_FIELD.fieldApiName, type: 'text' },
    //{ label: 'Account', fieldName: ACCOUNT_NAME_FIELD.fieldApiName, type: 'text' }
];
export default class paginationDemo extends LightningElement {
    columns = COLUMNS;
    @wire(getContactList)
    contacts;
}