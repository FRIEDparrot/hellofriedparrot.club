"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var cookiePrompt_vue_1 = require("@/components/popups/cookiePrompt.vue");
exports["default"] = vue_1.defineComponent({
    name: 'footerbar_common',
    props: {
        zIndex: {
            type: Number,
            "default": 1000
        }
    },
    components: {
        cookiePrompt: cookiePrompt_vue_1["default"]
    },
    methods: {
        notDeveloped: function () {
            alert(this.$t('g.notDeveloped'));
        },
        openLink: function (url) {
            window.open(url, '_blank');
        },
        /** emit a event to the parent page to set cookie */
        SetCookies: function () {
            var cookiePrompt = this.$refs.cookiePrompt;
            cookiePrompt.show();
        }
    }
});
