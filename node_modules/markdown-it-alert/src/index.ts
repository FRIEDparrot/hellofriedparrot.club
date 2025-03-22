"use strict";

import { Container } from "./container";
import MarkdownIt from "markdown-it";
import { AlertsOptions } from "./types";

export default function (md: MarkdownIt, options: AlertsOptions) {
	let containerOpenCount = 0;
	const links: boolean = options && options.links ? options.links : true;
	const bem: boolean = options && options.bem ? options.bem : false;
	const role: boolean = options && options.role ? options.role : true;
	const tag: string = options && options.tag ? options.tag : "div";
	const alertTypes: string[] =
		options && options.types
			? options.types
			: ["info", "warning", "error", "danger", "tip", "success"];

	init(alertTypes);
	return;

	function setupContainer(name: string) {
		md.use(Container, name, {
			render: function (tokens, idx) {
				if (tokens[idx].nesting === 1) {
					containerOpenCount += 1;

					const roleHtml = role ? `role="alert"` : ``;
					const classHtml = bem
						? `alert alert--${name}`
						: `alert alert-${name}`;
					return `<${tag} class="${classHtml}" ${roleHtml}>\n`;
				} else {
					containerOpenCount -= 1;
					return `</${tag}>\n`;
				}
			},
		});
	}

	function isContainerOpen() {
		return containerOpenCount > 0;
	}

	function selfRender(tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	}

	function setupLinks() {
		var defaultRender = md.renderer.rules.link_open || selfRender;

		md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
			const alertClass = bem ? `alert--link` : `alert-link`;
			if (isContainerOpen()) {
				tokens[idx].attrPush(["class", alertClass]);
			}

			return defaultRender(tokens, idx, options, env, self);
		};
	}

	function init(alertTypes: string[]) {
		alertTypes.forEach((el) => setupContainer(el));
		if (links) {
			setupLinks();
		}
	}
}
