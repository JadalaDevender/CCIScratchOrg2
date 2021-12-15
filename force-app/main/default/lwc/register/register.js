import { LightningElement } from 'lwc';
import MANAGE_DOMAIN_OBJECT from '@salesforce/schema/Manage_Domains__c';
import NAME_FIELD from '@salesforce/schema/Manage_Domains__c.Name';
import DOMAIN_FIELD from '@salesforce/schema/Manage_Domains__c.Domain__c';

/**
 * Creates Account records.
 */
export default class AccountCreator extends LightningElement {

    accountObject = MANAGE_DOMAIN_OBJECT;
    myFields = [NAME_FIELD, DOMAIN_FIELD];

    handleACreated(){
        // Run code when account is created.
    }
}