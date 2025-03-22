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
var element_plus_1 = require("element-plus");
var icons_vue_1 = require("@element-plus/icons-vue");
var icons_vue_2 = require("@element-plus/icons-vue");
var secureImgUrl_1 = require("@/utils/url/secureImgUrl");
var detailedIteratorList_vue_1 = require("@/components/lists/detailedIteratorList.vue");
var tag_choose_overlay_vue_1 = require("@/components/overlays/tag_choose_overlay.vue");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var drafts_api_1 = require("@/api/drafts/drafts_api");
var interestTagGroup_vue_1 = require("@/components/chip_groups/interestTagGroup.vue");
var cache_1 = require("@/store/cache");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
exports["default"] = vue_1.defineComponent({
    name: 'PostBlogOverlay',
    emits: ['publish-success'],
    components: {
        ElInput: element_plus_1.ElInput,
        ElButton: element_plus_1.ElButton,
        ElTooltip: element_plus_1.ElTooltip,
        ElIcon: element_plus_1.ElIcon,
        ElCard: element_plus_1.ElCard,
        floatingAlert: floatingAlert_vue_1["default"],
        ElSelect: element_plus_1.ElSelect,
        InfoFilled: icons_vue_2.InfoFilled,
        Plus: icons_vue_1.Plus,
        tagChooseOverlay: tag_choose_overlay_vue_1["default"],
        detailedIteratorList: detailedIteratorList_vue_1["default"],
        interestTagGroup: interestTagGroup_vue_1["default"]
    },
    data: function () {
        return {
            disableCard: false /* only disable while publish loading */,
            draft_uuid: '',
            showOverlay: false,
            showTagChooseOverlay: false,
            // not retain uuid
            formData: {
                title: '',
                tags: [
                    {
                        key: '',
                        zh: '',
                        en: ''
                    },
                ],
                abstract: '',
                bannerUrl: ''
            }
        };
    },
    computed: {
        safeBannerUrl: function () {
            return secureImgUrl_1.sanitizeImageUrl(this.formData.bannerUrl);
        }
    },
    methods: {
        uploadBannerImage: function () {
            alert(this.$t('post_blog_overlay.errors.banner_upload_not_supported'));
        },
        load_post_data: function (uuid) {
            return __awaiter(this, void 0, Promise, function () {
                var params, response, draft, tags, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                pageNum: 1,
                                itemsPerPage: 1,
                                searchKey: 'uuid',
                                search: uuid
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, drafts_api_1["default"].getUserDraftList(params)];
                        case 2:
                            response = (_a.sent());
                            if (response.tableData.length == 0) {
                                throw new Error(this.$t('post_blog_overlay.errors.draft_not_found'));
                            }
                            draft = response.tableData[0];
                            return [4 /*yield*/, cache_1["default"].dispatch('updateInterestByKeys', draft.tags)];
                        case 3:
                            _a.sent();
                            tags = cache_1["default"].getters.getInterestTagByKeyList(draft.tags);
                            this.formData.title = draft.title;
                            this.formData.abstract = '';
                            this.formData.tags = tags; // update tags
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(error_1)];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        updateTags: function (tags) {
            this.formData.tags = tags;
        },
        show: function (uuid) {
            var _this = this;
            this.load_post_data(uuid)
                .then(function (response) {
                _this.showOverlay = true;
                _this.draft_uuid = uuid;
            })["catch"]();
        },
        handleCancel: function () {
            this.showOverlay = false;
            this.resetForm();
        },
        publishDraft: function () {
            return __awaiter(this, void 0, void 0, function () {
                var draft_data, data, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.disableCard = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, 5, 6]);
                            return [4 /*yield*/, drafts_api_1["default"].getUserDraftContent(this.draft_uuid)];
                        case 2:
                            draft_data = _a.sent();
                            data = {
                                title: this.formData.title,
                                content: draft_data.content,
                                abstract: this.formData.abstract,
                                tag_keys: this.formData.tags.map(function (tag) { return tag.key; }),
                                theme: draft_data.theme,
                                banner_url: this.safeBannerUrl
                            };
                            return [4 /*yield*/, drafts_api_1["default"].publishBlogDraft(data, this.draft_uuid)];
                        case 3:
                            _a.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, this.$t('post_blog_overlay.publish_success_message'));
                            // emit event to parent component
                            this.$emit('publish-success', this.draft_uuid);
                            // close overlay after 2 seconds
                            setTimeout(function () {
                                _this.showOverlay = false;
                            }, 2000);
                            return [3 /*break*/, 6];
                        case 4:
                            error_2 = _a.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, error_2.message);
                            return [3 /*break*/, 6];
                        case 5:
                            this.disableCard = false;
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        resetForm: function () {
            this.formData = {
                title: '',
                abstract: '',
                tags: [],
                bannerUrl: ''
            };
        }
    }
});
