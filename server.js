// Minimal static file server for local preview without external deps
// Usage: node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const host = '127.0.0.1';
const port = 8080;
const rootDir = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'audio/ogg',
  '.wasm': 'application/wasm',
};

function send(res, code, headers, body) {
  res.writeHead(code, headers);
  if (body) res.end(body); else res.end();
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.join(rootDir, pathname);

  // prevent path traversal
  if (!filePath.startsWith(rootDir)) {
    return send(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      return send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
    }
    if (stat.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      fs.stat(indexFile, (e2, s2) => {
        if (e2 || !s2.isFile()) return send(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
        streamFile(indexFile, res);
      });
    } else {
      streamFile(filePath, res);
    }
  });
});

function streamFile(file, res) {
  const ext = path.extname(file).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(file);
  stream.on('open', () => {
    res.writeHead(200, { 'Content-Type': type });
    stream.pipe(res);
  });
  stream.on('error', () => {
    send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Internal Server Error');
  });
}

server.listen(port, host, () => {
  console.log(`Local server running at http://${host}:${port}/`);
  console.log(`Preview mobile TTS page: http://${host}:${port}/mobile_tts_solution.html`);
});