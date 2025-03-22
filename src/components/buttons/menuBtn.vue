<template>
  <button class="menu-btn" @click="ToggleMenu()">
    <svg
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="128.271 121.903 223.444 206.16"
    >
      <line
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        class="line1"
        x1="135"
        y1="145"
        x2="345"
        y2="145"
      />
      <line
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        class="line2"
        x1="135"
        y1="225"
        x2="345"
        y2="225"
      />
      <line
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        class="line3"
        x1="135"
        y1="305"
        x2="345"
        y2="305"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import gsap from 'gsap';

export default defineComponent({
  name: 'MenuBtn',
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    size: {
      type: String,
      default: '40px',
    },
    openAtFirst: {
      type: Boolean,
      default: false,
    },
    strokeColor: {
      type: String,
      default: '#f3f3f3',
    },
    strokeWidth: {
      type: String,
      default: '32px',
    },
  },
  methods: {
    ToggleMenu() {
      // toggle the menu state
      this.SetMenuState(!this.isOpen, null);
    },
    SetMenuState(state: boolean, event) {
      // isOpen is the state to turn to.
      this.isOpen = state;

      const posY = 80; // center of the button
      const anim1 = {
        tranlateY: this.isOpen ? posY : posY,
        rotation: this.isOpen ? 0 : 0,
        duration: this.isOpen ? 0.4 : 0.25,
        ease: this.isOpen ? 'power2.inOut' : 'linear',
      };
      const anim2 = {
        tranlateY: this.isOpen ? posY : 0,
        rotation: this.isOpen ? 45 : 0,
        duration: this.isOpen ? 0.25 : 0.4,
        ease: this.isOpen ? 'linear' : 'power2.inOut',
      };
      gsap.to('.line1', {
        transformOrigin: '50% 50%' /* This is important when rotate svg */,
        duration: anim1.duration,
        translateY: anim1.tranlateY,
        rotation: anim1.rotation,
        ease: anim1.ease,
      });
      gsap.to('.line3', {
        transformOrigin: '50% 50%' /* This is important when rotate svg */,
        duration: anim1.duration,
        translateY: -anim1.tranlateY,
        rotation: -anim1.rotation,
        ease: anim1.ease,
      });
      gsap.to('.line1', {
        transformOrigin: 'center',
        duration: anim2.duration,
        translateY: anim2.tranlateY,
        rotation: anim2.rotation,
        ease: anim2.ease,
        delay: anim1.duration,
      });
      gsap.to('.line3', {
        duration: anim2.duration,
        translateY: -anim2.tranlateY,
        rotation: -anim2.rotation,
        ease: 'linear',
        delay: anim1.duration,
      });
      gsap.killTweensOf('.line2'); // kill the line2 animation
      gsap.to('.line2', {
        duration: 0,
        opacity: this.isOpen ? 0 : 1,
        ease: 'linear',
        delay: this.isOpen ? 0.4 : 0.25,
      });
    },
  },
  mounted() {
    if (this.openAtFirst) {
      this.SetMenuState(true, null);
    }
  },
});
</script>

<style scoped>
@import '@styles/base.css';
line {
  fill: none;
  transform-origin: center;
}
</style>
