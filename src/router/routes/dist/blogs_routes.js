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
        path: '/blogs/create',
        name: 'CreateBlog',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/blogs/create/createNewBlog.vue'); }); },
        meta: {
            title: {
                en: 'create new blog',
                zh: '新建博客'
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login'
        }
    },
    {
        path: '/blogs/revision/:uuid',
        name: 'BlogRevision',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/blogs/revision/blog_revision.vue'); }); },
        meta: {
            title: {
                en: 'blog revision',
                zh: '博客修改'
            },
            checkAuth: true,
            requireAuth: true
        }
    },
    {
        path: '/blogs/review/:uuid',
        name: 'BlogReview',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/blogs/review/blog_review.vue'); }); },
        meta: {
            title: {
                en: 'blog review',
                zh: '博客审核'
            },
            checkAuth: true,
            requireAuth: true,
            requiredPriority: 1,
            failAuthRedirect: '/home'
        }
    },
    {
        path: '/blogs/:uuid',
        name: 'blogs_read',
        // @ts-ignore
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
