import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import net from 'node:net';

const ROOT = process.cwd();
const WAIT_MS = Number(process.env.PREVIEW_WAIT_MS ?? 10000);
const WIDTH = Number(process.env.PREVIEW_WIDTH ?? 1200);
const HEIGHT = Number(process.env.PREVIEW_HEIGHT ?? 630);
const URL = process.env.PREVIEW_URL ?? 'http://127.0.0.1:5173/bd/?social-preview=wait10';
const OUTPUT = path.resolve(ROOT, process.env.PREVIEW_OUTPUT ?? 'public/preview-bd-v8.png');

const edgeCandidates = [
  process.env.EDGE_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].filter(Boolean);

const browserPath = edgeCandidates.find((candidate) => existsSync(candidate));
if (!browserPath) {
  throw new Error('Edge/Chrome nao encontrado. Defina EDGE_PATH apontando para o navegador.');
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForProcessExit(child, timeoutMs = 5000) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    child.once('exit', () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : undefined;
      server.close(() => port ? resolve(port) : reject(new Error('Porta livre nao encontrada.')));
    });
    server.on('error', reject);
  });
}

async function waitForJson(url, timeoutMs = 15000) {
  const start = Date.now();
  let lastError;
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await wait(250);
  }
  throw lastError ?? new Error(`Timeout acessando ${url}`);
}

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
      this.ws.addEventListener('message', (event) => this.handleMessage(event));
    });
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }

    if (message.method) {
      const key = `${message.sessionId ?? 'browser'}:${message.method}`;
      const listeners = this.events.get(key) ?? [];
      for (const listener of listeners) listener(message.params ?? {});
    }
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }

  waitFor(method, sessionId, timeoutMs = 20000) {
    const key = `${sessionId ?? 'browser'}:${method}`;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timeout esperando ${method}`)), timeoutMs);
      const listener = (params) => {
        clearTimeout(timer);
        const listeners = (this.events.get(key) ?? []).filter((item) => item !== listener);
        this.events.set(key, listeners);
        resolve(params);
      };
      this.events.set(key, [...(this.events.get(key) ?? []), listener]);
    });
  }

  close() {
    this.ws?.close();
  }
}

async function main() {
  const port = await getFreePort();
  const tempBase = process.env.PREVIEW_TMP_DIR ? path.resolve(ROOT, process.env.PREVIEW_TMP_DIR) : path.resolve(ROOT, '.tmp');
  mkdirSync(tempBase, { recursive: true });
  const userDataDir = path.join(tempBase, 'byte-social-preview-profile');
  const browser = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    'about:blank',
  ], { stdio: 'ignore' });

  let client;
  try {
    const version = await waitForJson(`http://127.0.0.1:${port}/json/version`);
    client = new CdpClient(version.webSocketDebuggerUrl);
    await client.connect();

    const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true });

    await client.send('Page.enable', {}, sessionId);
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    }, sessionId);

    const loaded = client.waitFor('Page.loadEventFired', sessionId, 30000);
    await client.send('Page.navigate', { url: URL }, sessionId);
    await loaded;

    console.log(`Pagina carregada. Esperando ${WAIT_MS / 1000}s antes do print...`);
    await wait(WAIT_MS);

    const screenshot = await client.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    }, sessionId);

    mkdirSync(path.dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, Buffer.from(screenshot.data, 'base64'));
    console.log(`Preview salva em ${OUTPUT}`);
  } finally {
    try {
      if (client) await client.send('Browser.close');
    } catch {
      browser.kill('SIGTERM');
    }
    client?.close();
    await waitForProcessExit(browser, 5000);
    if (browser.exitCode === null && browser.signalCode === null) {
      browser.kill('SIGTERM');
      await waitForProcessExit(browser, 2000);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
