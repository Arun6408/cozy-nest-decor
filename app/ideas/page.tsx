import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Home Decor Ideas",
  description: "Every Cozy Nest decor idea: living rooms, bedrooms, wall decor and small spaces.",
  alternates: { canonical: "/ideas" },
};

export default function IdeasPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-5xl font-semibold">All decor ideas</h1>
      <p className="mt-3 text-muted">{posts.length} ideas and counting.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
