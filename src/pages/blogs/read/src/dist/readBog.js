"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var navbar_welcome_vue_1 = require("@components/nav/navbar_welcome.vue");
var leftSidebarBtnContent_vue_1 = require("@/components/sidebar/leftSidebarBtnContent.vue");
exports["default"] = vue_1.defineComponent({
    name: 'ReadBog',
    setup: function () { },
    components: {
        navbar_welcome: navbar_welcome_vue_1["default"],
        leftSidebarBtnContent: leftSidebarBtnContent_vue_1["default"]
    },
    toggleLeftSidebar: function () {
        var left_sidebar = this.$refs.left_sidebar;
        left_sidebar.show();
    }
});
