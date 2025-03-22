import alert from "..";
import MarkdownIt from "markdown-it";

const md: MarkdownIt = new MarkdownIt();

const exampleInput = `
::: tip
This is a tip
:::
`;

describe("BEM", () => {
  it("Markdown Alert should be rendered with normal syntax", () => {
    md.use(alert, { bem: false });
    try {
      const renderedDocument = md.render(exampleInput);
      expect(renderedDocument).toEqual(
        `<div class="alert alert-tip" role="alert">
<p>This is a tip</p>
</div>
`
      );
    } catch (err) {
      throw Error(err);
    }
  });

  it("Markdown Alert should be rendered with BEM syntax", () => {
    md.use(alert, { bem: true });
    try {
      const renderedDocument = md.render(exampleInput);
      expect(renderedDocument).toEqual(
        `<div class="alert alert--tip" role="alert">
<p>This is a tip</p>
</div>
`
      );
    } catch (err) {
      throw Error(err);
    }
  });
});
