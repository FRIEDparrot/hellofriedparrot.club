<template>
    <searchOverlayGlobal
        ref="searchOverlayGlobal"
        @close="isSearching = false"
    />
    <Transition name="slide-reveal">
        <div v-if="!isSearching" class="search-btn-container">
            <v-btn
                :color="color"
                rounded
                class="search-btn"
                width="90%"
                height="75%"
                prepend-icon="mdi-magnify"
                @click="showSearchOverlay()"
            >
                {{ $t("home.main_view.search_placeholder") }}
            </v-btn>
        </div>
    </Transition>
</template>

<script lang="ts">
import searchOverlayGlobal from "@/components/overlays/search_overlay_global.vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "DynamicSearchBtn",
    props: {
        color: {
            type: String,
            default: "primary",
        },
    },
    components: {
        searchOverlayGlobal,
    },
    data() {
        return {
            isSearching: false,
        };
    },
    methods: {
        showSearchOverlay() {
            const search_overlay: any = this.$refs.searchOverlayGlobal;
            if (search_overlay) {
                this.isSearching = true;
                search_overlay.show();
            }
        },
        handleKeyDown(event: KeyboardEvent) {
            if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                this.showSearchOverlay();
            }
        },
    },
    mounted() {
        // add ctrl + K listener to show search overlay
        window.addEventListener("keydown", this.handleKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
});
</script>

<style scoped lang="css">
.search-btn-container {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.search-btn-container .search-btn {
    opacity: 0.8;
    font-size: 0.9em;
}

.slide-reveal-enter-active,
.slide-reveal-leave-active {
    transition:
        color 0.7s ease,
        margin-top 0.7s ease,
        height 0.7s ease,
        opacity 0.7s ease;
}

.slide-reveal-enter-from,
.slide-reveal-leave-to {
    margin-top: 0px;
    height: 0;
    opacity: 0;
}
</style>
