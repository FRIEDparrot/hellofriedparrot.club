const undeveloped_routes = [
    {
        path: '/notdeveloped',
        name: 'NotDeveloped',
        component: () => import('@/pages/errors/pageNotDeveloped.vue'),
        meta: {
            title: {
                en: 'Page Not Developed',
                zh: '页面正在建设中',
            },
            checkAuth: false,
        },
    },
    {
        path: '/columns/create',
        name: 'CreateColumn',
        redirect: '/notdeveloped',
    },
    {
        path: '/resources/create',
        name: 'CreateResource',
        redirect: '/notdeveloped',
    },
    {
        path: '/projects/create',
        name: 'CreateProject',
        redirect: '/notdeveloped',
    },
    {
        path: '/resources',
        name: 'Resources',
        redirect: '/notdeveloped',
    },
    {
        path: '/projects',
        name: 'Projects',
        redirect: '/notdeveloped',
    },
    {
        path: '/forums',
        name: 'Forums',
        redirect: '/notdeveloped',
    },
    {
        path: '/products',
        name: 'Products',
        redirect: '/notdeveloped',
    },
];

export default undeveloped_routes;
