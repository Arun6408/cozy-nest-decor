import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${site.name} uses affiliate links.`,
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function DisclosurePage() {
  return (
    <SimplePage title="Affiliate disclosure" updated="November 26, 2026">
      <p>
        {site.name} participates in affiliate programs. That means some links on this site, and on our Pinterest pins,
        are affiliate links. If you click one and make a purchase, we may earn a small commission at no extra cost to
        you. Commissions help keep this site running.
      </p>
      <h2>Programs we participate in or are applying to</h2>
      <ul>
        <li>
          <strong>Amazon Associates.</strong> As an Amazon Associate, {site.name} earns from qualifying purchases.
        </li>
        <li>
          <strong>Etsy Affiliate Program</strong>, operated through the Awin network.
        </li>
      </ul>
      <h2>Our promise</h2>
      <ul>
        <li>Posts that contain affiliate links say so at the top.</li>
        <li>Pins that link to affiliate content are labelled.</li>
        <li>We feature products because they fit the idea, not because of the commission rate.</li>
        <li>Prices and availability are set by the retailer and can change; check the store before you buy.</li>
      </ul>
      <p>This disclosure follows the U.S. Federal Trade Commission&apos;s guidance on endorsements.</p>
    </SimplePage>
  );
}
