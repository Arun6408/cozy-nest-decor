import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Fonts are bundled in /assets/fonts (from @fontsource), so builds never
// depend on reaching Google Fonts.
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../assets/fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../assets/fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/cormorant-garamond-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../assets/fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

const pinterestVerify = process.env.NEXT_PUBLIC_PINTEREST_VERIFY;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: "/logo.jpg", width: 400, height: 400, alt: `${site.name} logo` }],
  },
  // Pinterest "claim website" meta tag: <meta name="p:domain_verify" content="...">
  other: pinterestVerify ? { "p:domain_verify": pinterestVerify } : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
