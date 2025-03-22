import { createStdRoutes } from '@/router';

export default createStdRoutes([
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/profile/profile.vue'),
        meta: {
            title: {
                en: 'Profile',
                zh: '个人信息',
            },
            checkAuth: true,
            requireAuth: true,
        },
    },
    {
        path: '/profile/:user_id',
        name: 'account-profile',
        component: () => import('@/pages/profile/account_profile.vue'),
        meta: {
            title: {
                en: 'Account Profile',
                zh: '账号信息',
            },
            checkAuth: true,
            requireAuth: false,
        },
    },
]);
