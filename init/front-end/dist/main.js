/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/app/scripts/router.js
// TODO #export-router: remove this IIFE
  /**
   * Append an html template to the document, at the given outlet.
   * @param HTMLElement outlet the location on the document to add the template
   * @param HTMLElement template the template to append
   */
  function renderTemplate(outlet, template) {
    while (outlet.lastChild) {
      outlet.removeChild(outlet.lastChild);
    }
  outlet.appendChild(template);
  }
  /**
   * Create a new router. This router will load components into the given outlet.
   * @param {HTMLElement} outlet The element to put components into.
   */
  // TODO #export-router: export this function
  function Router(outlet) {
    this._components = {};
    this._templates = {};
    this._outlet = outlet;

    window.addEventListener("beforeunload", (event) =>
      this._onLocationChanged()
    );
    window.addEventListener("hashchange", (event) =>
      this._onLocationChanged(event.newURL)
    );
  }
  // TODO #export-router: remove this assignation

  /**
   * Bind a component ot be displayed when the registered URL is reached.
   * @param hash
   * @param componentEntry
   * @returns {Router}
   */
  Router.prototype.register = function (hash, componentEntry) {
    var path = `#${hash}`;
    if (!componentEntry) {
      throw new TypeError(
        `provided arg should be a Component. Got: ${componentEntry}`
      );
    }

    if (typeof hash !== "string") {
      throw new TypeError(
        `provided route url should be a string. Got: ${hash}`
      );
    } else {
      this._components[path] = componentEntry;
    }

    if (componentEntry.templateUrl) {
      if (!this._templates[componentEntry.templateUrl]) {
        this._templates[componentEntry.templateUrl] = true;
        var _this = this;
        _fetchTemplate(componentEntry.templateUrl, function (template) {
          componentEntry.template = template;
          if (_getRouteHash(window.location.href) === path) {
            _this._renderComponent(_this._components[path]);
          }
        });
      } else if (_getRouteHash(window.location.href) === path) {
        _this._renderComponent(_this._components[path]);
      }
    } else {
      if (_getRouteHash(window.location.href) === path) {
        this._renderComponent(this._components[path]);
      }
    }

    return this;
  };

  Router.prototype._renderComponent = function (componentEntry) {
    var component = new componentEntry.component();

    var outlet = this._outlet;

    var element = document.createElement("template");
    element.innerHTML =
      componentEntry.template ||
      component.template ||
      (component.getTemplate && component.getTemplate());

    renderTemplate(outlet, element.content.cloneNode(true));
    if (typeof component.init === "function") {
      component.init();
    }
  };

  Router.prototype._onLocationChanged = function (loc) {
    if (!loc) {
      return;
    }

    var path = _getRouteHash(loc);
    var componentEntry = this._components[path];

    if (componentEntry) {
      this._renderComponent(componentEntry);
    } else if (loc.startsWith(window.location.origin)) {
      console.warn(
        `navigated to "${loc}, but no component was registered at this address"`
      );
    }
  };

  function _getRouteHash(url) {
    return new URL(url).hash.split("?")[0] || "#";
  }

  function _fetchTemplate(templateUrl, cb) {
    var xhr =
      typeof XMLHttpRequest != "undefined"
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    xhr.open("get", templateUrl, true);

    xhr.onreadystatechange = function () {
      var status;
      var data;
      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) {
        // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = xhr.responseText;
          cb(data);
        } else {
          throw new Error(status);
        }
      }
    };
    xhr.send();
  }
;// CONCATENATED MODULE: ./src/app/scripts/welcome.js
// TODO #import-html: use ES default imports to import welcome.html as template
  // TODO #export-functions: export function WelcomeComponent
  // TODO #class: use the ES6 class keyword
  /* class WelcomeComponent constructor  */
  function WelcomeComponent() {
    // TODO #extends: call super(template)
    // TODO #import-html: assign template to this.template
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
    var gamePage = "./#game.html";
    // TODO #template-literals:  use template literals (backquotes)
    window.location = gamePage + "?name=" + name + "&size=" + size;
  }

;// CONCATENATED MODULE: ./src/app/scripts/utils.js
// TODO #export-functions: export function parseUrl
function parseUrl(url = window.location.href) {
  var query = url.split("?")[1] || "";
  var result = {};

  var parts = query.split("&");
  // TODO #functional-programming: Use Array.map() & Array.reduce()
  for (var i in parts) {
    var item = parts[i];
    var kv = item.split("=");
    result[kv[0]] = kv[1];
  }

  return result;
}

;// CONCATENATED MODULE: ./src/app/scripts/game.js


var CARD_TEMPLATE = ""
  .concat('<main class="card-cmp">')
  .concat('  <div class="card-wrapper">')
  .concat('    <img class="card front-face" alt="card" />')
  .concat('    <img class="card back-face" alt="card" />')
  .concat("  </div>")
  .concat("</main>");

  var environment = {
    api: {
      host: "http://localhost:8081",
    },
  };

  // TODO #export-functions: export function GameComponent
  // TODO #class: use the ES6 class keyword
  // TODO #extends: extend Component
  /* class GameComponent constructor */
  function GameComponent() {
    // TODO #extends: call super(template)
    // gather parameters from URL
    var params = parseUrl();

    // TODO #import-html: assign template to this.template
    // save player name & game ize
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.
  window.GameComponent = GameComponent;

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.init */
  GameComponent.prototype.init = function init() {
    // fetch the cards configuration from the server
    this.fetchConfig(
      // TODO #arrow-function: use arrow function instead.
      function (config) {
        this._config = config;
        this._boardElement = document.querySelector(".cards");

        // create cards out of the config
        this._cards = [];
        // TODO #functional-programming: use Array.map() instead.
        for (var i in this._config.ids) {
          this._cards[i] = new CardComponent(this._config.ids[i]);
        }

        // TODO #functional-programming: use Array.forEach() instead.
        // TODO #let-const: replace var with let.
        for (var i in this._cards) {
          var card = this._cards[i];

          // TODO #let-const: extract function _appendCard (ie: copy its body here and remove the function)
          this._appendCard(card);
        }

        this.start();
      }.bind(this)
    );
  };
  // TODO #class: turn function into a method of GameComponent

  /* method GameComponent._appendCard */
  GameComponent.prototype._appendCard = function _appendCard(card) {
    this._boardElement.appendChild(card.getElement());

    card.getElement().addEventListener(
      "click",
      // TODO #arrow-function: use arrow function instead.
      function () {
        this._flipCard(card);
      }.bind(this)
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.start */
  GameComponent.prototype.start = function start() {
    this._startTime = Date.now();
    var seconds = 0;
    // TODO #template-literals:  use template literals (backquotes)
    document.querySelector("nav .navbar-title").textContent =
      "Player: " + this._name + ". Elapsed time: " + seconds++;

    this._timer = setInterval(
      // TODO #arrow-function: use arrow function instead.
      function () {
        // TODO #template-literals:  use template literals (backquotes)
        document.querySelector("nav .navbar-title").textContent =
          "Player: " + this._name + ". Elapsed time: " + seconds++;
      }.bind(this),
      1000
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.fetchConfig */
  GameComponent.prototype.fetchConfig = function fetchConfig(cb) {
    var xhr =
      typeof XMLHttpRequest != "undefined"
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    // TODO #template-literals:  use template literals (backquotes)
    xhr.open("get", environment.api.host + "/board?size=" + this._size, true);

    // TODO #arrow-function: use arrow function instead.
    xhr.onreadystatechange = function () {
      var status;
      var data;
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
  GameComponent.prototype.goToScore = function goToScore() {
    var timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(
      // TODO #arrow-function: use arrow function instead.
      function () {
        // TODO #spa: replace with './#score'
        var scorePage = "./#score.html";
        // TODO #template-literals:  use template literals (backquotes)
        window.location =
          scorePage +
          "?name=" +
          this._name +
          "&size=" +
          this._size +
          "&time=" +
          timeElapsedInSeconds;
      }.bind(this),
      750
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent._flipCard */
  GameComponent.prototype._flipCard = function _flipCard(card) {
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
        setTimeout(
          // TODO #arrow-function: use arrow function instead.
          function () {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;

            // reset flipped card for the next turn.
            this._flippedCard = null;
          }.bind(this),
          500
        );
      }
    }
  };

  // TODO #card-component: Change images location to /app/components/game/card/assets/***.png
  // TODO #import-assets: use ES default import to import images.
  var CARDS_IMAGE = [
    "/src/assets/cards/back.png",
    "/src/assets/cards/card-0.png",
    "/src/assets/cards/card-1.png",
    "/src/assets/cards/card-2.png",
    "/src/assets/cards/card-3.png",
    "/src/assets/cards/card-4.png",
    "/src/assets/cards/card-5.png",
    "/src/assets/cards/card-6.png",
    "/src/assets/cards/card-7.png",
    "/src/assets/cards/card-8.png",
    "/src/assets/cards/card-9.png",
  ];

  // TODO #class: use the ES6 class keyword
  // TODO #extends: extends Component
  /* class CardComponent constructor */
  function CardComponent(id) {
    // TODO #extends: call super(CARD_TEMPLATE)
    // is this card flipped?
    this._flipped = false;
    this.template = CARD_TEMPLATE;

    // has the matching card has been discovered already?
    this.matched = false;

    this._elt = document.createElement("div");
    this._elt.innerHTML = this.template;
    this._elt = this._elt.firstElementChild;
    this._id = id;

    this._imageElt = this.getElement().querySelector(".card-wrapper");
    this._imageElt.querySelector("img.front-face").src =
      CARDS_IMAGE[this._id + 1];
    this._imageElt.querySelector("img.back-face").src = CARDS_IMAGE[0];
  }

  /* method CardComponent.getElement */
  CardComponent.prototype.getElement = function getElement() {
    return this._elt;
  };

  // TODO #class: turn function into a method of CardComponent
  /* method CardComponent.flip */
  CardComponent.prototype.flip = function flip() {
    this._imageElt.classList.toggle("flip");
    this._flipped = !this._flipped;
  };

  // TODO #class: turn function into a method of CardComponent
  /* method CardComponent.equals */
  CardComponent.prototype.equals = function equals(card) {
    return card._id === this._id;
  };

  // TODO #class: turn function into a method of CardComponent
  /* CardComponent.get flipped() */
  Object.defineProperties(CardComponent.prototype, {
    flipped: {
      get: function () {
        return this._flipped;
      },
    },
  });

;// CONCATENATED MODULE: ./src/app/scripts/score.js


  // TODO #export-functions: export function ScoreComponent
  // TODO #class: use the ES6 class keyword
  /* class ScoreComponent constructor */
  function ScoreComponent() {
    // TODO #extends: call super(template)
    var params = parseUrl();
    // TODO #import-html: assign template to this.template
    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
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

;// CONCATENATED MODULE: ./src/main.js




// TODO #import-css: use ES side-effect imports to import styles/style.css

const outlet = document.querySelector("#content-outlet");
const router = new Router(outlet);
router
  .register("", {
    component: WelcomeComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/welcome.html",
  })
  .register("welcome", {
    component: WelcomeComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/welcome.html",
  })
  .register("game", {
    component: GameComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/game.html",
  })
  .register("score", {
    component: ScoreComponent,
    // TODO #import-html: remove the templateUrl property.
    templateUrl: "/src/app/views/score.html",
  });

/******/ })()
;