import { defineComponent, watchEffect } from 'vue';
import { gsap } from 'gsap';
import store from '@/store';

import DarkModeToggleBtn from '@components/buttons/darkmodeToggleBtn.vue';
import translateBtn from '@components/buttons/translateBtn.vue';
import rightSidebarToggleBtn from '@/components/buttons/rightSidebarToggleBtn.vue';
import defaultAvatar from '@imgs/ui/defaultAvatar.vue';
import navUserAvatarPrompt from '@/components/user/navUserAvatarPrompt.vue';
import MainColumns from '@/shared/main_columns';
import parrotLogoBtn from '@/components/buttons/parrotLogoBtn.vue';

/**
 * note MainColumns is variable
 */
export default defineComponent({
    name: 'navbar_welcome',
    components: {
        DarkModeToggleBtn,
        translateBtn,
        defaultAvatar,
        rightSidebarToggleBtn,
        navUserAvatarPrompt,
        parrotLogoBtn,
    },
    setup() {},
    emits: ['toggleLeftSidebar', 'toggleRightSidebar'],
    props: {
        showLeftSidebarToggle: {
            type: Boolean,
            default: true,
        },
        showRightSidebarToggle: {
            type: Boolean,
            default: true, // if show right sidebar
        },
        showLogo: {
            type: Boolean,
            default: true,
        },
        alwaysShowLogo: {
            type: Boolean,
            default: false,
        },
        scrollThreshold: {
            type: Number,
            default: 0,
        },
        scrollBehavior: {
            // for v-app-bar
            type: String,
            default: 'hide',
        },
        staticPos: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            user_info: {
                name: store.state.user.name ?? null,
                avatarUrl: store.state.user.avatarUrl ?? null,
            },
            navbar_columns: MainColumns,
            langLoaded: false,
            columns: MainColumns,
            avatar_size: '50px',
        };
    },
    methods: {
        navigateTo(event: MouseEvent, path: string) {
            if (event.ctrlKey || event.metaKey) {
                window.open(path, '_blank');
            } else {
                this.$router.push(path);
            }
        },
        // setOpen(index: number, val: boolean): void {
        //     gsap.to('#nav-arrow-icon' + index, {
        //         duration: 0.05,
        //         rotation: val ? 90 : 0,
        //         ease: 'power2.inOut',
        //     });
        // },
        toggleLeftSidebar() {
            this.$emit('toggleLeftSidebar'); // emit event to layout component
        },
        toggleRightSidebar() {
            this.$emit('toggleRightSidebar');
        },
    },
    mounted() {},
});
