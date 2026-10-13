import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

const removed = [
  "scripts/session.mjs",
  "scripts/session.test.mjs",
  "scripts/publish.mjs",
  "scripts/publish.test.mjs",
  "references/publish.md",
];

const traces = [
  /session\.mjs/,
  /publish\.mjs/,
  /references\/publish\.md/,
  /\.claude[\\/]projects/,
  /CLAUDE_CODE_SESSION_ID/,
  /anatomy-community/,
  /["'`]pr["'`]\s*,\s*["'`]create["'`]/,
  /gh\s+pr\s+create/,
  /["'`]repo["'`]\s*,\s*["'`]fork["'`]/,
];

const skipDirs = new Set([".git", "node_modules", "shots"]);
const skipFiles = new Set(["wmt-check.mjs", "FORK.md", "CHANGELOG.md"]);
const textual = /\.(mjs|js|ts|tsx|md|json|ya?ml|css|html|txt|toml)$/;

const problems = [];

for (const path of removed) if (existsSync(join(root, path))) problems.push(`file tornato: ${path}`);

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) {
      if (!skipDirs.has(name)) walk(full);
      continue;
    }
    if (skipFiles.has(name) || !textual.test(name)) continue;
    const lines = readFileSync(full, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const trace of traces) if (trace.test(line)) problems.push(`traccia in ${relative(root, full).replaceAll("\\", "/")}:${index + 1}: ${trace}`);
    });
  }
};
walk(root);

if (problems.length) {
  console.error(`wmt-check: ${problems.length} problemi`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(`wmt-check: a posto. Assenti i ${removed.length} file tolti, nessuna traccia nel resto del repository.`);
