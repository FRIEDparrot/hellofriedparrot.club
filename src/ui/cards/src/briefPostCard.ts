import { defineComponent, handleError, nextTick, ref, watchEffect } from 'vue';

import briefIteratorList, {
    IbriefIteratorListItem,
} from '@/components/lists/briefIteratorList.vue';
import InterestTag from '@/interface/classes/interestTag_cls';
import { IstdMenuList, IstdMenuItem } from '@/interface/iterators/stdMenuList';
import cache from '@/store/cache';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import confirmDialog from '@/components/popups/confirmDialog.vue';
import showConfirmDialog from '@/components/popups/scripts/showConfirmDialog';
import { UTCToLocalTimeString } from '@/utils/date/time_zone';
import postBlogOverlay from '@/components/overlays/postBlogOverlay.vue';
import { IresBlogBrief, IresDraftBrief } from '@/interface/requests/blog_req';
import DraftsApi from '@/api/drafts/drafts_api';
import HistoryApi from '@/api/history/history_api';
import BlogsApi from '@/api/blogs/blogs_api';
import HistoryRecord from '@/interface/classes/historyRecord_cls';
import {
    IstdDataTableUpdateParams,
    makeStdDataTableRequestParams,
} from '@/interface/tables/stdDataTableServer';
import BlogServices from '@/services/blogs/blog_services';
import IblogDisplayData from '@/interface/display/blogDisplayData';
import store from '@/store';

enum MenuOperations {
    delete = 'delete',
    publish = 'publish',
    edit = 'edit',
}

// Assuming this is in a separate types file or within the same file
export interface briefPostCardTab {
    key: string /** unique key for the tab */;
    icon: string;
    titleKey: string /** title key to display on the tab before the icon */;
    title?: string /** title to display on the tab after the icon */;
    items: IbriefIteratorListItem[];
    itemsLength: number;
    cb?: (item: any) => Promise<any>; // call back function to fetch data
    limitation?: number;
    limitationTextKey?: string;
    menus?: IstdMenuList;
}

const maxBlogCountDict = {
    '-1': 8000,
    '0': 8000,
    '1': 8000,
    '2': 8000,
    '3': 1000,
    '4': 200,
    '5': 0,
};

export default defineComponent({
    name: 'briefPostCard',
    components: {
        briefIteratorList,
        floatingAlert,
        confirmDialog,
        postBlogOverlay,
    },
    props: {},
    computed: {
        currCardItems() {
            const tabIdx = this.post_card.tab_idx;
            return this.post_card.tabs[tabIdx].items;
        },
    },
    setup() {
        const user_priority = store.state.user.priority;
        return {
            user_priority,
        };
    },
    data() {
        return {
            confirmDialogAriticles: {
                title: '',
                subtitle: '',
                operation: '', // store the current operation`
                uuid: '', // store the uuid of the article to be deleted or published
            },
            small_width_layout: ref(false),
            showJumpInput: false,
            jumpPage: 0,
            handleJumpPage: () => {},

            history_list: [] as HistoryRecord[],
            // #region Post Card Data
            post_card: {
                tab_idx: 0,
                tabs: [
                    {
                        key: 'history',
                        titleKey: 'common.post_card.history',
                        icon: 'mdi-clock-outline',
                        items: [] as IbriefIteratorListItem[], // get the history data
                        cb: (params: IstdDataTableUpdateParams) => {
                            return this.fetch_history_data(params);
                        },
                        itemsLength: 0,
                        limitation: 100,
                        limitationTextKey: 'common.post_card.historyLimitation',
                    },
                    /** drafts tab data  */
                    {
                        key: 'draft',
                        icon: 'mdi-pencil',
                        titleKey: 'common.post_card.drafts',
                        title: 'Drafts',
                        items: [] as IbriefIteratorListItem[], // get the draft data
                        itemsLength: 0,
                        cb: (params: IstdDataTableUpdateParams) => {
                            /** needed when fetch by page */
                            return this.fetch_draft_data(params);
                        },
                        limitation: 20,
                        limitationTextKey: 'common.post_card.draftLimitation',
                        // #region menus
                        menus: {
                            items: [
                                {
                                    titleKey: 'g.edit',
                                    icon: 'mdi-pencil',
                                    callback: (uuid: string) => {
                                        this.$router.push(
                                            `/drafts/edit/${uuid}`,
                                        );
                                    },
                                },
                                {
                                    titleKey: 'g.publish',
                                    icon: 'mdi-upload',
                                    callback: (uuid: string) => {
                                        const overlay = this.$refs
                                            .postBlogOverlay as InstanceType<
                                            typeof postBlogOverlay
                                        >;
                                        if (overlay) {
                                            overlay.show(uuid);
                                        }
                                    },
                                },
                                {
                                    titleKey: 'g.delete',
                                    icon: 'mdi-delete',
                                    callback: (uuid: string) => {
                                        this.showConfirmArticlesDialog(
                                            MenuOperations.delete,
                                            uuid,
                                            this.$t(
                                                'common.post_card.deleteDraftConfirmTitle',
                                            ),
                                            this.$t(
                                                'common.post_card.deleteDraftConfirmSubtitle',
                                            ),
                                        );
                                    },
                                },
                            ],
                        } as IstdMenuList<string>,
                        // #endregion
                    },
                    {
                        key: 'posts',
                        titleKey: 'common.post_card.postFolder',
                        title: this.$t('common.post_card.postFolder'),
                        icon: 'mdi-text-box-multiple-outline',
                        items: [] as IbriefIteratorListItem[], // get the post folder
                        itemsLength: 0,
                        cb: (params: IstdDataTableUpdateParams) => {
                            return this.fetch_user_posts_data(params);
                        },
                        limitation:
                            maxBlogCountDict[
                                this.user_priority.toString() || '5'
                            ],
                        limitationTextKey:
                            'common.post_card.postBlogLimitation',
                    },
                    {
                        titleKey: 'common.post_card.starFolder',
                        title: this.$t('common.post_card.starFolder'),
                        key: 'stars',
                        icon: 'mdi-star-outline',
                        items: [] as IbriefIteratorListItem[], // get the star folder
                        itemsLength: 0,
                        cb: (params: IstdDataTableUpdateParams) => [],
                    },
                ] as briefPostCardTab[],
            },
            // #endregion
        };
    },
    methods: {
        // #region ui callbacks
        showErrorAlert(message: string) {
            showFloatingAlert(this.$refs.floatingAlert as any, false, message);
        },
        PublishSuccessCb(uuid: string) {
            // after the article is published, refresh the draft.items
            const drafts_item = this.post_card.tabs.find(
                (item) => item.key === 'draft',
            )?.items;
            if (drafts_item) {
                const index = drafts_item.findIndex(
                    /// TODO : make a better way to identify the item to be removed
                    (item) => item.call_back_params === uuid,
                );
                if (index >= 0) {
                    drafts_item.splice(index, 1); // remove the item from the list
                }
            }
        },
        // this include draft, history, post
        showConfirmArticlesDialog(
            operation: MenuOperations,
            uuid: string,
            title: string = '',
            subtitle: string = '',
        ) {
            const confirm_dialog_ref = this.$refs.confirmDialogArticles;
            this.confirmDialogAriticles.title = title;
            this.confirmDialogAriticles.subtitle = subtitle;
            this.confirmDialogAriticles.operation = operation;
            this.confirmDialogAriticles.uuid = uuid;
            showConfirmDialog(confirm_dialog_ref);
        },
        handleConfirmArticles() {
            const operation = this.confirmDialogAriticles.operation; // get the current operation
            const uuid = this.confirmDialogAriticles.uuid;
            switch (operation) {
                // only handle delete operation for now
                case MenuOperations.delete:
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
        async fetch_draft_data(params: {
            pageNum;
            itemsPerPage;
        }): Promise<void> {
            const idx = this.post_card.tabs
                .map((item) => item.key)
                .indexOf('draft');
            try {
                const response = await DraftsApi.getUserDraftList(params);
                const tableData = response.tableData as IresDraftBrief[];
                const tag_keys_arr = tableData.map((item) => item.tags).flat();
                await cache.dispatch('updateInterestByKeys', tag_keys_arr);
                const tags_all: InterestTag[] = cache.state.interest_tag_cache;
                // this.refreshTagCache(tag_keys_arr);
                this.post_card.tabs[idx].items = tableData.map(
                    (item: IresDraftBrief) =>
                        ({
                            title: item.title,
                            tags: item.tags.map((tag) =>
                                tags_all.find((t) => t.key === tag),
                            ),
                            link: `/drafts/edit/${item.uuid}`,
                            datetime: item.last_save_time,
                            datetime_info_icon: 'mdi-clock-outline',
                            call_back_params: item.uuid,
                        }) as IbriefIteratorListItem,
                );
                // update the length of the items
                this.post_card.tabs[idx].itemsLength = response.count;
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        },
        /**
         * Description This method just fetch the history list (all at once),
         * but not fetch the article data
         * @returns {any}
         */
        async fetch_history_list() {
            try {
                const response = await HistoryApi.getHistoryRecords();
                const records = response.records as HistoryRecord[];
                this.history_list = records;
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        },
        /**
         * Description fetch the article data call back function
         * @param {any} params:{pageNum;itemsPerPage;}
         * @returns {any}
         */
        async fetch_history_data(params: {
            pageNum;
            itemsPerPage;
        }): Promise<void> {
            // failed to fetch history list, return
            if (!this.history_list) {
                return;
            }
            const idx = this.post_card.tabs
                .map((item) => item.key)
                .indexOf('history');
            const start = (params.pageNum - 1) * params.itemsPerPage;
            const end = start + params.itemsPerPage;

            const history_to_show = this.history_list
                .slice(start, end)
                .filter((item) => item.type === 'blog');

            if (history_to_show.length === 0) {
                return; // no data to show
            }
            try {
                // get the blogs data from the history list
                const uuids = history_to_show.map((item) => item.uuid);
                const disp_data =
                    await BlogServices.getBlogDisplayDataByUUID(uuids);
                this.post_card.tabs[idx].items = disp_data.map(
                    (item: IblogDisplayData) =>
                        ({
                            title: item.title,
                            tags: item.tags,
                            link: `/blogs/${item.uuid}`,
                            datetime: history_to_show.find(
                                (h) => h.uuid === item.uuid,
                            )?.time,
                            datetime_info_icon: 'mdi-eye',
                            author_avatar: item.authorAvatar,
                            author_name: item.authorName,
                        }) as IbriefIteratorListItem,
                );
                this.post_card.tabs[idx].itemsLength = this.history_list.length;
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        },

        /**
         * Description fetch the user posts data call back function
         * @param {any} params:{pageNum;itemsPerPage;}
         * @returns {any}
         */
        async fetch_user_posts_data(params: {
            pageNum;
            itemsPerPage;
        }): Promise<void> {
            const idx = this.post_card.tabs.findIndex(
                (item) => item.key === 'posts',
            );
            try {
                const req = makeStdDataTableRequestParams(params);
                const response = await BlogsApi.getUserBlogList(req);

                const data = response.tableData as IresBlogBrief[];

                const disp_data =
                    await BlogServices.convertBlogToDisplayData(data);
                this.post_card.tabs[idx].items = disp_data.map(
                    (item: IblogDisplayData) => {
                        const status = data.find(
                            (d) => d.uuid === item.uuid,
                        )?.status;
                        return {
                            title: item.title,
                            tags: item.tags,
                            link:
                                status == 2
                                    ? `/blogs/${item.uuid}`
                                    : status == 1
                                      ? `#` // 1 : reviewing status, no link
                                      : `/blogs/revision/${item.uuid}`,
                            datetime: item.lastModifyTime,
                            status: status,
                        } as IbriefIteratorListItem;
                    },
                );
                this.post_card.tabs[idx].itemsLength = response.count;
                // this.post
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        },
        // #endregion

        async delete_draft(uuid: string) {
            try {
                const response = await DraftsApi.deleteUserDraft(uuid);
                const message = response.data;
                const drafts_item = this.post_card.tabs.find(
                    (item) => item.key === 'draft',
                )?.items;
                if (drafts_item) {
                    const index = drafts_item.findIndex(
                        (item) => item.call_back_params === uuid,
                    );
                    if (index >= 0) {
                        drafts_item.splice(index, 1); // remove the item from the list
                    }
                }
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    true,
                    message,
                );
            } catch (error: any) {
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    false,
                    error.message,
                );
            }
        },
        handleResize() {
            const card: any = this.$refs.card;
            if (card) {
                const cardWidth = card.$el.getBoundingClientRect().width;
                this.small_width_layout = cardWidth < 300;
            }
        },
    },
    mounted() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        (async () => {
            await this.fetch_history_list();
            for (let item of this.post_card.tabs) {
                const params = {
                    pageNum: 1,
                    itemsPerPage: 5,
                };
                if (item.cb) {
                    await item.cb(params); // update the data for the tab
                }
            }
        })();
    },
    watch: {
        tab_idx: {
            handler(new_val) {
                // update thedata
            },
        },
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
});
