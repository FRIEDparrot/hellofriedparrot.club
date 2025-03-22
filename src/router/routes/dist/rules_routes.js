"use strict";
exports.__esModule = true;
exports["default"] = [
    {
        /* for language selection, we use locale for the path */
        path: '/rules/:file_path(.*)',
        name: 'rules',
        component: function () { return Promise.resolve().then(function () { return require('@pages/rules/rules_Index.vue'); }); },
        props: true,
        meta: {
            title: {
                en: 'Website Rules and Privacy Policies',
                zh: '网站规则与隐私政策'
            },
            checkAuth: true,
            requireAuth: false
        }
    },
];
