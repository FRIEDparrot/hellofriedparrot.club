"use strict";
exports.__esModule = true;
exports.get_user_name = exports.get_user_avatar_url = exports.get_user_avatar = exports.get_defalut_avatar = exports.get_user_role = void 0;
var index_1 = require("@store/index");
var index_2 = require("@lang/index");
var web_image_load_1 = require("@functions/web_image_load");
/**
 * This function is used to load user avator
 */
function get_user_role() {
    return index_1["default"].state.user.role;
}
exports.get_user_role = get_user_role;
var DefaultUserAvatorUrl = "/src/assets/imgs/ui/user-default.svg";
function get_defalut_avatar() {
    try {
        var img = web_image_load_1.loadImage(DefaultUserAvatorUrl);
        return img;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
exports.get_defalut_avatar = get_defalut_avatar;
function get_user_avatar() {
    var user_identity = index_1["default"].state.user.role;
    var avator_url = index_1["default"].state.user.avatorUrl;
    if (user_identity === "Guest") {
        return get_defalut_avatar();
    }
    try {
        var img = web_image_load_1.loadImage(avator_url);
        return img;
    }
    catch (error) {
        console.error("failed to load user avator: ", error);
        return get_defalut_avatar();
    }
}
exports.get_user_avatar = get_user_avatar;
function get_user_avatar_url() {
    if (index_1["default"].state.user.role === "Guest") {
        return DefaultUserAvatorUrl;
    }
    try {
        web_image_load_1.loadImage(index_1["default"].state.user.avatorUrl);
        return index_1["default"].state.user.avatorUrl;
    }
    catch (error) {
        console.error("failed to load user avator: ", error);
        return DefaultUserAvatorUrl;
    }
}
exports.get_user_avatar_url = get_user_avatar_url;
function get_user_name() {
    if (index_1["default"].state.user.role === "Guest") {
        return index_2["default"].global.t("index.user_modules.user_priority_name.username_guest");
    }
    return index_1["default"].state.user.name;
}
exports.get_user_name = get_user_name;
