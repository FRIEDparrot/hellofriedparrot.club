"use strict";
exports.__esModule = true;
var MainColumns = [
    {
        description: 'blogs column',
        titleKey: 'g.columns.blogs',
        index: 0,
        url: '/blogs',
        child: [
            {
                description: 'life Miscellany',
                titleKey: 'g.columns.life',
                index: 0,
                url: '/blogs?tag=life'
            },
            {
                description: 'Technology Sharing',
                titleKey: 'g.columns.tech',
                index: 1,
                url: '/blogs?tag=tech'
            },
            {
                description: 'Basic knowledges',
                titleKey: 'g.tag.knowledges',
                index: 2,
                url: '/blogs?tag=knowledges'
            },
            {
                description: 'Other Blogs',
                titleKey: 'g.columns.other',
                index: 3,
                url: '/blogs?tag=other'
            },
        ]
    },
    {
        description: 'resources column',
        titleKey: 'g.columns.resources',
        index: 1,
        url: '/resources'
    },
    {
        description: 'projects column',
        titleKey: 'g.columns.projects',
        index: 2,
        url: '/projects'
    },
    {
        description: 'forums column',
        titleKey: 'g.columns.forums',
        index: 3,
        url: '/forums'
    },
    {
        description: 'products column',
        titleKey: 'g.columns.products',
        index: 4,
        url: '/products'
    },
];
MainColumns.sort(function (a, b) { return a.index - b.index; }); // sort the columns by index
exports["default"] = MainColumns;
