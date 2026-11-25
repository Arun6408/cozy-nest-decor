import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-serif text-5xl font-semibold">This room is empty</h1>
      <p className="mt-4 text-muted">We couldn&apos;t find that page. It may have moved.</p>
      <Link href="/ideas" className="mt-8 inline-block rounded-full bg-olive px-6 py-3 text-sm text-cream hover:bg-wood">
        Browse decor ideas
      </Link>
    </div>
  );
}
