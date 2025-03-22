import { defineComponent, ref, Ref } from 'vue';

import RulesLayout from '@layout/RulesLayout.vue';
import RulesApi from '@/api/rules/rules_api';
import 'highlight.js/styles/github-dark.css';
import {
    getMarkdownHeadersByHTML,
    renderMarkdownContent,
} from '@/utils/markdown/MarkdownUtils';

import { onScrollRedirectTitleLink } from '@hooks/ui/scrollHandler';

import NavbarSimple from '@/components/nav/navbar_simple.vue';
import footerbar from '@/components/footer/footerbar_common.vue';
import FloatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import markdownFileListView from '@/components/markdown/markdownFileListView.vue';
import MarkdownOutline from '@/components/markdown/markdownOutline.vue';
import LeftSideBarBtnContent from '@components/sidebar/leftSideBarBtnContent.vue';

export default defineComponent({
    name: 'RulesIndex',
    components: {
        NavbarSimple, // simple navbar component
        RulesLayout,
        footerbar,
        FloatingAlert,
        markdownFileListView,
        MarkdownOutline,
        LeftSideBarBtnContent,
    },
    props: ['file_path'],
    data() {
        return {
            directory: {},
            menuOpen: false,
            headings: [] as any[],
            loading_rules: true,
            renderHTML: '',
        };
    },
    computed: {},
    methods: {
        setCookies() {
            const cookiePrompt: any = this.$refs.cookiePrompt;
            cookiePrompt.setCookies();
        },
        /**
         * Description
         * @returns {any}
         */
        async renderRulesDirectory(): Promise<void> {
            try {
                const response = await RulesApi.getRuleList();
                const json_dir: string = response.data;
                if (!json_dir) {
                    throw new Error(this.$t('rules.noRulesFound'));
                }
                this.directory = JSON.parse(json_dir);
            } catch (error: any) {
                // for JSON parse error
                console.error(error);
                if (error instanceof SyntaxError) {
                    this.showErrorAlert(this.$t('g.JsonParseError'));
                } else {
                    this.showErrorAlert(
                        (error.response?.data?.message || error.message) ??
                            this.$t('g.UnknownError'),
                    );
                }
            }
        },

        /**
         * Description
         * @returns {any}
         */
        async getRulesContent(): Promise<string> {
            {
                let content: string = '';
                this.loading_rules = true;
                try {
                    const filePath: string = this.file_path ?? 'index';
                    const response = await RulesApi.getRuleContent(filePath);
                    content = response.data;
                } catch (error: any) {
                    this.loading_rules = false;
                    const result: string =
                        '<h2>' +
                        this.$t('rules.loadFailed') +
                        '</h2>' +
                        '<h3><p>' +
                        ((error.response?.data?.message || error.message) ??
                            this.$t('g.UnknownError')) +
                        '</p></h3>';
                    return Promise.reject(result); // reject the promise
                }
                this.loading_rules = false;
                return Promise.resolve(content);
            }
        },
        showErrorAlert(message: string): void {
            showFloatingAlert(this.$refs.alertBox as any, false, message);
        },
        scrollToTitle(): void {
            onScrollRedirectTitleLink(this.headings.map((h) => h.id));
        },
    },
    mounted() {
        // render the markdown rules content  based on file_path
        this.renderRulesDirectory();
        this.getRulesContent()
            .then((content) => {
                this.renderHTML = renderMarkdownContent(content, true);
                this.headings = getMarkdownHeadersByHTML(this.renderHTML);
                /** add event listener of dynamic link for scroll */
            })
            .catch((error) => {
                this.renderHTML = error; // render the error message
            })
            .finally(() =>
                window.addEventListener('scroll', this.scrollToTitle),
            );
        // wait for DOM Loaded
    },
    // remove Event Listener on destroyed
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollToTitle);
    },
});
