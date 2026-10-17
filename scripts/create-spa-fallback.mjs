import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

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
const testHtml = readFileSync(indexPath, 'utf8').replace(
  '<head>',
  '<head>\n    <meta name="robots" content="noindex, nofollow">'
);
writeFileSync(resolve(testDir, 'index.html'), testHtml);
console.log('Created dist/teste/index.html for the isolated preview.');
