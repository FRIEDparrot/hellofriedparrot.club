<template>
  <div class="page-profile">
    <navbar_simple style="position: relative">
      <template #title>
        <div class="navbar-inner-title">
          {{ $t('g.profile') }}
        </div>
      </template>
    </navbar_simple>
    <div>
      The profile page haven't been developed yet, please come back later.
    </div>
    <div>个人信息功能当前暂未开放， 敬请期待</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import navbar_simple from '@/components/nav/navbar_simple.vue';

export default defineComponent({
  name: 'ProfilePage',
  components: {
    navbar_simple,
  },
  setup() {
    return {};
  },
});
</script>
