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
var countries_json_1 = require("@assets/data/countries.json");
var format_check_1 = require("@functions/format_check");
var captcha_api_1 = require("@/api/auth/captcha_api");
var register_api_1 = require("@/api/auth/register_api");
var lang_1 = require("@/locales/lang");
var navbar_welcome_vue_1 = require("@/components/nav/navbar_welcome.vue");
var homeBtn_vue_1 = require("@/components/buttons/homeBtn.vue");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var SidebarLayout_vue_1 = require("@/layout/SidebarLayout.vue");
var leftSidebarColumns_vue_1 = require("@components/sidebar/leftSidebarColumns.vue");
exports["default"] = vue_1.defineComponent({
    name: 'RegisterPage',
    components: {
        navbar_welcome: navbar_welcome_vue_1["default"],
        FloatingAlert: floatingAlert_vue_1["default"],
        HomeBtn: homeBtn_vue_1["default"],
        SidebarLayout: SidebarLayout_vue_1["default"],
        LeftSidebarWelcome: leftSidebarColumns_vue_1["default"]
    },
    setup: function () {
        var t = lang_1["default"].global.t;
        var rules = {
            required: function (value) { return !!value || t('register.warns.required'); },
            format_check_name: function (value) {
                var res = format_check_1.checkUsernamePattern(value);
                switch (res) {
                    case -1:
                        return t('register.warns.username.length');
                    case -2:
                        return t('register.warns.username.start');
                    case -3:
                        return t('register.warns.username.nospace');
                    case 0:
                        return true;
                    default:
                        return t('register.warns.UnknownError');
                }
            },
            format_check_email: function (value) {
                return format_check_1.checkEmailPattern(value) || 'Invalid email format';
            },
            format_check_password: function (value) {
                var res = format_check_1.checkPasswordPattern(value);
                switch (res) {
                    case -1:
                        return t('register.warns.password.forbidden', {
                            forbidden_char: '\':\\"|/<>'
                        });
                    case -2:
                        return t('register.warns.password.invalid');
                    case -3:
                        return t('register.warns.password.format_letter');
                    case -4:
                        return t('register.warns.password.format_number');
                    case -5:
                        return t('register.warns.password.format_special');
                    case -6:
                        return t('register.warns.password.format_length');
                    case 0:
                        return true;
                    default:
                        return t('register.warns.UnknownError');
                }
            },
            format_check_verification_code: function (value) {
                if (!format_check_1.checkStringLength(value, 6, 6)) {
                    return t('register.warns.captcha');
                }
            }
        };
        return {
            rules: rules
        };
    },
    data: function () {
        var _this = this;
        return {
            countriesData: countries_json_1["default"],
            countryDisplang: function () {
                var lang = _this.$i18n.locale || 'en';
                if (lang === 'zh') {
                    return function (obj) { return obj.zh; };
                }
                else {
                    return function (obj) { return obj.en; };
                }
            },
            // !IMPORTANT this consistent with assets/data/countries.json
            showPassword: false,
            isLoadingSubmit: false,
            isLoadingCaptcha: false,
            agreeTermofService: [],
            registerForm: {
                username: '',
                email: '',
                verification_code: '',
                password: '',
                career: '',
                country: '',
                reason: '',
                receive_ads: []
            },
            registerForm_extra: {
                password_confirm: ''
            },
            registerAlert: {
                show: false,
                title: 'success',
                type: 'success',
                text: ''
            }
        };
    },
    computed: {},
    methods: {
        /**
         * Description Send The verification code
         * @returns {any}
         */
        getRegisterCaptcha: function (event) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var succeed, message, results, response, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.isLoadingCaptcha = true;
                            succeed = false;
                            message = '';
                            return [4 /*yield*/, event];
                        case 1:
                            results = _b.sent();
                            if (!!format_check_1.checkEmailPattern(this.registerForm.email)) return [3 /*break*/, 2];
                            message = this.$t('register.warns.email');
                            return [3 /*break*/, 6];
                        case 2:
                            if (!(format_check_1.checkUsernamePattern(this.registerForm.username) != 0)) return [3 /*break*/, 3];
                            message = this.$t('register.warns.username.invalid');
                            return [3 /*break*/, 6];
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, captcha_api_1["default"].getCaptcha(captcha_api_1.captcha_base_url.register, {
                                    username: this.registerForm.username,
                                    email: this.registerForm.email
                                })];
                        case 4:
                            response = _b.sent();
                            succeed = true;
                            message = this.$t('register.warns.emailSendSucceed');
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _b.sent();
                            message = (_a = error_1.message) !== null && _a !== void 0 ? _a : this.$t('register.warns.UnknownError');
                            return [3 /*break*/, 6];
                        case 6:
                            showFloatingAlert_1["default"](this.$refs.emailAlert, succeed, message);
                            this.isLoadingCaptcha = false;
                            return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description this function is implementation of the rules for the form validation
         * @returns {any}
         */
        format_check_password_confirm: function () {
            if (this.registerForm.password !=
                this.registerForm_extra.password_confirm) {
                return this.$t('register.warns.password.confirm');
            }
            if (format_check_1.checkPasswordPattern(this.registerForm.password) != 0) {
                return ''; // this would be prompted in password field
            }
            return true;
        },
        /**
         * Description Submit the Register Form
         * @param {any} event:any
         * @returns {any}
         */
        onSubmitRegisterForm: function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var results, succeed, message, data_submitted, response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isLoadingSubmit = true;
                            return [4 /*yield*/, event];
                        case 1:
                            results = _a.sent();
                            succeed = false;
                            message = '';
                            data_submitted = results;
                            if (!(data_submitted.valid === true)) return [3 /*break*/, 6];
                            if (!(this.agreeTermofService.length === 0)) return [3 /*break*/, 2];
                            message = this.$t('register.warns.agreeTerms'); // show error message
                            return [3 /*break*/, 5];
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, register_api_1["default"].registerNewUser(this.registerForm)];
                        case 3:
                            response = _a.sent();
                            // show success message
                            succeed = true;
                            message = this.$t('register.warns.registerSucceed');
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            message =
                                this.$t('register.warns.registerFailed') +
                                    ' : ' +
                                    error_2.message;
                            return [3 /*break*/, 5];
                        case 5:
                            showFloatingAlert_1["default"](this.$refs.emailAlert, succeed, message);
                            if (succeed) {
                                setTimeout(function () {
                                    window.location.href = '/';
                                }, 5000); // redirect to home page after 5 seconds
                            }
                            _a.label = 6;
                        case 6:
                            this.isLoadingSubmit = false; // set loading to false after form submission
                            return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description Redefinition for filter the country name search
         * @param {any} itemTitle:string
         * @param {any} queryText:string
         * @param {any} item:any
         * @returns {any}
         */
        countryNameFilter: function (itemTitle, queryText, item) {
            var searchText = queryText.toLowerCase().trim();
            var cca3_abbr = item.raw.cca3.toLowerCase();
            var lang_code = this.$i18n.locale || 'en';
            var translatedName = item.raw[lang_code].toLowerCase();
            var translatedname_heading = translatedName
                .toLowerCase()
                .split(' ')
                .map(function (word) { return word.charAt(0); })
                .join('');
            return (cca3_abbr.indexOf(searchText) > -1 ||
                translatedName.indexOf(searchText) > -1 ||
                translatedname_heading.indexOf(searchText) > -1);
        }
    },
    mounted: function () { }
});
