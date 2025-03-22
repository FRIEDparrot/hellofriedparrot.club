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
var navbar_simple_vue_1 = require("@/components/nav/navbar_simple.vue");
var rightSidebarProfile_vue_1 = require("@/components/sidebar/rightSidebarProfile.vue");
var rightSidebarToggleBtn_vue_1 = require("@/components/buttons/rightSidebarToggleBtn.vue");
var navUserAvatarPrompt_vue_1 = require("@/components/user/navUserAvatarPrompt.vue");
require("element-plus/theme-chalk/dark/css-vars.css");
var markdownOutline_1 = require("@/components/markdown/src/markdownOutline");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var MarkdownUtils_1 = require("@/utils/markdown/MarkdownUtils");
var gsap_1 = require("gsap");
var interest_tags_api_1 = require("@/api/interest_tags/interest_tags_api");
var tag_choose_overlay_vue_1 = require("@/components/overlays/tag_choose_overlay.vue");
var parrotLogoBtn_vue_1 = require("@/components/buttons/parrotLogoBtn.vue");
var drafts_api_1 = require("@/api/drafts/drafts_api");
var cache_1 = require("@/store/cache");
var postBlogOverlay_vue_1 = require("@/components/overlays/postBlogOverlay.vue");
var md_code_folding_1 = require("@/hooks/markdown/md_code_folding");
exports["default"] = vue_1.defineComponent({
    name: 'newBlogPage',
    components: {
        navibarSimple: navbar_simple_vue_1["default"],
        rightSidebarProfile: rightSidebarProfile_vue_1["default"],
        rightSidebarToggleBtn: rightSidebarToggleBtn_vue_1["default"],
        navUserAvatarPrompt: navUserAvatarPrompt_vue_1["default"],
        ElInput: element_plus_1.ElInput,
        ElButton: element_plus_1.ElButton,
        ElSelect: element_plus_1.ElSelect,
        ElInputTag: element_plus_1.ElInputTag,
        ElIcon: element_plus_1.ElIcon,
        ElOption: element_plus_1.ElOption,
        markdown_Outline: markdownOutline_1["default"],
        floatingAlert: floatingAlert_vue_1["default"],
        Search: icons_vue_1.Search,
        tagChooseOverlay: tag_choose_overlay_vue_1["default"],
        parrotLogoBtn: parrotLogoBtn_vue_1["default"],
        postBlogOverlay: postBlogOverlay_vue_1["default"]
    },
    data: function () {
        return {
            previewTransisionActive: false,
            showPreview: true,
            title: '',
            content: '',
            theme: vue_1.ref(''),
            tagIsLoading: false,
            article_uuid: null,
            articleTagsArr: [],
            /* this is a cache for tags  info, each time the user add a tag, store the info into it */
            // tagsInfoCache: [] as any[],
            codeCollapsedStates: new Map()
        };
    },
    computed: {
        markdownContent: function () {
            return MarkdownUtils_1.renderMarkdownContent(this.content, false);
        }
    },
    watch: {
        // restore the code block collapse state from cache
        markdownContent: function (newContent, oldContent) {
            var _this = this;
            this.$nextTick(function () {
                var codeBlocks = _this.$el.querySelectorAll('.markdown-body pre > code:has(pre)');
                if (!codeBlocks.length) {
                    return;
                }
                if (codeBlocks.length == _this.codeCollapsedStates.size) {
                    codeBlocks.forEach(function (codeBlock, index) {
                        var cachedState = _this.codeCollapsedStates.get(index);
                        if (cachedState === null || cachedState === void 0 ? void 0 : cachedState.collapsed) {
                            codeBlock.classList.toggle('collapsed');
                        }
                    });
                }
                else {
                    var lengthArr_1 = Array.from(_this.codeCollapsedStates.values()).map(function (state) { return state.len; });
                    codeBlocks.forEach(function (codeBlock) {
                        var len = codeBlock.innerText.length;
                        var idx = lengthArr_1.indexOf(len); // search the match length in cache
                        if (idx !== -1) {
                            var cachedState = _this.codeCollapsedStates.get(idx);
                            if (cachedState === null || cachedState === void 0 ? void 0 : cachedState.collapsed) {
                                codeBlock.classList.toggle('collapsed');
                            }
                        } // else not collapse
                    });
                }
            });
        }
    },
    methods: {
        /**
         * Description load outer draft content
         * @warning load tag cache before load the draft content, otherwise the tags will be empty
         * @param {any} title:string
         * @param {any} content:string
         * @param {any} InterestTags:InterestTag[]
         * @param {any} article_uuid:string
         * @param {any} theme:string
         * @returns {any}
         */
        load_draft_content: function (title, content, InterestTags, article_uuid, theme) {
            this.title = title;
            this.content = content;
            this.article_uuid = article_uuid;
            this.theme = theme;
            this.articleTagsArr = InterestTags.map(function (item) { return item.zh; });
        },
        toggleRightSidebar: function () {
            var rightSidebar = this.$refs.rightSidebar;
            rightSidebar.toggle();
        },
        handlePublishSuccess: function () {
            var _this = this;
            window.setTimeout(function () {
                _this.$router.push('/home');
            }, 1500);
        },
        /**
         * Description load current tags (InterestTag[]) from cache
         * @returns {any}
         */
        getCurrentTags: function () {
            var lang = this.$i18n.locale || 'en';
            var currentTags = cache_1["default"].getters.getInterestTagByTransList(lang, this.articleTagsArr);
            return currentTags;
        },
        showTagSelect: function () {
            var tagChooseOverlay = this.$refs.tagChooseOverlay;
            var tags = this.getCurrentTags();
            tagChooseOverlay.show(tags);
        },
        confirmNewTag: function (tags) {
            var lang_code = this.$i18n.locale || 'en';
            this.articleTagsArr = tags.map(function (item) { return item[lang_code]; });
            // no need  to filter tags,
        },
        showPostBlogOverlay: function () {
            var _this = this;
            this.saveAsDraft().then(function (response) {
                var uuid = _this.article_uuid;
                var postBlogOverlay = _this.$refs.postBlogOverlay;
                postBlogOverlay.show(uuid);
            });
        },
        /**
         * Description Only used for tag input, check if the tag is repeated or not, and if it exists in database
         * @returns {any}
         */
        filterTags: function () {
            return __awaiter(this, void 0, void 0, function () {
                var idx, tagName, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.tagIsLoading = true;
                            idx = this.articleTagsArr.length - 1;
                            if (!(idx >= 0)) return [3 /*break*/, 5];
                            tagName = this.articleTagsArr[idx];
                            if (!(this.articleTagsArr.indexOf(tagName) !== idx)) return [3 /*break*/, 1];
                            this.articleTagsArr.pop(); // remove the tag if it is repeated
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, this.$t('blogs.create.tagRepeated'));
                            this.tagIsLoading = false;
                            return [2 /*return*/];
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, interest_tags_api_1["default"].getTagByName(tagName)];
                        case 2:
                            response = _a.sent();
                            cache_1["default"].commit('addInterestTagsToCache', [
                                response,
                            ]);
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, this.$t('blogs.create.addTagFailed') +
                                ' : ' +
                                error_1.message);
                            this.articleTagsArr.pop(); // remove the tag if it doesn't exist
                            return [3 /*break*/, 5];
                        case 4:
                            this.tagIsLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        showPreviewContent: function (show) {
            var _this = this;
            if (!this.previewTransisionActive) {
                this.previewTransisionActive = true;
                var previewContent_1 = document.querySelector('.blog-content-preview-right');
                // when screen width > 768px, use animation
                if (window.innerWidth > 768) {
                    /** in all cases, set the preview content to flex first */
                    previewContent_1.style.display = 'flex';
                    gsap_1["default"].to('.blog-content-input-left', {
                        duration: 1.5,
                        minWidth: show ? '45%' : '100%',
                        ease: 'power2.inOut'
                    });
                    gsap_1["default"].to(previewContent_1, {
                        duration: 1.5,
                        transform: show ? 'translateX(0%)' : 'translateX(50%)',
                        ease: show ? 'power2.inOut' : 'power2.in'
                    }).then(function () {
                        previewContent_1.style.display = show ? 'flex' : 'none';
                        _this.showPreview = show;
                    });
                }
                else {
                    previewContent_1.style.display = show ? 'flex' : 'none';
                    this.showPreview = show;
                }
                this.previewTransisionActive = false;
            }
        },
        fixInputResizeWidth: function () {
            var writeContent = document.querySelector('.blog-content-input-left');
            var previewContent = document.querySelector('.blog-content-preview-right');
            previewContent.style.transform = 'translateX(0%)';
            if (window.innerWidth >= 768 && !this.showPreview) {
                writeContent.style.minWidth = '100%';
            }
            else if (window.innerWidth >= 768 && this.showPreview) {
                writeContent.style.minWidth = '45%';
            }
        },
        saveAsDraft: function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var succeed, msg, tags_tot, lang, tags, tag_keys, req_data, response, error_2;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            succeed = false;
                            msg = '';
                            tags_tot = cache_1["default"].getters.getInterestTag;
                            lang = this.$i18n.locale || 'en';
                            tags = tags_tot.filter(function (item) {
                                return item[lang] && _this.articleTagsArr.includes(item[lang]);
                            });
                            tag_keys = tags.map(function (item) { return item.key; });
                            req_data = {
                                title: this.title,
                                content: this.content,
                                tag_keys: tag_keys,
                                theme: 'default'
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, drafts_api_1["default"].saveBlogDraft(req_data, this.article_uuid)];
                        case 2:
                            response = _b.sent();
                            this.article_uuid = (_a = response.uuid) !== null && _a !== void 0 ? _a : null;
                            msg = this.$t('blogs.create.saveSuccess');
                            succeed = true;
                            return [3 /*break*/, 5];
                        case 3:
                            error_2 = _b.sent();
                            msg = error_2.message || this.$t('blogs.create.saveFailed');
                            return [3 /*break*/, 5];
                        case 4:
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, succeed, msg);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        handleUiInputKeyDown: function (event) {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                this.saveAsDraft(); // save the blog as a draft when Ctrl+S or Cmd+S is pressed
            }
        },
        handleMarkdownInputKeyDown: function (event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                var textarea = event.target;
                var start = textarea.selectionStart;
                var end = textarea.selectionEnd;
                if (event.shiftKey) {
                    this.unindentSelection(textarea, start, end);
                }
                else {
                    this.insertTab(textarea, start, end);
                }
            }
        },
        insertTab: function (textarea, start, end) {
            var tab = '\t';
            this.content =
                this.content.substring(0, start) +
                    tab +
                    this.content.substring(end);
            textarea.selectionStart = textarea.selectionEnd =
                start + tab.length;
        },
        unindentSelection: function (textarea, start, end) {
            var lines = this.content.substring(start, end).split('\n');
            var unindentedLines = lines.map(function (line) {
                return line.replace(/^\t/, '');
            });
            var unindentedText = unindentedLines.join('\n');
            this.content =
                this.content.substring(0, start) +
                    unindentedText +
                    this.content.substring(end);
            textarea.selectionStart = start;
            textarea.selectionEnd = start + unindentedText.length;
        },
        cacheCollapsedStates: function () {
            var _this = this;
            this.codeCollapsedStates.clear(); // clear the cache first
            // cache the collapsed states of rendered code blocks
            var codeBlocks = this.$el.querySelectorAll('.markdown-body pre > code:has(pre)');
            codeBlocks.forEach(function (codeBlock, index) {
                var isCollapsed = codeBlock.classList.contains('collapsed');
                var length = codeBlock.innerText.length;
                _this.codeCollapsedStates.set(index, {
                    len: length,
                    collapsed: isCollapsed
                }); // cache the collapsed state of each code block
            });
        }
    },
    beforeUpdate: function () {
        this.cacheCollapsedStates();
    },
    mounted: function () {
        // avoid the resize
        window.addEventListener('resize', this.fixInputResizeWidth);
        window.addEventListener('keydown', this.handleUiInputKeyDown);
        md_code_folding_1["default"].addCodeFoldingHook();
    },
    beforeUnmount: function () {
        window.removeEventListener('resize', this.fixInputResizeWidth);
        window.removeEventListener('keydown', this.handleUiInputKeyDown);
        md_code_folding_1["default"].removeCodeFoldingHook();
    }
});
