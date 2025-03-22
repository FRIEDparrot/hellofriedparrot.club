import { createStdRoutes } from '@/router';

export default createStdRoutes([
    {
        path: '/console',
        name: 'Console',
        component: () => import('@pages/console/console.vue'),
        meta: {
            title: {
                en: 'Control Panel',
                zh: '控制台',
            },
            checkAuth: true,
            requireAuth: true,
            requiredPriority: 1, // 1: Manager
            failAuthRedirect: '/auth/login',
        },
        children: [
            {
                path: '',
                name: 'Dashboard',
                redirect: '/console/reviews',
            },
            {
                path: 'reviews',
                name: 'Reviews',
                component: () => import('@pages/console/views/reviews.vue'),
                meta: {
                    title: {
                        en: 'Review Lists',
                        zh: '审核列表',
                    },
                },
            },
            {
                path: 'user-management',
                name: 'UserManagement',
                component: () => import('@pages/console/views/userManage.vue'),
            },
            {
                path: 'server-monitor',
                name: 'ServerMonitor',
                component: () =>
                    import('@pages/console/views/serverMonitor.vue'),
            },
            {
                path: 'ip-restriction',
                name: 'IpRestriction',
                component: () =>
                    import('@pages/console/views/ipRestriction.vue'),
            },
            {
                path: 'violation-actions',
                name: 'ViolationActions',
                component: () =>
                    import('@pages/console/views/violationActions.vue'),
            },
        ],
    },
]);
