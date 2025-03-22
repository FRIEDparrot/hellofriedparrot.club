<template>
    <v-alert
        id="floating-alert"
        ref="alertRef"
        :max-width="maxWidth"
        :v-if="show_alert"
        class="floating-alert"
        :type="type"
        :title="title"
        :text="text"
    />
</template>

<script lang="ts" src="./src/floatingAlert.ts"></script>

<style lang="css" scoped>
.floating-alert {
    opacity: 0;
    y: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    pointer-events: none;
}
</style>
