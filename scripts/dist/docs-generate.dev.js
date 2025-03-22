"use strict";

var _vueDocgenApi = _interopRequireDefault(require("vue-docgen-api"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parse = _vueDocgenApi["default"].parse;
var componentsDir = "./src/components";
var outputDir = "./docs/components"; // 创建输出目录（如果不存在）

if (!_fs["default"].existsSync(outputDir)) {
  _fs["default"].mkdirSync(outputDir, {
    recursive: true
  });
} // 递归解析目录中的所有 .vue 文件


function parseComponents(dir) {
  var files, componentLinks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, fullPath, subDirLinks, componentInfo, markdownContent, componentName, outputFilePath;

  return regeneratorRuntime.async(function parseComponents$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          files = _fs["default"].readdirSync(dir);
          componentLinks = []; // 用于存储组件链接

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 5;
          _iterator = files[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 36;
            break;
          }

          file = _step.value;
          fullPath = _path["default"].join(dir, file);

          if (!_fs["default"].statSync(fullPath).isDirectory()) {
            _context.next = 17;
            break;
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(parseComponents(fullPath));

        case 13:
          subDirLinks = _context.sent;

          if (subDirLinks.length > 0) {
            componentLinks.push({
              type: "folder",
              name: file,
              links: subDirLinks
            });
          }

          _context.next = 33;
          break;

        case 17:
          if (!fullPath.endsWith(".vue")) {
            _context.next = 33;
            break;
          }

          _context.prev = 18;
          _context.next = 21;
          return regeneratorRuntime.awrap(parse(fullPath));

        case 21:
          componentInfo = _context.sent;
          // 生成对应的 Markdown 文档
          markdownContent = "  \n# ".concat(componentInfo.displayName || _path["default"].basename(fullPath, ".vue"), "  \n\n## Props  \n").concat(componentInfo.props ? componentInfo.props.map(function (prop) {
            return "- **".concat(prop.name, "**: ").concat(prop.description || "无描述");
          }).join("\n") : "无 Props", "  \n\n## Events  \n").concat(componentInfo.events ? componentInfo.events.map(function (event) {
            return "- **".concat(event.name, "**: ").concat(event.description || "无描述");
          }).join("\n") : "无 Events", "  \n\n## Slots  \n").concat(componentInfo.slots ? componentInfo.slots.map(function (slot) {
            return "- **".concat(slot.name, "**: ").concat(slot.description || "无描述");
          }).join("\n") : "无 Slots", "  \n                "); // 写入 Markdown 文档

          componentName = componentInfo.displayName || _path["default"].basename(fullPath, ".vue");
          outputFilePath = _path["default"].join(outputDir, "".concat(componentName, ".md"));

          _fs["default"].writeFileSync(outputFilePath, markdownContent.trim()); // 添加组件链接


          componentLinks.push({
            type: "file",
            name: componentName,
            link: "".concat(componentName, ".md")
          });
          console.log("Generated documentation for: ".concat(fullPath));
          _context.next = 33;
          break;

        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](18);
          console.error("Failed to parse component: ".concat(fullPath), _context.t0);

        case 33:
          _iteratorNormalCompletion = true;
          _context.next = 7;
          break;

        case 36:
          _context.next = 42;
          break;

        case 38:
          _context.prev = 38;
          _context.t1 = _context["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 42:
          _context.prev = 42;
          _context.prev = 43;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 45:
          _context.prev = 45;

          if (!_didIteratorError) {
            _context.next = 48;
            break;
          }

          throw _iteratorError;

        case 48:
          return _context.finish(45);

        case 49:
          return _context.finish(42);

        case 50:
          return _context.abrupt("return", componentLinks);

        case 51:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 38, 42, 50], [18, 30], [43,, 45, 49]]);
} // 生成纯 Markdown 内容


function generateFolderStructure(links) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var markdown = "";
  var indent = "  ".repeat(level);
  links.forEach(function (item) {
    if (item.type === "folder") {
      // 使用分级标题
      markdown += "".concat("#".repeat(level + 2), " ").concat(item.name, "\n");
      markdown += generateFolderStructure(item.links, level + 1);
    } else if (item.type === "file") {
      // 使用列表
      markdown += "".concat(indent, "- [").concat(item.name, "](").concat(item.link, ")\n");
    }
  });
  return markdown;
} // 开始解析组件并生成 index.md


parseComponents(componentsDir).then(function (componentLinks) {
  // 生成 index.md 内容
  var indexContent = "# Components Documentation\n\n".concat(generateFolderStructure(componentLinks)); // 写入 index.md

  _fs["default"].writeFileSync(_path["default"].join(outputDir, "index.md"), indexContent);

  console.log("Vue Doxgen Documentation generation completed!");
})["catch"](function (error) {
  console.error("Documentation generation failed:", error);
});