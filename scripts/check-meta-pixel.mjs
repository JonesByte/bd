import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { transform } from 'esbuild';

const html = readFileSync('dist/index.html', 'utf8');
const code = html.match(/<!-- Meta Pixel Code -->\\s*<script>([\\s\\S]*?)<\\/script>/)?.[1];
assert.ok(code, 'Built HTML must include Meta Pixel');
assert.equal((html.match(/fbq\\('track', 'PageView'\\)/g) || []).length, 1);
assert.ok(!html.includes('<!-- Meta Pixel noscript -->'), 'Static fallback cannot isolate a single URL');

function simulate(hostname, pathname) {
  let scripts = 0;
  const context = {
    location: { hostname, pathname },
    document: {
      createElement: () => ({}),
      getElementsByTagName: () => [{ parentNode: { insertBefore: () => { scripts++; } } }],
    },
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(code, context);
  vm.runInContext(code, context);
  const calls = Array.from(context.fbq?.queue || [], args => Array.from(args));
  return { scripts, calls };
}

const landing = simulate('jonesbyte.github.io', '/bd/');
assert.equal(landing.scripts, 1);
assert.deepEqual(landing.calls.map(args => args[0] + ':' + args[1]), ['init:1584727869484812', 'track:PageView']);
for (const [host, path] of [
  ['localhost', '/bd/'],
  ['127.0.0.1', '/bd/'],
  ['jonesbyte.github.io', '/bd/mercadopago/'],
  ['jonesbyte.github.io', '/bd/teste/'],
  ['jonesbyte.github.io', '/bd/another/'],
  ['jonesbyte.github.io', '/bd/index.html'],
]) {
  assert.equal(simulate(host, path).scripts, 0, `Pixel must be off on ${host}${path}`);
}

const serviceSource = readFileSync('services/metaPixel.ts', 'utf8');
const serviceCode = (await transform(serviceSource, { loader: 'ts', format: 'cjs' })).code;

function checkoutContext(hostname, pathname, initialized = true) {
  const events = [];
  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    window: {
      location: { hostname, pathname },
      __byteMetaPixelInitialized: initialized,
      fbq: (...args) => events.push(args),
    },
  };
  vm.runInNewContext(serviceCode, context);
  return { track: module.exports.trackCheckoutClick, events };
}

const buyer = checkoutContext('jonesbyte.github.io', '/bd/');
assert.equal(buyer.track('hotmart'), true);
assert.equal(buyer.events.length, 1);
assert.deepEqual(buyer.events.map(args => [args[0], args[1], args[2].checkout_provider]), [
  ['trackCustom', 'CheckoutClick', 'hotmart'],
]);
assert.equal(buyer.events.some(args => args[1] === 'Purchase' || args[1] === 'InitiateCheckout'), false);

for (const [host, path] of [
  ['localhost', '/bd/'],
  ['jonesbyte.github.io', '/bd/teste/'],
  ['jonesbyte.github.io', '/bd/mercadopago/'],
]) {
  const blocked = checkoutContext(host, path);
  assert.equal(blocked.track('hotmart'), false);
  assert.equal(blocked.events.length, 0);
}
const notLoaded = checkoutContext('jonesbyte.github.io', '/bd/', false);
assert.equal(notLoaded.track('hotmart'), false);
assert.equal(notLoaded.events.length, 0);

const paymentSource = readFileSync('components/Payment.tsx', 'utf8');
assert.ok(paymentSource.includes("trackCheckoutClick('hotmart')"), 'Checkout link must record click');
assert.ok(paymentSource.includes('onClick={handlePurchaseClick}'), 'Checkout click handler must be connected');

assert.ok(!readFileSync('dist/teste/index.html', 'utf8').includes('facebook.com/tr?'));
console.log('Meta Pixel validated: PageView and checkout click only on /bd/; checkout and purchase remain Hotmart events.');
