import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles your data.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <SimplePage title="Privacy policy" updated="November 26, 2026">
      <p>
        This policy explains what information {site.name} ({site.url.replace(/^https?:\/\//, "")}) collects and how it
        is used. We keep data collection to a minimum.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Anonymous usage statistics.</strong> We use Vercel Web Analytics to count page views. It does not use
          cookies and does not identify you personally.
        </li>
        <li>
          <strong>Messages you send us.</strong> If you email us, we use your email address only to reply.
        </li>
      </ul>
      <h2>Affiliate links and third-party cookies</h2>
      <p>
        When you click an affiliate link to Amazon or Etsy (via the Awin network), that retailer or network may set
        cookies in your browser to record that you came from our site. Their own privacy policies govern that data.
      </p>
      <h2>Pinterest</h2>
      <p>
        Our &quot;Save to Pinterest&quot; buttons are plain links to Pinterest. Pinterest&apos;s privacy policy applies
        once you are on its site.
      </p>
      <h2>Your choices</h2>
      <p>
        You can block or delete cookies in your browser settings. To ask about any data we hold, contact us through the
        contact page.
      </p>
      <h2>Changes</h2>
      <p>We will update this page if our practices change and revise the date above.</p>
    </SimplePage>
  );
}
