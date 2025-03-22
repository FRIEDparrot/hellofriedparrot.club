<template>
  <div class="page-main-settings">
    <navbar_simple :reload-translations="false"></navbar_simple>
    Settings Page
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import navbar_simple from '@/components/nav/navbar_simple.vue';

export default defineComponent({
  name: 'PageMainSettings',
  components: {
    navbar_simple,
  },
});
</script>

<style lang="scss" scoped></style>
