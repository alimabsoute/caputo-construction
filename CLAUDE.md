# Caputo Construction Company (construction-site)

## Purpose
Marketing site for Caputo Construction Company, Hazleton PA (wife's family business)

## Stack
- Static HTML / CSS / JavaScript
- Vercel deployment
- GitHub: alimabsoute/caputo-construction

## Dev Commands
```bash
# Local development (no build step required)
cd construction-site
python -m http.server 8000    # Serve locally on http://localhost:8000

# Or use any static server:
npx serve
```

## Deploy
```bash
cd construction-site && vercel --prod --yes
```
**Live URL**: https://caputoconstructioncompany.com (wired + serving, HTTP 200 — verified 2026-06-09)
Public alias: https://construction-site-sandy.vercel.app
⚠️ Per-deployment `*.vercel.app` URLs are behind Vercel Deployment Protection (return 401) — to verify deployed content, curl the domain or the `-sandy` alias, NOT the per-deployment dpl URL.

## Key Folders
| Path | Purpose |
|------|---------|
| `index.html` | Homepage (full homepage live on GitHub Pages) |
| `css/` | Stylesheet |
| `js/` | Client-side scripts |
| `assets/` | Images, logos, etc. |

## Current Status
**Phase**: Content trim + placeholder replacement
**Progress**: Live at caputoconstructioncompany.com (domain wired, HTTP 200). 2026-06-09 — removed the lower marketing sections (Team, Testimonials, Certifications, Service Area) per Ali; kept Contact CTA banner (`#contact`) and footer. Page now flows Hero → Stats → Services → Process → Projects → Breakdown → Why → Gallery → CTA → Footer. (Note: orphaned CSS for `.team`/`.certs`/`.service-area`/`.testimonials` still in `style.css` — harmless unused rules, can be stripped.)

## Known Risks
- **Placeholder content still in place**: phone number ((570) 555-0100), street address (123 Main Street)
- **Zoho contact form**: not wired — CTA currently uses a `mailto:` link, not a form

## Next 3 Tasks
1. Replace placeholder phone number, street address, and hours with real values
2. Wire Zoho contact form API integration (get credentials from wife's Zoho account)
3. (Optional) Strip dead CSS for the removed sections from `style.css`

## Obsidian Reference
`Caputo-Construction.md` in vault
