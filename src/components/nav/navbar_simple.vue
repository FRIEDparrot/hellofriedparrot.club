<template>
  <!-- This is simple navbar, 
     1. quickly return home page 
     2. direct to the current user's profile page
     3. toggle dark mode
     4. About us page (Contact us)

    this navbar not provide : 
    1. search bar 
    2. login/register button 
    3. notification/message icon 
    4. dropdown menu 
-->
  <v-app-bar class="navbar-simple">
    <div v-if="leftToggleVisible">
      <slot name="left-sidebar-toogle"></slot>
    </div>
    <slot name="sidebar-left-items"> </slot>
    <HomeBtn></HomeBtn>

    <div class="navbar-inner-title">
      <slot name="title">simple navbar</slot>
    </div>
    <DarkModeToggleBtn></DarkModeToggleBtn>
    <TranslateBtn :fullReload="reloadTranslations"></TranslateBtn>
    <slot name="sidebar-right-items"></slot>
    <div v-if="showSupportBtn">
      <v-divider vertical class="ml-5 mr-0" color="white"></v-divider>

      <v-btn
        href="/support"
        height="60%"
        class="mr-5"
        outlined
        style="
          color: var(--navbar-special-color);
          font-size: 16px;
          border-width: 2px;
          border-radius: 5px;
          border-color: var(--navbar-special-color);
        "
      >
        {{ $t('g.Support') }}
      </v-btn>
    </div>

    <div v-if="rightToggleVisible">
      <slot name="right-sidebar-toogle"></slot>
    </div>
  </v-app-bar>
</template>

<script lang="ts" src="./src/navbar_simple.ts"></script>

<style lang="scss" src="./styles/navbar_simple.scss" scoped></style>
