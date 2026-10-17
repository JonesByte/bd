import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const manifest = JSON.parse(readFileSync('dist/teste/social-preview.json', 'utf8'));
const output = resolve('dist/teste', manifest.imageName);
const url = 'http://127.0.0.1:4173/bd/teste/';
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'inherit' });
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(url)).ok) { ready = true; break; } } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  if (!ready) throw new Error('Preview server did not start');
  const capture = spawn(process.execPath, ['scripts/capture-social-preview.mjs'], {
    stdio: 'inherit',
    env: { ...process.env, PREVIEW_URL: url, PREVIEW_OUTPUT: output, PREVIEW_WAIT_MS: String(manifest.waitMs) },
  });
  const code = await new Promise((resolve, reject) => {
    capture.on('error', reject);
    capture.on('exit', resolve);
  });
  if (code !== 0 || !existsSync(output)) throw new Error('Social preview capture failed');
  const check = spawn(process.execPath, ['scripts/check-feedback-render.mjs'], { stdio: 'inherit', env: process.env });
  const checkCode = await new Promise((resolve, reject) => {
    check.on('error', reject);
    check.on('exit', resolve);
  });
  if (checkCode !== 0) throw new Error('Feedback rendering verification failed');
} finally {
  server.kill('SIGTERM');
}
