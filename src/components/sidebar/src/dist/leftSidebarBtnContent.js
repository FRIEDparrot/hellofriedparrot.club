"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var menuBtn_vue_1 = require("@/components/buttons/menuBtn.vue");
exports["default"] = vue_1.defineComponent({
    name: 'LeftSideBarBtnContent',
    data: function () {
        return {
            drawer_perm: true,
            drawer_temp: false,
            selectedItem: 0,
            toggle_by_btn: false
        };
    },
    props: {
        useWholeDrawer: {
            type: Boolean,
            "default": false
        }
    },
    components: {
        menuBtn: menuBtn_vue_1["default"]
    },
    watch: {
        drawer_temp: function (val) {
            var menuToggleBtn = this.$refs.menuToggleBtn;
            menuToggleBtn.SetMenuState(this.drawer_temp, null);
        },
        drawer_perm: function (val) {
            if (!val) {
                this.drawer_temp = false; // close drawer when permanent drawer is closed
            }
        }
    },
    methods: {
        toggle: function () {
            if (this.useWholeDrawer) {
                var show = !this.drawer_perm;
                this.drawer_perm = show;
                //consistent with drawer_temp
            }
            else {
                var show = !this.drawer_temp;
                this.drawer_temp = show;
            }
        },
        select: function (value) {
            if (this.selectedItem === value && this.drawer_temp) {
                this.drawer_temp = false;
                // close drawer when click on same item on open state
            }
            else {
                this.drawer_temp = true;
            }
            this.selectedItem = value; // update selected item
        }
    },
    mounted: function () {
        if (this.useWholeDrawer) {
            this.drawer_perm = false;
        }
    }
});
