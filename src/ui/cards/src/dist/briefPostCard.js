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
var briefIteratorList_vue_1 = require("@/components/lists/briefIteratorList.vue");
var cache_1 = require("@/store/cache");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var confirmDialog_vue_1 = require("@/components/popups/confirmDialog.vue");
var showConfirmDialog_1 = require("@/components/popups/scripts/showConfirmDialog");
var postBlogOverlay_vue_1 = require("@/components/overlays/postBlogOverlay.vue");
var drafts_api_1 = require("@/api/drafts/drafts_api");
var history_api_1 = require("@/api/history/history_api");
var blogs_api_1 = require("@/api/blogs/blogs_api");
var stdDataTableServer_1 = require("@/interface/tables/stdDataTableServer");
var blog_services_1 = require("@/services/blogs/blog_services");
var store_1 = require("@/store");
var MenuOperations;
(function (MenuOperations) {
    MenuOperations["delete"] = "delete";
    MenuOperations["publish"] = "publish";
    MenuOperations["edit"] = "edit";
})(MenuOperations || (MenuOperations = {}));
var maxBlogCountDict = {
    '-1': 8000,
    '0': 8000,
    '1': 8000,
    '2': 8000,
    '3': 1000,
    '4': 200,
    '5': 0
};
exports["default"] = vue_1.defineComponent({
    name: 'briefPostCard',
    components: {
        briefIteratorList: briefIteratorList_vue_1["default"],
        floatingAlert: floatingAlert_vue_1["default"],
        confirmDialog: confirmDialog_vue_1["default"],
        postBlogOverlay: postBlogOverlay_vue_1["default"]
    },
    props: {},
    computed: {
        currCardItems: function () {
            var tabIdx = this.post_card.tab_idx;
            return this.post_card.tabs[tabIdx].items;
        }
    },
    setup: function () {
        var user_priority = store_1["default"].state.user.priority;
        return {
            user_priority: user_priority
        };
    },
    data: function () {
        var _this = this;
        return {
            confirmDialogAriticles: {
                title: '',
                subtitle: '',
                operation: '',
                uuid: ''
            },
            small_width_layout: vue_1.ref(false),
            showJumpInput: false,
            jumpPage: 0,
            handleJumpPage: function () { },
            history_list: [],
            // #region Post Card Data
            post_card: {
                tab_idx: 0,
                tabs: [
                    {
                        key: 'history',
                        titleKey: 'common.post_card.history',
                        icon: 'mdi-clock-outline',
                        items: [],
                        cb: function (params) {
                            return _this.fetch_history_data(params);
                        },
                        itemsLength: 0,
                        limitation: 100,
                        limitationTextKey: 'common.post_card.historyLimitation'
                    },
                    /** drafts tab data  */
                    {
                        key: 'draft',
                        icon: 'mdi-pencil',
                        titleKey: 'common.post_card.drafts',
                        title: 'Drafts',
                        items: [],
                        itemsLength: 0,
                        cb: function (params) {
                            /** needed when fetch by page */
                            return _this.fetch_draft_data(params);
                        },
                        limitation: 20,
                        limitationTextKey: 'common.post_card.draftLimitation',
                        // #region menus
                        menus: {
                            items: [
                                {
                                    titleKey: 'g.edit',
                                    icon: 'mdi-pencil',
                                    callback: function (uuid) {
                                        _this.$router.push("/drafts/edit/" + uuid);
                                    }
                                },
                                {
                                    titleKey: 'g.publish',
                                    icon: 'mdi-upload',
                                    callback: function (uuid) {
                                        var overlay = _this.$refs
                                            .postBlogOverlay;
                                        if (overlay) {
                                            overlay.show(uuid);
                                        }
                                    }
                                },
                                {
                                    titleKey: 'g.delete',
                                    icon: 'mdi-delete',
                                    callback: function (uuid) {
                                        _this.showConfirmArticlesDialog(MenuOperations["delete"], uuid, _this.$t('common.post_card.deleteDraftConfirmTitle'), _this.$t('common.post_card.deleteDraftConfirmSubtitle'));
                                    }
                                },
                            ]
                        }
                    },
                    {
                        key: 'posts',
                        titleKey: 'common.post_card.postFolder',
                        title: this.$t('common.post_card.postFolder'),
                        icon: 'mdi-text-box-multiple-outline',
                        items: [],
                        itemsLength: 0,
                        cb: function (params) {
                            return _this.fetch_user_posts_data(params);
                        },
                        limitation: maxBlogCountDict[this.user_priority.toString() || '5'],
                        limitationTextKey: 'common.post_card.postBlogLimitation'
                    },
                    {
                        titleKey: 'common.post_card.starFolder',
                        title: this.$t('common.post_card.starFolder'),
                        key: 'stars',
                        icon: 'mdi-star-outline',
                        items: [],
                        itemsLength: 0,
                        cb: function (params) { return []; }
                    },
                ]
            }
        };
    },
    methods: {
        // #region ui callbacks
        showErrorAlert: function (message) {
            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, message);
        },
        PublishSuccessCb: function (uuid) {
            var _a;
            // after the article is published, refresh the draft.items
            var drafts_item = (_a = this.post_card.tabs.find(function (item) { return item.key === 'draft'; })) === null || _a === void 0 ? void 0 : _a.items;
            if (drafts_item) {
                var index = drafts_item.findIndex(
                /// TODO : make a better way to identify the item to be removed
                function (item) { return item.call_back_params === uuid; });
                if (index >= 0) {
                    drafts_item.splice(index, 1); // remove the item from the list
                }
            }
        },
        // this include draft, history, post
        showConfirmArticlesDialog: function (operation, uuid, title, subtitle) {
            if (title === void 0) { title = ''; }
            if (subtitle === void 0) { subtitle = ''; }
            var confirm_dialog_ref = this.$refs.confirmDialogArticles;
            this.confirmDialogAriticles.title = title;
            this.confirmDialogAriticles.subtitle = subtitle;
            this.confirmDialogAriticles.operation = operation;
            this.confirmDialogAriticles.uuid = uuid;
            showConfirmDialog_1["default"](confirm_dialog_ref);
        },
        handleConfirmArticles: function () {
            var operation = this.confirmDialogAriticles.operation; // get the current operation
            var uuid = this.confirmDialogAriticles.uuid;
            switch (operation) {
                // only handle delete operation for now
                case MenuOperations["delete"]:
                    this.delete_draft(uuid);
                    break;
                default:
                    break;
            }
        },
        // #endregion
        // #region fetch tab data callback functions
        /**
         * Description fetch the draft data call back function
         * @param {any} params:{pageNum;itemsPerPage;}
         * @returns {any}
         */
        fetch_draft_data: function (params) {
            return __awaiter(this, void 0, Promise, function () {
                var idx, response, tableData, tag_keys_arr, tags_all_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            idx = this.post_card.tabs
                                .map(function (item) { return item.key; })
                                .indexOf('draft');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, drafts_api_1["default"].getUserDraftList(params)];
                        case 2:
                            response = _a.sent();
                            tableData = response.tableData;
                            tag_keys_arr = tableData.map(function (item) { return item.tags; }).flat();
                            return [4 /*yield*/, cache_1["default"].dispatch('updateInterestByKeys', tag_keys_arr)];
                        case 3:
                            _a.sent();
                            tags_all_1 = cache_1["default"].state.interest_tag_cache;
                            // this.refreshTagCache(tag_keys_arr);
                            this.post_card.tabs[idx].items = tableData.map(function (item) {
                                return ({
                                    title: item.title,
                                    tags: item.tags.map(function (tag) {
                                        return tags_all_1.find(function (t) { return t.key === tag; });
                                    }),
                                    link: "/drafts/edit/" + item.uuid,
                                    datetime: item.last_save_time,
                                    datetime_info_icon: 'mdi-clock-outline',
                                    call_back_params: item.uuid
                                });
                            });
                            // update the length of the items
                            this.post_card.tabs[idx].itemsLength = response.count;
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            this.showErrorAlert(error_1.message);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description This method just fetch the history list (all at once),
         * but not fetch the article data
         * @returns {any}
         */
        fetch_history_list: function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, records, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, history_api_1["default"].getHistoryRecords()];
                        case 1:
                            response = _a.sent();
                            records = response.records;
                            this.history_list = records;
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            this.showErrorAlert(error_2.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description fetch the article data call back function
         * @param {any} params:{pageNum;itemsPerPage;}
         * @returns {any}
         */
        fetch_history_data: function (params) {
            return __awaiter(this, void 0, Promise, function () {
                var idx, start, end, history_to_show, uuids, disp_data, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // failed to fetch history list, return
                            if (!this.history_list) {
                                return [2 /*return*/];
                            }
                            idx = this.post_card.tabs
                                .map(function (item) { return item.key; })
                                .indexOf('history');
                            start = (params.pageNum - 1) * params.itemsPerPage;
                            end = start + params.itemsPerPage;
                            history_to_show = this.history_list
                                .slice(start, end)
                                .filter(function (item) { return item.type === 'blog'; });
                            if (history_to_show.length === 0) {
                                return [2 /*return*/]; // no data to show
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            uuids = history_to_show.map(function (item) { return item.uuid; });
                            return [4 /*yield*/, blog_services_1["default"].getBlogDisplayDataByUUID(uuids)];
                        case 2:
                            disp_data = _a.sent();
                            this.post_card.tabs[idx].items = disp_data.map(function (item) {
                                var _a;
                                return ({
                                    title: item.title,
                                    tags: item.tags,
                                    link: "/blogs/" + item.uuid,
                                    datetime: (_a = history_to_show.find(function (h) { return h.uuid === item.uuid; })) === null || _a === void 0 ? void 0 : _a.time,
                                    datetime_info_icon: 'mdi-eye',
                                    author_avatar: item.authorAvatar,
                                    author_name: item.authorName
                                });
                            });
                            this.post_card.tabs[idx].itemsLength = this.history_list.length;
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            this.showErrorAlert(error_3.message);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description fetch the user posts data call back function
         * @param {any} params:{pageNum;itemsPerPage;}
         * @returns {any}
         */
        fetch_user_posts_data: function (params) {
            return __awaiter(this, void 0, Promise, function () {
                var idx, req, response, data_1, disp_data, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            idx = this.post_card.tabs.findIndex(function (item) { return item.key === 'posts'; });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            req = stdDataTableServer_1.makeStdDataTableRequestParams(params);
                            return [4 /*yield*/, blogs_api_1["default"].getUserBlogList(req)];
                        case 2:
                            response = _a.sent();
                            data_1 = response.tableData;
                            return [4 /*yield*/, blog_services_1["default"].convertBlogToDisplayData(data_1)];
                        case 3:
                            disp_data = _a.sent();
                            this.post_card.tabs[idx].items = disp_data.map(function (item) {
                                var _a;
                                var status = (_a = data_1.find(function (d) { return d.uuid === item.uuid; })) === null || _a === void 0 ? void 0 : _a.status;
                                return {
                                    title: item.title,
                                    tags: item.tags,
                                    link: status == 2
                                        ? "/blogs/" + item.uuid
                                        : status == 1
                                            ? "#" // 1 : reviewing status, no link
                                            : "/blogs/revision/" + item.uuid,
                                    datetime: item.lastModifyTime,
                                    status: status
                                };
                            });
                            this.post_card.tabs[idx].itemsLength = response.count;
                            return [3 /*break*/, 5];
                        case 4:
                            error_4 = _a.sent();
                            this.showErrorAlert(error_4.message);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        // #endregion
        delete_draft: function (uuid) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var response, message, drafts_item, index, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, drafts_api_1["default"].deleteUserDraft(uuid)];
                        case 1:
                            response = _b.sent();
                            message = response.data;
                            drafts_item = (_a = this.post_card.tabs.find(function (item) { return item.key === 'draft'; })) === null || _a === void 0 ? void 0 : _a.items;
                            if (drafts_item) {
                                index = drafts_item.findIndex(function (item) { return item.call_back_params === uuid; });
                                if (index >= 0) {
                                    drafts_item.splice(index, 1); // remove the item from the list
                                }
                            }
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, message);
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _b.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, error_5.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        handleResize: function () {
            var card = this.$refs.card;
            if (card) {
                var cardWidth = card.$el.getBoundingClientRect().width;
                this.small_width_layout = cardWidth < 300;
            }
        }
    },
    mounted: function () {
        var _this = this;
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, item, params;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetch_history_list()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = this.post_card.tabs;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        item = _a[_i];
                        params = {
                            pageNum: 1,
                            itemsPerPage: 5
                        };
                        if (!item.cb) return [3 /*break*/, 4];
                        return [4 /*yield*/, item.cb(params)];
                    case 3:
                        _b.sent(); // update the data for the tab
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    },
    watch: {
        tab_idx: {
            handler: function (new_val) {
                // update thedata
            }
        }
    },
    beforeUnmount: function () {
        window.removeEventListener('resize', this.handleResize);
    }
});
