"use strict";

var _vueDocgenApi = require("vue-docgen-api");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var componentPath = "./src/components/MyComponent.vue";
var componentInfo = (0, _vueDocgenApi.parseComponent)(componentPath);

_fs["default"].writeFileSync("./docs/components/MyComponent.md", "\n# ".concat(componentInfo.displayName, "\n\n## Props\n").concat(componentInfo.props.map(function (prop) {
  return "- **".concat(prop.name, "**: ").concat(prop.description);
}).join("\n"), "\n\n## Events\n").concat(componentInfo.events.map(function (event) {
  return "- **".concat(event.name, "**: ").concat(event.description);
}).join("\n"), "\n"));