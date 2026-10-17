import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
const OWNER = 'JonesByte';
const REPO = 'bd';
const BRANCH = 'main';

async function ghFetch(endpoint, options = {}) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'node-deploy-script',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub API error (${res.status}) on ${endpoint}: ${errText}`);
  }
  return res.json();
}

async function deploy() {
  console.log('1. Getting latest commit on main...');
  const refData = await ghFetch(`/git/ref/heads/${BRANCH}`);
  const latestCommitSha = refData.object.sha;

  console.log(`Latest commit SHA: ${latestCommitSha}`);
  const commitData = await ghFetch(`/git/commits/${latestCommitSha}`);
  const baseTreeSha = commitData.tree.sha;

  const filesToDeploy = [
    'constants.ts'
  ];

  console.log('2. Creating blobs for files...');
  const treeEntries = [];

  for (const relPath of filesToDeploy) {
    const fullPath = path.resolve('D:/.vscode/bytedownloader', relPath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const blobData = await ghFetch('/git/blobs', {
      method: 'POST',
      body: JSON.stringify({
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64'
      })
    });
    console.log(`Uploaded blob for ${relPath}: ${blobData.sha}`);
    treeEntries.push({
      path: relPath.replace(/\\/g, '/'),
      mode: '100644',
      type: 'blob',
      sha: blobData.sha
    });
  }

  console.log('3. Creating new tree...');
  const newTree = await ghFetch('/git/trees', {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeEntries
    })
  });
  console.log(`New tree SHA: ${newTree.sha}`);

  console.log('4. Creating commit...');
  const commitMsg = 'feat: atualizar link do mercado pago para https://mpago.la/2xwHvjU';
  const newCommit = await ghFetch('/git/commits', {
    method: 'POST',
    body: JSON.stringify({
      message: commitMsg,
      tree: newTree.sha,
      parents: [latestCommitSha]
    })
  });
  console.log(`New commit SHA: ${newCommit.sha}`);

  console.log('5. Updating branch ref...');
  await ghFetch(`/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({
      sha: newCommit.sha,
      force: false
    })
  });

  console.log('Deployment commit pushed successfully to main!');
}

deploy().catch((err) => {
  console.error('Deployment failed:', err);
  process.exit(1);
});
