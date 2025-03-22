"use strict";
exports.__esModule = true;
var MainColumns = [
    {
        description: "blogs column",
        titleKey: "g.columns.blogs",
        index: 0,
        url: "/blogs",
        child: [
            {
                description: "life Miscellany",
                titleKey: "g.columns.life",
                index: 0,
                url: "/blogs?category=life"
            },
            {
                description: "Technology Sharing",
                titleKey: "g.columns.tech",
                index: 1,
                url: "/blogs?category=tech"
            },
            {
                description: "Basic knowledges",
                titleKey: "g.columns.knowledges",
                index: 2
            },
            {
                description: "Other Blogs",
                titleKey: "g.columns.other",
                index: 3,
                url: "/blogs?category=other"
            },
        ]
    },
    {
        description: "resources column",
        titleKey: "g.columns.resources",
        index: 1,
        url: "/resources"
    },
    {
        description: "projects column",
        titleKey: "g.columns.projects",
        index: 2,
        url: "/projects"
    },
    {
        description: "forums column",
        titleKey: "g.columns.forums",
        index: 3,
        url: "/forums"
    },
    {
        description: "products column",
        titleKey: "g.columns.products",
        index: 4,
        url: "/products"
    },
];
MainColumns.sort(function (a, b) { return a.index - b.index; }); // sort the columns by index
exports["default"] = MainColumns;
/** in every component that uses the MainColumns array, use the following code:
 * to update the title of the columns when time the language changes
 */
// import { WatchEffect } from "vue";
// import  { useI18n } from "vue-i18n";
// setup() {
//     const { t } = useI18n();
//     watchEffect(() => {
//         for (const column of MainColumns) {
//             column.title = t(column.titleKey);
//         }
//     });
// }
