// This script will help update image URLs in the vocabulary file
// It will find all occurrences of the generic Unsplash URL and help replace them one by one

const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = path.join(__dirname, 'js', 'vocabularies', 'stage', 'stage_elementary_lower.js');
const genericUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';

// Read the file content
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Find all occurrences of the generic URL with their context
  const regex = new RegExp(`(\{\s*"word":\s*"([^"]+)".*?"url":\s*"${genericUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*\})`, 'gs');
  const matches = [];
  let match;
  
  while ((match = regex.exec(data)) !== null) {
    matches.push({
      fullMatch: match[1],
      word: match[2],
      index: match.index
    });
  }

  console.log(`Found ${matches.length} occurrences of the generic Unsplash URL.`);
  
  if (matches.length === 0) {
    console.log('No more generic URLs to replace.');
    process.exit(0);
  }

  // Process each match one by one
  processMatch(0);

  function processMatch(index) {
    if (index >= matches.length) {
      console.log('All occurrences processed.');
      process.exit(0);
    }

    const current = matches[index];
    const lines = data.substring(0, current.index).split('\n');
    const lineNumber = lines.length;
    const column = lines[lines.length - 1].length + 1;

    console.log(`\n--- Match ${index + 1} of ${matches.length} ---`);
    console.log(`Word: ${current.word}`);
    console.log(`Location: Line ${lineNumber}, Column ${column}`);
    console.log('Context:');
    console.log('--------');
    
    // Show surrounding context
    const startLine = Math.max(0, lineNumber - 3);
    const endLine = Math.min(lines.length - 1, lineNumber + 3);
    for (let i = startLine; i <= endLine; i++) {
      const prefix = i === lineNumber - 1 ? '--> ' : '    ';
      console.log(`${prefix}${lines[i]}`);
    }
    console.log('--------');

    readline.question('Enter new image URL (or press Enter to skip, "e" to exit): ', (url) => {
      if (url.toLowerCase() === 'e') {
        console.log('Exiting...');
        process.exit(0);
      } else if (url.trim() === '') {
        console.log('Skipping this entry.');
        processMatch(index + 1);
      } else {
        // Replace the URL in the data
        const updatedData = data.substring(0, current.index) + 
                          current.fullMatch.replace(genericUrl, url) + 
                          data.substring(current.index + current.fullMatch.length);
        
        // Write the updated content back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err);
            process.exit(1);
          }
          console.log('Update successful!');
          data = updatedData; // Update the data for the next iteration
          processMatch(index + 1);
        });
      }
    });
  }
});
