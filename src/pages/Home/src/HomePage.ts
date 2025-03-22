import { defineComponent } from "vue";
import navbar_welcome from "@components/nav/navbar_welcome.vue";
import SidebarLayout from "@layout/SidebarLayout.vue";
import rightSidebarProfile from "@components/sidebar/rightSidebarProfile.vue";
import leftSidebarColumns from "@components/sidebar/leftSidebarColumns.vue";
import creationSpeedDial from "@/components/speed_dials/creationSpeedDial.vue"
import footerbar_common from '@components/footer/footerbar_common.vue';


export default defineComponent({
    name: "HomePage",
    components: {
        navbar_welcome,
        SidebarLayout,
        rightSidebarProfile,
        leftSidebarColumns,
        footerbar_common,
        creationSpeedDial,
    },
    data() {
        return {
            
            open: false,
        };
    },
    methods: {
        toggleRightSidebar() {
            const rightSidebar: any = this.$refs.rightSidebar;
            rightSidebar.toggle();
        },
        toggleLeftSidebar() {
            const leftSidebar: any = this.$refs.leftSidebar;
            leftSidebar.toggle();
        },
    },
});