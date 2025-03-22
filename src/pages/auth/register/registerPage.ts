import { defineComponent } from 'vue';
import { ref, Ref } from 'vue';
import countriesData from '@assets/data/countries.json';
import {
    checkStringLength,
    checkPasswordPattern,
    checkUsernamePattern,
    checkEmailPattern,
} from '@functions/format_check';
import CaptchaApi, { captcha_base_url } from '@/api/auth/captcha_api';
import RegisterApi from '@/api/auth/register_api';
import store from '@store/index';
import i18n from '@/locales/lang';
import navbar_welcome from '@/components/nav/navbar_welcome.vue';
import HomeBtn from '@/components/buttons/homeBtn.vue';
import FloatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import SidebarLayout from '@/layout/SidebarLayout.vue';
import LeftSidebarWelcome from '@components/sidebar/leftSidebarColumns.vue';

export default defineComponent({
    name: 'RegisterPage',
    components: {
        navbar_welcome,
        FloatingAlert,
        HomeBtn,
        SidebarLayout,
        LeftSidebarWelcome,
    },
    setup() {
        const t = (i18n.global as any).t;
        const rules = {
            required: (value: any) => !!value || t('register.warns.required'),
            format_check_name: (value: any) => {
                const res = checkUsernamePattern(value);
                switch (res) {
                    case -1:
                        return t('register.warns.username.length');
                    case -2:
                        return t('register.warns.username.start');
                    case -3:
                        return t('register.warns.username.nospace');
                    case 0:
                        return true;
                    default:
                        return t('register.warns.UnknownError');
                }
            },
            format_check_email: (value: any) => {
                return checkEmailPattern(value) || 'Invalid email format';
            },
            format_check_password: (value: any) => {
                const res: number = checkPasswordPattern(value);
                switch (res) {
                    case -1:
                        return t('register.warns.password.forbidden', {
                            forbidden_char: '\':\\"|/<>',
                        });
                    case -2:
                        return t('register.warns.password.invalid');
                    case -3:
                        return t('register.warns.password.format_letter');
                    case -4:
                        return t('register.warns.password.format_number');
                    case -5:
                        return t('register.warns.password.format_special');
                    case -6:
                        return t('register.warns.password.format_length');
                    case 0:
                        return true;
                    default:
                        return t('register.warns.UnknownError');
                }
            },
            format_check_verification_code: (value: any) => {
                if (!checkStringLength(value, 6, 6)) {
                    return t('register.warns.captcha');
                }
            },
        };

        return {
            rules,
        };
    },

    data() {
        return {
            countriesData: countriesData,
            countryDisplang: () => {
                const lang = this.$i18n.locale || 'en';
                if (lang === 'zh') {
                    return (obj) => obj.zh;
                } else {
                    return (obj) => obj.en;
                }
            },
            // !IMPORTANT this consistent with assets/data/countries.json
            showPassword: false,
            isLoadingSubmit: false,
            isLoadingCaptcha: false,
            agreeTermofService: [],
            registerForm: {
                username: '',
                email: '',
                verification_code: '',
                password: '',
                career: '',
                country: '',
                reason: '',
                receive_ads: [],
            }, // v-model bi-directional data with responsive object
            registerForm_extra: {
                password_confirm: '', // v-model bi-directional data binding object for the form data
            },
            registerAlert: {
                show: false,
                title: 'success',
                type: 'success',
                text: '',
            },
        };
    },
    computed: {},
    methods: {
        /**
         * Description Send The verification code
         * @returns {any}
         */
        async getRegisterCaptcha(event: any) {
            this.isLoadingCaptcha = true;
            let succeed = false;
            let message = '';
            const results = await event;
            if (!checkEmailPattern(this.registerForm.email)) {
                message = this.$t('register.warns.email');
            } else if (checkUsernamePattern(this.registerForm.username) != 0) {
                message = this.$t('register.warns.username.invalid');
            } else {
                try {
                    const response = await CaptchaApi.getCaptcha(
                        captcha_base_url.register,
                        {
                            username: this.registerForm.username,
                            email: this.registerForm.email,
                        },
                    );
                    succeed = true;
                    message = this.$t('register.warns.emailSendSucceed');
                } catch (error: any) {
                    message =
                        error.message ?? this.$t('register.warns.UnknownError');
                }
            }
            showFloatingAlert(this.$refs.emailAlert as any, succeed, message);
            this.isLoadingCaptcha = false;
        },
        /**
         * Description this function is implementation of the rules for the form validation
         * @returns {any}
         */
        format_check_password_confirm() {
            if (
                this.registerForm.password !=
                this.registerForm_extra.password_confirm
            ) {
                return this.$t('register.warns.password.confirm');
            }
            if (checkPasswordPattern(this.registerForm.password) != 0) {
                return ''; // this would be prompted in password field
            }
            return true;
        },

        /**
         * Description Submit the Register Form
         * @param {any} event:any
         * @returns {any}
         */
        async onSubmitRegisterForm(event: any) {
            this.isLoadingSubmit = true;
            const results = await event;

            let succeed = false;
            let message = '';
            const data_submitted: any = results;
            // valide the form data
            if (data_submitted.valid === true) {
                if (this.agreeTermofService.length === 0) {
                    message = this.$t('register.warns.agreeTerms'); // show error message
                } else {
                    // submit the data to the backend
                    try {
                        const response = await RegisterApi.registerNewUser(
                            this.registerForm,
                        );
                        // show success message
                        succeed = true;
                        message = this.$t('register.warns.registerSucceed');
                    } catch (error: any) {
                        message =
                            this.$t('register.warns.registerFailed') +
                            ' : ' +
                            error.message;
                    }
                }
                showFloatingAlert(
                    this.$refs.emailAlert as any,
                    succeed,
                    message,
                );
                if (succeed) {
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 5000); // redirect to home page after 5 seconds
                }
            }
            this.isLoadingSubmit = false; // set loading to false after form submission
        },

        /**
         * Description Redefinition for filter the country name search
         * @param {any} itemTitle:string
         * @param {any} queryText:string
         * @param {any} item:any
         * @returns {any}
         */
        countryNameFilter(itemTitle: string, queryText: string, item: any) {
            const searchText = queryText.toLowerCase().trim();
            const cca3_abbr = item.raw.cca3.toLowerCase();
            const lang_code = this.$i18n.locale || 'en';
            const translatedName = item.raw[lang_code].toLowerCase();
            const translatedname_heading = translatedName
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0))
                .join('');

            return (
                cca3_abbr.indexOf(searchText) > -1 ||
                translatedName.indexOf(searchText) > -1 ||
                translatedname_heading.indexOf(searchText) > -1
            );
        },
    },
    mounted() {},
});
