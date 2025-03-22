<template>
    <v-btn icon class="mr-2">
        <a href="/home">
            <v-icon
                size="50px"
                style="
                    flex-shrink: 0;
                    color: var(--navbar-text-color);
                    background-color: var(--navbar-color);
                "
                variant="plain"
            >
                {{ "mdi-home-circle" }}
            </v-icon>
        </a>
    </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HomeBtn",
    setup() {
        return {};
    },
    methods: {},
});
</script>
