"use strict";
exports.__esModule = true;
require("@/assets/anims/animation_main");
var vue_1 = require("vue");
var vuetify_1 = require("vuetify");
var store_1 = require("./store"); // ! import vuex store
/** add the dynamic effects to the buttons */
var app = vue_1.defineComponent({
    name: 'App',
    setup: function () {
        var theme = vuetify_1.useTheme();
        theme.global.name.value = store_1.getDarkMode() ? 'dark' : 'light'; // set the initial theme
        store_1["default"].watch(function (state) { return state.darkMode; }, function (newVal) {
            theme.global.name.value = newVal ? 'dark' : 'light'; // update the vuetify theme
        });
        return {};
    },
    components: {},
    methods: {},
    data: function () {
        return {};
    },
    mounted: function () {
        /** CAUTION: for some store status, we need to initialize here */
        /**  set the language and load the language pack */
        var lang_code = store_1.getPreferedLangCode();
        this.$i18n.locale = lang_code;
        store_1.setPreferedLangCode(lang_code);
        /* set the dark mode based on the user's preference */
        store_1.setDarkMode(store_1.getDarkMode());
        /* note : cookies set part is in @pages/common/components/CookiePrompt.vue */
    },
    beforeDestroy: function () { }
});
exports["default"] = app;
