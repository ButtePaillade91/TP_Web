import template from "../views/welcome.html";
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
    var form = document.querySelector("form.form-signin");

    form.addEventListener(
      "submit",
      // TODO #arrow-function: use arrow function instead.
      function (event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          var name = event.srcElement.querySelector("#nickname").value;
          var size = parseInt(event.srcElement.querySelector("#size").value);

          _startGame(name, size);
        }
      }.bind(this),
      false
    );

    return this;
  };

  // TODO #class: turn function into a method of WelcomeComponent
  function _startGame(name, size) {
    // TODO #spa: replace with './#game'
    var gamePage = "./#game";
    // TODO #template-literals:  use template literals (backquotes)
    window.location = gamePage + "?name=" + name + "&size=" + size;
  }
