<template>
  <div class="page-console-panel">
    <rightSidebarProfile
      ref="rightSidebar"
      :z-index="5000"
    ></rightSidebarProfile>
    <navbarSimple
      :showSupportBtn="false"
      :reloadTranslations="false"
      class="console-panel-navbar"
      style="z-index: 10"
    >
      <template v-slot:right-sidebar-toogle>
        <rightSidebarToggleBtn @toggle-right-sidebar="toggleRightSidebar" />
      </template>
      <template v-slot:title>
        {{ $t('g.console') }}
      </template>
    </navbarSimple>
    <leftSidebarBtnExpand
      style="
        background-color: var(--sidebar-iconbar-color);
        color: var(--dark-sidebar-icon);
      "
      density="comfortable"
      :items="leftSidebarItems"
      id="console-left-sidebar"
      :useTranslation="true"
    ></leftSidebarBtnExpand>

    <div class="console-panel-content">
      <RouterView></RouterView>
    </div>

    <div class="footer-bar-console-container">
      <footerbar_common :z-index="1000" />
    </div>
  </div>
</template>

<script lang="ts" src="./src/console.ts"></script>

<style lang="css" src="./styles/console.css"></style>
