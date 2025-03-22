import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

// 定义需要解析的目录
const sourceDirs = [
    "./src/api",
    "./src/hooks",
    "./src/utils",
    "./src/locales/lang",
    "./src/store",
];

// 定义输出目录
const outputBaseDir = "./docs";

// 创建输出目录（如果不存在）
if (!fs.existsSync(outputBaseDir)) {
    fs.mkdirSync(outputBaseDir, { recursive: true });
}

/**
 * 解析 TypeScript 文件并生成文档
 * @param {string} filePath - TypeScript 文件路径
 * @param {string} outputDir - 输出目录
 */
function parseFile(filePath, outputDir) {
    const program = ts.createProgram([filePath], {});
    const sourceFile = program.getSourceFile(filePath);

    if (sourceFile) {
        const markdownContent = [];
        const fileName = path.basename(filePath, ".ts");

        // 添加文件标题
        markdownContent.push(`# ${fileName}\n`);

        // 遍历 AST，提取函数和类的注释
        ts.forEachChild(sourceFile, (node) => {
            if (ts.isFunctionDeclaration(node)) {
                // 提取函数信息
                const functionName = node.name?.text || "anonymous";
                const jsDoc = ts.getJSDocCommentsAndTags(node);

                markdownContent.push(`## ${functionName}\n`);
                if (jsDoc.length > 0) {
                    markdownContent.push(
                        jsDoc
                            .map((doc) => doc.getFullText(sourceFile))
                            .join("\n"),
                    );
                } else {
                    markdownContent.push("无描述\n");
                }
            } else if (ts.isClassDeclaration(node)) {
                // 提取类信息
                const className = node.name?.text || "anonymous";
                const jsDoc = ts.getJSDocCommentsAndTags(node);

                markdownContent.push(`## ${className}\n`);
                if (jsDoc.length > 0) {
                    markdownContent.push(
                        jsDoc
                            .map((doc) => doc.getFullText(sourceFile))
                            .join("\n"),
                    );
                } else {
                    markdownContent.push("无描述\n");
                }

                // 提取类方法
                node.members.forEach((member) => {
                    if (ts.isMethodDeclaration(member)) {
                        const methodName =
                            member.name?.getText(sourceFile) || "anonymous";
                        const methodJsDoc = ts.getJSDocCommentsAndTags(member);

                        markdownContent.push(`### ${methodName}\n`);
                        if (methodJsDoc.length > 0) {
                            markdownContent.push(
                                methodJsDoc
                                    .map((doc) => doc.getFullText(sourceFile))
                                    .join("\n"),
                            );
                        } else {
                            markdownContent.push("无描述\n");
                        }
                    }
                });
            }
        });

        // 写入 Markdown 文件
        const outputFilePath = path.join(outputDir, `${fileName}.md`);
        fs.writeFileSync(outputFilePath, markdownContent.join("\n").trim());

        console.log(`Generated documentation for: ${filePath}`);
    }
}

/**
 * 递归遍历目录并解析所有 .ts 文件
 * @param {string} dir - 目录路径
 * @param {string} outputDir - 输出目录
 */
function parseDirectory(dir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(dir);
    const fileLinks = [];

    files.forEach((file) => {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            // 如果是目录，递归调用
            const subDirLinks = parseDirectory(
                fullPath,
                path.join(outputDir, file),
            );
            if (subDirLinks.length > 0) {
                fileLinks.push({
                    type: "folder",
                    name: file,
                    links: subDirLinks,
                });
            }
        } else if (fullPath.endsWith(".ts")) {
            // 如果是 .ts 文件，解析并生成文档
            parseFile(fullPath, outputDir);
            fileLinks.push({
                type: "file",
                name: path.basename(fullPath, ".ts"),
                link: `${path.basename(fullPath, ".ts")}.md`,
            });
        }
    });

    return fileLinks;
}

/**
 * 生成文件夹结构的 Markdown 内容
 * @param {Array} links - 文件链接数组
 * @param {number} level - 当前层级
 * @returns {string} - Markdown 内容
 */
function generateFolderStructure(links, level = 0) {
    let markdown = "";
    const indent = "  ".repeat(level);

    links.forEach((item) => {
        if (item.type === "folder") {
            // 使用分级标题
            markdown += `${"#".repeat(level + 2)} ${item.name}\n`;
            markdown += generateFolderStructure(item.links, level + 1);
        } else if (item.type === "file") {
            // 使用列表
            markdown += `${indent}- [${item.name}](${item.link})\n`;
        }
    });

    return markdown;
}

// 开始解析并生成文档
sourceDirs.forEach((dir) => {
    const outputDir = path.join(outputBaseDir, path.basename(dir));
    const fileLinks = parseDirectory(dir, outputDir);

    // 生成 index.md 内容
    const indexContent = `# ${path.basename(dir)} Documentation\n\n${generateFolderStructure(fileLinks)}`;
    fs.writeFileSync(path.join(outputDir, "index.md"), indexContent);

    console.log(`Generated documentation for directory: ${dir}`);
});

console.log("Typescript documentation generation completed!");
