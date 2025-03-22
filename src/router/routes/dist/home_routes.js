"use strict";
exports.__esModule = true;
exports["default"] = [
    {
        path: '/home',
        name: 'Home',
        component: function () { return Promise.resolve().then(function () { return require('@pages/Home/HomePage.vue'); }); },
        meta: {
            title: {
                en: 'Home',
                zh: '主页'
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login'
        },
        children: [
            {
                path: '',
                name: 'Main',
                component: function () { return Promise.resolve().then(function () { return require('@pages/Home/views/main_view.vue'); }); },
                meta: {
                    title: {
                        en: 'Home',
                        zh: '主页'
                    },
                    checkAuth: true,
                    requireAuth: true
                }
            },
        ]
    },
];
