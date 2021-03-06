import { LightningElement, wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountControllers.fetchAccounts';

export default class Sample extends LightningElement {

    records;
    sortedColumn;
    sortedDirection;
    selectedValue = 'All';

    get options() {
        return [
            { label: 'All', value: 'All' },
            { label: 'Archived', value: 'Archived' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Send Email', value: 'Send Email' }
           
        ];
    }

    handleChange( event ) {

        this.selectedValue = event.detail.value;
        if ( this.selectedValue === 'All' )
            this.records = this.initialRecords;
        else
            this.filter();

    }

    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {

        if (data) {

            this.records = data;
            this.initialRecords = data;
            this.error = undefined;
            this.sortedColumn = "Name";
            this.sortRecs();

        } else if ( error ) {

            this.error = error;
            this.initialRecords = undefined;
            this.records = undefined;

        }

    }  

    sortRecs( event ) {

        let colName = event ? event.target.name : undefined;
        console.log( 'Column Name is ' + colName );

        if ( this.sortedColumn === colName )
            this.sortedDirection = ( this.sortedDirection === 'asc' ? 'desc' : 'asc' );
        else
            this.sortedDirection = 'asc';

        let isReverse = this.sortedDirection === 'asc' ? 1 : -1;

        if ( colName )
            this.sortedColumn = colName;
        else
            colName = this.sortedColumn;

        this.records = JSON.parse( JSON.stringify( this.records ) ).sort( ( a, b ) => {
            a = a[ colName ] ? a[ colName ].toLowerCase() : 'z';
            b = b[ colName ] ? b[ colName ].toLowerCase() : 'z';
            return a > b ? 1 * isReverse : -1 * isReverse;
        });

    }

    filter() {  
           
        if ( this.selectedValue ) {  

            this.records = this.initialRecords;
 
            if ( this.records ) {

                let recs = [];
                for ( let rec of this.records ) {

                    console.log( 'Rec is ' + JSON.stringify( rec ) );

                    if ( rec.Status__c === this.selectedValue ) {

                        recs.push( rec );
                
                    }
                    
                }

                console.log( 'Recs are ' + JSON.stringify( recs ) );
                this.records = recs;

            }
 
        }  else {

            this.records = this.initialRecords;

        }
 
    }  

}