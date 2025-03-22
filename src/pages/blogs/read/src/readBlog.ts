import { defineComponent, nextTick } from 'vue';
import navbar_welcome from '@/components/nav/navbar_welcome.vue';
import leftSidebarBtnContent from '@/components/sidebar/leftSidebarBtnContent.vue';
import rightSidebarProfile from '@/components/sidebar/rightSidebarProfile.vue';
import markdownOutline from '@/components/markdown/markdownOutline.vue';
import { IblogDispContentData } from '@/interface/display/blogDisplayData';
import { useRoute } from 'vue-router';
import BlogsApi from '@/api/blogs/blogs_api';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import {
    renderMarkdownContent,
    getMarkdownHeadersByHTML,
} from '@/utils/markdown/MarkdownUtils';
import MarkdownHeader from '@/interface/classes/markdownHeader_cls';
import mdCodeFoldHooks from '@/hooks/markdown/md_code_folding';
import userInfoCardBrief from '@/components/user/userInfoCardBrief.vue';
import BlogServices from '@/services/blogs/blog_services';
import InterestTag from '@/interface/classes/interestTag_cls';
import { UTCToLocalTimeString, UTCToLocalTime } from '@/utils/date/time_zone';
import { IuserBriefInformation } from '@/components/user/src/userInfoCardBrief';
import AccountsApi, { IresAccountProfile } from '@/api/accounts/accounts_api';
import HistoryApi, { IreqAddHistoryRecord } from '@/api/history/history_api';
import footerbar_common from '@/components/footer/footerbar_common.vue';
import comment_isso from '@/components/comments/comment_isso.vue';
import cache from '@/store/cache';
import store from '@/store';

export default defineComponent({
    name: 'ReadBog',
    setup() {
        const route = useRoute();
        const uuid = route.params.uuid as string;
        return {
            uuid,
        };
    },
    components: {
        navbar_welcome,
        leftSidebarBtnContent,
        rightSidebarProfile,
        markdownOutline,
        floatingAlert,
        userInfoCardBrief,
        footerbar_common,
        comment_isso,
    },
    props: {
        isReview: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            user: store.state.user,
            authorProfile: {} as IresAccountProfile,
            authorInterestTags: [] as InterestTag[],
            authorInfo: {} as IuserBriefInformation,
            blogData: {} as IblogDispContentData,
            blogContent: '',
            blogHeadings: [] as MarkdownHeader[],
            copybtn: {
                disabled: false,
                icon: 'mdi-content-copy',
            },
            featurebtn: {
                disabled: false,
            },
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
        async copyLink() {
            try {
                await navigator.clipboard.writeText(window.location.href);
                this.copybtn.icon = 'mdi-check';
                this.copybtn.disabled = true;
                setTimeout(() => {
                    this.copybtn.icon = 'mdi-content-copy';
                    this.copybtn.disabled = false;
                }, 1500);
                showFloatingAlert(
                    this.$refs.floatingAlert as InstanceType<
                        typeof floatingAlert
                    >,
                    true,
                    this.$t('blog.copyLinkSuccess'),
                );
            } catch (err) {
                // Optionally, handle the error or show a notification to the user
                alert('Failed to copy link. Please try again.');
            }
        },
        async featureArticle(featured: boolean) {
            this.featurebtn.disabled = true;
            try {
                await BlogsApi.setBlogFeatured(this.blogData.uuid, featured);
                this.blogData.featured = featured;
                showFloatingAlert(
                    this.$refs.floatingAlert as InstanceType<
                        typeof floatingAlert
                    >,
                    true,
                    featured
                        ? this.$t('blog.featureArticleSuccess')
                        : this.$t('blog.unfeatureArticleSuccess'),
                );
            } catch (error: any) {
                this.showErrorAlert(error.message);
            } finally {
                this.featurebtn.disabled = false;
            }
        },
        getPreciseTimeStr(date: Date) {
            return UTCToLocalTimeString(date);
        },
        showErrorAlert(msg: string) {
            showFloatingAlert(
                this.$refs.floatingAlert as InstanceType<typeof floatingAlert>,
                false,
                msg,
            );
        },
        /**
         * Description load_author_info function.
         * @param {any} author_id:string
         * @returns {any}
         */
        async load_author_profile(author_id: number) {
            try {
                if (author_id === undefined) {
                    throw new Error(this.$t('blog.error.noAuthorInfo')); // Unable to get Author Info
                }
                const profile = await AccountsApi.getAccountProfile(author_id);
                this.authorProfile = profile;
                const profile_card_info: IuserBriefInformation = {
                    name: profile.name,
                    avatar: profile.avatar,
                    bio: profile.bio,
                    follows: profile.following_num,
                    followers: profile.followers_num,
                    blogsNum: profile.blogs_num,
                };
                this.authorInfo = profile_card_info;

                const tag_key_list = profile.interest_tags;
                await cache.dispatch('updateInterestByKeys', tag_key_list);
                const cached_tags =
                    cache.getters.getInterestTagByKeyList(tag_key_list);
                this.authorInterestTags = cached_tags;
                return Promise.resolve(null);
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        async load_blog_data(uuid: string) {
            try {
                const response = this.isReview
                    ? await BlogsApi.getBlogReviewContent(uuid)
                    : await BlogsApi.getBlogContent(uuid);

                const blog_data: IblogDispContentData =
                    await BlogServices.getBlogContentDispData(response);
                this.blogData = blog_data;
                this.blogContent = renderMarkdownContent(this.blogData.content);
                this.blogHeadings = getMarkdownHeadersByHTML(this.blogContent);
                return Promise.resolve(null);
            } catch (error: any) {
                return Promise.reject(error);
            }
        },
        toggleLeftSidebar() {
            const left_sidebar = this.$refs.left_sidebar as InstanceType<
                typeof leftSidebarBtnContent
            >;
            left_sidebar.toggle();
        },
        toggleRightSidebar() {
            const right_sidebar = this.$refs.right_sidebar as InstanceType<
                typeof rightSidebarProfile
            >;
            right_sidebar.toggle();
        },
    },
    mounted() {
        (async () => {
            try {
                try {
                    await this.load_blog_data(this.uuid);
                    nextTick(() => {
                        mdCodeFoldHooks.addCodeFoldingHook(); // add code folding hook after rendering the content
                    });
                } catch (error: any) {
                    throw new Error(
                        this.$t('blog.error.loadBlogData') +
                            ' : ' +
                            error.message,
                    );
                }
                const author_id = this.blogData.authorId;
                const blog_uuid = this.blogData.uuid;
                // load the author profile and interest tags
                try {
                    await this.load_author_profile(author_id);
                } catch (error: any) {
                    throw new Error(
                        this.$t('blog.error.loadAuthorProfile') +
                            ' : ' +
                            error.message,
                    );
                }
                // add the history record if the user is logged in
                if (store.state.authorized) {
                    const req: IreqAddHistoryRecord = {
                        type: 'blog',
                        uuid: blog_uuid,
                        progress: 0, // set as not read
                    };
                    try {
                        await HistoryApi.addHistoryRecord(req);
                    } catch (error: any) {
                        throw new Error(
                            this.$t('blog.error.addHistoryRecord') +
                                ' : ' +
                                error.message,
                        );
                    }
                }
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        })();
    },
    beforeUnmount() {
        mdCodeFoldHooks.removeCodeFoldingHook();
    },
});
