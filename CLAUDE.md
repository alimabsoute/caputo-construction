# Caputo Construction Company (construction-site)

<!-- push-tier: 2 -->
<!-- 1 = deploy-wired: NEVER push (CLI deploy only). 2 = public: push only after secret scan. 3 = private non-deploy: auto-commit + auto-push OK -->

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
**Phase**: Awaiting redesign pick
**Progress**: Live at caputoconstructioncompany.com (domain wired, HTTP 200). 2026-08-14 — ALL contact info stripped from live site per Ali (Contact CTA banner, phone, email, address, Get In Touch column, all #contact CTAs); founding year set to Est. 1972 (live + all redesign/ versions). Page now flows Hero → Stats → Services → Process → Projects → Breakdown → Why → Gallery → Footer. (Note: orphaned CSS for removed sections + contact styles still in `style.css` — harmless unused rules, can be stripped.)

## Known Risks
- **No contact info policy (2026-08-14, per Ali)**: ALL contact info removed from the site — no phone, email, address, or contact CTAs. Founding year is **Est. 1972** (supersedes earlier 1998/1977 values). Do not re-add contact info without Ali.

## Next 3 Tasks
1. Ali picks a redesign direction at `localhost:4174/redesign/` → promote winner (contact blocks already stripped, Est. 1972 applied) → deploy
2. Replace stock imagery with real Caputo job photos
3. (Optional) Strip dead CSS (removed sections + contact styles) from `style.css`

## Obsidian Reference
`Caputo-Construction.md` in vault
