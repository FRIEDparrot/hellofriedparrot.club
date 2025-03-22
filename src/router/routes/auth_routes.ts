import { createStdRoutes } from '@/router';

export default createStdRoutes([
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@pages/auth/login/loginPage.vue'),
        meta: {
            title: {
                en: 'Login Page',
                zh: '登录 - friedparrot 资源分享站',
            },
            checkAuth: true,
            requireAuth: false,
        },
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@pages/auth/register/registerPage.vue'),
        meta: {
            title: {
                en: 'Register Page',
                zh: '注册 - friedparrot 资源分享站',
            },
            checkAuth: true,
            requireAuth: false,
        },
    },
]);
