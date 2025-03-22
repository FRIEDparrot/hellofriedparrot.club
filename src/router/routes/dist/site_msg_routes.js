"use strict";
exports.__esModule = true;
var router_1 = require("@/router");
exports["default"] = router_1.createStdRoutes([
    {
        path: '/site-messages',
        name: 'SiteMessages',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/site-messages/site_messages.vue'); }); },
        meta: {
            title: {
                en: 'Site Messages',
                zh: '站内消息'
            },
            checkAuth: true,
            requireAuth: true
        }
    },
]);
