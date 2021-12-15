import { LightningElement, track } from 'lwc';

export default class LightningExampleInputDate extends LightningElement {
    @track date1;
    @track date2;
    @track result;
    @track result1;
    @track visible =true;
    @track empty;

    datehandler1(event) {
        this.date1 = new Date(event.target.value);
        console.log(event.target.value);
    
    
    }
    datehandler2(event) {
        
        let inputDate = this.template.querySelector(".dateCmp2");
        this.date2 = new Date(event.target.value);
        console.log(event.target.value);
       
        if(this.date1 > this.date2)
        {
            //this.visible=false;
            this.result='';
            inputDate.setCustomValidity("End Date must be greater then Start date ");
            console.log(this.result);
        }
        else {
            this.result1 = this.date2.getTime() - this.date1.getTime();
            this.result= this.result1 / (1000 * 3600 * 24);
            console.log(this.result);
            inputDate.setCustomValidity('');
            //this.visible=true;
        }
        inputDate.reportValidity();
    }
       

    
    
    }