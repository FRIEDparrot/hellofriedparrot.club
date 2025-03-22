<template>
  <a style="height: 100%; display: flex; align-items: center" href="/">
    <img
      style="max-height: 100%; width: 100%; object-fit: contain"
      class="parrot_logo_icon"
      src="@imgs/icon/parrot_icon_main.png"
      alt="Logo"
    />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ParrotLogoBtn',
});
</script>

<style lang="scss" scoped>
/* .elem-display-superMaxWidth  */
.parrot_logo_icon {
  display: inline-block;
  width: auto;
  padding: 0em;
  margin: 0em 0.5em;
  border-style: solid;
  border-radius: 50%;
  border-color: violet;
  border-width: 3.7px;
  background-color: transparent;
}
</style>
