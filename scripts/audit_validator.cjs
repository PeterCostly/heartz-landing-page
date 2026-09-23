const fs = require('fs');
const path = require('path');

const distIndex = path.join(__dirname, '..', 'dist', 'index.html');
const content = fs.readFileSync(distIndex, 'utf8');

const results = {
  jsonLd: null,
  title: null,
  metaDesc: null,
  headings: [],
  internalLinks: [],
  missingTargets: [],
  audioFiles: [],
  missingAudio: []
};

// 1. Title & Meta Description
const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
results.title = titleMatch ? titleMatch[1].trim() : null;

const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i);
results.metaDesc = descMatch ? descMatch[1].trim() : null;

// 2. Headings hierarchy
const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
let match;
while ((match = headingRegex.exec(content)) !== null) {
  results.headings.push({
    tag: match[1].toLowerCase(),
    text: match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')
  });
}

// 3. JSON-LD
const jsonLdMatch = content.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
if (jsonLdMatch) {
  try {
    results.jsonLd = JSON.parse(jsonLdMatch[1]);
  } catch (e) {
    results.jsonLd = { error: e.message };
  }
}

// 4. Internal Links
const hrefRegex = /href=["']#([^"']+)["']/gi;
const allIds = new Set();
const idRegex = /id=["']([^"']+)["']/gi;
while ((match = idRegex.exec(content)) !== null) {
  allIds.add(match[1]);
}

while ((match = hrefRegex.exec(content)) !== null) {
  const targetId = match[1];
  results.internalLinks.push(targetId);
  if (!allIds.has(targetId)) {
    results.missingTargets.push(targetId);
  }
}

// 5. Audio files check
const audioRegex = /\/audio\/[a-zA-Z0-9_\-\.]+\.wav/g;
const audioMatches = new Set(content.match(audioRegex) || []);
for (const audioUrl of audioMatches) {
  const localPath = path.join(__dirname, '..', 'dist', audioUrl);
  const exists = fs.existsSync(localPath);
  const size = exists ? fs.statSync(localPath).size : 0;
  results.audioFiles.push({ url: audioUrl, exists, size });
  if (!exists || size === 0) {
    results.missingAudio.push(audioUrl);
  }
}

console.log(JSON.stringify(results, null, 2));
