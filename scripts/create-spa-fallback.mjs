import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const indexPath = resolve('dist/index.html');
const fallbackPath = resolve('dist/404.html');

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run vite build first.');
}

copyFileSync(indexPath, fallbackPath);
console.log('Created dist/404.html for GitHub Pages affiliate routes.');

const staticRoutes = ['mercadopago', 'us', 'en', 'en-us'];
for (const route of staticRoutes) {
  const dir = resolve(`dist/${route}`);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexPath, resolve(`dist/${route}/index.html`));
  copyFileSync(indexPath, resolve(`dist/${route}.html`));

  const bdDir = resolve(`dist/bd/${route}`);
  mkdirSync(bdDir, { recursive: true });
  copyFileSync(indexPath, resolve(`dist/bd/${route}/index.html`));
  copyFileSync(indexPath, resolve(`dist/bd/${route}.html`));

  console.log(`Created static route fallbacks for /${route} and /bd/${route}`);
}