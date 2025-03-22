<template>
  <div class="home-page-container">
    <leftSidebarColumns ref="leftSidebar" />
    <rightSidebarProfile ref="rightSidebar" :z-index="2000" />
    <navbar_welcome
      @toggle-right-sidebar="toggleRightSidebar()"
      @toggle-left-sidebar="toggleLeftSidebar()"
    />
    <div class="home-view-container">
      <!-- We use router-view to render the subpages based on the route -->
      <RouterView />
    </div>

    <div class="homepage-bottom-right-fab-container">
      <creationSpeedDial />
    </div>
    <footerbar_common :z-index="100" />
  </div>
</template>

<script lang="ts" src="./src/HomePage.ts"></script>

<style lang="css" src="./styles/HomePage.css"></style>
