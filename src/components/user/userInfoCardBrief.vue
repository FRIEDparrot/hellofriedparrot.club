<template>
  <v-card class="user-profile-column bg-background_smooth elevation-4">
    <div class="user-profile-header-container">
      <div class="user-profile-column-avatar-border">
        <v-avatar class="user-avatar">
          <img
            v-if="currInfo.avatar"
            :src="currInfo.avatar"
            width="100%"
            height="100%"
            alt="Avatar"
          />
          <defaultAvatar width="100%" height="100%"></defaultAvatar>
        </v-avatar>
      </div>
      <div class="user-profile-column-name-container">
        <h2 class="user-profile-column-name" style="font-weight: bold">
          {{ currInfo.name }}
        </h2>
        <div class="user-profile-column-bio-container">
          {{ currInfo.bio }}
        </div>
      </div>
    </div>

    <div class="user-profile-column-content-container">
      <slot name="profile-panel-content">
        <div class="user-profile-column-content-item">
          <div class="user-profile-column-content-item-text">
            {{ $t('g.followsNumber') }}
          </div>
          <div class="user-profile-column-content-item-number">
            {{ currInfo.follows }}
          </div>
        </div>
        <v-divider vertical />
        <div class="user-profile-column-content-item">
          <div class="user-profile-column-content-item-text">
            {{ $t('g.followersNumber') }}
          </div>
          <div class="user-profile-column-content-item-number">
            {{ currInfo.followers }}
          </div>
        </div>
        <v-divider vertical />
        <div class="user-profile-column-content-item">
          <div class="user-profile-column-content-item-text">
            {{ $t('g.myPosts') }}
          </div>
          <div class="user-profile-column-content-item-number">
            {{ currInfo.blogsNum }}
          </div>
        </div>
      </slot>
    </div>
  </v-card>
</template>

<script lang="ts" src="./src/userInfoCardBrief.ts"></script>

<style lang="scss" scoped src="./styles/userInfoCardBrief.scss"></style>
