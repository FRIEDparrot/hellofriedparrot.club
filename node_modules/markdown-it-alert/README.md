---
projectStyle: /media/custom.css
---

# Markdown-it Alert

Markdown-it Alert plugin to be able to create alert, success and tip messages in your Markdown code.

::: info
This is an alert block, with the type info
:::


Compatible with Bootstrap alerts.

## Installation

```bash
npm install markdown-it-alert
```

Use plugin;

```js
import md from "markdown-it";
import alert from "markdown-it-alert";

md().use(alert);
```

## Options

You can use any type of alert you want, proposed is to use the same type for everything; `warning`,`error`,`tip`,`success`, or any self determined type.

::: warning
Warning
:::

::: error
Error
:::

::: tip
Tip
:::

::: success
Success
:::

#### Links

Links enables the usage of links within your messages. By default this is turned on but can be disabled by;

```js
md().use(alert, { links: false });
```

#### BEM

By default the class styles are compatible with bootstrap (`alert alert-success`), but you can also use the BEM syntax (`alert alert--success`).

```js
md().use(alert, { bem: true });
```

#### role

A role is always given by default but can be disabled'

```js
md().use(alert, { role: false });
```

#### tag

The default element is a `div` but this can be changed by adding a tag to the config

```js
md().use(alert, { tag: "span" });
```

#### Types

All alerts with the following types will be caught and created.

- info
- warning
- error
- danger
- tip
- success

This list can be changed by giving your own values as an array;

```js
md().use(alert, { types: ["my", "own", "values"] });
```

Now you can use:

```
::: own
Custom alerts
:::

```

### Syntax

```
::: success
Hello world! [Link](#).
:::
```

Gets converted to:

```html
<div class="alert alert-success" role="alert">
	<p>Hello world! <a href="#" class="alert-link">Link</a>.</p>
</div>
```

::: success
Hello world! [Link](#).
:::

### Credits

Credits for (https://github.com/nunof07/markdown-it-alerts) for the original package. Mainly copied and refactored everything in order to get it properly working in Typescript based environments.
