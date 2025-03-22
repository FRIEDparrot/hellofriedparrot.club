"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _turndown = _interopRequireDefault(require("turndown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var turndown = new _turndown["default"]();

var inputDir = _path["default"].join(process.cwd(), "docs/api-html");

var outputDir = _path["default"].join(process.cwd(), "docs/api");

if (!_fs["default"].existsSync(outputDir)) {
  _fs["default"].mkdirSync(outputDir, {
    recursive: true
  });
} // travel the html file


_fs["default"].readdirSync(inputDir).forEach(function (file) {
  if (file.endsWith(".html")) {
    var htmlFilePath = _path["default"].join(inputDir, file);

    var markdownFilePath = _path["default"].join(outputDir, file.replace(".html", ".md")); // read HTML file content


    var htmlContent = _fs["default"].readFileSync(htmlFilePath, "utf8"); // convert to Markdown


    var markdownContent = turndown.turndown(htmlContent); // write to Markdown file

    _fs["default"].writeFileSync(markdownFilePath, markdownContent, "utf8");

    console.log("Converted ".concat(file, " to ").concat(_path["default"].basename(markdownFilePath)));
  }
});

console.log("HTML to Markdown conversion complete!");