"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var vue_1 = require("vue");
var core_1 = require("@vueuse/core");
var down_arrow_vue_1 = require("@imgs/ui/down_arrow.vue");
var mc_background_day_jpg_1 = require("@imgs/backgrounds/mc_background_day.jpg");
var mc_background_night_jpg_1 = require("@imgs/backgrounds/mc_background_night.jpg");
var web_image_load_1 = require("@functions/web_image_load"); // common image loading function
var gsap_1 = require("gsap");
var lodash_es_1 = require("lodash-es"); // debounce function for scroll event
var background_day = null;
var background_night = null;
var bg_loaded = vue_1.ref(false); // use ref to keep track of background image loading status
var store_1 = require("@/store");
var current_day_bg_opa = store_1.getDarkMode() ? vue_1.ref(0.0) : vue_1.ref(1.0);
function loadbackgroundImage() {
    return __awaiter(this, void 0, Promise, function () {
        var _a, dayBackground, nightBackground, darkMode, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all([
                            web_image_load_1.loadImage(mc_background_day_jpg_1["default"]),
                            web_image_load_1.loadImage(mc_background_night_jpg_1["default"]),
                        ])];
                case 1:
                    _a = _b.sent(), dayBackground = _a[0], nightBackground = _a[1];
                    bg_loaded.value = true; // set the background image loading status to true
                    background_day = dayBackground;
                    background_night = nightBackground;
                    darkMode = store_1.getDarkMode();
                    setCanvasBackgroundImage(darkMode); // set the background image for day theme
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function setCanvasBackgroundImage(dark_theme) {
    var dpr = window.devicePixelRatio || 1; // get the device pixel ratio
    var canvas = document.getElementById("backgroundCanvas_welcomePage");
    // reset the width and height of the canvas to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (bg_loaded.value == true) {
        var img = dark_theme ? background_night : background_day;
        var ctx = canvas.getContext("2d");
        // ctx.scale(dpr, dpr); don't do scale
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    else {
        console.error("background image not loaded yet");
    }
}
function setCanvasGradientImage(canvas, img1, img2, opacity1, opacity2) {
    var dpr = window.devicePixelRatio || 1; // get the device pixel ratio
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = opacity1;
    ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = opacity2;
    ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
}
exports["default"] = vue_1.defineComponent({
    name: "interface_welcome",
    setup: function () {
        /** Event listener management class, to clean up event listeners on component unmount */
        var eventCleanups = [];
        var addManagedEventListener = function (target, event, handler, options) {
            var cleanup = core_1.useEventListener(target, event, handler, options);
            eventCleanups.push(cleanup);
        };
        return {
            eventCleanups: eventCleanups,
            addManagedEventListener: addManagedEventListener
        };
    },
    components: {
        Down_arrow: down_arrow_vue_1["default"]
    },
    data: function () {
        return {
            canvas: null,
            darkmode: document.documentElement.getAttribute("data-theme") == "dark"
                ? true
                : false
        };
    },
    methods: {
        openNPUcraft: function () {
            window.open("https://skin.npucraft.com/");
        },
        onThemeChanged: function (darkmode) {
            if (bg_loaded.value == true && background_day && background_night) {
                var canvas_1 = document.getElementById("backgroundCanvas_welcomePage");
                var t1 = gsap_1.gsap.timeline();
                var obj_1 = {
                    alpha: current_day_bg_opa.value
                };
                var dstAlpha = darkmode ? 0 : 1;
                t1.to(obj_1, {
                    alpha: dstAlpha,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onUpdate: function () {
                        setCanvasGradientImage(canvas_1, background_day, background_night, obj_1.alpha, 1 - obj_1.alpha);
                        current_day_bg_opa.value = obj_1.alpha; // update the current day background opacity
                    }
                });
            }
        },
        scrollDown: function () {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth"
            });
        },
        handleScrollIndicator: function () {
            var container = document.getElementById("scroll-indicator-container");
            var currentScrollTop = window.scrollY || document.documentElement.scrollTop;
            var max_opacity = 0.7;
            if (currentScrollTop > 130) {
                container.style.display = "none";
            }
            else if (currentScrollTop <= 30) {
                container.style.display = "block";
                container.style.opacity = max_opacity;
            }
            else {
                container.style.display = "block";
                container.style.opacity =
                    max_opacity - ((currentScrollTop - 30) / 100) * max_opacity;
            }
        },
        handleIntroTitleAnimation: function () {
            var intro_titles = document.querySelectorAll(".intro span");
            intro_titles.forEach(function (intro_title, index) {
                // get the position of the element relative to the viewport
                var rect = intro_title.getBoundingClientRect(intro_title);
                var compCenter = rect.top + rect.height / 2; // get the center of the element
                var viewportCenter = window.innerHeight / 2; // get the center of the viewport
                var percent = Math.abs(viewportCenter - compCenter) / 130; // percentage of the element from the center of the viewport
                var baseFontSize = 20; // base font size 25px
                /** animation logics */
                if (window.innerWidth < 900) {
                    intro_title.style.opacity = 0;
                }
                else if (percent < 0.45) {
                    intro_title.style.opacity = 1;
                    intro_title.style.fontSize = baseFontSize;
                }
                else if (percent < 1) {
                    var interp = (percent - 0.45) / (1 - 0.45);
                    intro_title.style.fontSize = baseFontSize - 15 * interp + "px"; // for scaling the element
                    intro_title.style.opacity = 1 - interp; // for fading the element
                }
                else {
                    intro_title.style.fontSize = 5;
                    intro_title.style.opacity = 0;
                }
            });
        },
        addArrowGroupAnimation: function (add) {
            var arrows = this.$refs.arrows;
            var arr1 = arrows.$refs.path1;
            var arr2 = arrows.$refs.path2;
            var arr3 = arrows.$refs.path3;
            var arrows_obj = [arr1, arr2, arr3];
            var color_arrary = [
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
                arrows_obj.forEach(function (arrow, index) {
                    gsap_1.gsap.effects.gradient_front_back(arrow, {
                        colors: color_arrary[index],
                        duration: 0.45,
                        ease: "circ.InOut",
                        repeat: -1,
                        yoyo: true
                    });
                });
            }
            else {
                arrows_obj.forEach(function (arrow) {
                    gsap_1.gsap.killTweensOf(arrow); // kill all tweens of the arrow group
                });
            }
        },
        cleanupAllEventListeners: function () {
            this.eventCleanups.forEach(function (cleanup) { return cleanup(); });
            this.eventCleanups.length = 0;
        }
    },
    mounted: function () {
        var _this = this;
        loadbackgroundImage(); // load the background images first
        vue_1.watch(function () { return store_1["default"].state.darkMode; }, // when the dark mode status changes in the store
        function (newMode) {
            _this.onThemeChanged(newMode); // changee the background image and canvas gradient
        });
        /** 1. animation for scroll-indicator arrow color gradient */
        this.addArrowGroupAnimation(true); // Call it once after page load
        /** 2. animaion handler for scroll-indicator-container refresh */
        /** 3. animation for intro title refresh */
        this.addManagedEventListener(window, "scroll", this.handleScrollIndicator);
        this.addManagedEventListener(window, "scroll", this.handleIntroTitleAnimation);
        this.addManagedEventListener(window, "resize", this.handleIntroTitleAnimation);
        this.handleScrollIndicator(); // Call it once after page load
        this.handleIntroTitleAnimation(); // Call it once after page load
        /** 4. debounce the scroll event handler to improve performance */
        var debouncedScrollHandler = lodash_es_1.debounce(this.handleScrollIndicator, 100);
    },
    beforeUnmount: function () {
        this.cleanupAllEventListeners();
        this.addArrowGroupAnimation(false);
    }
});
