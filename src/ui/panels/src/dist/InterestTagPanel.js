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
var tag_choose_overlay_vue_1 = require("@/components/overlays/tag_choose_overlay.vue");
var newTagPrompt_vue_1 = require("@/components/popups/newTagPrompt.vue");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var personal_data_service_1 = require("@/services/accounts/personal_data_service");
var interest_tags_api_1 = require("@/api/interest_tags/interest_tags_api");
var store_1 = require("@/store");
exports["default"] = vue_1.defineComponent({
    name: 'InterestTagPanel',
    components: {
        tagChooseOverlay: tag_choose_overlay_vue_1["default"],
        newTagPrompt: newTagPrompt_vue_1["default"],
        floatingAlert: floatingAlert_vue_1["default"]
    },
    data: function () {
        return {
            user: store_1["default"].state.user,
            maxUserTagNum: 15
        };
    },
    computed: {
        // responsive state variables
        userInterestTags: function () {
            return store_1["default"].state.user_personal_data
                .interest_tags;
        },
        recommendInterestTags: function () {
            return store_1["default"].state.user_personal_data
                .recommend_tags;
        }
    },
    methods: {
        showAddUserInterestTagOverlay: function () {
            var tag_overlay = this.$refs.addUserInterestTagOverlay;
            if (tag_overlay) {
                // use  this.userInterestTags.copy() to avoid
                tag_overlay.show(this.userInterestTags.slice(0));
            }
        },
        showNewTagPrompt: function () {
            var prompt = this.$refs.newTagPrompt;
            prompt.show();
        },
        getTagTranslation: function (item) {
            var _a, _b;
            var lang = this.$i18n.locale;
            return (_b = (_a = item[lang]) !== null && _a !== void 0 ? _a : item.en) !== null && _b !== void 0 ? _b : item;
        },
        updateUserInterestTags: function (tags) {
            return __awaiter(this, void 0, void 0, function () {
                var msg, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, personal_data_service_1["default"].update_user_interest_tags(tags)];
                        case 1:
                            msg = _a.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, msg); // show success alert
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.showErrorAlert(error_1.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        deleteInterestTags: function (tags) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, interest_tags_api_1["default"].deleteTagFromDatabase(tags.map(function (tag) { return tag.key; }))];
                        case 1:
                            _a.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, this.$t('common.tag_overlay.delete_success'));
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
        showDeleteTagOverlay: function () {
            var tag_overlay = this.$refs.deleteUserInterestTagOverlay;
            tag_overlay.show();
        },
        showErrorAlert: function (msg) {
            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, msg);
        }
    }
});
