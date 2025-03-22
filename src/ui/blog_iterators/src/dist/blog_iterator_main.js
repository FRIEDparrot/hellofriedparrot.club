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
var blog_services_1 = require("@/services/blogs/blog_services");
var vue_1 = require("vue");
var detailedIteratorList_vue_1 = require("@/components/lists/detailedIteratorList.vue");
var stdDataTableServer_1 = require("@/interface/tables/stdDataTableServer");
var defaultAvatar_vue_1 = require("@imgs/ui/defaultAvatar.vue");
var time_zone_1 = require("@/utils/date/time_zone");
var gsap_1 = require("gsap");
var blog_featured_banner_vue_1 = require("@/assets/imgs/ui/blog_featured_banner.vue");
var userInfoRightOffset = 30;
var userInfoTransitionDuration = 0.8;
/**
    For Ui folder, it provide the UI components for the web page.
        it may  use components element for create different UI elements.
*/
exports["default"] = vue_1.defineComponent({
    name: 'BlogIteratorMain',
    components: {
        detailedIteratorList: detailedIteratorList_vue_1["default"],
        defaultAvatar: defaultAvatar_vue_1["default"],
        blog_featured_banner: blog_featured_banner_vue_1["default"]
    },
    props: {
        itemsPerPage: {
            type: Number,
            "default": 5
        },
        orderBy: {
            type: String,
            "default": 'last_modify_time'
        },
        order: {
            type: String,
            "default": 'desc'
        },
        searchKey: {
            type: String,
            "default": null
        },
        search: {
            type: String,
            "default": null
        }
    },
    data: function () {
        return {
            items: [],
            count: 0,
            current_page: 1
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
        redirectTo: function (event, url) {
            if (event.ctrlKey) {
                window.open(url, '_blank');
            }
            else {
                this.$router.push(url);
            }
        },
        formatedTimeDeltaDisplay: function (time) {
            time = new Date(time);
            var timeDelta = (time.getTime() - Date.now()) / 1000;
            if (Math.abs(timeDelta) < 604800) {
                return time_zone_1.GetLocalTimeDeltaStrBrief(time);
            }
            else {
                return time_zone_1.UTCToLocalTimeString(time, 'YYYY-MM-DD');
            }
        },
        formatedPublishTimeDispay: function (time) {
            return time_zone_1.UTCToLocalTimeString(time, 'YYYY-MM-DD');
        },
        /* called  outside  of component to get data*/
        updateBlogData: function () {
            return __awaiter(this, void 0, void 0, function () {
                var params, req_params, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                pageNum: this.current_page,
                                itemsPerPage: this.itemsPerPage,
                                orderBy: this.orderBy,
                                order: this.order,
                                searchKey: this.searchKey,
                                search: this.search
                            };
                            req_params = stdDataTableServer_1.makeStdDataTableRequestParams(params);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, blog_services_1["default"].getBlogDisplayDataListInfo(req_params)];
                        case 2:
                            response = _a.sent();
                            this.items = response.data;
                            this.count = response.count;
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        // #region User infomaation animation
        // dynamic effect for the iterator-user-info-container part to move
        handlerItemMouseEnter: function (event) {
            var target = event.currentTarget;
            if (target.classList.contains('iterator-user-info-container')) {
                return;
            }
            var user_info = target.querySelector('.iterator-user-info-container');
            gsap_1["default"].effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: -user_info.offsetWidth + userInfoRightOffset
            });
        },
        handlerItemMouseLeave: function (event) {
            var target = event.currentTarget;
            if (target.classList.contains('iterator-user-info-container')) {
                return;
            }
            var user_info = target.querySelector('.iterator-user-info-container');
            gsap_1["default"].effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: 0
            });
        },
        handlerUserInfoMouseEnter: function (event) {
            var user_info = event.currentTarget;
            gsap_1["default"].effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: 0
            });
        },
        handlerUserInfoMouseLeave: function (event) {
            var user_info = event.currentTarget;
            var width = user_info.offsetWidth;
            gsap_1["default"].effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: -width + userInfoRightOffset
            });
        }
    },
    watch: {
        current_page: {
            handler: function (newPage) {
                this.updateBlogData();
            }
        },
        items: {
            handler: function (newItems) { }
        }
    },
    mounted: function () {
        this.updateBlogData();
    }
});
