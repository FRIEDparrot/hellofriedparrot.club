"use strict";
exports.__esModule = true;
var router_1 = require("@/router");
exports["default"] = router_1.createStdRoutes([
    {
        path: '/profile',
        name: 'profile',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/profile/profile.vue'); }); },
        meta: {
            title: {
                en: 'Profile',
                zh: '个人信息'
            },
            checkAuth: true,
            requireAuth: true
        }
    },
    {
        path: '/profile/:user_id',
        name: 'account-profile',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/profile/account_profile.vue'); }); },
        meta: {
            title: {
                en: 'Account Profile',
                zh: '账号信息'
            },
            checkAuth: true,
            requireAuth: false
        }
    },
]);
