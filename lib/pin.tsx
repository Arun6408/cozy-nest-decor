import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPost } from "./posts";
import { categories, site } from "./site";

// Generates 1000x1500 (2:3) Pinterest pin images from a post's frontmatter.
// Three designs per post, so you can pin the same post several times without
// posting duplicate images (Pinterest favours fresh pins).

export const PIN_SIZE = { width: 1000, height: 1500 };
export const PIN_VARIANTS = ["1", "2", "3"] as const;
export type PinVariant = (typeof PIN_VARIANTS)[number];

const assets = path.join(process.cwd(), "assets");
// Loaded once per server instance, not per request.
const fontsPromise = Promise.all([
  readFile(path.join(assets, "fonts", "cormorant-garamond-latin-600-normal.woff")),
  readFile(path.join(assets, "fonts", "inter-latin-500-normal.woff")),
  readFile(path.join(assets, "logo-140.jpg")),
]);

const palette = {
  cream: "#f8f3ec",
  linen: "#efe6da",
  sand: "#e2d3bf",
  olive: "#2f3b2c",
  sage: "#6e7f5c",
  wood: "#9a6b47",
};

function splitNumber(title: string): { number: string | null; rest: string } {
  const m = title.match(/^(\d+)\s+(.*)$/);
  return m ? { number: m[1], rest: m[2] } : { number: null, rest: title };
}

// Pins are mostly seen as small thumbnails on phones, so text is big.
function titleSize(text: string): number {
  if (text.length <= 28) return 136;
  if (text.length <= 44) return 120;
  if (text.length <= 60) return 104;
  return 88;
}

function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,:;]$/, "") + "…";
}

export async function renderPin(slug: string, variant: PinVariant): Promise<Response> {
  const post = getPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const [serif, sans, logo] = await fontsPromise;
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;
  const title = post.pinTitle ?? post.title;
  const category = categories[post.category].title.toUpperCase();
  const domain = site.url.replace(/^https?:\/\//, "");

  const dark = variant === "2";
  const bg = variant === "1" ? palette.cream : variant === "2" ? palette.olive : palette.linen;
  const fg = dark ? palette.cream : palette.olive;
  const accent = dark ? palette.sand : palette.wood;
  const { number, rest } = splitNumber(title);

  const footer = (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>, not next/image */}
      <img src={logoSrc} width={96} height={96} style={{ borderRadius: 48 }} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "Cormorant", fontSize: 44, color: fg }}>{site.name}</div>
        <div style={{ fontFamily: "Inter", fontSize: 22, color: accent, letterSpacing: 2 }}>{domain}</div>
      </div>
    </div>
  );

  const body =
    variant === "3" && number ? (
      // Big-number list design
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontFamily: "Cormorant", fontSize: 340, lineHeight: 1, color: palette.wood }}>{number}</div>
        <div
          style={{ fontFamily: "Cormorant", fontSize: titleSize(rest) + 6, lineHeight: 1.08, color: fg, marginTop: 10 }}
        >
          {rest}
        </div>
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontFamily: "Cormorant", fontSize: titleSize(title), lineHeight: 1.08, color: fg }}>{title}</div>
        <div style={{ width: 160, height: 3, background: accent, marginTop: 50 }} />
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 34,
            color: dark ? palette.sand : palette.sage,
            marginTop: 44,
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          {shorten(post.description, 95)}
        </div>
      </div>
    );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: bg,
          padding: 44,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            border: `3px solid ${accent}`,
            borderRadius: 28,
            padding: "80px 70px 70px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 26,
              letterSpacing: 8,
              color: accent,
              border: `2px solid ${accent}`,
              borderRadius: 999,
              padding: "12px 34px",
            }}
          >
            {`${category} IDEAS`}
          </div>
          {body}
          {footer}
        </div>
      </div>
    ),
    {
      ...PIN_SIZE,
      fonts: [
        { name: "Cormorant", data: serif, weight: 600, style: "normal" },
        { name: "Inter", data: sans, weight: 500, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
