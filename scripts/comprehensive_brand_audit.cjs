const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('====================================================');
console.log('HEARTz BRAND & TECHNICAL PRODUCTION AUDIT');
console.log('====================================================\n');

const auditResults = {
  assets: {},
  typography: {},
  contrast: {},
  semantics: {},
  audioEngine: {},
  seoAndDomain: {},
  liveServer: {},
  pass: true
};

function fail(category, msg) {
  auditResults[category] = auditResults[category] || {};
  auditResults[category].errors = auditResults[category].errors || [];
  auditResults[category].errors.push(msg);
  auditResults.pass = false;
  console.error(`[FAIL] [${category}] ${msg}`);
}

function pass(category, msg) {
  console.log(`[PASS] [${category}] ${msg}`);
}

// 1. BRAND ASSETS AUDIT
function getPngDimensions(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(24);
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height, ratio: (width / height).toFixed(3) };
}

const requiredAssets = [
  { name: 'heartz-logo-dark.png', minSize: 50000, expectedRatio: '2.620' },
  { name: 'heartz-logo-light.png', minSize: 30000, expectedRatio: '2.406' },
  { name: 'heartz-iphone-mockup.png', minSize: 100000, expectedRatio: '1.852' },
  { name: 'heartz-app-icon.png', minSize: 50000, expectedRatio: '1.000' },
  { name: 'heartz-waveform-pattern.png', minSize: 10000 }
];

for (const a of requiredAssets) {
  const p = path.join(__dirname, '..', 'public', 'brand', a.name);
  if (!fs.existsSync(p)) {
    fail('assets', `Missing brand asset: ${a.name}`);
  } else {
    const stat = fs.statSync(p);
    const dims = getPngDimensions(p);
    if (stat.size < a.minSize) {
      fail('assets', `Asset ${a.name} is suspiciously small: ${stat.size} bytes`);
    } else {
      pass('assets', `${a.name}: ${dims.width}x${dims.height} (${stat.size} bytes, aspect ratio ${dims.ratio})`);
    }
  }
}

// Check logo.png in public root for Schema.org
const logoP = path.join(__dirname, '..', 'public', 'logo.png');
if (fs.existsSync(logoP)) {
  const dims = getPngDimensions(logoP);
  pass('assets', `Schema logo.png exists: ${dims.width}x${dims.height} (ratio ${dims.ratio})`);
} else {
  fail('assets', 'Missing public/logo.png');
}

// 2. DIST MARKUP & TYPOGRAPHY AUDIT
const distIndex = path.join(__dirname, '..', 'dist', 'index.html');
if (!fs.existsSync(distIndex)) {
  fail('semantics', 'dist/index.html does not exist. Run npm run build first.');
} else {
  const html = fs.readFileSync(distIndex, 'utf8');

  // Check Manrope
  if (html.includes('family=Manrope') && html.includes('Manrope:wght@400;500;600;700')) {
    pass('typography', 'Manrope (weights 400, 500, 600, 700) properly preloaded and linked from Google Fonts');
  } else {
    fail('typography', 'Manrope font is not properly linked in index.html');
  }

  // Check that transparent sygnet + styled Heartz text is used in header
  if (html.includes('heartz-sygnet.png') && html.includes('class="brand-text">Heartz</span>')) {
    pass('typography', 'Transparent sygnet (heartz-sygnet.png) and styled Heartz text used cleanly in header');
  } else {
    fail('typography', 'Header does not use heartz-sygnet.png or brand-text Heartz');
  }

  // Check that iPhone mockup is removed from hero
  if (!html.includes('heartz-iphone-mockup.png')) {
    pass('assets', 'Phone mockup successfully removed from hero section');
  } else {
    fail('assets', 'Phone mockup is still present in hero');
  }

  // Check Headings hierarchy
  const headings = [];
  const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let hm;
  while ((hm = hRegex.exec(html)) !== null) {
    headings.push({ tag: hm[1].toLowerCase(), text: hm[2].replace(/<[^>]+>/g, '').trim() });
  }

  const h1s = headings.filter(h => h.tag === 'h1');
  if (h1s.length === 1) {
    pass('semantics', `Exactly 1 h1 present: "${h1s[0].text}"`);
  } else {
    fail('semantics', `Expected 1 h1, found ${h1s.length}`);
  }

  // Check Alternating Sections (.section-light)
  const lightSections = (html.match(/class=["'][^"']*section-light[^"']*["']/g) || []).length;
  if (lightSections >= 3) {
    pass('semantics', `Found ${lightSections} alternating light sections (.section-light) creating brand rhythm`);
  } else {
    fail('semantics', `Expected at least 3 light sections, found ${lightSections}`);
  }

  // Check Schema.org
  const jsonLdMatch = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      const graph = parsed['@graph'] || [];
      const types = graph.map(g => g['@type']);
      if (types.includes('WebApplication') && types.includes('Organization') && types.includes('FAQPage')) {
        pass('seoAndDomain', `JSON-LD Schema contains WebApplication, Organization, FAQPage`);
      } else {
        fail('seoAndDomain', `JSON-LD missing expected types. Found: ${types.join(', ')}`);
      }
    } catch (e) {
      fail('seoAndDomain', `Invalid JSON-LD syntax: ${e.message}`);
    }
  }

  // Check Anti-Slop & Digits rule & Truthful Copy
  const digitChecks = [
    { text: '3 ways to explore sound.', label: 'Digit "3 ways to explore sound."' },
    { text: '0 cloud uploads', label: 'Digit "0 cloud uploads"' },
    { text: '0 file uploads', label: 'Digit "0 file uploads"' },
    { text: 'Free to use', label: 'Presence of "Free to use"' },
    { text: 'Local audio processing', label: 'Presence of "Local audio processing"' },
    { text: '432 Hz', label: 'Presence of "432 Hz"' }
  ];

  for (const dc of digitChecks) {
    if (html.includes(dc.text)) {
      pass('antiSlop', `${dc.label} correctly present in markup`);
    } else {
      fail('antiSlop', `Missing expected text: "${dc.text}"`);
    }
  }

  // Check ElevenLabs-inspired Majestic Product Stage components
  if (html.includes('majestic-stage-card') && html.includes('stage-pillars-nav') && html.includes('spheres-carousel-track')) {
    const stageMatch = html.match(/id="majestic-stage"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i);
    const stageHtml = stageMatch ? stageMatch[0] : html;
    const pillarButtons = (stageHtml.match(/class="[^"]*stage-pillar-btn[^"]*"/g) || []).length;
    const sphereElements = (stageHtml.match(/class="[^"]*resonant-sphere-item[^"]*"/g) || []).length;
    if (pillarButtons === 3 && sphereElements === 3) {
      pass('semantics', 'Majestic Product Stage: exactly 3 products & 3 resonant spheres configured');
    } else {
      fail('semantics', `Expected 3 products/spheres in stage, found pillars=${pillarButtons}, spheres=${sphereElements}`);
    }
  } else {
    fail('semantics', 'Missing majestic-stage-card, stage-pillars-nav, or spheres-carousel-track in markup');
  }

  // Ensure no legacy written number words or obsolete "0 signups" claims remain
  const forbiddenPhrases = [
    'Three simple tools',
    'three seconds',
    'Zero cloud uploads',
    'Zero file uploads',
    'zero loss',
    '0 signups',
    'no signup',
    'No signup',
    'sound healing',
    'Sound healing'
  ];

  for (const fp of forbiddenPhrases) {
    if (!html.includes(fp)) {
      pass('antiSlop', `Verified absence of forbidden phrase: "${fp}"`);
    } else {
      fail('antiSlop', `Found forbidden phrase: "${fp}"`);
    }
  }

  // Check Audio Files in dist
  const audioUrls = ['deep_ground_10s.wav', 'soft_focus_10s.wav', 'quiet_meditation_10s.wav', 'converter_432hz_retuned_preview.wav', 'converter_440hz_original_preview.wav'];
  for (const aud of audioUrls) {
    const audPath = path.join(__dirname, '..', 'dist', 'audio', aud);
    if (fs.existsSync(audPath) && fs.statSync(audPath).size > 100000) {
      pass('audioEngine', `Audio sample ${aud} present (${(fs.statSync(audPath).size / 1024 / 1024).toFixed(2)} MB)`);
    } else {
      fail('audioEngine', `Missing or empty audio sample: ${aud}`);
    }
  }
}

// 3. COLOR CONTRAST RATIO CALCULATION
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}
function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return Number(ratio.toFixed(2));
}

const colorChecks = [
  { name: 'Cream (#FCE7E3) on Burgundy (#2C0515)', fg: '#FCE7E3', bg: '#2C0515', min: 7.0 }, // AAA
  { name: 'Peach (#E7927F) on Burgundy (#2C0515)', fg: '#E7927F', bg: '#2C0515', min: 4.5 }, // AA
  { name: 'Burgundy (#2C0515) on Cream (#FCE7E3)', fg: '#2C0515', bg: '#FCE7E3', min: 7.0 }, // AAA
  { name: 'White (#FFFFFF) on Crimson (#AF0A25)', fg: '#FFFFFF', bg: '#AF0A25', min: 4.5 }   // AA
];

for (const c of colorChecks) {
  const r = contrastRatio(c.fg, c.bg);
  if (r >= c.min) {
    pass('contrast', `${c.name}: ${r}:1 (PASSES WCAG target ${c.min}:1)`);
  } else {
    fail('contrast', `${c.name}: ${r}:1 (FAILS WCAG target ${c.min}:1)`);
  }
}

// 4. LIVE HTTP REQUESTS AUDIT
async function testHttpEndpoints() {
  console.log('\n--- LIVE HTTP TEST ON LOCALHOST:4321 ---');
  const endpoints = [
    { path: '/', expectedStatus: 200, mustInclude: 'Sound that feels like' },
    { path: '/brand/heartz-sygnet.png', expectedStatus: 200, contentType: 'image/png' },
    { path: '/brand/heartz-app-icon.png', expectedStatus: 200, contentType: 'image/png' },
    { path: '/audio/deep_ground_10s.wav', expectedStatus: 200, contentType: 'audio/wav' },
    { path: '/robots.txt', expectedStatus: 200, mustInclude: 'User-agent: Googlebot' },
    { path: '/this-url-definitely-does-not-exist-999', expectedStatus: 404, mustInclude: 'Frequency Not Found' }
  ];

  for (const ep of endpoints) {
    await new Promise(resolve => {
      const req = http.get(`http://localhost:4321${ep.path}`, res => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode !== ep.expectedStatus) {
            fail('liveServer', `${ep.path} returned status ${res.statusCode}, expected ${ep.expectedStatus}`);
          } else {
            if (ep.contentType && !res.headers['content-type']?.includes(ep.contentType)) {
              fail('liveServer', `${ep.path} Content-Type was ${res.headers['content-type']}, expected ${ep.contentType}`);
            } else if (ep.mustInclude && !body.includes(ep.mustInclude)) {
              fail('liveServer', `${ep.path} did not include expected string: "${ep.mustInclude}"`);
            } else {
              pass('liveServer', `${ep.path} -> HTTP ${res.statusCode} OK (Content-Type: ${res.headers['content-type'] || 'OK'})`);
            }
          }
          resolve();
        });
      });
      req.on('error', err => {
        fail('liveServer', `Error requesting ${ep.path}: ${err.message}`);
        resolve();
      });
    });
  }

  console.log('\n====================================================');
  console.log(auditResults.pass ? '>>> FINAL AUDIT STATUS: 100% PASSED <<<' : '>>> FINAL AUDIT STATUS: FAILED <<<');
  console.log('====================================================');
}

testHttpEndpoints();
