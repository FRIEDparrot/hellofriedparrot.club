"use strict";
exports.__esModule = true;
exports.setDarkMode = exports.getDarkMode = exports.setPreferedLangCode = exports.getPreferedLangCode = void 0;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var get_languages_1 = require("@lang/get_languages");
var lang_1 = require("@/locales/lang");
var priority_maps_1 = require("@/shared/priority_maps");
/** IMPORTANT: DO NOT use default_user object directly,
 *             every time use a whole object to assign state.user
 */
var default_user = {
    id: null,
    name: null,
    email: null,
    priority: 5,
    identity: 'guest',
    avatarUrl: null,
    registerTime: null,
    lastLoginTime: null,
    hidden_to_public: false,
    cloudSpace: 0,
    use_cookies: -1,
    information: {}
};
var default_personal_data = {
    bio: '',
    interest_tags: [],
    recommend_tags: [],
    history: vue_1.ref([]) < any[] >> ,
    following_num: 0,
    followers_num: 0,
    favorate_folder: [],
    preferred_msg_lang: 'en',
    msg_count: 0,
    blogs_num: 0
};
function setStateUser(user_info) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return {
        id: (_a = user_info.id) !== null && _a !== void 0 ? _a : null,
        name: (_b = user_info.name) !== null && _b !== void 0 ? _b : null,
        email: (_c = user_info.email) !== null && _c !== void 0 ? _c : null,
        priority: (_d = user_info.priority) !== null && _d !== void 0 ? _d : 5,
        identity: (_e = priority_maps_1.userPriorityMap[user_info.priority]) !== null && _e !== void 0 ? _e : 'guest',
        avatarUrl: (_f = user_info.avatar) !== null && _f !== void 0 ? _f : null,
        registerTime: (_g = user_info.registerTime) !== null && _g !== void 0 ? _g : null,
        lastLoginTime: (_h = user_info.lastLoginTime) !== null && _h !== void 0 ? _h : null,
        hidden_to_public: (_j = user_info.hidden_to_public) !== null && _j !== void 0 ? _j : false,
        information: (_k = user_info.information) !== null && _k !== void 0 ? _k : {},
        cloudSpace: (_l = user_info.cloud_space) !== null && _l !== void 0 ? _l : 0,
        use_cookies: (_m = user_info.use_cookies) !== null && _m !== void 0 ? _m : -1
    };
}
function setStatePersonalData(personal_data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return {
        bio: (_a = personal_data.bio) !== null && _a !== void 0 ? _a : '',
        interest_tags: (_b = personal_data.interest_tags) !== null && _b !== void 0 ? _b : [],
        recommend_tags: (_c = personal_data.recommend_tags) !== null && _c !== void 0 ? _c : [],
        history: (_d = personal_data.history) !== null && _d !== void 0 ? _d : [],
        favorate_folder: (_e = personal_data.favorate_folder) !== null && _e !== void 0 ? _e : [],
        preferred_msg_lang: (_f = personal_data.preferred_msg_lang) !== null && _f !== void 0 ? _f : 'en',
        // this would be sync
        following_num: (_g = personal_data.follows) !== null && _g !== void 0 ? _g : 0,
        followers_num: (_h = personal_data.followers) !== null && _h !== void 0 ? _h : 0,
        msg_count: (_j = personal_data.msg_count) !== null && _j !== void 0 ? _j : 0,
        blogs_num: (_k = personal_data.blogs_count) !== null && _k !== void 0 ? _k : 0
    };
}
// create Vuex store instance here first
var store = vuex_1.createStore({
    // state variables
    state: {
        authorized: false,
        user: default_user,
        user_personal_data: default_personal_data,
        darkMode: false,
        langCode: 'en'
    },
    mutations: {
        authorizeUser: function (state, user_info) {
            // note: there is different between user_info(backend response) and state.user object
            state.user = setStateUser(user_info);
            state.authorized = true; // set authorized to true
        },
        unAuthorizeUser: function (state) {
            state.authorized = false;
            state.user = default_user; // change to default guest user
        },
        setUserPersonalData: function (state, user_personal_data) {
            state.user_personal_data = setStatePersonalData(user_personal_data);
        },
        updateUserInterestTags: function (state, interest_tags) {
            state.user_personal_data.interest_tags = interest_tags;
        },
        setUseCookies: function (state, use_cookies) {
            state.user.use_cookies = use_cookies;
        },
        setDarkMode: function (state, mode) {
            state.darkMode = mode;
            localStorage.setItem('darkMode', mode ? 'true' : 'false');
        },
        setLangCode: function (state, code) {
            state.langCode = code;
            localStorage.setItem('langCode', code);
        }
    }
});
/**
 * Description
 * This is the basic function to get the prefered language code from local storage
 * IF WANT CURRENT LANG CODE, ALL FILES SHOULD CALL THIS FUNCTION
 *      or use browser language
 *
 * WARN : use this.$i18n.locale || "en" to get the current language code in vue component,
 *      especially in computed property or methods to get responsive data
 *
 *      only use this function in api module to get the prefered language code
 *
 * @returns {string} language code string
 */
function getPreferedLangCode() {
    var langCode = localStorage.getItem('langCode');
    if (langCode == null) {
        var browserLangCode = get_languages_1.getBrowserLanguage(); // get the browser language code from navigator
        langCode = browserLangCode;
        langCode = get_languages_1.isSupportedLanguage(langCode) ? langCode : 'en';
    }
    store.state.langCode = langCode;
    lang_1.SetLanguage(langCode);
    localStorage.setItem('langCode', langCode);
    return langCode;
}
exports.getPreferedLangCode = getPreferedLangCode;
/**
 * Description
 *      This is the global set language function
 *      Set the Prefered language code in the local storage
 * @param {any} langCode:string
 * @returns {void}
 */
function setPreferedLangCode(langCode) {
    if (get_languages_1.isSupportedLanguage(langCode)) {
        store.commit('setLangCode', langCode);
        lang_1.SetLanguage(langCode);
    }
    else {
        console.error("Language code " + langCode + " is not supported!");
    }
}
exports.setPreferedLangCode = setPreferedLangCode;
/**
 * Description
 *      Get the current dark mode state from local storage
 * !TODO Use `window.matchMedia('(prefers-color-scheme: dark)').matches` to detect system theme
 * @returns {any}
 */
function getDarkMode() {
    var darkMode = localStorage.getItem('darkMode');
    store.state.darkMode = darkMode == 'true';
    if (darkMode == 'true') {
        return true;
    }
    return false; // not dark mode by default
}
exports.getDarkMode = getDarkMode;
function setDarkMode(mode) {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    if (!mode || (currentTheme === 'dark') !== mode) {
        store.commit('setDarkMode', mode);
        document.documentElement.setAttribute('data-theme', mode ? 'dark' : 'light');
        if (mode) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }
}
exports.setDarkMode = setDarkMode;
exports["default"] = store;
