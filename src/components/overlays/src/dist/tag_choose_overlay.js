"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var interest_tags_api_1 = require("@/api/interest_tags/interest_tags_api");
var cache_1 = require("@/store/cache");
exports["default"] = vue_1.defineComponent({
    name: 'tagChooseOverlay',
    emits: ['confirm', 'cancel'],
    components: {
        ElAutocomplete: element_plus_1.ElAutocomplete
    },
    props: {
        showTagContainer: {
            type: Boolean,
            "default": true
        },
        maxTagCount: {
            type: Number,
            "default": 99999
        },
        allowRepeatTags: {
            type: Boolean,
            "default": false
        }
    },
    data: function () {
        return {
            snackbar: false,
            snackbarText: '',
            showTagOverlay: false,
            showResetBtn: false,
            currentContainerTags: [],
            tagTable: {
                headers: [
                    {
                        titleKey: 'common.tag_overlay.key',
                        key: 'key',
                        align: 'center',
                        sortable: true
                    },
                    {
                        titleKey: 'common.tag_overlay.en',
                        key: 'en',
                        align: 'center',
                        sortable: true,
                        searchable: true
                    },
                    {
                        titleKey: 'common.tag_overlay.zh',
                        key: 'zh',
                        align: 'center',
                        sortable: true,
                        searchable: true
                    },
                    {
                        titleKey: 'common.tag_overlay.operation',
                        key: 'operation',
                        align: 'center',
                        sortable: false,
                        searchable: false
                    },
                ],
                itemsPerPage: 5,
                items: [],
                loading: false
            },
            activekey: null,
            SearchInputs: {},
            SearchCallbacks: {
                key: this.queryCurrentTag
            },
            tagTableArrs: {}
        };
    },
    computed: {
        translatedTagTableHeaders: function () {
            var _this = this;
            return this.tagTable.headers.map(function (header) {
                var _a, _b;
                return __assign(__assign({}, header), { title: _this.$t(header.titleKey), align: header.align, sortable: (_a = header.sortable) !== null && _a !== void 0 ? _a : false, searchable: (_b = header.searchable) !== null && _b !== void 0 ? _b : false });
            });
        },
        translatedContainerTags: function () {
            var locale = this.$i18n.locale;
            return this.currentContainerTags.map(function (tag) {
                var title = tag[locale] || tag.en || tag.key;
                return __assign(__assign({}, tag), { title: title });
            });
        }
    },
    methods: {
        /**
         * Description If use `currentContainerTags`,
         *      also set peoperty `showTagContainer`
         * @param {any} currentContainerTags:string[]=[]
         * @returns {any}
         */
        show: function (currentContainerTags) {
            if (currentContainerTags === void 0) { currentContainerTags = []; }
            this.showTagOverlay = true;
            // use slice to create a new array, to avoid the reference of the original array
            this.currentContainerTags = currentContainerTags.slice(0);
            this.fetchTagsListAll();
            this.SearchInputs = {}; // reset the Search Inputs
        },
        removeTag: function (item) {
            var index = this.currentContainerTags
                .map(function (tag) { return tag.key; })
                .indexOf(item.key);
            if (index > -1) {
                this.currentContainerTags.splice(index, 1);
            }
        },
        /**
         * Description
         * @param {any} queryString:string
         * @param {any} cb:any
         * @param {any} key:string
         * @returns {any}
         */
        queryTag: function (queryString, cb, key) {
            if (queryString != '' || queryString != null) {
                var results = this.filterTagCallback(this.tagTableArrs[key], queryString);
                cb(results.map(function (item) {
                    return { value: item };
                }));
            }
            else {
                cb(null);
            }
        },
        /**
         * Description Filter Callback function, filter the item
         *     based on the queryString, and return the filtered result
         *
         * It use vague filter algorithm, and sort the result based on the
         *     match count of the beginning of the string.
         *
         * @param {any} resArr:string[]
         * @param {any} queryString:any
         * @returns {any}
         */
        filterTagCallback: function (resArr, queryString) {
            /** select all the result out first */
            var results = resArr
                .map(function (item) { return ({
                item: item,
                prefixMatchCount: item
                    .toLowerCase()
                    .indexOf(queryString.toLowerCase())
            }); })
                .filter(function (_a) {
                var item = _a.item, prefixMatchCount = _a.prefixMatchCount;
                return item.toLowerCase().includes(queryString.toLowerCase());
            })
                .sort(function (a, b) { return a.prefixMatchCount - b.prefixMatchCount; })
                .map(function (_a) {
                var item = _a.item;
                return item;
            });
            return results;
        },
        searchTagResult: function () {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, interest_tags_api_1["default"].getTagList({
                                    start: 0,
                                    cnt: -1,
                                    filters: {
                                        key: (_a = this.SearchInputs.key) !== null && _a !== void 0 ? _a : '',
                                        en: (_b = this.SearchInputs.en) !== null && _b !== void 0 ? _b : '',
                                        zh: (_c = this.SearchInputs.zh) !== null && _c !== void 0 ? _c : ''
                                    }
                                })];
                        case 1:
                            response = _e.sent();
                            this.tagTable.items = (_d = response.tableData) !== null && _d !== void 0 ? _d : [];
                            this.refreshTagTableArr();
                            this.showResetBtn = true;
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _e.sent();
                            // show the item on the snackbar
                            this.snackbarText = this.$t('g.error') + ' : ' + error_1.message;
                            this.snackbar = true;
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description load items to TagTable, and also load TagTableArrs for each header
         * @returns {any}
         */
        fetchTagsListAll: function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var response, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, interest_tags_api_1["default"].getTagList({
                                    start: 1,
                                    cnt: -1,
                                    filters: {}
                                })];
                        case 1:
                            response = _b.sent();
                            this.tagTable.items = (_a = response.tableData) !== null && _a !== void 0 ? _a : [];
                            this.refreshTagTableArr();
                            this.showResetBtn = false;
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            this.snackbarText = this.$t('g.error') + ' : ' + error_2.message;
                            this.snackbar = true;
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        refreshTagTableArr: function () {
            var _loop_1 = function (idx) {
                var key = this_1.tagTable.headers[idx].key;
                this_1.tagTableArrs[key] = this_1.tagTable.items.map(function (item) { var _a; return (_a = item[key]) !== null && _a !== void 0 ? _a : ''; });
            };
            var this_1 = this;
            for (var idx = 0; idx < this.tagTable.headers.length - 1; idx++) {
                _loop_1(idx);
            }
        },
        /**
         * Event handler for the add new tag event
         * @param item
         */
        addNewTag: function (item) {
            if (!this.allowRepeatTags) {
                // check if there is already the same tag in the container
                var idx = this.currentContainerTags
                    .map(function (tag) { return tag.key; })
                    .indexOf(item.key);
                if (idx !== -1) {
                    this.snackbarText = this.$t('common.tag_overlay.repeat_tag_error');
                    this.snackbar = true; // show the item on the snackbar
                    return;
                }
            }
            if (this.currentContainerTags.length >= this.maxTagCount) {
                this.snackbarText = this.$t('common.tag_overlay.max_tag_count_error', { count: this.maxTagCount });
                this.snackbar = true;
                return;
            }
            this.currentContainerTags.push(item);
        },
        confirmTagSelection: function () {
            var _this = this;
            // update tag cache data
            cache_1["default"]
                .dispatch('updateInterestByKeys', this.currentContainerTags.map(function (tag) { return tag.key; }))["catch"](function (error) {
                _this.snackbarText =
                    _this.$t('g.error') + ' : ' + error.message;
                _this.snackbar = true;
            });
            this.showTagOverlay = false; // close the overlay after adding the new tag
            this.$emit('confirm', this.currentContainerTags.slice(0)); // emit the selected tags
        },
        close: function () {
            this.$emit('cancel'); // emit the cancel event
            this.showTagOverlay = false; // hide the overlay after adding the new tag
        }
    },
    mounted: function () {
        /* fetch all the tags to tagTableArrs */
        this.fetchTagsListAll();
    }
});
