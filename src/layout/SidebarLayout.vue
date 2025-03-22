<template>
    <div class="SidebarLayout">
        <div
            class="sidebar"
            id="sidebar-left"
            v-if="$slots['sidebar-left-content']"
        >
            <slot name="sidebar-left-content"></slot>
        </div>
        <div class="sidebar" id="sidebar-right">
            <slot name="sidebar-right-content"></slot>
        </div>
        <div class="content" v-if="$slots['main-content']">
            <slot name="main-content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
import { fa } from "vuetify/locale";
import { defineComponent } from "vue";

const leftSidebarWidthValue = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
        "--leftsidebarwidth",
    ),
);

const rightSidebarWidthValue = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
        "--rightsidebarwidth",
    ),
);

export default defineComponent({
    name: "SidebarLayout",
    props: {
        openLeftSidebarAtStart: {
            type: Boolean,
            default: false,
        },
        openRightSidebarAtStart: {
            type: Boolean,
            default: false,
        },
        canOpenAtSameTime: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            leftSidebarOpen: false,
            rightSidebarOpen: false,
            // store the handleKeydown function to remove it on unmount
            handleKeydown: null as ((event: KeyboardEvent) => void) | null,
        };
    },
    methods: {},
    mounted() {
        // ctrl + [  to toggle left sidebar
    },
});
</script>

<style>
:root {
    --leftsidebarwidth: 380px;
    --rightsidebarwidth: 380px;
}

.sidebar {
    position: fixed;
    top: 0;
}

#sidebar-left {
    background-color: skyblue;
    width: var(--leftsidebarwidth);
    right: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
    overflow-x: hidden;
}

#sidebar-right {
    background-color: skyblue;
    width: var(--rightsidebarwidth);
    left: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
    overflow-x: hidden;
}
</style>
