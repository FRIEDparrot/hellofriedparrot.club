import { gsap } from 'gsap';
import 'gsap/all';

gsap.registerEffect({
    name: 'fade',
    defaults: { duration: 2 }, // defaults get applied to the "config" object passed to the effect below
    effect: (targets, config) => {
        return gsap.to(targets, {
            duration: config.duration,
            opacity: 0,
            ease: 'power2.inOut',
        });
    },
});

gsap.registerEffect({
    name: 'emerge',
    defaults: { duration: 2 },
    effect: (targets, config) => {
        return gsap.to(targets, {
            duration: config.duration,
            opacity: 1,
            ease: 'power2.inOut',
        });
    },
});

/**
 * DESCRIPTION
 * This is the Animation for The Floating Alert Window
 * For v-alert, use this combine with v-if to create a transparent floating show effect
 * expecially widly used to show success/error message when send verification code and so on.
 */
gsap.registerEffect({
    name: 'floatingAlertWindow',
    defaults: {
        trans_in_out_duration: 1,
        float_duration: 2,
        float_opacity: 0.9,
        float_translate_y: [50, -10, -60],
    },
    effect: (targets, config) => {
        const tl = gsap.timeline({
            defaults: {
                repeat: 0,
                ease: 'power2.inOut',
            },
        });
        tl.fromTo(
            targets,
            {
                opacity: 0,
                y: config.float_translate_y[0],
            },
            {
                opacity: config.float_opacity,
                y: config.float_translate_y[1],
                duration: config.trans_in_out_duration,
                ease: 'power2.inOut',
            },
        )
            .to(targets, {
                duration: config.float_duration, // pause for 2 seconds
            })
            .to(targets, {
                duration: config.trans_in_out_duration,
                opacity: 0,
                y: config.float_translate_y[2],
                ease: 'power2.inOut',
            });
    },
});

/** front-back gradient effect */
gsap.registerEffect({
    name: 'gradient_front_back',
    defaults: {
        colors: ['red', 'blue', 'green', 'yellow'], // also supports multiple hex codes
        duration: 1,
        repeat: true,
        yoyo: true,
        ease: 'power2.inOut',
    },
    effect: function (targets, config) {
        let tl = gsap.timeline({
            repeat: config.repeat,
            yoyo: config.yoyo,
            ease: config.ease,
        });
        // add the colors to the timeline
        config.colors.forEach((color) => {
            tl.to(targets, {
                duration: config.duration,
                fill: color,
            });
        });
        return tl;
    },
});

gsap.registerEffect({
    name: 'move_to_right',
    defaults: {
        duration: 0.8,
        ease: 'power2.inOut',
        right: 0,
    },
    effect: function (targets, config) {
        if (targets) {
            gsap.to(targets, {
                right: config.right,
                duration: config.duration,
            });
        }
    },
});
