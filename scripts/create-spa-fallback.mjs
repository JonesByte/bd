import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
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