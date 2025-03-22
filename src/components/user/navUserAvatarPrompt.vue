<template>
  <div class="user-avatar-container" id="user-avatar-container">
    <!-- This load the avatar when mounted in ts file-->
    <userPanelMenu>
      <template v-slot:avatar>
        <userAvatar
          class="user-avatar"
          @mouseenter="scaleAvator(true)"
          @mouseleave="scaleAvator(false)"
        >
        </userAvatar>
      </template>
    </userPanelMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userPanelMenu from '@/components/user/userPanelMenu.vue';
import userAvatar from '@/components/user/userAvatar.vue';
import gsap from 'gsap';

export default defineComponent({
  components: {
    userPanelMenu,
    userAvatar,
  },
  methods: {
    scaleAvator(hover: boolean = false) {
      gsap.to('#user-avatar-container', {
        duration: 0.5,
        width: hover ? 60 : 50,
        height: hover ? 60 : 50,
        ease: 'power2.inOut',
      });
    },
  },
});
</script>

<style lang="css" scoped>
.user-avatar-container {
  /* display: flex; */
  width: 50px;
  height: 80%;
  border-radius: 1000px;
  text-align: center;
  align-items: center; /* align in vertical direction */
  justify-content: center;
  background-color: transparent;
  padding: 0px;
  margin: 0px 2px 0px 0px;
  border-radius: 1000px;
  position: relative;
}

.user-avatar-container .user-avatar {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  border-width: 2px;
  border-color: var(--navbar-avatar-border-color);
  border-style: solid;
}
</style>
