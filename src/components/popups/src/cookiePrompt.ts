import { defineComponent } from 'vue';
import TokenApi from '@/api/auth/token_api';
import store from '@/store';

export default defineComponent({
    name: 'CookiePrompt',
    props: {
        checkAtStart: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            showCookiePrompt: false,
            snackbar: false,
            snackbarText: '',
        };
    },
    mounted() {
        const authenticated = store.state.authorized;
        const use_cookies_set = store.state.user.use_cookies in [0, 1, 2];
        if (authenticated && !use_cookies_set) {
            this.show(); // only show for authenticated user who haven't set cookies yet
        }
    },
    methods: {
        show() {
            const authenticated = store.state.authorized;
            if (authenticated) {
                // show popup when valid user is logged in
                this.showCookiePrompt = true;
            } else {
                this.snackbarText = this.$t('common.cookiePrompt.loginFirst');
                this.snackbar = true;
            }
        },
        async setUserCookies(value: number) {
            const authenticated = store.state.authorized;
            if (authenticated) {
                try {
                    const response = await TokenApi.setUserCookiesUsage(value);
                    store.commit('setUseCookies', value);
                } catch (error: any) {
                    alert(this.$t('g.UnknownError') + ' : ' + error.message);
                }
            } else {
                this.snackbarText = this.$t('common.cookiePrompt.loginFirst');
                this.snackbar = true;
            }
            this.showCookiePrompt = false; // close the popup when set failed
            // close the popup whenever set succeed
        },
    },
});
