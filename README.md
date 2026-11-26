# Cozy Nest: Home Decor Ideas

The website behind the [Cozy Nest Pinterest account](https://www.pinterest.com/cozyhomedecor_idea/).
Pins link to posts here, and posts link to products on Amazon.

## How it fits together

```
content/posts/*.mdx  ──►  /ideas/<slug>      the post page (static HTML)
        │
        └──────────────►  /pin/<slug>/<1|2|3> three 1000×1500 pin images per post
                          /pins               private "pin studio" to grab them

lib/affiliate.ts  turns <Product store="etsy" query="..."/> into a shop link,
                  and adds affiliate tracking once the env vars are set
```

- **Next.js 16 (App Router) + Tailwind 4**, fully static: every page and pin image is built at deploy time.
- **Posts are MDX files.** Adding a file = adding a post. Later, your automation publishes a post by committing one file to GitHub, and Vercel redeploys.
- **Pin images are generated from each post's title** with `next/og`, so there's no design work per post.
- **Affiliate links switch on with environment variables**, so approval day means no post edits.

## Run it locally (PowerShell)

```powershell
git clone https://github.com/Arun6408/cozy-nest-decor.git
cd cozy-nest-decor
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. The pin studio is at http://localhost:3000/pins.

## Add a post

1. Create `content/posts/your-post-slug.mdx` (the file name becomes the URL).
2. Start it with frontmatter:

   ```mdx
   ---
   title: "15 Small Apartment Decor Ideas"
   pinTitle: "15 Small Apartment Decor Ideas"   # optional, shorter text for pins
   description: "One or two sentences for Google and Pinterest."
   date: "2026-12-01"
   category: "small-spaces"   # living-room | bedroom | wall-decor | small-spaces | seasonal
   ---
   ```

3. Write the body in Markdown. Available components:

   ```mdx
   <Tip>A short styling tip.</Tip>

   <ShopGrid>
   <Product store="amazon" name="Chunky knit throw" query="chunky knit throw blanket" note="Why it fits." />
   <Product store="amazon" name="Jute rug" href="https://www.amazon.com/dp/XXXXXXXX" note="Why it fits." />
   </ShopGrid>
   ```

   `query` links to a store search; `href` links to one exact product. Props must be plain strings.

4. `git add . ; git commit -m "Add post" ; git push`. Vercel deploys automatically.

## Environment variables

See `.env.example`. Set them in Vercel → Project → Settings → Environment Variables, then redeploy.

| Variable | When |
| --- | --- |
| `NEXT_PUBLIC_PINTEREST_VERIFY` | Claiming the site on Pinterest |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Before applying to affiliate programs |
| `NEXT_PUBLIC_AWIN_AFFID`, `NEXT_PUBLIC_AWIN_ETSY_MID` | Optional: only if you join Etsy via Awin later |
| `NEXT_PUBLIC_AMAZON_TAG` | After joining Amazon Associates |
| `NEXT_PUBLIC_SITE_URL` | When you add a custom domain |

## Rules baked into the code

- Shop links go **directly** to Amazon, never through our own redirect: Amazon bans link cloaking.
- Every shop link has `rel="sponsored nofollow"`.
- Every post shows an affiliate disclosure at the top.
- Pin images are our own designs, never Amazon product photos.
