<template>
  <v-btn
    icon
    variant="plain"
    @click="toggleRightSidebar()"
    border-radius="0px"
    style="margin-right: 10px; margin-left: 10px"
  >
    <img src="@imgs/ui/sidebar-right.svg" alt="right-sidebar" height="50px" />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeftSidebarToggleBtn',
  emits: ['toggle-right-sidebar'],
  methods: {
    toggleRightSidebar() {
      this.$emit('toggle-right-sidebar');
    },
  },
});
</script>
