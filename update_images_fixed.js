const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = path.join(__dirname, 'js', 'vocabularies', 'stage', 'stage_elementary_lower.js');
const genericUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';

// Read the file content with proper encoding
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
      index: match.index,
      before: data.substring(Math.max(0, match.index - 50), match.index),
      after: data.substring(match.index + match[1].length, Math.min(data.length, match.index + match[1].length + 50))
    });
  }

  console.log(`Found ${matches.length} occurrences of the generic Unsplash URL.`);
  
  if (matches.length === 0) {
    console.log('No more generic URLs to replace.');
    process.exit(0);
  }

  // Process each match one by one
  processMatch(0, data);

  function processMatch(index, currentData) {
    if (index >= matches.length) {
      console.log('All occurrences processed.');
      process.exit(0);
    }

    const current = matches[index];
    const lineNumber = currentData.substring(0, current.index).split('\n').length;
    
    console.log(`\n--- Match ${index + 1} of ${matches.length} ---`);
    console.log(`Word: ${current.word}`);
    console.log(`Location: Line ~${lineNumber}`);
    console.log('Context:');
    console.log('--------');
    console.log('...' + current.before + current.fullMatch + current.after + '...');
    console.log('--------');

    readline.question('Enter new image URL (or press Enter to skip, "e" to exit): ', (url) => {
      if (url.toLowerCase() === 'e') {
        console.log('Exiting...');
        process.exit(0);
      } else if (url.trim() === '') {
        console.log('Skipping this entry.');
        processMatch(index + 1, currentData);
      } else {
        // Replace the URL in the data
        const updatedData = currentData.substring(0, current.index) + 
                          current.fullMatch.replace(genericUrl, url) + 
                          currentData.substring(current.index + current.fullMatch.length);
        
        // Write the updated content back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err);
            process.exit(1);
          }
          console.log('Update successful!');
          // Update the data for the next iteration
          processMatch(index + 1, updatedData);
        });
      }
    });
  }
});
