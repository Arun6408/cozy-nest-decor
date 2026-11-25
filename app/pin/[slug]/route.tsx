import { renderPin } from "@/lib/pin";
import { getAllPosts } from "@/lib/posts";

// /pin/<slug>  → design 1 (also used as the post's og:image for rich pins)
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, ctx: RouteContext<"/pin/[slug]">) {
  const { slug } = await ctx.params;
  return renderPin(slug, "1");
}
