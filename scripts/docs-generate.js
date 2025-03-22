import pkg from "vue-docgen-api";
import fs from "fs";
import path from "path";

const { parse } = pkg;

const componentsDir = "./src/components";
const outputDir = "./docs/components";

// 创建输出目录（如果不存在）
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 递归解析目录中的所有 .vue 文件
async function parseComponents(dir) {
    const files = fs.readdirSync(dir);
    const componentLinks = []; // 用于存储组件链接

    for (const file of files) {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            // 如果是目录，递归调用
            const subDirLinks = await parseComponents(fullPath);
            if (subDirLinks.length > 0) {
                componentLinks.push({
                    type: "folder",
                    name: file,
                    links: subDirLinks,
                });
            }
        } else if (fullPath.endsWith(".vue")) {
            // 如果是 .vue 文件，解析组件
            try {
                const componentInfo = await parse(fullPath);

                // 生成对应的 Markdown 文档
                const markdownContent = `  
# ${componentInfo.displayName || path.basename(fullPath, ".vue")}  

## Props  
${
    componentInfo.props
        ? componentInfo.props
              .map(
                  (prop) =>
                      `- **${prop.name}**: ${prop.description || "无描述"}`,
              )
              .join("\n")
        : "无 Props"
}  

## Events  
${
    componentInfo.events
        ? componentInfo.events
              .map(
                  (event) =>
                      `- **${event.name}**: ${event.description || "无描述"}`,
              )
              .join("\n")
        : "无 Events"
}  

## Slots  
${
    componentInfo.slots
        ? componentInfo.slots
              .map(
                  (slot) =>
                      `- **${slot.name}**: ${slot.description || "无描述"}`,
              )
              .join("\n")
        : "无 Slots"
}  
                `;

                // 写入 Markdown 文档
                const componentName =
                    componentInfo.displayName ||
                    path.basename(fullPath, ".vue");
                const outputFilePath = path.join(
                    outputDir,
                    `${componentName}.md`,
                );
                fs.writeFileSync(outputFilePath, markdownContent.trim());

                // 添加组件链接
                componentLinks.push({
                    type: "file",
                    name: componentName,
                    link: `${componentName}.md`,
                });

                console.log(`Generated documentation for: ${fullPath}`);
            } catch (error) {
                console.error(`Failed to parse component: ${fullPath}`, error);
            }
        }
    }

    return componentLinks;
}

// 生成纯 Markdown 内容
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

// 开始解析组件并生成 index.md
parseComponents(componentsDir)
    .then((componentLinks) => {
        // 生成 index.md 内容
        const indexContent = `# Components Documentation\n\n${generateFolderStructure(componentLinks)}`;

        // 写入 index.md
        fs.writeFileSync(path.join(outputDir, "index.md"), indexContent);

        console.log("Vue Doxgen Documentation generation completed!");
    })
    .catch((error) => {
        console.error("Documentation generation failed:", error);
    });
