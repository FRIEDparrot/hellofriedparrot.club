"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var store_1 = require("@/store");
var darkmodeToggleBtn_vue_1 = require("@/components/buttons/darkmodeToggleBtn.vue");
var homeBtn_vue_1 = require("@/components/buttons/homeBtn.vue");
var translateBtn_vue_1 = require("@/components/buttons/translateBtn.vue");
exports["default"] = vue_1.defineComponent({
    name: 'NavbarSimple',
    props: {
        // when window width is less than this value, hide left toggle
        hideLeftToggleWidth: {
            type: Number,
            "default": 9999
        },
        // when window width is less than this value, hide right toggle
        hideRightToggleWidth: {
            type: Number,
            "default": 9999
        },
        showSupportBtn: {
            type: Boolean,
            "default": true
        },
        /**
         * if set to True, reload i18n
         *    translations by refresh page
         */
        reloadTranslations: {
            type: Boolean,
            "default": true
        }
    },
    components: {
        DarkModeToggleBtn: darkmodeToggleBtn_vue_1["default"],
        HomeBtn: homeBtn_vue_1["default"],
        TranslateBtn: translateBtn_vue_1["default"]
    },
    data: function () {
        return {
            darkMode: store_1["default"].state.darkMode,
            leftToggleVisible: vue_1.ref(false),
            rightToggleVisible: vue_1.ref(false)
        };
    },
    methods: {
        handleResize: function () {
            var width = window.innerWidth;
            if (width < this.hideLeftToggleWidth) {
                this.leftToggleVisible = true;
            }
            else {
                this.leftToggleVisible = false;
            }
            if (width < this.hideRightToggleWidth) {
                this.rightToggleVisible = true;
            }
            else {
                this.rightToggleVisible = false;
            }
        }
    },
    mounted: function () {
        // initializate left and right toggle visibility
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount: function () {
        window.removeEventListener('resize', this.handleResize);
    }
});
