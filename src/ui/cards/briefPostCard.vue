<template>
  <confirmDialog
    :title="confirmDialogAriticles.title"
    :subtitle="confirmDialogAriticles.subtitle"
    ref="confirmDialogArticles"
    @confirm="handleConfirmArticles"
  ></confirmDialog>
  <postBlogOverlay
    ref="postBlogOverlay"
    @publish-success="PublishSuccessCb"
  ></postBlogOverlay>
  <floatingAlert ref="floatingAlert"></floatingAlert>
  <div class="post-card-brief">
    <v-card class="post-card bg-background_smooth" ref="card">
      <div class="post-card-tab-container">
        <v-tabs
          v-model="post_card.tab_idx"
          class="post-card-tabs"
          slider-color="blue-darken-2"
          align-tabs="center"
          color="common_selected_tabs"
          show-arrows
        >
          <v-tab
            class="post-card-tab"
            v-for="(tab, index) in post_card.tabs"
            :key="index"
            :value="index"
          >
            <template #prepend>
              <v-icon v-if="!small_width_layout">
                {{ tab.icon }}
              </v-icon>
            </template>
            <div v-if="small_width_layout">
              <v-icon>{{ tab.icon }}</v-icon>
            </div>
            <div v-else>
              {{ $t(tab.titleKey) }}
            </div>
          </v-tab>
        </v-tabs>
        <v-tabs-window
          v-model="post_card.tab_idx"
          class="post-card-tabs-window"
        >
          <v-tabs-window-item
            class="brief-post-card-content"
            v-for="(tab, index) in post_card.tabs"
            :key="index"
            :value="index"
          >
            <briefIteratorList
              :is-visible="post_card.tab_idx === index"
              :items-per-page="5"
              :item-per-page-max="10"
              :items="tab.items"
              :items-length="tab.itemsLength"
              :showLimitationInfo="tab.limitation != undefined"
              :limitation-num="tab.limitation ?? undefined"
              :limitation-text-key="tab.limitationTextKey"
              :menus="tab.menus ?? undefined"
              @fetchData="tab.cb"
              class="brief-post-card-content-list"
            ></briefIteratorList>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" src="./src/briefPostCard.ts"></script>

<style lang="css" src="./styles/briefPostCard.css" scoped></style>
