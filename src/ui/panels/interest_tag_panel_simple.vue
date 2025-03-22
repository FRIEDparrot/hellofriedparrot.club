<template>
  <div class="interesting-tag-panel-simple">
    <floatingAlert ref="floatingAlert"></floatingAlert>
    <tag_choose_overlay
      ref="addUserInterestTagOverlay"
      :hideAfterAdd="false"
      :showTagContainer="true"
      :maxTagCount="maxTagNumber"
      :allowRepeatTags="false"
      @confirm="updateUserInterestTags"
    >
      <template #title>
        {{ $t('common.tag_overlay.card_title_add') }}
      </template>
      <template #current-tags-tip>
        {{ $t('common.tag_overlay.current_tags') }}}
      </template>
    </tag_choose_overlay>
    <tag_choose_overlay
      ref="deleteUserInterestTagOverlay"
      :hideAfterAdd="false"
      :showTagContainer="true"
      :maxTagCount="1000"
      :allowRepeatTags="false"
      @confirm="deleteInterestTags"
    >
      <template #title>
        {{ $t('common.tag_overlay.card_title_delete') }}
      </template>
      <template #current-tags-tip>
        {{ $t('common.tag_overlay.selected_tags') }}
      </template>
      <template #add-icon>
        {{ 'mdi-delete-forever' }}
      </template>
    </tag_choose_overlay>

    <newTagPrompt ref="newTagPrompt" />
    <dynamicSearchBtn></dynamicSearchBtn>
    <div class="interested-tags">
      <div class="interested-tag-header-container">
        {{ $t('common.simpleTagPanel.interestedTags') }}
      </div>
      <v-chip-group class="interested-tag-container">
        <v-chip
          size="small"
          variant="outlined"
          v-for="(tag, index) in userInterestTags"
          :key="index"
          class="interest-tag"
        >
          <a :href="'/blogs?tag=' + tag.key">
            {{ tag[$i18n.locale] ?? tag.key }}
          </a>
        </v-chip>
        <v-chip
          size="small"
          variant="outlined"
          class="interest-tag"
          :prepend-icon="
            userInterestTags.length < maxTagNumber
              ? 'mdi-plus-circle-outline'
              : 'mdi-minus-circle-outline'
          "
          @click="showAddUserInterestTagOverlay"
        >
          {{
            userInterestTags.length < maxTagNumber
              ? $t('g.addNewTag')
              : $t('g.deleteTag')
          }}
        </v-chip>
      </v-chip-group>
    </div>
    <div class="recommended-tags">
      <div class="interested-tag-header-container">
        {{ $t('common.simpleTagPanel.recommendedTags') }}
      </div>
      <v-chip-group class="recommended-tag-container">
        <v-chip
          size="small"
          v-for="(tag, index) in recommendInterestTags"
          :key="index"
          class="interest-tag"
        >
          <a :href="'/blogs?tag=' + tag.key">
            {{ getTagTranslation(tag) }}
          </a>
        </v-chip>
      </v-chip-group>
    </div>

    <div class="manager-tag-add-button-container mb-2">
      <v-btn
        v-if="user.priority <= 1"
        class="manager-tag-add-button"
        color="info"
        size="small"
        rounded
        @click="showNewTagPrompt()"
      >
        {{ $t('g.addNewTagToDDatabase') }}
      </v-btn>
      <newTagPrompt ref="newTagPrompt" />
      <v-btn
        class="manager-tag-add-button"
        v-if="user.priority <= 1"
        color="error"
        size="small"
        rounded
        @click="showDeleteTagOverlay()"
      >
        {{ $t('g.deleteTagFromDDatabase') }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" src="./src/interest_tag_panel_simple.ts"></script>

<style lang="scss" scoped src="./styles/interest_tag_panel_simple.scss"></style>
