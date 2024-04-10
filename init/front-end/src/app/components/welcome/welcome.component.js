import { Component } from "../../scripts/component";
import "../welcome/welcome.component.css";
import template from "../welcome/welcome.component.html";
  export function WelcomeComponent() {
    // TODO #extends: call super(template)
    this.template = template;
  }

  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.
  window.WelcomeComponent = WelcomeComponent;
  // TODO #class: turn function into a method of WelcomeComponent
  /* method WelcomeComponent.init */
  WelcomeComponent.prototype.init = function init() {
    const form = document.querySelector("form.form-signin");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          const name = event.srcElement.querySelector("#nickname").value;
          const size = parseInt(event.srcElement.querySelector("#size").value);

          this._startGame(name, size);
        }
      }, false);

    return this;
  };

  // TODO #class: turn function into a method of WelcomeComponent
  WelcomeComponent.prototype._startGame = function _startGame(name, size) {
    // TODO #spa: replace with './#game'
    const gamePage = "./#game";
    // TODO #template-literals:  use template literals (backquotes)
    window.location = gamePage + "?name=" + name + "&size=" + size;
 }