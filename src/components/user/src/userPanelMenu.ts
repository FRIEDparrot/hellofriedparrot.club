import { defineComponent, ref, Ref } from 'vue';
import store from '@/store';
import LogoutApi from '@/api/auth/logout_api';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import { priorityMap } from '@/shared/priority_maps';
import clickIconList from '@components/lists/clickIconList.vue';
import { IstdMenuItem } from '@/interface/iterators/stdMenuList';

export default defineComponent({
    props: {
        location: {
            type: String,
            default: 'bottom',
        },
    },
    components: {
        floatingAlert,
        clickIconList,
    },
    data() {
        return {
            menuOpen: false,
            user: store.state.user,
            user_personal_data: store.state.user_personal_data,
            UserPanelItems: [
                // for user and manager
                {
                    icon: 'mdi-home',
                    titleKey: 'g.myHomePage',
                    callback: (event: any) => {
                        this.navigateTo(event, '/home');
                    },
                    priority: 4,
                },
                {
                    icon: 'mdi-star',
                    titleKey: 'g.myStars',
                    callback: (event: any) => {
                        this.navigateTo(event, '/notDeveloped');
                        // TODO:  this.navigateTo(event, "/stars");
                    },
                    priority: 4,
                },
                {
                    icon: 'mdi-bell',
                    badge:
                        store.state.user_personal_data.msg_count > 0
                            ? true
                            : false,
                    badgeContent: store.state.user_personal_data.msg_count,
                    titleKey: 'g.myNotifications',
                    callback: (event: any) => {
                        this.navigateTo(event, '/site-messages');
                    },
                    priority: 4,
                },
                {
                    type: 'divider',
                    priority: 1,
                },
                {
                    icon: 'mdi-console',
                    titleKey: 'g.console',
                    callback: (event: any) => {
                        this.navigateTo(event, '/console');
                    },
                    priority: 1,
                },
                {
                    type: 'divider',
                    priority: 4,
                },
                {
                    icon: 'mdi-logout',
                    titleKey: 'g.logout',
                    callback: (event: any) => {
                        this.logout();
                    },
                    priority: 4,
                },
            ] as IstdMenuItem[],
        };
    },
    methods: {
        navigateTo(event: MouseEvent, path: string) {
            event.preventDefault();
            if (event.ctrlKey || event.metaKey) {
                window.open(path, '_blank');
            } else {
                this.$router.push(path);
            }
        },
        logout() {
            LogoutApi.logoutUser()
                .then()
                .catch((error) => {
                    showFloatingAlert(
                        this.$refs.floatingAlert as any,
                        false,
                        this.$t('common.userPanelMenu.logoutError') +
                            ' : ' +
                            error.message,
                    );
                });
        },
    },
});
