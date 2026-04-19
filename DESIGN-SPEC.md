# Caputo Construction Company — Design Specification
**For use in Claude Design / wireframing + development reference**

---

## Brand Identity

**Company:** Caputo Construction Company  
**Location:** Hazleton, PA (serves greater Pennsylvania + surrounding region)  
**Type:** Full-service construction — residential, commercial, general contracting  
**Tone:** Ultra-polished, premium, trustworthy, family-owned strength  
**Tagline (suggested):** *"Built to Last. Built for You."* or *"Crafting Pennsylvania's Skyline Since [Year]"*

### Logo
- Wordmark only: **"Caputo"** in ultra-bold sans-serif + **"Construction"** smaller, same weight
- Color: Caputo Red `#D42B2B`
- Use white version on dark backgrounds, red version on light/white backgrounds
- Minimum clear space: 24px all sides

### Color System
| Token | Hex | Usage |
|-------|-----|-------|
| `--red` | `#D42B2B` | Primary brand, CTAs, accents |
| `--red-dark` | `#A81F1F` | Hover states on red elements |
| `--black` | `#0F0F0F` | Hero overlays, dark sections |
| `--charcoal` | `#1C1C1E` | Footer, dark cards |
| `--steel` | `#3A3A3C` | Secondary text on dark bg |
| `--concrete` | `#8A8A8E` | Muted labels, captions |
| `--off-white` | `#F5F4F1` | Warm content section backgrounds |
| `--white` | `#FFFFFF` | Pure white sections, cards |
| `--gold` | `#C9A84C` | Optional premium accent (stats, highlights) |

### Typography
- **Display / Headlines:** `Inter` 800–900 weight — large, commanding, tight leading
- **Subheadings:** `Inter` 600 weight
- **Body:** `Inter` 400, line-height 1.7, 16–18px
- **Labels / Caps:** `Inter` 500, 11–12px, `letter-spacing: 0.15em`, ALL CAPS
- **Scale (desktop):** H1 72–96px → H2 48px → H3 32px → H4 22px → Body 16–18px
- **Scale (mobile):** H1 40–52px → H2 32px → H3 22px → Body 15px

---

## Site Architecture (5 Pages)

```
/ (Home)
/services
/projects
/about
/contact
```

---

## Page 1: Home

### Section 1 — Hero (Full Viewport, Video Background)

**Layout:** 100vh, full-bleed video background
**Video:** Looping construction b-roll (aerial drone over active builds, steel beams, concrete pours, finished buildings) — created in Gemini Veo
**Overlay:** Linear gradient — `rgba(0,0,0,0.55)` top to `rgba(0,0,0,0.7)` bottom
**Content (centered, vertically centered):**
- Small label: `HAZLETON, PA  ·  EST. [YEAR]` — white, caps, letter-spaced
- H1: `"Built to Last."` — white, 88px, weight 900, tight letter-spacing (-2px)
- H1 line 2: `"Built for You."` — Caputo Red `#D42B2B`, same size
- Subtext: `"Full-service residential and commercial construction serving Pennsylvania with craftsmanship, integrity, and results."` — white 60% opacity, 20px, max-width 640px
- CTA row: `[Start Your Project]` (red filled button, 56px tall) + `[View Our Work →]` (white outline button)

**Navigation (overlaid on hero, transparent → solid on scroll):**
- Left: Caputo logo (white version)
- Center: `Services  |  Projects  |  About  |  Contact`
- Right: `(570) XXX-XXXX` phone in red + `[Get a Quote]` red pill button
- On scroll past hero: nav background becomes `#0F0F0F`, 8px shadow

**Animations:**
- Video fades in over 1.2s on load
- H1 line 1 slides up + fades in (0.6s, delay 0.3s)
- H1 line 2 slides up + fades in (0.6s, delay 0.5s)
- Subtext fades in (0.6s, delay 0.7s)
- CTA buttons fade in (0.5s, delay 0.9s)
- Scroll indicator (animated chevron down) pulses at bottom center

---

### Section 2 — Trust Bar / Stats

**Layout:** Full-width dark strip (`#1C1C1E`), 120px tall on desktop
**Content:** 4 stats in a row, divided by thin vertical lines (`rgba(255,255,255,0.15)`)
- `25+` Years in Business
- `500+` Projects Completed  
- `$200M+` Value Delivered
- `100%` Licensed & Insured

**Style:** Number in white 48px 800 weight, label in `#8A8A8E` 12px caps below
**Animations:** Numbers count up when scrolled into view (CountUp.js pattern, 1.5s duration)

---

### Section 3 — What We Build (Services Overview)

**Layout:** White background (`#FFFFFF`), 120px top/bottom padding
**Header block (centered):**
- Red label: `OUR SERVICES`
- H2: `"Full-Service Construction,`  
  `Start to Finish."`
- Body: `"From ground-up commercial builds to custom residential projects, Caputo Construction delivers on every scale."` max-width 560px

**Service Cards (3-column grid, desktop):**
Each card has:
- Large number `01` / `02` / `03` in light gray (watermark style, 120px, weight 900)
- Category icon (line art, red)
- Title (H3, 26px)
- 2-sentence description
- `Learn More →` text link in red

**Services:**
1. **Commercial Construction** — Office buildings, retail, industrial facilities, tenant improvements
2. **Residential Construction** — Custom homes, additions, major renovations, luxury builds
3. **General Contracting** — Project management, subcontractor coordination, design-build delivery
4. **Site Development** — Grading, excavation, utilities, foundations
5. **Renovation & Remodeling** — Full gut renovations, structural changes, historic preservation
6. **Project Management** — Budgeting, scheduling, permitting, inspections

*Show 3 on homepage, link to /services for all 6*

**Animations:**
- Section header slides up on scroll (0.5s)
- Cards stagger in left to right (0.4s each, 0.1s stagger delay)
- Hover: card lifts 6px (`translateY(-6px)`), red top border appears (3px), shadow deepens

---

### Section 4 — Featured Projects

**Layout:** Off-white background (`#F5F4F1`), asymmetric
**Header (left-aligned):**
- Red label: `OUR WORK`
- H2: `"Projects That Speak for Themselves."`
- Right of header: `[View All Projects →]` text link

**Featured Project (Large — spans full width):**
- Left 60%: Large project photo (or placeholder) with slight parallax on scroll
- Right 40%: Dark card (`#1C1C1E`) with project details:
  - Category tag (red pill): `COMMERCIAL`
  - Project name: H3 white 36px
  - Location + Year: `#8A8A8E` small caps
  - 2-sentence description in gray
  - `[View Project →]` white outline button

**Project Grid (below, 3 columns):**
Each card:
- Image fills card top (ratio 4:3)
- Hover: image scales to 108%, red overlay strip appears at bottom
- Bottom strip: project name + category
- Click → project detail page

**Placeholder project names:**
- Hazleton Medical Office Building
- Downtown Scranton Retail Complex
- Custom Residence — Mountain Top, PA
- Industrial Warehouse — Wilkes-Barre, PA

**Animations:**
- Featured project: left image parallaxes 20px on scroll
- Grid cards: fade in staggered (0.2s delay between each)
- Card hover: smooth 300ms transition on scale + overlay

---

### Section 5 — Why Caputo

**Layout:** Deep dark background (`#0F0F0F`), 100px padding
**Left column (50%):**
- Red label: `WHY CHOOSE US`
- H2 white: `"A Name You Can`  
  `Trust on Every Job."`
- Body text (gray): Family-owned, Hazleton roots, three decades of excellence
- `[Meet the Team →]` white outline button

**Right column (50%) — 4 feature rows:**
Each row: red checkmark icon + bold title + 1-line description
- **Locally Rooted** — Based in Hazleton, PA. We know this region's codes, climate, and contractors.
- **Transparent Pricing** — No surprises. Detailed estimates with clear line-item breakdowns.
- **On Time, On Budget** — Proven project management with a track record to back it up.
- **Licensed & Fully Insured** — PA contractor license, full liability and workers' comp coverage.

**Animations:**
- Left column slides in from left (0.6s)
- Right column rows stagger in from right (0.15s stagger)

---

### Section 6 — Testimonials

**Layout:** White background, 100px padding, centered
**Header:**
- Red label: `CLIENT TESTIMONIALS`
- H2: `"What Our Clients Say."`

**Testimonial Carousel (3 quotes, auto-rotate every 5s, pause on hover):**
Each slide:
- Large `"` in red (decorative, 120px)
- Quote text: 22px, `#1C1C1E`, italic, max-width 720px
- Client name: bold, 16px + role/type: gray
- Company/project reference below

**Dots navigation below carousel (red active dot)**

**Animations:**
- Slides crossfade (400ms)
- Quote text fades in on each transition

---

### Section 7 — Service Area

**Layout:** Off-white (`#F5F4F1`) background, 80px padding
**Content:**
- Red label: `SERVICE AREA`
- H2: `"Proudly Serving Pennsylvania"`
- Body: `"Headquartered in Hazleton, PA, Caputo Construction serves clients across northeastern and central Pennsylvania, including Scranton, Wilkes-Barre, Allentown, and beyond."`
- Pill tags for key cities: `Hazleton  ·  Scranton  ·  Wilkes-Barre  ·  Allentown  ·  Bethlehem  ·  Reading  ·  Philadelphia`

**Visual:** Subtle Pennsylvania state outline illustration (SVG, filled `#E8E6E1`) with Hazleton marked with red dot

---

### Section 8 — Contact CTA Banner

**Layout:** Full-width, Caputo Red `#D42B2B` background, 100px padding
**Content (centered):**
- H2 white: `"Ready to Build Something Great?"`
- Subtext white 70%: `"Tell us about your project. We'll get back to you within 24 hours."`
- `[Start Your Project]` — white button with red text (inverted), 56px tall, 48px horizontal padding
- Below button: `or call us at (570) XXX-XXXX`

**Animations:**
- Section background has subtle SVG texture overlay (concrete grain, 4% opacity)
- Button hover: white → off-white, slight scale up (1.03)

---

### Section 9 — Footer

**Layout:** `#0F0F0F` background
**Top row (4 columns):**
- Col 1: Logo (white) + tagline + social icons (LinkedIn, Facebook, Instagram)
- Col 2: **Services** links list
- Col 3: **Company** (About, Projects, Careers, Press)
- Col 4: **Contact** — address, phone, email, `[Get a Quote]` red button

**Bottom bar:** `© 2025 Caputo Construction Company · Hazleton, PA · All Rights Reserved · Privacy Policy`
**Divider:** 1px `rgba(255,255,255,0.08)` between top and bottom

---

## Page 2: Services (`/services`)

**Hero:** Dark photo background (construction site), 50vh height
- H1: `"What We Build"`
- Breadcrumb: Home > Services

**Body:** Full service grid (6 cards, 3 columns)
Each card expanded version with:
- Header photo
- Service title
- Full description (3–4 sentences)
- Key capabilities list (bullets)
- `[Request a Quote →]`

---

## Page 3: Projects (`/projects`)

**Hero:** 40vh, dark, `"Our Work"` H1

**Filter Bar (sticky):**
`All  |  Commercial  |  Residential  |  Industrial  |  Renovation`

**Project Grid:** Masonry or uniform 3-col grid
Each card: photo + hover overlay with project name, category, year

**Project Detail Page (`/projects/[slug]`):**
- Full-width hero image
- Project name H1 + category + location + year
- Project description (3–5 paragraphs)
- Stats row: Size (sq ft), Duration, Value, Category
- Photo gallery (horizontal scroll or lightbox grid)
- `"Start a similar project"` CTA at bottom

---

## Page 4: About (`/about`)

**Section 1 — Company Story:**
- Split layout: left text, right photo of team/office/jobsite
- H2: `"Built on Family. Built on Trust."`
- Story text: Caputo family history, founding year, Hazleton roots, growth

**Section 2 — Team Grid:**
- 3-col grid of team member cards
- Photo + Name + Title + 1-line bio
- Hover: slight scale + LinkedIn icon appears

**Section 3 — Values:**
- 3 large icons + title + paragraph each
- Integrity, Craftsmanship, Community

**Section 4 — Certifications / Affiliations:**
- Logo row: PA contractor license badge, insurance logos, industry associations (AGC, etc.)

---

## Page 5: Contact (`/contact`)

**Layout:** 2-column, 60/40 split
**Left (60%) — Zoho Form Embed:**
- Section header: `"Tell Us About Your Project"`
- Embedded Zoho form with fields:
  - Full Name *
  - Email *
  - Phone *
  - Project Type (dropdown: Commercial / Residential / Renovation / Other)
  - Project Location
  - Project Description (textarea)
  - Estimated Budget (dropdown ranges)
  - How did you hear about us?
  - Submit: `[Send My Project Details]` — red button, full width

**Right (40%) — Contact Info:**
- Address block with map embed (Google Maps iframe, Hazleton PA)
- Phone with click-to-call link
- Email: info@caputoconstructioncompany.com (mailto link)
- Office hours
- Social links

**Animations:**
- Form fields focus: red bottom border animation (slide in from left)
- Submit button: loading spinner state → success checkmark

---

## Animation System (Global)

```css
/* Scroll reveal — apply to all sections */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.stagger > *:nth-child(1) { transition-delay: 0.0s; }
.stagger > *:nth-child(2) { transition-delay: 0.1s; }
.stagger > *:nth-child(3) { transition-delay: 0.2s; }
.stagger > *:nth-child(4) { transition-delay: 0.3s; }

/* Button hover */
.btn-primary {
  transition: background 0.2s ease, transform 0.2s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 43, 43, 0.35);
}

/* Card hover */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.15);
}

/* Image zoom on hover */
.img-zoom img {
  transition: transform 0.5s ease;
}
.img-zoom:hover img {
  transform: scale(1.07);
}

/* Nav transparency → solid */
.nav {
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.nav.scrolled {
  background: #0F0F0F;
  box-shadow: 0 2px 20px rgba(0,0,0,0.4);
}

/* CountUp numbers */
/* Use CountUp.js or Intersection Observer + JS counter */

/* Parallax hero image/video */
/* Use CSS transform: translateY() driven by scroll position */
/* Max offset: ±80px */
```

---

## Component Specs

### Primary Button
```
Background: #D42B2B
Text: #FFFFFF, Inter 600, 15px, letter-spacing 0.04em
Padding: 18px 40px
Border-radius: 4px
Hover: background #A81F1F, translateY(-2px), red glow shadow
```

### Outline Button (on dark bg)
```
Background: transparent
Border: 2px solid #FFFFFF
Text: #FFFFFF, Inter 600, 15px
Padding: 16px 38px
Border-radius: 4px
Hover: background rgba(255,255,255,0.1)
```

### Nav Link
```
Text: #FFFFFF or #1C1C1E (context)
Inter 500, 14px, letter-spacing 0.02em
Hover: color #D42B2B, transition 200ms
Active: red underline 2px below
```

### Section Label (e.g., "OUR SERVICES")
```
Text: #D42B2B
Inter 600, 12px, letter-spacing 0.15em, ALL CAPS
Margin-bottom: 16px
```

### Divider between sections
- Use padding variation (80–120px) and background color shifts
- Avoid heavy lines — let spacing do the separating

---

## Video Hero — Gemini Veo Prompt

Use this prompt to generate the hero background video in Gemini Veo:

> *"Cinematic time-lapse and slow-motion montage of premium construction: aerial drone shot rising above a large commercial building frame at golden hour, cut to close-up of steel beam being set into place with sparks flying, cut to workers in hard hats reviewing blueprints on a clean modern jobsite, cut to smooth camera push into a completed modern building exterior at dusk with warm interior lights on. 4K quality, desaturated/cinematic grade, dark and moody but professional. No text, no logos. 15-second loop."*

**Selected hero video:** `hero-v5-compat.mp4` (in `construction-site/`)

**Video specs for web:**
- Format: MP4 (H.264) + WebM fallback
- Resolution: 1920×1080 minimum
- Duration: 12–20 seconds (seamless loop)
- File size target: under 8MB (compress with HandBrake or ffmpeg)
- Autoplay: muted, loop, playsinline
- Fallback: static dark construction photo for users who prefer reduced motion

---

## Deployment

```bash
# Directory: construction-site/
cd construction-site && vercel --prod --yes
# Domain: caputoconstructioncompany.com (add in Vercel dashboard)
```

**Vercel config needed:**
- Clean URLs enabled
- Custom domain: caputoconstructioncompany.com
- SSL: auto (Vercel handles)
- Cache headers on assets

---

## Content Placeholders (to fill with real info)

- [ ] Year founded — placeholder: `Est. 1998`
- [ ] Exact phone number — placeholder: `(570) 555-0100`
- [x] Email address — info@caputoconstructioncompany.com
- [ ] Office/mailing address — placeholder: `123 Main Street, Hazleton, PA 18201`
- [x] Project photos — using Unsplash (construction/architecture, free to use):
  - Hero fallback: `https://images.unsplash.com/photo-1504307651254-35680f356dfd` (construction site aerial)
  - Commercial project: `https://images.unsplash.com/photo-1486325212027-8081e485255e` (modern office building)
  - Residential project: `https://images.unsplash.com/photo-1570129477492-45c003edd2be` (custom home)
  - Industrial: `https://images.unsplash.com/photo-1565008447742-97f6f38c985c` (warehouse/industrial)
  - Renovation: `https://images.unsplash.com/photo-1581858726788-75bc0f6a952d` (interior renovation)
  - Team/jobsite: `https://images.unsplash.com/photo-1504307651254-35680f356dfd` (workers on site)
- [ ] Team photos + names + titles — placeholder: `John Caputo, Owner & President` / `[Name], Project Manager` / `[Name], Site Superintendent`
- [ ] 3 client testimonials — placeholders:
  1. `"Caputo Construction delivered our commercial build on time and under budget. Quality exceeded our expectations." — Michael R., Commercial Property Owner`
  2. `"From the first consultation to the final walkthrough, the Caputo team was professional and truly cared about our project." — Sarah D., Residential Client`
  3. `"We've worked with a lot of contractors. Caputo is in a different league — honest pricing, no surprises, craftsmanship that shows." — Tom K., General Manager`
- [ ] Zoho Form embed URL — placeholder: `https://forms.zohopublic.com/caputo/[your-form-id]`
- [ ] Social media URLs — placeholder: `facebook.com/caputoconstructionco` / `instagram.com/caputoconstructionco` / `linkedin.com/company/caputo-construction`
- [ ] Google Maps embed — placeholder: embed for `Hazleton, PA 18201`
