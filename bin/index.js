#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectName = process.argv[2];

if (!projectName) {
  console.error("❌ Please provide a project name: create-vn <name>");
  process.exit(1);
}

const targetPath = path.resolve(process.cwd(), projectName);
const templatePath = path.resolve(__dirname, "../template");

console.log(`🛠️ Creating new visual novel project: ${projectName}`);

try {
  await fs.copy(templatePath, targetPath);
  console.log("✅ Template copied.");

  // Optional: auto-install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install", { cwd: targetPath, stdio: "inherit" });

  console.log(`\n🚀 Done! Run the project with:`);
  console.log(`\n   cd ${projectName}`);
  console.log(`   npm run dev\n`);
} catch (err) {
  console.error("❌ Failed to create project:", err);
  process.exit(1);
}
