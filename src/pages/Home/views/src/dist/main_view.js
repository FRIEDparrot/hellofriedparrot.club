"use strict";
exports.__esModule = true;
var store_1 = require("@/store");
var vue_1 = require("vue");
var dynamicSearchBtn_vue_1 = require("@/components/buttons/dynamicSearchBtn.vue");
var userInfoCardBrief_vue_1 = require("@/components/user/userInfoCardBrief.vue");
var InterestTagPanel_vue_1 = require("@/ui/panels/InterestTagPanel.vue");
var briefPostCard_vue_1 = require("@/ui/cards/briefPostCard.vue");
var blog_iterator_main_vue_1 = require("@/ui/blog_iterators/blog_iterator_main.vue");
var interest_tag_panel_simple_vue_1 = require("@/ui/panels/interest_tag_panel_simple.vue");
exports["default"] = vue_1.defineComponent({
    name: 'MainView',
    components: {
        dynamicSearchBtn: dynamicSearchBtn_vue_1["default"],
        briefPostCard: briefPostCard_vue_1["default"],
        userInfoCardBrief: userInfoCardBrief_vue_1["default"],
        InterestTagPanel: InterestTagPanel_vue_1["default"],
        blog_iterator_main: blog_iterator_main_vue_1["default"],
        interest_tag_panel_simple: interest_tag_panel_simple_vue_1["default"]
    },
    data: function () {
        return {
            user: store_1["default"].state.user
        };
    },
    methods: {}
});
