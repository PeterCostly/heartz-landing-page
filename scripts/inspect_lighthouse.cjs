const fs = require('fs');

const data = JSON.parse(fs.readFileSync('lighthouse-mobile.json', 'utf8'));
const audits = data.audits;

console.log('=== FAILED OR LOW-SCORE AUDITS (Score < 0.9) ===');
for (const [id, audit] of Object.entries(audits)) {
  if (audit.score !== null && audit.score < 0.9) {
    console.log(`\n[${id}] Score: ${audit.score} - ${audit.title}`);
    if (audit.displayValue) console.log(`  Value: ${audit.displayValue}`);
    if (audit.explanation) console.log(`  Explanation: ${audit.explanation}`);
    if (audit.details && audit.details.items) {
      console.log(`  Items: ${JSON.stringify(audit.details.items).slice(0, 500)}`);
    }
  }
}
