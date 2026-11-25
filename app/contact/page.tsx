import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SimplePage title="Contact">
      <p>Questions, collaboration ideas, or a decor find you think we&apos;d love? We&apos;d like to hear from you.</p>
      {site.contactEmail ? (
        <p>
          Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      ) : null}
      <p>
        Pinterest: <a href={site.pinterest.profileUrl}>@{site.pinterest.username}</a>
      </p>
      <p>We usually reply within a few days.</p>
    </SimplePage>
  );
}
