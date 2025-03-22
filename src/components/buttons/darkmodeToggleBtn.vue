<template>
    <div class="darkmode-toggle">
        <v-btn
            icon
            id="darkmode-btn"
            class="bg-transparent"
            variant="plain"
            @click="ToggleDarkMode()"
        >
            <div ref="DarkModeIcon">
                <img
                    v-if="darkmode === true"
                    src="@imgs/ui/theme/mode-dark.svg"
                    alt="theme"
                    height="40px"
                />
                <img
                    v-else
                    src="@imgs/ui/theme/mode-light.svg"
                    alt="theme"
                    height="40px"
                />
            </div>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
import { defineComponent } from "vue";
import { getDarkMode, setDarkMode } from "@store/index";

export default defineComponent({
    name: "DarkModeToggleBtn",
    data() {
        return {
            darkmode: getDarkMode(), // get dark mode from store
        };
    },
    methods: {
        ToggleDarkMode() {
            const mode = !getDarkMode(); // get dark mode from store and invert it
            setDarkMode(mode); // set dark mode to store
            this.darkmode = mode; // update dark mode variable to record
        },
    },
});
</script>
