<template>
    <floatingAlert ref="floatingAlert"></floatingAlert>
    <div class="edit-draft-page">
        <newBlogPage ref="blogPage">
            <template #title>
                {{ $t('blog.edit_draft') }}
            </template>
        </newBlogPage>
    </div>
</template>

<script lang="ts" src="./src/editDraft.ts"></script>
