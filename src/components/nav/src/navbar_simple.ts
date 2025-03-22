import { defineComponent, ref } from 'vue';
import store from '@/store';
import DarkModeToggleBtn from '@/components/buttons/darkmodeToggleBtn.vue';
import HomeBtn from '@/components/buttons/homeBtn.vue';
import TranslateBtn from '@/components/buttons/translateBtn.vue';
import { tr } from 'vuetify/lib/locale/index.mjs';

export default defineComponent({
    name: 'NavbarSimple',
    props: {
        // when window width is less than this value, hide left toggle
        hideLeftToggleWidth: {
            type: Number,
            default: 9999,
        },
        // when window width is less than this value, hide right toggle
        hideRightToggleWidth: {
            type: Number,
            default: 9999,
        },
        showSupportBtn: {
            type: Boolean,
            default: true,
        },

        /**
         * if set to True, reload i18n
         *    translations by refresh page
         */
        reloadTranslations: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        DarkModeToggleBtn,
        HomeBtn,
        TranslateBtn,
    },
    data() {
        return {
            darkMode: store.state.darkMode,
            leftToggleVisible: ref(false),
            rightToggleVisible: ref(false),
        };
    },
    methods: {
        handleResize() {
            const width = window.innerWidth;
            if (width < this.hideLeftToggleWidth) {
                this.leftToggleVisible = true;
            } else {
                this.leftToggleVisible = false;
            }
            if (width < this.hideRightToggleWidth) {
                this.rightToggleVisible = true;
            } else {
                this.rightToggleVisible = false;
            }
        },
    },
    mounted() {
        // initializate left and right toggle visibility
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
});
