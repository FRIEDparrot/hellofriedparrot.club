"use strict";
exports.__esModule = true;
exports.renderCodeBlocks = void 0;
var markdown_it_1 = require("markdown-it");
var highlight_js_1 = require("highlight.js");
var plugin_alert_1 = require("@mdit/plugin-alert");
/**
 *  This file gives mdit plugin and global markdown-it instance for the website.
 *
 * for every where use markdown heading rendering, use :
 *      ``@import @styles/markdown/md_headings.css``
 */
var mdIt = markdown_it_1["default"]("default", {
    html: true,
    linkify: true,
    typographer: false,
    breaks: true,
    highlight: function (str, lang) {
        if (lang && highlight_js_1["default"].getLanguage(lang)) {
            try {
                return ('<pre><code class="hljs">' +
                    highlight_js_1["default"].highlight(str, {
                        language: lang,
                        ignoreIllegals: true
                    }).value +
                    "</code></pre>");
            }
            catch (__) { }
        }
        return ('<pre><code class="hljs">' +
            mdIt.utils.escapeHtml(str) +
            "</code></pre>"); // use external default escaping
    }
})
    .use(plugin_alert_1.alert)
    .enable("image");
mdIt.linkify.set({ fuzzyEmail: false }); // disables converting email to link
function renderCodeBlocks() {
    document.querySelectorAll("pre code").forEach(function (block) {
        highlight_js_1["default"].highlightElement(block); // highlight code
    });
}
exports.renderCodeBlocks = renderCodeBlocks;
exports["default"] = mdIt;
