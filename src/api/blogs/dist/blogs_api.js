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
var api_1 = require("@/api");
function makeUrl(url) {
    var base_url = '/blogs';
    return "" + base_url + url;
}
var BlogsApi = /** @class */ (function () {
    function BlogsApi() {
    }
    /**
     * Description get blog list by table data request params
     * @param {any} params:IstdDataTableRequestParams
     * @returns {any}
     */
    BlogsApi.getBlogList = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var url, response;
            return __generator(this, function (_a) {
                url = makeUrl('/getlist');
                response = api_1.ResponseHandler(function () {
                    return api_1.postRequestWithCredentials(url, params);
                });
                return [2 /*return*/, response];
            });
        });
    };
    /**
     * Description Used for  get blog in history and record
     * @param {any} uuid_list:string[]
     * @returns {any}
     */
    BlogsApi.getBlogListByUUIDList = function (uuid_list) {
        return __awaiter(this, void 0, Promise, function () {
            var url, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = makeUrl('/getlist-uuid');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.postRequestWithCredentials(url, {
                                uuid_list: uuid_list
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BlogsApi.getUserBlogList = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var url, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = makeUrl('/getlist-user');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.postRequestWithCredentials(url, params)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BlogsApi.getBlogContent = function (uuid) {
        return __awaiter(this, void 0, Promise, function () {
            var url, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = makeUrl("/content/" + uuid);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.getRequestWithCredentials(url)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BlogsApi.getBlogUserContent = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = makeUrl("/content-user/" + uuid);
                return [2 /*return*/, api_1.getRequestWithCredentials(url)];
            });
        });
    };
    BlogsApi.deleteBlog = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = makeUrl("/delete/" + uuid);
                return [2 /*return*/, api_1.deleteRequestWithCredentials(url)];
            });
        });
    };
    BlogsApi.reSubmitBlog = function (uuid, data) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = makeUrl("/resubmit/" + uuid);
                return [2 /*return*/, function () { return api_1.postRequestWithCredentials(url, {}); }];
            });
        });
    };
    BlogsApi.setBlogFeatured = function (uuid, featured) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = makeUrl("/set-featured");
                return [2 /*return*/, api_1.patchRequestWithCredentials(url, {
                        uuid: uuid,
                        featured: featured
                    })];
            });
        });
    };
    BlogsApi.getBlogReviewContent = function (uuid) {
        return __awaiter(this, void 0, Promise, function () {
            var url, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = makeUrl("/review/content/" + uuid);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1.getRequestWithCredentials(url)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BlogsApi;
}());
exports["default"] = BlogsApi;
// export async function updateBlog(data: any) {
//     const url = makeUrl('/update');
//     return ResponseHandler(() => postRequestWithCredentials(url, data));
// }
