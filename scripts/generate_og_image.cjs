const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Read the official sygnet image and base64-encode it
const sygnetPath = path.join(__dirname, '..', 'public', 'brand', 'heartz-sygnet.png');
const sygnetBase64 = fs.existsSync(sygnetPath) 
  ? `data:image/png;base64,${fs.readFileSync(sygnetPath).toString('base64')}`
  : '';

// 2. Generate the majestic 1200x630 SVG depicting the current HEARTz Hero & Acoustic Console
const svgContent = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Radial Glows -->
    <radialGradient id="glowTop" cx="600" cy="0" r="650" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#AF0A25" stop-opacity="0.38" />
      <stop offset="60%" stop-color="#2C0515" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowPlum" cx="1080" cy="180" r="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6F0384" stop-opacity="0.28" />
      <stop offset="70%" stop-color="#2C0515" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowWarm" cx="120" cy="500" r="450" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F86934" stop-opacity="0.18" />
      <stop offset="75%" stop-color="#2C0515" stop-opacity="0" />
    </radialGradient>

    <!-- Card Gradients -->
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2E0720" stop-opacity="0.94" />
      <stop offset="100%" stop-color="#1F0414" stop-opacity="0.98" />
    </linearGradient>

    <!-- Wave Gradients -->
    <linearGradient id="waveCrimson" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#AF0A25" />
      <stop offset="50%" stop-color="#F86934" />
      <stop offset="100%" stop-color="#AF0A25" />
    </linearGradient>
    <linearGradient id="wavePeach" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F86934" />
      <stop offset="50%" stop-color="#FCE7E3" />
      <stop offset="100%" stop-color="#E7927F" />
    </linearGradient>
    
    <!-- Scrubber Progress Gradient -->
    <linearGradient id="scrubberFill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#AF0A25" />
      <stop offset="100%" stop-color="#F86934" />
    </linearGradient>
  </defs>

  <!-- Base Burgundy Background -->
  <rect width="1200" height="630" fill="#2C0515" />
  <rect width="1200" height="630" fill="url(#glowTop)" />
  <rect width="1200" height="630" fill="url(#glowPlum)" />
  <rect width="1200" height="630" fill="url(#glowWarm)" />

  <!-- Outer Luxury Border -->
  <rect x="24" y="24" width="1152" height="582" rx="24" stroke="#E7927F" stroke-opacity="0.22" stroke-width="1.5" />

  <!-- ================= HEADER ROW ================= -->
  <!-- Brand Lockup -->
  <g transform="translate(64, 48)">
    <image href="${sygnetBase64}" x="0" y="0" width="44" height="44" />
    <text x="54" y="32" fill="#E7927F" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" letter-spacing="-0.02em">Heartz</text>
  </g>

  <!-- Hero Pill Badge -->
  <g transform="translate(740, 52)">
    <rect width="396" height="38" rx="19" fill="#E7927F" fill-opacity="0.12" stroke="#E7927F" stroke-opacity="0.32" stroke-width="1.2" />
    <circle cx="24" cy="19" r="4.5" fill="#AF0A25" />
    <circle cx="24" cy="19" r="8" fill="#AF0A25" fill-opacity="0.25" />
    <text x="38" y="24" fill="#E7927F" font-family="'Manrope', monospace, sans-serif" font-size="13.5" font-weight="600" letter-spacing="0.02em">Free to use · Your sound, your settings</text>
  </g>

  <!-- ================= HERO HEADLINE & INTRO ================= -->
  <g transform="translate(600, 152)" text-anchor="middle">
    <!-- Headline Line 1 -->
    <text x="0" y="0" fill="#FCE7E3" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="700" letter-spacing="-0.035em">
      Sound that feels like
    </text>
    <!-- Headline Line 2 (Highlighted Peach) -->
    <text x="0" y="58" fill="#E7927F" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="700" letter-spacing="-0.035em">
      frequency, not noise.
    </text>
    <!-- Subhead -->
    <text x="0" y="104" fill="#CBB4BB" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="400" letter-spacing="-0.01em">
      Explore pure frequencies, binaural sound and guided sessions, or retune audio to 432 Hz.
    </text>
  </g>

  <!-- ================= ACOUSTIC CONSOLE PREVIEW CARD ================= -->
  <g transform="translate(130, 285)">
    <!-- Card Container -->
    <rect width="940" height="268" rx="22" fill="url(#cardBg)" stroke="#E7927F" stroke-opacity="0.25" stroke-width="1.5" />
    
    <!-- Top Bar inside Console -->
    <g transform="translate(28, 26)">
      <circle cx="6" cy="6" r="4" fill="#AF0A25" />
      <circle cx="6" cy="6" r="8" fill="#AF0A25" fill-opacity="0.3" />
      <text x="22" y="10" fill="#E7927F" font-family="'JetBrains Mono', monospace, sans-serif" font-size="12" font-weight="600" letter-spacing="0.06em">BINAURAL BROWN NOISE · 48 KHZ AUDIO</text>
      
      <rect x="795" y="-5" width="88" height="24" rx="6" fill="#FFFFFF" fill-opacity="0.08" />
      <text x="839" y="11" fill="#FCE7E3" font-family="'JetBrains Mono', monospace, sans-serif" font-size="12" font-weight="500" text-anchor="middle">00:00 / 00:10</text>
    </g>

    <!-- Preset Pills Row -->
    <g transform="translate(28, 56)">
      <!-- Pill 1 (Active - Binaural Brown) -->
      <rect x="0" y="0" width="205" height="34" rx="17" fill="#AF0A25" fill-opacity="0.35" stroke="#AF0A25" stroke-width="1.5" />
      <circle cx="16" cy="17" r="3.5" fill="#F86934" />
      <text x="28" y="22" fill="#FCE7E3" font-family="'Manrope', sans-serif" font-size="12.5" font-weight="700">Binaural Brown (432 Hz)</text>

      <!-- Pill 2 (Soft Focus) -->
      <rect x="217" y="0" width="175" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="1" />
      <circle cx="233" cy="17" r="3.5" fill="#F7D86C" />
      <text x="245" y="22" fill="#CBB4BB" font-family="'Manrope', sans-serif" font-size="12.5" font-weight="500">Soft Focus (528 Hz)</text>

      <!-- Pill 3 (Ocean Waves) -->
      <rect x="404" y="0" width="185" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="1" />
      <circle cx="420" cy="17" r="3.5" fill="#E7927F" />
      <text x="432" y="22" fill="#CBB4BB" font-family="'Manrope', sans-serif" font-size="12.5" font-weight="500">Ocean Waves (7.83 Hz)</text>

      <!-- Pill 4 (432 Hz Retune) -->
      <rect x="601" y="0" width="150" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="1" />
      <circle cx="617" cy="17" r="3.5" fill="#F86934" />
      <text x="629" y="22" fill="#CBB4BB" font-family="'Manrope', sans-serif" font-size="12.5" font-weight="500">432 Hz Retune</text>

      <!-- Pill 5 (Original 440 Hz) -->
      <rect x="763" y="0" width="120" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="1" />
      <text x="779" y="22" fill="#CBB4BB" font-family="'Manrope', sans-serif" font-size="12.5" font-weight="500">440 Hz Ref</text>
    </g>

    <!-- Oscilloscope Display Box -->
    <g transform="translate(28, 104)">
      <rect width="884" height="78" rx="12" fill="#18030C" stroke="#2C0515" stroke-width="1" />
      <!-- Subtle Grid Guide -->
      <line x1="16" y1="39" x2="868" y2="39" stroke="#E7927F" stroke-opacity="0.15" stroke-width="1" stroke-dasharray="4 4" />
      
      <!-- Dynamic Waveform Paths -->
      <path d="M 16 39 C 90 39, 130 14, 190 39 C 250 64, 290 18, 350 39 C 410 60, 450 12, 510 39 C 570 66, 610 14, 670 39 C 730 64, 770 16, 830 39 C 850 48, 860 39, 868 39" 
            stroke="url(#waveCrimson)" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.65" />
      <path d="M 16 39 C 75 39, 115 22, 175 39 C 235 56, 275 24, 335 39 C 395 54, 435 20, 495 39 C 555 58, 595 22, 655 39 C 715 56, 755 24, 815 39 C 845 46, 858 39, 868 39" 
            stroke="url(#wavePeach)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    </g>

    <!-- Bottom Controls Cluster -->
    <g transform="translate(28, 198)">
      <!-- Main Circular Crimson Play Button -->
      <circle cx="28" cy="28" r="24" fill="#AF0A25" />
      <polygon points="23,19 37,28 23,37" fill="#FFFFFF" />

      <!-- Track Title & Category -->
      <g transform="translate(68, 18)">
        <text x="0" y="10" fill="#E7927F" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" letter-spacing="0.06em">GROUNDING SOUNDSCAPE</text>
        <text x="0" y="28" fill="#FCE7E3" font-family="'Manrope', sans-serif" font-size="17" font-weight="700">Binaural Brown (432 Hz)</text>
      </g>

      <!-- Scrubber Timeline -->
      <g transform="translate(350, 24)">
        <rect x="0" y="0" width="370" height="8" rx="4" fill="#FFFFFF" fill-opacity="0.12" />
        <rect x="0" y="0" width="130" height="8" rx="4" fill="url(#scrubberFill)" />
        <circle cx="130" cy="4" r="7" fill="#E7927F" stroke="#2C0515" stroke-width="2" />
      </g>

      <!-- Volume & Spec -->
      <g transform="translate(755, 30)">
        <text x="0" y="0" fill="#CBB4BB" font-family="'JetBrains Mono', monospace" font-size="12">VOL</text>
        <rect x="36" y="-7" width="55" height="6" rx="3" fill="#FFFFFF" fill-opacity="0.15" />
        <rect x="36" y="-7" width="22" height="6" rx="3" fill="#E7927F" />
        <text x="102" y="0" fill="#E7927F" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600">30%</text>
      </g>
    </g>
  </g>

  <!-- ================= FOOTER TRUST ROW ================= -->
  <g transform="translate(600, 584)" text-anchor="middle">
    <text x="0" y="0" fill="#A88B97" font-family="'JetBrains Mono', monospace, sans-serif" font-size="13" font-weight="500" letter-spacing="0.04em">
      🎧 STEREO HEADPHONES FOR BINAURAL · LOCAL BROWSER AUDIO · 0 CLOUD UPLOADS
    </text>
  </g>
</svg>
`;

async function main() {
  console.log('Generating updated HEARTz hero Open Graph image (1200x630)...');

  // 1. Write the SVG file
  const svgPath = path.join(__dirname, '..', 'public', 'og-image.svg');
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  console.log(`Saved SVG to ${svgPath}`);

  // 2. Render to PNG using sharp
  const pngPath = path.join(__dirname, '..', 'public', 'og-image.png');
  await sharp(Buffer.from(svgContent))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(pngPath);
  console.log(`Rendered PNG to ${pngPath}`);

  // 3. Also copy to dist if dist exists
  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(svgPath, path.join(distDir, 'og-image.svg'));
    fs.copyFileSync(pngPath, path.join(distDir, 'og-image.png'));
    console.log('Copied updated og-image to dist/');
  }

  console.log('OG Image generation complete! ✨');
}

main().catch(err => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
