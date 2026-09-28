const fs = require('fs');

async function main() {
  try {
    const res = await fetch('https://mayank-waghmare.framer.website/');
    const html = await res.text();
    fs.writeFileSync('./scratch_ref.html', html, 'utf8');
    console.log('Saved scratch_ref.html, size:', html.length);
    
    // Find all strings in the HTML or JS bundle
    const matches = html.matchAll(/>([^<]{2,})</g);
    const visibleTexts = [];
    for (const m of matches) {
      const t = m[1].trim();
      if (t && !t.startsWith('{') && !t.startsWith('@') && t.length > 2) {
        visibleTexts.push(t);
      }
    }
    console.log('Visible texts:', [...new Set(visibleTexts)].slice(0, 50));
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

main();
