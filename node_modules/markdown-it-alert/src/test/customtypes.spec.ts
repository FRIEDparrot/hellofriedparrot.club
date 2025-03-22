import alert from "..";
import MarkdownIt from "markdown-it";

const md: MarkdownIt = new MarkdownIt();

describe("Custom Types", () => {
  it("Create your own custom type", () => {
    md.use(alert, { types: ["own"] });

    const exampleInput = `
::: own
Generated with a custom type
:::
`;
    const renderedDocument = md.render(exampleInput);
    expect(renderedDocument).toEqual(
      `<div class="alert alert-own" role="alert">
<p>Generated with a custom type</p>
</div>
`
    );
  });
});
