import type { ReactNode } from "react";
import { shopLink, storeLabel, type Store } from "@/lib/affiliate";

// Components that posts can use inside .mdx files.
// MDX is compiled with JS expressions blocked, so every prop is a plain string.

type ProductProps = {
  name: string;
  note: string;
  store: Store;
  query?: string; // search query until you pick an exact product
  href?: string; // exact product URL (preferred once you're approved)
  clickref?: string; // filled in automatically per post, see PostBody
};

export function Product({ name, note, store, query, href, clickref }: ProductProps) {
  const url = shopLink({ store, href, query: query ?? name, clickref });
  return (
    <div className="not-prose flex flex-col justify-between gap-4 rounded-xl border border-sand bg-white/70 p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">Find it on {storeLabel[store]}</p>
        <p className="mt-1 font-serif text-xl font-semibold leading-snug text-olive">{name}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{note}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-olive px-4 py-2 text-sm font-medium text-cream hover:bg-wood"
      >
        Shop on {storeLabel[store]} <span aria-hidden>↗</span>
      </a>
    </div>
  );
}

export function ShopGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-6 rounded-xl border-l-4 border-sage bg-sage-light/60 px-5 py-4 text-[15px] leading-relaxed text-olive">
      <span className="mr-2 font-semibold">Cozy tip:</span>
      {children}
    </aside>
  );
}

export function Disclosure() {
  return (
    <p className="not-prose rounded-lg bg-linen px-4 py-3 text-sm text-muted">
      This post contains affiliate links. If you buy through them, Cozy Nest may earn a small commission at no extra
      cost to you. <a href="/affiliate-disclosure" className="underline underline-offset-2">Learn more</a>.
    </p>
  );
}
