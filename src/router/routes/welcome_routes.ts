export default [
    {
        path: '/',
        name: 'Welcome',
        component: () => import('@/pages/Welcome/WelcomePage.vue'),
        meta: {
            title: {
                en: "friedparrot's website - open source platform for blogs and resources",
                zh: 'friedparrot 资源分享站 - 专注开源的技术博客网站与资源平台',
            },
            checkAuth: true,
            requireAuth: false,
        },
    },
];
