const notfound_routes = [
    {
        path: '/notfound',
        name: 'NotFound',
        component: () => import('@/pages/errors/pageNotFound.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('@/pages/errors/pageNotFound.vue'),
        meta: {
            title: {
                en: 'Page Not Found',
                zh: '页面未找到',
            },
            checkAuth: false,
        },
    },
];

export default notfound_routes;
