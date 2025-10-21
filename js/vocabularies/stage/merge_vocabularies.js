const fs = require('fs');
const path = require('path');

// Import all vocabulary files
const kindergartenVocab = require('./stage_kindergarten');
const elementaryLowerVocab = require('./stage_elementary_lower');
const elementaryUpperVocab = require('./stage_elementary_upper');

// Function to merge arrays and remove duplicates based on standardized word
function mergeVocabularies(arrays) {
  const mergedMap = new Map();
  
  // Process each vocabulary array
  arrays.forEach(vocabArray => {
    if (!vocabArray || !Array.isArray(vocabArray)) return;
    
    vocabArray.forEach(item => {
      if (!item || !item.standardized) return;
      
      // Use lowercase standardized word as the key to handle case differences
      const key = item.standardized.toLowerCase();
      
      // Only add if not already in the map or if the current item has more complete data
      if (!mergedMap.has(key) || 
          (item.chinese && item.chinese.length > 0 && (!mergedMap.get(key).chinese || mergedMap.get(key).chinese.length === 0)) ||
          (item.phonetic && item.phonetic.length > 0 && (!mergedMap.get(key).phonetic || mergedMap.get(key).phonetic.length === 0))) {
        mergedMap.set(key, item);
      }
    });
  });
  
  // Convert map values back to array
  return Array.from(mergedMap.values());
}

// Merge all vocabularies
const allVocabularies = mergeVocabularies([
  kindergartenVocab,
  elementaryLowerVocab,
  elementaryUpperVocab
]);

// Sort the merged vocabulary alphabetically by the standardized word
allVocabularies.sort((a, b) => {
  return a.standardized.toLowerCase().localeCompare(b.standardized.toLowerCase());
});

// Create the output content
const outputContent = `// Merged Vocabulary - Combined from kindergarten, elementary_lower, and elementary_upper
// Generated on ${new Date().toISOString()}

const MERGED_VOCABULARY = ${JSON.stringify(allVocabularies, null, 2)};

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MERGED_VOCABULARY;
}
`;

// Write to file
const outputPath = path.join(__dirname, 'merged_vocabulary.js');
fs.writeFileSync(outputPath, outputContent, 'utf8');

console.log(`Successfully merged ${allVocabularies.length} vocabulary items into ${outputPath}`);
