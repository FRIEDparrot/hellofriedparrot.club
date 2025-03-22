import { defineComponent, ref } from 'vue';
import { ElAutocomplete } from 'element-plus';
import { IstdDataTableHeader } from '@/interface/tables/stdDataTable';
import InterestTagApi from '@/api/interest_tags/interest_tags_api';
import InterestTag from '@/interface/classes/interestTag_cls';
import cache from '@/store/cache';

export default defineComponent({
    name: 'tagChooseOverlay',
    emits: ['confirm', 'cancel'],
    components: {
        ElAutocomplete,
    },
    props: {
        showTagContainer: {
            type: Boolean,
            default: true,
        },
        maxTagCount: {
            type: Number,
            default: 99999,
        },
        allowRepeatTags: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            snackbar: false,
            snackbarText: '',
            showTagOverlay: false,
            showResetBtn: false,
            currentContainerTags: [] as InterestTag[],
            tagTable: {
                headers: [
                    {
                        titleKey: 'common.tag_overlay.key',
                        key: 'key',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        titleKey: 'common.tag_overlay.en',
                        key: 'en',
                        align: 'center',
                        sortable: true,
                        searchable: true,
                    },
                    {
                        titleKey: 'common.tag_overlay.zh',
                        key: 'zh',
                        align: 'center',
                        sortable: true,
                        searchable: true,
                    },
                    {
                        titleKey: 'common.tag_overlay.operation',
                        key: 'operation',
                        align: 'center',
                        sortable: false,
                        searchable: false,
                    },
                ] as IstdDataTableHeader[],
                itemsPerPage: 5,
                items: [] as InterestTag[], // initialize the items of the table
                loading: false,
            },
            activekey: null as string | null,
            SearchInputs: {}, // automatically initialize the Search Inputs
            SearchCallbacks: {
                key: this.queryCurrentTag,
            },
            tagTableArrs: {},
        };
    },
    computed: {
        translatedTagTableHeaders(): any[] {
            return this.tagTable.headers.map((header) => {
                return {
                    ...header,
                    title: this.$t(header.titleKey), // translate the title of the header
                    align: header.align as 'left' | 'center' | 'right',
                    sortable: header.sortable ?? false,
                    searchable: header.searchable ?? false,
                };
            });
        },
        translatedContainerTags(): any[] {
            const locale = this.$i18n.locale;
            return this.currentContainerTags.map((tag) => {
                const title = tag[locale] || tag.en || tag.key;
                return {
                    ...(tag as InterestTag), // not retain any other
                    title: title,
                };
            });
        },
    },
    methods: {
        /**
         * Description If use `currentContainerTags`,
         *      also set peoperty `showTagContainer`
         * @param {any} currentContainerTags:string[]=[]
         * @returns {any}
         */
        show(currentContainerTags: InterestTag[] = []): void {
            this.showTagOverlay = true;
            // use slice to create a new array, to avoid the reference of the original array
            this.currentContainerTags = currentContainerTags.slice(
                0,
            ) as InterestTag[];
            this.fetchTagsListAll();
            this.SearchInputs = {}; // reset the Search Inputs
        },
        removeTag(item: InterestTag) {
            const index = this.currentContainerTags
                .map((tag) => tag.key)
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
        queryTag(queryString: any, cb: any, key: string): void {
            if (queryString != '' || queryString != null) {
                const results = this.filterTagCallback(
                    this.tagTableArrs[key],
                    queryString,
                );
                cb(
                    results.map((item: any) => {
                        return { value: item };
                    }),
                );
            } else {
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
        filterTagCallback(resArr: string[], queryString: any) {
            /** select all the result out first */
            let results = resArr
                .map((item: any) => ({
                    item,
                    prefixMatchCount: item
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()),
                }))
                .filter(
                    ({ item, prefixMatchCount }) =>
                        item.toLowerCase().includes(queryString.toLowerCase()),
                    /** use 'indexOf' to match the beginning */
                )
                .sort((a, b) => a.prefixMatchCount - b.prefixMatchCount)
                .map(({ item }) => item);
            return results;
        },
        async searchTagResult() {
            try {
                const response: any = await InterestTagApi.getTagList({
                    start: 0,
                    cnt: -1,
                    filters: {
                        key: (this.SearchInputs as any).key ?? '',
                        en: (this.SearchInputs as any).en ?? '',
                        zh: (this.SearchInputs as any).zh ?? '',
                    },
                });
                this.tagTable.items = response.tableData ?? [];
                this.refreshTagTableArr();
                this.showResetBtn = true;
            } catch (error: any) {
                // show the item on the snackbar
                this.snackbarText = this.$t('g.error') + ' : ' + error.message;
                this.snackbar = true;
            }
        },

        /**
         * Description load items to TagTable, and also load TagTableArrs for each header
         * @returns {any}
         */
        async fetchTagsListAll() {
            try {
                const response: any = await InterestTagApi.getTagList({
                    start: 1,
                    cnt: -1,
                    filters: {},
                });
                this.tagTable.items = response.tableData ?? [];
                this.refreshTagTableArr();
                this.showResetBtn = false;
            } catch (error: any) {
                this.snackbarText = this.$t('g.error') + ' : ' + error.message;
                this.snackbar = true;
            }
        },
        refreshTagTableArr() {
            for (let idx = 0; idx < this.tagTable.headers.length - 1; idx++) {
                const key = this.tagTable.headers[idx].key;
                this.tagTableArrs[key] = this.tagTable.items.map(
                    (item) => item[key] ?? '',
                );
            }
        },
        /**
         * Event handler for the add new tag event
         * @param item
         */
        addNewTag(item: InterestTag) {
            if (!this.allowRepeatTags) {
                // check if there is already the same tag in the container
                const idx = this.currentContainerTags
                    .map((tag) => tag.key)
                    .indexOf(item.key);
                if (idx !== -1) {
                    this.snackbarText = this.$t(
                        'common.tag_overlay.repeat_tag_error',
                    );
                    this.snackbar = true; // show the item on the snackbar
                    return;
                }
            }
            if (this.currentContainerTags.length >= this.maxTagCount) {
                this.snackbarText = this.$t(
                    'common.tag_overlay.max_tag_count_error',
                    { count: this.maxTagCount },
                );
                this.snackbar = true;
                return;
            }
            this.currentContainerTags.push(item as InterestTag);
        },
        confirmTagSelection() {
            // update tag cache data
            cache
                .dispatch(
                    'updateInterestByKeys',
                    this.currentContainerTags.map((tag) => tag.key),
                )
                .catch((error) => {
                    this.snackbarText =
                        this.$t('g.error') + ' : ' + error.message;
                    this.snackbar = true;
                });
            this.showTagOverlay = false; // close the overlay after adding the new tag
            this.$emit(
                'confirm',
                this.currentContainerTags.slice(0) as InterestTag[],
            ); // emit the selected tags
        },
        close() {
            this.$emit('cancel'); // emit the cancel event
            this.showTagOverlay = false; // hide the overlay after adding the new tag
        },
    },
    mounted() {
        /* fetch all the tags to tagTableArrs */
        this.fetchTagsListAll();
    },
});
