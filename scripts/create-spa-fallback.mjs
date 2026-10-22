import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const indexPath = resolve('dist/index.html');
const fallbackPath = resolve('dist/404.html');

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run vite build first.');
}

copyFileSync(indexPath, fallbackPath);
console.log('Created dist/404.html for GitHub Pages affiliate routes.');

const baseHtml = readFileSync(indexPath, 'utf-8');

// Configuração personalizada de Open Graph e Twitter Cards em inglês com cache-buster
const enPreviewImage = 'https://jonesbyte.github.io/bd/preview-bd-en-v1.png?v=20261022-en1';
const enTitle = 'Byte Downloader - Download. Enhance. Convert.';
const enDesc = 'Download videos, save thumbnails, upscale images, transcribe speech and convert media in a simple desktop app for Windows 10/11.';

let enHtml = baseHtml
  .replace(/<html lang="[^"]*">/, '<html lang="en">')
  .replace(/<title>.*?<\/title>/, `<title>${enTitle}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${enDesc}">`)
  .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${enTitle}">`)
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${enDesc}">`)
  .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${enPreviewImage}">`)
  .replace(/<meta property="og:image:secure_url" content="[^"]*">/, `<meta property="og:image:secure_url" content="${enPreviewImage}">`)
  .replace(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${enTitle}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${enTitle}">`)
  .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${enDesc}">`)
  .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${enPreviewImage}">`)
  .replace(/<meta name="twitter:image:alt" content="[^"]*">/, `<meta name="twitter:image:alt" content="${enTitle}">`);

const routes = [
  { name: 'mercadopago', html: baseHtml },
  { name: 'us', html: enHtml.replace(/https:\/\/jonesbyte\.github\.io\/bd\/\?v=[^"']*/g, 'https://jonesbyte.github.io/bd/us') },
  { name: 'en', html: enHtml.replace(/https:\/\/jonesbyte\.github\.io\/bd\/\?v=[^"']*/g, 'https://jonesbyte.github.io/bd/en') },
  { name: 'en-us', html: enHtml.replace(/https:\/\/jonesbyte\.github\.io\/bd\/\?v=[^"']*/g, 'https://jonesbyte.github.io/bd/en-us') },
];

for (const { name, html } of routes) {
  const dir = resolve(`dist/${name}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(`dist/${name}/index.html`), html, 'utf-8');
  writeFileSync(resolve(`dist/${name}.html`), html, 'utf-8');

  const bdDir = resolve(`dist/bd/${name}`);
  mkdirSync(bdDir, { recursive: true });
  writeFileSync(resolve(`dist/bd/${name}/index.html`), html, 'utf-8');
  writeFileSync(resolve(`dist/bd/${name}.html`), html, 'utf-8');

  console.log(`Created static route fallbacks with custom OG tags for /${name} and /bd/${name}`);
}