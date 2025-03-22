"use strict";
exports.__esModule = true;
var router_1 = require("@/router");
exports["default"] = router_1.createStdRoutes([
    {
        path: '/blogs',
        name: 'blogs_index',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/blogs/index.vue'); }); },
        meta: {
            title: {
                en: 'Blogs',
                zh: '博客'
            },
            checkAuth: true,
            requireAuth: false
        }
    },
    {
        path: '/blogs/:uuid',
        name: 'blogs_read',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/blogs/read/readBlog.vue'); }); },
        meta: {
            title: {
                en: 'read blog',
                zh: '阅读博客'
            },
            checkAuth: true,
            requireAuth: false
        }
    },
]);
