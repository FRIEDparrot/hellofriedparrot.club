<template>
  <div class="brief-iterator-list">
    <div v-if="items.length === 0" class="no-data-text">
      {{ noDataText }}
    </div>
    <v-data-iterator
      v-else
      :items="items"
      :page="current_page"
      :items-per-page="useMaxPageSize ? itemsPerPageMax : itemsPerPage"
    >
      <template v-slot:default="{ items }">
        <v-list ref="list">
          <v-list-item
            class="brief-iterator-list-item"
            v-for="(item, idx) in items"
            :key="`list-item-${item.raw.link}-${idx}`"
            :to="item.raw.link"
          >
            <!--  -->
            <div class="brief-iterator-item-container">
              <div class="brief-iter-item-text-part">
                <v-list-item-title class="brief-iterator-list-item-title">
                  <div class="brief-iterator-list-item-title-text">
                    {{ item.raw.title }}
                  </div>
                  <div
                    class="status-tag-group ml-2"
                    v-if="item.raw.status !== undefined"
                  >
                    <el-tag type="success" v-if="item.raw.status === 2">
                      {{ $t('commmon.briefDataIterator.status.published') }}
                    </el-tag>
                    <el-tag type="warning" v-else-if="item.raw.status === 1">
                      {{ $t('commmon.briefDataIterator.status.reviewing') }}
                    </el-tag>
                    <el-tag type="danger" v-else-if="item.raw.status === 0">
                      {{ $t('commmon.briefDataIterator.status.rejected') }}
                    </el-tag>
                  </div>
                </v-list-item-title>

                <div class="brief-iter-item-tags-part">
                  <div>
                    <v-chip-group
                      v-if="item.raw.tags !== undefined"
                      @click.stop="handleChiplick($event)"
                      column
                    >
                      <v-chip
                        class="brief-iterator-item-tags"
                        color="info"
                        :size="'small'"
                        v-for="(tag, idx) in item.raw.tags.slice(0, 3)"
                        :key="idx"
                        variant="tonal"
                        :to="`/blogs?tag=` + tag.key"
                      >
                        {{ getTagTranslation(tag) }}
                      </v-chip>
                      <v-chip
                        icon
                        v-if="item.raw.tags.length > maxTagsDisplay"
                        class="brief-iterator-item-tags"
                        color="info"
                        :size="'small'"
                        variant="tonal"
                      >
                        <v-icon>
                          {{ 'mdi-dots-horizontal' }}
                        </v-icon>
                      </v-chip>
                    </v-chip-group>
                    <div
                      class="brief-iterator-list-author-info"
                      v-if="item.raw.author_name || item.raw.author_avatar"
                    >
                      <div class="brief-iterator-list-author-avatar">
                        <img
                          v-if="item.raw.author_avatar"
                          :src="item.raw.author_avatar"
                        />
                        <!--else use default avatar -->
                        <defaultAvatar v-else></defaultAvatar>
                      </div>
                      <div class="brief-iterator-list-author-name">
                        {{ item.raw.author_name }}
                      </div>
                    </div>
                  </div>
                  <div class="time-label-wrapper" v-if="showDate">
                    <div class="time-label" v-if="item.raw.datetime">
                      <span class="time-label-container">
                        <v-label v-if="item.raw.datetime_info_text">
                          {{ item.raw.datetime_info_text }}
                        </v-label>
                        <v-icon size="12" class="mr-1" v-else>
                          {{
                            item.raw.datetime_info_icon || 'mdi-clock-outline'
                          }}
                        </v-icon>
                        <v-label class="time-label-date">
                          {{ getTimeString(item.raw.datetime) }}
                        </v-label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="brief-iter-item-action-info-part">
                <div class="brief-iterator-item-menu-btn">
                  <v-menu
                    v-if="menus && menus.items.length > 0"
                    location="start"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        @click.native.stop="handleMenuToggleBtnClick($event)"
                        v-bind="props"
                        variant="text"
                        size="tiny"
                        icon="mdi-dots-horizontal"
                        class="pa-1"
                      >
                      </v-btn>
                    </template>
                    <v-list density="compact">
                      <div v-for="(m, idx) in menus.items" :key="idx">
                        <v-list-item
                          :to="m.url"
                          @click="handleMenuItemClick(m, item.raw)"
                        >
                          <template #prepend>
                            <div>
                              <v-icon>
                                {{ m.icon }}
                              </v-icon>
                            </div>
                          </template>
                          <span style="padding-left: 5px">
                            {{
                              useTranslation
                                ? $t(m.titleKey ?? 'no title')
                                : m.title
                            }}
                          </span>
                        </v-list-item>
                        <v-divider
                          v-if="idx < menus.items.length - 1"
                        ></v-divider>
                      </div>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:footer>
        <div class="brief-iterator-list-footer">
          <div class="page-info-banner" @click="jumpingPage = !jumpingPage">
            <Transition name="fade-right">
              <div v-if="!jumpingPage" class="current-page-show-banner">
                <v-btn
                  icon
                  class="page-switch-btn"
                  size="small"
                  variant="plain"
                  :disabled="current_page <= 1"
                  @click.stop="current_page -= 1"
                >
                  <v-icon>
                    {{ 'mdi-chevron-left' }}
                  </v-icon>
                </v-btn>
                {{
                  $t('commmon.brief-iterator-list.page-info', {
                    page: current_page,
                    pageCount: pageCount,
                  })
                }}
                <v-btn
                  icon
                  class="page-switch-btn"
                  size="small"
                  variant="plain"
                  :disabled="current_page >= pageCount"
                  @click.stop="current_page += 1"
                >
                  <v-icon>
                    {{ 'mdi-chevron-right' }}
                  </v-icon>
                </v-btn>
              </div>
              <div v-else class="jump-page-banner">
                {{ $t('commmon.brief-iterator-list.jumping-page') }}
                <el-input
                  @click.stop
                  size="small"
                  class="jump-page-input"
                  v-model="jumpPageText"
                  controls-position="right"
                  @keydown.enter="jumpToPage"
                >
                </el-input>
              </div>
            </Transition>
          </div>

          <div class="footer-right-part">
            <div class="limitation-info" v-if="showLimitationInfo">
              {{ limitationTextKey ? $t(limitationTextKey) : limitationText }}
              {{ itemsLength + ' / ' + limitationNum }}
            </div>
            <div
              class="page-limit-switcher"
              v-if="itemsPerPageMax > itemsPerPage"
            >
              <v-btn
                size="medium"
                variant="plain"
                icon
                @click="toggleMaxPageSize"
              >
                <v-icon>
                  {{ useMaxPageSize ? 'mdi-menu-up' : 'mdi-menu-down' }}
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </template>
    </v-data-iterator>
  </div>
</template>

<!-- @ts-ignore -->
<script lang="ts" src="./src/briefIteratorList.ts"></script>

<style lang="scss" src="./styles/briefIteratorList.scss" scoped></style>
