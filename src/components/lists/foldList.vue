<template>
    <div class="fold-list" @click="switchFold">
        <transition name="fold-arrow-transition">
            <div v-if="show_arrow"></div>
        </transition>
        <slot name="icon"></slot>
        <slot name="header"></slot>
    </div>
    <transition name="fold-transition">
        <div v-if="!folded" class="fold-list-content">
            <slot name="content"></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "foldList",
    props: {
        foldedAtStart: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const folded = ref(props.foldedAtStart);

        const switchFold = () => {
            folded.value = !folded.value;
        };

        return {
            folded,
            switchFold,
            show_arrow: false,
        };
    },
});
</script>

<style scoped>
@import "@styles/Base.css";
.fold-list {
    display: block;
    cursor: pointer;
    background-color: #f0f0f0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.fold-list-content {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
}

.fold-transition-enter-active,
.fold-transition-leave-active {
    transition:
        opacity 0.3s ease,
        max-height 0.3s ease;
}

.fold-transition-enter-from,
.fold-transition-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
}

.fold-transition-enter-to,
.fold-transition-leave-from {
    opacity: 1;
    max-height: 500px; /* Set to a value that accommodates content height */
    overflow: hidden;
}
</style>
