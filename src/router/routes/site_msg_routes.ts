import { createStdRoutes } from '@/router';

export default createStdRoutes([
    {
        path: '/site-messages',
        name: 'SiteMessages',
        component: () => import('@/pages/site-messages/site_messages.vue'),
        meta: {
            title: {
                en: 'Site Messages',
                zh: '站内消息',
            },
            checkAuth: true,
            requireAuth: true,
        },
    },
]);
