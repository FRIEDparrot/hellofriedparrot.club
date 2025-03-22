import { defineComponent, nextTick, PropType } from 'vue';
import { IstdDataTableUpdateParams } from '@/interface/tables/stdDataTableServer';
import i18n from '@/locales/lang';
import InterestTag from '@/interface/classes/interestTag_cls';
import { IstdMenuItem, IstdMenuList } from '@/interface/iterators/stdMenuList';
import defaultAvatar from '@/assets/imgs/ui/defaultAvatar.vue';
import {
    GetLocalTimeDeltaStrBrief,
    UTCToLocalTimeString,
} from '@/utils/date/time_zone';
import { ElInput, ElTag, ElButton } from 'element-plus';
import 'element-plus/theme-chalk/dark/css-vars.css';

/**
 * If it use callback function, it must specify a param type for the callback function.
 */
export interface IbriefIteratorListItem {
    title: string;
    abstract?: string;
    tags?: InterestTag[];
    call_back_params?: any /* used for nested menus item to pass,
                        callback parameters when click item */;
    /** brief data iterator only support 1 time display */
    datetime?: Date;
    datetime_info_icon?: string;
    datetime_info_text?: string;
    author_avatar?: string; // avatar url to show author's profile
    author_name?: string; // author's name to show in the item
    link?: string; // link to the article or blog post
    status?: number; // status of blog (rejected, reviewing)
    expandable?: boolean; // whether the item can be expanded or not (for nested items)
    child?: IbriefIteratorListItem[]; // child items of the current item
    meta?: any; // meta data for the item, can be any type of data
}

export default defineComponent({
    name: 'BriefIteratorList',
    components: {
        ElInput,
        ElButton,
        ElTag,
        defaultAvatar,
    },
    props: {
        isVisible: {
            type: Boolean,
            default: true,
        },
        autoHideDate: {
            type: Boolean,
            default: true,
        },
        maxTagsDisplay: {
            type: Number,
            default: 3,
        },
        items: {
            type: Array<IbriefIteratorListItem>,
            required: true,
        },
        // total items length, used for pagination
        itemsLength: {
            type: Number,
            required: true,
        },
        showExtraMenuBtn: { type: Boolean, default: false },
        extraMenuBtnItem: {
            type: Array<IstdMenuItem>,
            default: [] as IstdMenuItem[],
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
        // when itemsPerPageMax > itemsPerPage, can switche to this page size
        itemsPerPageMax: {
            type: Number,
            default: 10,
        },
        useTranslation: {
            type: Boolean,
            default: true,
        },
        noDataText: {
            type: String,
            default: (i18n.global as any).t(
                'common.briefDataIterator.noDataText',
            ),
        },
        showLimitationInfo: {
            type: Boolean,
            default: false,
        },
        limitationTextKey: {
            type: String,
            default: '',
        },
        limitationText: {
            type: String,
            default: 'limit:',
        },
        limitationNum: {
            type: Number,
            default: 20,
        },
        menus: {
            type: Object as PropType<IstdMenuList>,
            default: { items: [] } as IstdMenuList,
        },
        minShowDateWidth: {
            type: Number,
            default: 350,
        },
    },
    data() {
        return {
            showDate: true,
            current_page: 1,
            jumpingPage: false,
            jumpPageText: '',
            useMaxPageSize: false,
        };
    },
    emits: ['fetchData'],
    computed: {
        pageCount() {
            const cnt = Math.ceil(
                this.itemsLength /
                    (this.useMaxPageSize
                        ? this.itemsPerPageMax
                        : this.itemsPerPage),
            );
            if (this.current_page > cnt) {
                this.current_page = cnt;
            }
            return cnt;
        },
    },
    watch: {
        isVisible: {
            handler(newVal: boolean) {
                if (newVal) {
                    // update the visibility of date column after next tick
                    nextTick(() => {
                        this.updateDateVisibility();
                    });
                }
            },
            immediate: true,
        },
        current_page: {
            handler(val: number) {
                this.update(); // update data when current page changed
            },
        },
    },
    methods: {
        updateDateVisibility() {
            const list: any = this.$refs.list;
            // TODO: check all $refs, and avoid not found error
            if (list) {
                if (this.autoHideDate) {
                    const list_width = list.$el.getBoundingClientRect().width;
                    this.showDate =
                        list_width < this.minShowDateWidth ? false : true;
                } else {
                    this.showDate = true;
                }
            }
        },
        handleChiplick(event: Event) {
            const target = event.target as HTMLDivElement;
            // for `brief-iterator-item-tags` allow click event
            if (
                target != undefined &&
                !target.classList.contains('brief-iterator-item-tags')
            ) {
                event.stopPropagation(); // not allow event trigger parent component
            }
        },
        handleMenuToggleBtnClick(event: Event) {
            event.stopPropagation();
            event.preventDefault();
        },
        toggleMaxPageSize() {
            this.useMaxPageSize = !this.useMaxPageSize;
            this.update();
        },
        getTimeString(time: Date) {
            if (!time) {
                return '';
            }
            if (
                // test if time is longer than 7 days
                new Date(time).getTime() <
                Date.now() - 7 * 24 * 60 * 60 * 1000
            ) {
                return UTCToLocalTimeString(time, 'YYYY-MM-DD');
            }
            return GetLocalTimeDeltaStrBrief(time);
        },
        /**
         * Description When menu.callback is defined, call it with the list_item.call_back_params or list_item
         * @param {any} menu:IstdMenuItem
         * @param {any} list_item:IbriefIteratorListItem
         * @returns {any}
         */
        handleMenuItemClick(
            menu: IstdMenuItem,
            list_item: IbriefIteratorListItem,
        ) {
            if (menu.callback) {
                menu.callback(list_item.call_back_params ?? list_item);
            }
        },
        getTagTranslation(tag: InterestTag): string {
            const lang = this.$i18n.locale;
            return tag[lang] ?? tag.en ?? tag.key;
        },
        fetchData(params: IstdDataTableUpdateParams) {
            this.$emit('fetchData', params);
        },
        update() {
            const params: IstdDataTableUpdateParams = {
                pageNum: this.current_page,
                itemsPerPage: this.useMaxPageSize
                    ? this.itemsPerPageMax
                    : this.itemsPerPage,
            };
            this.fetchData(params);
        },
        async jumpToPage() {
            try {
                await this.update();
                const pageNum = Math.floor(Number(this.jumpPageText));
                if (isNaN(pageNum)) return;
                const maxPageNum = this.useMaxPageSize
                    ? Math.ceil(this.itemsLength / this.itemsPerPageMax)
                    : Math.ceil(this.itemsLength / this.itemsPerPage);
                this.current_page = Math.min(Math.max(pageNum, 1), maxPageNum);
                this.jumpPageText = this.current_page.toString();
            } catch (error: any) {
                console.error(error);
            }
        },
    },
    mounted() {
        /** if update on mounted, call this function to update the data */
        // this.update();
        this.updateDateVisibility();
        window.addEventListener('resize', this.updateDateVisibility);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateDateVisibility);
    },
});
