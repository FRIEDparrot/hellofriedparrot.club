"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var store_1 = require("@/store");
var darkmodeToggleBtn_vue_1 = require("@components/buttons/darkmodeToggleBtn.vue");
var translateBtn_vue_1 = require("@components/buttons/translateBtn.vue");
var rightSidebarToggleBtn_vue_1 = require("@/components/buttons/rightSidebarToggleBtn.vue");
var defaultAvatar_vue_1 = require("@imgs/ui/defaultAvatar.vue");
var navUserAvatarPrompt_vue_1 = require("@/components/user/navUserAvatarPrompt.vue");
var main_columns_1 = require("@/shared/main_columns");
var parrotLogoBtn_vue_1 = require("@/components/buttons/parrotLogoBtn.vue");
/**
 * note MainColumns is variable
 */
exports["default"] = vue_1.defineComponent({
    name: 'navbar_welcome',
    components: {
        DarkModeToggleBtn: darkmodeToggleBtn_vue_1["default"],
        translateBtn: translateBtn_vue_1["default"],
        defaultAvatar: defaultAvatar_vue_1["default"],
        rightSidebarToggleBtn: rightSidebarToggleBtn_vue_1["default"],
        navUserAvatarPrompt: navUserAvatarPrompt_vue_1["default"],
        parrotLogoBtn: parrotLogoBtn_vue_1["default"]
    },
    setup: function () { },
    emits: ['toggleLeftSidebar', 'toggleRightSidebar'],
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
        },
        alwaysShowLogo: {
            type: Boolean,
            "default": false
        },
        scrollThreshold: {
            type: Number,
            "default": 0
        },
        scrollBehavior: {
            // for v-app-bar
            type: String,
            "default": 'hide'
        },
        staticPos: {
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
            navbar_columns: main_columns_1["default"],
            langLoaded: false,
            columns: main_columns_1["default"],
            avatar_size: '50px'
        };
    },
    methods: {
        navigateTo: function (event, path) {
            if (event.ctrlKey || event.metaKey) {
                window.open(path, '_blank');
            }
            else {
                this.$router.push(path);
            }
        },
        // setOpen(index: number, val: boolean): void {
        //     gsap.to('#nav-arrow-icon' + index, {
        //         duration: 0.05,
        //         rotation: val ? 90 : 0,
        //         ease: 'power2.inOut',
        //     });
        // },
        toggleLeftSidebar: function () {
            this.$emit('toggleLeftSidebar'); // emit event to layout component
        },
        toggleRightSidebar: function () {
            this.$emit('toggleRightSidebar');
        }
    },
    mounted: function () { }
});
