import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  loader: glob({ pattern: "**/[^.]*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    subject: z.enum(["Biology", "Chemistry"]),
    topic: z.string(),
    summary: z.string(),
    updated: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});
const journal = defineCollection({
  loader: glob({ pattern: "**/[^.]*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { notes, journal };
