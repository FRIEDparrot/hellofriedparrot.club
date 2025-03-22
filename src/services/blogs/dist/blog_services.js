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
var accounts_api_1 = require("@/api/accounts/accounts_api");
var blogs_api_1 = require("@/api/blogs/blogs_api");
var cache_1 = require("@/store/cache");
var BlogServices = /** @class */ (function () {
    function BlogServices() {
    }
    /**
     * Description Make dispaly data iterator for blog list page,
     *     The display data iterator is type of IblogDisplayData[]
     *     map it to any data iterator you want to display in blog list page.
     * @param {any} data:IresBlogBrief[]
     * @returns {any}
     */
    BlogServices.convertBlogToDisplayData = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var author_id_set, allTagKeys, uniqueTagKeys, author_info_list_1, cachedTags, tagMap_1, disp_data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        author_id_set = new Set(data.map(function (item) { return item.author_id; }));
                        allTagKeys = data.flatMap(function (item) { return item.tags; });
                        uniqueTagKeys = Array.from(new Set(allTagKeys));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, accounts_api_1["default"].getAccountBriefList(Array.from(author_id_set))];
                    case 2:
                        author_info_list_1 = _a.sent();
                        return [4 /*yield*/, cache_1["default"].dispatch('updateInterestByKeys', uniqueTagKeys)];
                    case 3:
                        _a.sent();
                        cachedTags = cache_1["default"].getters.getInterestTagByKeyList(uniqueTagKeys);
                        tagMap_1 = new Map(cachedTags.map(function (tag) { return [tag.key, tag]; }));
                        disp_data = data.map(function (item) {
                            var authorInfo = author_info_list_1.find(function (a) { return a.id === item.author_id; });
                            if (!authorInfo)
                                throw new Error("Author " + item.author_id + " not found");
                            return {
                                bannerImage: item.banner_image || null,
                                authorId: item.author_id,
                                authorName: authorInfo.name,
                                authorAvatar: authorInfo.avatar || null,
                                featured: item.featured,
                                title: item.title,
                                abstract: item.abstract || '',
                                tags: item.tags
                                    .map(function (key) { return tagMap_1.get(key); })
                                    .filter(Boolean),
                                viewsNum: item.view_count,
                                starsNum: item.star_count,
                                wordCount: item.word_count,
                                publishTime: item.publish_time,
                                lastModifyTime: item.last_modify_time,
                                uuid: item.uuid,
                                isPrivate: item.is_private
                            };
                        });
                        return [2 /*return*/, Promise.resolve(disp_data)];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description Simple function to get blog display data list just like
     *      common getlist API function
     * @param {any} params:IstdTableDataRequest
     * @returns {any}
     */
    BlogServices.getBlogDisplayDataListInfo = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var response, data, disp_data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, blogs_api_1["default"].getBlogList(params)];
                    case 1:
                        response = _a.sent();
                        data = response.tableData;
                        return [4 /*yield*/, BlogServices.convertBlogToDisplayData(data)];
                    case 2:
                        disp_data = _a.sent();
                        // return both full display data and total count
                        return [2 /*return*/, Promise.resolve({
                                data: disp_data,
                                count: response.count
                            })];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BlogServices.getBlogDisplayDataByUUID = function (uuid_list) {
        return __awaiter(this, void 0, Promise, function () {
            var data, disp_data, dataMap, _i, disp_data_1, blog, data_res, _a, uuid_list_1, uuid, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, blogs_api_1["default"].getBlogListByUUIDList(uuid_list)];
                    case 1:
                        data = _b.sent();
                        return [4 /*yield*/, BlogServices.convertBlogToDisplayData(data)];
                    case 2:
                        disp_data = _b.sent();
                        dataMap = new Map();
                        for (_i = 0, disp_data_1 = disp_data; _i < disp_data_1.length; _i++) {
                            blog = disp_data_1[_i];
                            dataMap.set(blog.uuid, blog);
                        }
                        data_res = [];
                        for (_a = 0, uuid_list_1 = uuid_list; _a < uuid_list_1.length; _a++) {
                            uuid = uuid_list_1[_a];
                            if (dataMap.has(uuid)) {
                                data_res.push(dataMap.get(uuid));
                            }
                        }
                        // return only one display data,
                        // since not a table query function, no need to return count
                        return [2 /*return*/, Promise.resolve(data_res)];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description get other information, and
     *      Convert blog brief data to display data
     * @param {any} data:IresBlogContent
     * @returns {any}
     */
    BlogServices.getBlogContentDispData = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var author_info_list, author_info, tagKeys, cachedTags, dispData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, accounts_api_1["default"].getAccountBriefList([
                                data.author_id,
                            ])];
                    case 1:
                        author_info_list = _a.sent();
                        if (!author_info_list) {
                            throw new Error("Author " + data.author_id + " not found");
                        }
                        author_info = author_info_list[0];
                        tagKeys = Array.from(new Set(data.tags));
                        return [4 /*yield*/, cache_1["default"].dispatch('updateInterestByKeys', tagKeys)];
                    case 2:
                        _a.sent();
                        cachedTags = cache_1["default"].getters.getInterestTagByKeyList(tagKeys);
                        dispData = {
                            bannerImage: data.banner_image || null,
                            authorId: data.author_id,
                            authorName: author_info.name,
                            authorAvatar: author_info.avatar || null,
                            content: data.content,
                            commentsNum: 0,
                            featured: data.featured,
                            title: data.title,
                            abstract: data.abstract || '',
                            tags: cachedTags,
                            viewsNum: data.view_count,
                            starsNum: data.star_count,
                            wordCount: data.word_count,
                            publishTime: data.publish_time,
                            lastModifyTime: data.last_modify_time,
                            uuid: data.uuid,
                            isPrivate: data.is_private
                        };
                        return [2 /*return*/, Promise.resolve(dispData)];
                    case 3:
                        error_4 = _a.sent();
                        console.error(error_4);
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BlogServices;
}());
exports["default"] = BlogServices;
