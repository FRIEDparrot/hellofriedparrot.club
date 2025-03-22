import { defineComponent } from 'vue';
import defaultAvatar from '@imgs/ui/defaultAvatar.vue';
import store from '@/store';

export default defineComponent({
    name: 'UserAvatar',
    props: {
        color: {
            type: String,
            default: 'var(--navbar-text-color)',
        },
    },
    components: {
        defaultAvatar,
    },
    data() {
        return {
            user_info: {
                avatarUrl: store.state.user.avatarUrl ?? undefined,
            },
        };
    },
});
