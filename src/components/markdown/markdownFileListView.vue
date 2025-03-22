<template>
  <div v-if="header !== ''">
    <v-toolbar class="bg-sidebar_heading_deep" height="55px" width="100%">
      <v-btn
        icon="mdi-view-dashboard"
        size="55px"
        style="margin-right: 0px"
      ></v-btn>
      <v-toolbar-title style="font-size: larger">
        {{ header }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
  </div>
  <v-list dense class="file-list-view">
    <div v-for="(item, index) in directory" :key="index">
      <v-list-item
        class="sidebar-item"
        v-if="item.type === 'file'"
        @click="handleClick($event, item.url)"
        dense
      >
        <template v-slot:prepend>
          <v-icon v-if="item.icon != null">{{ item.icon }} </v-icon>
          <v-icon v-else color="gray">{{ 'mdi-file-document' }}</v-icon>
        </template>
        <v-list-item-title class="ml-2">
          {{ item.t }}
        </v-list-item-title>
      </v-list-item>

      <v-list-group v-if="item.type === 'folder'" class="sidebar-list">
        <template v-slot:activator="{ props }">
          <v-list-item
            color="list_selected"
            v-bind="props"
            :title="item.t"
            prepend-icon="mdi-dots-vertical"
          >
          </v-list-item>
        </template>
        <markdownFileListView
          :directory="item.d"
          header=""
        ></markdownFileListView>
      </v-list-group>
    </div>
  </v-list>
</template>

<script lang="ts" src="./src/markdownFileListView.ts"></script>

<style scoped lang="scss">
.file-list-view {
  background-color: var(--sidebar-list-bg-color);
}

.sidebar-item {
  background-color: var(--sidebar-item-bg-color);
}

.sidebar-list {
  background-color: var(--sidebar-list-bg-color);
}
</style>
