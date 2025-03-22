<template>
  <div class="post-blog-overlay">
    <v-overlay v-model="showOverlay" class="overlay-content" persistent>
      <floatingAlert ref="floatingAlert" />
      <v-card class="elevation-12 blog-post-card" :disabled="disableCard">
        <div class="blog-post-card-content">
          <div class="overlay-title-container">
            <v-card-title class="overlay-title">
              {{ $t('common.post_blog_overlay.postBlog') }}
            </v-card-title>

            <v-icon class="close-icon" @click="handleCancel">
              {{ 'mdi-close' }}
            </v-icon>
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <div class="form-body">
              <div class="blog-form-title-container">
                <div class="blog-form-title">
                  {{ $t('common.post_blog_overlay.blogTitle') }}
                </div>
                <div class="blog-form-title-input">
                  <el-input
                    v-model="formData.title"
                    :placeholder="$t('blogs.create.titlePlaceholder')"
                    maxlength="30"
                    :show-word-limit="true"
                    clearable
                  ></el-input>
                </div>
              </div>

              <div class="tag-chooser-container">
                <div class="tag-chooser-title">
                  {{ $t('common.post_blog_overlay.tagChooserLabel') }}
                </div>
                <v-card variant="outlined" class="tag-chooser">
                  <div class="tag-chooser-content">
                    <interestTagGroup
                      :allow-modify="true"
                      :items="formData.tags"
                      :max="10"
                      @update:items="updateTags"
                    ></interestTagGroup>
                  </div>
                </v-card>
              </div>
              <div class="form-item mb-5">
                <label class="input-label">
                  <slot name="abstractLabel"> </slot>
                </label>
                <el-input
                  v-model="formData.abstract"
                  type="textarea"
                  :rows="4"
                  resize="none"
                  :placeholder="$t('blogs.create.abstractPlaceholder')"
                  :maxlength="200"
                  :show-word-limit="true"
                ></el-input>
              </div>

              <div class="form-item">
                <label class="input-label">
                  {{ $t('common.post_blog_overlay.bannerUrl') }}
                </label>
                <div class="image-preview-container">
                  <el-input
                    v-model="formData.bannerUrl"
                    :placeholder="
                      $t('common.post_blog_overlay.suppoortBannerUrl')
                    "
                  >
                    <template #prepend>
                      <el-button icon @click="uploadBannerImage">
                        <el-icon><Plus /></el-icon>
                      </el-button>
                    </template>
                  </el-input>
                </div>
              </div>
            </div>
            <v-divider class="mt-2 mb-2"></v-divider>
            <el-card variant="outlined" class="blog-overlay-overview">
              <v-img :src="safeBannerUrl"></v-img>
            </el-card>
          </v-card-text>

          <v-card-actions class="blog-overlay-actions">
            <el-button color="secondary" @click="handleCancel">
              {{ $t('g.cancel') }}
            </el-button>

            <div class="preview-type-container">
              <!-- <div class="preview-type-title">
                                {{
                                    $t(
                                        'common.post_blog_overlay.previewSelectLabel',
                                    )
                                }}
                            </div>
                            <el-select class="preview-type-select"> </el-select> -->
              <div>
                {{ $t('common.post_blog_overlay.previewOnlyImageSupport') }}
              </div>
            </div>

            <el-button color="primary" @click="publishDraft">
              {{ $t('g.postBlog') }}
            </el-button>
          </v-card-actions>
        </div>
      </v-card>
    </v-overlay>
  </div>
</template>

<script lang="ts" src="./src/postBlogOverlay.ts"></script>

<style lang="css" scoped src="./styles/postBlogOverlay.css"></style>
