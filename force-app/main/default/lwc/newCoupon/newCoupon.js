import { LightningElement } from 'lwc';

export default class NewCoupon extends LightningElement {
    entervalue;
    get options1() 
    {
        return  [
            { label: 'Percentage Discount', value: 'option1' },
            { label: 'Fixed Amount Discount', value: 'option2' },
                ];
    }
    get options2() 
    {
        return  [
            { label: 'Forever', value: 'option1' },
            { label: 'Repeating', value: 'option2' },
            { label: 'Once', value: 'option3' },
                ];
    }
    handleChange(event)
    {
        this.entervalue=event.detail.value;
        console.log(this.entervalue);
        

    }
}