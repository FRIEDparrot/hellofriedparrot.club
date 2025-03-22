import store from '@/store';
import { defineComponent, ref } from 'vue';
import dynamicSearchBtn from '@/components/buttons/dynamicSearchBtn.vue';
import userInfoCardBrief from '@/components/user/userInfoCardBrief.vue';
import InterestTagPanel from '@/ui/panels/InterestTagPanel.vue';
import briefPostCard from '@/ui/cards/briefPostCard.vue';
import blog_iterator_main from '@/ui/blog_iterators/blog_iterator_main.vue';
import interest_tag_panel_simple from '@/ui/panels/interest_tag_panel_simple.vue';

export default defineComponent({
    name: 'MainView',
    components: {
        dynamicSearchBtn,
        briefPostCard,
        userInfoCardBrief,
        InterestTagPanel,
        blog_iterator_main,
        interest_tag_panel_simple,
    },
    data() {
        return {
            user: store.state.user,
        };
    },
    methods: {},
});
