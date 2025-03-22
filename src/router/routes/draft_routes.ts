import { RouteRecordRaw } from 'vue-router';

export default [
    {
        path: '/drafts',
        name: 'Drafts',
        component: () => import('@/pages/blogs/drafts/overview.vue'),
        meta: {
            title: {
                en: 'Drafts',
                zh: '草稿箱',
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login',
        },
    },
    {
        path: '/drafts/edit/:uuid',
        name: 'EditDraft',
        component: () => import('@/pages/blogs/drafts/editDraft.vue'),
        meta: {
            title: {
                en: 'Edit Draft',
                zh: '编辑草稿',
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login',
        },
    },
] as RouteRecordRaw[];
