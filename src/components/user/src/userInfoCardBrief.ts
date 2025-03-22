import { defineComponent, PropType, ref } from 'vue';
import userAvatar from '@/components/user/userAvatar.vue';
import store from '@/store';

export interface IuserBriefInformation {
    name: string;
    avatar: string;
    bio: string;
    follows: number;
    followers: number;
    blogsNum: number;
}

export default defineComponent({
    name: 'UserInfoCardBrief',
    components: {
        userAvatar,
    },
    props: {
        useSelfProfile: {
            type: Boolean,
            default: false,
        },
        info: {
            type: Object as PropType<IuserBriefInformation>,
            default: {
                name: '',
                avatar: '',
                bio: 'no bio',
                follows: 0,
                followers: 0,
                blogsNum: 0,
            },
        },
    },
    computed: {
        currInfo(): IuserBriefInformation {
            return this.useSelfProfile ? this.user_info : this.info;
        },
    },
    data() {
        return {
            user_info: {
                name: store.state.user.name ?? '',
                avatar: store.state.user.avatarUrl ?? '',
                bio: store.state.user_personal_data.bio ?? '',
                follows: store.state.user_personal_data.following_num ?? 0,
                followers: store.state.user_personal_data.followers_num ?? 0,
                blogsNum: store.state.user_personal_data.blogs_num ?? 0,
            } as IuserBriefInformation,
        };
    },
    mounted() {},
});
