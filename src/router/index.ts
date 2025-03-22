import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getPreferedLangCode } from '@/store';
import { SetLanguage } from '@lang/index'; // common i18n instance
import TokenApi from '@/api/auth/token_api';
import store from '@/store';
import auth_routes from './routes/auth_routes';
import blogs_routes from './routes/blogs_routes';
import console_routes from './routes/console_routes';
import draft_routes from './routes/draft_routes';
import welcome_routes from './routes/welcome_routes';
import home_routes from './routes/home_routes';
import rules_routes from './routes/rules_routes';
import profile_routes from './routes/profile_routes';
import undeveloped_routes from './routes/undeveloped_routes';
import notfound_routes from './routes/notfound_routes';
import settings_routes from './routes/settings_routes';
import site_msg_routes from './routes/site_msg_routes';
import PersonalDataService from '@/services/accounts/personal_data_service';

// #region Routes Interface definitions
/**
 * Routes and Page Titles are defined here.
 *
 * meta:
 * - title: the title of the page, an object with language code as key and title as value
 * - checkAuth (default: true): if true, check if user has valid authenticated token
 * - requireAuth (default: false): if true, when user is not authenticated, it would be redirected to `failAuthRedirect` page
 * - failAuthRedirect: when `requireAuth == true` & user not authenticated, redirect to this page (default: "/auth/login")
 * - requiredPriority (default: 5): the required user priority to access the page (default: 5: guest)
 *         to see more about priiority, see api/auth/priority_api/userPriorityMap
 *
 * for public routes with no user panel needed, set `checkAuth` to false
 * for public routes with user panel, set `checkAuth` to true and `requireAuth` to false
 * for private routes, set `checkAuth` to true and `requireAuth` to true
 */

interface RouteMeta {
    title: {
        en: string;
        zh: string;
    };
    checkAuth?: boolean; // when checkAuth is false, no need set requireAuth
    requireAuth?: boolean; // when requireAuth is false, no need set failAuthRedirect
    requiredPriority?: number;
    failAuthRedirect?: string;
}

interface IstdRouteRecord {
    path: string;
    name: string;
    component?: () => Promise<any>;
    meta?: RouteMeta;
    children?: IstdRouteRecord[];
    redirect?: string;
}

export function createStdRoutes(route: IstdRouteRecord[]): RouteRecordRaw[] {
    route.forEach((r) => {
        if (r.redirect && r.component) {
            throw new Error(
                'Route cannot have both `redirect` and `component`.',
            );
        }
        if (r.component && !r.meta) {
            throw new Error('Route with `component` must have `meta`.');
        }
    });
    return route as RouteRecordRaw[];
}
// #endregion

// #region Routes definitions
const routes: Array<RouteRecordRaw> = [
    ...welcome_routes,
    ...auth_routes,
    ...blogs_routes,
    ...home_routes,
    ...console_routes,
    ...rules_routes,
    ...draft_routes,
    ...settings_routes,
    ...profile_routes,
    ...site_msg_routes,
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/about/about.vue'),
        meta: {
            title: {
                en: 'About',
                zh: '关于',
            },
            checkAuth: false,
        },
    },
    {
        path: '/rules',
        name: 'rules_redirect',
        redirect: '/rules/index',
    },
    {
        path: '/support',
        name: 'Support',
        redirect: '/about',
    },
    ...undeveloped_routes,
    ...notfound_routes,
];

const router = createRouter({
    history: createWebHistory(), // use createWebHistory to use the HTML5 history API
    routes,
});
// #endregion

// #region Router Guards
router.beforeEach((to, from, next) => {
    // checkAuth is used for just render some ui components
    const checkAuth = to.meta?.checkAuth ?? true;
    if (checkAuth === true) {
        // check if user has valid authenticated token
        TokenApi.VerifyUserToken()
            .then((response: any) => {
                PersonalDataService.sync_personal_data();
                // authenticated successfully
                const user_priority = store.state.user.priority ?? 5;
                const required_priority =
                    Number(to.meta?.requiredPriority) ?? 5;
                // check user priority, default is 5 (guest)
                if (user_priority > required_priority) {
                    next('/notfound');
                }
                next();
            })
            .catch((error) => {
                if (to.meta?.requireAuth === true) {
                    next(to.meta?.failAuthRedirect ?? '/auth/login');
                } else {
                    // requireAuth is false
                    next();
                }
            });
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    const lang_code = getPreferedLangCode();
    SetLanguage(lang_code || 'en');
    const title = to.meta?.title?.[lang_code || 'en'] as string | undefined;
    document.title = title ?? "friedparrot's website";
});

router.onError((err, to) => {
    if (
        err?.message?.includes?.('Failed to fetch dynamically imported module')
    ) {
        if (!localStorage.getItem('vuetify:dynamic-reload')) {
            localStorage.setItem('vuetify:dynamic-reload', 'true');
            location.assign(to.fullPath);
        } else {
            console.error(
                'Dynamic import error, reloading page did not fix it',
                err,
            );
        }
    } else {
        console.error(err);
    }
});

router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload');
});
// #endregion

export default router;
