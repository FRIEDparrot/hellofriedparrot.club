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
var RulesLayout_vue_1 = require("@layout/RulesLayout.vue");
var rules_api_1 = require("@/api/rules/rules_api");
require("highlight.js/styles/github-dark.css");
var MarkdownUtils_1 = require("@/utils/markdown/MarkdownUtils");
var scrollHandler_1 = require("@hooks/ui/scrollHandler");
var navbar_simple_vue_1 = require("@/components/nav/navbar_simple.vue");
var footerbar_common_vue_1 = require("@/components/footer/footerbar_common.vue");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var markdownFileListView_vue_1 = require("@/components/markdown/markdownFileListView.vue");
var markdownOutline_vue_1 = require("@/components/markdown/markdownOutline.vue");
var leftSideBarBtnContent_vue_1 = require("@components/sidebar/leftSideBarBtnContent.vue");
exports["default"] = vue_1.defineComponent({
    name: 'RulesIndex',
    components: {
        NavbarSimple: navbar_simple_vue_1["default"],
        RulesLayout: RulesLayout_vue_1["default"],
        footerbar: footerbar_common_vue_1["default"],
        FloatingAlert: floatingAlert_vue_1["default"],
        markdownFileListView: markdownFileListView_vue_1["default"],
        MarkdownOutline: markdownOutline_vue_1["default"],
        LeftSideBarBtnContent: leftSideBarBtnContent_vue_1["default"]
    },
    props: ['file_path'],
    data: function () {
        return {
            directory: {},
            menuOpen: false,
            headings: [],
            loading_rules: true,
            renderHTML: ''
        };
    },
    computed: {},
    methods: {
        setCookies: function () {
            var cookiePrompt = this.$refs.cookiePrompt;
            cookiePrompt.setCookies();
        },
        /**
         * Description
         * @returns {any}
         */
        renderRulesDirectory: function () {
            var _a, _b, _c;
            return __awaiter(this, void 0, Promise, function () {
                var response, json_dir, error_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, rules_api_1["default"].getRuleList()];
                        case 1:
                            response = _d.sent();
                            json_dir = response.data;
                            if (!json_dir) {
                                throw new Error(this.$t('rules.noRulesFound'));
                            }
                            this.directory = JSON.parse(json_dir);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _d.sent();
                            // for JSON parse error
                            console.error(error_1);
                            if (error_1 instanceof SyntaxError) {
                                this.showErrorAlert(this.$t('g.JsonParseError'));
                            }
                            else {
                                this.showErrorAlert((_c = (((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error_1.message)) !== null && _c !== void 0 ? _c : this.$t('g.UnknownError'));
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description
         * @returns {any}
         */
        getRulesContent: function () {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, Promise, function () {
                var content, filePath, response, error_2, result;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            content = '';
                            this.loading_rules = true;
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 3, , 4]);
                            filePath = (_a = this.file_path) !== null && _a !== void 0 ? _a : 'index';
                            return [4 /*yield*/, rules_api_1["default"].getRuleContent(filePath)];
                        case 2:
                            response = _e.sent();
                            content = response.data;
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _e.sent();
                            this.loading_rules = false;
                            result = '<h2>' +
                                this.$t('rules.loadFailed') +
                                '</h2>' +
                                '<h3><p>' +
                                ((_d = (((_c = (_b = error_2.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error_2.message)) !== null && _d !== void 0 ? _d : this.$t('g.UnknownError')) +
                                '</p></h3>';
                            return [2 /*return*/, Promise.reject(result)]; // reject the promise
                        case 4:
                            this.loading_rules = false;
                            return [2 /*return*/, Promise.resolve(content)];
                    }
                });
            });
        },
        showErrorAlert: function (message) {
            showFloatingAlert_1["default"](this.$refs.alertBox, false, message);
        },
        scrollToTitle: function () {
            scrollHandler_1.onScrollRedirectTitleLink(this.headings.map(function (h) { return h.id; }));
        }
    },
    mounted: function () {
        var _this = this;
        // render the markdown rules content  based on file_path
        this.renderRulesDirectory();
        this.getRulesContent()
            .then(function (content) {
            _this.renderHTML = MarkdownUtils_1.renderMarkdownContent(content, true);
            _this.headings = MarkdownUtils_1.getMarkdownHeadersByHTML(_this.renderHTML);
            /** add event listener of dynamic link for scroll */
        })["catch"](function (error) {
            _this.renderHTML = error; // render the error message
        })["finally"](function () {
            return window.addEventListener('scroll', _this.scrollToTitle);
        });
        // wait for DOM Loaded
    },
    // remove Event Listener on destroyed
    beforeDestroy: function () {
        window.removeEventListener('scroll', this.scrollToTitle);
    }
});
