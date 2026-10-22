import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
const OWNER = 'JonesByte';
const REPO = 'bd';
const BRANCH = 'main';
const ROOT = path.resolve('D:/.vscode/bytedownloader');

async function ghFetch(endpoint, options = {}, retries = 3) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'byte-deploy-script',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { ...options, headers });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`GitHub API error (${res.status}) on ${endpoint}: ${errText}`);
      }
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`[Retry ${attempt}/${retries}] Failed ${endpoint}: ${err.message}. Retrying in 2s...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

function getGitBlobSha(buffer) {
  const header = Buffer.from('blob ' + buffer.length + '\0');
  return crypto.createHash('sha1').update(Buffer.concat([header, buffer])).digest('hex');
}

function shouldInclude(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  if (norm.startsWith('node_modules/') || norm.startsWith('.git/') || norm.startsWith('dist/') || norm.startsWith('.tmp/') || norm.startsWith('ui_reference/')) return false;
  if (norm.endsWith('.backup.tsx') || norm.endsWith('.backup.ts')) return false;
  if (norm.endsWith('.py') || norm.endsWith('.pyi') || norm.endsWith('.rnnn') || norm.endsWith('.traineddata')) return false;
  if (norm === 'untitled.tsx' || norm === 'replace.py') return false;
  if (norm === 'scripts/run_ocr_feedbacks.ps1') return false;
  if (norm === 'public/byte-demo.original.mp4') return false;
  return true;
}

function walk(dir, relPrefix = '') {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const rel = relPrefix ? relPrefix + '/' + f : f;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (['node_modules', '.git', 'dist', '.tmp', 'ui_reference'].includes(f)) continue;
      results = results.concat(walk(full, rel));
    } else {
      if (shouldInclude(rel)) results.push(rel);
    }
  }
  return results;
}

async function main() {
  console.log('1. Obtendo último commit e árvore remota...');
  const refData = await ghFetch(`/git/ref/heads/${BRANCH}`);
  const latestCommitSha = refData.object.sha;
  console.log(`Commit atual: ${latestCommitSha}`);

  const commitData = await ghFetch(`/git/commits/${latestCommitSha}`);
  const baseTreeSha = commitData.tree.sha;

  const remoteTreeData = await ghFetch(`/git/trees/${BRANCH}?recursive=1`);
  const remoteBlobs = new Map();
  for (const item of remoteTreeData.tree) {
    if (item.type === 'blob') {
      remoteBlobs.set(item.path, item.sha);
    }
  }

  console.log('2. Mapeando arquivos locais e comparando com remoto...');
  const allLocal = walk(ROOT);
  const toUpload = [];

  for (const rel of allLocal) {
    const full = path.join(ROOT, rel);
    const buf = fs.readFileSync(full);
    const localSha = getGitBlobSha(buf);
    const remoteSha = remoteBlobs.get(rel.replace(/\\/g, '/'));
    if (!remoteSha || localSha !== remoteSha) {
      toUpload.push({ path: rel.replace(/\\/g, '/'), buffer: buf, size: buf.length, sha: localSha });
    }
  }

  console.log(`Total de arquivos no projeto: ${allLocal.length}`);
  console.log(`Arquivos novos ou modificados para upload: ${toUpload.length}`);

  if (toUpload.length === 0) {
    console.log('Nenhum arquivo para atualizar. O repositório já está sincronizado.');
    return;
  }

  console.log('3. Fazendo upload dos novos blobs...');
  const treeEntries = [];

  for (let i = 0; i < toUpload.length; i++) {
    const item = toUpload[i];
    const sizeStr = item.size > 1024 * 1024 
      ? (item.size / (1024 * 1024)).toFixed(2) + ' MB' 
      : (item.size / 1024).toFixed(1) + ' KB';
    console.log(`[${i + 1}/${toUpload.length}] Enviando ${item.path} (${sizeStr})...`);

    const blobData = await ghFetch('/git/blobs', {
      method: 'POST',
      body: JSON.stringify({
        content: item.buffer.toString('base64'),
        encoding: 'base64'
      })
    });

    treeEntries.push({
      path: item.path,
      mode: '100644',
      type: 'blob',
      sha: blobData.sha
    });
  }

  console.log('4. Criando nova árvore (tree)...');
  const newTree = await ghFetch('/git/trees', {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeEntries
    })
  });
  console.log(`Nova árvore criada: ${newTree.sha}`);

  console.log('5. Criando novo commit...');
  const commitMsg = 'feat: adicionar rotas /us e /en para inicialização direta do site em inglês';
  const newCommit = await ghFetch('/git/commits', {
    method: 'POST',
    body: JSON.stringify({
      message: commitMsg,
      tree: newTree.sha,
      parents: [latestCommitSha]
    })
  });
  console.log(`Novo commit criado: ${newCommit.sha}`);

  console.log('6. Atualizando branch main no repositório bd...');
  await ghFetch(`/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({
      sha: newCommit.sha,
      force: false
    })
  });

  console.log('\n Deploy commit enviado com sucesso para a branch main do JonesByte/bd!');
  console.log('O GitHub Actions iniciará o deploy do site automaticamente.');
}

main().catch(err => {
  console.error('\n Erro durante deploy:', err);
  process.exit(1);
});
