"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var defaultAvatar_vue_1 = require("@imgs/ui/defaultAvatar.vue");
var store_1 = require("@/store");
exports["default"] = vue_1.defineComponent({
    name: 'UserInfoCardBrief',
    components: {
        defaultAvatar: defaultAvatar_vue_1["default"]
    },
    props: {
        useSelfProfile: {
            type: Boolean,
            "default": false
        },
        info: {
            type: Object,
            "default": {
                name: '',
                avatar: '',
                bio: 'no bio',
                follows: 0,
                followers: 0,
                blogsNum: 0
            }
        }
    },
    computed: {
        currInfo: function () {
            return this.useSelfProfile ? this.user_info : this.info;
        }
    },
    data: function () {
        var _a, _b, _c, _d, _e, _f;
        return {
            user_info: {
                name: (_a = store_1["default"].state.user.name) !== null && _a !== void 0 ? _a : '',
                avatar: (_b = store_1["default"].state.user.avatarUrl) !== null && _b !== void 0 ? _b : '',
                bio: (_c = store_1["default"].state.user_personal_data.bio) !== null && _c !== void 0 ? _c : '',
                follows: (_d = store_1["default"].state.user_personal_data.following_num) !== null && _d !== void 0 ? _d : 0,
                followers: (_e = store_1["default"].state.user_personal_data.followers_num) !== null && _e !== void 0 ? _e : 0,
                blogsNum: (_f = store_1["default"].state.user_personal_data.blogs_num) !== null && _f !== void 0 ? _f : 0
            }
        };
    },
    mounted: function () { }
});
