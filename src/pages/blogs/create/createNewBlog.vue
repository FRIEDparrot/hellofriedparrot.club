<template>
    <div class="page-create-new-blog">
        <new-blog-page>
            <template #title>
                {{ $t('blogs.create.title') }}
            </template>
        </new-blog-page>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import newBlogPage from '@/pages/blogs/common/newBlogPage.vue';

export default defineComponent({
    name: 'CreateNewBlog',
    components: {
        newBlogPage,
    },
});
</script>

<style lang="css" scoped></style>
