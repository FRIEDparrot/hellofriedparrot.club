import mdContainer from "markdown-it-container";

export default function markdownContainerConfig(mdIt) {
    mdIt.use(mdContainer, "summary", {
        validate: function (params) {
            return params.trim().match(/^\[! summary\]$/);
        },
        render: function (tokens, idx) {
            const token = tokens[idx];
            if (token.nesting === 1) {
                return '<div class="summary">\n';
            } else {
                return "</div>\n";
            }
        },
    });
}
