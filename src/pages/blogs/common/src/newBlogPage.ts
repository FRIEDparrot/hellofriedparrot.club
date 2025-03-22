import { defineComponent, PropType, ref } from 'vue';
import {
    ElInput,
    ElButton,
    ElSelect,
    ElInputTag,
    ElIcon,
    ElOption,
} from 'element-plus';

import { Search } from '@element-plus/icons-vue';

import navibarSimple from '@/components/nav/navbar_simple.vue';
import rightSidebarProfile from '@/components/sidebar/rightSidebarProfile.vue';
import rightSidebarToggleBtn from '@/components/buttons/rightSidebarToggleBtn.vue';
import navUserAvatarPrompt from '@/components/user/navUserAvatarPrompt.vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import markdown_Outline from '@/components/markdown/src/markdownOutline';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import { renderMarkdownContent } from '@/utils/markdown/MarkdownUtils';
import gsap from 'gsap';
import InterestTagApi from '@/api/interest_tags/interest_tags_api';
import tagChooseOverlay from '@/components/overlays/tag_choose_overlay.vue';
import parrotLogoBtn from '@/components/buttons/parrotLogoBtn.vue';
import DraftsApi, { IreqSaveBlogDraft } from '@/api/drafts/drafts_api';
import InterestTag from '@/interface/classes/interestTag_cls';
import cache from '@/store/cache';
import postBlogOverlay from '@/components/overlays/postBlogOverlay.vue';
import mdCodeFoldHooks from '@/hooks/markdown/md_code_folding';

export default defineComponent({
    name: 'newBlogPage',
    components: {
        navibarSimple,
        rightSidebarProfile,
        rightSidebarToggleBtn,
        navUserAvatarPrompt,
        ElInput,
        ElButton,
        ElSelect,
        ElInputTag,
        ElIcon,
        ElOption,
        markdown_Outline,
        floatingAlert,
        Search,
        tagChooseOverlay,
        parrotLogoBtn,
        postBlogOverlay,
    },
    data() {
        return {
            previewTransisionActive: false,
            showPreview: true,
            title: '',
            content: '',
            theme: ref(''),
            tagIsLoading: false,
            article_uuid: null as string | null,
            articleTagsArr: [] as string[],
            /* this is a cache for tags  info, each time the user add a tag, store the info into it */
            // tagsInfoCache: [] as any[],
            codeCollapsedStates: new Map<
                number,
                { len: number; collapsed: boolean }
            >(),
        };
    },
    computed: {
        markdownContent() {
            return renderMarkdownContent(this.content, false);
        },
    },
    watch: {
        // restore the code block collapse state from cache
        markdownContent(newContent, oldContent) {
            this.$nextTick(() => {
                const codeBlocks = this.$el.querySelectorAll(
                    '.markdown-body pre > code:has(pre)',
                );
                if (!codeBlocks.length) {
                    return;
                }
                if (codeBlocks.length == this.codeCollapsedStates.size) {
                    codeBlocks.forEach((codeBlock, index) => {
                        const cachedState = this.codeCollapsedStates.get(index);
                        if (cachedState?.collapsed) {
                            codeBlock.classList.toggle('collapsed');
                        }
                    });
                } else {
                    const lengthArr = Array.from(
                        this.codeCollapsedStates.values(),
                    ).map((state) => state.len);
                    codeBlocks.forEach((codeBlock) => {
                        const len = codeBlock.innerText.length;
                        const idx = lengthArr.indexOf(len); // search the match length in cache
                        if (idx !== -1) {
                            const cachedState =
                                this.codeCollapsedStates.get(idx);
                            if (cachedState?.collapsed) {
                                codeBlock.classList.toggle('collapsed');
                            }
                        } // else not collapse
                    });
                }
            });
        },
    },
    methods: {
        /**
         * Description load outer draft content
         * @warning load tag cache before load the draft content, otherwise the tags will be empty
         * @param {any} title:string
         * @param {any} content:string
         * @param {any} InterestTags:InterestTag[]
         * @param {any} article_uuid:string
         * @param {any} theme:string
         * @returns {any}
         */
        load_draft_content(
            title: string,
            content: string,
            InterestTags: InterestTag[],
            article_uuid: string,
            theme: string,
        ) {
            this.title = title;
            this.content = content;
            this.article_uuid = article_uuid;
            this.theme = theme;
            this.articleTagsArr = InterestTags.map((item) => item.zh);
        },
        toggleRightSidebar() {
            const rightSidebar: any = this.$refs.rightSidebar;
            rightSidebar.toggle();
        },
        handlePublishSuccess() {
            window.setTimeout(() => {
                this.$router.push('/home');
            }, 1500);
        },
        /**
         * Description load current tags (InterestTag[]) from cache
         * @returns {any}
         */
        getCurrentTags(): InterestTag[] {
            const lang = this.$i18n.locale || 'en';
            const currentTags = cache.getters.getInterestTagByTransList(
                lang,
                this.articleTagsArr,
            );
            return currentTags;
        },
        showTagSelect() {
            const tagChooseOverlay: any = this.$refs.tagChooseOverlay;
            const tags = this.getCurrentTags();
            tagChooseOverlay.show(tags);
        },
        confirmNewTag(tags: InterestTag[]) {
            const lang_code = this.$i18n.locale || 'en';
            this.articleTagsArr = tags.map((item) => item[lang_code]);
            // no need  to filter tags,
        },
        showPostBlogOverlay() {
            this.saveAsDraft().then((response) => {
                const uuid = this.article_uuid;
                const postBlogOverlay = this.$refs.postBlogOverlay as PropType<
                    typeof postBlogOverlay
                >;
                postBlogOverlay.show(uuid);
            });
        },
        /**
         * Description Only used for tag input, check if the tag is repeated or not, and if it exists in database
         * @returns {any}
         */
        async filterTags() {
            this.tagIsLoading = true;
            const idx = this.articleTagsArr.length - 1;
            if (idx >= 0) {
                const tagName = this.articleTagsArr[idx];
                /** check if the tag is repeated */
                if (this.articleTagsArr.indexOf(tagName) !== idx) {
                    this.articleTagsArr.pop(); // remove the tag if it is repeated
                    showFloatingAlert(
                        this.$refs.floatingAlert as any,
                        false,
                        this.$t('blogs.create.tagRepeated'),
                    );
                    this.tagIsLoading = false;
                    return;
                } else {
                    /** check if the tag exists in database */
                    try {
                        const response: any =
                            await InterestTagApi.getTagByName(tagName);
                        cache.commit('addInterestTagsToCache', [
                            response,
                        ] as InterestTag[]);
                        // refresh InterestTag cache
                    } catch (error: any) {
                        showFloatingAlert(
                            this.$refs.floatingAlert as any,
                            false,
                            this.$t('blogs.create.addTagFailed') +
                                ' : ' +
                                error.message,
                        );
                        this.articleTagsArr.pop(); // remove the tag if it doesn't exist
                    } finally {
                        this.tagIsLoading = false;
                    }
                }
            }
        },
        showPreviewContent(show: boolean) {
            if (!this.previewTransisionActive) {
                this.previewTransisionActive = true;
                const previewContent: any = document.querySelector(
                    '.blog-content-preview-right',
                );
                // when screen width > 768px, use animation
                if (window.innerWidth > 768) {
                    /** in all cases, set the preview content to flex first */
                    previewContent.style.display = 'flex';
                    gsap.to('.blog-content-input-left', {
                        duration: 1.5,
                        minWidth: show ? '45%' : '100%',
                        ease: 'power2.inOut',
                    });
                    gsap.to(previewContent, {
                        duration: 1.5,
                        transform: show ? 'translateX(0%)' : 'translateX(50%)',
                        ease: show ? 'power2.inOut' : 'power2.in',
                    }).then(() => {
                        previewContent.style.display = show ? 'flex' : 'none';
                        this.showPreview = show;
                    });
                } else {
                    previewContent.style.display = show ? 'flex' : 'none';
                    this.showPreview = show;
                }
                this.previewTransisionActive = false;
            }
        },
        fixInputResizeWidth() {
            const writeContent: any = document.querySelector(
                '.blog-content-input-left',
            );
            const previewContent: any = document.querySelector(
                '.blog-content-preview-right',
            );
            previewContent.style.transform = 'translateX(0%)';
            if (window.innerWidth >= 768 && !this.showPreview) {
                writeContent.style.minWidth = '100%';
            } else if (window.innerWidth >= 768 && this.showPreview) {
                writeContent.style.minWidth = '45%';
            }
        },
        async saveAsDraft() {
            let succeed = false;
            let msg = '';
            const tags_tot = cache.getters.getInterestTag;
            const lang = this.$i18n.locale || 'en';
            const tags = tags_tot.filter(
                (item) =>
                    item[lang] && this.articleTagsArr.includes(item[lang]),
            ) as InterestTag[];
            const tag_keys = tags.map((item) => item.key);

            const req_data = {
                title: this.title,
                content: this.content,
                tag_keys: tag_keys,
                theme: 'default',
            } as IreqSaveBlogDraft;

            try {
                const response: any = await DraftsApi.saveBlogDraft(
                    req_data,
                    this.article_uuid,
                );
                this.article_uuid = response.uuid ?? null;
                msg = this.$t('blogs.create.saveSuccess');
                succeed = true;
            } catch (error: any) {
                msg = error.message || this.$t('blogs.create.saveFailed');
            } finally {
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    succeed,
                    msg,
                );
            }
        },
        handleUiInputKeyDown(event: any) {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                this.saveAsDraft(); // save the blog as a draft when Ctrl+S or Cmd+S is pressed
            }
        },
        handleMarkdownInputKeyDown(event: any) {
            if (event.key === 'Tab') {
                event.preventDefault();
                const textarea = event.target;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                if (event.shiftKey) {
                    this.unindentSelection(textarea, start, end);
                } else {
                    this.insertTab(textarea, start, end);
                }
            }
        },
        insertTab(textarea, start, end) {
            const tab = '\t';
            this.content =
                this.content.substring(0, start) +
                tab +
                this.content.substring(end);
            textarea.selectionStart = textarea.selectionEnd =
                start + tab.length;
        },
        unindentSelection(textarea, start, end) {
            const lines = this.content.substring(start, end).split('\n');
            const unindentedLines = lines.map((line) =>
                line.replace(/^\t/, ''),
            );
            const unindentedText = unindentedLines.join('\n');

            this.content =
                this.content.substring(0, start) +
                unindentedText +
                this.content.substring(end);
            textarea.selectionStart = start;
            textarea.selectionEnd = start + unindentedText.length;
        },
        cacheCollapsedStates() {
            this.codeCollapsedStates.clear(); // clear the cache first
            // cache the collapsed states of rendered code blocks
            const codeBlocks = this.$el.querySelectorAll(
                '.markdown-body pre > code:has(pre)',
            );
            codeBlocks.forEach((codeBlock, index) => {
                const isCollapsed = codeBlock.classList.contains('collapsed');
                const length = codeBlock.innerText.length;
                this.codeCollapsedStates.set(index, {
                    len: length, // HINT: since length of code block is generally not same, we use it as a signal
                    collapsed: isCollapsed,
                }); // cache the collapsed state of each code block
            });
        },
    },
    beforeUpdate() {
        this.cacheCollapsedStates();
    },
    mounted() {
        // avoid the resize
        window.addEventListener('resize', this.fixInputResizeWidth);
        window.addEventListener('keydown', this.handleUiInputKeyDown);
        mdCodeFoldHooks.addCodeFoldingHook();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.fixInputResizeWidth);
        window.removeEventListener('keydown', this.handleUiInputKeyDown);
        mdCodeFoldHooks.removeCodeFoldingHook();
    },
});
