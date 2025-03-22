import { DefineComponent, watch } from 'vue';
import i18n from '@lang/index';

export interface Column {
    description: string; // description of the column
    titleKey: string; // the columns title key in i18n, see @lang/index.ts
    index: number; // the index of the column in the table
    url?: string | Record<string, unknown>; // the router link if needed
    child?: Column[]; // subcolumns if needed
}

const MainColumns: Column[] = [
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
                url: '/blogs?tag=life',
            },
            {
                description: 'Technology Sharing',
                titleKey: 'g.columns.tech',
                index: 1,
                url: '/blogs?tag=tech',
            },
            {
                description: 'Basic knowledges',
                titleKey: 'g.tag.knowledges',
                index: 2,
                url: '/blogs?tag=knowledges',
            },
            {
                description: 'Other Blogs',
                titleKey: 'g.columns.other',
                index: 3,
                url: '/blogs?tag=other',
            },
        ],
    },
    {
        description: 'resources column',
        titleKey: 'g.columns.resources',
        index: 1,
        url: '/resources',
    },
    {
        description: 'projects column',
        titleKey: 'g.columns.projects',
        index: 2,
        url: '/projects',
    },
    {
        description: 'forums column',
        titleKey: 'g.columns.forums',
        index: 3,
        url: '/forums',
    },
    {
        description: 'products column',
        titleKey: 'g.columns.products',
        index: 4,
        url: '/products',
    },
];

MainColumns.sort((a, b) => a.index - b.index); // sort the columns by index
export default MainColumns;
