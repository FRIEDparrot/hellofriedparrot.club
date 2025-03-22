<template>
  <div class="blog-iterator-main">
    <!-- <detailedIteratorList :items="items" :items-per-page="itemsPerPage"> -->
    <div class="no-data-placeholder" v-if="items.length === 0">
      <v-card border variant="tonal" class="iterator-item-card" :elevation="4">
        <div class="iterator-item-container">
          <div class="blog-no-data-text">
            <v-icon>
              {{ 'mdi-newspaper-variant-multiple' }}
            </v-icon>
            {{ $t('common.detailedIteratorList.nodDataText') }}
          </div>
        </div>
      </v-card>
    </div>
    <div class="loader-container">
      <v-data-iterator
        v-if="items.length > 0"
        :items="items"
        :items-per-page="itemsPerPage"
        :page.sync="current_page"
        class="my-4"
      >
        <template #default="{ items }">
          <div
            class="iterator-item-card-container"
            v-for="(item, idx) in items"
            :key="idx"
          >
            <div class="iterator-item-featured-banner" v-if="item.raw.featured">
              <!-- <img src="@/assets/imgs/ui/blog_featured_banner.svg" /> -->
              <blog_featured_banner
                class="featured-banner"
                color="var(--iterator-featured-fill-color)"
                stroke-color="var(--iterator-featured-stroke-color)"
              />
              <div class="featured-banner-text">
                {{ $t('common.ui.blog_iterator_main.featuredBannerText') }}
              </div>
            </div>
            <v-card class="iterator-item-card elevation-2">
              <div
                class="iterator-item-container"
                @mouseenter="handlerItemMouseEnter($event)"
                @mouseleave="handlerItemMouseLeave($event)"
                @click="redirectTo($event, '/blogs/' + item.raw.uuid)"
              >
                <div
                  class="iterator-user-info-container"
                  @mouseenter="handlerUserInfoMouseEnter($event)"
                  @mouseleave="handlerUserInfoMouseLeave($event)"
                  @click.stop="
                    redirectTo($event, '/profile/' + item.raw.authorId)
                  "
                >
                  <div class="iterator-user-information">
                    <div class="iterator-user-avatar">
                      <img
                        v-if="item.raw.authorAvatar"
                        :src="item.raw.authorAvatar"
                        class="iterator-user-avatar-image"
                        alt="avatar"
                      />
                      <defaultAvatar v-else />
                    </div>
                    <div class="iterator-avatar-text-container">
                      <div class="iterator-user-name">
                        {{ item.raw.authorName }}
                      </div>
                      <div class="iterator-item-last-update-time">
                        <slot name="time-text">
                          {{ $t('common.detailedIteratorList.timeText') }}
                        </slot>
                        {{ formatedTimeDeltaDisplay(item.raw.lastModifyTime) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="iterator-item-content-container">
                  <v-card-text class="iterator-item-text">
                    <div class="iterator-item-content">
                      <div>
                        <div class="iterator-item-title">
                          <v-card-title class="iterator-item-title-text">
                            {{ item.raw.title }}
                          </v-card-title>
                        </div>
                        <div class="iterator-item-description">
                          <v-card-subtitle
                            class="iterator-item-description-text"
                          >
                            {{ item.raw.abstract }}
                          </v-card-subtitle>
                        </div>
                      </div>
                      <div class="iterator-main-content-bottom">
                        <div class="iterator-item-tags" @click.stop>
                          <div class="iterator-item-tags-title">
                            {{ $t('g.tags') + ' : ' }}
                          </div>
                          <div class="iterator-item-tags-no-tags-text">
                            <slot
                              name="no-tags-text"
                              v-if="item.raw.tags.length === 0"
                            >
                              {{
                                $t('common.ui.blog_iterator_main.noTagsText')
                              }}
                            </slot>
                          </div>
                          <v-chip
                            v-for="(tag, idx) in item.raw.tags"
                            :key="idx"
                            size="small"
                            variant="outlined"
                            :to="'/blogs?tag=' + tag.key"
                            class="iterator-item-tag"
                          >
                            {{ getTagTranslation(tag) }}
                          </v-chip>
                        </div>
                        <div
                          class="iterator-item-statics-container vert-center"
                        >
                          <div class="iterator-item-statics vert-center">
                            <div class="iterator-item-views">
                              <v-icon class="mr-1">
                                {{
                                  item.raw.viewsNum < 1000
                                    ? 'mdi-eye'
                                    : 'mdi-fire'
                                }}
                              </v-icon>
                              {{
                                item.raw.viewsNum < 1000
                                  ? item.raw.viewsNum
                                  : (item.raw.viewsNum / 1000).toFixed(1) + 'k'
                              }}
                            </div>
                            <div>
                              <v-icon class="mr-1">
                                {{ 'mdi-star' }}
                              </v-icon>
                              {{
                                item.raw.starsNum < 1000
                                  ? item.raw.starsNum
                                  : (item.raw.starsNum / 1000).toFixed(1) + 'k'
                              }}
                            </div>

                            <div class="iterator-item-read-time vert-center">
                              <v-icon class="mr-1">
                                {{
                                  item.raw.wordCount < 5000
                                    ? 'mdi-clock'
                                    : 'mdi-file-word-box'
                                }}
                              </v-icon>

                              <div>
                                {{
                                  item.raw.wordCount < 250
                                    ? $t(
                                        'common.ui.blog_iterator_main.readTime.lessThan1Minute',
                                      )
                                    : item.raw.wordCount < 5000
                                      ? $t(
                                          'common.ui.blog_iterator_main.readTime.readTimeText',
                                          {
                                            minutes: Math.ceil(
                                              item.raw.wordCount / 300,
                                            ),
                                          },
                                        )
                                      : (item.raw.wordCount / 1000).toFixed(1) +
                                        'k'
                                }}
                              </div>
                            </div>
                            <div class="iterator-item-publish-time vert-center">
                              <v-icon class="mr-1">
                                {{ 'mdi-calendar-text' }}
                              </v-icon>
                              {{
                                formatedPublishTimeDispay(item.raw.publishTime)
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </div>
                <div
                  class="iterator-banner-container"
                  v-if="item.raw.bannerImage"
                >
                  <div class="iterator-banner-image">
                    <img :src="item.raw.bannerImage" />
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </template>
        <template #footer>
          <v-pagination
            v-model="current_page"
            :length="Math.ceil(count / itemsPerPage)"
            class="my-4"
          ></v-pagination>
        </template>
      </v-data-iterator>
    </div>
    <!-- <template #footer-pagination>
            
        </template> -->
    <!-- </detailedIteratorList> -->
  </div>
</template>

<script lang="ts" src="./src/blog_iterator_main.ts"></script>

<style lang="scss" scoped src="./styles/blog_iterator_main.scss"></style>
