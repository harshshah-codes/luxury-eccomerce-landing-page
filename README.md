# Maison Héritage — Admin Panel Guide

A luxury brand website with a full admin panel to manage every piece of content.

## Pages Overview

| Route | What it shows |
|---|---|
| `/` | Home — hero, marquee ticker, manifesto quote, category cards, featured products, atelier story, principles list, footer |
| `/shop` | Collections page — all products in a grid |
| `/atelier` | Atelier story — hero, stats, principles, discipline cards |
| `/products/[id]` | Product detail page — images, specs, WhatsApp enquiry buttons |
| `/admin` | Admin panel login |

---

## Admin Panel — Field-by-Field Reference

### Login
Use the concierge credentials provided to you. After logging in, you'll see 10 tabs at the top.

---

### Tab: Products
Create, edit, and delete products.

| Field | What it controls | Format | Hidden Tips |
|---|---|---|---|
| **Name** | Product title shown on cards and detail page | Plain text | This is the primary identifier. Keep it short (2–5 words). |
| **Category** | Groups the product under a discipline | Dropdown — select one | Categories are created in the **Categories** tab. You must create a category here before you can assign products to it. |
| **Price** | Displayed price on cards and detail page | **Just a number** — no currency symbol, no commas | Enter `48500` — it will display as **₹ 48,500** automatically. Do NOT type `₹` or commas. |
| **SKU** | Reference code shown on the detail page | e.g. `MH-TB-001` | Must be unique. Used in WhatsApp enquiry messages as the reference. |
| **Year** | Shown beside the category on product detail | e.g. `2024` | Just the year number. |
| **Tag** | Badge on the product card image | e.g. `Limited · 50`, `Made to Order` | Appears as a small tag in the top-left corner of the product image. |
| **Description** | Main product description on the detail page | Plain text (multi-line) | Shows below the price. Keep it 2–4 sentences. |
| **Specifications** | Specs table on the detail page | One per line: `Label: Value` | Example: `Movement: Calibre MH-01, manual winding` then `Case: 18k rose gold, 40mm`. Each line becomes a row in the specs table. |
| **Image URLs** | Product images (gallery + thumbs) | Comma-separated **full URLs** | The first URL is the **primary image** (used on cards and as the main detail image). Subsequent URLs become thumbnail switchers on the detail page. Use at least 2 images for a good gallery experience. |
| **Story** | Behind-the-scenes section on the detail page | Plain text (multi-line) | Appears in the "On the [product name]" section below the product details. |

**What happens if you leave a field empty?**
- Empty Name → Save will show an error
- Empty Price → Shows "Price on request"
- Empty Images → Product card will have a blank gray box
- Empty Story → The story section is hidden
- Empty Specs → The specs table is hidden

---

### Tab: Hero
Controls the large hero section at the top of the home page.

| Field | What it controls | Format | Hidden Tips |
|---|---|---|---|
| **Eyebrow** | Small label above the main title | Plain text | e.g. "Maison Héritage". Keep short — 1–3 words. |
| **Title** | The big headline on the hero | Supports `<em>` and `<br>` | Use `<em>italic</em>` for emphasis. Use `<br>` for line breaks. Example: `Objects considered<br>for a life <em>unlived</em>.` |
| **Subtitle** | Text below the headline | Plain text (multi-line) | Shows smaller and in softer color. |
| **Image URL** | Large background image on the right side | Full URL | Recommended size: at least 1100×1400px for sharp display. |
| **Meta number** | Reference number display | e.g. `N° 001` | Shows beside the hero image. |
| **Meta text** | Text beside the meta number | Supports `<br>` for line breaks | Example: `Bench-marked<br>since 1923` |

---

### Tab: Marquee
The scrolling text strip that runs across the page below the hero.

| Field | What it controls | Format | Hidden Tips |
|---|---|---|---|
| **Items (one per line)** | Each line becomes a scrolling item | One word/phrase per line | Example: `Timepieces` then `Footwear` then `Leather Goods`. Items will repeat and scroll infinitely. Add 6–10 items for a good rhythm. |

---

### Tab: Manifesto
The brand philosophy section with a quote.

| Field | What it controls | Format | Hidden Tips |
|---|---|---|---|
| **Label** | Section label badge | Plain text | e.g. "Principles". Shows above the quote with a line. |
| **Quote** | The main manifesto quote | Supports `<em>` and `<br>` | This is the centerpiece of the section. Use `<em>` for italicized words. |
| **Attribution name** | Who said / wrote it | Plain text | Shows below the quote. |
| **Attribution role** | Their title | Plain text | Shows beside the name, separated by `·`. |

---

### Tab: Categories
Category cards that link to filtered product views.

**Format**: One category per line using pipe (`|`) separator:

```
Category Name|Image URL
```

**Example**:
```
Timepieces|https://picsum.photos/seed/cat-timepieces/400/400
Footwear|https://picsum.photos/seed/cat-footwear/400/400
Leather Goods|https://picsum.photos/seed/cat-leather/400/400
```

| Part | What it does | Hidden Tips |
|---|---|---|
| **Category Name** | Display name + URL slug | If you rename a category, its URL slug changes. Old bookmarked links to `/categories/Old-Name` will break. |
| **Image URL** | Card thumbnail | Recommended: 400×400px square. |

**Important**: Categories you add here appear in the **Category dropdown** in the Products tab. You must add a category here before you can assign products to it.

---

### Tab: Atelier (Home)
The "Eight disciplines" section on the home page.

| Field | What it controls | Format | Hidden Tips |
|---|---|---|---|
| **Label** | Section label badge | Plain text | e.g. "The Atelier" |
| **Title** | Section heading | Supports `<em>` and `<br>` | Example: `Eight disciplines.<br>One bench.` |
| **Intro** | Paragraph below the title | Plain text (multi-line) | Shows to the left of the images. |
| **Stats** | Number statistics displayed as a grid | One per line: `Number|Label` | Example: `101|Years of heritage` then `23|Artisans at the bench`. Shows in a row below the intro. |
| **Images** | Gallery images on the right side | One per line: `Image URL|Caption|Width` | **Width**: `1` = wide (800px), `0` = narrow (700px). Caption shows below each image. Add 2–3 images. |

**Stat format example**:
```
101|Years of heritage
23|Artisans at the bench
240|Hours per piece
8|Object categories
```

**Image format example**:
```
https://picsum.photos/seed/atelier-main/800/550|The main bench, rue du Faubourg Saint-Honoré|1
https://picsum.photos/seed/atelier-detail/700/875|Hand-engraving the Lumière dial|0
```

---

### Tab: Principles
The numbered principles list on the home page.

**Format**: One per line using pipe (`|`) separator:

```
Number|Name|Description|Detail
```

**Example**:
```
I|One object, one hand|Each object is assembled from start to finish by a single craftsperson.|Principle · 1923
II|No imitation, no compromise|We do not follow trends. We do not substitute materials.|Principle · 1923
```

| Part | What it does | Hidden Tips |
|---|---|---|
| **Number** | Roman numeral or number prefix | Displays as `I.`, `II.`, etc. Can use any format — `01`, `1`, `I` all work. |
| **Name** | Principle title | Shows in serif font beside the number. |
| **Description** | Full description text | Shows below the name in smaller, softer text. |
| **Detail** | Small metadata line | Shows at the bottom in smaller text. e.g. "Principle · 1923". |

---

### Tab: Footer
Site-wide footer with brand info, navigation columns, and WhatsApp settings.

| Field | What it controls | Format | Hidden Tips |
|---|---|---|---|
| **Brand** | Brand name in the footer | Supports `\n` (literal backslash-n) for line break | Example: `Maison\nHéritage` renders as two lines (Maison on top, Héritage below). Also **feeds into WhatsApp messages** as the greeting name. |
| **Tag line** | Brand description below the name | Plain text (multi-line) | Shows in softer text. |
| **Columns** | Navigation link groups | One per line: `Title|Link1:url, Link2:url, Link3` | See detailed format below. |
| **Copyright** | Copyright line at the bottom | Plain text | Example: `© 1923—2024 Maison Héritage SA · Paris · Geneva · Tokyo` |
| **Tagline** | Final tagline at the very bottom | Plain text | Example: `Crafted with restraint` |
| **WhatsApp number** | Phone number for all WhatsApp links | Any format — non-digits stripped | Example: `+91-98765-43210`. The system strips `+`, `-`, spaces and uses `919876543210` in the actual `wa.me/` link. The number you type is also displayed as-is in the nav bar. |

**Columns format explained**:
Each column represents a group of links. Format:
```
Column Title|Link Label 1:url, Link Label 2:url, Link Label 3
```

The `:url` is optional. If omitted, the link displays as text (not clickable).

**Example**:
```
Maison|Heritage:/, The Atelier:/atelier, Collections:/shop, Journal
Concierge|Private Appointments, Bespoke Commissions, Restoration, WhatsApp Concierge
```

In the "Maison" column: Heritage links to `/`, The Atelier links to `/atelier`, Collections links to `/shop`, Journal has no link (shows as plain text).

**WhatsApp number → where it's used**:
- Nav bar — the WhatsApp icon in the top-right uses this number
- Home page — "Speak to a concierge" button
- Product detail — "Order via WhatsApp", "Request private viewing", "Enquire on WhatsApp" buttons

**Brand → WhatsApp connection**:
The **Brand** field also powers the company name in all WhatsApp messages. For example, if Brand is `Maison\nHéritage`:
- The greeting reads: "Good day, Maison Héritage."
- The `\n` is automatically replaced with a space in the message

---

### Tab: Shop Page
Controls the `/shop` collections page.

| Field | What it controls | Format | Hidden Tips |
|---|---|---|---|
| **Title** | Page heading at the top | Supports `<em>` | Example: `The <em>register</em>.` |
| **Subtitle** | Text below the heading | Plain text | Shows in softer color. |

---

### Tab: Atelier Page
Controls the `/atelier` story page.

**Hero section:**
| Field | Format | Hidden Tips |
|---|---|---|
| **Hero Eyebrow** | Plain text | e.g. "The Atelier" |
| **Hero Title** | Supports `<em>` and `<br>` | Example: `Where every object<br>begins — and ends.` |
| **Hero Subtitle** | Plain text (multi-line) | Describes the atelier. |
| **Hero Image URL** | Full URL | Recommended: 1100×1400px. |
| **Hero Meta number** | e.g. `N° 001` | Reference badge. |
| **Hero Meta text** | Supports `<br>` | e.g. `Rue du Faubourg<br>Saint-Honoré, Paris` |

**Section (The Workshop):**
| Field | Format | Hidden Tips |
|---|---|---|
| **Section Label** | Plain text | e.g. "The Workshop" |
| **Section Title** | Supports `<em>` and `<br>` | e.g. `Eight disciplines.<br>One standard.` |
| **Section Intro** | Plain text (multi-line) | Paragraph about the workshop. |

**Stats** — Same format as Atelier (Home): `Number|Label` per line.

**Images** — Same format as Atelier (Home): `URL|Caption|Width(1/0)` per line.

**Principles** — Same format as main Principles tab: `Number|Name|Description|Detail` per line.

---

## Supported HTML in Title Fields

These fields support simple HTML for styling:

| Tag | Effect | Where supported |
|---|---|---|
| `<em>text</em>` | Italic | All Title fields, Quote fields |
| `<br>` | Line break | All Title fields, Meta text fields, Quotes |
| `<strong>text</strong>` | Bold | All Title fields, Quote fields (rarely needed) |

**Do not use** any other HTML tags — they will be stripped and ignored.

---

## Image URL Guide

Every image field accepts a full URL. Best practices:

| Section | Recommended size | Aspect ratio |
|---|---|---|
| Hero image | 1100×1400px | ~3:4 portrait |
| Category card | 400×400px | 1:1 square |
| Product card | 800×1000px | 4:5 portrait |
| Product detail (main) | 900×1125px | 4:5 portrait |
| Product thumbnail | 200×200px | 1:1 square |
| Atelier wide image | 800×550px | ~3:2 landscape |
| Atelier narrow image | 700×875px | 4:5 portrait |

You can use any image hosting — Cloudinary, Imgix, your own CDN, or placeholders via picsum:

```
https://picsum.photos/seed/your-custom-name/800/1000
```

⚠️ **Warning**: If you change an image URL, the old image stops showing immediately. Make sure the new URL is valid before saving.

---

## Content Reset

The **"Restore defaults"** button at the top of the admin panel:
- Deletes all products and replaces them with the original 8 sample products
- Resets every section (Hero, Marquee, Manifesto, Categories, Atelier, Principles, Footer, Shop, Atelier Page) to the original content
- **Cannot be undone** — you will lose any custom content you've added

---

## Common Questions

**Q: I added a category but it doesn't show on the home page.**
A: Categories appear on the home page automatically. Make sure you've added at least one product assigned to that category.

**Q: The WhatsApp link doesn't work.**
A: Check the **Footer → WhatsApp number** field. Make sure it contains digits. The format `+91-XXXXX-XXXXX` works — the system strips everything except digits.

**Q: Images are broken / not loading.**
A: Make sure the URL starts with `https://` and is a publicly accessible image. Use your browser to open the URL directly and verify it loads.

**Q: Can I use images from Google Drive / Dropbox?**
A: Only if the link is a direct, publicly accessible image URL (ends in `.jpg`, `.png`, `.webp`). Most cloud storage links are not directly usable.

**Q: The title looks wrong — it's showing HTML tags on the page.**
A: Only `<em>`, `<strong>`, and `<br>` are supported. If you used other tags (like `<h1>`, `<div>`, `<p>`), they get stripped and their content shows as plain text.

**Q: I want to change the admin login credentials.**
A: Contact the development team — credentials are set as environment variables.

---

## Local Development

```bash
cd web
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

## Deployment (Vercel)

1. Set `DATABASE_URL` in Vercel environment variables
2. Deploy
3. Visit `/admin` and log in
4. Optionally run `pnpm prisma db seed` on the server for sample data
