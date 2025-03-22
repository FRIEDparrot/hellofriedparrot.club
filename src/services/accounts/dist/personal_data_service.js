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
var personal_data_api_1 = require("@/api/personal_data/personal_data_api");
var personal_data_tags_api_1 = require("@/api/personal_data/personal_data_tags_api");
/**
 * In Servive Layer, the Logic to access user status and personal information is implemented.
 *     the service should call api layer to get response, and then update the store with the response.
 *
 * Especially for the asynchoronous operation
 *
 * to make distinct from 'api' layer, the function name should use lower case and underscore.
 *      e.g. get_personal_info() or get_user_info()
 *      in api layer, the function name should use camel case.
 */
/**
 * For Personal Information, it sync every times when refresh if
 *     the user is authorized.
 *
 * Since Vue is a SPA environment, when some items changed,
 *      we both commit to database and update the vuex store state.
 */
var PersonalDataService = /** @class */ (function () {
    function PersonalDataService() {
    }
    /**
     * Description sync user personal information with server.
     * @returns {any}
     */
    PersonalDataService.sync_personal_data = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, personal_data_api_1["default"].getPersonalData()];
                    case 1:
                        response = _a.sent();
                        store_1["default"].commit('setUserPersonalData', response);
                        return [2 /*return*/, Promise.resolve(response)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PersonalDataService.update_user_interest_tags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            var tag_keys, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tag_keys = tags.map(function (tag) { return tag.key; });
                        return [4 /*yield*/, personal_data_tags_api_1["default"].updateUserTags(tag_keys)];
                    case 1:
                        response = _a.sent();
                        store_1["default"].commit('updateUserInterestTags', tags);
                        return [2 /*return*/, Promise.resolve(response)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PersonalDataService;
}());
exports["default"] = PersonalDataService;
