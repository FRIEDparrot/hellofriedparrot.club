"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var defaultAvatar_vue_1 = require("@imgs/ui/defaultAvatar.vue");
var store_1 = require("@/store");
exports["default"] = vue_1.defineComponent({
    name: 'UserAvatar',
    props: {
        color: {
            type: String,
            "default": 'var(--navbar-text-color)'
        }
    },
    components: {
        defaultAvatar: defaultAvatar_vue_1["default"]
    },
    data: function () {
        var _a;
        return {
            user_info: {
                avatarUrl: (_a = store_1["default"].state.user.avatarUrl) !== null && _a !== void 0 ? _a : undefined
            }
        };
    }
});
