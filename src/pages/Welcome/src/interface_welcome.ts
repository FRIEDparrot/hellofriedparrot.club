import { defineComponent, ref, Ref, watch } from "vue";
import { useEventListener } from "@vueuse/core";
import Down_arrow from "@imgs/ui/down_arrow.vue";
import bg_day from "@imgs/backgrounds/mc_background_day.jpg";
import bg_night from "@imgs/backgrounds/mc_background_night.jpg";
import { bg } from "vuetify/lib/locale/index.mjs";
import { loadImage } from "@functions/web_image_load"; // common image loading function
import { gsap } from "gsap";
import { debounce } from "lodash-es"; // debounce function for scroll event

let background_day: any = null;
let background_night: any = null;
const bg_loaded: Ref<boolean> = ref(false); // use ref to keep track of background image loading status
import store, { setDarkMode, getDarkMode } from "@/store";

const current_day_bg_opa = getDarkMode() ? ref(0.0) : ref(1.0);

async function loadbackgroundImage(): Promise<void> {
    // load the both background images synchronously
    try {
        const [dayBackground, nightBackground] = await Promise.all([
            loadImage(bg_day),
            loadImage(bg_night),
        ]);
        bg_loaded.value = true; // set the background image loading status to true
        background_day = dayBackground;
        background_night = nightBackground;
        const darkMode = getDarkMode(); // get the current dark mode status
        setCanvasBackgroundImage(darkMode); // set the background image for day theme
    } catch (error) {
        console.error(error);
    }
}

function setCanvasBackgroundImage(dark_theme: boolean): void {
    const dpr = window.devicePixelRatio || 1; // get the device pixel ratio
    const canvas: any = document.getElementById("backgroundCanvas_welcomePage");

    // reset the width and height of the canvas to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (bg_loaded.value == true) {
        const img = dark_theme ? background_night : background_day;
        const ctx = canvas.getContext("2d");
        // ctx.scale(dpr, dpr); don't do scale
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
        console.error("background image not loaded yet");
    }
}

function setCanvasGradientImage(
    canvas: HTMLCanvasElement,
    img1: HTMLImageElement,
    img2: HTMLImageElement,
    opacity1: number,
    opacity2: number,
): void {
    const dpr = window.devicePixelRatio || 1; // get the device pixel ratio
    const ctx: any = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = opacity1;
    ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = opacity2;
    ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
}

export default defineComponent({
    name: "interface_welcome",
    setup() {
        /** Event listener management class, to clean up event listeners on component unmount */
        const eventCleanups: Array<() => void> = [];
        const addManagedEventListener = (
            target: Window | HTMLElement,
            event: string,
            handler: (e?: Event) => void,
            options?: AddEventListenerOptions, // options?: boolean | AddEventListenerOptions
        ) => {
            const cleanup = useEventListener(target, event, handler, options);
            eventCleanups.push(cleanup);
        };

        return {
            eventCleanups,
            addManagedEventListener,
        };
    },
    components: {
        Down_arrow, // scroll-down for more
    },
    data() {
        return {
            canvas: null,
            darkmode:
                document.documentElement.getAttribute("data-theme") == "dark"
                    ? true
                    : false,
            // initialize the current day background opacity to 1 or 0 based on the dark mode status
        };
    },
    methods: {
        openNPUcraft() {
            window.open("https://skin.npucraft.com/");
        },
        onThemeChanged(darkmode: boolean) {
            if (bg_loaded.value == true && background_day && background_night) {
                const canvas: any = document.getElementById(
                    "backgroundCanvas_welcomePage",
                );
                let t1 = gsap.timeline();
                const obj = {
                    alpha: current_day_bg_opa.value,
                };
                const dstAlpha = darkmode ? 0 : 1;

                t1.to(obj, {
                    alpha: dstAlpha,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onUpdate: function () {
                        setCanvasGradientImage(
                            canvas,
                            background_day,
                            background_night,
                            obj.alpha,
                            1 - obj.alpha,
                        );
                        current_day_bg_opa.value = obj.alpha; // update the current day background opacity
                    },
                });
            }
        },
        scrollDown() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
            });
        },
        handleScrollIndicator() {
            const container: any = document.getElementById(
                "scroll-indicator-container",
            );
            const currentScrollTop =
                window.scrollY || document.documentElement.scrollTop;
            let max_opacity = 0.7;
            if (currentScrollTop > 130) {
                container.style.display = "none";
            } else if (currentScrollTop <= 30) {
                container.style.display = "block";
                container.style.opacity = max_opacity;
            } else {
                container.style.display = "block";
                container.style.opacity =
                    max_opacity - ((currentScrollTop - 30) / 100) * max_opacity;
            }
        },
        handleIntroTitleAnimation() {
            let intro_titles: any = document.querySelectorAll(".intro span");
            intro_titles.forEach((intro_title, index) => {
                // get the position of the element relative to the viewport
                let rect = intro_title.getBoundingClientRect(intro_title);
                let compCenter = rect.top + rect.height / 2; // get the center of the element
                let viewportCenter = window.innerHeight / 2; // get the center of the viewport
                let percent = Math.abs(viewportCenter - compCenter) / 130; // percentage of the element from the center of the viewport
                let baseFontSize = 20; // base font size 25px

                /** animation logics */
                if (window.innerWidth < 900) {
                    intro_title.style.opacity = 0;
                } else if (percent < 0.45) {
                    intro_title.style.opacity = 1;
                    intro_title.style.fontSize = baseFontSize;
                } else if (percent < 1) {
                    let interp = (percent - 0.45) / (1 - 0.45);
                    intro_title.style.fontSize = `${baseFontSize - 15 * interp}px`; // for scaling the element
                    intro_title.style.opacity = 1 - interp; // for fading the element
                } else {
                    intro_title.style.fontSize = 5;
                    intro_title.style.opacity = 0;
                }
            });
        },
        addArrowGroupAnimation(add: boolean) {
            const arrows: any = this.$refs.arrows;
            const arr1 = arrows.$refs.path1;
            const arr2 = arrows.$refs.path2;
            const arr3 = arrows.$refs.path3;
            let arrows_obj = [arr1, arr2, arr3];
            let color_arrary = [
                [
                    "rgba(43, 42, 42, 0.7)",
                    "rgba(77, 73, 73, 0.7)",
                    "rgba(104, 100, 100, 0.7)",
                ],
                [
                    "rgba(77, 73, 73, 0.85)",
                    "rgba(100, 99, 99, 0.85)",
                    "rgba(126, 123, 123, 0.85)",
                ],
                [
                    "rgb(126, 123, 123)",
                    "rgb(167, 163, 163)",
                    "rgb(177, 165, 165)",
                ],
            ];
            if (add) {
                arrows_obj.forEach((arrow, index) => {
                    gsap.effects.gradient_front_back(arrow, {
                        colors: color_arrary[index],
                        duration: 0.45,
                        ease: "circ.InOut",
                        repeat: -1,
                        yoyo: true,
                    });
                });
            } else {
                arrows_obj.forEach((arrow) => {
                    gsap.killTweensOf(arrow); // kill all tweens of the arrow group
                });
            }
        },
        cleanupAllEventListeners() {
            this.eventCleanups.forEach((cleanup) => cleanup());
            this.eventCleanups.length = 0;
        },
    },
    mounted(): void {
        loadbackgroundImage(); // load the background images first
        watch(
            () => store.state.darkMode, // when the dark mode status changes in the store
            (newMode) => {
                this.onThemeChanged(newMode); // changee the background image and canvas gradient
            },
        );

        /** 1. animation for scroll-indicator arrow color gradient */
        this.addArrowGroupAnimation(true); // Call it once after page load

        /** 2. animaion handler for scroll-indicator-container refresh */
        /** 3. animation for intro title refresh */
        this.addManagedEventListener(
            window,
            "scroll",
            this.handleScrollIndicator,
        );
        this.addManagedEventListener(
            window,
            "scroll",
            this.handleIntroTitleAnimation,
        );
        this.addManagedEventListener(
            window,
            "resize",
            this.handleIntroTitleAnimation,
        );

        this.handleScrollIndicator(); // Call it once after page load
        this.handleIntroTitleAnimation(); // Call it once after page load

        /** 4. debounce the scroll event handler to improve performance */
        const debouncedScrollHandler = debounce(
            this.handleScrollIndicator,
            100,
        );
    },
    beforeUnmount() {
        this.cleanupAllEventListeners();
        this.addArrowGroupAnimation(false);
    },
});
