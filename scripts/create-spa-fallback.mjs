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
const enPreviewImage = 'https://jonesbyte.github.io/bd/preview-bd-en-v4.png?v=20261022-v4';
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

// Configuração em espanhol (es)
const esPreviewImage = 'https://jonesbyte.github.io/bd/preview-bd-v8.png';
const esTitle = 'Byte Downloader - Descarga. Mejora. Convierte.';
const esDesc = 'Descarga vídeos, guarda miniaturas, amplía imágenes con IA, transcribe voz y convierte medios en una app de escritorio para Windows 10/11.';

let esHtml = baseHtml
  .replace(/<html lang="[^"]*">/, '<html lang="es">')
  .replace(/<title>.*?<\/title>/, `<title>${esTitle}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esDesc}">`)
  .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esTitle}">`)
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esDesc}">`)
  .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esPreviewImage}">`)
  .replace(/<meta property="og:image:secure_url" content="[^"]*">/, `<meta property="og:image:secure_url" content="${esPreviewImage}">`)
  .replace(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${esTitle}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esTitle}">`)
  .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esDesc}">`)
  .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${esPreviewImage}">`)
  .replace(/<meta name="twitter:image:alt" content="[^"]*">/, `<meta name="twitter:image:alt" content="${esTitle}">`);

// Configuração em português de Portugal (pt-PT)
const ptPtTitle = 'Byte Downloader - Transfere. Melhora. Converte.';
const ptPtDesc = 'Transfere vídeos, guarda capas, melhora imagens com IA, transcreve voz e converte multimédia numa aplicação para Windows 10/11.';

let ptPtHtml = baseHtml
  .replace(/<html lang="[^"]*">/, '<html lang="pt-PT">')
  .replace(/<title>.*?<\/title>/, `<title>${ptPtTitle}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${ptPtDesc}">`)
  .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${ptPtTitle}">`)
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${ptPtDesc}">`)
  .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esPreviewImage}">`)
  .replace(/<meta property="og:image:secure_url" content="[^"]*">/, `<meta property="og:image:secure_url" content="${esPreviewImage}">`)
  .replace(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${ptPtTitle}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${ptPtTitle}">`)
  .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${ptPtDesc}">`)
  .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${esPreviewImage}">`)
  .replace(/<meta name="twitter:image:alt" content="[^"]*">/, `<meta name="twitter:image:alt" content="${ptPtTitle}">`);

const setRouteUrl = (html, routeName) =>
  html
    .replace(/<link rel="canonical" href="https:\/\/jonesbyte\.github\.io\/bd\/(?:\?[^"']*)?">/, `<link rel="canonical" href="https://jonesbyte.github.io/bd/${routeName}">`)
    .replace(/<meta property="og:url" content="https:\/\/jonesbyte\.github\.io\/bd\/(?:\?[^"']*)?">/, `<meta property="og:url" content="https://jonesbyte.github.io/bd/${routeName}">`)
    .replace(/<meta name="twitter:url" content="https:\/\/jonesbyte\.github\.io\/bd\/(?:\?[^"']*)?">/, `<meta name="twitter:url" content="https://jonesbyte.github.io/bd/${routeName}">`);

const routes = [
  { name: 'mercadopago', html: baseHtml },
  { name: 'us', html: setRouteUrl(enHtml, 'us') },
  { name: 'en', html: setRouteUrl(enHtml, 'en') },
  { name: 'en-us', html: setRouteUrl(enHtml, 'en-us') },
  { name: 'es', html: setRouteUrl(esHtml, 'es') },
  { name: 'pt', html: setRouteUrl(ptPtHtml, 'pt') },
  { name: 'pt-pt', html: setRouteUrl(ptPtHtml, 'pt-pt') },
  { name: 'pt-br', html: setRouteUrl(baseHtml, 'pt-br') },
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

if (existsSync(resolve('dist/sitemap.xml'))) {
  const bdDir = resolve('dist/bd');
  mkdirSync(bdDir, { recursive: true });
  copyFileSync(resolve('dist/sitemap.xml'), resolve('dist/bd/sitemap.xml'));
  console.log('Copied sitemap.xml to dist/bd/sitemap.xml');
}

if (existsSync(resolve('dist/robots.txt'))) {
  const bdDir = resolve('dist/bd');
  mkdirSync(bdDir, { recursive: true });
  copyFileSync(resolve('dist/robots.txt'), resolve('dist/bd/robots.txt'));
  console.log('Copied robots.txt to dist/bd/robots.txt');
}