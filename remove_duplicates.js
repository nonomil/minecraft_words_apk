const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'vocabularies', 'stage', 'stage_elementary_lower.js');
const outputPath = path.join(__dirname, 'js', 'vocabularies', 'stage', 'stage_elementary_lower_cleaned.js');

// Read the original file
let content = fs.readFileSync(filePath, 'utf8');

// Extract the array content between the square brackets
const arrayStart = content.indexOf('[');
const arrayEnd = content.lastIndexOf(']');
const arrayContent = content.substring(arrayStart + 1, arrayEnd);

// Split the array into individual items
const items = [];
let currentItem = '';
let braceCount = 0;

for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    
    if (char === '{') {
        braceCount++;
        if (braceCount === 1) {
            currentItem = '';
            continue;
        }
    } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
            items.push(`{${currentItem}}`);
            continue;
        }
    }
    
    if (braceCount > 0) {
        currentItem += char;
    }
}

// Process items to remove duplicates
const seenWords = new Set();
const uniqueItems = [];

for (const item of items) {
    try {
        const jsonItem = JSON.parse(item);
        const word = jsonItem.word;
        
        if (!seenWords.has(word)) {
            seenWords.add(word);
            uniqueItems.push(item);
        }
    } catch (e) {
        console.error('Error parsing item:', e);
        // Keep items that can't be parsed to be safe
        uniqueItems.push(item);
    }
}

// Reconstruct the file content
const newContent = content.substring(0, arrayStart + 1) + 
                  uniqueItems.join(',\n  ') + 
                  content.substring(arrayEnd);

// Write to a new file
fs.writeFileSync(outputPath, newContent, 'utf8');

console.log(`Original items: ${items.length}`);
console.log(`Unique items: ${uniqueItems.length}`);
console.log(`Duplicates removed: ${items.length - uniqueItems.length}`);
console.log(`Cleaned file saved to: ${outputPath}`);
