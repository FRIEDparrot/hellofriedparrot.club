"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var compactFolderList_vue_1 = require("@components/lists/compactFolderList.vue");
var MainColumns_1 = require("@/shared/MainColumns");
exports["default"] = vue_1.defineComponent({
    name: "LeftSidebarColumns",
    components: {
        compactFolderList: compactFolderList_vue_1["default"]
    },
    data: function () {
        return {
            drawer: false,
            columns: MainColumns_1["default"]
        };
    },
    methods: {
        open: function () {
            this.drawer = true;
        },
        close: function () {
            this.drawer = false;
        },
        toggle: function () {
            this.drawer = !this.drawer;
        }
    }
});
