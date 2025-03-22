<template lang="html">
    <div class="dropdown-list" ref="dropdown-list" :style="backgroundStyle">
        <div id="dropdown-Wrapper">
            <span id="arrow-wrapper" ref="arrow">
                <ArrowFold
                    v-if="show_arrow"
                    :color="arrow_color"
                    class="dropdown-list-arrow"
                />
            </span>
            <span class="dropdown-list-text">{{ label_text }}</span>
        </div>
        <div id="dropdown-list-content">
            This is The Content to display
            <slot> This is The Content </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { transform } from "typescript";
import ArrowFold from "@imgs/ui/arrow_fold.vue";
import { ref, onMounted } from "vue";

export default defineComponent({
    components: {
        ArrowFold,
    },
    name: "dropDownList",
    props: {
        label_text: {
            type: String,
            default: "list",
            required: true,
        },
        unfoldWhenHover: {
            type: Boolean,
            default: false,
            required: true,
        },
        arrow_color: {
            type: String,
            default: "#000000",
            required: false,
        },
        show_arrow: {
            type: Boolean,
            default: true,
            required: false,
        },
        defaultFoldStatus: {
            type: Boolean,
            default: true, // folded
            required: false,
        },
        // change when hover
        colorToChange: {
            type: String,
            default: "#000000",
            required: false,
        },
        //
        colorMask: {
            type: String,
            default: "#000000",
            required: false,
        },
    },
    data() {
        return {
            foldStatus: this.defaultFoldStatus,
            originalBackgroundColor: "transparent", // for hover effect
        };
    },
    methods: {
        hoverOn: function () {
            let dropdownlist: any = this.$refs["dropdown-list"];
            this.originalBackgroundColor =
                dropdownlist.style.backgroundColor ||
                getComputedStyle(dropdownlist).backgroundColor;
            dropdownlist.style.backgroundColor = this.colorToChange;

            let drop_list_content = document.getElementById(
                "dropdown-list-content",
            );
            if (drop_list_content) {
                drop_list_content.style.display = "block"; // show the content when hover on
            }
        },
        hoverOff: function () {
            let dropdownlist: any = this.$refs["dropdown-list"];
            if (dropdownlist) {
                dropdownlist.style.backgroundColor =
                    this.originalBackgroundColor;
                let drop_list_content = document.getElementById(
                    "dropdown-list-content",
                );
                if (drop_list_content) {
                    drop_list_content.style.display = "none"; // hide the content when hover off
                }
            }
        },
    },
    computed: {
        backgroundStyle() {
            return {
                /* gradient background with dynamic bind */
                background: `radial-gradient(circle
                            var(--color-start), transparent
                            var(--color-mid), ${this.colorMask}
                            var(--color-end), transparent)`,
                opacity: 0.6 /* note : this is  the mask over the transparent background */,
            };
        },
    },
    mounted() {
        let dropdownlist: any = this.$refs["dropdown-list"];
        let arrow = this.$refs["arrow"]; // get the DOM element (span) of the arrow component
        dropdownlist.addEventListener("mouseenter", () => {
            this.hoverOn();
        });
        dropdownlist.addEventListener("mouseleave", () => {
            this.hoverOff();
        });
        dropdownlist.addEventListener("click", function () {
            // click dynamic effect
            // gsap.effects.click_gradient(this);
        });

        if (this.unfoldWhenHover) {
            dropdownlist.addEventListener("mouseenter", () => {
                gsap.effects.unfoldListArrow(arrow);
                this.foldStatus = false;
            });
            dropdownlist.addEventListener("mouseleave", () => {
                gsap.effects.foldListArrow(arrow);
                this.foldStatus = true;
                this.hoverOff();
            });
        } else {
            dropdownlist.addEventListener("click", () => {
                let fold = this.foldStatus;
                fold
                    ? gsap.effects.unfoldListArrow(arrow)
                    : gsap.effects.foldListArrow(arrow);
                this.foldStatus = !this.foldStatus;
            });
        }
    },
});
</script>

<style scoped>
.dropdown-list {
    display: flex;
    text-align: center;
    --color-start: 0em;
    --color-mid: 0em;
    --color-end: 0em;
    border-radius: 30px;
    position: absolute; /* used  for achor the content */
}

.dropdown-list:hover {
    cursor: pointer;
}

.dropdown-list-arrow {
    width: 0.65em;
    height: 0.8em;
    padding: 0px;
    border-radius: 0px;
    margin-left: 0px;
    background-color: transparent;
}

.dropdown-list-text {
    font-size: 18px;
    font-weight: bold;
    color: var(--navbar-text-color);
    margin-left: 2px;
    padding-left: 3px;
    align-items: center;
    text-align: center;
}

.dropdown-list #dropdown-list-content {
    display: none;
    position: relative;
    z-index: 5; /* floating content */
    top: 100%; /* position the content below the arrow */
    left: 0%;
    width: 130%;
}

#arrow-wrapper {
    display: inline-block; /* for inline element, set it to inline-block for rotation */
}

#dropdown-Wrapper {
    margin-top: 1.2em;
}
</style>
