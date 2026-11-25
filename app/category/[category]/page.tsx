import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getPostsByCategory } from "@/lib/posts";
import { categories, isCategory } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/category/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const c = categories[category];
  return {
    title: `${c.title} Decor Ideas`,
    description: c.blurb,
    alternates: { canonical: `/category/${category}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/category/[category]">) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const c = categories[category];
  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Room</p>
      <h1 className="mt-2 font-serif text-5xl font-semibold">{c.title} decor ideas</h1>
      <p className="mt-3 max-w-2xl text-muted">{c.blurb}</p>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-sand p-8 text-muted">
          New {c.title.toLowerCase()} ideas are on the way.{" "}
          <Link href="/ideas" className="text-wood underline underline-offset-2">
            Browse all ideas
          </Link>{" "}
          in the meantime.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
