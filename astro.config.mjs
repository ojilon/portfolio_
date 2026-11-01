import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import path from "node:path";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://example.com",
  integrations: [
    sitemap({
      filter: (path) => {
        // Draft notes & journal detail pages are noindexed and kept out of the sitemap
        if (path.includes("/teaching/notes/") || path.includes("/teaching/journal/")) return false;
        return true;
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: "github-dark" },
    processor: satteri(),
  },
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
