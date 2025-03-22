import { defineComponent } from 'vue';
import menuBtn from '@/components/buttons/menuBtn.vue';

export default defineComponent({
    name: 'LeftSideBarBtnContent',
    data() {
        return {
            drawer_perm: true,
            drawer_temp: false,
            selectedItem: 0,
            toggle_by_btn: false,
        };
    },
    props: {
        useWholeDrawer: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        menuBtn,
    },
    watch: {
        drawer_temp: function (val) {
            const menuToggleBtn = this.$refs.menuToggleBtn as any;
            menuToggleBtn.SetMenuState(this.drawer_temp, null);
        },
        drawer_perm: function (val) {
            if (!val) {
                this.drawer_temp = false; // close drawer when permanent drawer is closed
            }
        },
    },
    methods: {
        toggle() {
            if (this.useWholeDrawer) {
                const show = !this.drawer_perm;
                this.drawer_perm = show;
                //consistent with drawer_temp
            } else {
                const show = !this.drawer_temp;
                this.drawer_temp = show;
            }
        },
        select(value) {
            if (this.selectedItem === value && this.drawer_temp) {
                this.drawer_temp = false;
                // close drawer when click on same item on open state
            } else {
                this.drawer_temp = true;
            }
            this.selectedItem = value; // update selected item
        },
    },
    mounted() {
        if (this.useWholeDrawer) {
            this.drawer_perm = false;
        }
    },
});
