import { defineComponent } from 'vue';
import { IstdMenuItem } from '@/interface/iterators/stdMenuList';
import store from '@/store';

export default defineComponent({
    name: 'compactFolderList',
    props: {
        useUrlLink: {
            type: Boolean,
            default: false,
        },
        useCallback: {
            type: Boolean,
            default: false,
        },
        useTranslation: {
            type: Boolean,
            default: false,
        },
        density: {
            type: String as () => 'compact' | 'default' | 'comfortable',
            default: 'compact',
        },
        items: {
            type: Array<IstdMenuItem>,
            required: true,
        },
    },
    data() {
        return {
            openStates: new Array(this.items.length).fill(false), // default all closed
            open: [true],
            user: {
                priority: store.state.user.priority,
            },
        };
    },
    methods: {
        handleClick(event: MouseEvent, item: any) {
            if (this.useCallback) {
                item.callback(event); // call the callback function if provided
            }
            if (this.useUrlLink) {
                event.preventDefault();
                this.navigateTo(event, item.url); // navigate to the url if provided
            }
        },
        navigateTo(event: any, url: string) {
            if (event.ctrlKey || event.metaKey) {
                window.open(url, '_blank');
            } else {
                this.$router.push(url);
            }
        },
    },
    mounted() {
        for (let i = 0; i < this.items.length; i++) {
            this.openStates[i] = this.items[i].open === true;
        }
    },
});
