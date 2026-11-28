import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";
import { isCategory, type CategorySlug } from "./site";

// Posts are plain .mdx files in /content/posts.
// The file name (minus .mdx) is the URL slug: /ideas/<slug>
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: CategorySlug;
  pinTitle?: string; // short text for the pin image overlay; falls back to title
  cover?: string; // optional /images/... path once you have your own photos
  draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

function validate(slug: string, data: Record<string, unknown>): PostFrontmatter {
  const required = ["title", "description", "date", "category"] as const;
  for (const key of required) {
    if (!data[key]) throw new Error(`Post "${slug}" is missing frontmatter field "${key}"`);
  }
  if (!isCategory(String(data.category))) {
    throw new Error(`Post "${slug}" has unknown category "${data.category}". Add it to lib/site.ts`);
  }
  // gray-matter turns YYYY-MM-DD into a Date; normalise back to a string
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return { ...(data as PostFrontmatter), date };
}

export const getPost = cache((slug: string): Post | null => {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = validate(slug, data);
  if (fm.draft && process.env.NODE_ENV === "production") return null;
  return { ...fm, slug, body: content, readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)) };
});

export const getAllPosts = cache((): PostMeta[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => getPost(f.replace(/\.mdx$/, "")))
    .filter((p): p is Post => p !== null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ body, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export function getPostsByCategory(category: CategorySlug): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

// AI-made pin images saved by the pin pipeline: public/images/<slug>/pin-1.jpg, pin-2.jpg ...
export function getPostPinImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^pin-\d+\.(jpg|jpeg|png|webp)$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]))
    .map((f) => `/images/${slug}/${f}`);
}
