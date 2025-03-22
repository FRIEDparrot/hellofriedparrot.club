"use strict";

var fs = require("fs");

var path = require("path");

var Turndown = require("turndown"); // 初始化 Turndown


var turndown = new Turndown(); // 输入目录（HTML 文件）

var inputDir = path.join(__dirname, "../docs/api-html"); // 输出目录（Markdown 文件）

var outputDir = path.join(__dirname, "../docs/api"); // 确保输出目录存在

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, {
    recursive: true
  });
} // 遍历 HTML 文件


fs.readdirSync(inputDir).forEach(function (file) {
  if (file.endsWith(".html")) {
    var htmlFilePath = path.join(inputDir, file);
    var markdownFilePath = path.join(outputDir, file.replace(".html", ".md")); // 读取 HTML 文件

    var htmlContent = fs.readFileSync(htmlFilePath, "utf8"); // 转换为 Markdown

    var markdownContent = turndown.turndown(htmlContent); // 写入 Markdown 文件

    fs.writeFileSync(markdownFilePath, markdownContent, "utf8");
    console.log("Converted ".concat(file, " to ").concat(path.basename(markdownFilePath)));
  }
});
console.log("HTML to Markdown conversion complete!");