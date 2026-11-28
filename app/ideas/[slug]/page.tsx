import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Disclosure, Product, ShopGrid, Tip } from "@/components/mdx";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getPost, getPostPinImages } from "@/lib/posts";
import { categories, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ideas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/ideas/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    // Pinterest builds "article rich pins" from these Open Graph tags
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: site.name,
      publishedTime: post.date,
      authors: [site.name],
      images: [{ url: post.cover ?? `/pin/${post.slug}`, width: 1000, height: 1500, alt: post.title }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function PostPage({ params }: PageProps<"/ideas/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    components: {
      // Tag every shop link with the post slug so Awin reports show which post sold
      Product: (props: React.ComponentProps<typeof Product>) => <Product {...props} clickref={post.slug} />,
      ShopGrid,
      Tip,
    },
  });

  const pageUrl = `${site.url}/ideas/${post.slug}`;
  const aiPin = getPostPinImages(post.slug)[0];
  const pinImage = `${site.url}${aiPin ?? post.cover ?? `/pin/${post.slug}`}`;
  const saveToPinterest = `https://www.pinterest.com/pin/create/button/?${new URLSearchParams({
    url: pageUrl,
    media: pinImage,
    description: post.title,
  })}`;

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: pinImage,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.jpg` } },
    mainEntityOfPage: pageUrl,
  };

  return (
    <article className="mx-auto max-w-6xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <Link
            href={`/category/${post.category}`}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-sage hover:text-wood"
          >
            {categories[post.category].title}
          </Link>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{post.description}</p>
          <p className="mt-4 text-sm text-muted">
            {formatDate(post.date)} · {post.readingMinutes} min read
          </p>

          <div className="mt-6">
            <Disclosure />
          </div>

          <div className="prose prose-lg prose-cozy mt-8 max-w-none">{content}</div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-sand bg-white/60">
            <div className="relative aspect-[2/3]">
              <Image src={post.cover ?? `/pin/${post.slug}`} alt={post.title} fill sizes="320px" unoptimized className="object-cover" />
            </div>
            <div className="p-4">
              <a
                href={saveToPinterest}
                target="_blank"
                rel="noopener"
                className="block rounded-full bg-[#e60023] px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90"
              >
                Save this idea on Pinterest
              </a>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-3xl font-semibold">More cozy ideas</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
