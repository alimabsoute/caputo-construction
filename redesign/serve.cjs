/* Caputo redesign gallery — tiny static server with cleanUrls + Range support.
   Serves the construction-site ROOT so /hero-v5-compat.mp4 and logos resolve.
   Usage: node redesign/serve.cjs [port]   (default 4174 — 4173 is often taken by the moonlight gallery)
   Open:  http://localhost:4174/redesign/ */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.argv[2]) || 4174;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.md': 'text/plain; charset=utf-8',
};

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.includes('..')) return null;
  const full = path.join(ROOT, p);
  const candidates = [];
  if (p.endsWith('/')) candidates.push(path.join(full, 'index.html'));
  else {
    candidates.push(full);
    candidates.push(full + '.html');
    candidates.push(path.join(full, 'index.html'));
  }
  for (const c of candidates) {
    try { if (fs.statSync(c).isFile()) return c; } catch {}
  }
  return null;
}

process.on('uncaughtException', (err) => console.error('[serve] uncaught:', err.message));

http.createServer((req, res) => {
  try {
  const file = resolveFile(req.url === '/' ? '/index.html' : req.url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 — ' + req.url);
  }
  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const size = fs.statSync(file).size;
  const range = req.headers.range;

  if (range) {
    // "bytes=start-end" — video seeking/looping needs 206 partial responses
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    let start = m && m[1] ? parseInt(m[1], 10) : 0;
    let end = m && m[2] ? parseInt(m[2], 10) : size - 1;
    if (isNaN(start) || start >= size) start = 0;
    if (isNaN(end) || end >= size) end = size - 1;
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Cache-Control': 'no-store',
    });
    return fs.createReadStream(file, { start, end }).on('error', () => res.destroy()).pipe(res);
  }

  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': size,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  } catch (e) {
    try { res.writeHead(500); res.end('server error'); } catch {}
  }
}).listen(PORT, () => console.log(`caputo redesign gallery → http://localhost:${PORT}/redesign/`));
