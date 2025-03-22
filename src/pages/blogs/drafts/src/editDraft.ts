import { defineComponent, ref } from 'vue';
import newBlogPage from '@/pages/blogs/common/newBlogPage.vue';
import DraftsApi from '@/api/drafts/drafts_api';
import { IresDraftContent } from '@/interface/requests/blog_req';
import { useRoute } from 'vue-router';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import cache from '@/store/cache';

export default defineComponent({
    name: 'EditDraftPage',
    components: {
        floatingAlert,
        newBlogPage,
    },
    setup() {
        const route = useRoute();
        const uuid = route.params.uuid as string;
        return {
            uuid,
        };
    },
    data() {
        return {};
    },
    methods: {
        async fetchDraftContent(uuid) {
            try {
                const response = (await DraftsApi.getUserDraftContent(
                    uuid,
                )) as IresDraftContent;
                const tags_key_list = response.tags;
                // update interest tag cache here
                await cache.dispatch('updateInterestByKeys', tags_key_list);
                return Promise.resolve(response);
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
    mounted() {
        const blogPage = this.$refs.blogPage as InstanceType<
            typeof newBlogPage
        >;
        this.fetchDraftContent(this.uuid)
            .then((r) => {
                const tags = cache.getters.getInterestTagByKeyList(r.tags);
                blogPage.load_draft_content(
                    r.title,
                    r.content,
                    tags,
                    r.uuid,
                    r.theme,
                );
            })
            .catch((error) => {
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    false,
                    error.message,
                );
            });
    },
});
