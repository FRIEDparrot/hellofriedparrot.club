<template>
  <div class="user-panel-menu">
    <v-menu v-model="menuOpen" :items="location" open-on-hover>
      <!-- must use "props"-->
      <template v-slot:activator="{ props }">
        <div v-bind="props" @click="menuOpen = !menuOpen">
          <slot name="avatar"></slot>
        </div>
      </template>

      <v-card
        width="220px"
        height="auto"
        class="bg-background_smooth mx-auto"
        style="border-radius: 10px"
      >
        <!-- for manager, admin, user, VIP and SVIP -->
        <div v-if="user.priority >= -1 && user.priority <= 4" class="user-menu">
          <div class="userpanel-icon-container-headbar">
            <span class="userpanel-identity-space" style="padding: 10px 0px">
              <v-icon size="25px" class="mr-2">
                {{ user.priority <= 1 ? 'mdi-account-wrench' : 'mdi-account' }}
              </v-icon>
              <span>
                {{ $t('g.identity.' + user.identity) }}
              </span>
            </span>
            <div class="mb-3">
              <h4>{{ user.name }}</h4>
            </div>
            <v-card-subtitle class="email-hint">
              {{ user.email }}
            </v-card-subtitle>
          </div>
          <v-divider></v-divider>
          <clickIconList :items="UserPanelItems"></clickIconList>
        </div>
        <!-- for guest -->
        <div v-else class="guest-menu">
          <div class="userpanel-icon-container-headbar">
            <span class="guest-icon-container">
              <v-icon
                size="35px"
                color="var(--navbar-text-color)"
                style="margin: 3.5px 1px 0 1px"
              >
                {{ 'mdi-account-plus-outline' }}
              </v-icon>
            </span>
          </div>

          <v-divider></v-divider>

          <v-card-subtitle
            class="text-center"
            style="white-space: normal; text-align: left; margin: 5px 2px"
          >
            {{ $t('index.createAccountTip') }}
          </v-card-subtitle>

          <div class="userpanel-guest-btn-container">
            <v-btn class="bg-primary text-white user-menu-btn" to="/auth/login">
              {{ $t('g.login') }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="bg-secondary text-white user-menu-btn"
              style="margin-bottom: 1.5em"
              to="/auth/register"
            >
              {{ $t('g.register') }}
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-menu>
  </div>
  <floatingAlert ref="floatingAlert"></floatingAlert>
</template>

<script lang="ts" src="./src/userPanelMenu.ts"></script>

<style lang="scss" scoped>
.user-menu-btn {
  width: 88%;
  margin: 5px 1px;
  border-radius: 20px;
}

.userpanel-icon-container-headbar {
  height: auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--navbar-color);
  color: var(--navbar-text-color);
  position: relative;
}

.userpanel-identity-space {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 2px 3px 2px;
}

.email-hint {
  white-space: normal;
  word-break: break-all;
  margin: 3px;
  padding-bottom: 10px;
}

.userpanel-guest-btn-container {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.guest-icon-container {
  display: block;
  width: 50px;
  height: 50px;
  margin-left: 50%;
  transform: translateX(-50%);
  text-align: center;
  align-items: center;
  border-color: #ccc;
  border-style: solid;
  border-width: 2px;
  border-radius: 1000px;
}
</style>
