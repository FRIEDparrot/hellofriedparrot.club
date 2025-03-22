import alert from "..";
import MarkdownIt from "markdown-it";

const md: MarkdownIt = new MarkdownIt();

md.use(alert);

describe("Types", () => {
  it("No type should be rendered", async () => {
    const exampleInput = `
:::
This is a default
:::
	`;
    const renderedDocument = md.render(exampleInput);
    expect(renderedDocument).toEqual(
      `<p>:::
This is a default
:::</p>
`
    );
  });
  it("Tip", () => {
    const exampleInput = `
::: tip
This is a tip
:::
	`;
    const renderedDocument = md.render(exampleInput);
    expect(renderedDocument).toEqual(
      `<div class="alert alert-tip" role="alert">
<p>This is a tip</p>
</div>
`
    );
  });
  it("Success", () => {
    const exampleInput = `
::: success
This is a success
:::
	`;
    const renderedDocument = md.render(exampleInput);
    expect(renderedDocument).toEqual(
      `<div class="alert alert-success" role="alert">
<p>This is a success</p>
</div>
`
    );
  });
  it("Info", () => {
    const exampleInput = `
::: info
This is a info
:::
	`;
    const renderedDocument = md.render(exampleInput);
    expect(renderedDocument).toEqual(
      `<div class="alert alert-info" role="alert">
<p>This is a info</p>
</div>
`
    );
  });
  it("Error", () => {
    const exampleInput = `
::: error
This is an Error
:::
	`;
    const renderedDocument = md.render(exampleInput);
    expect(renderedDocument).toEqual(
      `<div class="alert alert-error" role="alert">
<p>This is an Error</p>
</div>
`
    );
  });
  it("Danger", () => {
    const exampleInput = `
::: danger
This is a Danger
:::
	`;
    const renderedDocument = md.render(exampleInput);
    expect(renderedDocument).toEqual(
      `<div class="alert alert-danger" role="alert">
<p>This is a Danger</p>
</div>
`
    );
  });
});
