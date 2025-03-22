import markdownit from "markdown-it";
import hljs from "highlight.js";
import { alert } from "@mdit/plugin-alert";
import markdownItXss from "markdown-it-xss";
import markdownItVideo from "markdown-it-video";
import markdownItTexMath from "markdown-it-texmath";
import markdownItCollapse from "markdown-it-collapsible";
import markdownItAttrs from "markdown-it-attrs";
import katex from "katex";
import { markdownItTable } from "markdown-it-table";
import markdownContainerConfig from "./plugins/mdIt_container_conf";
import hightlightjs_function from "./plugins/highlightjs_conf";

/**
 *  This file gives mdit plugin and global markdown-it instance for the website.
 *
 * for every where use markdown heading rendering, use :
 *      ``@import @/styles/markdown/md_theme_xxxx.css``
 */

const mdIt = markdownit("default", {
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: (str, lang) => hightlightjs_function(mdIt, str, lang),
})
    .use(alert)
    .use(markdownItXss)
    .use(markdownItVideo)
    .use(markdownItAttrs)
    .use(markdownItTable)
    .use(markdownItCollapse)
    .use(markdownItTexMath, {
        engine: katex,
        render: (tex, isDisplayMode) => {
            // use KaTeX to render TeX
            const rendered = katex.renderToString(tex, {
                displayMode: isDisplayMode,
            });
            // remove the part of aria-hidden="true"
            return rendered.replace(
                /<span class="katex-html" aria-hidden="true">(.*?)<\/span>/g,
                "",
            );
        },
    })
    .enable("image");

markdownContainerConfig(mdIt); // load markdown-it-container plugin

mdIt.linkify.set({ fuzzyEmail: false }); // disables converting email to link

export function renderCodeBlocks() {
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement); // highlight code
    });
}

export default mdIt;
