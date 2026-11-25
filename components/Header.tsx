import Image from "next/image";
import Link from "next/link";
import { categories, site } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-sand/70 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80 sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image src="/logo.jpg" alt="" width={44} height={44} className="rounded-full" priority />
          <span className="leading-tight">
            <span className="block font-serif text-2xl font-semibold text-olive">{site.name}</span>
            <span className="block text-[11px] uppercase tracking-[0.22em] text-muted">{site.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm text-ink md:flex">
          {Object.entries(categories).map(([slug, c]) => (
            <Link key={slug} href={`/category/${slug}`} className="hover:text-wood">
              {c.title}
            </Link>
          ))}
          <Link href="/ideas" className="rounded-full bg-olive px-4 py-2 text-cream hover:bg-sage">
            All ideas
          </Link>
        </nav>

        <Link href="/ideas" className="rounded-full bg-olive px-4 py-2 text-sm text-cream md:hidden">
          Ideas
        </Link>
      </div>
    </header>
  );
}
