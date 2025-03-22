<template>
    <!--Dropdown menu-->
    <v-menu v-model="menuVisible" @mouseleave="handleMouseLeave()">
        <template v-slot:activator="{ props }">
            <v-btn
                icon
                id="lang-btn"
                size="45"
                v-bind="props"
                translation="slide-y-transition"
                style="background-color: var(--navbar-color)"
                @click.prevent="clickBtn()"
                @mouseenter="handleMouseEnter()"
            >
                <div ref="langIcon">
                    <v-icon
                        size="30"
                        v-if="currLang === 'en'"
                        style="color: var(--navbar-text-color)"
                    >
                        {{ "mdi-ab-testing" }}
                    </v-icon>
                    <v-icon
                        size="30"
                        v-if="currLang === 'zh'"
                        style="color: var(--navbar-text-color)"
                    >
                        {{ "mdi-ideogram-cjk-variant" }}
                    </v-icon>
                </div>
            </v-btn>
        </template>
        <v-list style="background-color: var(--navbar-menu-color)">
            <v-list-item @click="changeTranslation('en')">
                <v-icon
                    size="35"
                    class="ma-0"
                    style="color: var(--navbar-text-color)"
                >
                    {{ "mdi-ab-testing" }}
                </v-icon>
            </v-list-item>
            <v-list-item @click="changeTranslation('zh')">
                <v-icon
                    size="35"
                    class="ma-0"
                    style="color: var(--navbar-text-color)"
                >
                    {{ "mdi-ideogram-cjk-variant" }}
                </v-icon>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import { gsap } from "gsap";
import { defineComponent, handleError, ref, watch } from "vue";
// @ts-ignore
import { setPreferedLangCode } from "@store/index";
import { tr } from "vuetify/lib/locale/index.mjs";

export default defineComponent({
    name: "TranslateBtn",
    setup() {},
    props: {
        fullReload: {
            type: Boolean,
            default: false, // force page reload after 1s to update the language
        },
    },
    data() {
        return {
            menuVisible: ref(false),
            btnSelected: false, // show the button when the language is changed
            rotating: ref(false), // rotate the button when the language is changed
            currLang: this.$i18n.locale || "en", // get the prefered language code
        };
    },
    methods: {
        handleMouseEnter(): void {
            this.menuVisible = true; // show the dropdown menu

            this.unfoldBtn(true); // show the button when the language is changed
        },
        handleMouseLeave(): void {
            this.menuVisible = false; // hide the dropdown menu
            this.btnSelected = false; // hide the button when the language is changed
            this.unfoldBtn(false); // hide the button when the language is changed
        },

        // this is for compability of mobile devices and tablets with touch screens
        clickBtn(): void {
            this.btnSelected = !this.btnSelected; // show the button when the language is changed
            this.menuVisible = this.btnSelected; // hide the dropdown menu
            this.unfoldBtn(this.btnSelected); // show the button when the language is changed
        },
        unfoldBtn(selected: boolean): void {
            const lang_icon: any = this.$refs.langIcon;
            gsap.to(lang_icon, {
                duration: 1.0,
                rotation: selected ? 360 : 0,
                ease: "power2.inOut",
            });
            gsap.to("#lang-btn", {
                width: selected ? "60px" : "45px",
                height: selected ? "60px" : "45px",
                duration: 0.5,
            });
        },
        changeTranslation(langcode: string = "en"): void {
            const prelang = this.currLang;
            this.currLang = langcode;
            if (this.currLang !== prelang) {
                this.menuVisible = false; // hide the dropdown menu
                // force page reload after 1s to update the language
                if (this.fullReload) {
                    // take a full page reload to update the language
                    setTimeout(() => {
                        setPreferedLangCode(langcode);
                        window.location.reload();
                    }, 1000);
                } else {
                    this.$i18n.locale = langcode; // update the language code
                    setPreferedLangCode(langcode); // update the language code immediately
                }
            }
        },
    },
});
</script>

<style lang="scss">
.rotate {
    transition: transform 0.3s ease-in-out;
    transform: rotate(45deg); /* Rotate by 45 degrees */
}
</style>
