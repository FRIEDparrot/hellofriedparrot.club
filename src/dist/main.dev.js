"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("@/styles/main.css");

require("element-plus/theme-chalk/dark/css-vars.css");

var _index = _interopRequireDefault(require("@router/index"));

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _index2 = _interopRequireDefault(require("@lang/index"));

var _vueCookies = _interopRequireDefault(require("vue-cookies"));

var _vuetify = require("vuetify");

require("vuetify/styles");

var components = _interopRequireWildcard(require("vuetify/components"));

var directives = _interopRequireWildcard(require("vuetify/directives"));

var _highlight = _interopRequireDefault(require("highlight.js"));

var _store = require("./store");

var _store2 = _interopRequireDefault(require("@/store"));

var _vuetify_theme = _interopRequireDefault(require("@styles/vuetify/vuetify_theme"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @ this is the file loaded by index.html after all the scripts are loaded
 */
// ! import router
// import ElementPlus from "element-plus";
// ! import vuetify plugin
var vuetify = (0, _vuetify.createVuetify)({
  components: components,
  directives: directives,
  theme: {
    defaultTheme: (0, _store.getDarkMode)() ? "dark" : "light",
    themes: _vuetify_theme["default"]
  }
});
/**
 * Directly use Vue Here
 */

var app = (0, _vue.createApp)(_App["default"]);
app.use(vuetify); // use vuetify plugin for UI components
// app.use(ElementPlus); // use ElementPlus for UI components

app.use(_index2["default"]); // use i18n plugin for translation support

app.use(_index["default"]); // use Vue Router for routing support

app.use(_store2["default"]); // use Vuex for state management support

app.use(_vueCookies["default"]); // use Vue Cookies for cookie management support

app.mount("#app"); // app.use(store); // use Vuex for dark mode support