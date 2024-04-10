import template from "../game/game.component.html";
import { Component } from "../../scripts/component";
import { parseUrl } from "../../scripts/utils";
import { CardComponent } from "./card/card.component";
import "../game/game.component.css";

  const environment = {
    api: {
      host: "http://localhost:8081",
    },
  };

  // TODO #export-functions: export function GameComponent
  // TODO #class: use the ES6 class keyword
  // TODO #extends: extend Component
  /* class GameComponent constructor */
  export class GameComponent extends Component {
    constructor() {
      super(template)
      // gather parameters from URL
      const params = parseUrl();

      this.template = template;
      // save player name & game ize
      this._name = params.name;
      this._size = parseInt(params.size) || 9;
      this._flippedCard = null;
      this._matchedPairs = 0;
      }

    // TODO #class: turn function into a method of GameComponent
    /* method GameComponent.init */
    init() {
      // fetch the cards configuration from the server
      this.fetchConfig(config => {
          this._config = config;
          this._boardElement = document.querySelector(".cards");

          // create cards out of the config
          this._cards = [];
          // TODO #functional-programming: use Array.map() instead.
          this._cards = this._config.ids.map(id => new CardComponent(id));
          
          // TODO #let-const: replace var with let.
          this._cards.forEach(card => {
            this._boardElement.appendChild(card.getElement());

            card.getElement().addEventListener("click", () => {
                this._flipCard(card);
            });
          });

          this.start();
        });
    };
    // TODO #class: turn function into a method of GameComponent

    /* method GameComponent._appendCard */
    _appendCard(card) {
      this._boardElement.appendChild(card.getElement());

      card.getElement().addEventListener(
        "click", () => {
          this._flipCard(card);
        });
    };

    // TODO #class: turn function into a method of GameComponent
    /* method GameComponent.start */
    start() {
      this._startTime = Date.now();
      let seconds = 0;
      // TODO #template-literals:  use template literals (backquotes)
      document.querySelector("nav .navbar-title").textContent =
        "Player: " + this._name + ". Elapsed time: " + seconds++;

      this._timer = setInterval(() => {
          // TODO #template-literals:  use template literals (backquotes)
          document.querySelector("nav .navbar-title").textContent =
            "Player: " + this._name + ". Elapsed time: " + seconds++;
        }, 1000);
    };

    // TODO #class: turn function into a method of GameComponent
    /* method GameComponent.fetchConfig */
    fetchConfig(cb) {
      const xhr =
        typeof XMLHttpRequest != "undefined"
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");

      // TODO #template-literals:  use template literals (backquotes)
      xhr.open("get", environment.api.host + "/board?size=" + this._size, true);

      xhr.onreadystatechange = () => {
        let status;
        let data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) {
          // `DONE`
          status = xhr.status;
          if (status == 200) {
            data = JSON.parse(xhr.responseText);
            cb(data);
          } else {
            throw new Error(status);
          }
        }
      };
      xhr.send();
    };

    // TODO #class: turn function into a method of GameComponent
    /* method GameComponent.goToScore */
    goToScore() {
      let timeElapsedInSeconds = Math.floor(
        (Date.now() - this._startTime) / 1000
      );
      clearInterval(this._timer);

      setTimeout(() => {
          // TODO #spa: replace with './#score'
          const scorePage = "./#score";
          // TODO #template-literals:  use template literals (backquotes)
          window.location =
            scorePage +
            "?name=" +  
            this._name +
            "&size=" +
            this._size +
            "&time=" +
            timeElapsedInSeconds;
        }, 750);
    };

    // TODO #class: turn function into a method of GameComponent
    /* method GameComponent._flipCard */
    _flipCard(card) {
      if (this._busy) {
        return;
      }

      if (card.flipped) {
        return;
      }

      // flip the card
      card.flip();

      // if flipped first card of the pair
      if (!this._flippedCard) {
        // keep this card flipped and wait for the second card of the pair
        this._flippedCard = card;
      } else {
        // second card of the pair flipped...

        // if cards are the same
        if (card.equals(this._flippedCard)) {
          this._flippedCard.matched = true;
          card.matched = true;
          this._matchedPairs += 1;

          // reset flipped card for the next turn.
          this._flippedCard = null;

          if (this._matchedPairs === this._size) {
            this.goToScore();
          }
        } else {
          this._busy = true;

          // cards did not match
          // wait a short amount of time before hiding both cards
          setTimeout(() => {
              // hide the cards
              this._flippedCard.flip();
              card.flip();
              this._busy = false;

              // reset flipped card for the next turn.
              this._flippedCard = null;
            }, 500);
        }
      }
    };
  }