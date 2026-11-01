import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const contentRoot = path.join(projectRoot, "src/content");

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(fullPath) : entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

const draftRoutes = new Set();
for (const collection of ["notes", "journal"]) {
  const collectionRoot = path.join(contentRoot, collection);
  for (const file of markdownFiles(collectionRoot)) {
    const source = readFileSync(file, "utf8");
    const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? "";
    if (!/^draft:\s*true\s*$/m.test(frontmatter)) continue;
    const slug = path.relative(collectionRoot, file).replaceAll(path.sep, "/").replace(/\.md$/, "");
    draftRoutes.add(`/teaching/${collection}/${slug}`);
  }
}

export default defineConfig({
  site: process.env.SITE_URL ?? "https://example.com",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/+$/, "") || "/";
        return !draftRoutes.has(pathname);
      },
    }),
  ],
  output: "static",
  vite: {
    server: { allowedHosts: [".e2b.app"] },
    resolve: { alias: { "@": path.resolve(projectRoot, "src") } },
  },
});
