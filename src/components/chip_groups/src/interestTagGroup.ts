import tagChooseOverlay from '@/components/overlays/tag_choose_overlay.vue';
import { defineComponent, PropType } from 'vue';
import InterestTag from '@/interface/classes/interestTag_cls';

export default defineComponent({
    name: 'tagGroup',
    emits: ['update:items'],
    components: {
        tagChooseOverlay,
    },
    props: {
        items: {
            type: Array as PropType<InterestTag[]>,
            required: true,
        },
        column: {
            type: Boolean,
            default: true,
        },
        max: {
            type: Number,
            default: 5,
        },
        allowModify: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'small',
        },
        showNoTagText: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {
        getTagTranslation() {
            const lang = this.$i18n.locale;
            return (tag: InterestTag) => {
                return tag[lang] ?? tag.en ?? '';
            };
        },
    },
    methods: {
        updateTags(newTags: InterestTag[]) {
            this.$emit('update:items', newTags);
        },
        removeTag(idx: number) {
            const newTags = [...this.items];
            newTags.splice(idx, 1);
            this.updateTags(newTags); // update parent component
        },
        showTagChooseOverlay() {
            const overlay = this.$refs.tagChooseOverlay as any;
            if (overlay) {
                // use current tags object
                overlay.show(this.items);
            }
        },
    },
});
