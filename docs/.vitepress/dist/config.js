"use strict";
exports.__esModule = true;
var vitepress_1 = require("vitepress");
// https://vitepress.dev/reference/site-config
exports["default"] = vitepress_1.defineConfig({
    title: "HelloFriedParrot.club",
    description: "open source platform for blogs and resources",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Components", link: "/components/" },
        ],
        sidebar: [
            {
                text: "Components",
                items: [
                    { text: "MyComponent", link: "/components/MyComponent" },
                ]
            },
            {
                text: "Examples",
                items: [
                    { text: "Markdown Examples", link: "/markdown-examples" },
                    { text: "Runtime API Examples", link: "/api-examples" },
                ]
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ]
    }
});
