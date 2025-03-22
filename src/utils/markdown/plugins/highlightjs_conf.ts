import hljs from 'highlight.js';
import code_heading_colors from './code_heading_colors';
import code_heading_icons from './code_heading_icons';
import ClipboardJS, { copy } from 'clipboard';

const copyIcon = `<i class="far fa-copy" width="100%" height="100%"></i>`;
const copyBtn = `
            <button class="md-code-copy-btn">
                ${copyIcon}
            </button>
        `;

var clipboard = new ClipboardJS('.md-code-copy-btn', {
    text: function (trigger) {
        const target_container: HTMLElement | null = trigger.closest(
            'pre',
        ) as HTMLElement;
        const target: HTMLElement | null =
            target_container.querySelector('pre > code.hljs');
        if (!target) return '';
        return target.innerText || target.textContent || '';
    },
});

clipboard.on('success', function (e) {
    const button = e.trigger as HTMLElement;
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(function () {
        button.innerHTML = copyIcon;
    }, 500);
    e.clearSelection(); // clear selection after copying
});

clipboard.on('error', function (e) {
    const button = e.trigger as HTMLElement;
    button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    setTimeout(function () {
        button.innerHTML = copyIcon;
    }, 500);
    console.error('Action failed : ', e.action);
});

function getLangColor(lang) {
    const colors = code_heading_colors;
    return colors[lang.toLowerCase()] || colors.default;
}

function getLangIcon(lang): string {
    const icons = code_heading_icons;
    return icons[lang.toLowerCase()] || icons.default;
}

/**
 * Description
 *
 * @param {any} mdIt:any
 * @param {any} str
 * @param {any} lang
 * @returns {any}
 */
export default function hightlightjs_function(mdIt: any, str, lang): string {
    if (lang && hljs.getLanguage(lang)) {
        const code_title_bg_color = getLangColor(lang);

        const code_title_block = `  
            <div class="md-code-title" style="background-color: ${code_title_bg_color};">  
                <span class="md-code-title-content">
                    <div class="md-code-fold-btn"><i class="md-code-fold-icon fa-solid fa-angle-down"></i></div>
                    <span class="md-code-lang-icon">${getLangIcon(lang)}</span>
                </span>  
                <span class="md-code-language">${lang}</span>
                ${copyBtn}
            </div>  
        `;

        const highlightedCode = hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true,
        }).value;
        const lines = str.split('\n');
        const lineNumbers = lines
            .slice(0, -1)
            .map((line, index) => {
                return `<div class="line-number">${index + 1}</div>`;
            })
            .join(``);

        try {
            return (
                `${code_title_block}` +
                '<div class="code-block-wrapper">' +
                '<div class="line-numbers-block">' +
                lineNumbers +
                '</div>' +
                '<pre><code class="hljs">' +
                highlightedCode +
                '</code></pre>' +
                '</div>'
            );
        } catch (error) {
            console.error(error);
        }
    }
    return (
        '<pre><code class="hljs">' +
        mdIt.utils.escapeHtml(str) +
        '</code></pre>'
    ); // use external default escaping
}
