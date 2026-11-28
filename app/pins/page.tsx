import type { Metadata } from "next";
import Image from "next/image";
import { PIN_VARIANTS } from "@/lib/pin";
import { getAllPosts, getPostPinImages } from "@/lib/posts";
import { site } from "@/lib/site";

// Private "pin studio": every post's pin designs with copy-ready text.
// Not linked anywhere and hidden from search engines.
export const metadata: Metadata = {
  title: "Pin studio",
  robots: { index: false, follow: false },
};

export default function PinStudioPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-5xl font-semibold">Pin studio</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Right-click a design → Save image, then create the pin on Pinterest with the title, description and link
        below. Use a different design each time you pin the same post.
      </p>

      <div className="mt-10 space-y-14">
        {posts.map((p) => {
          const link = `${site.url}/ideas/${p.slug}`;
          const aiPins = getPostPinImages(p.slug);
          const pins = aiPins.length
            ? aiPins.map((src, i) => ({ src, label: `AI pin ${i + 1}` }))
            : PIN_VARIANTS.map((v) => ({ src: `/pin/${p.slug}/${v}`, label: `Design ${v}` }));
          return (
            <section key={p.slug} className="rounded-2xl border border-sand bg-white/60 p-6">
              <h2 className="font-serif text-3xl font-semibold">{p.title}</h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[120px_1fr]">
                <dt className="font-semibold text-olive">Pin title</dt>
                <dd>{p.title}</dd>
                <dt className="font-semibold text-olive">Description</dt>
                <dd>{p.description} (affiliate links)</dd>
                <dt className="font-semibold text-olive">Link</dt>
                <dd className="break-all">{link}</dd>
              </dl>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {pins.map((pin) => (
                  <a key={pin.src} href={pin.src} target="_blank" rel="noopener" className="block">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-sand">
                      <Image src={pin.src} alt={pin.label} fill unoptimized sizes="30vw" className="object-cover" />
                    </div>
                    <p className="mt-2 text-center text-xs text-muted">{pin.label}</p>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
