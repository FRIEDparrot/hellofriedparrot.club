"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var tag_choose_overlay_vue_1 = require("@/components/overlays/tag_choose_overlay.vue");
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: 'tagGroup',
    emits: ['update:items'],
    components: {
        tagChooseOverlay: tag_choose_overlay_vue_1["default"]
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        column: {
            type: Boolean,
            "default": true
        },
        max: {
            type: Number,
            "default": 5
        },
        allowModify: {
            type: Boolean,
            "default": false
        },
        size: {
            type: String,
            "default": 'small'
        },
        showNoTagText: {
            type: Boolean,
            "default": false
        }
    },
    data: function () {
        return {};
    },
    computed: {
        getTagTranslation: function () {
            var lang = this.$i18n.locale;
            return function (tag) {
                var _a, _b;
                return (_b = (_a = tag[lang]) !== null && _a !== void 0 ? _a : tag.en) !== null && _b !== void 0 ? _b : '';
            };
        }
    },
    methods: {
        updateTags: function (newTags) {
            this.$emit('update:items', newTags);
        },
        removeTag: function (idx) {
            var newTags = __spreadArrays(this.items);
            newTags.splice(idx, 1);
            this.updateTags(newTags); // update parent component
        },
        showTagChooseOverlay: function () {
            var overlay = this.$refs.tagChooseOverlay;
            if (overlay) {
                // use current tags object
                overlay.show(this.items);
            }
        }
    }
});
