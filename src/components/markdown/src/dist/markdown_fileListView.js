"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: "markdownFileListView",
    components: {},
    props: {
        header: {
            type: String,
            "default": ""
        },
        base_url: {
            type: String,
            "default": "rules"
        },
        directory: {
            /* for standard example : see backend/Project/assets/rules/en/trans.json */
            type: Object,
            "default": function () { return ({}); }
        }
    },
    data: function () {
        return {
            BaseUrl: ""
        };
    },
    mounted: function () {
        var url = this.base_url; // get base_url from props
        if (url.endsWith("/")) {
            url = url.slice(0, -1); // remove last slash if any
        }
        if (url.startsWith("/")) {
            // remove first slash if any
            url = url.slice(1);
        }
        this.BaseUrl = url;
    },
    methods: {
        /**
         * Note: we force reload the current page to update the content
         *     because Vue Router doesn't update the content of the same page.
         *     not use route.push() here because it will cause a full page reload.
         */
        handleClick: function (event, url) {
            var isCtrlPressed = event.ctrlKey || event.metaKey; // for mac users
            if (isCtrlPressed) {
                console.log("Ctrl/Cmd + Click detected, opening in new tab");
                window.open("/" + this.BaseUrl + "/" + url, "_blank");
            }
            else {
                window.open("/" + this.BaseUrl + "/" + url, "_self"); // force reload current page
            }
        }
    },
    computed: {}
});
