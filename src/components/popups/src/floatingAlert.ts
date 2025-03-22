import { defineComponent } from 'vue';
import '@/assets/anims/animation_main';
import gsap from 'gsap';

export default defineComponent({
    name: 'floatingAlert',
    props: {
        maxWidth: {
            type: Number,
            default: 500,
        },
    },
    data() {
        return {
            show_alert: false,
            type: 'success' as 'success' | 'error' | 'info' | 'warning',
            title: '',
            text: '',
        };
    },
    methods: {
        show(
            type = 'success' as 'success' | 'error' | 'info' | 'warning',
            title = 'success',
            text = '',
        ) {
            // const alert_obj = document.getElementById("floating-alert");
            const alert_ref: any = this.$refs.alertRef;
            const alert_obj: any = alert_ref.$el;

            const types = ['success', 'error', 'info', 'warning'];
            if (!types.includes(type)) {
                type = 'success';
            }
            this.type = type;
            this.title = title; // translate title
            this.text = text; // no need to translate text
            this.show_alert = true;
            this.$nextTick(() => {
                gsap.effects.floatingAlertWindow(alert_obj);
            });
            this.show_alert = false;
        },
    },
});
