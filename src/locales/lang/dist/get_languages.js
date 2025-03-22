"use strict";
exports.__esModule = true;
exports.getBrowserLanguage = exports.isSupportedLanguage = exports.SupportedLanguages = void 0;
exports.SupportedLanguages = ["en", "zh"];
function isSupportedLanguage(str) {
    return exports.SupportedLanguages.includes(str);
}
exports.isSupportedLanguage = isSupportedLanguage;
function getBrowserLanguage() {
    var nav = window.navigator;
    var browser_langanage_code = navigator.languages[0].split("-")[0];
    var language_code = browser_langanage_code.toLowerCase();
    if (language_code != "en" && language_code != "zh") {
        return "en"; // fall back to English if language is not supported
    }
    return language_code;
}
exports.getBrowserLanguage = getBrowserLanguage;
