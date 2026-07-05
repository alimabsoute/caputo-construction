/* Caputo redesign — PA-appropriate stock asset fetcher.
   Downloads CANDIDATES into redesign/assets/_candidates/<slot>/ for visual curation.
   Keys are read from the forkfox pipeline .env (never copied into this repo).
   Usage: node tools/fetch-assets.mjs [--videos-only|--images-only] */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CAND = path.join(ROOT, 'redesign', 'assets', '_candidates');
const ENV_PATH = 'C:\\Users\\alima\\forkfox\\pipeline\\.env';

function loadEnv(p) {
  const out = {};
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}
const env = loadEnv(ENV_PATH);
const PEXELS = env.PEXELS_API_KEY;
const PIXABAY = env.PIXABAY_API_KEY;
const UNSPLASH = env.UNSPLASH_ACCESS_KEY;
if (!PEXELS || !PIXABAY || !UNSPLASH) {
  console.error('Missing keys:', { pexels: !!PEXELS, pixabay: !!PIXABAY, unsplash: !!UNSPLASH });
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let unsplashBudget = 18; // demo tier is 50/hr; stay well under

// ~20 slots. providerOrder lets PA-specific slots hit Pixabay's literal "pennsylvania" tag pool.
const SLOTS = [
  { slot: 'region-ridge',        q: 'appalachian mountains autumn aerial', providers: ['pexels', 'pixabay'] },
  { slot: 'region-farmland',     q: 'pennsylvania farmland barn',          providers: ['pixabay', 'pexels'] },
  { slot: 'region-bridge',       q: 'covered bridge autumn',               providers: ['pixabay', 'pexels'] },
  { slot: 'region-main-street',  q: 'small town main street brick buildings', providers: ['pexels', 'pixabay', 'unsplash'] },
  { slot: 'region-stone-house',  q: 'stone farmhouse exterior',            providers: ['pexels', 'pixabay', 'unsplash'] },
  { slot: 'build-framing',       q: 'house framing lumber construction site', providers: ['pexels', 'pixabay', 'unsplash'] },
  { slot: 'build-masonry',       q: 'bricklayer brick wall worker',        providers: ['pexels', 'pixabay'] },
  { slot: 'build-roofing',       q: 'roofer roofing shingles house',       providers: ['pexels', 'pixabay'] },
  { slot: 'build-excavator',     q: 'excavator foundation residential construction', providers: ['pexels', 'pixabay'] },
  { slot: 'build-concrete',      q: 'concrete pour construction workers',  providers: ['pexels', 'pixabay'] },
  { slot: 'build-steel',         q: 'steel frame building construction',   providers: ['pexels', 'pixabay'] },
  { slot: 'build-crane',         q: 'construction crane site sunrise',     providers: ['pexels', 'pixabay'] },
  { slot: 'build-carpenter',     q: 'carpenter measuring wood framing',    providers: ['pexels', 'pixabay', 'unsplash'] },
  { slot: 'fin-kitchen',         q: 'modern farmhouse kitchen renovation', providers: ['pexels', 'unsplash'] },
  { slot: 'fin-home-exterior',   q: 'new construction house exterior brick', providers: ['pexels', 'pixabay', 'unsplash'] },
  { slot: 'fin-office',          q: 'brick office building exterior modern', providers: ['pexels', 'unsplash'] },
  { slot: 'fin-interior',        q: 'renovated interior exposed brick loft', providers: ['pexels', 'unsplash'] },
  { slot: 'flavor-blueprints',   q: 'blueprints construction plans desk',  providers: ['pexels', 'pixabay', 'unsplash'] },
  { slot: 'flavor-drafting',     q: 'architect drafting drawing pencil',   providers: ['pexels', 'pixabay'] },
  { slot: 'flavor-workshop',     q: 'carpentry workshop workbench sawdust', providers: ['pexels', 'pixabay'] },
  { slot: 'flavor-lumber',       q: 'lumber stack timber beams',           providers: ['pexels', 'pixabay'] },
  { slot: 'flavor-hardhat',      q: 'construction worker hard hat portrait', providers: ['pexels', 'pixabay'] },
];

const VIDEO_SLOTS = [
  { slot: 'vid-framing',  q: 'house construction framing timelapse' },
  { slot: 'vid-blueprint', q: 'architect blueprint drawing plans' },
  { slot: 'vid-aerial',   q: 'aerial forest hills autumn' },
];

const PER_SLOT = 5;
const manifest = [];
const manifestPath = path.join(CAND, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  try { manifest.push(...JSON.parse(fs.readFileSync(manifestPath, 'utf8'))); } catch {}
}

async function jget(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url.split('?')[0]}`);
  return res.json();
}

async function download(url, dest, headers = {}) {
  if (fs.existsSync(dest)) return false;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return true;
}

async function searchPexels(q, n) {
  const d = await jget(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=${n}&orientation=landscape&size=large`, { Authorization: PEXELS });
  return (d.photos || []).map((p) => ({
    provider: 'pexels', id: String(p.id), url: p.src.large2x || p.src.large,
    photographer: p.photographer, photographerUrl: p.photographer_url, source: p.url,
  }));
}
async function searchPixabay(q, n) {
  const d = await jget(`https://pixabay.com/api/?key=${PIXABAY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=horizontal&per_page=${Math.max(n, 3)}&safesearch=true`);
  return (d.hits || []).map((p) => ({
    provider: 'pixabay', id: String(p.id), url: p.largeImageURL,
    photographer: p.user, photographerUrl: `https://pixabay.com/users/${p.user}-${p.user_id}/`, source: p.pageURL,
  }));
}
async function searchUnsplash(q, n) {
  if (unsplashBudget <= 0) return [];
  unsplashBudget -= 1;
  const d = await jget(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${n}&orientation=landscape`, { Authorization: `Client-ID ${UNSPLASH}` });
  return (d.results || []).map((p) => ({
    provider: 'unsplash', id: p.id, url: `${p.urls.raw}&w=1800&q=80&fm=jpg`,
    photographer: p.user.name, photographerUrl: p.user.links.html, source: p.links.html,
    downloadLocation: p.links.download_location,
  }));
}

async function fetchImages() {
  for (const s of SLOTS) {
    const dir = path.join(CAND, s.slot);
    const existing = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.jpg')).length : 0;
    if (existing >= PER_SLOT) { console.log(`skip ${s.slot} (${existing} cached)`); continue; }
    let got = existing;
    for (const prov of s.providers) {
      if (got >= PER_SLOT) break;
      const need = PER_SLOT - got;
      try {
        const hits = prov === 'pexels' ? await searchPexels(s.q, need + 2)
          : prov === 'pixabay' ? await searchPixabay(s.q, need + 2)
          : await searchUnsplash(s.q, need);
        for (const h of hits) {
          if (got >= PER_SLOT) break;
          const dest = path.join(dir, `${String(got + 1).padStart(2, '0')}-${h.provider}-${h.id}.jpg`);
          if (manifest.some((m) => m.provider === h.provider && m.id === h.id && m.slot === s.slot)) continue;
          try {
            await download(h.url, dest);
            if (h.downloadLocation && unsplashBudget > 0) { // Unsplash API terms
              unsplashBudget -= 1;
              fetch(h.downloadLocation, { headers: { Authorization: `Client-ID ${UNSPLASH}` } }).catch(() => {});
            }
            manifest.push({ slot: s.slot, file: path.relative(CAND, dest).replace(/\\/g, '/'), ...h, query: s.q, type: 'image' });
            got += 1;
            console.log(`  + ${s.slot} ${h.provider}:${h.id}`);
          } catch (e) { console.log(`  ! dl fail ${h.provider}:${h.id} ${e.message}`); }
          await sleep(300);
        }
      } catch (e) { console.log(`  ! ${prov} search fail for ${s.slot}: ${e.message}`); }
      await sleep(300);
    }
    console.log(`${s.slot}: ${got}/${PER_SLOT}`);
  }
}

async function fetchVideos() {
  for (const s of VIDEO_SLOTS) {
    const dir = path.join(CAND, 'video', s.slot);
    if (fs.existsSync(dir) && fs.readdirSync(dir).some((f) => f.endsWith('.mp4'))) { console.log(`skip ${s.slot} (cached)`); continue; }
    try {
      const d = await jget(`https://api.pexels.com/videos/search?query=${encodeURIComponent(s.q)}&per_page=4&orientation=landscape`, { Authorization: PEXELS });
      let saved = 0;
      for (const v of d.videos || []) {
        if (saved >= 2) break;
        // smallest file at 720p-or-under, mp4 only
        const files = (v.video_files || [])
          .filter((f) => f.file_type === 'video/mp4' && f.height && f.height <= 810)
          .sort((a, b) => b.height - a.height);
        const pick = files[0];
        if (!pick) continue;
        const dest = path.join(dir, `${v.id}-${pick.height}p.mp4`);
        try {
          await download(pick.link, dest);
          const mb = fs.statSync(dest).size / 1048576;
          if (mb > 14) { fs.unlinkSync(dest); console.log(`  ! ${v.id} too big (${mb.toFixed(1)}MB), skipped`); continue; }
          manifest.push({ slot: s.slot, file: path.relative(CAND, dest).replace(/\\/g, '/'), provider: 'pexels', id: String(v.id), photographer: v.user?.name, photographerUrl: v.user?.url, source: v.url, query: s.q, type: 'video', height: pick.height, mb: +mb.toFixed(1) });
          saved += 1;
          console.log(`  + ${s.slot} video ${v.id} ${pick.height}p ${mb.toFixed(1)}MB`);
        } catch (e) { console.log(`  ! video dl fail ${v.id}: ${e.message}`); }
        await sleep(400);
      }
    } catch (e) { console.log(`  ! video search fail ${s.slot}: ${e.message}`); }
  }
}

function writeReview() {
  const groups = {};
  for (const m of manifest) (groups[m.slot] ||= []).push(m);
  const rows = Object.entries(groups).map(([slot, items]) => `
  <section><h2>${slot} <small>${items[0].query || ''}</small></h2><div class="grid">
  ${items.map((m) => m.type === 'video'
    ? `<figure><video controls preload="none" src="${m.file}"></video><figcaption>${m.file}<br>${m.provider} · ${m.photographer || ''} · ${m.mb || '?'}MB</figcaption></figure>`
    : `<figure><img loading="lazy" src="${m.file}"><figcaption>${m.file}<br>${m.provider} · ${m.photographer || ''}</figcaption></figure>`).join('\n')}
  </div></section>`).join('\n');
  fs.writeFileSync(path.join(CAND, 'review.html'), `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Caputo asset candidates</title>
<style>body{font:14px/1.4 system-ui;margin:24px;background:#111;color:#eee}h2{margin:32px 0 8px}h2 small{color:#888;font-weight:400}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}figure{margin:0}img,video{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:6px;display:block}figcaption{font-size:11px;color:#aaa;padding:4px 2px}</style>
<h1>Candidates — pick winners (${manifest.length} files)</h1>${rows}`);
}

const mode = process.argv[2] || '';
if (mode !== '--videos-only') await fetchImages();
if (mode !== '--images-only') await fetchVideos();
fs.mkdirSync(CAND, { recursive: true });
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
writeReview();
console.log(`\nDone. ${manifest.length} candidates. Review: http://localhost:4174/redesign/assets/_candidates/review.html`);
