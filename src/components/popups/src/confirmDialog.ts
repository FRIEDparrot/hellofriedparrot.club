import { defineComponent } from "vue";

export default defineComponent({
    name: "confirmDialog",
    emits: ["confirm", "cancel"],
    props: {
        title: {
            type: String,
            default: "",
        },
        subtitle: {
            type: String,
            default: "",
        },
        showReasonInput: {
            type: Boolean,
            default: false,
        },
        reasonRequired: {
            type: Boolean,
            default: false,
        },
        maxReasonLength: {
            type: Number,
            default: 100,
        },
        reasonLabel: {
            type: String,
            default: "",
        },
        confirmBtnLabel: {
            type: String,
            default: "",
        },
        confirmBtnColor: {
            type: String,
            default: "info",
        },
        cancelBtnLabel: {
            type: String,
            default: "",
        },
        cancelBtnColor: {
            type: String,
            default: "secondary",
        },
    },
    data() {
        return {
            show_dialog: false,
            reasonText: "",
        };
    },
    computed: {},
    methods: {
        show() {
            this.reasonText = ""; // clear reason text
            this.show_dialog = true;
        },
        confirm() {
            const reasonText = this.reasonText.trim();
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
        cancel() {
            this.show_dialog = false;
            this.$emit("cancel");
        },
    },
    mounted() {},
});
