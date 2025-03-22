"use strict";
exports.__esModule = true;
var vue_i18n_1 = require("vue-i18n");
var _json_1 = require("@locales/en/.json");
var common_json_1 = require("@locales/zh/common.json");
var store_1 = require("@/store");
/**
 * This is common i18n instance for all components.
 * !TODO : use it in index.ts later.
 */
var i18n = vue_i18n_1.createI18n({
    locale: store_1.getPreferedLangCode(),
    fallbackLocale: "en",
    messages: {
        en: _json_1["default"],
        zh: common_json_1["default"]
    }
});
exports["default"] = i18n;
