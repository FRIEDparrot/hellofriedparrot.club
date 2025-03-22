"use strict";
exports.__esModule = true;
var notfound_routes = [
    {
        path: '/notfound',
        name: 'NotFound',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/errors/pageNotFound.vue'); }); }
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/errors/pageNotFound.vue'); }); },
        meta: {
            title: {
                en: 'Page Not Found',
                zh: '页面未找到'
            },
            checkAuth: false
        }
    },
];
exports["default"] = notfound_routes;
