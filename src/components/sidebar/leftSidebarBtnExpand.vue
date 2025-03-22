<template>
    <v-navigation-drawer
        v-model="drawer"
        expand-on-hover
        rail
        floating
        permanent
    >
        <v-list :density="density">
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :title="useTranslation ? $t(item.titleKey) : item.title"
                :prepend-icon="item.icon"
                @click="item.callback() ?? null"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "LeftSidebarBtnExpand",
    props: {
        items: {
            type: Array as () => any[],
            required: true,
        },
        density: {
            type: String as () => "default" | "comfortable" | "compact",
            default: "default",
        },
        useTranslation: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            drawer: true,
        };
    },
});
</script>
