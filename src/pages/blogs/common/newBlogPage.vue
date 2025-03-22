<template>
  <div class="new-blog-page">
    <floatingAlert ref="floatingAlert" style="z-index: 10000"></floatingAlert>
    <postBlogOverlay
      ref="postBlogOverlay"
      @publish-success="handlePublishSuccess"
      style="z-index: 2000"
    >
    </postBlogOverlay>
    <tagChooseOverlay
      ref="tagChooseOverlay"
      :max-tag-count="10"
      :show-tag-container="true"
      :allow-repeat-tags="false"
      @confirm="confirmNewTag"
    >
      <template #title>
        {{ $t('common.tag_overlay.card_title_add') }}
      </template>
    </tagChooseOverlay>
    <rightSidebarProfile
      style="z-index: 2000"
      ref="rightSidebar"
    ></rightSidebarProfile>
    <navibarSimple :showSupportBtn="false" :reloadTranslations="false">
      <template #sidebar-left-items>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70%;
          "
        >
          <parrotLogoBtn />
        </div>
      </template>
      <template #title>
        <slot name="title"> Title Slot </slot>
      </template>
      <template #sidebar-right-items>
        <navUserAvatarPrompt></navUserAvatarPrompt>
      </template>
      <template #right-sidebar-toogle>
        <rightSidebarToggleBtn
          @toggle-right-sidebar="toggleRightSidebar"
        ></rightSidebarToggleBtn>
      </template>
    </navibarSimple>

    <div class="new-blog-page-main">
      <div class="blog-view-container">
        <div class="blog-content-input-left">
          <ElInput
            v-model="title"
            :placeholder="$t('blogs.create.titlePlaceholder')"
            size="large"
            class="blog-input-title"
            plain
            maxlength="30"
            :show-word-limit="true"
          ></ElInput>
          <ElInput
            v-model="content"
            :rows="34"
            type="textarea"
            class="blog-input-content"
            :show-word-limit="true"
            maxlength="50000"
            resize="none"
            @keydown="handleMarkdownInputKeyDown($event)"
            :placeholder="$t('blogs.create.contentPlaceholder')"
          >
          </ElInput>
        </div>
        <div class="blog-content-preview-right">
          <v-card class="blog-content-markdown-display-card" variant="outlined">
            <div class="blog-content-markdown-display-card-title">
              {{ title }}
            </div>

            <div class="blog-content-markdown-container">
              <v-label v-if="content === '' && title === ''" variant="plain">
                {{ $t('blogs.create.contentEmptyPlaceholder') }}
              </v-label>
              <div class="markdown-body" v-html="markdownContent"></div>
            </div>
          </v-card>
        </div>
      </div>
      <div class="blog-view-footer">
        <ElButton
          :validate-trigger="true"
          :type="showPreview ? 'info' : 'primary'"
          class="preview-btn"
          plain
          @click="showPreviewContent(!showPreview)"
        >
          {{
            showPreview
              ? $t('blogs.create.hidePreview')
              : $t('blogs.create.showPreview')
          }}
        </ElButton>

        <ElInputTag
          @change="filterTags()"
          v-model="articleTagsArr"
          :disabled="tagIsLoading"
          :placeholder="$t('blogs.create.tagsPlaceholder')"
          style="
            overflow-x: auto;
            white-space: nowrap;
            display: flex;
            flex-wrap: nowrap;
          "
          draggable
          :max="10"
        >
          <template #suffix>
            <ElButton size="small" @click="showTagSelect()">
              <ElIcon>
                <Search class="create-new-blog-tag-search-icon" />
              </ElIcon>
            </ElButton>
          </template>
        </ElInputTag>

        <div style="min-width: 140px">
          <ElSelect
            v-model="theme"
            class="blog-select-theme"
            :placeholder="$t('blogs.create.theme.default')"
          >
            <ElOption :value="$t('blogs.create.theme.default')">
              {{ $t('blogs.create.theme.default') }}
            </ElOption>
          </ElSelect>
        </div>
        <div style="display: flex; justify-content: flex-end">
          <div>
            <ElButton @click="saveAsDraft">
              {{ $t('blogs.create.saveDraftBtn') }}
            </ElButton>
          </div>
          <div>
            <ElButton
              type="primary"
              style="color: white"
              @click="showPostBlogOverlay"
            >
              {{ $t('blogs.create.publishBtn') }}
            </ElButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./src/newBlogPage.ts"></script>

<style lang="css" scoped src="./styles/newBlogPage.css"></style>

<style lang="scss">
@use '@/styles/markdown/md_theme_default.scss' as md;

body::-webkit-scrollbar {
  width: 0 !important; /* Chrome/Safari */
  display: none; /* Firefox */
}
</style>
