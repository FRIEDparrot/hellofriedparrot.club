"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var vue_1 = require("vue");
var index_1 = require("@store/index");
var userAvatar_vue_1 = require("@components/user/userAvatar.vue");
var priority_maps_1 = require("@/shared/priority_maps");
var compactFolderList_vue_1 = require("@components/lists/compactFolderList.vue");
var logout_api_1 = require("@/api/auth/logout_api");
exports["default"] = vue_1.defineComponent({
    name: 'rightSidebarProfile',
    components: {
        userAvatar: userAvatar_vue_1["default"],
        compactFolderList: compactFolderList_vue_1["default"]
    },
    props: {
        absPos: {
            type: Boolean,
            "default": false
        },
        zIndex: {
            type: Number,
            "default": 2000
        }
    },
    computed: {
        get_user_info: function () {
            return index_1["default"].state.user;
        }
    },
    data: function () {
        return {
            drawer: false,
            user: __assign(__assign({}, index_1["default"].state.user), { borderColor: priority_maps_1.PriorityBorderColorMap[index_1["default"].state.user.priority] }),
            profilePanelItems: [
                {
                    titleKey: 'panels.profile.dashboard',
                    icon: 'mdi-view-dashboard',
                    priority: 4,
                    open: true,
                    child: [
                        {
                            titleKey: 'g.myHomePage',
                            icon: 'mdi-home-outline',
                            url: '/home'
                        },
                        {
                            titleKey: 'g.myNotifications',
                            icon: 'mdi-bell-outline',
                            badge: true,
                            badgeContent: index_1["default"].state.user_personal_data.msg_count
                        },
                        {
                            titleKey: 'g.myStars',
                            icon: 'mdi-star-outline',
                            url: '/notdeveloped'
                        },
                        {
                            titleKey: 'g.history',
                            icon: 'mdi-history',
                            url: '/notdeveloped'
                        },
                    ]
                },
                {
                    titleKey: 'panels.profile.creations',
                    icon: 'mdi-folder-multiple-outline',
                    priority: 4,
                    open: true,
                    child: [
                        {
                            titleKey: 'panels.profile.createNew',
                            icon: 'mdi-plus-circle-outline',
                            open: false,
                            child: [
                                {
                                    titleKey: 'panels.profile.newBlog',
                                    icon: 'mdi-pencil-outline',
                                    url: '/blogs/create',
                                    priority: 4
                                },
                                {
                                    titleKey: 'panels.profile.newColumn',
                                    icon: 'mdi-note-plus-outline',
                                    url: '/notdeveloped',
                                    priority: 4
                                },
                                {
                                    titleKey: 'panels.profile.newResource',
                                    icon: 'mdi-upload',
                                    url: '/notdeveloped',
                                    priority: 3
                                },
                                {
                                    titleKey: 'panels.profile.newProject',
                                    icon: 'mdi-folder-plus-outline',
                                    url: '/notdeveloped',
                                    priority: 3
                                },
                            ]
                        },
                        {
                            titleKey: 'panels.profile.contentCenter',
                            icon: 'mdi-folder-multiple-image',
                            url: '/notdeveloped'
                        },
                        {
                            titleKey: 'panels.profile.comments',
                            icon: 'mdi-comment-text-multiple-outline',
                            url: '/notdeveloped'
                        },
                    ]
                },
                {
                    titleKey: 'panels.profile.console',
                    priority: 1,
                    icon: 'mdi-console',
                    open: true,
                    child: [
                        {
                            titleKey: 'panels.profile.reviews',
                            icon: 'mdi-format-list-bulleted',
                            url: '/console/reviews',
                            priority: 1
                        },
                        {
                            titleKey: 'panels.profile.userManagement',
                            icon: 'mdi-account-multiple-outline',
                            url: '/console/user-management',
                            priority: 1
                        },
                        {
                            titleKey: 'panels.profile.serverManagement',
                            icon: 'mdi-database-cog',
                            url: '/console/server-monitor',
                            priority: 1
                        },
                        {
                            titleKey: 'panels.profile.ipRestriction',
                            icon: 'mdi-lock-alert-outline',
                            url: '/console/ip-restriction',
                            priority: 1
                        },
                        {
                            titleKey: 'panels.profile.violationActions',
                            icon: 'mdi-alert-outline',
                            url: '/console/violation-actions',
                            priority: 1
                        },
                    ]
                },
                {
                    titleKey: 'panels.profile.accountSettings',
                    icon: 'mdi-cog',
                    priority: 4,
                    open: false,
                    child: [
                        {
                            titleKey: 'panels.profile.editProfile',
                            icon: 'mdi-account-edit',
                            url: '/notdeveloped'
                        },
                        {
                            titleKey: 'panels.profile.passwordSettings',
                            icon: 'mdi-lock',
                            url: '/notdeveloped'
                        },
                    ]
                },
            ]
        };
    },
    methods: {
        open: function () {
            this.drawer = true;
        },
        toggle: function () {
            this.drawer = !this.drawer;
        },
        close: function () {
            this.drawer = false;
        },
        logout: function () {
            logout_api_1["default"].logoutUser()
                .then(function (response) { })["catch"](function (error) {
                console.error(error);
            });
        },
        navigateTo: function (event, path) {
            if (event.ctrlKey || event.metaKey) {
                window.open(path, '_blank');
            }
            else {
                this.$router.push(path);
            }
        }
    }
});
