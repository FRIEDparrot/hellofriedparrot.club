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
var navbar_welcome_vue_1 = require("@/components/nav/navbar_welcome.vue");
var leftSidebarBtnContent_vue_1 = require("@/components/sidebar/leftSidebarBtnContent.vue");
var rightSidebarProfile_vue_1 = require("@/components/sidebar/rightSidebarProfile.vue");
var markdownOutline_vue_1 = require("@/components/markdown/markdownOutline.vue");
var vue_router_1 = require("vue-router");
var blogs_api_1 = require("@/api/blogs/blogs_api");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var MarkdownUtils_1 = require("@/utils/markdown/MarkdownUtils");
var md_code_folding_1 = require("@/hooks/markdown/md_code_folding");
var userInfoCardBrief_vue_1 = require("@/components/user/userInfoCardBrief.vue");
var blog_services_1 = require("@/services/blogs/blog_services");
var time_zone_1 = require("@/utils/date/time_zone");
var accounts_api_1 = require("@/api/accounts/accounts_api");
var history_api_1 = require("@/api/history/history_api");
var footerbar_common_vue_1 = require("@/components/footer/footerbar_common.vue");
var comment_isso_vue_1 = require("@/components/comments/comment_isso.vue");
var cache_1 = require("@/store/cache");
var store_1 = require("@/store");
exports["default"] = vue_1.defineComponent({
    name: 'ReadBog',
    setup: function () {
        var route = vue_router_1.useRoute();
        var uuid = route.params.uuid;
        return {
            uuid: uuid
        };
    },
    components: {
        navbar_welcome: navbar_welcome_vue_1["default"],
        leftSidebarBtnContent: leftSidebarBtnContent_vue_1["default"],
        rightSidebarProfile: rightSidebarProfile_vue_1["default"],
        markdownOutline: markdownOutline_vue_1["default"],
        floatingAlert: floatingAlert_vue_1["default"],
        userInfoCardBrief: userInfoCardBrief_vue_1["default"],
        footerbar_common: footerbar_common_vue_1["default"],
        comment_isso: comment_isso_vue_1["default"]
    },
    props: {
        isReview: {
            type: Boolean,
            "default": false
        }
    },
    data: function () {
        return {
            user: store_1["default"].state.user,
            authorProfile: {},
            authorInterestTags: [],
            authorInfo: {},
            blogData: {},
            blogContent: '',
            blogHeadings: [],
            copybtn: {
                disabled: false,
                icon: 'mdi-content-copy'
            },
            featurebtn: {
                disabled: false
            }
        };
    },
    computed: {
        getTagTranslation: function () {
            var lang = this.$i18n.locale;
            return function (tag) {
                var _a, _b;
                return (_b = (_a = tag[lang]) !== null && _a !== void 0 ? _a : tag.en) !== null && _b !== void 0 ? _b : '';
            };
        }
    },
    methods: {
        copyLink: function () {
            return __awaiter(this, void 0, void 0, function () {
                var err_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, navigator.clipboard.writeText(window.location.href)];
                        case 1:
                            _a.sent();
                            this.copybtn.icon = 'mdi-check';
                            this.copybtn.disabled = true;
                            setTimeout(function () {
                                _this.copybtn.icon = 'mdi-content-copy';
                                _this.copybtn.disabled = false;
                            }, 1500);
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, this.$t('blog.copyLinkSuccess'));
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            // Optionally, handle the error or show a notification to the user
                            alert('Failed to copy link. Please try again.');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        featureArticle: function (featured) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.featurebtn.disabled = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, blogs_api_1["default"].setBlogFeatured(this.blogData.uuid, featured)];
                        case 2:
                            _a.sent();
                            this.blogData.featured = featured;
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, featured
                                ? this.$t('blog.featureArticleSuccess')
                                : this.$t('blog.unfeatureArticleSuccess'));
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            this.showErrorAlert(error_1.message);
                            return [3 /*break*/, 5];
                        case 4:
                            this.featurebtn.disabled = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        getPreciseTimeStr: function (date) {
            return time_zone_1.UTCToLocalTimeString(date);
        },
        showErrorAlert: function (msg) {
            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, msg);
        },
        /**
         * Description load_author_info function.
         * @param {any} author_id:string
         * @returns {any}
         */
        load_author_profile: function (author_id) {
            return __awaiter(this, void 0, void 0, function () {
                var profile, profile_card_info, tag_key_list, cached_tags, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (author_id === undefined) {
                                throw new Error(this.$t('blog.error.noAuthorInfo')); // Unable to get Author Info
                            }
                            return [4 /*yield*/, accounts_api_1["default"].getAccountProfile(author_id)];
                        case 1:
                            profile = _a.sent();
                            this.authorProfile = profile;
                            profile_card_info = {
                                name: profile.name,
                                avatar: profile.avatar,
                                bio: profile.bio,
                                follows: profile.following_num,
                                followers: profile.followers_num,
                                blogsNum: profile.blogs_num
                            };
                            this.authorInfo = profile_card_info;
                            tag_key_list = profile.interest_tags;
                            return [4 /*yield*/, cache_1["default"].dispatch('updateInterestByKeys', tag_key_list)];
                        case 2:
                            _a.sent();
                            cached_tags = cache_1["default"].getters.getInterestTagByKeyList(tag_key_list);
                            this.authorInterestTags = cached_tags;
                            return [2 /*return*/, Promise.resolve(null)];
                        case 3:
                            error_2 = _a.sent();
                            return [2 /*return*/, Promise.reject(error_2)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        load_blog_data: function (uuid) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, blog_data, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, , 7]);
                            if (!this.isReview) return [3 /*break*/, 2];
                            return [4 /*yield*/, blogs_api_1["default"].getBlogReviewContent(uuid)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, blogs_api_1["default"].getBlogContent(uuid)];
                        case 3:
                            _a = _b.sent();
                            _b.label = 4;
                        case 4:
                            response = _a;
                            return [4 /*yield*/, blog_services_1["default"].getBlogContentDispData(response)];
                        case 5:
                            blog_data = _b.sent();
                            this.blogData = blog_data;
                            this.blogContent = MarkdownUtils_1.renderMarkdownContent(this.blogData.content);
                            this.blogHeadings = MarkdownUtils_1.getMarkdownHeadersByHTML(this.blogContent);
                            return [2 /*return*/, Promise.resolve(null)];
                        case 6:
                            error_3 = _b.sent();
                            return [2 /*return*/, Promise.reject(error_3)];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        toggleLeftSidebar: function () {
            var left_sidebar = this.$refs.left_sidebar;
            left_sidebar.toggle();
        },
        toggleRightSidebar: function () {
            var right_sidebar = this.$refs.right_sidebar;
            right_sidebar.toggle();
        }
    },
    mounted: function () {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var error_4, author_id, blog_uuid, error_5, req, error_6, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.load_blog_data(this.uuid)];
                    case 2:
                        _a.sent();
                        vue_1.nextTick(function () {
                            md_code_folding_1["default"].addCodeFoldingHook(); // add code folding hook after rendering the content
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error(this.$t('blog.error.loadBlogData') +
                            ' : ' +
                            error_4.message);
                    case 4:
                        author_id = this.blogData.authorId;
                        blog_uuid = this.blogData.uuid;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.load_author_profile(author_id)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_5 = _a.sent();
                        throw new Error(this.$t('blog.error.loadAuthorProfile') +
                            ' : ' +
                            error_5.message);
                    case 8:
                        if (!store_1["default"].state.authorized) return [3 /*break*/, 12];
                        req = {
                            type: 'blog',
                            uuid: blog_uuid,
                            progress: 0
                        };
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, history_api_1["default"].addHistoryRecord(req)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_6 = _a.sent();
                        throw new Error(this.$t('blog.error.addHistoryRecord') +
                            ' : ' +
                            error_6.message);
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        error_7 = _a.sent();
                        this.showErrorAlert(error_7.message);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        }); })();
    },
    beforeUnmount: function () {
        md_code_folding_1["default"].removeCodeFoldingHook();
    }
});
