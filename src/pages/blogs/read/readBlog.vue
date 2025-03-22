<template>
  <div class="page-read-blog">
    <floatingAlert ref="floatingAlert" style="position: fixed"></floatingAlert>
    <navbar_welcome
      @toggle-left-sidebar="toggleLeftSidebar"
      @toggle-right-sidebar="toggleRightSidebar"
      :static-pos="false"
    >
    </navbar_welcome>
    <leftSidebarBtnContent
      ref="left_sidebar"
      class="elem-display-lessThanSuperWidth"
      :use-whole-drawer="true"
    >
      <template v-slot:contentPanel="{ selected }">
        <markdownOutline
          :title="$t('blog.outline')"
          :scroll-offset="-35"
          :headings="blogHeadings"
        ></markdownOutline>
      </template>
    </leftSidebarBtnContent>
    <rightSidebarProfile
      ref="right_sidebar"
      :absPos="true"
      :z-index="3000"
    ></rightSidebarProfile>

    <div class="blog-main-page-container bg-background_smooth">
      <div class="blog-left-panel-container">
        <div class="author-info-container">
          <userInfoCardBrief
            :use-self-profile="false"
            :info="authorInfo"
            class="author-info"
          ></userInfoCardBrief>
        </div>

        <div class="author-interest-tag-container">
          <div class="author-interest-tag-title">
            {{ $t('blog.authotInterestTagTitle') }}
          </div>
          <div class="author-interest-tag-wrapper">
            <v-chip-group
              class="author-interest-tag-chip-group"
              variant="outlined"
              column
            >
              <v-chip v-for="(tag, index) in authorInterestTags" :key="index">
                {{ getTagTranslation(tag) }}
              </v-chip>
            </v-chip-group>
          </div>

          <div class="operation-button-group">
            <v-btn
              :disabled="copybtn.disabled"
              :prepend-icon="copybtn.icon"
              outlined
              color="primary"
              @click="copyLink"
              rounded
            >
              {{ $t('blog.copyLink') }}
            </v-btn>

            <div
              v-if="user.priority <= 1"
              class="feature-article-button-container"
            >
              <v-btn
                :disabled="featurebtn.disabled"
                v-if="!blogData.featured"
                class="feature-article-button"
                color="warning"
                rounded
                @click="featureArticle(true)"
              >
                {{ $t('blog.featureArticle') }}
              </v-btn>
              <v-btn
                v-else
                :disabled="featurebtn.disabled"
                class="feature-article-button"
                color="error"
                rounded
                @click="featureArticle(false)"
              >
                {{ $t('blog.unFeatureArticle') }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- middle blog content panel -->
      <div class="blog-content">
        <div class="blog-content-wrapper">
          <div class="blog-title">
            <h1 class="blog-title-text">
              {{ blogData.title }}
            </h1>
          </div>

          <v-card
            class="blog-banner-image-container mb-5"
            v-if="isReview && blogData.bannerImage"
          >
            <img :src="blogData.bannerImage" alt="banner" />
          </v-card>

          <v-card variant="text" class="blog-abstract-container">
            <v-card-text class="blog-abstract-wrapper">
              <div class="blog-abstract-author">
                <div class="blog-abstract-author-info">
                  <div class="blog-abstract-author-info-avatar">
                    <img :src="authorProfile.avatar" alt="avatar" />
                  </div>
                  <div class="blog-abstract-author-intro">
                    <div class="blog-abstract-author-info-name">
                      {{ authorInfo.name }}
                    </div>
                    <div class="blog-abstract-author-info-bio">
                      {{ authorInfo.bio }}
                    </div>
                  </div>
                </div>
                <div class="blog-abstract-author-statistics">
                  <div class="author-statistics-item blogsNum">
                    {{ authorInfo.blogsNum }}
                    {{ $t('blog.blogsNum') }}
                  </div>
                  <v-divider class="mx-2" vertical></v-divider>
                  <div class="author-statistics-item follows">
                    {{ authorInfo.follows }}
                    {{ $t('blog.followsNum') }}
                  </div>
                  <v-divider class="mx-2" vertical></v-divider>
                  <div class="author-statistics-item followers">
                    {{ authorInfo.followers }}
                    {{ $t('blog.followersNum') }}
                  </div>
                </div>
              </div>

              <div v-if="blogData.abstract" class="blog-abstract-text">
                {{ blogData.abstract }}
              </div>

              <div class="blog-tags-container">
                <span class="blog-tags-title">
                  {{ $t('g.tags') + ' : ' }}
                </span>

                <span class="blog-tags" v-for="(tag, index) in blogData.tags">
                  <a :href="`/blogs?tag=${tag.key}`">
                    {{ getTagTranslation(tag) }}
                  </a>
                  <span v-if="index !== blogData.tags.length - 1">, </span>
                </span>
                <span
                  v-if="
                    blogData.tags === undefined || blogData.tags.length === 0
                  "
                >
                  {{ $t('blog.noTagLabel') }}
                </span>
              </div>
              <div class="blog-publish-time-container">
                <div class="blog-publish-time-title">
                  {{
                    $t('blog.publishTime') +
                    ' : ' +
                    getPreciseTimeStr(blogData.publishTime)
                  }}
                </div>
                <div
                  class="blog-last-modify-time-title"
                  v-if="blogData.lastModifyTime"
                >
                  {{
                    $t('blog.lastModifyTime') +
                    ' : ' +
                    getPreciseTimeStr(blogData.lastModifyTime)
                  }}
                </div>
              </div>

              <div class="blog-abstract-footer-container">
                <div class="blog-word-count-container">
                  <div>
                    <v-icon class="blog-word-count-icon" size="medium">
                      {{ 'mdi-file-word-box' }}
                    </v-icon>
                  </div>
                  <span class="blog-word-count-text">
                    {{ blogData.wordCount }}
                  </span>
                </div>
                <div class="blog-statistics-container">
                  <div class="blog-read-count-container">
                    <div class="blog-read-count-number">
                      {{ blogData.viewsNum }}
                    </div>
                    <div class="blog-read-count-text">
                      {{ $t('blog.readCount') }}
                    </div>
                  </div>

                  <div class="blog-star-count-container">
                    <div class="blog-star-count-number">
                      {{ blogData.starsNum }}
                    </div>
                    <div class="blog-star-count-text">
                      {{ $t('blog.starCount') }}
                    </div>
                  </div>

                  <div class="blog-comment-count-container">
                    <div class="blog-comment-count-number">
                      {{ blogData.commentsNum }}
                    </div>
                    <div class="blog-comment-count-title">
                      {{ $t('blog.commentCount') }}
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <v-divider></v-divider>

          <div class="blog-content-text-container">
            <div class="blog-content-md markdown-body">
              <div class="blog-content-text" v-html="blogContent"></div>
            </div>
          </div>
        </div>

        <v-divider class="my-5"> </v-divider>

        <div class="blog-comment-column-container" v-if="!isReview">
          <div class="blog-comment-column-title">
            {{ $t('blog.commentsTitleTemp') }}
          </div>

          <div class="blog-comment-container">
            <comment_isso></comment_isso>
          </div>
        </div>
      </div>

      <div class="blog-outline-container">
        <markdownOutline
          class="blog-outline"
          :title="$t('blog.outline')"
          :scroll-offset="-35"
          :headings="blogHeadings"
        ></markdownOutline>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./src/readBlog.ts"></script>

<style lang="scss" src="./styles/readBlog.scss" scoped></style>

<style lang="scss">
@use '@/styles/markdown/md_theme_default.scss' as md;

.markdown-body {
  .md-heading a {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      scroll-margin-top: 60px; /* top bar height 60px for scroll */
    }
  }
}
</style>
