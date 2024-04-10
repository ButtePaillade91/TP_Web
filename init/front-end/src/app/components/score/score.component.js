import template from "../score/score.component.html";
import { parseUrl } from "../../scripts/utils";
import { Component } from "../../scripts/component";
import "../score/score.component.css";

  // TODO #export-functions: export function ScoreComponent
  // TODO #class: use the ES6 class keyword
  /* class ScoreComponent constructor */
  export class ScoreComponent extends Component {
    constructor() {
      super(template)
      const params = parseUrl();
      // TODO #import-html: assign template to this.template
      this.name = params.name;
      this.size = parseInt(params.size);
      this.time = parseInt(params.time);
      this.template = template;
    }
    // TODO #extends: call super(template)
    
  }

  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.
  window.ScoreComponent = ScoreComponent;

  // TODO #class: turn function into a method of ScoreComponent
  /* method ScoreComponent.init */
  ScoreComponent.prototype.init = function init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
  };
