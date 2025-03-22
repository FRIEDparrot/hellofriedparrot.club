"use strict";
exports.__esModule = true;
var highlight_js_1 = require("highlight.js");
var code_heading_colors_1 = require("./code_heading_colors");
var code_heading_icons_1 = require("./code_heading_icons");
var clipboard_1 = require("clipboard");
var copyIcon = "<i class=\"far fa-copy\" width=\"100%\" height=\"100%\"></i>";
var copyBtn = "\n            <button class=\"md-code-copy-btn\">\n                " + copyIcon + "\n            </button>\n        ";
var clipboard = new clipboard_1["default"]('.md-code-copy-btn', {
    text: function (trigger) {
        var target_container = trigger.closest('pre');
        var target = target_container.querySelector('pre > code.hljs');
        if (!target)
            return '';
        return target.innerText || target.textContent || '';
    }
});
clipboard.on('success', function (e) {
    var button = e.trigger;
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(function () {
        button.innerHTML = copyIcon;
    }, 500);
    e.clearSelection(); // clear selection after copying
});
clipboard.on('error', function (e) {
    var button = e.trigger;
    button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    setTimeout(function () {
        button.innerHTML = copyIcon;
    }, 500);
    console.error('Action failed : ', e.action);
});
function getLangColor(lang) {
    var colors = code_heading_colors_1["default"];
    return colors[lang.toLowerCase()] || colors["default"];
}
function getLangIcon(lang) {
    var icons = code_heading_icons_1["default"];
    return icons[lang.toLowerCase()] || icons["default"];
}
/**
 * Description
 *
 * @param {any} mdIt:any
 * @param {any} str
 * @param {any} lang
 * @returns {any}
 */
function hightlightjs_function(mdIt, str, lang) {
    if (lang && highlight_js_1["default"].getLanguage(lang)) {
        var code_title_bg_color = getLangColor(lang);
        var code_title_block = "  \n            <div class=\"md-code-title\" style=\"background-color: " + code_title_bg_color + ";\">  \n                <span class=\"md-code-title-content\">\n                    <div class=\"md-code-fold-btn\"><i class=\"md-code-fold-icon fa-solid fa-angle-down\"></i></div>\n                    <span class=\"md-code-lang-icon\">" + getLangIcon(lang) + "</span>\n                </span>  \n                <span class=\"md-code-language\">" + lang + "</span>\n                " + copyBtn + "\n            </div>  \n        ";
        var highlightedCode = highlight_js_1["default"].highlight(str, {
            language: lang,
            ignoreIllegals: true
        }).value;
        var lines = str.split('\n');
        var lineNumbers = lines
            .slice(0, -1)
            .map(function (line, index) {
            return "<div class=\"line-number\">" + (index + 1) + "</div>";
        })
            .join("");
        try {
            return ("" + code_title_block +
                '<div class="code-block-wrapper">' +
                '<div class="line-numbers-block">' +
                lineNumbers +
                '</div>' +
                '<pre><code class="hljs">' +
                highlightedCode +
                '</code></pre>' +
                '</div>');
        }
        catch (error) {
            console.error(error);
        }
    }
    return ('<pre><code class="hljs">' +
        mdIt.utils.escapeHtml(str) +
        '</code></pre>'); // use external default escaping
}
exports["default"] = hightlightjs_function;
