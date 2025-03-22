<template>
  <div class="markdown-outline">
    <div v-if="title !== ''">
      <v-toolbar :class="titleClass" height="60px" width="100%">
        <div class="markdown-outline-title">
          <v-btn size="55px" icon="mdi-menu" variant="text"></v-btn>
          <v-toolbar-title class="headline">
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </div>
      </v-toolbar>
    </div>
    <v-list
      :lines="false"
      v-model:opened="open"
      style="background-color: var(--sidebar-list-bg-light)"
      :style="
        title
          ? {
              'max-height': `calc(100vh - ${headingOffset}px)`,
              'overflow-y': 'auto',
            }
          : {}
      "
      density="default"
    >
      <div v-for="(item, index) in renderHeadings" :key="index">
        <v-list-group v-if="canCollapseArr[index]" :value="TitleOpened[index]">
          <template v-slot:activator="{ props }">
            <v-list-item class="outline-item" :value="TitleOpened[index]">
              <template v-slot:prepend>
                <!-- clickable prepend icon -->
                <div @click="TitleOpened[index] = !TitleOpened[index]">
                  <v-icon
                    class="outline-prepend-icon"
                    v-if="TitleOpened[index]"
                    small
                  >
                    {{ 'mdi-chevron-down' }}
                  </v-icon>
                  <v-icon class="outline-prepend-icon" v-else small>
                    {{ 'mdi-chevron-right' }}
                  </v-icon>
                </div>
              </template>
              <template v-slot:append>
                <div
                  class="outline-level"
                  v-if="showOutlineLevel && item.level"
                >
                  {{ '#' + item.level }}
                </div>
              </template>
              <v-list-item-title
                class="outline-title"
                @click="scrollToSection(item.id)"
              >
                <div
                  class="outline-title-text"
                  :style="{
                    paddingLeft: `calc(${item.level * outlineLevelOffset}px + 10px)`,
                  }"
                >
                  {{ item.title }}
                </div>
              </v-list-item-title>
            </v-list-item>
          </template>

          <!-- recursive rendering of subheadings, scrollOffest is consistent -->
          <MarkdownOutline
            :scrollOffset="scrollOffset"
            v-if="item.subHeadings"
            title=""
            :headings="item.subHeadings"
          ></MarkdownOutline>
        </v-list-group>
        <!-- else render a normal list item -->
        <v-list-item
          v-else
          :key="index"
          class="outline-item"
          @click="scrollToSection(item.id)"
        >
          <v-list-item-title class="outline-title">
            <div
              class="outline-title-text"
              :style="{
                paddingLeft: `calc(${item.level * outlineLevelOffset}px + 10px)`,
              }"
            >
              {{ item.title }}
            </div>
          </v-list-item-title>

          <template v-slot:append>
            <div class="outline-level" v-if="showOutlineLevel && item.level">
              {{ '#' + item.level }}
            </div>
          </template>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts" src="./src/markdownOutline.ts"></script>

<style scoped lang="scss" src="./styles/markdownOutline.scss"></style>
