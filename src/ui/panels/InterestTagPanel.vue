<template>
  <div class="interesting-tag-panel">
    <div class="interested-tags">
      <div class="interested-tag-header-container">
        {{ $t('g.myIntersetTags') }}
      </div>
      <v-divider />
      <div class="interested-tag-wrapper">
        <v-chip-group class="interested-tag-container" column>
          <v-chip
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
            variant="outlined"
            class="interest-tag"
            :prepend-icon="
              userInterestTags.length < maxUserTagNum
                ? 'mdi-plus-circle-outline'
                : 'mdi-minus-circle-outline'
            "
            @click="showAddUserInterestTagOverlay"
          >
            {{
              userInterestTags.length < maxUserTagNum
                ? $t('g.addNewTag')
                : $t('g.deleteTag')
            }}
          </v-chip>
        </v-chip-group>
      </div>
    </div>
    <div class="recommended-tags">
      <div class="interested-tag-header-container">
        {{ $t('g.myRecommendedTags') }}
      </div>
      <v-divider />
      <v-chip-group class="recommended-tag-container" column>
        <v-chip
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
    <div class="manager-tag-add-button-container">
      <v-btn
        v-if="user.priority <= 1"
        color="info"
        rounded
        style="width: 100%"
        @click="showNewTagPrompt()"
      >
        {{ $t('g.addNewTagToDDatabase') }}
      </v-btn>
      <newTagPrompt ref="newTagPrompt" />
      <v-btn
        v-if="user.priority <= 1"
        color="error"
        rounded
        style="width: 100%"
        @click="showDeleteTagOverlay()"
      >
        {{ $t('g.deleteTagFromDDatabase') }}
      </v-btn>
    </div>
  </div>
  <tagChooseOverlay
    ref="addUserInterestTagOverlay"
    :hideAfterAdd="false"
    :showTagContainer="true"
    :maxTagCount="maxUserTagNum"
    :allowRepeatTags="false"
    @confirm="updateUserInterestTags"
  >
    <template #title>
      {{ $t('common.tag_overlay.card_title_add') }}
    </template>
    <template #current-tags-tip>
      {{ $t('common.tag_overlay.current_tags') }}}
    </template>
  </tagChooseOverlay>
  <tagChooseOverlay
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
  </tagChooseOverlay>
  <floatingAlert ref="floatingAlert"></floatingAlert>
</template>

<script lang="ts" src="./src/InterestTagPanel.ts"></script>

<style lang="scss" scoped>
.interesting-tag-panel {
  font-family: 'Rubik', serif;
  font-optical-sizing: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  height: 100%;
  align-items: center;
}

.interested-tag-wrapper {
  width: auto;
}

.interested-tag-container,
.recommended-tag-container {
  min-height: 150px;
  flex-wrap: wrap;

  .interest-tag {
    opacity: 0.75;
    margin: 5px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 15px;
    height: 30px;
    min-width: 80px;
    border-radius: 15px;

    a {
      color: var(--text-color);
      text-decoration: none; /* 移除下划线 */
    }
    &:hover {
      cursor: pointer;
      backdrop-filter: blur(10px) brightness(90%);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2)
      );
    }
  }
}

.interested-tag-header-container {
  text-align: center;
  justify-content: center;
  line-height: 1.5em;
  margin-top: 10px;
  margin-bottom: 12px;
}

.interested-tags,
.recommended-tags {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.recommended-tag-container,
.interested-tag-container {
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
  justify-content: space-evenly;
  column-gap: 1px;
  row-gap: 1px;
}

.manager-tag-add-button-container {
  margin-top: 30px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.85;
}

.manager-tag-add-button-container > * {
  margin-bottom: 10px;
}
</style>
