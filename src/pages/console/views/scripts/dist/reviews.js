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
var VDataTable_1 = require("vuetify/components/VDataTable");
var reviews_tables_api_1 = require("@/api/manage/reviews/reviews_tables_api");
var floatingAlert_vue_1 = require("@/components/popups/floatingAlert.vue");
var showFloatingAlert_1 = require("@/components/popups/scripts/showFloatingAlert");
var stdDataTableServer_1 = require("@/interface/tables/stdDataTableServer");
var confirmDialog_vue_1 = require("@components/popups/confirmDialog.vue");
var showConfirmDialog_1 = require("@/components/popups/scripts/showConfirmDialog");
var time_zone_1 = require("@/utils/date/time_zone");
exports["default"] = vue_1.defineComponent({
    name: 'Reviews',
    components: {
        VDataTableServer: VDataTable_1.VDataTableServer,
        floatingAlert: floatingAlert_vue_1["default"],
        confirmDialog: confirmDialog_vue_1["default"]
    },
    setup: function () { },
    data: function () {
        return {
            counterInit: [0, 0, 0],
            sendMessage: true,
            typeSelector: {
                select: 0,
                selectTabs: [
                    {
                        titleKey: 'reviews.reviewRequests',
                        value: 0
                    },
                    {
                        titleKey: 'reviews.registrations',
                        value: 1
                    },
                    {
                        titleKey: 'reviews.accountMods',
                        value: 2
                    },
                ]
            },
            searchKeySelector: { select: 0 },
            // ************** Cmmon Model Definitions **************
            /** common search model for all tables, different tabs search model are from different string */
            tableSearchModel: {
                0: '',
                1: '',
                2: ''
            },
            /** common   column select model, record the selected columns of search */
            columnSelectModel: {
                0: 0,
                1: 0,
                2: 0
            },
            // #region Table Definitions
            // different tabs are from different database tables
            ReviewTable: stdDataTableServer_1.makeStdDataTableServer([
                {
                    titleKey: 'common.dataTableServer.id',
                    key: 'id',
                    align: 'start'
                },
                {
                    titleKey: 'common.dataTableServer.actionType',
                    key: 'action_type'
                },
                {
                    titleKey: 'common.dataTableServer.actionByid',
                    key: 'action_by_id'
                },
                {
                    titleKey: 'common.dataTableServer.actionUserName',
                    key: 'action_by_name'
                },
                {
                    titleKey: 'common.dataTableServer.actionAt',
                    key: 'action_time',
                    isTimeColumn: true,
                    sortable: true
                },
                {
                    titleKey: 'common.dataTableServer.linkOfReview',
                    title: 'Link of Review',
                    key: 'reviewLink',
                    sortable: false,
                    align: 'center'
                },
                {
                    titleKey: 'common.dataTableServer.replyLanguage',
                    title: 'Reply Language',
                    key: 'language',
                    sortable: false,
                    align: 'center'
                },
            ]),
            RegisterTable: stdDataTableServer_1.makeStdDataTableServer([
                {
                    titleKey: 'register.id',
                    key: 'id',
                    align: 'start',
                    sortable: true
                },
                {
                    titleKey: 'register.username',
                    key: 'name',
                    sortable: true
                },
                {
                    titleKey: 'register.email',
                    key: 'email',
                    sortable: true
                },
                {
                    titleKey: 'register.career',
                    key: 'career',
                    sortable: false
                },
                {
                    titleKey: 'register.country',
                    key: 'country',
                    sortable: true
                },
                {
                    titleKey: 'g.submitTime',
                    key: 'submitTime',
                    isTimeColumn: true,
                    sortable: true,
                    searchable: false
                },
                {
                    titleKey: 'register.reason',
                    key: 'reason',
                    sortable: false
                },
            ]),
            AccountAlterTable: stdDataTableServer_1.makeStdDataTableServer([
                {
                    titleKey: 'common.dataTableServer.id',
                    title: 'id',
                    key: 'id',
                    align: 'start'
                },
                {
                    titleKey: 'common.dataTableServer.actionType',
                    key: 'actionType'
                },
                {
                    titleKey: 'common.dataTableServer.actionByid',
                    key: 'actionById'
                },
                {
                    titleKey: 'common.dataTableServer.actionUserName',
                    key: 'byName'
                },
                {
                    titleKey: 'register.email',
                    key: 'email'
                },
                {
                    titleKey: 'common.dataTableServer.actionDesc',
                    key: 'actionBrief'
                },
                {
                    titleKey: 'common.dataTableServer.actionAt',
                    title: 'Action At',
                    key: 'submitTime',
                    isTimeColumn: true,
                    sortable: false
                },
            ]),
            // #endregion
            // ****** Fetch Data and Accept Review Callbacks ****
            fetchDataCallbackList: [
                reviews_tables_api_1["default"].getCommonReviewsTableData,
                reviews_tables_api_1["default"].getRegisterTableData,
                reviews_tables_api_1["default"].getAccountModsTableData,
            ],
            acceptReviewCallbackList: [
                reviews_tables_api_1["default"].acceptCommonReviews,
                reviews_tables_api_1["default"].acceptRegister,
                reviews_tables_api_1["default"].acceptAccountMods,
            ]
        };
    },
    computed: {
        currSelect: function () {
            return this.typeSelector.select;
        },
        currTable: function () {
            var tables = [
                this.ReviewTable,
                this.RegisterTable,
                this.AccountAlterTable,
            ];
            return tables[this.currSelect];
        },
        currAcceptReviewCallback: function () {
            return this.acceptReviewCallbackList[this.currSelect];
        },
        translatedTypeSelector: function () {
            var _this = this;
            return this.typeSelector.selectTabs.map(function (tab) {
                return {
                    title: _this.$t(tab.titleKey),
                    value: tab.value
                };
            });
        },
        translatedSearchKeySelector: function () {
            var _this = this;
            return this.currTable.headers
                .filter(function (header) { return header.sortable !== false; })
                .map(function (header, index) {
                var _a, _b;
                return {
                    title: _this.$t((_a = header.titleKey) !== null && _a !== void 0 ? _a : ''),
                    sortable: (_b = header.sortable) !== null && _b !== void 0 ? _b : true,
                    key: header.key,
                    value: index
                };
            });
        },
        translatedTableHeaders: function () {
            var _this = this;
            // both save the store and realize the translation
            return this.currTable.headers.map(function (header) {
                var _a;
                return {
                    title: _this.$t((_a = header.titleKey) !== null && _a !== void 0 ? _a : ''),
                    key: header.key
                };
            });
        }
    },
    methods: {
        // ****************  table data fetch callback functions *****************
        /* note :  different tabs are from different database tables */
        /**
         * Description Fetch the data of the current table, called by
         *      the data-table-server component.
         * @param {any} page
         * @param {any} itemsPerPage
         * @param {any} sortBy
         * @returns {any}
         */
        fetchCurrentTableData: function (_a) {
            var _b, _c, _d, _e, _f;
            var page = _a.page, itemsPerPage = _a.itemsPerPage, sortBy = _a.sortBy;
            return __awaiter(this, void 0, void 0, function () {
                var current_table, current_select, sort_key, sort_order, callbackFunc, column_select, search_key, params, response, error_1;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            current_table = this.currTable;
                            current_select = this.currSelect;
                            current_table.loading = true;
                            sort_key = null;
                            sort_order = null;
                            if (Array.isArray(sortBy) && sortBy.length !== 0) {
                                sort_key = (_b = sortBy[0].key) !== null && _b !== void 0 ? _b : null;
                                sort_order = (_c = sortBy[0].order) !== null && _c !== void 0 ? _c : null;
                            }
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 3, , 4]);
                            callbackFunc = this.fetchDataCallbackList[current_select];
                            column_select = this.translatedSearchKeySelector[this.columnSelectModel[current_select]
                            // the key that search column selected
                            ];
                            search_key = (_d = column_select.key) !== null && _d !== void 0 ? _d : null;
                            params = {
                                pageNum: page,
                                itemsPerPage: itemsPerPage,
                                orderBy: sort_key,
                                order: sort_order,
                                searchKey: search_key,
                                search: this.tableSearchModel[current_select]
                            };
                            return [4 /*yield*/, callbackFunc(params)];
                        case 2:
                            response = _g.sent();
                            current_table.page = page !== null && page !== void 0 ? page : 1;
                            current_table.itemsPerPage = itemsPerPage !== null && itemsPerPage !== void 0 ? itemsPerPage : 10;
                            current_table.itemsLength = (_e = response === null || response === void 0 ? void 0 : response.count) !== null && _e !== void 0 ? _e : 0;
                            current_table.sortBy = sortBy !== null && sortBy !== void 0 ? sortBy : [];
                            current_table.items = (_f = response === null || response === void 0 ? void 0 : response.tableData.map(function (item) {
                                current_table.headers.forEach(function (header) {
                                    if (header.isTimeColumn && item[header.key]) {
                                        item[header.key] = time_zone_1.UTCToLocalTimeString(item[header.key]);
                                    }
                                });
                                return item;
                            })) !== null && _f !== void 0 ? _f : [];
                            current_table.loading = false;
                            return [2 /*return*/, Promise.resolve(response)];
                        case 3:
                            error_1 = _g.sent();
                            this.showErrorAlert(error_1.message);
                            current_table.loading = false;
                            return [2 /*return*/, Promise.reject(error_1)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        /***************  accept/reject review functions ******************/
        /**
         * Description Called when press the confirm button in the UI panel.
         * @param {any} accept:boolean=true
         * @returns {any}
         */
        confirmReviewBtnPressed: function (accept) {
            if (accept === void 0) { accept = true; }
            // show the confirm dialog
            if (this.currTable.selected.length === 0) {
                this.showErrorAlert(this.$t('common.dataTableServer.noItemSelected'));
                return;
            }
            if (accept) {
                showConfirmDialog_1["default"](this.$refs.acceptConfirmDialog);
            }
            else {
                showConfirmDialog_1["default"](this.$refs.rejectConfirmDialog);
            }
        },
        /**
         * Description Called when press the confirm button in the confirm dialog.
         * @param {any} accept:boolean=true
         * @param {any} reason:string=""
         * @returns {any}
         */
        confirmReviews: function (reason) {
            if (reason === void 0) { reason = ''; }
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.confirmCallback(true, this.sendMessage, '', this.currAcceptReviewCallback, this.fetchCurrentTableData)];
                        case 1:
                            result = _a.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, this.$t('common.dataTableServer.acceptSuccess'));
                            return [2 /*return*/, Promise.resolve(result)];
                        case 2:
                            error_2 = _a.sent();
                            this.showErrorAlert(error_2.message);
                            return [2 /*return*/, Promise.reject(error_2)];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        rejectReviews: function (reason) {
            if (reason === void 0) { reason = ''; }
            return __awaiter(this, void 0, void 0, function () {
                var result, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.confirmCallback(false, this.sendMessage, reason, this.currAcceptReviewCallback, this.fetchCurrentTableData)];
                        case 1:
                            result = _a.sent();
                            showFloatingAlert_1["default"](this.$refs.floatingAlert, true, this.$t('common.dataTableServer.rejectSuccess'));
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.showErrorAlert(error_3.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Description Called when press the cancel button in the confirm dialog.
         */
        cancelReviews: function () {
            // nothing to do (put here for future use)
        },
        /****************  common confirm/reject callback functions ************/
        /**
         * Description
         *      call back function when confirm/reject button in dialog is pressed.
         *
         * @param {any} accept:boolean=true
         * @param {any} sendMsg:boolean=true
         * @param {any} message:string|null=null
         * @param {any} acceptCallback:(params:IStdAcceptReviewParams
         * @returns {any}
         */
        confirmCallback: function (accept, sendMsg, message, acceptCallback, fetchTableDataCallback) {
            if (accept === void 0) { accept = true; }
            if (sendMsg === void 0) { sendMsg = true; }
            if (message === void 0) { message = null; }
            return __awaiter(this, void 0, Promise, function () {
                var current_table, id_list, result, item_left, item_of_curr_page, params, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            current_table = this.currTable;
                            current_table.loading = true;
                            id_list = current_table.selected;
                            if (id_list.length === 0) {
                                return [2 /*return*/, Promise.reject(new Error(this.$t('common.dataTableServer.noItemSelected')))]; // no review selected
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, acceptCallback({
                                    accept: accept,
                                    id_list: id_list,
                                    sendMsg: sendMsg,
                                    message: message
                                })];
                        case 2:
                            result = _a.sent();
                            current_table.selected = [];
                            item_left = current_table.itemsLength - id_list.length;
                            item_of_curr_page = current_table.itemsPerPage *
                                (current_table.page - 1);
                            if (item_left <= item_of_curr_page) {
                                // switch to the previous page if the data is out of range
                                current_table.page =
                                    current_table.page === 1 ? 1 : current_table.page - 1;
                            }
                            params = {
                                page: current_table.page,
                                itemsPerPage: current_table.itemsPerPage,
                                sortBy: current_table.sortBy
                            };
                            fetchTableDataCallback(params); // re-fetch the table data
                            current_table.loading = false;
                            return [2 /*return*/, Promise.resolve(result)];
                        case 3:
                            error_4 = _a.sent();
                            current_table.loading = false;
                            return [2 /*return*/, Promise.reject(error_4)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        showErrorAlert: function (message) {
            showFloatingAlert_1["default"](this.$refs.floatingAlert, false, message);
        }
    },
    mounted: function () {
        var _this = this;
        var tableDataFetchers = [
            {
                fetcher: reviews_tables_api_1["default"].getCommonReviewsTableData,
                table: this.ReviewTable,
                counterIndex: 0
            },
            {
                fetcher: reviews_tables_api_1["default"].getRegisterTableData,
                table: this.RegisterTable,
                counterIndex: 1
            },
            {
                fetcher: reviews_tables_api_1["default"].getAccountModsTableData,
                table: this.AccountAlterTable,
                counterIndex: 2
            },
        ];
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _loop_1, this_1, _i, tableDataFetchers_1, _a, fetcher, table, counterIndex, error_5;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.currTable.loading = true;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        _loop_1 = function (fetcher, table, counterIndex) {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetcher({
                                            pageNum: 1,
                                            itemsPerPage: 10
                                        })];
                                    case 1:
                                        res = _a.sent();
                                        this_1.counterInit[counterIndex] = (_b = res.count) !== null && _b !== void 0 ? _b : 0;
                                        table.itemsLength = (_c = res.count) !== null && _c !== void 0 ? _c : 0;
                                        table.items = (_d = res.tableData.map(function (item) {
                                            table.headers.forEach(function (header) {
                                                if (header.isTimeColumn && item[header.key]) {
                                                    item[header.key] = time_zone_1.UTCToLocalTimeString(item[header.key]);
                                                }
                                            });
                                            return item;
                                        })) !== null && _d !== void 0 ? _d : [];
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, tableDataFetchers_1 = tableDataFetchers;
                        _e.label = 2;
                    case 2:
                        if (!(_i < tableDataFetchers_1.length)) return [3 /*break*/, 5];
                        _a = tableDataFetchers_1[_i], fetcher = _a.fetcher, table = _a.table, counterIndex = _a.counterIndex;
                        return [5 /*yield**/, _loop_1(fetcher, table, counterIndex)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _e.sent();
                        this.showErrorAlert(error_5.message);
                        return [3 /*break*/, 7];
                    case 7:
                        this.currTable.loading = false;
                        return [2 /*return*/];
                }
            });
        }); })();
    }
});
