# HelloFriedParrot.club 🦜

[![License](https://img.shields.io/badge/License-Apache2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[中文](readme_zh.md) | English
![https://hellofriedparrot.club/assets/parrot_icon_main-DNjced6y.png|100]
😆 Frontend implementation of my open-source personal blog platform (client-side of full-stack project)

🌍 My Website : [helloFriedparrot.club](https://helloFriedparrot.club) - Register an account and start your blogging journey!

> ⚠️ Project Notes  
> 1. Full-stack application with frontend code open-sourced  
> 2. Backend service built with Flask + MySQL (closed-source)  
> 3. Contact: friedparrot@qq.com / friedparrot0533@gmail.com  

## Tech Stack 🛠

### Core Frameworks
- **Vue 3** + TypeScript - Primarily using Options API pattern
- **Vite 4** - Efficient web bundling 
- **Vue Router 4** - SPA routing management

### Key Technologies
```markdown
- State Management: Vuex 4 (centralized state solution)
- UI Libraries: Vuetify 3 + Element Plus (dual-library integration)
- Styling: Vanilla CSS + Scss (modern CSS features)
- Markdown Engine: markdown-it ecosystem
  • Math Formulas: markdown-it-texmath + KaTeX
  • Security: markdown-it-xss protection
  • Media: markdown-it-video
- Code Highlighting: highlight.js (35+ languages)
- Animation: GSAP 3 (professional animations)
- i18n: vue-i18n (dynamic language loading)
```

## Core Features 💡

### Content Creation
- ✍️ Live Markdown Editor
  - Full math formula support (LaTeX syntax)
  - Smart media embedding (images support currently)
  - Extensible alert containers
  - Future theme switching capability
- 🎨 Theme System
  - Auto light/dark mode switching
  - Vuetify-powered theme engine
  - Fully responsive design

### User Experience
- ⚡ Performance Optimizations
  - Code splitting & lazy loading
  - Efficient resource loading
- 🌍 Internationalization
  - Seamless EN/CN switching
  - On-demand language packs
- 📱 Mobile Adaptation
  - Comprehensive touch support
  - PC-first design with mobile adaptation

## Key Features ✅

1. **User System**
   - Registration/Login flow
   - Email notifications
   - Account approval mechanism

2. **Blog Management**
   - Markdown editor
   - Auto-save drafts
   - Blog publishing & approval
   - In-site notifications

3. **Content Discovery**
   - Personal blog history
   - Interest tagging system
   - Admin-curated featured content

## Development Guide 🛠️

### Prerequisites
- Node.js ≥18.12.0
- pnpm ≥7.0.0 (recommended)

### Common Commands
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Production build
pnpm compile

# Run type checking
pnpm type-check

# Generate documentation
pnpm docs:generate

# Launch docs server
pnpm docs:dev
```

## Contribution 🤝

We welcome contributions through:
- Submitting issues
- Forking and creating PRs
- Email: friedparrot@qq.com

Contribution guidelines:
1. Maintain code style consistency
2. Important changes should include tests

---

> 📚 Documentation: Run `pnpm docs:dev` (continuously improving)  
> 🐦 Stay updated - Star & Watch the repo!
