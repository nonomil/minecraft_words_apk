#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os

def generate_embedded_vocabulary():
    json_file = 'words-basic.json'
    js_file = 'js/vocabulary-data.js'
    
    if not os.path.exists(json_file):
        print(f"Error: File not found {json_file}")
        return
    
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            vocab_data = json.load(f)
        
        print(f"Loaded {len(vocab_data)} words")
        
        js_content = '''// Embedded vocabulary data for file:// protocol support
// Auto-generated file, do not edit manually

// Load embedded vocabulary data
async function loadEmbeddedVocabulary(vocabName) {
    if (window.location.protocol === 'file:' && vocabName === 'words-basic') {
        console.log('Using embedded vocabulary data for file:// protocol');
        return getWordsBasicData();
    }
    
    const vocabUrl = `${CONFIG.VOCAB_PATH}${vocabName}.json`;
    const response = await fetch(vocabUrl);
    if (!response.ok) {
        throw new Error(`Vocabulary file not found: ${vocabUrl} (status: ${response.status})`);
    }
    return await response.json();
}

// Get basic vocabulary data
function getWordsBasicData() {
    return '''
        
        js_content += json.dumps(vocab_data, ensure_ascii=False, indent=2)
        js_content += ''';\n}\n'''
        
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"Generated {js_file}")
        print(f"File size: {os.path.getsize(js_file) / 1024:.1f} KB")
        
    except Exception as e:
        print(f"Generation failed: {e}")

if __name__ == '__main__':
    generate_embedded_vocabulary()