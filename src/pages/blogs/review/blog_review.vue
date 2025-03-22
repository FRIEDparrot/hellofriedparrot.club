<template>
  <div class="blog-review">
    <readBlogPage :is-review="true"> </readBlogPage>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import readBlogPage from '@/pages/blogs/read/readBlog.vue';

export default defineComponent({
  name: 'BlogReview',
  components: {
    readBlogPage,
  },
});
</script>
