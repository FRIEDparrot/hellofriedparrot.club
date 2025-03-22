"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var gsap_1 = require("gsap");
var vue_i18n_1 = require("vue-i18n"); // useI18n global function
var darkmodeToggleBtn_vue_1 = require("@pages/common/buttons/darkmodeToggleBtn.vue");
var translateBtn_vue_1 = require("@pages/common/buttons/translateBtn.vue");
var store_1 = require("@/store");
var defaultAvatar_vue_1 = require("@/assets/imgs/ui/defaultAvatar.vue");
var userPanelMenu_vue_1 = require("@/pages/common/user/userPanelMenu.vue");
var userAvatar_vue_1 = require("@/pages/common/user/userAvatar.vue");
var MainColumns_1 = require("@pages/Welcome/shared/MainColumns");
/**
 * note MainColumns is variable
 */
exports["default"] = vue_1.defineComponent({
    name: "navbar_welcome",
    components: {
        DarkModeToggleBtn: darkmodeToggleBtn_vue_1["default"],
        translateBtn: translateBtn_vue_1["default"],
        defaultAvatar: defaultAvatar_vue_1["default"],
        userAvatar: userAvatar_vue_1["default"],
        userPanelMenu: userPanelMenu_vue_1["default"]
    },
    setup: function () {
        var t = vue_i18n_1.useI18n().t;
        // watchEffect will automatically called once at here
        vue_1.watchEffect(function () {
            for (var _i = 0, MainColumns_2 = MainColumns_1["default"]; _i < MainColumns_2.length; _i++) {
                var column = MainColumns_2[_i];
                column.title = t(column.titleKey);
            }
        });
        return {
            t: t
        };
    },
    props: {
        showLeftSidebarToggle: {
            type: Boolean,
            "default": true
        },
        showRightSidebarToggle: {
            type: Boolean,
            "default": true
        },
        showLogo: {
            type: Boolean,
            "default": true
        }
    },
    data: function () {
        var _a, _b;
        return {
            user_info: {
                name: (_a = store_1["default"].state.user.name) !== null && _a !== void 0 ? _a : null,
                avatarUrl: (_b = store_1["default"].state.user.avatarUrl) !== null && _b !== void 0 ? _b : null
            },
            navbar_columns: MainColumns_1["default"],
            langLoaded: false,
            columns: MainColumns_1["default"],
            avatar_size: "50px"
        };
    },
    methods: {
        setOpen: function (index, val) {
            gsap_1.gsap.to("#nav-arrow-icon" + index, {
                duration: 0.05,
                rotation: val ? 90 : 0,
                ease: "power2.inOut"
            });
        },
        toggleLeftSidebar: function () {
            this.$emit("toggleLeftSidebar"); // emit event to layout component
        },
        toggleRightSidebar: function () {
            this.$emit("toggleRightSidebar");
        },
        scaleAvator: function (hover) {
            if (hover === void 0) { hover = false; }
            gsap_1.gsap.to(".nav-user-avatar-container", {
                duration: 0.5,
                width: hover ? 60 : 50,
                height: hover ? 60 : 50,
                ease: "power2.inOut"
            });
        }
    },
    mounted: function () { }
});
