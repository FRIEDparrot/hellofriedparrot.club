"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.patchRequestWithCredentials = exports.deleteRequestWithCredentials = exports.deleteRequest = exports.postRequestWithCredentials = exports.postRequest = exports.getRequestWithCredentials = exports.getRequest = exports.ResponseHandler = void 0;
var axios_1 = require("axios");
var lang_1 = require("@/locales/lang");
var store_1 = require("@/store");
/**
 * This File Contains the response Object and most common request and response handlers
 *
 * Rules :
 *     1. The api folder structure is same as the `blueprints` folder structure
 *          in the backend, with every folder specifies the url for convenience
 *
 *     2. If any request use lang_code specific response,
 *         it should add `lang` as a parameter in the request function.
 *         get it by `import { getPreferedLangCode } from "@/store";`
 *
 *     3. api layer just post or get data, request the url and return the response
 *             it not set store.state, or do any other logic.
 *             the state logic, etc, should be handled in "service" layer
 *
 *     4. naming : all of the functions should use camelCase method naming
 */
var request = axios_1["default"].create({
    // use the  5000 port for the backend server,
    //      in production, change it to hellofriedparrot.club/api
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
});
exports["default"] = request;
/**
 * @note we make a common request type handler here, for fit the
 *    response data format of the backend api.
 *
 * @important no need to  check (status code == 200) after request
 *      if use this as base
 */
function ResponseHandler(reuqestFunc) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, Promise, function () {
        var response, error_1, errorMsg, statusCode, res, res;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _o.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, reuqestFunc()];
                case 1:
                    response = _o.sent();
                    // must have data property in response object.
                    return [2 /*return*/, Promise.resolve(response.data)];
                case 2:
                    error_1 = _o.sent();
                    if (axios_1["default"].isAxiosError(error_1)) {
                        errorMsg = (_e = (_d = (_c = (_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : error_1.message) !== null && _e !== void 0 ? _e : lang_1["default"].global.t('g.ServerdownError');
                        statusCode = (_m = (_l = (_j = (_h = (_g = (_f = error_1.response) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.error) === null || _h === void 0 ? void 0 : _h.code) !== null && _j !== void 0 ? _j : (_k = error_1.response) === null || _k === void 0 ? void 0 : _k.status) !== null && _l !== void 0 ? _l : error_1.status) !== null && _m !== void 0 ? _m : 500;
                        res = {
                            message: errorMsg,
                            error_code: statusCode
                        };
                        return [2 /*return*/, Promise.reject(res)];
                    }
                    else {
                        res = {
                            message: error_1.message ||
                                lang_1["default"].global.t('g.ServerUnknownError'),
                            error_code: 500
                        };
                        // return a ResponseError object
                        return [2 /*return*/, Promise.reject(res)];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.ResponseHandler = ResponseHandler;
/**
 * Description Standard get request handler
 * @param {any} url:string
 * @returns {any}
 */
function getRequest(url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ResponseHandler(function () {
                    return request.get(url, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: __assign(__assign({}, params), { lang: store_1.getPreferedLangCode() })
                    });
                })];
        });
    });
}
exports.getRequest = getRequest;
function getRequestWithCredentials(url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ResponseHandler(function () {
                    return request.get(url, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true,
                        params: __assign(__assign({}, params), { lang: store_1.getPreferedLangCode() })
                    });
                })];
        });
    });
}
exports.getRequestWithCredentials = getRequestWithCredentials;
/**
 * Description Standard post request handler
 * @param {any} url:string
 * @param {any} data:any
 * @returns {any}
 */
function postRequest(url, data, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ResponseHandler(function () {
                    return request.post(url, JSON.stringify(data), {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: __assign(__assign({}, params), { lang: store_1.getPreferedLangCode() })
                    });
                })];
        });
    });
}
exports.postRequest = postRequest;
/**
 * Description Standard post request with credentials handler
 *    note : only post request and take `use_cookies` tag
 * @param {any} url:string
 * @param {any} data:any
 * @returns {any}
 */
function postRequestWithCredentials(url, data, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ResponseHandler(function () {
                    return request.post(url, JSON.stringify(data), {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: __assign(__assign({}, params), { lang: store_1.getPreferedLangCode() })
                    });
                })];
        });
    });
}
exports.postRequestWithCredentials = postRequestWithCredentials;
function deleteRequest(url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ResponseHandler(function () {
                    return request["delete"](url, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: __assign(__assign({}, params), { lang: store_1.getPreferedLangCode() })
                    });
                })];
        });
    });
}
exports.deleteRequest = deleteRequest;
function deleteRequestWithCredentials(url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ResponseHandler(function () {
                    return request["delete"](url, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: __assign(__assign({}, params), { lang: store_1.getPreferedLangCode() })
                    });
                })];
        });
    });
}
exports.deleteRequestWithCredentials = deleteRequestWithCredentials;
function patchRequestWithCredentials(url, data, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ResponseHandler(function () {
                    return request.patch(url, JSON.stringify(data), {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                })];
        });
    });
}
exports.patchRequestWithCredentials = patchRequestWithCredentials;
