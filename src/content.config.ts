import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const notes = defineCollection({
  loader: glob({ pattern: "**/[^.]*.md", base: "./src/content/notes" }),
});
const journal = defineCollection({
  loader: glob({ pattern: "**/[^.]*.md", base: "./src/content/journal" }),
});

export const collections = { notes, journal };
