import { defineComponent } from 'vue';
import navbar_simple from '@/components/nav/navbar_simple.vue';
import navUserAvatarPrompt from '@/components/user/navUserAvatarPrompt.vue';
import rightSidebarToggleBtn from '@/components/buttons/rightSidebarToggleBtn.vue';
import rightSidebarProfile from '@/components/sidebar/rightSidebarProfile.vue';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import { IsitemsgDisplayData } from '@/interface/display/sitemsgDisplayData';
import SiteMessageServices from '@/services/messages/site_message_services';
import { UTCToLocalTimeString } from '@/utils/date/time_zone';
import { ElTag, ElButton } from 'element-plus';
import SiteMessagesApi from '@/api/site_messages/site_messages_api';
import confirmDialog from '@/components/popups/confirmDialog.vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import showConfirmDialog from '@/components/popups/scripts/showConfirmDialog';

export default defineComponent({
    name: 'SiteMessages',
    components: {
        navbar_simple,
        navUserAvatarPrompt,
        rightSidebarToggleBtn,
        rightSidebarProfile,
        floatingAlert,
        ElTag,
        ElButton,
        confirmDialog,
    },
    props: {
        itemsPerPage: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {
            items: [] as IsitemsgDisplayData[],
            current_page: 1,
            msg_card_max_width: 700,
            readStateLoading: false,
        };
    },
    computed: {},
    methods: {
        showErrorMsg(msg: string) {
            showFloatingAlert(
                this.$refs.floatingAlert as InstanceType<typeof floatingAlert>,
                false,
                msg,
            );
        },
        checkItemsEmpty() {
            if (this.items.length === 0) {
                this.showErrorMsg(this.$t('site_messages.no_messages'));
                return true;
            }
            return false;
        },
        async MarkasRead(id_list: number[]) {
            if (this.checkItemsEmpty()) {
                return;
            }
            this.readStateLoading = true;
            try {
                const response =
                    await SiteMessagesApi.markSiteMessagesAsRead(id_list);
                id_list.forEach((id) => {
                    const item = this.items.find((item) => item.id === id);
                    if (item) {
                        item.is_read = true;
                    }
                });
            } catch (error: any) {
                this.showErrorMsg(error.message);
            } finally {
                this.readStateLoading = false;
            }
        },
        /* not combine with MarkasRead intentionally */
        async MarkasUnread(id_list: number[]) {
            if (this.checkItemsEmpty()) {
                return;
            }
            this.readStateLoading = true;
            try {
                const response =
                    await SiteMessagesApi.markSiteMessagesAsUnread(id_list);
                id_list.forEach((id) => {
                    const item = this.items.find((item) => item.id === id);
                    if (item) {
                        item.is_read = false;
                    }
                });
            } catch (error: any) {
                this.showErrorMsg(error.message);
            } finally {
                this.readStateLoading = false;
            }
        },
        async deleteMsg(id_list: number[]) {
            if (this.checkItemsEmpty()) {
                return;
            }
            this.readStateLoading = true;
            try {
                const response =
                    await SiteMessagesApi.deleteSiteMessages(id_list);
                this.items = this.items.filter(
                    (item) => !id_list.includes(item.id),
                );
            } catch (error: any) {
                this.showErrorMsg(error.message);
            } finally {
                this.readStateLoading = false;
            }
        },
        showConfirmDeleteDialog() {
            if (this.checkItemsEmpty()) {
                return;
            }
            showConfirmDialog(
                this.$refs.deleteAllConfirmDialog as InstanceType<
                    typeof confirmDialog
                >,
            );
        },
        getFormattedMsgTime(date: Date): string {
            return UTCToLocalTimeString(date, 'YYYY-MM-DD HH:mm');
        },
        ToggleRightSidebar() {
            const rightSidebarProfile = this.$refs
                .rightSidebarProfile as InstanceType<
                typeof rightSidebarProfile
            >;
            rightSidebarProfile.toggle();
        },
        async fetchUserSiteMessages() {
            try {
                const site_msg_data: IsitemsgDisplayData[] =
                    await SiteMessageServices.getSiteMessageDisplayListInfo();
                this.items = site_msg_data;
            } catch (error: any) {
                this.showErrorMsg(error.message);
            }
        },
    },
    mounted() {
        this.fetchUserSiteMessages();
    },
});
