<template>
  <!-- isso comment system support -->
  <section id="isso-thread" v-pre>
    <noscript>Javascript needs to be activated to view comments.</noscript>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommentIsso',
  mounted() {
    // import isso script element
    const script = document.createElement('script');
    script.dataset.isso = 'http://127.0.0.1:9000/comments/';
    script.src = 'http://127.0.0.1:9000/comments/js/embed.min.js';
    document.body.appendChild(script);
  },
});
</script>

<style lang="scss">
@import '@/styles/base.css';

#isso-thread {
  .isso-textarea {
    background-color: var(--background-color-dimmed);
    border-color: var(--text-color-dimmed);
    color: var(--text-color);

    &:focus {
      border-color: var(--text-color-smooth);
    }
  }

  .isso-input-wrapper {
    margin-right: 0.5rem;
  }

  input {
    background-color: var(--background-color-dimmed);
    border-color: var(--text-color-dimmed);

    &:focus {
      border-color: var(--text-color-smooth);
    }
  }
}
</style>
