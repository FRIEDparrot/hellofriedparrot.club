"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var store_1 = require("@/store");
var logout_api_1 = require("@/api/auth/logout_api");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var clickIconList_vue_1 = require("@components/lists/clickIconList.vue");
exports["default"] = vue_1.defineComponent({
    props: {
        location: {
            type: String,
            "default": 'bottom'
        }
    },
    components: {
        floatingAlert: floatingAlert_vue_1["default"],
        clickIconList: clickIconList_vue_1["default"]
    },
    data: function () {
        var _this = this;
        return {
            menuOpen: false,
            user: store_1["default"].state.user,
            user_personal_data: store_1["default"].state.user_personal_data,
            UserPanelItems: [
                // for user and manager
                {
                    icon: 'mdi-home',
                    titleKey: 'g.myHomePage',
                    callback: function (event) {
                        _this.navigateTo(event, '/home');
                    },
                    priority: 4
                },
                {
                    icon: 'mdi-star',
                    titleKey: 'g.myStars',
                    callback: function (event) {
                        _this.navigateTo(event, '/notDeveloped');
                        // TODO:  this.navigateTo(event, "/stars");
                    },
                    priority: 4
                },
                {
                    icon: 'mdi-bell',
                    badge: store_1["default"].state.user_personal_data.msg_count > 0
                        ? true
                        : false,
                    badgeContent: store_1["default"].state.user_personal_data.msg_count,
                    titleKey: 'g.myNotifications',
                    callback: function (event) {
                        _this.navigateTo(event, '/site-messages');
                    },
                    priority: 4
                },
                {
                    type: 'divider',
                    priority: 1
                },
                {
                    icon: 'mdi-console',
                    titleKey: 'g.console',
                    callback: function (event) {
                        _this.navigateTo(event, '/console');
                    },
                    priority: 1
                },
                {
                    type: 'divider',
                    priority: 4
                },
                {
                    icon: 'mdi-logout',
                    titleKey: 'g.logout',
                    callback: function (event) {
                        _this.logout();
                    },
                    priority: 4
                },
            ]
        };
    },
    methods: {
        navigateTo: function (event, path) {
            event.preventDefault();
            if (event.ctrlKey || event.metaKey) {
                window.open(path, '_blank');
            }
            else {
                this.$router.push(path);
            }
        },
        logout: function () {
            var _this = this;
            logout_api_1["default"].logoutUser()
                .then()["catch"](function (error) {
                showFloatingAlert_1["default"](_this.$refs.floatingAlert, false, _this.$t('common.userPanelMenu.logoutError') +
                    ' : ' +
                    error.message);
            });
        }
    }
});
