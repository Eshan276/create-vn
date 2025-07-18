# 📖 create-vn

A CLI tool to quickly scaffold visual novel projects powered by [easyvn](https://github.com/easyvn/easyvn).

---

## 🚀 Quick Start

Create a new visual novel project in seconds:

```bash
npx create-vn my-game
cd my-game
npm run dev
```

---

## ✨ Features

- 🎮 **Ready-to-run visual novel template**
- 🏗️ **TypeScript + Vite modern development setup**
- 🎨 **Character system with sprite management**
- 🎭 **Scene-based story structure**
- 💬 **Choice system for branching narratives**
- 📦 **Zero configuration - just start writing your story**

---

## 📁 Generated Project Structure

```
my-game/
├── index.html              # Main HTML file
├── style.css               # Visual novel styling
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── public/
│   └── assets/
│       ├── backgrounds/    # Background images
│       └── characters/     # Character sprites
└── src/
    ├── main.ts             # Entry point & scene registration
    ├── characters/
    │   └── Ram.ts          # Example character definition
    └── scenes/
        ├── scene1.ts       # First scene with choices
        └── scene2.ts       # Second scene example
```

---

## 🛠️ Development Commands

After creating your project, use these commands:

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

---

## 📖 Documentation

For detailed documentation on creating characters, scenes, and implementing game mechanics, see `Docs.md`.

---

## 🎯 What You Get

- **Character System**: Easy character creation with multiple sprites and animations
- **Scene Management**: Organize your story into reusable scene functions
- **Choice System**: Create branching narratives with player choices
- **Asset Management**: Organized folder structure for backgrounds and character art
- **Modern Tooling**: TypeScript, Vite, and hot-reload for fast development

---

## 📋 Requirements

- **Node.js 16+**
- **npm or yarn**
