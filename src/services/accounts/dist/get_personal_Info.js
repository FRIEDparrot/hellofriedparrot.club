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
exports.get_personal_data = void 0;
var store_1 = require("@/store");
var personal_data_api_1 = require("@/api/personal_data/personal_data_api");
/**
 * In Servive Layer, the Logic to access user status and personal information is implemented.
 *      the service should call api layer to get response, and then update the store with the response.
 *
 * to make distinct from 'api' layer, the function name should use lower case and underscore.
 *      e.g. get_personal_info() or get_user_info()
 *      in api layer, the function name should use camel case.
 */
function get_personal_data() {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, Promise, function () {
        var personal_data, last_sync_time, current_time, sync_interval, response, data, error_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    personal_data = store_1["default"].state.user_personal_data;
                    last_sync_time = (_a = store_1["default"].state.user_personal_data.last_sync_time) !== null && _a !== void 0 ? _a : null;
                    current_time = new Date().getTime();
                    sync_interval = 5 * 60 * 1000;
                    if (last_sync_time && current_time - last_sync_time < sync_interval) {
                        return [2 /*return*/, Promise.resolve(personal_data)];
                    }
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, personal_data_api_1.getPersonalData()];
                case 2:
                    response = _g.sent();
                    console.log(response);
                    data = {
                        interest_tags: (_b = response.interest_tags) !== null && _b !== void 0 ? _b : [],
                        recommend_tags: (_c = response.recommend_tags) !== null && _c !== void 0 ? _c : [],
                        history: (_d = response.history) !== null && _d !== void 0 ? _d : [],
                        last_sync_time: (_e = response.last_sync_time) !== null && _e !== void 0 ? _e : null,
                        msg_count: (_f = response.msg_count) !== null && _f !== void 0 ? _f : 0
                    };
                    store_1["default"].commit("setUserPersonalData", response);
                    return [2 /*return*/, Promise.resolve(response)];
                case 3:
                    error_1 = _g.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.get_personal_data = get_personal_data;
