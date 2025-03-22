<template>
  <div class="account-profile-page">
    <navbar_simple style="position: relative">
      <template #title>
        <div class="navbar-inner-title">
          {{ $t('g.accountProfile') }}
        </div>
      </template>
    </navbar_simple>
    <div class="account-profile-content">
      <div>
        The profile page haven't been developed yet, please come back later.
      </div>
      <div>个人信息功能当前暂未开放， 敬请期待</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import navbar_simple from '@/components/nav/navbar_simple.vue';

export default defineComponent({
  name: 'AccountProfilePage',
  components: {
    navbar_simple,
  },
});
</script>
