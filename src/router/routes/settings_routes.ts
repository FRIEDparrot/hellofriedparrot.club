import { createStdRoutes } from '@/router';

export default createStdRoutes([
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@pages/settings/settings.vue'),
        meta: {
            title: {
                en: 'Settings',
                zh: '设置',
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login',
        },
    },
]);
