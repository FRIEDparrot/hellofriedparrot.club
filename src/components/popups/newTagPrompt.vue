<template>
  <div class="new-tag-prompt">
    <v-dialog v-model="isOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('common.newTagPrompt.title') }}</span>
        </v-card-title>

        <v-text-field
          v-model="newTagForm.key"
          class="tag-prompt-input"
          :label="$t('common.newTagPrompt.tagKey')"
        />
        <v-text-field
          v-model="newTagForm.en"
          class="tag-prompt-input"
          :label="$t('common.newTagPrompt.tagTranslationEn')"
        />
        <v-text-field
          v-model="newTagForm.zh"
          class="tag-prompt-input"
          :label="$t('common.newTagPrompt.tagTranslationZh')"
        />

        <v-card-actions class="mb-2 ml-2 mr-2">
          <v-btn color="secondary" variant="outlined" @click="isOpen = false">
            {{ $t('g.cancel') }}
          </v-btn>
          <v-spacer />
          <v-btn color="primary" variant="outlined" @click="addNewTag">
            {{ $t('common.newTagPrompt.confirmAddTag') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <floatingAlert ref="floatingAlert" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/api/interest_tags/interest_tags_api';
import InterestTagApi from '@/api/interest_tags/interest_tags_api';
import floatingAlert from '@/components/popups/floatingAlert.vue';
import showFloatingAlert from '@/components/popups/scripts/showFloatingAlert';

export default defineComponent({
  name: 'NewTagPrompt',
  components: {
    floatingAlert,
  },
  data() {
    return {
      isOpen: false,
      newTagForm: {
        key: '',
        en: '',
        zh: '',
      },
    };
  },
  methods: {
    show() {
      this.isOpen = true;
    },
    async addNewTag() {
      const data = this.newTagForm;
      const floating_alert: any = this.$refs.floatingAlert;
      try {
        await InterestTagApi.addNewTagToDatabase(data);
        showFloatingAlert(
          floating_alert,
          true,
          this.$t('common.newTagPrompt.successAddTag'),
        );
        // reset form data
        this.newTagForm = {
          key: '',
          en: '',
          zh: '',
        };
      } catch (error: any) {
        showFloatingAlert(
          floating_alert,
          false,
          this.$t('common.newTagPrompt.errorAddTag') + ' : ' + error.message,
        );
      }
    },
    handleEnterKey(event: any) {
      if (this.isOpen && event.key === 'Enter') {
        this.addNewTag();
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', (event) => {
      this.handleEnterKey(event);
    });
  },
  beforeUnmount() {
    window.removeEventListener('keydown', (event) => {
      this.handleEnterKey(event);
    });
  },
});
</script>

<style scoped lang="scss">
.tag-prompt-input {
  margin: 0px 20px;
  margin-top: 10px;
  z-index: 1;
}
</style>
