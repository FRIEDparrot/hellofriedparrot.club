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
var lang_1 = require("@/locales/lang");
var stdMenuList_1 = require("@/interface/iterators/stdMenuList");
var defaultAvatar_vue_1 = require("@/assets/imgs/ui/defaultAvatar.vue");
var time_zone_1 = require("@/utils/date/time_zone");
var element_plus_1 = require("element-plus");
require("element-plus/theme-chalk/dark/css-vars.css");
exports["default"] = vue_1.defineComponent({
    name: 'BriefIteratorList',
    components: {
        ElInput: element_plus_1.ElInput,
        ElButton: element_plus_1.ElButton,
        ElTag: element_plus_1.ElTag,
        defaultAvatar: defaultAvatar_vue_1["default"]
    },
    props: {
        isVisible: {
            type: Boolean,
            "default": true
        },
        autoHideDate: {
            type: Boolean,
            "default": true
        },
        maxTagsDisplay: {
            type: Number,
            "default": 3
        },
        items: {
            type: Array < IbriefIteratorListItem > ,
            required: true
        },
        // total items length, used for pagination
        itemsLength: {
            type: Number,
            required: true
        },
        showExtraMenuBtn: { type: Boolean, "default": false },
        extraMenuBtnItem: {
            type: Array < stdMenuList_1.IstdMenuItem > ,
            "default": []
        },
        itemsPerPage: {
            type: Number,
            "default": 10
        },
        // when itemsPerPageMax > itemsPerPage, can switche to this page size
        itemsPerPageMax: {
            type: Number,
            "default": 10
        },
        useTranslation: {
            type: Boolean,
            "default": true
        },
        noDataText: {
            type: String,
            "default": lang_1["default"].global.t('common.briefDataIterator.noDataText')
        },
        showLimitationInfo: {
            type: Boolean,
            "default": false
        },
        limitationTextKey: {
            type: String,
            "default": ''
        },
        limitationText: {
            type: String,
            "default": 'limit:'
        },
        limitationNum: {
            type: Number,
            "default": 20
        },
        menus: {
            type: Object,
            "default": { items: [] }
        },
        minShowDateWidth: {
            type: Number,
            "default": 350
        }
    },
    data: function () {
        return {
            showDate: true,
            current_page: 1,
            jumpingPage: false,
            jumpPageText: '',
            useMaxPageSize: false
        };
    },
    emits: ['fetchData'],
    computed: {
        pageCount: function () {
            var cnt = Math.ceil(this.itemsLength /
                (this.useMaxPageSize
                    ? this.itemsPerPageMax
                    : this.itemsPerPage));
            if (this.current_page > cnt) {
                this.current_page = cnt;
            }
            return cnt;
        }
    },
    watch: {
        isVisible: {
            handler: function (newVal) {
                var _this = this;
                if (newVal) {
                    // update the visibility of date column after next tick
                    vue_1.nextTick(function () {
                        _this.updateDateVisibility();
                    });
                }
            },
            immediate: true
        },
        current_page: {
            handler: function (val) {
                this.update(); // update data when current page changed
            }
        }
    },
    methods: {
        updateDateVisibility: function () {
            var list = this.$refs.list;
            // TODO: check all $refs, and avoid not found error
            if (list) {
                if (this.autoHideDate) {
                    var list_width = list.$el.getBoundingClientRect().width;
                    this.showDate =
                        list_width < this.minShowDateWidth ? false : true;
                }
                else {
                    this.showDate = true;
                }
            }
        },
        handleChiplick: function (event) {
            var target = event.target;
            // for `brief-iterator-item-tags` allow click event
            if (target != undefined &&
                !target.classList.contains('brief-iterator-item-tags')) {
                event.stopPropagation(); // not allow event trigger parent component
            }
        },
        handleMenuToggleBtnClick: function (event) {
            event.stopPropagation();
            event.preventDefault();
        },
        toggleMaxPageSize: function () {
            this.useMaxPageSize = !this.useMaxPageSize;
            this.update();
        },
        getTimeString: function (time) {
            if (!time) {
                return '';
            }
            if (
            // test if time is longer than 7 days
            new Date(time).getTime() <
                Date.now() - 7 * 24 * 60 * 60 * 1000) {
                return time_zone_1.UTCToLocalTimeString(time, 'YYYY-MM-DD');
            }
            return time_zone_1.GetLocalTimeDeltaStrBrief(time);
        },
        /**
         * Description When menu.callback is defined, call it with the list_item.call_back_params or list_item
         * @param {any} menu:IstdMenuItem
         * @param {any} list_item:IbriefIteratorListItem
         * @returns {any}
         */
        handleMenuItemClick: function (menu, list_item) {
            var _a;
            if (menu.callback) {
                menu.callback((_a = list_item.call_back_params) !== null && _a !== void 0 ? _a : list_item);
            }
        },
        getTagTranslation: function (tag) {
            var _a, _b;
            var lang = this.$i18n.locale;
            return (_b = (_a = tag[lang]) !== null && _a !== void 0 ? _a : tag.en) !== null && _b !== void 0 ? _b : tag.key;
        },
        fetchData: function (params) {
            this.$emit('fetchData', params);
        },
        update: function () {
            var params = {
                pageNum: this.current_page,
                itemsPerPage: this.useMaxPageSize
                    ? this.itemsPerPageMax
                    : this.itemsPerPage
            };
            this.fetchData(params);
        },
        jumpToPage: function () {
            return __awaiter(this, void 0, void 0, function () {
                var pageNum, maxPageNum, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.update()];
                        case 1:
                            _a.sent();
                            pageNum = Math.floor(Number(this.jumpPageText));
                            if (isNaN(pageNum))
                                return [2 /*return*/];
                            maxPageNum = this.useMaxPageSize
                                ? Math.ceil(this.itemsLength / this.itemsPerPageMax)
                                : Math.ceil(this.itemsLength / this.itemsPerPage);
                            this.current_page = Math.min(Math.max(pageNum, 1), maxPageNum);
                            this.jumpPageText = this.current_page.toString();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
    },
    mounted: function () {
        /** if update on mounted, call this function to update the data */
        // this.update();
        this.updateDateVisibility();
        window.addEventListener('resize', this.updateDateVisibility);
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.updateDateVisibility);
    }
});
