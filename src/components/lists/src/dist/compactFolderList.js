"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var stdMenuList_1 = require("@/interface/iterators/stdMenuList");
var store_1 = require("@/store");
exports["default"] = vue_1.defineComponent({
    name: 'compactFolderList',
    props: {
        useUrlLink: {
            type: Boolean,
            "default": false
        },
        useCallback: {
            type: Boolean,
            "default": false
        },
        useTranslation: {
            type: Boolean,
            "default": false
        },
        density: {
            type: String,
            "default": 'compact'
        },
        items: {
            type: Array < stdMenuList_1.IstdMenuItem > ,
            required: true
        }
    },
    data: function () {
        return {
            openStates: new Array(this.items.length).fill(false),
            open: [true],
            user: {
                priority: store_1["default"].state.user.priority
            }
        };
    },
    methods: {
        handleClick: function (event, item) {
            if (this.useCallback) {
                item.callback(event); // call the callback function if provided
            }
            if (this.useUrlLink) {
                event.preventDefault();
                this.navigateTo(event, item.url); // navigate to the url if provided
            }
        },
        navigateTo: function (event, url) {
            if (event.ctrlKey || event.metaKey) {
                window.open(url, '_blank');
            }
            else {
                this.$router.push(url);
            }
        }
    },
    mounted: function () {
        for (var i = 0; i < this.items.length; i++) {
            this.openStates[i] = this.items[i].open === true;
        }
    }
});
