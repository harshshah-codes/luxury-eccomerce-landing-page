# Maison Héritage — Luxury E-commerce Platform

A full-featured luxury brand website with a headless admin panel. Built with Next.js, Postgres, and Prisma.

## Tech Stack

- **Frontend**: Next.js, TypeScript, GSAP (animations), Lenis (smooth scroll)
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Deployment**: Vercel-ready

---

## Frontend Pages

| Route | Description |
|---|---|
| `/` | Home — hero, marquee, manifesto, categories, featured products, atelier section, principles, footer |
| `/shop` | Collections — browse all products with grid layout |
| `/atelier` | Atelier — workshop story, stats, principles, disciplines |
| `/products/[id]` | Product detail — images, specs, enquiry via WhatsApp |
| `/admin` | Admin panel — manage everything |

---

## Admin Panel (`/admin`)

Login with your concierge credentials. The panel has 10 tabs to control every part of the site.

### Tab 1 — Products
CRUD for all products.

- **Name** — Product display name
- **Category** — Select from existing categories
- **Price** — Raw number (e.g. `48500`), displayed as `₹ 48,500`
- **SKU** — Unique product reference code
- **Year** — Release year
- **Tag** — Badge text (e.g. "Limited · 50", "Made to Order")
- **Description** — Full product description
- **Specifications** — One per line, format: `Label: Value`
- **Image URLs** — Comma-separated full image URLs (first is primary)
- **Story** — Behind-the-scenes narrative

### Tab 2 — Hero
Homepage hero section.

- **Eyebrow** — Small label above title (e.g. "Maison Héritage")
- **Title** — Main headline (use `<em>italic</em>` or `<br>` for line breaks)
- **Subtitle** — Supporting text
- **Image URL** — Full URL to hero image
- **Meta number** — Reference number display (e.g. "N° 001")
- **Meta text** — Descriptive text beside the number

### Tab 3 — Marquee
Scrolling text strip on the home page. One item per line (e.g. "Timepieces", "Footwear", etc.).

### Tab 4 — Manifesto
Brand manifesto / principles section.

- **Label** — Section label (e.g. "Principles")
- **Quote** — The manifesto quote (supports `<em>` and `<br>`)
- **Attribution name** — Who it's attributed to
- **Attribution role** — Their title/role

### Tab 5 — Categories
Product categories displayed as cards.

Format: one per line — `Category Name|Image URL`

Example:
```
Timepieces|https://picsum.photos/seed/cat-timepieces/400/400
Footwear|https://picsum.photos/seed/cat-footwear/400/400
```

### Tab 6 — Atelier (Home)
The atelier section on the home page.

- **Label** — Section label
- **Title** — Section heading
- **Intro** — Descriptive text
- **Stats** — One per line: `Number|Label` (e.g. `101|Years of heritage`)
- **Images** — One per line: `Image URL|Caption|Width(1=wide,0=narrow)`

### Tab 7 — Principles
The six principles displayed on the home page.

Format: one per line — `Number|Name|Description|Detail`

Example:
```
I|One object, one hand|Each object is assembled by a single craftsperson.|Principle · 1923
```

### Tab 8 — Footer
Site-wide footer.

- **Brand** — Brand name (use `\n` for line break: `Maison\nHéritage`)
- **Tag line** — Brand tagline
- **Columns** — Navigation columns, one per line: `Title|Link1:url, Link2`
- **Copyright** — Copyright text
- **Tagline** — Bottom tagline
- **WhatsApp number** — Phone number for all WhatsApp enquiry links. Format as `+91-XXXXX-XXXXX` — non-digit characters are stripped automatically for the actual link.

### Tab 9 — Shop Page
The /shop collections page.

- **Title** — Page heading (supports `<em>`)
- **Subtitle** — Page subheading

### Tab 10 — Atelier Page
The /atelier page content.

- **Hero Eyebrow / Title / Subtitle** — Hero section content
- **Hero Image URL** — Full URL for the hero image
- **Hero Meta number / text** — Reference display
- **Section Label / Title / Intro** — Workshop section
- **Stats** — One per line: `Number|Label`
- **Images** — One per line: `Image URL|Caption|Width(1=wide,0=narrow)`
- **Principles Title / Intro / List** — Principles section (list format: `Number|Name|Description|Detail`)

---

## WhatsApp Integration

The WhatsApp number is set in **Footer** tab. All enquiry links across the site use this number.

- **Nav bar** — General enquiry link (brand name from Footer → Brand field)
- **Product page** — Three buttons per product: "Order via WhatsApp", "Request private viewing", "Enquire on WhatsApp" — all include the product name and reference
- **Home page** — "Speak to a concierge" button

The brand name used in messages is read automatically from **Footer → Brand** field.

---

## Image URLs

All image fields accept full image URLs (not seeds). You can use any image hosting service:

```
https://picsum.photos/seed/your-image-name/800/1000
```

Or your own CDN:
```
https://your-cdn.com/images/product-name.jpg
```

---

## Content Reset

Click **"Restore defaults"** at the top of the admin panel to reset all products and site content to the original sample data.

---

## Local Development

```bash
cd web
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

---

## Deployment (Vercel)

1. Connect your Postgres database and set `DATABASE_URL` in environment variables
2. Deploy — Zero config for Next.js
3. Visit `/admin` to log in and manage content
4. Run `pnpm prisma db seed` (via Vercel CLI or a one-off script) to populate initial data
