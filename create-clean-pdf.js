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

// Custom CSS to remove borders and clean up styling
const options = {
  cssPath: 'pdf-style.css'
};

// Create clean CSS
const css = `
body {
  font-family: 'Courier New', monospace;
  font-size: 12pt;
  line-height: 1.5;
  margin: 1in 0.5in;
  color: #000;
}

h1, h2, h3 {
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

pre, code {
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 2em 0;
}

* {
  border: none !important;
  box-shadow: none !important;
}
`;

fs.writeFileSync('pdf-style.css', css);

// Convert to PDF
markdownpdf(options)
  .from('COMPLETE_SCRIPT.md')
  .to('Zarathustra_The_Programme.pdf', () => {
    console.log('✅ Clean PDF created: Zarathustra_The_Programme.pdf');
  });
