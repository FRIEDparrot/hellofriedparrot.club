import InterestTag from '@/interface/classes/interestTag_cls';
import BlogsApi from '@/api/blogs/blogs_api';
import BlogServices from '@/services/blogs/blog_services';
import { defineComponent, PropType } from 'vue';
import detailedIteratorList, {
    IdetailedDataIteratorItem,
} from '@/components/lists/detailedIteratorList.vue';
import IblogDisplayData from '@/interface/display/blogDisplayData';
import {
    IstdDataTableUpdateParams,
    makeStdDataTableRequestParams,
    IstdDataTableRequestParams,
} from '@/interface/tables/stdDataTableServer';
import defaultAvatar from '@imgs/ui/defaultAvatar.vue';
import {
    GetLocalTimeDeltaStrBrief,
    UTCToLocalTimeString,
} from '@/utils/date/time_zone';
import gsap from 'gsap';
import blog_featured_banner from '@/assets/imgs/ui/blog_featured_banner.vue';

const userInfoRightOffset = 30;
const userInfoTransitionDuration = 0.8;

/**
    For Ui folder, it provide the UI components for the web page.
        it may  use components element for create different UI elements.
*/
export default defineComponent({
    name: 'BlogIteratorMain',
    components: {
        detailedIteratorList,
        defaultAvatar,
        blog_featured_banner,
    },
    props: {
        itemsPerPage: {
            type: Number as PropType<number>,
            default: 5,
        },
        orderBy: {
            type: String,
            default: 'last_modify_time',
        },
        order: {
            type: String as PropType<'asc' | 'desc'>,
            default: 'desc',
        },
        searchKey: {
            type: String,
            default: null,
        },
        search: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            items: [] as IblogDisplayData[],
            count: 0, // total number of blogs (note we only)
            current_page: 1, // current page number
        };
    },
    computed: {
        getTagTranslation() {
            const lang = this.$i18n.locale;
            return (tag: InterestTag) => {
                return tag[lang] ?? tag.en ?? '';
            };
        },
    },
    methods: {
        redirectTo(event: MouseEvent, url: string) {
            if (event.ctrlKey) {
                window.open(url, '_blank');
            } else {
                this.$router.push(url);
            }
        },
        formatedTimeDeltaDisplay(time: Date) {
            time = new Date(time);
            const timeDelta = (time.getTime() - Date.now()) / 1000;
            if (Math.abs(timeDelta) < 604800) {
                return GetLocalTimeDeltaStrBrief(time);
            } else {
                return UTCToLocalTimeString(time, 'YYYY-MM-DD');
            }
        },
        formatedPublishTimeDispay(time: Date) {
            return UTCToLocalTimeString(time, 'YYYY-MM-DD');
        },
        /* called  outside  of component to get data*/
        async updateBlogData() {
            const params: IstdDataTableUpdateParams = {
                pageNum: this.current_page,
                itemsPerPage: this.itemsPerPage,
                orderBy: this.orderBy,
                order: this.order,
                searchKey: this.searchKey,
                search: this.search,
            };
            const req_params = makeStdDataTableRequestParams(params);
            try {
                const response =
                    await BlogServices.getBlogDisplayDataListInfo(req_params);
                this.items = response.data;
                this.count = response.count;
            } catch (error) {
                console.error(error);
            }
        },

        // #region User infomaation animation
        // dynamic effect for the iterator-user-info-container part to move
        handlerItemMouseEnter(event: any) {
            const target = event.currentTarget;
            if (target.classList.contains('iterator-user-info-container')) {
                return;
            }
            const user_info = target.querySelector(
                '.iterator-user-info-container',
            );
            gsap.effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: -user_info.offsetWidth + userInfoRightOffset,
            });
        },
        handlerItemMouseLeave(event: any) {
            const target = event.currentTarget;
            if (target.classList.contains('iterator-user-info-container')) {
                return;
            }
            const user_info = target.querySelector(
                '.iterator-user-info-container',
            );
            gsap.effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: 0,
            });
        },
        handlerUserInfoMouseEnter(event: any) {
            const user_info = event.currentTarget;

            gsap.effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: 0,
            });
        },
        handlerUserInfoMouseLeave(event: any) {
            const user_info = event.currentTarget;
            const width = user_info.offsetWidth;
            gsap.effects.move_to_right(user_info, {
                duration: userInfoTransitionDuration,
                right: -width + userInfoRightOffset,
            });
        },
        // #endregion
    },
    watch: {
        current_page: {
            handler(newPage) {
                this.updateBlogData();
            },
        },
        items: {
            handler(newItems) {},
        },
    },
    mounted() {
        this.updateBlogData();
    },
});
