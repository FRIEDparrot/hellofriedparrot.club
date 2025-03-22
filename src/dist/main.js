"use strict";
exports.__esModule = true;
/**
 * @ this is the file loaded by index.html after all the scripts are loaded
 */
require("@/styles/base.css");
require("vuetify/styles");
var index_1 = require("@router/index"); // ! import router
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var index_2 = require("@lang/index");
var vuetify_1 = require("vuetify"); // ! import vuetify plugin
var components = require("vuetify/components");
var directives = require("vuetify/directives");
var store_1 = require("./store");
var store_2 = require("@/store");
var vuetify_theme_1 = require("@styles/vuetify/vuetify_theme");
var vuetify = vuetify_1.createVuetify({
    components: components,
    directives: directives,
    theme: {
        defaultTheme: store_1.getDarkMode() ? 'dark' : 'light',
        themes: vuetify_theme_1["default"]
    }
});
/**
 * Directly use Vue Here
 */
var app = vue_1.createApp(App_vue_1["default"]);
app.use(vuetify); // use vuetify plugin for UI components
app.use(index_2["default"]); // use i18n plugin for translation support
app.use(index_1["default"]); // use Vue Router for routing support
app.use(store_2["default"]); // use Vuex for state management support
app.mount('#app');
