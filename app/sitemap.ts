import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { categories, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const staticPages = ["", "/ideas", "/about", "/affiliate-disclosure", "/privacy-policy", "/contact"];
  return [
    ...staticPages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const })),
    ...Object.keys(categories).map((c) => ({ url: `${site.url}/category/${c}`, changeFrequency: "weekly" as const })),
    ...posts.map((p) => ({ url: `${site.url}/ideas/${p.slug}`, lastModified: p.date })),
  ];
}
