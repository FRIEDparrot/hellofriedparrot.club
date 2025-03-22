import { defineComponent } from 'vue';
import {
    ElInput,
    ElButton,
    ElTooltip,
    ElIcon,
    ElCard,
    ElSelect,
} from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { sanitizeImageUrl } from '@/utils/url/secureImgUrl';
import detailedIteratorList from '@/components/lists/detailedIteratorList.vue';
import InterestTag from '@/interface/classes/interestTag_cls';
import tagChooseOverlay from '@/components/overlays/tag_choose_overlay.vue';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import DraftsApi, { IreqPostBlogDraft } from '@/api/drafts/drafts_api';

import { IresDraftContent } from '@/interface/requests/blog_req';

import {
    IstdDataTableUpdateParams,
    IstdDataTableResponse,
} from '@/interface/tables/stdDataTableServer';
import interestTagGroup from '@/components/chip_groups/interestTagGroup.vue';
import cache from '@/store/cache';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';

export default defineComponent({
    name: 'PostBlogOverlay',
    emits: ['publish-success'],
    components: {
        ElInput,
        ElButton,
        ElTooltip,
        ElIcon,
        ElCard,
        floatingAlert,
        ElSelect,
        InfoFilled,
        Plus,
        tagChooseOverlay,
        detailedIteratorList,
        interestTagGroup,
    },
    data() {
        return {
            disableCard: false /* only disable while publish loading */,
            draft_uuid: '',
            showOverlay: false,
            showTagChooseOverlay: false,
            // not retain uuid
            formData: {
                title: '',
                tags: [
                    {
                        key: '',
                        zh: '',
                        en: '',
                    },
                ] as InterestTag[],
                abstract: '',
                bannerUrl: '',
            },
        };
    },
    computed: {
        safeBannerUrl(): string {
            return sanitizeImageUrl(this.formData.bannerUrl);
        },
    },
    methods: {
        uploadBannerImage() {
            alert(
                this.$t('post_blog_overlay.errors.banner_upload_not_supported'),
            );
        },
        async load_post_data(uuid: string): Promise<void> {
            const params = {
                pageNum: 1,
                itemsPerPage: 1,
                searchKey: 'uuid',
                search: uuid,
            } as IstdDataTableUpdateParams;
            try {
                const response = (await DraftsApi.getUserDraftList(
                    params,
                )) as IstdDataTableResponse<IresDraftContent>;
                if (response.tableData.length == 0) {
                    throw new Error(
                        this.$t('post_blog_overlay.errors.draft_not_found'),
                    );
                }
                const draft = response.tableData[0];
                await cache.dispatch('updateInterestByKeys', draft.tags);
                const tags = cache.getters.getInterestTagByKeyList(draft.tags);
                this.formData.title = draft.title;
                this.formData.abstract = '';
                this.formData.tags = tags; // update tags
            } catch (error) {
                return Promise.reject(error);
            }
        },
        updateTags(tags: InterestTag[]) {
            this.formData.tags = tags;
        },
        show(uuid: string) {
            this.load_post_data(uuid)
                .then((response) => {
                    this.showOverlay = true;
                    this.draft_uuid = uuid;
                })
                .catch();
        },
        handleCancel() {
            this.showOverlay = false;
            this.resetForm();
        },
        async publishDraft() {
            this.disableCard = true;
            try {
                // fetch the blog content first
                const draft_data = await DraftsApi.getUserDraftContent(
                    this.draft_uuid,
                );
                const data: IreqPostBlogDraft = {
                    title: this.formData.title,
                    content: draft_data.content,
                    abstract: this.formData.abstract,
                    tag_keys: this.formData.tags.map((tag) => tag.key),
                    theme: draft_data.theme,
                    banner_url: this.safeBannerUrl,
                };
                await DraftsApi.publishBlogDraft(data, this.draft_uuid);
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    true,
                    this.$t('post_blog_overlay.publish_success_message'),
                );
                // emit event to parent component
                this.$emit('publish-success', this.draft_uuid);
                // close overlay after 2 seconds
                setTimeout(() => {
                    this.showOverlay = false;
                }, 2000);
            } catch (error: any) {
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    false,
                    error.message,
                );
            } finally {
                this.disableCard = false;
            }
        },
        resetForm() {
            this.formData = {
                title: '',
                abstract: '',
                tags: [] as InterestTag[],
                bannerUrl: '',
            };
        },
    },
});
