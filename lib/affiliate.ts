// Builds outbound shop links from what a post says ("etsy" + a search query,
// or an exact product URL). Affiliate tracking is switched on by environment
// variables, so the day you're approved you set them in Vercel and every link
// on the site becomes an affiliate link — no post edits needed.
//
//   NEXT_PUBLIC_AMAZON_TAG      your Amazon.com Associates tag, e.g. cozynest-20
//   NEXT_PUBLIC_AWIN_AFFID      your Awin publisher ID
//   NEXT_PUBLIC_AWIN_ETSY_MID   Etsy's Awin advertiser ID (shown in Awin once approved)
//
// Links go straight to the store (or Awin's official tracking link). We never
// route them through our own /go/ redirects: Etsy forbids masked redirects and
// Amazon forbids cloaking.

export type Store = "etsy" | "amazon";

export type ShopLinkInput = {
  store: Store;
  href?: string; // exact product URL
  query?: string; // search query, used when there is no exact product yet
  clickref?: string; // which post sent the click (Awin reporting)
};

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG;
const AWIN_AFFID = process.env.NEXT_PUBLIC_AWIN_AFFID;
const AWIN_ETSY_MID = process.env.NEXT_PUBLIC_AWIN_ETSY_MID;

function baseUrl({ store, href, query }: ShopLinkInput): string {
  if (href) return href;
  const q = encodeURIComponent(query ?? "");
  return store === "etsy" ? `https://www.etsy.com/search?q=${q}` : `https://www.amazon.com/s?k=${q}`;
}

export function shopLink(input: ShopLinkInput): string {
  const url = baseUrl(input);

  if (input.store === "amazon" && AMAZON_TAG) {
    const u = new URL(url);
    // Short links from SiteStripe (amzn.to, link.amazon, a.co) already carry
    // your tag; only add it to full amazon.com URLs.
    if (/(^|\.)amazon\.com$/.test(u.hostname)) {
      u.searchParams.set("tag", AMAZON_TAG);
      return u.toString();
    }
  }

  if (input.store === "etsy" && AWIN_AFFID && AWIN_ETSY_MID) {
    const params = new URLSearchParams({
      awinmid: AWIN_ETSY_MID,
      awinaffid: AWIN_AFFID,
      ued: url,
    });
    if (input.clickref) params.set("clickref", input.clickref);
    return `https://www.awin1.com/cread.php?${params.toString()}`;
  }

  return url;
}

export const affiliateEnabled = {
  amazon: Boolean(AMAZON_TAG),
  etsy: Boolean(AWIN_AFFID && AWIN_ETSY_MID),
};

export const storeLabel: Record<Store, string> = { etsy: "Etsy", amazon: "Amazon" };
