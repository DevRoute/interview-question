import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const javascript = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/javascript' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    isBase: z.boolean().default(false),
  }),
})
const react = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/react' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    isBase: z.boolean().default(false),
  }),
})
const network = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/network' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    isBase: z.boolean().default(false),
  }),
})

export const collections = {
  javascript,
  react,
  network,
}
