"use strict";
exports.__esModule = true;
var router_1 = require("@/router");
exports["default"] = router_1.createStdRoutes([
    {
        path: '/auth/login',
        name: 'Login',
        component: function () { return Promise.resolve().then(function () { return require('@pages/auth/login/loginPage.vue'); }); },
        meta: {
            title: {
                en: 'Login Page',
                zh: '登录 - friedparrot 资源分享站'
            },
            checkAuth: true,
            requireAuth: false
        }
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: function () { return Promise.resolve().then(function () { return require('@pages/auth/register/registerPage.vue'); }); },
        meta: {
            title: {
                en: 'Register Page',
                zh: '注册 - friedparrot 资源分享站'
            },
            checkAuth: true,
            requireAuth: false
        }
    },
]);
