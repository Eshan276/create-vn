#!/usr/bin/env node

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectName = process.argv[2];

if (!projectName) {
  console.error("❌ Please provide a project name: create-vn <name>");
  process.exit(1);
}

const projectPath = path.resolve(process.cwd(), projectName);

const log = (msg) => console.log("🛠️", msg);

// Template content
const files = {
  "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Visual Novel</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div id="game">
    <img id="background" class="background" />
    <div id="character-layer"></div>
    <div id="dialogue-box">
      <div id="speaker"></div>
      <div id="dialogue"></div>
      <div id="choices"></div>
    </div>
  </div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>`,
  "style.css": `body {
  margin: 0;
  font-family: sans-serif;
  background: black;
  color: white;
}
/* ... truncated for brevity (same as previous) */
.choice-btn:hover {
  background: #666;
}`,
  "tsconfig.json": `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "moduleSuffixes": [".ts", ".js"],
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}`,
  "vite.config.ts": `import { defineConfig } from "vite";
export default defineConfig({ server: { open: true } });`,
  "package.json": `{
  "name": "${projectName}",
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "easyvn": "^0.1.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.0.0"
  }
}`,
};

const scene1 = `import Ram from "easyvn/character";
import { waitClick, showChoice, gotoScene } from "easyvn";
import { route, goto, runNextRouteIfAny } from "easyvn";

export const metadata = { background: "school_day.jpg" };

export default async function scene1() {
  Ram.appear({ orientation: "left" });
  await waitClick();

  Ram.talk("Welcome!");
  await waitClick();

  route("#stay", async () => {
    Ram.talk("Thanks for staying!");
    await waitClick();
  });

  await showChoice([
    ["Go to Scene 2", () => { gotoScene("scene2"); throw "scene-jump"; }],
    ["Stay here", () => goto("#stay")]
  ]);

  Ram.talk("You stayed! Let's continue.");
  await waitClick();
}`;

const mainTs = `import scene1, { metadata } from "./scenes/scene1";
import { startScene, registerScene, setBackground } from "easyvn";

registerScene("scene1", scene1, metadata);

window.onload = async () => {
  if (metadata?.background) {
    setBackground(metadata.background);
  }
  await startScene("scene1");
};`;

async function generate() {
  log(`Creating project: ${projectPath}`);
  await mkdir(projectPath + "/src/scenes", { recursive: true });

  const promises = Object.entries(files).map(([name, content]) =>
    writeFile(path.join(projectPath, name), content)
  );
  promises.push(writeFile(path.join(projectPath, "src/main.ts"), mainTs));
  promises.push(
    writeFile(path.join(projectPath, "src/scenes/scene1.ts"), scene1)
  );
  await Promise.all(promises);

  log("Installing dependencies...");
  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  log("✅ Done. To start:");
  console.log(`\n  cd ${projectName} && npm run dev\n`);
}

generate();
