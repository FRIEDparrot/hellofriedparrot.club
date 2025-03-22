"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: 'DetailedIteratorList',
    components: {},
    props: {
        items: {
            type: Array,
            "default": []
        },
        itemsPerPage: {
            type: Number,
            "default": 5
        }
    },
    data: function () {
        return {};
    },
    methods: {},
    mounted: function () { }
});
