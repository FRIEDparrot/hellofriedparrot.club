import { defineComponent, watch } from 'vue';
import MarkdownHeader from '@/interface/classes/markdownHeader_cls';

export default defineComponent({
    name: 'MarkdownOutline',
    props: {
        title: {
            type: String,
            default: '',
        },
        titleClass: {
            type: String,
            default: 'bg-sidebar_heading',
        },
        headings: {
            type: Array<MarkdownHeader>,
            required: true,
        },
        headingOffset: {
            type: Number,
            default: 65, // heading bar height
        },
        outlineLevelOffset: {
            type: Number,
            default: 6, // outline level offset
        },
        showOutlineLevel: {
            type: Boolean,
            default: true,
        },
        scrollOffset: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            open: [
                true, //  every item set value to true to start with all opened
            ],
            TitleOpened: [] as boolean[], // array to store the open state of title groups
            canCollapseArr: [] as boolean[],
            renderHeadings: [] as any[], // array to store the headings to be rendered
        };
    },
    methods: {
        /**
         * Description This is the main function for render the headings
         * @returns {any}
         */
        loadHeadings() {
            const renderHeadings: Array<any> = [];
            const canCollapseArr: Array<boolean> = [];

            let lptr = 0;
            let subHeadings: Array<any> = [];

            const headings: any[] = this.headings; // get self props headings array

            for (let i = 1; i < headings.length; i++) {
                if (headings[i].level <= headings[lptr].level) {
                    renderHeadings.push({
                        ...headings[lptr],
                        subHeadings: subHeadings,
                    }); // add the previous heading to the array
                    canCollapseArr.push(subHeadings.length > 0); // add the collapse state to the array
                    lptr = i; // update the pointer to the current heading
                    subHeadings = []; // reset the sub-headings array
                } else {
                    subHeadings.push({ ...headings[i] }); // add the sub-heading to the array
                }
            }
            renderHeadings.push({
                ...headings[lptr],
                subHeadings: subHeadings, // add the last heading to the array
            });
            canCollapseArr.push(subHeadings.length > 0); // add the collapse state to the array

            // set the data to the component
            this.renderHeadings = renderHeadings;
            this.canCollapseArr = canCollapseArr;
            this.TitleOpened = new Array(renderHeadings.length).fill(true); // set all title groups to closed state
        },

        scrollToSection(id: string) {
            const target = document.getElementById(id);
            if (target) {
                const targetPosition = target.offsetTop + target.offsetHeight;
                const scrollToPosition = targetPosition + this.scrollOffset;
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth',
                });
            }
        },
    },
    mounted() {
        /**
         * when sub item mounting, it not call the loadHeadings function, so call it manually
         */
        this.loadHeadings();
    },
    watch: {
        // when headings array changed, reload the headings
        headings() {
            this.loadHeadings();
        },
    },
});
