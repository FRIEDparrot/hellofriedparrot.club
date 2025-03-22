<template>
  <!--- Maximum 1 Layer groupList -->
  <v-list
    v-model:opened="open"
    :density="density"
    nav
    v-for="(item, index) in items"
    :key="index"
    class="compact-folder-list-container"
  >
    <v-list-group
      :value="openStates[index]"
      v-if="
        user.priority <= (item.priority ?? 999) &&
        item.child &&
        item.child.length > 0
      "
      class="bg-list_group"
    >
      <template v-slot:activator>
        <v-list-item
          color="list_selected"
          @click.prevent="openStates[index] = !openStates[index]"
          :prepend-icon="item.icon ?? undefined"
        >
          <v-list-item-title>
            <span v-if="useTranslation">
              {{ $t(item.titleKey ?? item.title ?? '') }}
            </span>
            <span v-else>{{ item.title }}</span>
          </v-list-item-title>
        </v-list-item>
      </template>
      <compactFolderList
        :useUrlLink="useUrlLink"
        :useCallback="useCallback"
        :useTranslation="useTranslation"
        :density="density"
        :items="item.child"
      ></compactFolderList>
    </v-list-group>

    <v-divider v-else-if="item.type === 'divider'"> </v-divider>
    <v-list-item
      size="small"
      v-else-if="user.priority <= (item.priority ?? 999)"
      :prepend-icon="item.icon ?? undefined"
      :to="useUrlLink ? item.url : undefined"
      @click="handleClick($event, item)"
    >
      <v-list-item-title>
        <span v-if="useTranslation">
          {{ $t(item.titleKey ?? item.title ?? '') }}
        </span>
        <span v-else>{{ item.title }}</span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" src="./src/compactFolderList.ts"></script>

<style lang="scss" scoped>
.compact-folder-list-container {
  padding: 0px 10px;
  margin: 0px auto;
}
.common-folder-list-container v-list-group {
  height: 20px;
}

.common-folder-list-container v-list-item {
  border-radius: 5px;
}
</style>
