"use strict";
exports.__esModule = true;
exports.renderMarkdownContent = exports.keepMarkdownEmptyLines = exports.generateTitleId = exports.addHtmlHeadingTagId = exports.getMarkdownHeadersByHTML = void 0;
var _1 = require("."); // index.ts file
var lodash_es_1 = require("lodash-es");
var headingRegExp = /<h([1-6])\b([^>]*)>(.*?)<\/h[1-6]>/gm;
/**
 * Description This function extracts the headings object from the markdown content.
 * @param {any} match:RegExpExecArray
 * @param {any} idCountMap:Map<string
 * @param {any} number>
 * @returns {any}
 */
function processHeading(match, idCountMap) {
    var level = parseInt(match[1], 10);
    var titleRaw = extractTextFromHTML(match[3]);
    var baseId = generateTitleId(titleRaw);
    if (!baseId)
        return null;
    var count = (idCountMap.get(baseId) || 0) + 1;
    idCountMap.set(baseId, count);
    var uniqueId = baseId + "-" + count;
    return { level: level, title: titleRaw, id: uniqueId };
}
/**
 * Description
 *   Extracts the headings from the markdown content
 *
 * @bug for comment in the block, the heading is still wrongly detected.
 * @param {any} html_content:string
 * @returns {any} returns an array of objects containing the level, title and id of each heading.
 */
function getMarkdownHeadersByHTML(html_content) {
    var headings = [];
    var titles_map = new Map(); // to resolve repeated headings
    while (true) {
        var match = headingRegExp.exec(html_content);
        if (match === null) {
            break;
        }
        var heading = processHeading(match, titles_map);
        if (heading) {
            headings.push(heading);
        }
    }
    return headings;
}
exports.getMarkdownHeadersByHTML = getMarkdownHeadersByHTML;
/**
 * Description This function add the id attribute to the heading id in the html content.
 * @param {any} html_content:string
 * @param {any} render_title_link:boolean - if true, add a link to the heading title.
 * @returns {any}
 */
function addHtmlHeadingTagId(html_content, render_title_link) {
    if (render_title_link === void 0) { render_title_link = true; }
    var content = "" + html_content; // make a copy of the content to avoid modifying it
    var titles_arr = [];
    var _loop_1 = function () {
        var match = headingRegExp.exec(html_content); // find all headings in the html content
        if (match === null) {
            return "break";
        }
        var level = parseInt(match[1], 10); // 10 is the radix
        var titleExtraInfo = match[2];
        var titleWithTag = match[3];
        var title_raw = extractTextFromHTML(titleWithTag); // extract pure text from the title
        var title_id = generateTitleId(title_raw); // generate id for the heading
        if (title_id != '') {
            titles_arr.push(title_id);
            var counter = titles_arr.filter(function (h) { return h === title_id; }).length;
            var unique_id = title_id + '-' + counter.toString(); // create unique tag for repeated headings
            /* add id at the end of the tag to override it */
            var label_with_id = "<span class=\"md-heading\">" +
                ("<a href=\"#" + lodash_es_1.escape(unique_id) + "\" style=\"text-decoration:none\">") +
                ("<h" + level + " ") +
                lodash_es_1.escape(titleExtraInfo) +
                (" id=\"" + lodash_es_1.escape(unique_id) + "\">") +
                lodash_es_1.escape(title_raw) +
                ("</h" + level + ">") +
                "</a></span>";
            content = content.replace(match[0], label_with_id);
        }
    };
    while (true) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    return content;
}
exports.addHtmlHeadingTagId = addHtmlHeadingTagId;
/**
 * Helper function to extract pure text from HTML content by removing all tags.
 * @param {string} html - The HTML string to process.
 * @returns {string} - The extracted plain text.
 */
function extractTextFromHTML(html) {
    // Create a temporary element to leverage browser's DOMParser to extract text
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText || div.textContent || ''; // use innerText for extract text from tags
}
/**
 * Description Generates a unique id for the heading based on the title.
 * @warning The final id may be '' if the title is empty or contains only non-alphanumeric characters.
 *              so it's important to check for empty or invalid titles before calling this function.
 * @param {any} title:string
 * @returns {any}
 */
function generateTitleId(title) {
    // note : url is ci, so need to lowercase and replace spaces with hyphen
    var title_processed = title.toLowerCase();
    // only keep alphanumeric characters and hyphen (keep . and _) for id
    title_processed = title_processed.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\uac00-\ud7af\u3040-\u30ff\u31f0-\u31ff\uff00-\uffef-_.]+/g, '-');
    // replace multiple hyphens and underscores with single hyphen
    title_processed = title_processed.replace(/[-_]+/g, '-');
    // remove leading and trailing hyphens and underscores
    title_processed = title_processed
        .replace(/^[\-_]+/, '')
        .replace(/[\-_]+$/, '');
    // limit the length of the id to 128 characters to avoid exceeding the maximum length of a tag in HTML
    if (title_processed.length > 128) {
        title_processed = title_processed.slice(0, 128);
    }
    return title_processed;
}
exports.generateTitleId = generateTitleId;
var options = {
    outMath: {
        //You can set which formats should be included into html result
        include_mathml: true,
        include_asciimath: true,
        include_latex: true,
        include_svg: true,
        include_tsv: true,
        include_table_html: true
    }
};
function keepMarkdownEmptyLines(content) {
    var parts = content.split(/(```[\s\S]*?```)/g);
    for (var i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            parts[i] = parts[i].replace(/\n\n+/g, '\n&nbsp;\n');
        }
    }
    return parts.join('');
}
exports.keepMarkdownEmptyLines = keepMarkdownEmptyLines;
/**
 * Description This function render the markdown content.
 *
 * @param {any} content:string
 * @returns {any}
 */
function renderMarkdownContent(content, render_title_link) {
    if (render_title_link === void 0) { render_title_link = true; }
    /* preprocessing: replace blank row with <p></p> */
    content = keepMarkdownEmptyLines(content);
    content = content.replace(/<\/table>/g, '</table><p></p>');
    var html_content = _1["default"].render(content, {});
    // add target="_blank" to external links
    html_content = html_content.replace(/<a href="([^"]+)>"/g, '<a href="$1" target="_blank">');
    html_content = addHtmlHeadingTagId(html_content, render_title_link);
    return html_content;
}
exports.renderMarkdownContent = renderMarkdownContent;
