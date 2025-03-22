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
var store_1 = require("@/store");
var api_1 = require("@/api");
var store_2 = require("@/store");
var TokenApi = /** @class */ (function () {
    function TokenApi() {
    }
    /**
     * Description
     *     Login State Verification API
     * @returns {any}
     */
    TokenApi.verifyToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.postRequestWithCredentials('/auth/token/verify', null)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description Global function for verify the user token
     *      check if user is loggedd in (authenticated) or not.
     * @returns {any}
     */
    TokenApi.VerifyUserToken = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response, user_info, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!store_2["default"].state.authorized) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, TokenApi.verifyToken()];
                    case 2:
                        response = _a.sent();
                        user_info = response.data.user_info;
                        store_2["default"].commit('authorizeUser', user_info);
                        return [2 /*return*/, Promise.resolve(response)];
                    case 3:
                        error_2 = _a.sent();
                        // do nothing, user is not authorized, error would be automatically logged
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 4: return [2 /*return*/, Promise.resolve(null)];
                }
            });
        });
    };
    /**
     * Description Global function for delete the user token
     *      once called this  funcction, it will remove the user token from the server
     *      also it will remove the user info from the store.
     *      user will be logged out.
     * @returns {any}
     */
    TokenApi.DeleteUserToken = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.postRequestWithCredentials('auth/token/delete', null)];
                    case 1:
                        response = _a.sent();
                        store_2["default"].commit('unAuthorizeUser'); // remove the user info from the store
                        return [2 /*return*/, Promise.resolve(response)];
                    case 2:
                        error_3 = _a.sent();
                        // token delete failed, so it is still valid
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TokenApi.setUserCookiesUsage = function (use_cookies) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, api_1.postRequestWithCredentials('auth/token/set-use-cookies', {
                        use_cookies: use_cookies
                    })];
            });
        });
    };
    /**
     * TODO: refresh token expirations in backend (not implemented yet)
     * Description Global function for reset the user token expirations time
     *      used when user change the cookie settings on the browser.
     * @returns {any}
     */
    TokenApi.resetTokenExpirations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1["default"].post('auth/token/reset', null, {
                                withCredentials: true,
                                params: {
                                    lang: store_1.getPreferedLangCode()
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response)];
                    case 2:
                        error_4 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TokenApi;
}());
exports["default"] = TokenApi;
