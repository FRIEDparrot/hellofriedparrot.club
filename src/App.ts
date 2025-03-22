import '@/assets/anims/animation_main';
import { defineComponent } from 'vue';
import { useTheme } from 'vuetify';
import store, {
    getPreferedLangCode,
    setPreferedLangCode,
    getDarkMode,
    setDarkMode,
} from './store'; // ! import vuex store

/** add the dynamic effects to the buttons */
const app = defineComponent({
    name: 'App',
    setup() {
        const theme = useTheme();
        theme.global.name.value = getDarkMode() ? 'dark' : 'light'; // set the initial theme
        store.watch(
            (state) => state.darkMode,
            (newVal) => {
                theme.global.name.value = newVal ? 'dark' : 'light'; // update the vuetify theme
            },
        );
        return {};
    },
    components: {},
    methods: {},
    data() {
        return {};
    },
    mounted() {
        /** CAUTION: for some store status, we need to initialize here */
        /**  set the language and load the language pack */
        const lang_code: any = getPreferedLangCode();
        this.$i18n.locale = lang_code;
        setPreferedLangCode(lang_code);

        /* set the dark mode based on the user's preference */
        setDarkMode(getDarkMode());
        /* note : cookies set part is in @pages/common/components/CookiePrompt.vue */
    },
    beforeDestroy() {},
});

export default app;
