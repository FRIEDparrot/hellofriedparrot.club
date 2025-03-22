import { defineComponent } from 'vue';
import { VDataTableServer } from 'vuetify/components/VDataTable';
import ReviewTablesApi from '@/api/manage/reviews/reviews_tables_api';
import { IStdAcceptReviewParams } from '@/api/manage/reviews/reviews_api';

import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import { makeStdDataTableServer } from '@/interface/tables/stdDataTableServer';
import {
    IstdDataTableServer,
    fetchTableDataParams,
} from '@/interface/tables/stdDataTableServer';
import confirmDialog from '@components/popups/confirmDialog.vue';
import { IstdDataTableUpdateParams } from '@/interface/tables/stdDataTableServer';
import showConfirmDialog from '@/components/popups/scripts/showConfirmDialog';
import { UTCToLocalTimeString } from '@/utils/date/time_zone';

export default defineComponent({
    name: 'Reviews',
    components: {
        VDataTableServer,
        floatingAlert,
        confirmDialog,
    },
    setup() {},
    data() {
        return {
            counterInit: [0, 0, 0], // used to record the initialize count of each table
            sendMessage: true, // infom the user by email (or message) or not
            typeSelector: {
                select: 0,
                selectTabs: [
                    {
                        titleKey: 'reviews.reviewRequests',
                        value: 0,
                    },
                    {
                        titleKey: 'reviews.registrations',
                        value: 1,
                    },
                    {
                        titleKey: 'reviews.accountMods',
                        value: 2,
                    },
                ],
            },
            searchKeySelector: { select: 0 },
            // ************** Cmmon Model Definitions **************
            /** common search model for all tables, different tabs search model are from different string */
            tableSearchModel: {
                0: '',
                1: '',
                2: '',
            },
            /** common   column select model, record the selected columns of search */
            columnSelectModel: {
                0: 0,
                1: 0,
                2: 0,
            },
            // #region Table Definitions
            // different tabs are from different database tables
            ReviewTable: makeStdDataTableServer([
                {
                    titleKey: 'common.dataTableServer.id',
                    key: 'id',
                    align: 'start',
                },
                {
                    titleKey: 'common.dataTableServer.actionType',
                    key: 'action_type',
                },
                {
                    titleKey: 'common.dataTableServer.actionByid',
                    key: 'action_by_id',
                },
                {
                    titleKey: 'common.dataTableServer.actionUserName',
                    key: 'action_by_name',
                },
                {
                    titleKey: 'common.dataTableServer.actionAt',
                    key: 'action_time',
                    isTimeColumn: true,
                    sortable: true,
                },
                {
                    titleKey: 'common.dataTableServer.linkOfReview',
                    title: 'Link of Review',
                    key: 'reviewLink',
                    sortable: false,
                    align: 'center',
                },
                {
                    titleKey: 'common.dataTableServer.replyLanguage',
                    title: 'Reply Language',
                    key: 'language',
                    sortable: false,
                    align: 'center',
                },
            ]) as IstdDataTableServer,
            RegisterTable: makeStdDataTableServer([
                {
                    titleKey: 'register.id',
                    key: 'id',
                    align: 'start',
                    sortable: true,
                },
                {
                    titleKey: 'register.username',
                    key: 'name',
                    sortable: true,
                },
                {
                    titleKey: 'register.email',
                    key: 'email',
                    sortable: true,
                },
                {
                    titleKey: 'register.career',
                    key: 'career',
                    sortable: false,
                },
                {
                    titleKey: 'register.country',
                    key: 'country',
                    sortable: true,
                },
                {
                    titleKey: 'g.submitTime',
                    key: 'submitTime',
                    isTimeColumn: true,
                    sortable: true,
                    searchable: false,
                },
                {
                    titleKey: 'register.reason',
                    key: 'reason',
                    sortable: false,
                },
            ]) as IstdDataTableServer,
            AccountAlterTable: makeStdDataTableServer([
                {
                    titleKey: 'common.dataTableServer.id',
                    title: 'id',
                    key: 'id',
                    align: 'start',
                },
                {
                    titleKey: 'common.dataTableServer.actionType',
                    key: 'actionType',
                },
                {
                    titleKey: 'common.dataTableServer.actionByid',
                    key: 'actionById',
                },
                {
                    titleKey: 'common.dataTableServer.actionUserName',
                    key: 'byName',
                },
                {
                    titleKey: 'register.email',
                    key: 'email',
                },
                {
                    titleKey: 'common.dataTableServer.actionDesc',
                    key: 'actionBrief',
                },
                {
                    titleKey: 'common.dataTableServer.actionAt',
                    title: 'Action At',
                    key: 'submitTime',
                    isTimeColumn: true,
                    sortable: false,
                },
            ]) as IstdDataTableServer,
            // #endregion

            // ****** Fetch Data and Accept Review Callbacks ****
            fetchDataCallbackList: [
                ReviewTablesApi.getCommonReviewsTableData,
                ReviewTablesApi.getRegisterTableData,
                ReviewTablesApi.getAccountModsTableData,
            ],
            acceptReviewCallbackList: [
                ReviewTablesApi.acceptCommonReviews,
                ReviewTablesApi.acceptRegister,
                ReviewTablesApi.acceptAccountMods,
            ],
        };
    },
    computed: {
        currSelect() {
            return this.typeSelector.select;
        },
        currTable() {
            const tables: IstdDataTableServer[] = [
                this.ReviewTable,
                this.RegisterTable,
                this.AccountAlterTable,
            ];
            return tables[this.currSelect];
        },
        currAcceptReviewCallback() {
            return this.acceptReviewCallbackList[this.currSelect];
        },
        translatedTypeSelector() {
            return this.typeSelector.selectTabs.map((tab) => {
                return {
                    title: this.$t(tab.titleKey),
                    value: tab.value,
                };
            });
        },
        translatedSearchKeySelector() {
            return this.currTable.headers
                .filter((header) => header.sortable !== false)
                .map((header, index) => {
                    return {
                        title: this.$t(header.titleKey ?? ''),
                        sortable: header.sortable ?? true,
                        key: header.key,
                        value: index,
                    };
                });
        },
        translatedTableHeaders() {
            // both save the store and realize the translation
            return this.currTable.headers.map((header) => {
                return {
                    title: this.$t(header.titleKey ?? ''),
                    key: header.key,
                };
            });
        },
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
        async fetchCurrentTableData({ page, itemsPerPage, sortBy }) {
            const current_table: IstdDataTableServer = this.currTable;
            const current_select = this.currSelect;
            current_table.loading = true;
            let sort_key: string | null = null;
            let sort_order: string | null = null;

            if (Array.isArray(sortBy) && sortBy.length !== 0) {
                sort_key = sortBy[0].key ?? null;
                sort_order = sortBy[0].order ?? null;
            }
            try {
                const callbackFunc = this.fetchDataCallbackList[current_select];
                const column_select: any =
                    this.translatedSearchKeySelector[
                        this.columnSelectModel[current_select]
                        // the key that search column selected
                    ];
                const search_key = column_select.key ?? null;
                const params = {
                    pageNum: page,
                    itemsPerPage: itemsPerPage,
                    orderBy: sort_key,
                    order: sort_order,
                    searchKey: search_key,
                    search: this.tableSearchModel[current_select],
                } as IstdDataTableUpdateParams;

                const response: any = await callbackFunc(params);
                current_table.page = page ?? 1;
                current_table.itemsPerPage = itemsPerPage ?? 10;
                current_table.itemsLength = response?.count ?? 0;
                current_table.sortBy = sortBy ?? [];
                current_table.items =
                    response?.tableData.map((item) => {
                        current_table.headers.forEach((header) => {
                            if (header.isTimeColumn && item[header.key]) {
                                item[header.key] = UTCToLocalTimeString(
                                    item[header.key],
                                );
                            }
                        });
                        return item;
                    }) ?? [];
                current_table.loading = false;
                return Promise.resolve(response);
            } catch (error: any) {
                this.showErrorAlert(error.message);
                current_table.loading = false;
                return Promise.reject(error);
            }
        },

        /***************  accept/reject review functions ******************/
        /**
         * Description Called when press the confirm button in the UI panel.
         * @param {any} accept:boolean=true
         * @returns {any}
         */
        confirmReviewBtnPressed(accept: boolean = true) {
            // show the confirm dialog
            if (this.currTable.selected.length === 0) {
                this.showErrorAlert(
                    this.$t('common.dataTableServer.noItemSelected'),
                );
                return;
            }
            if (accept) {
                showConfirmDialog(this.$refs.acceptConfirmDialog);
            } else {
                showConfirmDialog(this.$refs.rejectConfirmDialog);
            }
        },

        /**
         * Description Called when press the confirm button in the confirm dialog.
         * @param {any} accept:boolean=true
         * @param {any} reason:string=""
         * @returns {any}
         */
        async confirmReviews(reason: string = '') {
            try {
                const result = await this.confirmCallback(
                    true,
                    this.sendMessage,
                    '',
                    this.currAcceptReviewCallback,
                    this.fetchCurrentTableData,
                );
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    true,
                    this.$t('common.dataTableServer.acceptSuccess'),
                );
                return Promise.resolve(result);
            } catch (error: any) {
                this.showErrorAlert(error.message);
                return Promise.reject(error);
            }
        },

        async rejectReviews(reason: string = '') {
            try {
                const result = await this.confirmCallback(
                    false,
                    this.sendMessage,
                    reason,
                    this.currAcceptReviewCallback,
                    this.fetchCurrentTableData,
                );
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    true,
                    this.$t('common.dataTableServer.rejectSuccess'),
                );
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        },
        /**
         * Description Called when press the cancel button in the confirm dialog.
         */
        cancelReviews() {
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
        async confirmCallback(
            accept: boolean = true,
            sendMsg: boolean = true,
            message: string | null = null,
            acceptCallback: (params: IStdAcceptReviewParams) => Promise<any>,
            fetchTableDataCallback: (fetchTableDataParams) => Promise<any>,
        ): Promise<any> {
            // result = confirm
            const current_table: IstdDataTableServer = this.currTable;
            current_table.loading = true;
            const id_list: number[] = current_table.selected;
            if (id_list.length === 0) {
                return Promise.reject(
                    new Error(this.$t('common.dataTableServer.noItemSelected')),
                ); // no review selected
            }
            try {
                const result = await acceptCallback({
                    accept: accept,
                    id_list: id_list,
                    sendMsg: sendMsg,
                    message: message,
                } as IStdAcceptReviewParams);
                current_table.selected = [];
                const item_left =
                    (current_table.itemsLength as number) - id_list.length;
                const item_of_curr_page =
                    (current_table.itemsPerPage as number) *
                    ((current_table.page as number) - 1);

                if (item_left <= item_of_curr_page) {
                    // switch to the previous page if the data is out of range
                    current_table.page =
                        current_table.page === 1 ? 1 : current_table.page - 1;
                }
                /**   update the table data : if succeed, the item must be removed */
                const params = {
                    page: current_table.page,
                    itemsPerPage: current_table.itemsPerPage,
                    sortBy: current_table.sortBy,
                } as fetchTableDataParams;
                fetchTableDataCallback(params); // re-fetch the table data
                current_table.loading = false;
                return Promise.resolve(result);
            } catch (error: any) {
                current_table.loading = false;
                return Promise.reject(error);
            }
            // reset the selected list (if not reset, the deleted item would still remain)
        },
        showErrorAlert(message: string) {
            showFloatingAlert(this.$refs.floatingAlert as any, false, message);
        },
    },
    mounted() {
        const tableDataFetchers = [
            {
                fetcher: ReviewTablesApi.getCommonReviewsTableData,
                table: this.ReviewTable,
                counterIndex: 0,
            },
            {
                fetcher: ReviewTablesApi.getRegisterTableData,
                table: this.RegisterTable,
                counterIndex: 1,
            },
            {
                fetcher: ReviewTablesApi.getAccountModsTableData,
                table: this.AccountAlterTable,
                counterIndex: 2,
            },
        ];
        (async () => {
            this.currTable.loading = true;
            try {
                for (const {
                    fetcher,
                    table,
                    counterIndex,
                } of tableDataFetchers) {
                    const res = await fetcher({
                        pageNum: 1,
                        itemsPerPage: 10,
                    });
                    this.counterInit[counterIndex] = res.count ?? 0;
                    table.itemsLength = res.count ?? 0;
                    table.items =
                        res.tableData.map((item) => {
                            table.headers.forEach((header) => {
                                if (header.isTimeColumn && item[header.key]) {
                                    item[header.key] = UTCToLocalTimeString(
                                        item[header.key],
                                    );
                                }
                            });
                            return item;
                        }) ?? [];
                }
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
            this.currTable.loading = false;
        })();
    },
});
