"use strict";
exports.__esModule = true;
var lang_1 = require("@/locales/lang");
/**
 * Description Useful Tool function,  used for showing floating alert.
 * @param {any} emailAlertRef:any
 * @param {any} //inputthe$refs.floatingAlertsucceed:boolean=true
 * @param {any} msg:string="emailsendsuccessfully"
 * @returns {any}
 */
function showFloatingAlert(emailAlertRef, // input the $refs.floatingAlert
succeed, msg) {
    if (succeed === void 0) { succeed = true; }
    if (msg === void 0) { msg = 'This is a success message'; }
    if (emailAlertRef) {
        emailAlertRef.show(succeed ? 'success' : 'error', succeed
            ? lang_1["default"].global.t('g.success')
            : lang_1["default"].global.t('g.error'), msg);
    }
}
exports["default"] = showFloatingAlert;
