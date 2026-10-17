import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const indexPath = resolve('dist/index.html');
if (!existsSync(indexPath)) throw new Error('dist/index.html was not found. Run vite build first.');
const version = createHash('sha256')
  .update(readFileSync('components/HeroPreview.tsx'))
  .update(readFileSync('App.tsx'))
  .update(readFileSync('index.html'))
  .update(readFileSync('scripts/capture-social-preview.mjs'))
  .digest('hex').slice(0, 12);
const imageName = `preview-bd-7s-${version}.png`;
const officialUrl = 'https://jonesbyte.github.io/bd/';
const officialImage = `${officialUrl}${imageName}`;
const officialHtml = readFileSync(indexPath, 'utf8')
  .replaceAll(`${officialUrl}preview-bd-current.png`, officialImage);

// All official entry points share the approved page and freshly captured image.
writeFileSync(indexPath, officialHtml);
writeFileSync(resolve('dist/404.html'), officialHtml);
mkdirSync(resolve('dist/mercadopago'), { recursive: true });
writeFileSync(resolve('dist/mercadopago/index.html'), officialHtml);
writeFileSync(resolve('dist/mercadopago.html'), officialHtml);

// Keep the test URL available, with its own canonical URL and sharing metadata.
const testDir = resolve('dist/teste');
const testUrl = `${officialUrl}teste/`;
mkdirSync(testDir, { recursive: true });
const testHtml = officialHtml
  .replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow">')
  .replace(`href="${officialUrl}"`, `href="${testUrl}"`)
  .replaceAll(`content="${officialUrl}"`, `content="${testUrl}"`)
  .replaceAll(officialImage, `${testUrl}${imageName}`);
writeFileSync(resolve(testDir, 'index.html'), testHtml);
writeFileSync(resolve(testDir, 'social-preview.json'), JSON.stringify({ imageName, waitMs: 7000 }));
console.log('Official and test sharing metadata updated:', imageName);
