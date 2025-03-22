"use strict";

exports.__esModule = true;
exports.setDarkMode = exports.getDarkMode = exports.setPreferedLangCode = exports.getPreferedLangCode = void 0;

var vuex_1 = require("vuex");

var get_languages_1 = require("@lang/get_languages");

var lang_1 = require("@/locales/lang");

var priority_api_1 = require("@/api/auth/priority_api");

var default_guest_user = {
  id: null,
  name: null,
  email: null,
  identity: "guest",
  avatorUrl: null,
  registerTime: null,
  lastLoginTime: null,
  hidden_to_public: false,
  infomation: "",
  cloudSpace: 0
}; // create Vuex store instance here first

var store = vuex_1.createStore({
  // state variables
  state: {
    authroized: false,
    user: default_guest_user,
    darkMode: false,
    langCode: "en"
  },
  mutations: {
    AuthorizeUser: function AuthorizeUser(state, user_info) {
      var _a;

      state.authroized = true;
      state.user = {
        id: user_info.id,
        name: user_info.name,
        email: user_info.email,
        identity: priority_api_1.userPriorityMap[user_info.priority],
        avatorUrl: user_info.avator,
        registerTime: user_info.registerTime,
        lastLoginTime: user_info.lastLoginTime,
        hidden_to_public: user_info.hidden_to_public,
        infomation: user_info.infomation,
        cloudSpace: user_info.cloudSpace
      }; // fill the lacked field if it is not exist in the user_info

      state.user.hidden_to_public = (_a = user_info.hidden_to_public) !== null && _a !== void 0 ? _a : false;
    },
    LogoutUser: function LogoutUser(state) {
      state.authroized = false;
      state.user = default_guest_user; // change to default guest user
    },
    setDarkMode: function setDarkMode(state, mode) {
      state.darkMode = mode;
      localStorage.setItem("darkMode", mode ? "true" : "false");
    },
    setLangCode: function setLangCode(state, code) {
      state.langCode = code;
      localStorage.setItem("langCode", code);
    }
  }
});
/**
 * Description
 * This is the basic function to get the prefered language code from local storage
 * IF WANT CURRENT LANG CODE, ALL FILES SHOULD CALL THIS FUNCTION
 *      or use browser language
 * @returns {string} language code string
 */

function getPreferedLangCode() {
  var langCode = localStorage.getItem("langCode");

  if (langCode == null) {
    var browserLangCode = get_languages_1.getBrowserLanguage(); // get the browser language code from navigator

    langCode = browserLangCode;
    langCode = get_languages_1.isSupportedLanguage(langCode) ? langCode : "en";
  }

  store.state.langCode = langCode;
  lang_1.SetLanguage(langCode);
  localStorage.setItem("langCode", langCode);
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
    store.commit("setLangCode", langCode);
    lang_1.SetLanguage(langCode);
  } else {
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
  var darkMode = localStorage.getItem("darkMode");
  store.state.darkMode = darkMode == "true";

  if (darkMode == "true") {
    return true;
  }

  return false; // not dark mode by default
}

exports.getDarkMode = getDarkMode;

function setDarkMode(mode) {
  store.commit("setDarkMode", mode);

  if (mode) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

exports.setDarkMode = setDarkMode;
exports["default"] = store;