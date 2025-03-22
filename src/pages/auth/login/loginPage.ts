import { defineComponent } from 'vue';
import {
    checkEmailPattern,
    checkCaptchaPattern,
} from '@/utils/functions/format_check';

import LoginApi from '@/api/auth/login_api';
import store from '@/store';
import router from '@/router';
import i18n from '@/locales/lang';
import CaptchaApi, { captcha_base_url } from '@api/auth/captcha_api';
import '@/assets/anims/animation_main';

import SidebarLayout from '@/layout/SidebarLayout.vue';
import navbar_welcome from '@components/nav/navbar_welcome.vue';
import HomeBtn from '@components/buttons/homeBtn.vue';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import LeftSidebarWelcome from '@components/sidebar/leftSidebarColumns.vue';

export default defineComponent({
    name: 'LoginPage',
    components: {
        FloatingAlert: floatingAlert,
        navbar_welcome,
        HomeBtn,
        SidebarLayout,
        LeftSidebarWelcome,
    },
    setup() {
        const rules = {
            required(value: any) {
                return (
                    !!value || (i18n.global as any).t('login.warns.required')
                );
            },
            is_email(value: any) {
                return (
                    checkEmailPattern(value) ||
                    (i18n.global as any).t('login.warns.emailNotValid')
                );
            },
        };
        return {
            rules, // make i18n available in the data component
        };
    },
    data() {
        return {
            tab: null,
            showPassword: false,
            isLoadingCaptcha: false,
            loginAlert: {
                show: false,
                type: 'success',
                title: '',
                text: '',
            },
            isLoading: false,
            LoginForm_username: {
                username: '',
                password: '',
            },
            LoginForm_email: {
                email: '',
                verification_code: '',
            },
        };
    },
    methods: {
        /**
         * Description get Login email Captcha
         * @returns {any}
         */
        async getLoginCaptcha(event: any) {
            this.isLoadingCaptcha = true;
            if (!checkEmailPattern(this.LoginForm_email.email || '')) {
                showFloatingAlert(
                    this.$refs.emailAlert as any,
                    false,
                    this.$t('login.warns.emailNotValid'),
                );
            } else {
                try {
                    // !TODO: remove this line after testing
                    const response = await CaptchaApi.getCaptcha(
                        captcha_base_url.login,
                        {
                            email: this.LoginForm_email.email,
                        },
                    );
                    showFloatingAlert(
                        this.$refs.emailAlert as any,
                        true,
                        this.$t('login.warns.emailSendSucceed'),
                    );
                } catch (error: any) {
                    showFloatingAlert(
                        this.$refs.emailAlert as any,
                        false,
                        error.message ?? this.$t('login.warns.UnknownError'),
                    );
                }
            }
            this.isLoadingCaptcha = false;
        },
        redirectToHomePage() {
            this.$router.push('/home'); // redirect to home page
        },
        /**
         * Description submit login by username form and return the Login response
         * @param {any} event:any
         * @returns {any}
         */
        async submitLoginByUserName(event: any) {
            this.isLoading = true;
            let success = false;
            let message = '';
            const results = await event;
            const data_res = results;
            if (data_res.valid === true) {
                try {
                    // not use stringify (avoid twice stringify)
                    const form_data = this.LoginForm_username;
                    const response =
                        await LoginApi.loginUserByPassword(form_data);
                    success = true;
                    message = this.$t('login.warns.LoginSucceed');
                } catch (error: any) {
                    // use the dialog component to show the error message if login fails
                    message =
                        this.$t('login.warns.LoginFailed') +
                        ' : ' +
                        error.message;
                } finally {
                    showFloatingAlert(
                        this.$refs.emailAlert as any,
                        success,
                        message,
                    );
                    if (success) {
                        setTimeout(this.redirectToHomePage, 1000);
                    }
                }
            }
            this.isLoading = false;
        },
        async submitLoginByEmail(event: any) {
            this.isLoading = true;
            let success = false;
            let message = '';
            const results = await event;
            const data_res = results;
            if (data_res.valid === true) {
                try {
                    const form_data = this.LoginForm_email;
                    const response: any =
                        await LoginApi.loginUserByCaptcha(form_data);

                    // token is saved in the store
                    success = true;
                    message = this.$t('login.warns.LoginSucceed');
                } catch (error: any) {
                    // use the dialog component to show the error message if login fails
                    console.error(error);
                    success = false;
                    message =
                        this.$t('login.warns.LoginFailed') +
                        ' : ' +
                        error.message;
                } finally {
                    showFloatingAlert(
                        this.$refs.emailAlert as any,
                        success,
                        message,
                    );
                    if (success) {
                        setTimeout(this.redirectToHomePage, 2000);
                    }
                }
            }
            this.isLoading = false;
        },
    },
});
