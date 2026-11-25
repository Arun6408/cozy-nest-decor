import { PIN_VARIANTS, renderPin, type PinVariant } from "@/lib/pin";
import { getAllPosts } from "@/lib/posts";

// /pin/<slug>/<1|2|3>  → each pin design, prerendered at build time
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().flatMap((p) => PIN_VARIANTS.map((variant) => ({ slug: p.slug, variant })));
}

export async function GET(_req: Request, ctx: RouteContext<"/pin/[slug]/[variant]">) {
  const { slug, variant } = await ctx.params;
  if (!PIN_VARIANTS.includes(variant as PinVariant)) return new Response("Not found", { status: 404 });
  return renderPin(slug, variant as PinVariant);
}
