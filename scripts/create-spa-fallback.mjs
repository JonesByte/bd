import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const indexPath = resolve('dist/index.html');
const fallbackPath = resolve('dist/404.html');
const mercadopagoDir = resolve('dist/mercadopago');
const mercadopagoIndex = resolve('dist/mercadopago/index.html');
const mercadopagoHtml = resolve('dist/mercadopago.html');

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run vite build first.');
}

copyFileSync(indexPath, fallbackPath);
console.log('Created dist/404.html for GitHub Pages affiliate routes.');

mkdirSync(mercadopagoDir, { recursive: true });
copyFileSync(indexPath, mercadopagoIndex);
copyFileSync(indexPath, mercadopagoHtml);
console.log('Created dist/mercadopago/index.html and dist/mercadopago.html for Mercado Pago route.');

// Serve the isolated preview directly, without a Pages 404 or production changes.
const testDir = resolve('dist/teste');
mkdirSync(testDir, { recursive: true });
// A new image filename invalidates image caches without changing the page URL.
const previewVersion = createHash('sha256')
  .update(readFileSync('components/HeroPreview.tsx'))
  .update(readFileSync('App.tsx'))
  .update(readFileSync('index.html'))
  .update(readFileSync('scripts/capture-social-preview.mjs'))
  .digest('hex').slice(0, 12);
const imageName = `preview-bd-7s-${previewVersion}.png`;
const testUrl = 'https://jonesbyte.github.io/bd/teste/';
const imageUrl = `${testUrl}${imageName}`;
const testHtml = readFileSync(indexPath, 'utf8')
  .replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow">')
  .replaceAll('https://jonesbyte.github.io/bd/?v=20260714-preview8', testUrl)
  .replaceAll('https://jonesbyte.github.io/bd/preview-bd-v8.png', imageUrl)
  .replaceAll('Byte Downloader com a nova tela inicial do site', 'Tela inicial atual do Byte Downloader, capturada após 7 segundos');
writeFileSync(resolve(testDir, 'index.html'), testHtml);
writeFileSync(resolve(testDir, 'social-preview.json'), JSON.stringify({ imageName, waitMs: 7000 }));
console.log('Created dist/teste/index.html with versioned social preview:', imageName);
