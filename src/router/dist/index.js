"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.createStdRoutes = void 0;
var vue_router_1 = require("vue-router");
var store_1 = require("@/store");
var index_1 = require("@lang/index"); // common i18n instance
var token_api_1 = require("@/api/auth/token_api");
var store_2 = require("@/store");
var auth_routes_1 = require("./routes/auth_routes");
var blogs_routes_1 = require("./routes/blogs_routes");
var console_routes_1 = require("./routes/console_routes");
var draft_routes_1 = require("./routes/draft_routes");
var welcome_routes_1 = require("./routes/welcome_routes");
var home_routes_1 = require("./routes/home_routes");
var rules_routes_1 = require("./routes/rules_routes");
var profile_routes_1 = require("./routes/profile_routes");
var undeveloped_routes_1 = require("./routes/undeveloped_routes");
var notfound_routes_1 = require("./routes/notfound_routes");
var settings_routes_1 = require("./routes/settings_routes");
var site_msg_routes_1 = require("./routes/site_msg_routes");
var personal_data_service_1 = require("@/services/accounts/personal_data_service");
function createStdRoutes(route) {
    route.forEach(function (r) {
        if (r.redirect && r.component) {
            throw new Error('Route cannot have both `redirect` and `component`.');
        }
        if (r.component && !r.meta) {
            throw new Error('Route with `component` must have `meta`.');
        }
    });
    return route;
}
exports.createStdRoutes = createStdRoutes;
// #endregion
// #region Routes definitions
var routes = __spreadArrays(welcome_routes_1["default"], auth_routes_1["default"], blogs_routes_1["default"], home_routes_1["default"], console_routes_1["default"], rules_routes_1["default"], draft_routes_1["default"], settings_routes_1["default"], profile_routes_1["default"], site_msg_routes_1["default"], [
    {
        path: '/about',
        name: 'About',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/about/about.vue'); }); },
        meta: {
            title: {
                en: 'About',
                zh: '关于'
            },
            checkAuth: false
        }
    },
    {
        path: '/rules',
        name: 'rules_redirect',
        redirect: '/rules/index'
    },
    {
        path: '/support',
        name: 'Support',
        redirect: '/about'
    }
], undeveloped_routes_1["default"], notfound_routes_1["default"]);
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(),
    routes: routes
});
// #endregion
// #region Router Guards
router.beforeEach(function (to, from, next) {
    var _a, _b;
    // checkAuth is used for just render some ui components
    var checkAuth = (_b = (_a = to.meta) === null || _a === void 0 ? void 0 : _a.checkAuth) !== null && _b !== void 0 ? _b : true;
    if (checkAuth === true) {
        // check if user has valid authenticated token
        token_api_1["default"].VerifyUserToken()
            .then(function (response) {
            var _a, _b, _c;
            personal_data_service_1["default"].sync_personal_data();
            // authenticated successfully
            var user_priority = (_a = store_2["default"].state.user.priority) !== null && _a !== void 0 ? _a : 5;
            var required_priority = (_c = Number((_b = to.meta) === null || _b === void 0 ? void 0 : _b.requiredPriority)) !== null && _c !== void 0 ? _c : 5;
            // check user priority, default is 5 (guest)
            if (user_priority > required_priority) {
                next('/notfound');
            }
            next();
        })["catch"](function (error) {
            var _a, _b, _c;
            if (((_a = to.meta) === null || _a === void 0 ? void 0 : _a.requireAuth) === true) {
                next((_c = (_b = to.meta) === null || _b === void 0 ? void 0 : _b.failAuthRedirect) !== null && _c !== void 0 ? _c : '/auth/login');
            }
            else {
                // requireAuth is false
                next();
            }
        });
    }
    else {
        next();
    }
});
router.afterEach(function (to, from) {
    var _a, _b;
    var lang_code = store_1.getPreferedLangCode();
    index_1.SetLanguage(lang_code || 'en');
    var title = (_b = (_a = to.meta) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b[lang_code || 'en'];
    document.title = title !== null && title !== void 0 ? title : "friedparrot's website";
});
router.onError(function (err, to) {
    var _a, _b;
    if ((_b = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, 'Failed to fetch dynamically imported module')) {
        if (!localStorage.getItem('vuetify:dynamic-reload')) {
            localStorage.setItem('vuetify:dynamic-reload', 'true');
            location.assign(to.fullPath);
        }
        else {
            console.error('Dynamic import error, reloading page did not fix it', err);
        }
    }
    else {
        console.error(err);
    }
});
router.isReady().then(function () {
    localStorage.removeItem('vuetify:dynamic-reload');
});
// #endregion
exports["default"] = router;
