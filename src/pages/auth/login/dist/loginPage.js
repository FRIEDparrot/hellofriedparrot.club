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
var format_check_1 = require("@/utils/functions/format_check");
var login_api_1 = require("@/api/auth/login_api");
var lang_1 = require("@/locales/lang");
var captcha_api_1 = require("@api/auth/captcha_api");
require("@/assets/anims/animation_main");
var SidebarLayout_vue_1 = require("@/layout/SidebarLayout.vue");
var navbar_welcome_vue_1 = require("@components/nav/navbar_welcome.vue");
var homeBtn_vue_1 = require("@components/buttons/homeBtn.vue");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var leftSidebarColumns_vue_1 = require("@components/sidebar/leftSidebarColumns.vue");
exports["default"] = vue_1.defineComponent({
    name: 'LoginPage',
    components: {
        FloatingAlert: floatingAlert_vue_1["default"],
        navbar_welcome: navbar_welcome_vue_1["default"],
        HomeBtn: homeBtn_vue_1["default"],
        SidebarLayout: SidebarLayout_vue_1["default"],
        LeftSidebarWelcome: leftSidebarColumns_vue_1["default"]
    },
    setup: function () {
        var rules = {
            required: function (value) {
                return (!!value || lang_1["default"].global.t('login.warns.required'));
            },
            is_email: function (value) {
                return (format_check_1.checkEmailPattern(value) ||
                    lang_1["default"].global.t('login.warns.emailNotValid'));
            }
        };
        return {
            rules: rules
        };
    },
    data: function () {
        return {
            tab: null,
            showPassword: false,
            isLoadingCaptcha: false,
            loginAlert: {
                show: false,
                type: 'success',
                title: '',
                text: ''
            },
            isLoading: false,
            LoginForm_username: {
                username: '',
                password: ''
            },
            LoginForm_email: {
                email: '',
                verification_code: ''
            }
        };
    },
    methods: {
        /**
         * Description get Login email Captcha
         * @returns {any}
         */
        getLoginCaptcha: function (event) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.isLoadingCaptcha = true;
                            if (!!format_check_1.checkEmailPattern(this.LoginForm_email.email || '')) return [3 /*break*/, 1];
                            showFloatingAlert_1["default"](this.$refs.emailAlert, false, this.$t('login.warns.emailNotValid'));
                            return [3 /*break*/, 4];
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, captcha_api_1["default"].getCaptcha(captcha_api_1.captcha_base_url.login, {
                                    email: this.LoginForm_email.email
                                })];
                        case 2:
                            response = _b.sent();
                            showFloatingAlert_1["default"](this.$refs.emailAlert, true, this.$t('login.warns.emailSendSucceed'));
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _b.sent();
                            showFloatingAlert_1["default"](this.$refs.emailAlert, false, (_a = error_1.message) !== null && _a !== void 0 ? _a : this.$t('login.warns.UnknownError'));
                            return [3 /*break*/, 4];
                        case 4:
                            this.isLoadingCaptcha = false;
                            return [2 /*return*/];
                    }
                });
            });
        },
        redirectToHomePage: function () {
            this.$router.push('/home'); // redirect to home page
        },
        /**
         * Description submit login by username form and return the Login response
         * @param {any} event:any
         * @returns {any}
         */
        submitLoginByUserName: function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var success, message, results, data_res, form_data, response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isLoading = true;
                            success = false;
                            message = '';
                            return [4 /*yield*/, event];
                        case 1:
                            results = _a.sent();
                            data_res = results;
                            if (!(data_res.valid === true)) return [3 /*break*/, 6];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, 5, 6]);
                            form_data = this.LoginForm_username;
                            return [4 /*yield*/, login_api_1["default"].loginUserByPassword(form_data)];
                        case 3:
                            response = _a.sent();
                            success = true;
                            message = this.$t('login.warns.LoginSucceed');
                            return [3 /*break*/, 6];
                        case 4:
                            error_2 = _a.sent();
                            // use the dialog component to show the error message if login fails
                            message =
                                this.$t('login.warns.LoginFailed') +
                                    ' : ' +
                                    error_2.message;
                            return [3 /*break*/, 6];
                        case 5:
                            showFloatingAlert_1["default"](this.$refs.emailAlert, success, message);
                            if (success) {
                                setTimeout(this.redirectToHomePage, 1000);
                            }
                            return [7 /*endfinally*/];
                        case 6:
                            this.isLoading = false;
                            return [2 /*return*/];
                    }
                });
            });
        },
        submitLoginByEmail: function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var success, message, results, data_res, form_data, response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isLoading = true;
                            success = false;
                            message = '';
                            return [4 /*yield*/, event];
                        case 1:
                            results = _a.sent();
                            data_res = results;
                            if (!(data_res.valid === true)) return [3 /*break*/, 6];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, 5, 6]);
                            form_data = this.LoginForm_email;
                            return [4 /*yield*/, login_api_1["default"].loginUserByCaptcha(form_data)];
                        case 3:
                            response = _a.sent();
                            // token is saved in the store
                            success = true;
                            message = this.$t('login.warns.LoginSucceed');
                            return [3 /*break*/, 6];
                        case 4:
                            error_3 = _a.sent();
                            // use the dialog component to show the error message if login fails
                            console.error(error_3);
                            success = false;
                            message =
                                this.$t('login.warns.LoginFailed') +
                                    ' : ' +
                                    error_3.message;
                            return [3 /*break*/, 6];
                        case 5:
                            showFloatingAlert_1["default"](this.$refs.emailAlert, success, message);
                            if (success) {
                                setTimeout(this.redirectToHomePage, 2000);
                            }
                            return [7 /*endfinally*/];
                        case 6:
                            this.isLoading = false;
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
});
