<template>
  <div class="page-blog-index">
    <navbar_welcome
      @toggle-left-sidebar="toggleLeftSidebar"
      @toggle-right-sidebar="toggleRightSidebar"
    ></navbar_welcome>
    <leftSidebarColumns ref="leftSidebarColumns"> </leftSidebarColumns>
    <rightSidebarProfile ref="rightSidebarProfile"> </rightSidebarProfile>
    <div class="blog-page-main-container">
      <div class="blog-main-container">
        <blog_iterator_main :items-per-page="5"></blog_iterator_main>
      </div>
    </div>
  </div>
  <footerbar_common></footerbar_common>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import navbar_welcome from '@/components/nav/navbar_welcome.vue';
import blog_iterator_main from '@/ui/blog_iterators/blog_iterator_main.vue';
import footerbar_common from '@/components/footer/footerbar_common.vue';
import leftSidebarColumns from '@/components/sidebar/leftSidebarColumns.vue';
import rightSidebarProfile from '@/components/sidebar/rightSidebarProfile.vue';

export default defineComponent({
  name: 'PageBlogIndex',
  components: {
    navbar_welcome,
    blog_iterator_main,
    footerbar_common,
    leftSidebarColumns,
    rightSidebarProfile,
  },
  methods: {
    // load_search_params() {
    //   // get the search params from the url and set them in the component data
    //   const searchParams = new URLSearchParams(window.location.search);
    // },

    toggleLeftSidebar() {
      const leftSidebar = this.$refs.leftSidebarColumns as any;
      leftSidebar.toggle();
    },
    toggleRightSidebar() {
      const rightSidebar = this.$refs.rightSidebarProfile as any;
      rightSidebar.toggle();
    },
  },
  mounted() {},
});
</script>

<style lang="scss" scoped>
@import '@/styles/base.css';

$navbar-height: 65px;
.blog-page-main-container {
  background-color: var(--background-color-dimmed);
  min-height: calc(100vh - #{$navbar-height});
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .blog-main-container {
    width: 100%;
    max-width: calc(min(1100px, 100%));
    padding: 0 20px;
  }
}
</style>
