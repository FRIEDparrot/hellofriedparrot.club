import { defineComponent } from 'vue';

interface DirectoryItem {
    t: string; // translated title
    type: 'file' | 'folder'; // type
    url?: string; //  url (only for files)
    icon?: string; // icon (file or folder)
    d?: Record<string, DirectoryItem>; // sub-directory (only for folders)
}

interface Directory {
    [key: string]: DirectoryItem; // dynamic DirectoryItem
}

export default defineComponent({
    name: 'markdownFileListView',
    components: {},
    props: {
        header: {
            type: String,
            default: '',
        },
        base_url: {
            type: String,
            default: 'rules',
        },
        directory: {
            /* for standard example : see backend/Project/assets/rules/en/trans.json */
            type: Object as () => Directory, //  use object type to allow dynamic keys
            default: () => ({}), // default value is empty object
        },
    },
    data() {
        return {
            BaseUrl: '', // processed base_url
        };
    },
    mounted() {
        let url = this.base_url; // get base_url from props
        if (url.endsWith('/')) {
            url = url.slice(0, -1); // remove last slash if any
        }
        if (url.startsWith('/')) {
            // remove first slash if any
            url = url.slice(1);
        }
        this.BaseUrl = url;
    },
    methods: {
        /**
         * Note: we force reload the current page to update the content
         *     because Vue Router doesn't update the content of the same page.
         *     not use route.push() here because it will cause a full page reload.
         */
        handleClick(event, url) {
            const isCtrlPressed = event.ctrlKey || event.metaKey; // for mac users
            if (isCtrlPressed) {
                window.open('/' + this.BaseUrl + '/' + url, '_blank');
            } else {
                window.open('/' + this.BaseUrl + '/' + url, '_self'); // force reload current page
            }
        },
    },
    computed: {},
});
