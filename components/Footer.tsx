import Link from "next/link";
import { categories, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-sand/70 bg-linen">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-semibold text-olive">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.description}</p>
          <a
            href={site.pinterest.profileUrl}
            className="mt-4 inline-block text-sm font-medium text-wood hover:underline"
            rel="noopener"
          >
            Follow on Pinterest →
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Rooms</p>
          <ul className="mt-3 space-y-2 text-sm">
            {Object.entries(categories).map(([slug, c]) => (
              <li key={slug}>
                <Link href={`/category/${slug}`} className="hover:text-wood">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">About</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-wood">About</Link></li>
            <li><Link href="/affiliate-disclosure" className="hover:text-wood">Affiliate disclosure</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-wood">Privacy policy</Link></li>
            <li><Link href="/contact" className="hover:text-wood">Contact</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-sand/60 px-5 py-5 text-center text-xs text-muted">
        © {year} {site.name}. Some links on this site are affiliate links: we may earn a small commission at no extra
        cost to you.
      </p>
    </footer>
  );
}
