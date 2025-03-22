"use strict";
exports.__esModule = true;
var router_1 = require("@/router");
exports["default"] = router_1.createStdRoutes([
    {
        path: '/console',
        name: 'Console',
        component: function () { return Promise.resolve().then(function () { return require('@pages/console/console.vue'); }); },
        meta: {
            title: {
                en: 'Control Panel',
                zh: '控制台'
            },
            checkAuth: true,
            requireAuth: true,
            requiredPriority: 1,
            failAuthRedirect: '/auth/login'
        },
        children: [
            {
                path: '',
                name: 'Dashboard',
                redirect: '/console/reviews'
            },
            {
                path: 'reviews',
                name: 'Reviews',
                component: function () { return Promise.resolve().then(function () { return require('@pages/console/views/reviews.vue'); }); },
                meta: {
                    title: {
                        en: 'Review Lists',
                        zh: '审核列表'
                    }
                }
            },
            {
                path: 'user-management',
                name: 'UserManagement',
                component: function () { return Promise.resolve().then(function () { return require('@pages/console/views/userManage.vue'); }); }
            },
            {
                path: 'server-monitor',
                name: 'ServerMonitor',
                component: function () {
                    return Promise.resolve().then(function () { return require('@pages/console/views/serverMonitor.vue'); });
                }
            },
            {
                path: 'ip-restriction',
                name: 'IpRestriction',
                component: function () {
                    return Promise.resolve().then(function () { return require('@pages/console/views/ipRestriction.vue'); });
                }
            },
            {
                path: 'violation-actions',
                name: 'ViolationActions',
                component: function () {
                    return Promise.resolve().then(function () { return require('@pages/console/views/violationActions.vue'); });
                }
            },
        ]
    },
]);
