"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: "UserManage",
    setup: function () {
        return {
            tableUsers: {
                headers: [
                    "ID",
                    "用户名",
                    "邮箱",
                    "注册时间",
                    "上次登录时间",
                    "状态",
                    "操作",
                ]
            }
        };
    }
});
