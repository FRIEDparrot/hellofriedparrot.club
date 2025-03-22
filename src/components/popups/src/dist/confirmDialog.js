"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: "confirmDialog",
    emits: ["confirm", "cancel"],
    props: {
        title: {
            type: String,
            "default": ""
        },
        subtitle: {
            type: String,
            "default": ""
        },
        showReasonInput: {
            type: Boolean,
            "default": false
        },
        reasonRequired: {
            type: Boolean,
            "default": false
        },
        maxReasonLength: {
            type: Number,
            "default": 100
        },
        reasonLabel: {
            type: String,
            "default": ""
        },
        confirmBtnLabel: {
            type: String,
            "default": ""
        },
        confirmBtnColor: {
            type: String,
            "default": "info"
        },
        cancelBtnLabel: {
            type: String,
            "default": ""
        },
        cancelBtnColor: {
            type: String,
            "default": "secondary"
        }
    },
    data: function () {
        return {
            show_dialog: false,
            reasonText: ""
        };
    },
    computed: {},
    methods: {
        show: function () {
            this.reasonText = ""; // clear reason text
            this.show_dialog = true;
        },
        confirm: function () {
            var reasonText = this.reasonText.trim();
            if (this.showReasonInput && this.reasonRequired) {
                // strip reason text
                if (reasonText.length === 0) {
                    alert(this.$t("common.confirmDialog.reasonRequired"));
                    return;
                }
            }
            this.show_dialog = false;
            this.$emit("confirm", reasonText);
        },
        cancel: function () {
            this.show_dialog = false;
            this.$emit("cancel");
        }
    },
    mounted: function () { }
});
