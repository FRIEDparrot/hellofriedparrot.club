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
var navbar_simple_vue_1 = require("@/components/nav/navbar_simple.vue");
var navUserAvatarPrompt_vue_1 = require("@/components/user/navUserAvatarPrompt.vue");
var rightSidebarToggleBtn_vue_1 = require("@/components/buttons/rightSidebarToggleBtn.vue");
var rightSidebarProfile_vue_1 = require("@/components/sidebar/rightSidebarProfile.vue");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var site_message_services_1 = require("@/services/messages/site_message_services");
var time_zone_1 = require("@/utils/date/time_zone");
var element_plus_1 = require("element-plus");
var site_messages_api_1 = require("@/api/site_messages/site_messages_api");
var confirmDialog_vue_1 = require("@/components/popups/confirmDialog.vue");
require("element-plus/theme-chalk/dark/css-vars.css");
var showConfirmDialog_1 = require("@/components/popups/scripts/showConfirmDialog");
exports["default"] = vue_1.defineComponent({
    name: 'SiteMessages',
    components: {
        navbar_simple: navbar_simple_vue_1["default"],
        navUserAvatarPrompt: navUserAvatarPrompt_vue_1["default"],
        rightSidebarToggleBtn: rightSidebarToggleBtn_vue_1["default"],
        rightSidebarProfile: rightSidebarProfile_vue_1["default"],
        floatingAlert: floatingAlert_vue_1["default"],
        ElTag: element_plus_1.ElTag,
        ElButton: element_plus_1.ElButton,
        confirmDialog: confirmDialog_vue_1["default"]
    },
    props: {
        itemsPerPage: {
            type: Number,
            "default": 5
        }
    },
    data: function () {
        return {
            items: [],
            current_page: 1,
            msg_card_max_width: 700,
            readStateLoading: false
        };
    },
    computed: {},
    methods: {
        showErrorMsg: function (msg) {
            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, msg);
        },
        checkItemsEmpty: function () {
            if (this.items.length === 0) {
                this.showErrorMsg(this.$t('site_messages.no_messages'));
                return true;
            }
            return false;
        },
        MarkasRead: function (id_list) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.checkItemsEmpty()) {
                                return [2 /*return*/];
                            }
                            this.readStateLoading = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, site_messages_api_1["default"].markSiteMessagesAsRead(id_list)];
                        case 2:
                            response = _a.sent();
                            id_list.forEach(function (id) {
                                var item = _this.items.find(function (item) { return item.id === id; });
                                if (item) {
                                    item.is_read = true;
                                }
                            });
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            this.showErrorMsg(error_1.message);
                            return [3 /*break*/, 5];
                        case 4:
                            this.readStateLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        /* not combine with MarkasRead intentionally */
        MarkasUnread: function (id_list) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.checkItemsEmpty()) {
                                return [2 /*return*/];
                            }
                            this.readStateLoading = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, site_messages_api_1["default"].markSiteMessagesAsUnread(id_list)];
                        case 2:
                            response = _a.sent();
                            id_list.forEach(function (id) {
                                var item = _this.items.find(function (item) { return item.id === id; });
                                if (item) {
                                    item.is_read = false;
                                }
                            });
                            return [3 /*break*/, 5];
                        case 3:
                            error_2 = _a.sent();
                            this.showErrorMsg(error_2.message);
                            return [3 /*break*/, 5];
                        case 4:
                            this.readStateLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        deleteMsg: function (id_list) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.checkItemsEmpty()) {
                                return [2 /*return*/];
                            }
                            this.readStateLoading = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, site_messages_api_1["default"].deleteSiteMessages(id_list)];
                        case 2:
                            response = _a.sent();
                            this.items = this.items.filter(function (item) { return !id_list.includes(item.id); });
                            return [3 /*break*/, 5];
                        case 3:
                            error_3 = _a.sent();
                            this.showErrorMsg(error_3.message);
                            return [3 /*break*/, 5];
                        case 4:
                            this.readStateLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        showConfirmDeleteDialog: function () {
            if (this.checkItemsEmpty()) {
                return;
            }
            showConfirmDialog_1["default"](this.$refs.deleteAllConfirmDialog);
        },
        getFormattedMsgTime: function (date) {
            return time_zone_1.UTCToLocalTimeString(date, 'YYYY-MM-DD HH:mm');
        },
        ToggleRightSidebar: function () {
            var rightSidebarProfile = this.$refs
                .rightSidebarProfile;
            rightSidebarProfile.toggle();
        },
        fetchUserSiteMessages: function () {
            return __awaiter(this, void 0, void 0, function () {
                var site_msg_data, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, site_message_services_1["default"].getSiteMessageDisplayListInfo()];
                        case 1:
                            site_msg_data = _a.sent();
                            this.items = site_msg_data;
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.showErrorMsg(error_4.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
    },
    mounted: function () {
        this.fetchUserSiteMessages();
    }
});
