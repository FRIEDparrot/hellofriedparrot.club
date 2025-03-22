import { createStdRoutes } from '@/router';

export default createStdRoutes([
    {
        path: '/blogs',
        name: 'blogs_index', // search page for blogs
        component: () => import('@/pages/blogs/index.vue'),
        meta: {
            title: {
                en: 'Blogs',
                zh: '博客',
            },
            checkAuth: true,
            requireAuth: false,
        },
    },
    {
        path: '/blogs/create',
        name: 'CreateBlog',
        component: () => import('@/pages/blogs/create/createNewBlog.vue'),
        meta: {
            title: {
                en: 'create new blog',
                zh: '新建博客',
            },
            checkAuth: true,
            requireAuth: true,
            failAuthRedirect: '/auth/login',
        },
    },
    {
        path: '/blogs/revision/:uuid',
        name: 'BlogRevision',
        component: () => import('@/pages/blogs/revision/blog_revision.vue'),
        meta: {
            title: {
                en: 'blog revision',
                zh: '博客修改',
            },
            checkAuth: true,
            requireAuth: true,
        },
    },
    {
        path: '/blogs/review/:uuid',
        name: 'BlogReview',
        component: () => import('@/pages/blogs/review/blog_review.vue'),
        meta: {
            title: {
                en: 'blog review',
                zh: '博客审核',
            },
            checkAuth: true,
            requireAuth: true,
            requiredPriority: 1,
            failAuthRedirect: '/home',
        },
    },
    {
        path: '/blogs/:uuid',
        name: 'blogs_read',
        // @ts-ignore
        component: () => import('@/pages/blogs/read/readBlog.vue'),
        meta: {
            title: {
                en: 'read blog',
                zh: '阅读博客',
            },
            checkAuth: true,
            requireAuth: false,
        },
    },
]);
