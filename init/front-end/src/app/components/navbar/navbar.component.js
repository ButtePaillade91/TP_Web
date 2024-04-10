import template from './navbar.component.html';
import './navbar.component.css';

export class NavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = template;
    }
}