import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { CdpClient, getFreePort, waitForJson, wait, browserPath } from './capture-social-preview.mjs';

const output = 'dist/teste/render-check';
mkdirSync(output, { recursive: true });
const port = await getFreePort();
const browser = spawn(browserPath, ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars', `--remote-debugging-port=${port}`, '--user-data-dir=/tmp/bd-feedback-check', 'about:blank'], { stdio: 'ignore' });
let client;
try {
  const version = await waitForJson(`http://127.0.0.1:${port}/json/version`);
  client = new CdpClient(version.webSocketDebuggerUrl);
  await client.connect();
  const results = {};
  for (const [name, url] of [['before', 'https://jonesbyte.github.io/bd/teste/'], ['after', 'http://127.0.0.1:4173/bd/']]) {
    const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });
    await client.send('Page.enable', {}, sessionId);
    await client.send('Performance.enable', {}, sessionId);
    await client.send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    await client.send('Page.addScriptToEvaluateOnNewDocument', { source: "localStorage.setItem('byte_downloader_lang', 'pt-BR');" }, sessionId);
    const loaded = client.waitFor('Page.loadEventFired', sessionId, 45000);
    await client.send('Page.navigate', { url }, sessionId);
    await loaded;
    const ready = await client.send('Runtime.evaluate', { expression: `(async () => {
      await document.fonts.ready;
      await new Promise(r => setTimeout(r, 2000));
      const section = document.querySelector('#feedbacks');
      if (!section) throw new Error('Feedback section missing');
      window.lenis?.stop();
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, section.offsetTop);
      await Promise.all([...section.querySelectorAll('img')].map(i => i.decode()));
      await new Promise(r => setTimeout(r, 1500));
      return { heading: section.querySelector('h2').textContent, cards: section.querySelectorAll('blockquote').length, height: section.getBoundingClientRect().height };
    })()`, awaitPromise: true, returnByValue: true }, sessionId);
    if (ready.exceptionDetails) throw new Error(JSON.stringify(ready.exceptionDetails));
    const shot = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false }, sessionId);
    writeFileSync(`${output}/${name}.png`, Buffer.from(shot.data, 'base64'));
    const start = await client.send('Performance.getMetrics', {}, sessionId);
    await client.send('Runtime.evaluate', { expression: `(async () => {
      const top = document.querySelector('#feedbacks').offsetTop;
      for (let i = 0; i < 120; i++) {
        window.scrollTo(0, top + Math.sin(i / 12) * 35);
        await new Promise(requestAnimationFrame);
      }
      window.scrollTo(0, top);
    })()`, awaitPromise: true }, sessionId);
    const end = await client.send('Performance.getMetrics', {}, sessionId);
    const get = (m, key) => m.metrics.find(v => v.name === key)?.value || 0;
    results[name] = { ...ready.result.value };
    for (const key of ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration', 'LayoutCount', 'RecalcStyleCount']) {
      results[name][key] = get(end, key) - get(start, key);
    }
    await client.send('Target.closeTarget', { targetId });
  }
  writeFileSync(`${output}/metrics.json`, JSON.stringify(results, null, 2));
  console.log('Feedback rendering check:', JSON.stringify(results));
} finally {
  try { if (client) await client.send('Browser.close'); } catch {}
  client?.close();
  browser.kill('SIGTERM');
}
