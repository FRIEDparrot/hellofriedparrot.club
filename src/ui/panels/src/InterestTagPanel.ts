import { defineComponent, ref } from 'vue';
import InterestTag from '@/interface/classes/interestTag_cls';
import tagChooseOverlay from '@/components/overlays/tag_choose_overlay.vue';
import newTagPrompt from '@/components/popups/newTagPrompt.vue';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';
import PersonalDataService from '@/services/accounts/personal_data_service';
import InterestTagApi from '@/api/interest_tags/interest_tags_api';
import store from '@/store';

export default defineComponent({
    name: 'InterestTagPanel',
    components: {
        tagChooseOverlay,
        newTagPrompt,
        floatingAlert,
    },
    data() {
        return {
            user: store.state.user,
            maxUserTagNum: 15,
        };
    },
    computed: {
        // responsive state variables
        userInterestTags(): InterestTag[] {
            return store.state.user_personal_data
                .interest_tags as InterestTag[];
        },
        recommendInterestTags(): InterestTag[] {
            return store.state.user_personal_data
                .recommend_tags as InterestTag[];
        },
    },
    methods: {
        showAddUserInterestTagOverlay() {
            const tag_overlay: any = this.$refs.addUserInterestTagOverlay;
            if (tag_overlay) {
                // use  this.userInterestTags.copy() to avoid
                tag_overlay.show(
                    this.userInterestTags.slice(0) as InterestTag[],
                );
            }
        },
        showNewTagPrompt() {
            const prompt: any = this.$refs.newTagPrompt;
            prompt.show();
        },
        getTagTranslation(item) {
            const lang = this.$i18n.locale;
            return item[lang] ?? item.en ?? item;
        },
        async updateUserInterestTags(tags: InterestTag[]) {
            try {
                const msg: any =
                    await PersonalDataService.update_user_interest_tags(tags); // update state
                showFloatingAlert(this.$refs.floatingAlert as any, true, msg); // show success alert
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        },
        async deleteInterestTags(tags: InterestTag[]) {
            try {
                await InterestTagApi.deleteTagFromDatabase(
                    tags.map((tag) => tag.key),
                );
                showFloatingAlert(
                    this.$refs.floatingAlert as any,
                    true,
                    this.$t('common.tag_overlay.delete_success'),
                );
            } catch (error: any) {
                this.showErrorAlert(error.message);
            }
        },
        showDeleteTagOverlay() {
            const tag_overlay: any = this.$refs.deleteUserInterestTagOverlay;
            tag_overlay.show();
        },
        showErrorAlert(msg: string) {
            showFloatingAlert(this.$refs.floatingAlert as any, false, msg);
        },
    },
});
