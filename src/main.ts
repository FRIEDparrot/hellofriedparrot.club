/**
 * @ this is the file loaded by index.html after all the scripts are loaded
 */
import '@/styles/base.css';
import 'vuetify/styles';
import router from '@router/index'; // ! import router
import { createApp } from 'vue';
import App from './App.vue';
import i18n from '@lang/index';
import { createVuetify } from 'vuetify'; // ! import vuetify plugin
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { getDarkMode } from './store';
import store from '@/store';
import vuetifyTheme from '@styles/vuetify/vuetify_theme';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: getDarkMode() ? 'dark' : 'light',
        themes: vuetifyTheme,
    },
});

/**
 * Directly use Vue Here
 */
const app = createApp(App);
app.use(vuetify); // use vuetify plugin for UI components
app.use(i18n); // use i18n plugin for translation support
app.use(router); // use Vue Router for routing support
app.use(store); // use Vuex for state management support
app.mount('#app');
