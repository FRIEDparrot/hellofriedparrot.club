"use strict";
exports.__esModule = true;
var router_1 = require("@/router");
exports["default"] = router_1.createStdRoutes([
    {
        path: '/settings',
        name: 'Settings',
        component: function () { return Promise.resolve().then(function () { return require('@pages/settings/settings.vue'); }); },
        meta: {
            title: {
                en: 'Settings',
                zh: '设置'
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login'
        }
    },
]);
