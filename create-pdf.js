const fs = require('fs');
const markdownpdf = require('markdown-pdf');

// Combine all parts into one markdown file
const parts = [
  'PART1.md',
  'PART2.md',
  'PART3.md',
  'PART4.md'
];

let combined = `# Zarathustra: The Programme

**Written by Iliyan Velinov**

Copyright © 2024 Iliyan Velinov  
All Rights Reserved

---

`;

parts.forEach(part => {
  const content = fs.readFileSync(part, 'utf8');
  combined += content + '\n\n---\n\n';
});

// Write combined markdown
fs.writeFileSync('COMPLETE_SCRIPT.md', combined);

// Convert to PDF
markdownpdf()
  .from('COMPLETE_SCRIPT.md')
  .to('Zarathustra_The_Programme.pdf', () => {
    console.log('✅ PDF created: Zarathustra_The_Programme.pdf');
  });
