<template>
  <div class="left-btn-content-sidebar">
    <v-navigation-drawer
      ref="permanentDrawer"
      v-model="drawer_perm"
      :width="66"
      class="left-sidebar-drawer"
      permanent
    >
      <!-- overlay for external click -->
      <div class="left-sidebar-icon-container" ref="permanentDrawerContainer">
        <v-list density="compact" width="var(--icon-sidebar-width)">
          <v-list-item
            class="left-sidebar-icon"
            value="menu"
            @click="drawer_temp = !drawer_temp"
          >
            <menuBtn
              ref="menuToggleBtn"
              size="26"
              strokeColor="var(--sidebar-icon-color)"
            />
          </v-list-item>
          <v-divider></v-divider>
          <!-- Note : see exapmle in rules_Index.vue, 
                         to use this slot, use `v-slot:btnContainer="{ select }"`-->
          <slot :select="select" name="btnContainer"> </slot>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-navigation-drawer
      ref="temporaryDrawer"
      v-model="drawer_temp"
      :width="300"
      temporary
    >
      <div class="left-siderbar-content-container">
        <slot :selected="selectedItem" name="contentPanel"></slot>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" src="./src/leftSidebarBtnContent.ts"></script>

<style scoped lang="scss" src="./styles/leftSidebarBtnContent.scss"></style>
