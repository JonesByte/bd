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

const applySeo = (html, { lang, locale, title, desc, image }) =>
  html
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`)
    .replace(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${locale}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${image}">`)
    .replace(/<meta property="og:image:secure_url" content="[^"]*">/, `<meta property="og:image:secure_url" content="${image}">`)
    .replace(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${title}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${desc}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${image}">`)
    .replace(/<meta name="twitter:image:alt" content="[^"]*">/, `<meta name="twitter:image:alt" content="${title}">`)
    .replace(/"description":\s*"[^"]*"/, `"description": "${desc}"`);

const enHtml = applySeo(baseHtml, {
  lang: 'en',
  locale: 'en_US',
  title: 'Byte Downloader | All in One',
  desc: 'One desktop app to download in 8K, upscale to 4K locally with AI, and automate Premiere & After Effects. 35+ tools. One-time payment.',
  image: 'https://jonesbyte.github.io/bd/preview-bd-en-v10.png',
});

const esHtml = applySeo(baseHtml, {
  lang: 'es',
  locale: 'es_ES',
  title: 'Byte Downloader | Todo en Uno',
  desc: 'Una sola app para descargar en 8K, mejorar a 4K con IA local y editar en Premiere y After Effects. 35+ herramientas. Sin suscripciones.',
  image: 'https://jonesbyte.github.io/bd/preview-bd-es-v10.png',
});

const ptPtHtml = applySeo(baseHtml, {
  lang: 'pt-PT',
  locale: 'pt_PT',
  title: 'Byte Downloader | Tudo em Um',
  desc: 'Uma única app para transferir em 8K, melhorar para 4K com IA local e editar no Premiere e After Effects. 35+ ferramentas. Sem mensalidade.',
  image: 'https://jonesbyte.github.io/bd/preview-bd-v10.png',
});

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

for (const staticFile of ['sitemap.xml', 'sitemap-pages.xml', 'sitemap.txt', 'robots.txt', 'llms.txt', 'llms-full.txt']) {
  if (existsSync(resolve(`dist/${staticFile}`))) {
    const bdDir = resolve('dist/bd');
    mkdirSync(bdDir, { recursive: true });
    copyFileSync(resolve(`dist/${staticFile}`), resolve(`dist/bd/${staticFile}`));
    console.log(`Copied ${staticFile} to dist/bd/${staticFile}`);
  }
}
