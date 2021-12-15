import { LightningElement } from 'lwc';

export default class HellowWorld extends LightningElement {

    greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
}
}