import { defineComponent } from 'vue';
import { IbriefIteratorListItem } from '@/components/lists/briefIteratorList.vue';
import { IstdMenuItem } from '@/interface/iterators/stdMenuList';

export interface IdetailedDataIteratorItem extends IbriefIteratorListItem {
    /* show more details such as comments, views, stars */
    banner_image?: string; // image url of the post
    views_num?: number;
    stars_num?: number;
    comments_num?: number;
    // groupMembers?: number[];  may create stacked effect of memeber avatars on UI
    publish_time?: Date;
    last_modify_time?: Date;
}

export default defineComponent({
    name: 'DetailedIteratorList',
    components: {},
    props: {
        items: {
            type: Array as () => IdetailedDataIteratorItem[],
            default: [],
        },
        itemsPerPage: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {};
    },
    methods: {},
    mounted() {},
});
