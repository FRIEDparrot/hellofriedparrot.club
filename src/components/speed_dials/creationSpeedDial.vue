<template>
  <div>
    <v-fab
      :color="open ? 'red' : 'primary'"
      location="top center"
      size="large"
      class="speed-dial-btn"
      icon
    >
      <v-icon size="34">{{ open ? 'mdi-close' : 'mdi-plus' }}</v-icon>

      <v-speed-dial
        v-model="open"
        location="top center"
        transition="slide-y-reverse-transition"
        activator="parent"
        style="margin-bottom: 40px"
        class="creation-speed-dial"
      >
        <!-- <div v-for="(item, index) in items" :key="index"> -->
        <v-btn
          v-for="(item, index) in items"
          :key="index"
          :color="item.color ?? 'primary'"
          icon
          :size="45"
        >
          <a :href="item.url" style="opacity: 1; color: white">
            <v-icon class="creation-speed-dial-icon">
              {{ item.icon ?? 'mdi-plus' }}
            </v-icon>
          </a>
        </v-btn>
        <!-- </div> -->
      </v-speed-dial>
    </v-fab>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'CreationSpeedDial',
  data() {
    return {
      user: {
        priority: store.state.user.priority, // normal user
      },
      open: false,
      items: [
        {
          icon: 'mdi-folder',
          color: 'blue',
          url: '/projects/create',
          priority_limit: 3,
        },
        {
          icon: 'mdi-upload',
          color: 'orange',
          url: '/resources/create',
          priority_limit: 3,
        },
        {
          icon: 'mdi-file-plus-outline',
          color: 'purple',
          url: '/columns/create',
          priority_limit: 4,
        },
        {
          icon: 'mdi-pencil',
          color: 'green',
          url: '/blogs/create',
          priority_limit: 4, // normal user can create blog
        },
      ],
    };
  },
  methods: {},
  mounted() {
    /** filter items based on user's priority level */
    this.items = this.items.filter(
      (item) => this.user.priority <= item.priority_limit,
    );
  },
});
</script>

<style lang="scss">
.speed-dial-btn {
  z-index: 50000;
}
</style>
