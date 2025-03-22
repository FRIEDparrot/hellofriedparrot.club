import { defineComponent } from 'vue';
import cookiePrompt from '@/components/popups/cookiePrompt.vue';

export default defineComponent({
    name: 'footerbar_common',
    props: {
        zIndex: {
            type: Number,
            default: 1000,
        },
    },
    components: {
        cookiePrompt,
    },
    methods: {
        notDeveloped() {
            alert(this.$t('g.notDeveloped'));
        },
        openLink(url: string) {
            window.open(url, '_blank');
        },
        /** emit a event to the parent page to set cookie */
        SetCookies() {
            const cookiePrompt: any = this.$refs.cookiePrompt;
            cookiePrompt.show();
        },
    },
});
