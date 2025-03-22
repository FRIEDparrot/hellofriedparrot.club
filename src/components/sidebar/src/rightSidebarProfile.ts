import { defineComponent } from 'vue';
import store from '@store/index';
import userAvatar from '@components/user/userAvatar.vue';
import { PriorityBorderColorMap } from '@/shared/priority_maps';
import compactFolderList from '@components/lists/compactFolderList.vue';
import LogoutApi from '@/api/auth/logout_api';
import { IstdMenuItem } from '@/interface/iterators/stdMenuList';

export default defineComponent({
    name: 'rightSidebarProfile',
    components: {
        userAvatar,
        compactFolderList,
    },
    props: {
        absPos: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: 2000,
        },
    },
    computed: {
        get_user_info() {
            return store.state.user;
        },
    },
    data() {
        return {
            drawer: false,
            user: {
                ...store.state.user,
                borderColor: PriorityBorderColorMap[store.state.user.priority],
            },
            profilePanelItems: [
                {
                    titleKey: 'panels.profile.dashboard',
                    icon: 'mdi-view-dashboard',
                    priority: 4,
                    open: true,
                    child: [
                        {
                            titleKey: 'g.myHomePage',
                            icon: 'mdi-home-outline',
                            url: '/home',
                        },
                        {
                            titleKey: 'g.myNotifications',
                            icon: 'mdi-bell-outline',
                            badge: true,
                            badgeContent:
                                store.state.user_personal_data.msg_count,
                        },
                        {
                            titleKey: 'g.myStars',
                            icon: 'mdi-star-outline',
                            url: '/notdeveloped',
                        },
                        {
                            titleKey: 'g.history',
                            icon: 'mdi-history',
                            url: '/notdeveloped',
                        },
                    ],
                },
                {
                    titleKey: 'panels.profile.creations',
                    icon: 'mdi-folder-multiple-outline',
                    priority: 4, // for user - SVIP
                    open: true,
                    child: [
                        {
                            titleKey: 'panels.profile.createNew',
                            icon: 'mdi-plus-circle-outline',
                            open: false,
                            child: [
                                {
                                    titleKey: 'panels.profile.newBlog',
                                    icon: 'mdi-pencil-outline',
                                    url: '/blogs/create',
                                    priority: 4,
                                },
                                {
                                    titleKey: 'panels.profile.newColumn',
                                    icon: 'mdi-note-plus-outline',
                                    url: '/notdeveloped',
                                    priority: 4,
                                },
                                {
                                    titleKey: 'panels.profile.newResource',
                                    icon: 'mdi-upload',
                                    url: '/notdeveloped',
                                    priority: 3,
                                },
                                {
                                    titleKey: 'panels.profile.newProject',
                                    icon: 'mdi-folder-plus-outline',
                                    url: '/notdeveloped',
                                    priority: 3,
                                },
                            ],
                        },
                        {
                            titleKey: 'panels.profile.contentCenter',
                            icon: 'mdi-folder-multiple-image',
                            url: '/notdeveloped',
                        },
                        {
                            titleKey: 'panels.profile.comments',
                            icon: 'mdi-comment-text-multiple-outline',
                            url: '/notdeveloped',
                        },
                    ],
                },
                {
                    titleKey: 'panels.profile.console',
                    priority: 1, // for admin - manager
                    icon: 'mdi-console',
                    open: true,
                    child: [
                        {
                            titleKey: 'panels.profile.reviews',
                            icon: 'mdi-format-list-bulleted',
                            url: '/console/reviews',
                            priority: 1, // for admin - manager
                        },
                        {
                            titleKey: 'panels.profile.userManagement',
                            icon: 'mdi-account-multiple-outline',
                            url: '/console/user-management',
                            priority: 1, // for admin - manager
                        },
                        {
                            titleKey: 'panels.profile.serverManagement',
                            icon: 'mdi-database-cog',
                            url: '/console/server-monitor',
                            priority: 1, // for admin - manager
                        },
                        {
                            titleKey: 'panels.profile.ipRestriction',
                            icon: 'mdi-lock-alert-outline',
                            url: '/console/ip-restriction',
                            priority: 1, // for admin - manager
                        },
                        {
                            titleKey: 'panels.profile.violationActions',
                            icon: 'mdi-alert-outline',
                            url: '/console/violation-actions',
                            priority: 1, // for admin - manager
                        },
                    ],
                },
                {
                    titleKey: 'panels.profile.accountSettings',
                    icon: 'mdi-cog',
                    priority: 4,
                    open: false,
                    child: [
                        {
                            titleKey: 'panels.profile.editProfile',
                            icon: 'mdi-account-edit',
                            url: '/notdeveloped',
                        },
                        {
                            titleKey: 'panels.profile.passwordSettings',
                            icon: 'mdi-lock',
                            url: '/notdeveloped',
                        },
                    ],
                },
            ] as IstdMenuItem[],
        };
    },
    methods: {
        open() {
            this.drawer = true;
        },
        toggle() {
            this.drawer = !this.drawer;
        },
        close() {
            this.drawer = false;
        },
        logout() {
            LogoutApi.logoutUser()
                .then((response) => {})
                .catch((error) => {
                    console.error(error);
                });
        },
        navigateTo(event: any, path: string) {
            if (event.ctrlKey || event.metaKey) {
                window.open(path, '_blank');
            } else {
                this.$router.push(path);
            }
        },
    },
});
