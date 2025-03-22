import MarkdownIt from "markdown-it";

import { ContainerSettings, ContainerOptions } from "./types";

export const Container = (
  md: MarkdownIt,
  name: string,
  options: ContainerOptions
) => {
  const validateDefault = (params) => {
    return params.trim().split(" ", 2)[0] === name;
  };

  const renderDefault = (tokens: any[], idx: number, _options, env, self) => {
    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrPush(["class", name]);
    }

    return self.renderToken(tokens, idx, _options, env, self);
  };

  options = options || {};

  const min_markers = 3;
  const marker_str = options.marker || ":";
  const marker_char = marker_str.charCodeAt(0);
  const marker_len = marker_str.length;
  const validate = options.validate || validateDefault;
  const render = options.render || renderDefault;

  const container = (state, startLine, endLine, silent) => {
    let d: ContainerSettings = {
      startLine: startLine,
      endLine: endLine,
      silent: silent,
      auto_closed: false,
      start: state.bMarks[startLine] + state.tShift[startLine],
      max: state.eMarks[startLine],
    };

    // Check out the first character quickly,
    // this should filter out most of non-containers
    //
    if (marker_char !== state.src.charCodeAt(d.start)) return false;

    // Check out the rest of the marker string
    //
    for (d.pos = d.start + 1; d.pos <= d.max; d.pos++)
      if (marker_str[(d.pos - d.start) % marker_len] !== state.src[d.pos])
        break;

    d.marker_count = Math.floor((d.pos - d.start) / marker_len);
    if (d.marker_count < min_markers) return false;

    d.pos -= (d.pos - d.start) % marker_len;

    d.markup = state.src.slice(d.start, d.pos);
    d.params = state.src.slice(d.pos, d.max);

    if (!validate(d.params)) return false;

    // Since start is found, we can report success here in validation mode
    //
    if (d.silent) return true;

    // Search for the end of the block
    //
    d.nextLine = d.startLine;

    for (;;) {
      d.nextLine++;
      if (d.nextLine >= d.endLine)
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;

      d.start = state.bMarks[d.nextLine] + state.tShift[d.nextLine];
      d.max = state.eMarks[d.nextLine];

      if (d.start < d.max && state.sCount[d.nextLine] < state.blkIndent)
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;

      if (marker_char !== state.src.charCodeAt(d.start)) continue;

      if (state.sCount[d.nextLine] - state.blkIndent >= 4) continue;
      // closing fence should be indented less than 4 spaces

      for (d.pos = d.start + 1; d.pos <= d.max; d.pos++)
        if (marker_str[(d.pos - d.start) % marker_len] !== state.src[d.pos])
          break;

      // closing code fence must be at least as long as the opening one
      if (Math.floor((d.pos - d.start) / marker_len) < d.marker_count) continue;

      // make sure tail has spaces only
      d.pos -= (d.pos - d.start) % marker_len;
      d.pos = state.skipSpaces(d.pos);

      if (d.pos < d.max) continue;

      // found!
      d.auto_closed = true;
      break;
    }

    d.old_parent = state.parentType;
    d.old_line_max = state.lineMax;
    state.parentType = "container";

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = d.nextLine;

    d.token = state.push("container_" + name + "_open", "div", 1);
    d.token.markup = d.markup;
    d.token.block = true;
    d.token.info = d.params;
    d.token.map = [d.startLine, d.nextLine];

    state.md.block.tokenize(state, d.startLine + 1, d.nextLine);

    d.token = state.push("container_" + name + "_close", "div", -1);
    d.token.markup = state.src.slice(d.start, d.pos);
    d.token.block = true;

    state.parentType = d.old_parent;
    state.lineMax = d.old_line_max;
    state.line = d.nextLine + (d.auto_closed ? 1 : 0);

    return true;
  }

  md.block.ruler.before("fence", "container_" + name, container, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });
  md.renderer.rules["container_" + name + "_open"] = render;
  md.renderer.rules["container_" + name + "_close"] = render;
};
