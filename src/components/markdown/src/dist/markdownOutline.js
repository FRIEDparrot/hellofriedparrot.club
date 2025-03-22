"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var vue_1 = require("vue");
var markdownHeader_cls_1 = require("@/interface/classes/markdownHeader_cls");
exports["default"] = vue_1.defineComponent({
    name: 'MarkdownOutline',
    props: {
        title: {
            type: String,
            "default": ''
        },
        titleClass: {
            type: String,
            "default": 'bg-sidebar_heading'
        },
        headings: {
            type: Array < markdownHeader_cls_1["default"] > ,
            required: true
        },
        headingOffset: {
            type: Number,
            "default": 65
        },
        outlineLevelOffset: {
            type: Number,
            "default": 6
        },
        showOutlineLevel: {
            type: Boolean,
            "default": true
        },
        scrollOffset: {
            type: Number,
            "default": 0
        }
    },
    data: function () {
        return {
            open: [
                true,
            ],
            TitleOpened: [],
            canCollapseArr: [],
            renderHeadings: []
        };
    },
    methods: {
        /**
         * Description This is the main function for render the headings
         * @returns {any}
         */
        loadHeadings: function () {
            var renderHeadings = [];
            var canCollapseArr = [];
            var lptr = 0;
            var subHeadings = [];
            var headings = this.headings; // get self props headings array
            for (var i = 1; i < headings.length; i++) {
                if (headings[i].level <= headings[lptr].level) {
                    renderHeadings.push(__assign(__assign({}, headings[lptr]), { subHeadings: subHeadings })); // add the previous heading to the array
                    canCollapseArr.push(subHeadings.length > 0); // add the collapse state to the array
                    lptr = i; // update the pointer to the current heading
                    subHeadings = []; // reset the sub-headings array
                }
                else {
                    subHeadings.push(__assign({}, headings[i])); // add the sub-heading to the array
                }
            }
            renderHeadings.push(__assign(__assign({}, headings[lptr]), { subHeadings: subHeadings }));
            canCollapseArr.push(subHeadings.length > 0); // add the collapse state to the array
            // set the data to the component
            this.renderHeadings = renderHeadings;
            this.canCollapseArr = canCollapseArr;
            this.TitleOpened = new Array(renderHeadings.length).fill(true); // set all title groups to closed state
        },
        scrollToSection: function (id) {
            var target = document.getElementById(id);
            if (target) {
                var targetPosition = target.offsetTop + target.offsetHeight;
                var scrollToPosition = targetPosition + this.scrollOffset;
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }
        }
    },
    mounted: function () {
        /**
         * when sub item mounting, it not call the loadHeadings function, so call it manually
         */
        this.loadHeadings();
    },
    watch: {
        // when headings array changed, reload the headings
        headings: function () {
            this.loadHeadings();
        }
    }
});
