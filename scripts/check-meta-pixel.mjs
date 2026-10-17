import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('dist/index.html', 'utf8');
const code = html.match(/<!-- Meta Pixel Code -->\s*<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(code, 'Built HTML must include Meta Pixel');
assert.equal((html.match(/fbq\('track', 'PageView'\)/g) || []).length, 1);
assert.ok(html.indexOf('<!-- Meta Pixel noscript -->') > html.indexOf('<body>'));

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

for (const path of ['/bd/', '/bd/mercadopago/']) {
  const result = simulate('jonesbyte.github.io', path);
  assert.equal(result.scripts, 1);
  assert.deepEqual(result.calls.map(args => args[0] + ':' + args[1]), ['init:1584727869484812', 'track:PageView']);
}
for (const [host, path] of [['localhost', '/bd/'], ['127.0.0.1', '/bd/'], ['jonesbyte.github.io', '/bd/teste/']]) {
  assert.equal(simulate(host, path).scripts, 0);
}
assert.ok(!readFileSync('dist/teste/index.html', 'utf8').includes('facebook.com/tr?'));
console.log('Meta Pixel validated: correct ID, one PageView, no purchase events, previews excluded.');
