<template>
    <div>
        <v-navigation-drawer
            :width="66"
            v-model="drawer"
            permanent
            class="left-sidebar-btn-only"
        >
            <div class="left-sidebar-icon-container">
                <v-list :density="density" width="66px" nav>
                    <v-list-item
                        v-for="(item, index) in items"
                        class="left-sidebar-button"
                        :key="index"
                        @click="item.callback() ?? null"
                        variant="plain"
                    >
                        <v-icon size="30"> {{ item.icon ?? null }} </v-icon>
                    </v-list-item>
                </v-list>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "LeftSidebarBtnOnly",
    props: {
        items: {
            type: Array as () => any[],
            required: true,
        },
        density: {
            type: String as () => "compact" | "default" | "comfortable",
            default: "comfortable",
        },
    },
    data() {
        return {
            drawer: true,
        };
    },
    methods: {},
});
</script>

<style lang="css">
@import "@styles/base.css";

.left-sidebar-btn-only {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--sidebar-iconbar-color);
}
</style>
