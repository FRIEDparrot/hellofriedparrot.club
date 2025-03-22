import { createI18n, I18n } from "vue-i18n";

// ! create i18n instance, this is the main entry point for locale messages
const i18n = createI18n({
    legacy: false, // ! enable legacy mode
    globalInjection: true, // ! enable global injection
    locale: "en", // ! get prefered language code from local storage or set to English as default
    fallbackLocale: false, // Disable fallbackLocale to avoid falling back to a default language
    silentFallbackWarn: true, // ! Disable fallback warning
    missing: (locale, key) => {
        return key.split(".").pop(); // directly return key if missing translation
    },
    messages: {
        // language packs are imported dynamically in SetLanguage function
    },
}) as I18n;

/**
 * Description:
 * - this function load language packs and set the language code to local storage
 * - note :  this is not global function, see store.setPreferedLangCode()
 * @warning: must use ``this.$i18n.locale = lang_code;`` to set language code to i18n instance
 *            before calling this function in components
 *           or use ``window.location.reload();`` to reload the page to apply the language change
 * @param {any} lang_code:string
 * @returns {any}
 */
export async function SetLanguage(lang_code: string) {
    // load language packs
    try {
        const message = await import(`@locales/packages/${lang_code}.json`);
        i18n.global.setLocaleMessage(lang_code, message);
        i18n.global.locale = lang_code; // set language code to i18n instance
    } catch (error) {
        console.error(error);
    }
}

export default i18n;
