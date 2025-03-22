<template>
  <v-list class="bg-background_smooth">
    <div v-for="(item, index) in items" :key="index">
      <v-divider v-if="item.type === 'divider'"></v-divider>
      <v-list-subheader v-else-if="item.type === 'subheader'">
        {{ $t(item.titleKey ?? '') }}
      </v-list-subheader>
      <v-list-item
        v-else-if="user.priority <= (item.priority ?? 5)"
        :title="$t(item.titleKey ?? '') ?? ''"
        :disabled="item.disabled ?? false"
        @click="handleClick($event, item)"
      >
        <template v-slot:prepend>
          <v-badge
            v-if="item.badge === true"
            :color="badageColor"
            :content="item.badgeContent ?? ''"
            overlap
          >
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-badge>
          <v-icon v-else>
            {{ item.icon }}
          </v-icon>
        </template>
      </v-list-item>
    </div>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import { IstdMenuItem } from '@/interface/iterators/stdMenuList';

export default defineComponent({
  name: 'ClickIconList',
  data() {
    return {
      user: {
        priority: store.state.user.priority,
      },
    };
  },
  props: {
    items: {
      type: Array as () => IstdMenuItem[],
      required: true,
    },
    badageColor: {
      type: String,
      default: 'red',
    },
  },
  methods: {
    handleClick(event, item) {
      if (item.callback) {
        item.callback(event);
      }
    },
  },
});
</script>
