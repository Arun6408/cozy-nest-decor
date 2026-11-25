import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { categories } from "@/lib/site";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-sand/70 bg-white/60 transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/ideas/${post.slug}`} className="block">
        {/* The generated pin image doubles as the card thumbnail (2:3, Pinterest-native) */}
        <div className="relative aspect-[2/3] overflow-hidden bg-linen">
          <Image
            src={post.cover ?? `/pin/${post.slug}`}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            unoptimized={!post.cover}
          />
        </div>
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
            {categories[post.category].title}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-olive group-hover:text-wood">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{post.description}</p>
        </div>
      </Link>
    </article>
  );
}
