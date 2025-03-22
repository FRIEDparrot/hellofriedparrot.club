<template>
  <div class="rules-layout">
    <div class="rules-panel-navbar">
      <slot name="navbar"></slot>
    </div>
    <div class="rules-left-sidebar" id="rules-left-sidebar">
      <slot name="left-sidebar"></slot>
    </div>
    <div class="rules-right-sidebar" id="rules-right-sidebar">
      <slot name="right-sidebar"></slot>
    </div>
    <div class="rules-panel-container">
      <div class="folder-view-panel" id="folder-panel">
        <slot name="folder-panel"></slot>
      </div>
      <div class="rules-panel markdown-body" id="rules-content">
        <div class="markdown-body">
          <slot name="main"></slot>
        </div>
      </div>
      <div class="rules-panel-outliner" id="rules-outliner">
        <div class="rules-panel-outliner-content">
          <slot name="outliner">Test</slot>
        </div>
      </div>
    </div>
    <div class="rules-panel-footer" id="rules-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { renderCodeBlocks } from '@/utils/markdown';
import { scrollUpWithItem } from '@/hooks/ui/scrollHandler';

export default defineComponent({
  name: 'RulesLayout',
  components: {},
  setup() {
    return {};
  },
  methods: {
    scrollSidePanel() {
      scrollUpWithItem(
        [
          'rules-outliner',
          'folder-panel',
          'rules-left-sidebar',
          'rules-right-sidebar',
        ],
        'rules-footer',
      );
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollSidePanel);
    window.addEventListener('resize', this.scrollSidePanel);
    nextTick(() => {
      renderCodeBlocks;
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollSidePanel);
    window.removeEventListener('resize', this.scrollSidePanel);
  },
});
</script>

<style lang="scss">
@use '@/styles/markdown/md_theme_default.scss' as md;
@import '@/styles/themes/github-markdown.css';

.markdown-body {
  .md-heading a {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      scroll-margin-top: 65px; /* top bar height 60px for scroll */
    }
  }
}

.rules-left-sidebar {
  display: flex;
  bottom: 0;
  z-index: 5;
}

.rules-panel-navbar {
  top: 0;
  position: relative;
  width: 100%;
  right: 0;
  z-index: 10;
}

.rules-panel-container {
  display: flex;
}

.rules-panel {
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
}

.folder-view-panel {
  position: fixed;
  width: 350px;
  left: 0;
  background-color: var(--sidebar-list-bg-color);
  bottom: 0;
  height: calc(100vh - 65px); /* 65px is navbar height */
  overflow-y: auto; /* the panel should be uniquely scrollable */
}

.rules-panel-outliner {
  position: fixed;
  right: 0;
  width: 360px;
  bottom: 0;
  background-color: var(--sidebar-list-bg-light);
  height: calc(100vh - 65px); /* 65px is navbar height */
  /* the panel should be uniquely scrollable */
  z-index: 5;
}

.rules-panel-outliner-content {
  z-index: 5 !important;
}

.rules-panel-footer {
  width: 100%;
  bottom: 0;
  margin-left: 66px; /* 66px is left sidebar width */
  /* should be higher than content */
}

@media (max-width: 768px) {
  .rules-panel-outliner {
    display: none;
  }
  .folder-view-panel {
    display: none;
  }
  .rules-panel {
    display: flex;
    max-width: calc(100vh - 66px);
    margin-left: 66px;
    margin-right: 0;
  }
}

@media (min-width: 768px) {
  .rules-panel-outliner {
    display: block;
    width: 30%;
  }
  .folder-view-panel {
    display: none;
  }
  .rules-panel {
    margin-left: 66px;
    margin-right: 30%;
  }
}

@media (min-width: 1400px) {
  .rules-left-sidebar {
    display: none;
  }
  .rules-panel-outliner {
    max-width: 360px;
  }
  .rules-panel {
    margin-left: 350px;
    margin-right: 360px;
  }
  .folder-view-panel {
    display: block;
  }
  .rules-panel-footer {
    margin-left: 0px;
  }
}
</style>
