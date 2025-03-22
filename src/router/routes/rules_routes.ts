export default [
    {
        /* for language selection, we use locale for the path */
        path: '/rules/:file_path(.*)', // we use the regex to match any page_name file path
        name: 'rules',
        component: () => import('@pages/rules/rules_Index.vue'),
        props: true, // dynamic route
        meta: {
            title: {
                en: 'Website Rules and Privacy Policies',
                zh: '网站规则与隐私政策',
            },
            checkAuth: true,
            requireAuth: false,
        },
    },
];
