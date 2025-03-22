<template>
  <navbar_simple />
  <RulesLayout> </RulesLayout>
  <p>this is about page</p>

  <p>This page is under development. Please check back later.</p>
</template>

<!-- <p class="footer-text">
    <span>
        Developed by
        <a href="https://github.com/friedparrot" target="_blank">
            @friedparrot
        </a>
        at 2024.11
    </span>
</p>
<p>
    <router-link
        :to="{
            name: 'rules', // name in router
            params: {
                file_path: 'privacy_policy/cookie_policy',
            },
        }"
    >
        Cookie Policy
    </router-link>
</p>

<p>代理域名注册服务机构: 烟台帝思普网络科技有限公司(DNSPod)</p> -->

<script lang="ts">
import navbar_simple from '@components/nav/navbar_simple.vue';
import RulesLayout from '@/layout/RulesLayout.vue';

export default {
  name: 'AboutPage',
  components: {
    navbar_simple,
    RulesLayout,
  },
  methods: {},
};
</script>

<style scoped></style>
