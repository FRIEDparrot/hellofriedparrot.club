import { defineComponent, watch } from "vue";
import compactFolderList from "@components/lists/compactFolderList.vue";
import MainColumns from "@/shared/main_columns";
import store from "@/store";

export default defineComponent({
    name: "LeftSidebarColumns",
    components: {
        compactFolderList,
    },
    data() {
        return {
            drawer: false,
            columns: MainColumns,
        };
    },
    methods: {
        open() {
            this.drawer = true;
        },
        close() {
            this.drawer = false;
        },
        toggle() {
            this.drawer = !this.drawer;
        },
    },
});
