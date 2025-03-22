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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var accounts_api_1 = require("@/api/accounts/accounts_api");
var site_messages_api_1 = require("@/api/site_messages/site_messages_api");
var MSG_TYPE_MAP = {
    0: 'system_information',
    1: 'announcement',
    2: 'notification',
    3: 'user_message',
    4: 'comment'
};
var SiteMessageServices = /** @class */ (function () {
    function SiteMessageServices() {
    }
    /**
     * convert site message brief to breief display data
     */
    SiteMessageServices.convertToDisplayData = function (messages) {
        return __awaiter(this, void 0, Promise, function () {
            var senderIds, senders, senderMap_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!messages.length) {
                            return [2 /*return*/, []];
                        }
                        senderIds = __spreadArrays(new Set(messages.map(function (m) { return m.from_id; })));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, accounts_api_1["default"].getAccountBriefList(senderIds)];
                    case 2:
                        senders = _a.sent();
                        senderMap_1 = new Map(senders.map(function (s) { return [s.id, s]; }));
                        return [2 /*return*/, messages.map(function (msg) {
                                var _a, _b;
                                return ({
                                    id: msg.id,
                                    msg_type: MSG_TYPE_MAP[msg.msg_type] || 'unknown',
                                    title: msg.title,
                                    content: msg.content,
                                    sender_name: ((_a = senderMap_1.get(msg.from_id)) === null || _a === void 0 ? void 0 : _a.name) || '',
                                    sender_avatar: ((_b = senderMap_1.get(msg.from_id)) === null || _b === void 0 ? void 0 : _b.avatar) || '',
                                    send_time: msg.send_time,
                                    is_read: msg.is_read
                                });
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get the display data of site messages
     * TODO : next version we may use pagination to get the messages list, not all at once
     * @param params
     */
    SiteMessageServices.getSiteMessageDisplayListInfo = function () {
        return __awaiter(this, void 0, Promise, function () {
            var data, displayData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, site_messages_api_1["default"].getUserSiteMessages()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, SiteMessageServices.convertToDisplayData(data)];
                    case 2:
                        displayData = _a.sent();
                        return [2 /*return*/, Promise.resolve(displayData)];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Failed to get message list:', error_2);
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SiteMessageServices;
}());
exports["default"] = SiteMessageServices;
