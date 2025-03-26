# HelloFriedParrot.club 🦜

[![License](https://img.shields.io/badge/License-Apache2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[English](readme.md) | 中文

😆 开源个人博客平台前端实现（全栈项目客户端部分）

🌍 立即体验：[helloFriedparrot.club](https://helloFriedparrot.club) 注册账号，开启您的博客创作之旅！

> ⚠️ 项目说明  
> 1.  本项目为全栈应用，仅开源前端代码 
> 2.  后端服务部分基于 flask + mysql, 该部分为不开源  
> 3.  联系作者：friedparrot@qq.com / friedparrot0533@gmail.com

## 技术架构 🛠

### 核心框架
- **Vue 3** + TypeScript - 主要采用 Options API开发模式
- **Vite 4** - 高效网页构建 
- **Vue Router 4** - 单页面应用路由管理

### 关键技术栈
```markdown
- 状态管理：Vuex 4（集中式状态管理方案）
- UI组件库：Vuetify 3 + Element Plus（双组件库协同）
- 样式方案：原生CSS + Scss（支持现代CSS特性）
- Markdown引擎：markdown-it生态体系
  • 数学公式：markdown-it-texmath + KaTeX
  • 安全防护：markdown-it-xss防护
  • 多媒体支持：markdown-it-video
- 代码高亮：highlight.js（支持35+编程语言）
- 动画系统：GSAP 3（专业级动画效果）
- 国际化：vue-i18n（动态语言包加载）
```

## 核心功能 💡

### 内容创作
- ✍️ 动态 Markdown编辑器
  - 完整的数学公式支持（LaTeX语法）
  - 智能多媒体嵌入（图片/视频）
  - 可扩展的容器警告框
  - 支持未来主题切换功能
- 🎨 主题系统
  - 自动亮/暗模式切换
  - 基于Vuetify的主题引擎
  - 全平台响应式设计

### 用户体验
- ⚡ 性能优化
  - 代码分割与懒加载
  - 采用单页面应用 SPA, 优化用户体验
  - 高效的资源加载策略
- 🌍 国际化
  - 中英文无缝切换
  - 按需加载语言包
- 📱 移动适配
  - 较为完善的触屏交互支持
  - 优先支持 PC 端， 同时对大多数界面做了移动适配 

## 功能特性 ✅

1. **用户系统**
   - 注册/登录流程
   - 邮件通知系统
   - 账号审核机制

2. **博客管理**
   - Markdown编辑器
   - 草稿自动保存
   - 博客发布与审核
   - 站内信通知

3. **内容发现**
   - 个人博客历史
   - 兴趣标签系统
   - 管理员精选功能

## 开发指南 🛠️

### 环境准备
- Node.js ≥18.12.0
- pnpm ≥7.0.0（推荐）

### 常用命令
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 生产环境构建
pnpm compile

# 运行类型检查
pnpm type-check

# 生成项目文档
pnpm docs:generate

# 启动文档服务器
pnpm docs:dev
```

## 贡献指南 🤝

欢迎通过以下方式参与贡献：
- 提交Issues报告问题
- Fork项目并提交PR
- 邮件联系：friedparrot@qq.com

贡献规范：
1. 保持现有代码风格一致性
2. 重要变更需考虑配套单元测试 

---

> 📚 开发文档：运行 `pnpm docs:dev` 查看（持续完善中）  
> 🐦 关注项目最新动态，欢迎Star & Watch！
