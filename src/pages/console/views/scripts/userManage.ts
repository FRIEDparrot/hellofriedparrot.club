import { defineComponent } from "vue";

export default defineComponent({
    name: "UserManage",
    setup() {
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
                ],
            },
        };
    },
});
