export default [
    {
        path: '/home',
        name: 'Home', // optional
        component: () => import('@pages/Home/HomePage.vue'),
        meta: {
            title: {
                en: 'Home',
                zh: '主页',
            },
            checkAuth: true,
            requireAuth: true, // if not authenticated, redirect to login page
            failAuthRedirect: '/auth/login',
        },
        children: [
            {
                path: '',
                name: 'Main',
                component: () => import('@pages/Home/views/main_view.vue'),
                meta: {
                    title: {
                        en: 'Home',
                        zh: '主页',
                    },
                    checkAuth: true,
                    requireAuth: true,
                },
            },
        ],
    },
];
