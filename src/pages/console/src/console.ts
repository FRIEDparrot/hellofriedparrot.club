import { defineComponent } from "vue";
import navbarSimple from "@components/nav/navbar_simple.vue";
import rightSidebarProfile from "@components/sidebar/rightSidebarProfile.vue";
import rightSidebarToggleBtn from "@/components/buttons/rightSidebarToggleBtn.vue";
import leftSidebarBtnExpand from "@/components/sidebar/leftSidebarBtnExpand.vue";
import footerbar_common from "@/components/footer/footerbar_common.vue";
import { RouterLink, RouterView } from "vue-router";

export default defineComponent({
    name: "Console",
    components: {
        navbarSimple,
        rightSidebarProfile,
        rightSidebarToggleBtn,
        leftSidebarBtnExpand,
        footerbar_common,
    },
    methods: {
        toggleRightSidebar() {
            const rightSidebar: any = this.$refs.rightSidebar;
            rightSidebar.toggle();
        },
    },
    data() {
        return {
            tab: 0,
            leftSidebarItems: [
                {
                    titleKey: "panels.profile.reviews",
                    icon: "mdi-police-badge",
                    callback: () => {
                        this.$router.push("/console/reviews");
                    },
                },
                {
                    titleKey: "panels.profile.userManagement",
                    icon: "mdi-account",
                    callback: () => {
                        this.$router.push("/console/user-management");
                    },
                },
                {
                    titleKey: "panels.profile.serverManagement",
                    icon: "mdi-server",
                    callback: () => {
                        this.$router.push("/console/server-monitor");
                    },
                },
                {
                    titleKey: "panels.profile.ipRestriction",
                    icon: "mdi-lock",
                    callback: () => {
                        this.$router.push("/console/ip-restriction");
                    },
                },
                {
                    titleKey: "panels.profile.violationActions",
                    icon: "mdi-alert",
                    callback: () => {
                        this.$router.push("/console/violation-actions");
                    },
                },
            ],
            headers: [
                {
                    align: "start",
                    key: "name",
                    title: "Table Name",
                },
                { key: "description", title: "Description" },
                { key: "actions", title: "Actions" },
                { key: "date", title: "Date" },
            ],
            items: [
                {
                    name: "Reviews",
                    description: "View and manage reviews",
                    actions: "View",
                    date: "2021-08-10",
                },
            ],
        };
    },
});
