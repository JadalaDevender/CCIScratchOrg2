import { LightningElement,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Subscription extends LightningElement {
    value = '';
    @track showSearchComponent = false;

    get options() {
        return [
            { label: '15% Off - 15% Off', value: 'option1' },
            { label: 'First Cupon - 20% Off', value: 'option2' },
            { label: '$200 Off - 200 Off', value: 'option3' },
            { label: '45% Off - 45% Off', value: 'option4' },
            { label: '22% Off - 22% Off', value: 'option5' },
           
        ];
        
    }
    get options1() {
        return [
            { label: 'Charge Automatically', value: 'option6' },
            { label: 'Send Invoice', value: 'option7' },
            
        ];
    }
    
    handleClick() {
      this.showSearchComponent = true;
    }
    
    
}