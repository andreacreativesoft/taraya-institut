# Taraya Institut — Master Project Specification

## Project Overview

**Client:** Taraya Institut — French beauty institute (women-only, wellness & beauty)
**Agency:** Andrea Creative Soft Design (ACSD), Brașov, Romania
**Type:** Client website with custom CMS admin panel
**Language:** French (all content)
**Status:** Planning → Development

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS + Flowbite |
| Database | MySQL (Hostinger managed) |
| ORM | Prisma (MySQL adapter) |
| Auth | NextAuth.js |
| Hosting | Hostinger Node.js Web Apps (Business plan) |
| Deploy | GitHub → Hostinger auto-deploy |
| Dev | Local (localhost:3000) |
| Design | Figma → Tailwind conversion |

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

### Desktop Homepage Sections (1440px)

| # | Section | Node ID | Type | Height |
|---|---------|---------|------|--------|
| 1 | Hero section | 5246:3350 | FRAME | 747px |
| 2 | Features | 5246:3524 | INSTANCE | 721px |
| 3 | Features | 5246:3533 | INSTANCE | 674px |
| 4 | Services | 5246:4160 | FRAME | 1186px |
| 5 | Features | 5246:3665 | INSTANCE | 762px |
| 6 | Pricing | 5246:3694 | FRAME | 1293px |
| 7 | Features (Why Choose Us) | 5246:4068 | FRAME | 932px |
| 8 | Features | 5246:3954 | INSTANCE | 866px |
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

Heading font:   Quattrocento Bold
Body font:      Questrial Regular

H2: 48px / 700 / 1.2 line-height
H5: 20px / 700 / 1.4 line-height
Body S: 16px / 400 / 1.4 line-height / 1px letter-spacing
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
- Image ALT text on all images
- Sitemap.xml + robots.txt auto-generated
- Core Web Vitals optimized (LCP, CLS, FID)

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

### Production (Hostinger)
- GitHub repo → Hostinger auto-deploy
- Hostinger managed MySQL
- Managed SSL (free)
- Hostinger CDN
- Per-client: separate deploy, separate domain, separate DB

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
│   └── layout.tsx          # Root layout
├── components/
│   ├── public/             # Public site components (Hero, Features, etc.)
│   └── admin/              # Admin panel components
├── lib/
│   ├── db.ts               # Prisma client
│   └── auth.ts             # Auth config
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   └── images/             # Exported Figma assets
├── tailwind.config.ts      # Tailwind + Flowbite config with design tokens
├── .env.local              # Local env vars
└── package.json
```

---

## Agent Knowledge Files

These files grow with every project. Start lean with Taraya Institut, refine with each client.

### 1. `FIGMA-AGENT.md`
- How to read Figma via MCP (get_design_context, use_figma, get_screenshot)
- Token extraction workflow
- Asset export strategy (7-day CDN URLs → download to /public)
- Figma → Tailwind class mapping patterns

### 2. `TAILWIND-FLOWBITE-AGENT.md`
- Tailwind config with custom design tokens
- Flowbite component usage patterns (navbar, accordion, modal, carousel)
- Responsive breakpoints and mobile-first approach
- Typography scale and spacing system

### 3. `CMS-AGENT.md`
- MySQL schema (Prisma)
- Content block CRUD API patterns
- Admin panel component patterns
- Role-based access control
- Form submission handling

### 4. `SEO-AGENT.md`
- Heading hierarchy rules
- Meta tag templates
- Schema.org markup per business type
- Image optimization checklist (WebP, lazy load, ALT text)
- Sitemap + robots.txt generation

### 5. `DEPLOY-AGENT.md`
- Hostinger Node.js Web Apps setup
- GitHub → auto-deploy configuration
- Environment variables management
- Domain mapping
- SSL activation

---

## Workflow (Current: Manual → Future: Automated)

### Phase 1 — This Project (Taraya Institut)
1. Pull UI Kit from Figma → set up Tailwind config
2. Screenshot + design context per section
3. Convert each section to Next.js + Tailwind + Flowbite
4. Build CMS admin panel
5. SEO optimization pass
6. Test locally → deploy to Hostinger
7. Document everything in agent knowledge files

### Phase 2 — Automation Pipeline (after first build)
1. Drop Figma link
2. Agents auto-read design, extract tokens, map sections
3. Generate Next.js project with CMS pre-configured
4. Human review + approval
5. Deploy

### Phase 3 — Scale (300 clients)
1. Figma link → automated build → review → deploy
2. Each client gets: public site + admin panel + Super Admin access
3. Agent knowledge files are mature and battle-tested
4. Minimal human intervention per project

---

## Open Decisions (to resolve during build)

- [ ] Claude API key for admin chat (set at the end)
- [ ] Exact Hostinger plan to purchase
- [ ] Domain for Taraya Institut
- [ ] Email notification provider for form submissions
- [ ] Image storage strategy (local filesystem vs CDN)

---

## Reference

- **Figma file:** https://www.figma.com/design/MzkCpYTOSDI7OAnhWFk2fq/Taraya-Institut
- **Hostinger Node.js plans:** https://www.hostinger.com/uk/web-apps-hosting
- **Flowbite docs:** https://flowbite.com/docs/getting-started/introduction/
- **Tailwind docs:** https://tailwindcss.com/docs
- **Next.js App Router:** https://nextjs.org/docs/app
- **Prisma + MySQL:** https://www.prisma.io/docs/getting-started
