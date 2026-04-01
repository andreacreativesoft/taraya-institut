# Taraya Institut — Master Project Specification

## Project Overview

**Client:** Taraya Institut — French beauty institute (women-only, wellness & beauty)
**Agency:** Andrea Creative Soft Design (ACSD), Brașov, Romania
**Type:** Client website with custom CMS admin panel
**Language:** French (all content)
**Status:** Planning → Development

---

## CRITICAL RULES (read before writing ANY code)

These rules were learned from build mistakes. They are NON-NEGOTIABLE.

### Rule 1: NEVER guess image URLs or content
- Every image, icon, and asset URL MUST come from `get_design_context` for that specific Figma section
- NEVER use placeholder URLs, stock photo URLs, or invented paths
- If you don't have the real asset, STOP and fetch it from Figma first
- Each Figma section may have STACKED images (multiple layers) — always use the TOP visible layer

### Rule 2: Download ALL images locally FIRST
- Figma CDN URLs (`figma.com/api/mcp/asset/...`) expire in 7 days
- BEFORE writing any component, download all assets to `/public/images/`
- Use `curl -L -o` immediately after getting fresh URLs from `get_design_context`
- If curl returns HTTP 202, retry with `-L` flag (follows redirects from async processing)
- Components MUST reference `/images/filename.webp` — NEVER Figma CDN URLs
- Convert all images to WebP for performance

### Rule 3: CSS base styles MUST use @layer
- Global heading/body styles in `globals.css` MUST be wrapped in `@layer base {}`
- Without this, base styles override Tailwind utility classes (e.g., `text-white` on hero H1 won't work)
- Example of what BROKE: `h1 { color: var(--color-text-heading); }` without @layer overrode `text-white`

### Rule 4: Use exact Figma dimensions — no guessing
- Every dimension (width, height, position, spacing) must match Figma exactly
- Use `get_design_context` or `get_metadata` to get precise values
- For decorative elements (ornaments, overlapping images): extract EXACT x, y, width, height from Figma
- Logo: exact dimensions from Figma (e.g., 213 × 109.508px)
- Icons: exact size from Figma (e.g., social icons = 24px)

### Rule 5: Responsive values — never fixed pixels for layout
- Decorative/overlay elements: use percentage widths (e.g., `w-[24%]`) not fixed `w-[280px]`
- Section containers: max-width with responsive padding
- Images in layouts: use `object-cover` or `object-contain` based on Figma behavior
- Test at 1440px (desktop), 768px (tablet), 375px (mobile)

### Rule 6: One section at a time — verify before moving on
- Fetch design context for ONE section
- Download its assets locally
- Build the component
- Visually compare against Figma screenshot
- Get approval
- THEN move to the next section
- NEVER build all 10 sections in one shot without verification

### Rule 7: Figma layer hierarchy matters
- Some Figma nodes stack multiple images/fills on the same frame
- The LAST/TOP image in the stack is what's visually visible
- Always check if a frame has multiple image fills — use the one the user sees
- Background fills vs foreground images: check z-order in metadata

### Rule 8: TypeScript — NEVER use `.catch(() => [])` with Prisma
- `.catch(() => [])` returns `type[] | never[]` — TypeScript loses all type info
- This passes `npm run build` locally but FAILS on Hostinger's stricter build
- CORRECT pattern: use `try/catch` with explicit LOCAL type definitions
- **Prisma 7 does NOT export `Prisma` namespace or `GetPayload` types** — do NOT use them
- Example of what BROKE multiple times on deploy:
  ```ts
  // BAD — loses type, causes 'implicitly has any type' on .map() and .reduce()
  const items = await prisma.model.findMany().catch(() => []);
  
  // BAD — Prisma 7 does not export this
  import type { Prisma } from "@prisma/client";
  let items: Prisma.ModelGetPayload<{ include: { ... } }>[] = [];
  
  // CORRECT — define simple local types that match your schema
  type Category = {
    id: string;
    title: string;
    order: number;
    items: Item[];
  };
  type Item = {
    id: string;
    name: string;
    price: string | null;
    categoryId: string;
    order: number;
  };
  
  let categories: Category[] = [];
  try {
    const rows = await prisma.pricingCategory.findMany({
      include: { items: { orderBy: { order: "asc" } } },
    });
    categories = rows.map((r: Category) => ({ ...r }));
  } catch {
    categories = [];
  }
  ```
- ALWAYS type callback parameters explicitly: `.map((r: Category) => ...)` not `.map((r) => ...)`
- ALWAYS test with `npx tsc --noEmit` before pushing — catches these errors locally

### Rule 9: TypeScript strict mode — type ALL parameters
- Hostinger builds with strict TypeScript (even if local tsconfig is lenient)
- Every `.map()`, `.reduce()`, `.filter()` callback parameter MUST have an explicit type
- Every function parameter MUST have an explicit type
- NEVER rely on TypeScript inference for callback params in chained methods
- Run `npx tsc --noEmit` locally BEFORE every `git push` — if it fails locally, it WILL fail on Hostinger

### Rule 10: Build verification — MANDATORY before every push
- Run this sequence before EVERY `git push`:
  ```bash
  npx tsc --noEmit          # TypeScript check (catches Hostinger failures)
  npm run build              # Full Next.js build
  ```
- If either fails, FIX before pushing
- Hostinger auto-deploys on push — a broken push = broken deploy = wasted time
- NEVER push with "it works locally" assumption — Hostinger build environment is stricter

### Rule 11: Fix ALL TypeScript errors at once
- When a TypeScript error is found, scan ALL files for the same pattern
- Use `grep -rn "\.catch(() =>" app/` to find all instances
- Use `grep -rn "\.map((.*)" app/` to check all untyped callbacks
- NEVER fix one file, push, wait for Hostinger to fail on the next file, repeat
- The first deploy had 4 consecutive failures from the SAME pattern in the SAME file

### Rule 12: Prisma 7 + Next.js server components — proper data fetching
- Server components fetch data directly with `prisma.model.findMany()`
- Always wrap in try/catch with typed empty fallback
- **Prisma 7 does NOT export `Prisma` namespace** — do NOT use `Prisma.XGetPayload<>`
- Define simple local types or export them from a shared `types.ts` file
- For `include` relations, define the nested type manually to match schema
- Import only concrete types: `import type { User, FormSubmission } from "@prisma/client"` (simple models only, no relations)
- For models with relations (include), define local types instead
- Test the full page render locally before pushing

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16+ (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + Flowbite 4 + flowbite-react |
| Database | MySQL (Hostinger managed) |
| ORM | Prisma 7 (MySQL adapter) — NO `Prisma` namespace exports, use local types |
| Auth | NextAuth.js |
| Hosting | Hostinger Node.js Web Apps (Business plan) |
| Deploy | GitHub → Hostinger auto-deploy |
| Dev | Local (localhost:3000) |
| Design | Figma → Tailwind conversion via MCP |

### Tailwind v4 Notes (IMPORTANT)
- Tailwind v4 uses CSS-based config — NO `tailwind.config.ts` file
- Config lives in `globals.css` using `@theme inline {}` and `@plugin`
- Flowbite loaded via `@plugin "flowbite/plugin"`
- Custom colors/fonts defined as CSS variables inside `@theme inline`
- Base styles MUST be in `@layer base {}` to allow utility overrides

---

## Architecture

### Public Site (`/`)
- Static-rendered pages (SSG/ISR) for maximum speed
- Content pulled from MySQL at build time
- SEO-optimized: proper heading hierarchy, meta tags, schema markup, image ALT text
- Tailwind CSS + Flowbite components
- Pixel-perfect match to Figma design

### Admin Panel (`/admin`)
- Protected by auth (NextAuth.js)
- Two roles: **Admin** (client) and **Super Admin** (ACSD)
- Server-side rendered, dynamic

---

## User Roles

### Admin (Client)
- View/edit content blocks activated by Super Admin
- Add/edit/delete dynamic content (services, pricing, etc.)
- View form submissions
- Manage images
- Add Google Analytics / Google Tag Manager code

### Super Admin (ACSD)
- Everything Admin can do, plus:
- Add/remove Admin and Super Admin users
- Activate/deactivate content blocks and features
- Claude AI chat — request website changes via conversation
- Access to all settings and configuration

---

## Figma Source

**File:** `MzkCpYTOSDI7OAnhWFk2fq` (Taraya Institut)
**Design Page:** `✅ Design Area` → `Homepage - Desktop` (section `522:10645`)

### Figma MCP Workflow (MANDATORY)

For EACH section, follow this exact order:

1. `get_screenshot` → visual reference of what it should look like
2. `get_design_context` → returns generated code + asset URLs + screenshot
3. Download ALL asset URLs immediately: `curl -L -o /public/images/section-name-asset.webp "URL"`
4. Verify downloads: `ls -la public/images/section-name/` (no empty files)
5. `get_metadata` (if needed) → exact dimensions for decorative/overlay elements
6. Build component using LOCAL image paths only (`/images/...`)
7. Compare visually against step 1 screenshot
8. Get approval before next section

### Desktop Homepage Sections (1440px)

| # | Section | Node ID | Type | Height |
|---|---------|---------|------|--------|
| 1 | Hero section | 5246:3350 | FRAME | 747px |
| 2 | Features (À propos) | 5246:3524 | INSTANCE | 721px |
| 3 | Features (À qui sont destinés) | 5246:3533 | INSTANCE | 674px |
| 4 | Services (Nos services) | 5246:4160 | FRAME | 1186px |
| 5 | Features (La pédicure) | 5246:3665 | INSTANCE | 762px |
| 6 | Pricing (Nos tarifs) | 5246:3694 | FRAME | 1293px |
| 7 | Features (Pourquoi nous choisir) | 5246:4068 | FRAME | 932px |
| 8 | Features (Partenaire Phyt's) | 5246:3954 | INSTANCE | 866px |
| 9 | CTA | 5254:3106 | INSTANCE | 407px |
| 10 | Footer | 5254:3137 | INSTANCE | 348px |

### Mobile Version (375px)
- `Hi-fi Homepage mobile` — Node: `5304:4267` (375 × 12892px)
- `Menu` — Node: `5313:3733` (375 × 703px)

### UI Kit
- Typography: Node `5069:7285`
- Colors: Node `5069:7297`
- Icons: Node `5069:7485`
- Components: Node `5069:7845`

### Design Tokens (extracted)

```
Background:     #FBF8EF (BG/100)
Heading text:   #251D1B (Text/Heading)
Body text:      #746E6B (Text/Body)
Accent/Icons:   #CAB3A0 (Primary/400)
Separators:     #DAD5CD (Stroke/200)
CTA/Pricing BG: #44312B (dark brown — verify exact per section from Figma)

Heading font:   Quattrocento Bold (next/font/google)
Body font:      Questrial Regular (next/font/google)

H2: 48px / 700 / 1.2 line-height
H5: 20px / 700 / 1.4 line-height
Body S: 16px / 400 / 1.4 line-height / 1px letter-spacing
```

---

## Known Figma Gotchas (from first build)

### Stacked Images
Some Figma frames have MULTIPLE image fills stacked on top of each other. The code from `get_design_context` may reference all of them. Only the TOP layer is visually visible. Always check and use the correct one.

### Decorative Ornaments (CTA section, Pricing section)
- These are lotus/leaf ornament images that overflow their container
- They have EXACT positioning in Figma (x, y, width, height)
- Extract exact values: e.g., width=626px, height=377px, left=-269px, bottom=-98.385px
- Use `overflow-hidden` on parent to clip the bleed
- Make positioning responsive with percentages where possible

### Logo Dimensions
- Must match Figma exactly: 213 × 109.508px
- Not auto-sized, not percentage — exact pixel dimensions

### Icon Sizes
- Social media icons in footer: 24px × 24px
- Feature list icons: 32px × 32px (circle bg with 16px icon inside)
- Check each section's `get_design_context` for exact values

---

## Known Deployment Gotchas (from first Hostinger deploy)

### Hostinger TypeScript is STRICTER than local
- Hostinger's Next.js build runs stricter TypeScript checks than local `npm run build`
- Parameters that TypeScript infers locally may fail as `implicitly has 'any' type` on Hostinger
- ALWAYS run `npx tsc --noEmit` locally before pushing — this catches Hostinger failures

### The `.catch(() => [])` disaster
- This pattern was used 4+ times across admin pages
- It caused 4 consecutive deploy failures on Hostinger, each fixing one occurrence
- The pattern: `prisma.findMany().catch(() => [])` returns `Type[] | never[]`
- TypeScript can't infer the element type, so `.map((item) => ...)` fails with `'item' implicitly has 'any' type`
- Fix: use try/catch with explicitly typed variables
- Prevention: grep ALL files for this pattern before pushing

### Prisma 7 — missing type exports
- Prisma 7 does NOT export the `Prisma` namespace at runtime
- `import type { Prisma } from "@prisma/client"` → **Module has no exported member 'Prisma'**
- `Prisma.XGetPayload<>` types do NOT exist in Prisma 7
- SOLUTION: define simple local types that match your schema fields
- For simple models (no relations): `import type { User, FormSubmission } from "@prisma/client"` works
- For models with `include` (relations): define a local type with the nested shape
- Export shared types from a `types.ts` file to avoid duplication across components

### Prisma + Server Components gotcha
- Next.js server components call Prisma directly (no API route needed)
- But error handling with `.catch()` breaks TypeScript inference on the resolved type
- Always use try/catch block with typed variable declarations

### Multiple pushes = multiple failed deploys
- Hostinger auto-deploys on every push to the connected branch
- Each failed deploy wastes ~2 minutes of build time
- Fix ALL errors locally first, push ONCE
- Use this pre-push checklist:
  ```bash
  npx tsc --noEmit          # Must pass
  npm run build              # Must pass  
  git add . && git commit && git push   # Only after both pass
  ```

---

## Image Asset Strategy

### Directory Structure
```
public/
└── images/
    ├── hero/
    │   ├── hero-bg.webp
    │   ├── logo.webp
    │   └── phone-icon.webp
    ├── about/
    │   └── treatment-room.webp
    ├── for-who/
    │   └── massage.webp
    ├── services/
    │   ├── service-1.webp
    │   ├── service-2.webp
    │   ├── service-3.webp
    │   ├── service-4.webp
    │   └── service-5.webp
    ├── pedicure/
    │   └── pedicure.webp
    ├── pricing/
    │   ├── ornament-left.webp
    │   └── ornament-right.webp
    ├── why-us/
    │   └── manicure-desk.webp
    ├── partner/
    │   └── phyts-products.webp
    ├── cta/
    │   ├── ornament-left.webp
    │   └── ornament-right.webp
    ├── footer/
    │   └── logo.webp
    └── icons/
        ├── star.svg
        ├── zoom.svg
        ├── receipt.svg
        ├── home.svg
        ├── heart.svg
        ├── facebook.svg
        ├── instagram.svg
        └── whatsapp.svg
```

### Download Process
```bash
# IMMEDIATELY after get_design_context returns URLs:
mkdir -p public/images/{hero,about,for-who,services,pedicure,pricing,why-us,partner,cta,footer,icons}
curl -L -o public/images/hero/hero-bg.webp "FIGMA_URL_HERE"
# ... repeat for every asset
# VERIFY each file is not empty:
ls -la public/images/hero/
```

---

## CSS Architecture

### globals.css Structure (Tailwind v4)
```css
@import "tailwindcss";
@plugin "flowbite/plugin";

@theme inline {
  --font-heading: 'Quattrocento', serif;
  --font-body: 'Questrial', sans-serif;
  --color-bg-100: #FBF8EF;
  --color-text-heading: #251D1B;
  --color-text-body: #746E6B;
  --color-primary-400: #CAB3A0;
  --color-stroke-200: #DAD5CD;
}

/* MUST use @layer base — otherwise overrides Tailwind utilities like text-white */
@layer base {
  body {
    font-family: var(--font-body);
    color: var(--color-text-body);
    background-color: var(--color-bg-100);
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-text-heading);
  }
}
```

---

## CMS Content Model

### Dynamic Content Blocks (toggleable by Super Admin)

Each section from Figma becomes a **content block** in the CMS:

- **Hero** — heading, subtext, CTA button text, CTA link, background image
- **Features** (reusable) — title, list of items (icon + title + description), image, layout (left/right)
- **Services** — title, list of service cards (image + title + description + price)
- **Pricing** — title, pricing tiers (name + price + features list)
- **CTA** — heading, button text, button link
- **Footer** — logo, navigation links, social links, contact info

### Content Operations
- Admin can: edit text, swap images, add/remove list items (e.g., new service)
- Super Admin can: activate/deactivate entire blocks, reorder sections

---

## Features

### Forms
- Contact/booking forms with submissions stored in MySQL
- Admin can view submissions in `/admin/forms`
- Email notification on new submission (future)

### SEO (built into every build)
- Semantic HTML with correct heading hierarchy (H1 → H2 → H3)
- Meta title + description per page
- Open Graph tags
- Schema.org structured data (LocalBusiness for beauty institute)
- Image ALT text on all images (descriptive, in French)
- Sitemap.xml + robots.txt auto-generated
- Core Web Vitals optimized (LCP, CLS, FID)
- All images in WebP format, lazy loaded except hero

### Analytics Integration
- Admin can paste Google Analytics tracking ID
- Admin can paste Google Tag Manager container ID
- Scripts injected in `<head>` via Next.js metadata

### WhatsApp CTA
- WhatsApp number extracted from Figma design
- Click-to-chat link in header and hero section

---

## Deployment Strategy

### Local Development
- `npx create-next-app` with Tailwind + TypeScript
- Local MySQL (or SQLite for dev convenience, Prisma handles both)
- `npm run dev` on localhost:3000

### Pre-Push Checklist (MANDATORY)
```bash
# Run BOTH before every git push — no exceptions
npx tsc --noEmit          # Catches strict TypeScript errors Hostinger will find
npm run build              # Full Next.js production build
# Only push if BOTH pass:
git add . && git commit -m "message" && git push
```

### Production (Hostinger Node.js Web Apps)
- GitHub repo → Hostinger auto-deploy on push
- Hostinger managed MySQL database
- Managed SSL (free)
- Hostinger CDN

### Hostinger Environment Variables (required for deploy)
```
DATABASE_URL=mysql://USERNAME:PASSWORD@localhost:3306/DBNAME
AUTH_SECRET=generate-a-real-secret-here
SEED_EMAIL=admin@client-domain.com
SEED_PASSWORD=initial-admin-password
```

### Hostinger MySQL Setup
1. hPanel → Databases → MySQL Databases
2. Create database + user
3. Note: database name, username, password, host (usually `localhost`)
4. Format as `DATABASE_URL=mysql://user:pass@host:3306/dbname`
5. Add to environment variables on Hostinger deploy screen

### Per-client deployment
- Separate GitHub repo per client
- Separate Hostinger Node.js app per client
- Separate MySQL database per client
- Separate domain per client

---

## Project Structure

```
taraya-institut/
├── app/
│   ├── (public)/           # Public site routes
│   │   ├── page.tsx        # Homepage
│   │   └── layout.tsx      # Public layout (nav + footer)
│   ├── admin/              # Admin panel routes
│   │   ├── page.tsx        # Dashboard
│   │   ├── content/        # Content management
│   │   ├── forms/          # Form submissions
│   │   ├── settings/       # Analytics codes, site settings
│   │   └── layout.tsx      # Admin layout (sidebar)
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   └── content/        # CRUD operations
│   └── layout.tsx          # Root layout (lang="fr", fonts, metadata)
├── components/
│   ├── public/             # Public site components (Hero, Features, etc.)
│   └── admin/              # Admin panel components
├── lib/
│   ├── db.ts               # Prisma client
│   └── auth.ts             # Auth config
├── prisma/
│   └── schema.prisma       # Database schema (MySQL datasource)
├── public/
│   └── images/             # ALL Figma assets downloaded locally (see Image Asset Strategy)
├── globals.css             # Tailwind v4 config + @theme inline + @layer base
├── .env.local              # Local env vars
└── package.json
```

**NOTE:** No `tailwind.config.ts` — Tailwind v4 uses CSS-based configuration in `globals.css`.

---

## Agent Knowledge Files

These files grow with every project. Start lean with Taraya Institut, refine with each client.

### 1. `FIGMA-AGENT.md`
- How to read Figma via MCP (get_design_context, use_figma, get_screenshot)
- Token extraction workflow
- MANDATORY: download all assets locally before writing components
- Figma CDN URLs expire in 7 days — never reference them in code
- Stacked image layers: always use the top/visible layer
- Asset download: `curl -L -o` immediately after fresh URL fetch
- Figma → Tailwind class mapping patterns
- Exact dimension extraction for decorative elements

### 2. `TAILWIND-FLOWBITE-AGENT.md`
- Tailwind v4 CSS-based config (no tailwind.config.ts)
- @layer base REQUIRED for global styles (prevents utility override issues)
- Flowbite 4 + flowbite-react component usage patterns
- Responsive breakpoints and mobile-first approach
- Typography scale and spacing system
- Custom color variables via @theme inline

### 3. `CMS-AGENT.md`
- MySQL schema (Prisma)
- Content block CRUD API patterns
- Admin panel component patterns
- Role-based access control (Admin vs Super Admin)
- Form submission handling

### 4. `SEO-AGENT.md`
- Heading hierarchy rules (one H1 per page, logical H2→H3 flow)
- Meta tag templates
- Schema.org markup per business type
- Image optimization: WebP format, descriptive ALT text, lazy loading
- Sitemap + robots.txt generation

### 5. `DEPLOY-AGENT.md`
- Hostinger Node.js Web Apps setup
- GitHub → auto-deploy configuration
- Environment variables management
- Domain mapping
- SSL activation

---

## Workflow (MANDATORY — follow this order)

### Phase 1 — Project Setup
1. Create Next.js project with Tailwind v4 + Flowbite 4
2. Configure `globals.css` with design tokens (use @layer base!)
3. Set up fonts via `next/font/google` (Quattrocento + Questrial)
4. Verify build compiles clean

### Phase 2 — Build Sections (ONE AT A TIME)
For EACH of the 10 sections:
1. `get_screenshot` of the Figma section → save as visual reference
2. `get_design_context` → get code + asset URLs
3. Download ALL assets from that section to `/public/images/section-name/`
4. Verify downloads are not empty (`ls -la`)
5. Build the component using LOCAL paths only
6. Run `npx tsc --noEmit` — fix ANY TypeScript errors before proceeding
7. Compare visually against Figma screenshot
8. **STOP — get approval before next section**

Build order: Hero → About → ForWho → Services → Pedicure → Pricing → WhyUs → Partner → CTA → Footer

### Phase 3 — Mobile Responsive
1. Fetch mobile design from Figma (node `5304:4267`)
2. Add responsive classes to each section
3. Build mobile menu (node `5313:3733`)

### Phase 4 — CMS Admin Panel
1. Prisma schema + MySQL setup
2. NextAuth.js with role-based access
3. Admin dashboard + content CRUD pages
4. Form submissions viewer
5. Analytics settings page
6. **CRITICAL:** All Prisma queries use try/catch with explicit types — NEVER `.catch(() => [])`
7. Run `npx tsc --noEmit` after EVERY file — fix before moving on
8. Run full `npm run build` before pushing

### Phase 5 — SEO + Polish
1. Heading hierarchy audit
2. Meta tags + Open Graph
3. Schema.org markup
4. Image ALT text (French, descriptive)
5. Sitemap.xml + robots.txt
6. Core Web Vitals check

### Phase 6 — Deploy
1. Run full pre-push checklist: `npx tsc --noEmit && npm run build`
2. Fix ALL TypeScript errors — grep for common patterns across ALL files
3. Push to GitHub (single clean push, not multiple fix attempts)
4. Connect to Hostinger Node.js Web Apps
5. Create MySQL database in hPanel → Databases
6. Add environment variables (DATABASE_URL, AUTH_SECRET, SEED_EMAIL, SEED_PASSWORD)
7. Deploy — should succeed on FIRST attempt if pre-push checklist was followed
8. Run Prisma migrations: `npx prisma db push` (or via seed endpoint)
9. Map domain
10. SSL activation (auto with Hostinger)

---

## Open Decisions (to resolve during build)

- [ ] Claude API key for admin chat (set at the end)
- [ ] Exact Hostinger plan to purchase
- [ ] Domain for Taraya Institut
- [ ] Email notification provider for form submissions

---

## Reference

- **Figma file:** https://www.figma.com/design/MzkCpYTOSDI7OAnhWFk2fq/Taraya-Institut
- **Hostinger Node.js plans:** https://www.hostinger.com/uk/web-apps-hosting
- **Flowbite 4 docs:** https://flowbite.com/docs/getting-started/introduction/
- **Tailwind v4 docs:** https://tailwindcss.com/docs
- **Next.js App Router:** https://nextjs.org/docs/app
- **Prisma + MySQL:** https://www.prisma.io/docs/getting-started
