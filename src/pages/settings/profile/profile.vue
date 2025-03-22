<template>
  <div class="page-settings-profile">
    <navbar_simple />
    <h1>Profile</h1>
    <p>This is the profile page of the Fried Parrot Club.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import navbar_simple from '@/components/nav/navbar_simple.vue';
export default defineComponent({
  name: 'PageSettingsProfile',
  components: {
    navbar_simple,
  },
});
</script>
