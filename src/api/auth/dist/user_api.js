"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.registerNewUser = exports.logoutUser = exports.loginUserByEmail = exports.loginUserByUsername = exports.getUserInfo = void 0;
var api_1 = require("@/api");
var api_2 = require("@/api");
var store_1 = require("@/store");
var token_verify_api_1 = require("@api/auth/token_verify_api");
// !TODO : FINISH THIS
function getUserInfo(user_id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, api_2.ResponseHandler(function () {
                    return api_1["default"].get("/user", {
                        params: {
                            id: user_id,
                            lang: store_1.getPreferedLangCode() || "en"
                        }
                    });
                })];
        });
    });
}
exports.getUserInfo = getUserInfo;
/**
 * Description Submit the login form data With UserName and Passwor
 * @param {any} login_form_data:any  The json data of the form
 * @returns {any}
 *       Promise (use try... catch  or then... catch):
 *         - succeed : response
 *         - failed  : error { error_code,  message }
 */
function loginUserByUsername(login_form_data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, api_2.ResponseHandler(function () {
                    return api_1["default"].post("auth/login/name", login_form_data, {
                        // allow cookies to be sent with cross-site requests
                        withCredentials: true,
                        params: {
                            lang: store_1.getPreferedLangCode() || "en"
                        }
                    });
                })];
        });
    });
}
exports.loginUserByUsername = loginUserByUsername;
/**
 * Description Submit the login form data With Email and Verification Code
 * @param {any} login_form_data:any  The json data of the for
 * @returns {any}
 *      Promise :
 *         - succeed : response
 *         - failed  : error { error_code,  message }
 */
function loginUserByEmail(login_form_data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, api_2.ResponseHandler(function () {
                    return api_1["default"].post("auth/login/email", login_form_data, {
                        withCredentials: true,
                        params: {
                            lang: store_1.getPreferedLangCode() || "en"
                        }
                    });
                })];
        });
    });
}
exports.loginUserByEmail = loginUserByEmail;
/**
 * Description Just delete the token from the server and reload the page
 *
 * @returns {any}
 */
function logoutUser() {
    return __awaiter(this, void 0, Promise, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, token_verify_api_1.DeleteUserToken()];
                case 1:
                    response = _a.sent();
                    window.location.reload();
                    return [2 /*return*/, Promise.resolve(true)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.logoutUser = logoutUser;
/**
 * Description
 * @param {any} registerFormData:any
 * @returns {any}
 *       Promise :
 *         - succeed : response
 *         - failed  : error { error_code,  message }
 */
function registerNewUser(registerFormData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, api_2.ResponseHandler(function () {
                    return api_1["default"].post("auth/register/submit", registerFormData, {
                        params: {
                            lang: store_1.getPreferedLangCode() || "en"
                        }
                    });
                })];
        });
    });
}
exports.registerNewUser = registerNewUser;
