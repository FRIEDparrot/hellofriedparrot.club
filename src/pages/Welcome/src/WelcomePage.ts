import interface_welcome from "../interface_welcome.vue";
import SidebarLayout from "@layout/SidebarLayout.vue";
import { defineComponent } from "vue";

import navbar_welcome from "@components/nav/navbar_welcome.vue";
import footerIndex from "@components/footer/footerbar_common.vue";
import rightSidebarProfile from "@components/sidebar/rightSidebarProfile.vue";
import leftSidebarColumns from "@components/sidebar/leftSidebarColumns.vue";

export default defineComponent({
    name: "WelcomePage",
    data() {
        return {
            num: 1,
        };
    },
    props: {},
    components: {
        SidebarLayout,
        navbar_welcome,
        interface_welcome,
        footerIndex,
        rightSidebarProfile,
        leftSidebarColumns,
    },
    methods: {
        setCookies() {
            const cookiePrompt: any = this.$refs.cookiePrompt;
            cookiePrompt.setCookies();
        },
        toggleLeftSidebar() {
            const l: any = this.$refs.leftSidebar;
            l.toggle();
        },
        toggleRightSidebar() {
            const l: any = this.$refs.rightSidebar;
            l.toggle();
        },
    },
    mounted() {},
});
