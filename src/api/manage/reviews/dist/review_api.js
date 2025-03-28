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
exports.acceptAccountMod = exports.acceptRegister = exports.acceptReview = exports.getAccountModTableData = exports.getRegisterTableData = exports.getReviewsTableData = void 0;
var store_1 = require("@/store");
var api_1 = require("@/api");
var stdDataTableServer_1 = require("@/components/interface/stdDataTableServer");
/**
 * Description
 * @param {any} pageNum:number
 * @param {any} itemsPerPage:number
 * @param {any} sortBy:string
 * @param {any} searchKey:string=""
 * @param {any} search:string=""
 * @returns {any}
 */
function getReviewsTableData(params) {
    return __awaiter(this, void 0, Promise, function () {
        var pageNum, itemsPerPage, orderBy, order, searchKey, search, data;
        return __generator(this, function (_a) {
            pageNum = params.pageNum, itemsPerPage = params.itemsPerPage, orderBy = params.orderBy, order = params.order, searchKey = params.searchKey, search = params.search;
            data = stdDataTableServer_1.makeStdTableDataRequest(params);
            try {
            }
            catch (error) { }
            return [2 /*return*/, Promise.resolve([])];
        });
    });
}
exports.getReviewsTableData = getReviewsTableData;
/**
 * Description API for get part of the Resigtration table data from database
 */
function getRegisterTableData(params) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = stdDataTableServer_1.makeStdTableDataRequest(params);
            // update filters by searchKey and search
            return [2 /*return*/, api_1.ResponseHandler(function () {
                    return api_1.postRequestWithCredentials("/manage/reviews/register/getlist", JSON.stringify(data));
                })];
        });
    });
}
exports.getRegisterTableData = getRegisterTableData;
function getAccountModTableData(params) {
    return __awaiter(this, void 0, void 0, function () {
        var pageNum, itemsPerPage, orderBy, order, searchKey, search, data;
        return __generator(this, function (_a) {
            pageNum = params.pageNum, itemsPerPage = params.itemsPerPage, orderBy = params.orderBy, order = params.order, searchKey = params.searchKey, search = params.search;
            data = {
                start: (pageNum - 1) * itemsPerPage,
                cnt: itemsPerPage,
                filters: {}
            };
            return [2 /*return*/];
        });
    });
}
exports.getAccountModTableData = getAccountModTableData;
function acceptReview(params) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
exports.acceptReview = acceptReview;
/**
 * Description consent or reject registration submission
 * @param {any} id:number
 * @param {any} accept:boolean
 * @returns {any}
 */
function acceptRegister(params) {
    return __awaiter(this, void 0, void 0, function () {
        var accept, id_list, sendMsg, reason;
        return __generator(this, function (_a) {
            accept = params.accept, id_list = params.id_list, sendMsg = params.sendMsg, reason = params.reason;
            if (accept) {
                return [2 /*return*/, api_1.ResponseHandler(function () {
                        return api_1["default"].post("/manage/reviews/register/accept", JSON.stringify({ idList: id_list, informUser: sendMsg }), {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            withCredentials: true,
                            params: {
                                lang: store_1.getPreferedLangCode()
                            }
                        });
                    })];
            }
            else {
                return [2 /*return*/, api_1.ResponseHandler(function () {
                        return api_1["default"].post("/manage/reviews/register/reject", JSON.stringify({
                            idList: id_list,
                            informUser: sendMsg,
                            reason: reason
                        }), {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            withCredentials: true,
                            params: {
                                lang: store_1.getPreferedLangCode()
                            }
                        });
                    })];
            }
            return [2 /*return*/];
        });
    });
}
exports.acceptRegister = acceptRegister;
function acceptAccountMod(accept, id_list, sendMsg, reason) {
    if (reason === void 0) { reason = null; }
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
exports.acceptAccountMod = acceptAccountMod;
