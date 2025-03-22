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
var vue_1 = require("vue");
var token_api_1 = require("@/api/auth/token_api");
var store_1 = require("@/store");
exports["default"] = vue_1.defineComponent({
    name: 'CookiePrompt',
    props: {
        checkAtStart: {
            type: Boolean,
            "default": true
        }
    },
    data: function () {
        return {
            showCookiePrompt: false,
            snackbar: false,
            snackbarText: ''
        };
    },
    mounted: function () {
        var authenticated = store_1["default"].state.authorized;
        var use_cookies_set = store_1["default"].state.user.use_cookies in [0, 1, 2];
        if (authenticated && !use_cookies_set) {
            this.show(); // only show for authenticated user who haven't set cookies yet
        }
    },
    methods: {
        show: function () {
            var authenticated = store_1["default"].state.authorized;
            if (authenticated) {
                // show popup when valid user is logged in
                this.showCookiePrompt = true;
            }
            else {
                this.snackbarText = this.$t('common.cookiePrompt.loginFirst');
                this.snackbar = true;
            }
        },
        setUserCookies: function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var authenticated, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            authenticated = store_1["default"].state.authorized;
                            if (!authenticated) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, token_api_1["default"].setUserCookiesUsage(value)];
                        case 2:
                            response = _a.sent();
                            store_1["default"].commit('setUseCookies', value);
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            alert(this.$t('g.UnknownError') + ' : ' + error_1.message);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.snackbarText = this.$t('common.cookiePrompt.loginFirst');
                            this.snackbar = true;
                            _a.label = 6;
                        case 6:
                            this.showCookiePrompt = false; // close the popup when set failed
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
});
