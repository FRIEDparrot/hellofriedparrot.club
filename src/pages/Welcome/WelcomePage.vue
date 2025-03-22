<template>
  <leftSidebarColumns
    ref="leftSidebar"
    style="z-index: 5000"
  ></leftSidebarColumns>
  <rightSidebarProfile
    ref="rightSidebar"
    style="z-index: 5000"
  ></rightSidebarProfile>
  <navbar_welcome
    ref="welcome_navbar"
    @toggleLeftSidebar="toggleLeftSidebar"
    @toggleRightSidebar="toggleRightSidebar"
  ></navbar_welcome>
  <interface_welcome ref="welcome_interface"></interface_welcome>
  <footerIndex></footerIndex>
</template>

<script lang="ts" src="./src/WelcomePage.ts"></script>

<style scoped></style>
