import template from './footer.component.html';
//import './footer.component.css';

export class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = template;
    }
}