import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { categories, site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="border-b border-sand/70 bg-linen">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">{site.tagline}</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Make every room feel like a <em className="font-medium text-wood">warm hug</em>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Simple, affordable decor ideas for cozy living rooms, calm bedrooms and small spaces, with handpicked
              finds you can order on Amazon.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ideas" className="rounded-full bg-olive px-6 py-3 text-sm font-medium text-cream hover:bg-wood">
                Browse decor ideas
              </Link>
              <a
                href={site.pinterest.profileUrl}
                rel="noopener"
                className="rounded-full border border-olive px-6 py-3 text-sm font-medium text-olive hover:bg-olive hover:text-cream"
              >
                Follow on Pinterest
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image
              src="/images/hero-room.jpg"
              alt="Cozy Nest emblem: a warm living room with a beige sofa, trailing plants, a floor lamp and candles"
              fill
              priority
              sizes="(min-width: 768px) 420px, 90vw"
              className="rounded-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-14">
        <h2 className="font-serif text-3xl font-semibold">Shop by room</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(categories).map(([slug, c]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="rounded-2xl border border-sand bg-white/60 p-5 transition hover:border-wood hover:bg-white"
            >
              <p className="font-serif text-2xl font-semibold text-olive">{c.title}</p>
              <p className="mt-1 text-sm text-muted">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold">Latest ideas</h2>
          <Link href="/ideas" className="text-sm font-medium text-wood hover:underline">
            See all →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
