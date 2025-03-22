import { ref } from 'vue';
import { createStore } from 'vuex';
import { getBrowserLanguage, isSupportedLanguage } from '@lang/get_languages';
import { SetLanguage } from '@/locales/lang';
import { userPriorityMap } from '@/shared/priority_maps';
import InterestTag from '@/interface/classes/interestTag_cls';

/** IMPORTANT: DO NOT use default_user object directly,
 *             every time use a whole object to assign state.user
 */
const default_user = {
    id: null,
    name: null,
    email: null,
    priority: 5,
    identity: 'guest', // guest, user, manager,
    avatarUrl: null,
    registerTime: null,
    lastLoginTime: null,
    hidden_to_public: false,
    cloudSpace: 0,
    use_cookies: -1, // unset
    information: {},
};

const default_personal_data = {
    bio: '',
    interest_tags: [] as InterestTag[],
    recommend_tags: [] as InterestTag[],
    history: ref([]) as ReturnType<typeof ref<any[]>>,
    following_num: 0,
    followers_num: 0,
    favorate_folder: [],
    preferred_msg_lang: 'en',
    msg_count: 0,
    blogs_num: 0,
};

function setStateUser(user_info: any) {
    return {
        id: user_info.id ?? null,
        name: user_info.name ?? null,
        email: user_info.email ?? null,
        priority: user_info.priority ?? 5,
        identity: userPriorityMap[user_info.priority] ?? 'guest',
        avatarUrl: user_info.avatar ?? null,
        registerTime: user_info.registerTime ?? null,
        lastLoginTime: user_info.lastLoginTime ?? null,
        hidden_to_public: user_info.hidden_to_public ?? false,
        information: user_info.information ?? {},
        cloudSpace: user_info.cloud_space ?? 0,
        use_cookies: user_info.use_cookies ?? -1,
    };
}

function setStatePersonalData(personal_data: any) {
    return {
        bio: personal_data.bio ?? '',
        interest_tags: personal_data.interest_tags ?? ([] as InterestTag[]),
        recommend_tags: personal_data.recommend_tags ?? ([] as InterestTag[]),
        history: personal_data.history ?? [],
        favorate_folder: personal_data.favorate_folder ?? [],
        preferred_msg_lang: personal_data.preferred_msg_lang ?? 'en',

        // this would be sync
        following_num: personal_data.follows ?? 0,
        followers_num: personal_data.followers ?? 0,
        msg_count: personal_data.msg_count ?? 0,
        blogs_num: personal_data.blogs_count ?? 0,
    };
}

// create Vuex store instance here first
const store = createStore({
    // state variables
    state: {
        authorized: false,
        user: default_user,
        user_personal_data: default_personal_data,
        darkMode: false,
        langCode: 'en',
    },
    mutations: {
        authorizeUser(state, user_info) {
            // note: there is different between user_info(backend response) and state.user object
            state.user = setStateUser(user_info);
            state.authorized = true; // set authorized to true
        },
        unAuthorizeUser(state) {
            state.authorized = false;
            state.user = default_user; // change to default guest user
        },
        setUserPersonalData(state, user_personal_data) {
            state.user_personal_data = setStatePersonalData(user_personal_data);
        },
        updateUserInterestTags(state, interest_tags: InterestTag[]) {
            state.user_personal_data.interest_tags = interest_tags;
        },
        setUseCookies(state, use_cookies: number) {
            state.user.use_cookies = use_cookies;
        },
        setDarkMode(state, mode: boolean) {
            state.darkMode = mode;
            localStorage.setItem('darkMode', mode ? 'true' : 'false');
        },
        setLangCode(state, code) {
            state.langCode = code;
            localStorage.setItem('langCode', code);
        },
    },
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
export function getPreferedLangCode() {
    let langCode: string | null = localStorage.getItem('langCode');
    if (langCode == null) {
        const browserLangCode = getBrowserLanguage(); // get the browser language code from navigator
        langCode = browserLangCode;
        langCode = isSupportedLanguage(langCode) ? langCode : 'en';
    }
    store.state.langCode = langCode;
    SetLanguage(langCode);
    localStorage.setItem('langCode', langCode);
    return langCode;
}

/**
 * Description
 *      This is the global set language function
 *      Set the Prefered language code in the local storage
 * @param {any} langCode:string
 * @returns {void}
 */
export function setPreferedLangCode(langCode: string): void {
    if (isSupportedLanguage(langCode)) {
        store.commit('setLangCode', langCode);
        SetLanguage(langCode);
    } else {
        console.error(`Language code ${langCode} is not supported!`);
    }
}

/**
 * Description
 *      Get the current dark mode state from local storage
 * !TODO Use `window.matchMedia('(prefers-color-scheme: dark)').matches` to detect system theme
 * @returns {any}
 */
export function getDarkMode() {
    const darkMode: string | null = localStorage.getItem('darkMode');
    store.state.darkMode = darkMode == 'true';
    if (darkMode == 'true') {
        return true;
    }
    return false; // not dark mode by default
}

export function setDarkMode(mode: boolean) {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (!mode || (currentTheme === 'dark') !== mode) {
        store.commit('setDarkMode', mode);
        document.documentElement.setAttribute(
            'data-theme',
            mode ? 'dark' : 'light',
        );
        if (mode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}

export default store;
