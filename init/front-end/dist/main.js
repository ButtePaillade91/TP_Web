"use strict";

var _router = require("./app/scripts/router");
var _welcome = require("./app/components/welcome/welcome.component");
var _game = require("./app/components/game/game.component");
var _score = require("./app/components/score/score.component");
var _navbar = require("./app/components/navbar/navbar.component");
var _footer = require("./app/components/footer/footer.component");
require("/node_modules/bootstrap/dist/css/bootstrap.css");
require("./app/styles/style.css");
customElements.define("my-navbar", _navbar.NavbarComponent);
customElements.define("my-footer", _footer.FooterComponent);
var outlet = document.querySelector("#content-outlet");
var router = new _router.Router(outlet);
router.register("", {
  component: _welcome.WelcomeComponent
}).register("welcome", {
  component: _welcome.WelcomeComponent
}).register("game", {
  component: _game.GameComponent
}).register("score", {
  component: _score.ScoreComponent
});