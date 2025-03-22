"use strict";
exports.__esModule = true;
exports["default"] = [
    {
        path: '/drafts',
        name: 'Drafts',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/blogs/drafts/overview.vue'); }); },
        meta: {
            title: {
                en: 'Drafts',
                zh: '草稿箱'
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login'
        }
    },
    {
        path: '/drafts/edit/:uuid',
        name: 'EditDraft',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/blogs/drafts/editDraft.vue'); }); },
        meta: {
            title: {
                en: 'Edit Draft',
                zh: '编辑草稿'
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login'
        }
    },
];
