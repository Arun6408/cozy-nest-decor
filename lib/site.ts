// Single source of truth for brand details.
// Change things here, not across pages.

function resolveSiteUrl(): string {
  // 1. Explicit override (set this when you move to a custom .com)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  // 2. Vercel sets this automatically to your production domain (e.g. cozy-nest-decor.vercel.app)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  // 3. Local development
  return "http://localhost:3000";
}

export const site = {
  name: "Cozy Nest",
  tagline: "Home Decor Ideas",
  description:
    "Affordable home decor ideas for cozy living rooms, calm bedrooms and small spaces, with handpicked finds from Etsy and Amazon.",
  url: resolveSiteUrl(),
  pinterest: {
    username: "cozyhomedecor_idea",
    profileUrl: "https://www.pinterest.com/cozyhomedecor_idea/",
  },
  // Shown on the contact page. Set NEXT_PUBLIC_CONTACT_EMAIL in Vercel.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  locale: "en_US",
};

export const categories = {
  "living-room": { title: "Living Room", blurb: "Cozy sofa corners, layered textiles and warm lighting." },
  bedroom: { title: "Bedroom", blurb: "Calm, restful bedrooms on a realistic budget." },
  "wall-decor": { title: "Wall Decor", blurb: "Art, mirrors and shelves that make bare walls feel finished." },
  "small-spaces": { title: "Small Spaces", blurb: "Renter-friendly ideas for apartments and tiny rooms." },
} as const;

export type CategorySlug = keyof typeof categories;

export function isCategory(value: string): value is CategorySlug {
  return value in categories;
}
