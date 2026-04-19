# Claude Design Prompt — Caputo Construction Company

---

## Your Task

You are designing a **premium marketing website** for **Caputo Construction Company**, a full-service construction firm based in Hazleton, PA. The goal is to produce **high-fidelity wireframes** for the homepage first, then the remaining 4 pages. The design must feel ultra-polished and beautiful — think Turner Construction meets Apple. Clean, masculine, trustworthy, premium.

The client is a family-owned company. The wife of the owner will be reviewing these wireframes and is not technical, so designs must be clear, complete, and visually self-explanatory.

---

## Brand Assets (use these directly)

**Logo — Red (for light backgrounds):**
https://raw.githubusercontent.com/alimabsoute/caputo-construction/master/caputo-logo-transparent.png

**Logo — White (for dark backgrounds, nav overlay on video hero):**
https://raw.githubusercontent.com/alimabsoute/caputo-construction/master/caputo-logo-white.png

**Logo — Black (for alternative light contexts):**
https://raw.githubusercontent.com/alimabsoute/caputo-construction/master/caputo-logo-black.png

**Hero Video:** A cinematic 20-second construction b-roll video will play behind the hero section (looping, muted, autoplay). Represent this in the wireframe as a **dark full-bleed cinematic frame** — deep charcoal/black with a subtle film grain texture and a faint construction silhouette or blueprint overlay. Do NOT use a static photo for the hero — show it clearly as a video placeholder.

---

## Color Palette

| Role | Hex |
|------|-----|
| Caputo Red (primary brand) | `#D42B2B` |
| Red Dark (hover) | `#A81F1F` |
| Near Black | `#0F0F0F` |
| Charcoal | `#1C1C1E` |
| Steel (secondary text, dark bg) | `#3A3A3C` |
| Concrete (muted labels) | `#8A8A8E` |
| Off-White (warm sections) | `#F5F4F1` |
| White | `#FFFFFF` |
| Gold (optional accent for stats) | `#C9A84C` |

---

## Typography

- **Font:** Inter (Google Fonts, free)
- H1: 88px, weight 900, tight letter-spacing (−2px)
- H2: 48px, weight 800
- H3: 32px, weight 700
- Body: 16–18px, weight 400, line-height 1.7
- Labels: 12px, weight 600, ALL CAPS, letter-spacing 0.15em, color `#D42B2B`

---

## Company Info

- **Company:** Caputo Construction Company
- **Location:** Hazleton, PA — serves all of Pennsylvania
- **Services:** Residential construction, commercial construction, general contracting, site development, renovation & remodeling, project management
- **Tagline:** "Built to Last. Built for You."
- **Email:** info@caputoconstructioncompany.com
- **Domain:** caputoconstructioncompany.com
- **Tone:** Premium, confident, family-owned, trustworthy — NOT corporate-cold

---

## Site Pages to Wireframe (in order)

1. **Home** — Priority #1, most detail
2. **Services** — `/services`
3. **Projects/Portfolio** — `/projects`
4. **About** — `/about`
5. **Contact** — `/contact`

---

## Homepage — Section by Section

Design each section in sequence. Show the full desktop layout (1440px wide). Also show a mobile breakpoint (375px) for the hero section.

### NAV (Sticky, transparent over hero → solid `#0F0F0F` on scroll)
- Left: White logo (linked above)
- Center: `Services  |  Projects  |  About  |  Contact` — Inter 500, 14px, white
- Right: Phone number placeholder `(570) 555-0100` in red + `[Get a Quote]` red filled pill button
- On scroll: background becomes `#0F0F0F`, soft shadow below

---

### SECTION 1 — HERO (100vh, video background)
- Full viewport height
- Background: dark cinematic video placeholder (deep charcoal, subtle construction silhouette) — label it "VIDEO BACKGROUND — loops, muted, autoplay"
- Dark gradient overlay: `rgba(0,0,0,0.6)` bottom-weighted
- Content centered vertically and horizontally:
  - Small red label: `HAZLETON, PA  ·  EST. [YEAR]` — 12px, caps, letter-spaced
  - H1 line 1: `"Built to Last."` — white, 88px, weight 900
  - H1 line 2: `"Built for You."` — Caputo Red `#D42B2B`, 88px, weight 900
  - Subtext: `"Full-service residential and commercial construction serving Pennsylvania with craftsmanship, integrity, and results."` — white 60% opacity, 20px, max-width 640px, centered
  - Two buttons side by side: `[Start Your Project]` (red filled, 56px tall) + `[View Our Work →]` (white outline, same height)
  - Animated scroll chevron at bottom center
- Annotate: "H1 line 1 slides up + fades in on load. Line 2 follows 0.2s later. Buttons fade in last."

---

### SECTION 2 — TRUST BAR (Stats Strip)
- Background: `#1C1C1E` (dark charcoal)
- Height: ~120px
- 4 stats in a row, divided by thin vertical separators (`rgba(255,255,255,0.12)`):
  1. `25+` Years in Business
  2. `500+` Projects Completed
  3. `$200M+` Value Delivered
  4. `100%` Licensed & Insured
- Number: white, 48px, 800 weight
- Label: `#8A8A8E`, 12px, ALL CAPS, below number
- Annotate: "Numbers count up via JS when scrolled into view"

---

### SECTION 3 — SERVICES OVERVIEW
- Background: `#FFFFFF`
- Top padding 100px, bottom padding 100px
- Centered header block:
  - Red label: `OUR SERVICES`
  - H2: `"Full-Service Construction, Start to Finish."`
  - Body text below, max-width 560px, centered, gray
- 3-column card grid below (show 3 of 6 services, with "View All Services →" link):
  1. **Commercial Construction** — Office, retail, industrial builds
  2. **Residential Construction** — Custom homes, additions, luxury renovations
  3. **General Contracting** — Project management, design-build delivery
- Each card:
  - Large watermark number (`01`, `02`, `03`) in very light gray (120px, behind content)
  - Red line-art icon at top
  - Service title: H3 dark
  - 2-sentence description
  - `Learn More →` in red at bottom
  - Annotate: "Cards lift 6px on hover with red top border accent"

---

### SECTION 4 — FEATURED PROJECTS
- Background: `#F5F4F1` (warm off-white)
- Header row: left-aligned H2 `"Projects That Speak for Themselves."` + right-aligned `[View All Projects →]` text link
- Large featured project (full-width asymmetric layout):
  - Left 60%: Large construction photo placeholder (use Unsplash: https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200)
  - Right 40%: Dark card `#1C1C1E`:
    - Red pill tag: `COMMERCIAL`
    - Project name: H3 white `"Hazleton Medical Office Building"`
    - Location + year: `#8A8A8E`, small caps — `Hazleton, PA  ·  2023`
    - Short description: gray text
    - `[View Project →]` white outline button
- Below: 3-column project grid with these Unsplash placeholder images:
  - `https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600` — "Custom Residence, Mountain Top PA"
  - `https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600` — "Industrial Warehouse, Wilkes-Barre PA"
  - `https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600` — "Downtown Retail Renovation, Scranton PA"
- Annotate: "Project images scale to 108% on hover with red overlay strip at bottom"

---

### SECTION 5 — WHY CAPUTO
- Background: `#0F0F0F` (near black)
- Two-column layout:
  - Left 50%:
    - Red label: `WHY CHOOSE US`
    - H2 white: `"A Name You Can Trust on Every Job."`
    - Body gray: family-owned, Hazleton roots, decades of excellence
    - `[Meet the Team →]` white outline button
  - Right 50%: 4 feature rows, each with red checkmark + bold white title + gray 1-line description:
    1. **Locally Rooted** — Based in Hazleton. We know PA codes, climate, and contractors.
    2. **Transparent Pricing** — Detailed estimates. No surprises, ever.
    3. **On Time, On Budget** — Proven track record, every project.
    4. **Licensed & Fully Insured** — PA contractor license, full liability coverage.
- Annotate: "Left slides in from left on scroll, right rows stagger in from right"

---

### SECTION 6 — TESTIMONIALS
- Background: `#FFFFFF`
- Centered header: red label `CLIENT TESTIMONIALS` + H2 `"What Our Clients Say."`
- Large decorative `"` in `#D42B2B` (120px)
- Single testimonial displayed at a time (carousel):
  > *"Caputo Construction delivered our commercial build on time and under budget. The quality of work exceeded our expectations — we won't use anyone else."*
  > — **Michael R.**, Commercial Property Owner
- Navigation dots below (red active dot, gray inactive)
- Annotate: "Auto-rotates every 5s, pauses on hover, crossfade transition"

---

### SECTION 7 — SERVICE AREA
- Background: `#F5F4F1`
- Red label: `SERVICE AREA`
- H2: `"Proudly Serving Pennsylvania"`
- Body paragraph about Hazleton HQ + statewide reach
- City pill tags in a row: `Hazleton · Scranton · Wilkes-Barre · Allentown · Bethlehem · Reading · Philadelphia`
- Right side or below: subtle Pennsylvania state SVG outline with a red dot on Hazleton

---

### SECTION 8 — CTA BANNER
- Background: `#D42B2B` (full Caputo Red)
- Centered content:
  - H2 white: `"Ready to Build Something Great?"`
  - Subtext white 70%: `"Tell us about your project. We'll get back to you within 24 hours."`
  - `[Start Your Project]` — white button, red text, large (56px tall, 48px horizontal padding)
  - Below button: `or call us at (570) 555-0100` — white, small
- Annotate: "Subtle concrete texture overlay at 4% opacity on red background"

---

### SECTION 9 — FOOTER
- Background: `#0F0F0F`
- 4 columns:
  1. White logo + tagline "Built to Last. Built for You." + social icons (LinkedIn, Facebook, Instagram)
  2. **Services** link list
  3. **Company** links (About, Projects, Careers)
  4. **Contact** — address, phone, email, `[Get a Quote]` red button
- Bottom bar: copyright line + Privacy Policy link
- Divider: 1px `rgba(255,255,255,0.08)`

---

## Remaining Pages — Brief Specs

### /services
- 40vh dark hero: `"What We Build"` H1, breadcrumb nav
- Full 6-service grid (3 columns), each card expanded with photo header, full description, capabilities list, CTA button

### /projects  
- 40vh dark hero: `"Our Work"` H1
- Sticky filter bar: `All | Commercial | Residential | Industrial | Renovation`
- Masonry or uniform 3-col project grid
- Click → project detail page with full-width hero image, stats row (sq ft, duration, value), photo gallery

### /about
- Split layout: company story text (left) + jobsite photo (right)
- H2: `"Built on Family. Built on Trust."`
- Team grid (3 cols): photo + name + title + 1-line bio
- Values section: 3 icons — Integrity, Craftsmanship, Community
- Certifications/affiliations logo row

### /contact
- 60/40 split layout
- Left: embedded Zoho form with fields — Name, Email, Phone, Project Type (dropdown), Location, Description, Budget range, How did you hear about us — red submit button `[Send My Project Details]`
- Right: address (Hazleton PA), phone, email (info@caputoconstructioncompany.com), Google Maps embed, office hours, social links

---

## Animation Notes (annotate on wireframes)

- All sections: scroll-triggered fade-up (opacity 0→1, translateY 32px→0, 600ms)
- Card grids: staggered (0.1s delay between each card)
- Nav: transparent → solid `#0F0F0F` on scroll past hero
- Stats bar: CountUp.js number animation on scroll into view
- Hero text: sequential slide-up on page load
- Project card hover: image scales 108%, red strip overlay at bottom
- Service card hover: lifts 6px, red top border appears, shadow deepens
- Testimonial: crossfade every 5s

---

## Design References

Think: **Turner Construction** (scale + authority) meets **Apple** (whitespace + typography) meets **Stripe** (clean grid + polish). Premium, confident, restrained. Never loud, never cluttered.

The client's wife is reviewing these — make wireframes visually complete and self-explanatory, not skeleton-level. Show real placeholder text, real colors, real image placeholders with Unsplash URLs above.
