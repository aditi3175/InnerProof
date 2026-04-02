const fs = require('fs');

let content = fs.readFileSync('c:\\Users\\aditi\\InnerProof\\README.md');

// Convert buffer to string, stripping null bytes explicitly
let str = content.toString('utf8').replace(/\x00/g, '');

// Split by any newline permutation
let lines = str.split(/\r\n|\n|\r/);

let cleanedLines = lines.map(line => line.trimEnd());

// Remove the garbage InnerProof line if it exists
cleanedLines = cleanedLines.filter(line => !line.replace(/\s/g, '').includes('#InnerProof'));

// Remove variation selectors that break old markdown parsers
let finalStr = cleanedLines.join('\n').replace(/\uFE0F/g, '');

// Add double spacing before formatting blocks just in case
finalStr = finalStr.replace(/\n```/g, '\n\n```');

fs.writeFileSync('c:\\Users\\aditi\\InnerProof\\README.md', finalStr, { encoding: 'utf8' });
console.log('Done');
