import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${site.name} is and how we pick the decor we feature.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SimplePage title={`About ${site.name}`}>
      <p>
        {site.name} is a home decor ideas site for people who want a warm, lived-in home without a designer budget. We
        focus on cozy living rooms, calm bedrooms, wall decor and small spaces that work for renters.
      </p>
      <h2>How we choose what to feature</h2>
      <ul>
        <li>Ideas first: every post starts with a styling idea you can use even if you buy nothing.</li>
        <li>Small makers: we love handmade and vintage pieces from independent Etsy shops.</li>
        <li>Practical basics: for everyday items we point to widely available options on Amazon.</li>
        <li>No paid placements: brands don&apos;t pay to appear in our posts.</li>
      </ul>
      <h2>How this site is funded</h2>
      <p>
        Some links are affiliate links. If you buy through them we may earn a small commission at no extra cost to you.
        Read the full <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>
      <h2>Say hello</h2>
      <p>
        Find new ideas every week on <a href={site.pinterest.profileUrl}>Pinterest</a>, or get in touch through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </SimplePage>
  );
}
