"use strict";
exports.__esModule = true;
var interface_welcome_vue_1 = require("../interface_welcome.vue");
var SidebarLayout_vue_1 = require("@layout/SidebarLayout.vue");
var vue_1 = require("vue");
var navbar_welcome_vue_1 = require("@components/nav/navbar_welcome.vue");
var footerbar_common_vue_1 = require("@components/footer/footerbar_common.vue");
var cookiePrompt_vue_1 = require("@components/popups/cookiePrompt.vue");
var rightSidebarProfile_vue_1 = require("@components/sidebar/rightSidebarProfile.vue");
var leftSidebarColumns_vue_1 = require("@components/sidebar/leftSidebarColumns.vue");
exports["default"] = vue_1.defineComponent({
    name: "WelcomePage",
    data: function () {
        return {
            num: 1
        };
    },
    props: {},
    components: {
        SidebarLayout: SidebarLayout_vue_1["default"],
        navbar_welcome: navbar_welcome_vue_1["default"],
        interface_welcome: interface_welcome_vue_1["default"],
        footerIndex: footerbar_common_vue_1["default"],
        cookiePrompt: cookiePrompt_vue_1["default"],
        rightSidebarProfile: rightSidebarProfile_vue_1["default"],
        leftSidebarColumns: leftSidebarColumns_vue_1["default"]
    },
    methods: {
        setCookies: function () {
            var cookiePrompt = this.$refs.cookiePrompt;
            cookiePrompt.setCookies();
        },
        toggleLeftSidebar: function () {
            var l = this.$refs.leftSidebar;
            l.toggle();
        },
        toggleRightSidebar: function () {
            var l = this.$refs.rightSidebar;
            l.toggle();
        }
    },
    mounted: function () { }
});
