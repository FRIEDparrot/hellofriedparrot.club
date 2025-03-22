"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var navbar_simple_vue_1 = require("@components/nav/navbar_simple.vue");
var rightSidebarProfile_vue_1 = require("@components/sidebar/rightSidebarProfile.vue");
var leftSidebarBtnExpand_vue_1 = require("@components/sidebar/leftSidebarBtnExpand.vue");
var footerbar_common_vue_1 = require("@components/footer/footerbar_common.vue");
exports["default"] = vue_1.defineComponent({
    name: "Console",
    components: {
        navbarSimple: navbar_simple_vue_1["default"],
        rightSidebarProfile: rightSidebarProfile_vue_1["default"],
        leftSidebarBtnExpand: leftSidebarBtnExpand_vue_1["default"],
        footerbar_common: footerbar_common_vue_1["default"]
    },
    methods: {
        toggleRightSidebar: function () {
            var rightSidebar = this.$refs.rightSidebar;
            rightSidebar.toggle();
        }
    },
    data: function () {
        var _this = this;
        return {
            tab: 0,
            leftSidebarItems: [
                {
                    titleKey: "panels.profile.reviews",
                    icon: "mdi-police-badge",
                    callback: function () {
                        _this.$router.push("/console/reviews");
                    }
                },
                {
                    titleKey: "panels.profile.userManagement",
                    icon: "mdi-account",
                    callback: function () {
                        _this.$router.push("/console/user-management");
                    }
                },
                {
                    titleKey: "panels.profile.serverManagement",
                    icon: "mdi-server",
                    callback: function () {
                        _this.$router.push("/console/server-monitor");
                    }
                },
                {
                    titleKey: "panels.profile.ipRestriction",
                    icon: "mdi-lock",
                    callback: function () {
                        _this.$router.push("/console/ip-restriction");
                    }
                },
                {
                    titleKey: "panels.profile.violationActions",
                    icon: "mdi-alert",
                    callback: function () {
                        _this.$router.push("/console/violation-actions");
                    }
                },
            ],
            headers: [
                {
                    align: "start",
                    key: "name",
                    title: "Table Name"
                },
                { key: "description", title: "Description" },
                { key: "actions", title: "Actions" },
                { key: "date", title: "Date" },
            ],
            items: [
                {
                    name: "Reviews",
                    description: "View and manage reviews",
                    actions: "View",
                    date: "2021-08-10"
                },
            ]
        };
    }
});
