"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
require("@/assets/anims/animation_main");
var gsap_1 = require("gsap");
exports["default"] = vue_1.defineComponent({
    name: 'floatingAlert',
    props: {
        maxWidth: {
            type: Number,
            "default": 500
        }
    },
    data: function () {
        return {
            show_alert: false,
            type: 'success',
            title: '',
            text: ''
        };
    },
    methods: {
        show: function (type, title, text) {
            if (type === void 0) { type = 'success'; }
            if (title === void 0) { title = 'success'; }
            if (text === void 0) { text = ''; }
            // const alert_obj = document.getElementById("floating-alert");
            var alert_ref = this.$refs.alertRef;
            var alert_obj = alert_ref.$el;
            var types = ['success', 'error', 'info', 'warning'];
            if (!types.includes(type)) {
                type = 'success';
            }
            this.type = type;
            this.title = title; // translate title
            this.text = text; // no need to translate text
            this.show_alert = true;
            this.$nextTick(function () {
                gsap_1["default"].effects.floatingAlertWindow(alert_obj);
            });
            this.show_alert = false;
        }
    }
});
