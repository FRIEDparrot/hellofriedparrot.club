<template>
  <!-- User Sidebar
        for guest, show login/signup buttons  
        for logged user, show user profile link, logout button 
        for manager and admin, show profile link, logout button, admin dashboard link 
    -->
  <div class="right-sidebar">
    <v-navigation-drawer
      location="right"
      v-model="drawer"
      :width="330"
      :class="absPos ? 'absolute-drawer' : ''"
      :style="{ zIndex: zIndex }"
      temporary
    >
      <div class="right-sidebar-header-container">
        <div class="right-sidebar-header-avatar-container">
          <userAvatar
            class="right-sidebar-avatar"
            color="var(--text-color-smooth)"
            :style="{
              borderColor: user.borderColor,
            }"
          >
          </userAvatar>
        </div>
        <div class="right-sidebar-header-user-info-container">
          <div class="right-sidebar-user-name">
            {{ user.name ?? $t('g.guestUser') }}
          </div>
          <v-card-subtitle class="right-sidebar-user-email">
            {{ user.email ?? '' }}
          </v-card-subtitle>
        </div>
        <div class="right-sidebar-header-close-btn-container">
          <v-btn
            icon
            variant="plain"
            class="right-sidebar-close-btn"
            @click="drawer = false"
          >
            <v-icon class="right-sidebar-close-icon">
              {{ 'mdi-close' }}
            </v-icon>
          </v-btn>
        </div>
      </div>

      <v-divider></v-divider>

      <div style="margin-top: 20px">
        <compactFolderList
          density="compact"
          :useUrlLink="true"
          :useTranslation="true"
          :items="profilePanelItems"
        ></compactFolderList>
      </div>

      <div class="right-sidebar-log-operation-panel">
        <v-btn
          class="right-sidebar-operation-btn"
          v-if="user.priority <= 4"
          color="error"
          @click="logout"
        >
          {{ $t('g.logout') }}
        </v-btn>
        <div v-else width="100%">
          <v-btn
            width="100%"
            color="primary"
            class="right-sidebar-operation-btn"
            @click="navigateTo($event, '/auth/login')"
          >
            {{ $t('g.login') }}
          </v-btn>
          <v-btn
            width="100%"
            color="secondary"
            class="right-sidebar-operation-btn"
            @click="navigateTo($event, '/auth/register')"
          >
            {{ $t('g.register') }}
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" src="./src/rightSidebarProfile.ts"></script>

<style lang="scss" scoped src="./styles/rightSidebarProfile.scss"></style>
