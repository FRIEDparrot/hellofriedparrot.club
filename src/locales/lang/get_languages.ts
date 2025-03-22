export const SupportedLanguages: string[] = ["en", "zh"];

export function isSupportedLanguage(str: string) {
    return SupportedLanguages.includes(str);
}

export function getBrowserLanguage() {
    const nav = window.navigator;
    const browser_langanage_code = navigator.languages[0].split("-")[0];
    const language_code = browser_langanage_code.toLowerCase();

    if (language_code != "en" && language_code != "zh") {
        return "en"; // fall back to English if language is not supported
    }
    return language_code;
}
