<template>
  <v-app-bar
    :height="60"
    class="navbar"
    scroll-behavior="scrollBehavior"
    scroll-threshold="scrollThreshold"
    :style="staticPos ? { position: 'static' } : { position: 'fixed' }"
  >
    <v-btn
      icon
      variant="plain"
      v-if="showLeftSidebarToggle"
      @click="toggleLeftSidebar()"
      border-radius="0px"
      class="elem-display-lessThanSuperWidth sidebar-toggle-left"
    >
      <img src="@imgs/ui/sidebar-left.svg" alt="left-sidebar" height="50px" />
    </v-btn>

    <div
      v-if="showLogo"
      class="nav-logo-container"
      :class="{ 'force-display': alwaysShowLogo }"
    >
      <div class="nav-logo-img-container">
        <parrotLogoBtn style="height: 100%" />
      </div>
    </div>

    <slot name="navbarPrepend"></slot>

    <div class="elem-display-lessThanSuperWidth" id="nav-title">
      <span>{{ $t('g.friedParrotClub') }}</span>
    </div>

    <div class="elem-display-superMaxWidth" id="nav-padding-left"></div>
    <div class="elem-display-superMaxWidth" id="nav-items-topbar">
      <v-menu
        class="nav-item elem-display-superMaxWidth"
        v-for="(item, index) in columns"
      >
        <template v-slot:activator="{ props }">
          <!-- !TODO: @click.double="window.location.href = item.url" -->
          <v-btn
            class="nav-items-btn"
            variant="text"
            :key="index"
            width="20%"
            height="100%"
            v-bind="props"
            :to="item.url ?? '#'"
          >
            {{ $t(item.titleKey) }}
            <!-- <template v-slot:prepend>
              <v-icon class="nav-arrow" :id="'nav-arrow-icon' + index">
                {{ 'mdi-chevron-right' }}
              </v-icon>
            </template> -->
          </v-btn>
        </template>
        <!-- <v-list v-for="(child, subindex) in item.child">
          <v-list-item-title>
            {{ $t(child.titleKey) }}
          </v-list-item-title>
        </v-list> -->
      </v-menu>
    </div>
    <div class="elem-display-superMaxWidth" id="nav-padding-right"></div>

    <div class="nav-user-panel">
      <DarkModeToggleBtn />
      <translateBtn :fullReload="false"></translateBtn>
      <div class="elem-display-middlewidth nav-user-welcome-message mx-2">
        <h3>
          <b>{{
            $t('welcome.nav-items.welcome-usr', {
              name: user_info.name ?? $t('g.guestUser'),
            })
          }}</b>
        </h3>
      </div>
      <navUserAvatarPrompt />
      <rightSidebarToggleBtn
        class="sidebar-toggle-right"
        v-if="showRightSidebarToggle"
        border-radius="0px"
        @toggle-right-sidebar="toggleRightSidebar()"
      />
    </div>
  </v-app-bar>
</template>

<script lang="ts" src="./src/navbar_welcome.ts"></script>

<style lang="scss" src="./styles/navbar_welcome.scss" scoped></style>
