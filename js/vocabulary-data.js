// Embedded vocabulary data for file:// protocol support
// Auto-generated file, do not edit manually

// 词库数据存储
const VOCABULARY_DATA = {
    'words-basic': null, // 将在下面定义
    '1.幼儿园--基础词汇': null,
    '2.幼儿园--学习词汇': null,
    '3.幼儿园--自然词汇': null,
    '4.交流词汇': null,
    '5.日常词汇': null,
    '6.幼儿园词汇': null
};

// 动态加载词库文件
async function loadVocabularyFile(filename) {
    try {
        const script = document.createElement('script');
        script.src = `js/vocabularies/${filename}`;
        document.head.appendChild(script);
        
        return new Promise((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${filename}`));
        });
    } catch (error) {
        console.error(`Error loading vocabulary file ${filename}:`, error);
        throw error;
    }
}

// Load embedded vocabulary data
async function loadEmbeddedVocabulary(vocabName) {
    console.log(`Loading vocabulary: ${vocabName}`);
    
    // 首先尝试加载映射配置
    if (!window.VOCABULARY_MAPPINGS) {
        try {
            await loadVocabularyFile('mappings.js');
        } catch (error) {
            console.warn('Failed to load vocabulary mappings:', error);
        }
    }
    
    // 动态查找词库文件
    let targetFile = null;
    let targetVariable = null;
    
    if (window.VOCABULARY_MAPPINGS) {
        // 在所有类别中查找匹配的词库
        for (const [category, vocabularies] of Object.entries(window.VOCABULARY_MAPPINGS)) {
            const found = vocabularies.find(vocab => vocab.original_name === vocabName);
            if (found) {
                targetFile = found.js_file;
                targetVariable = found.variable_name;
                break;
            }
        }
    }
    
    // 备用映射（用于向后兼容）
    const fallbackMappings = {
        'words-basic': { file: 'basic.js', variable: 'BASIC_VOCABULARY' },
        '1.幼儿园--基础词汇': { file: '1.幼儿园--基础词汇.js', variable: 'VOCAB_1__________' },
        '2.幼儿园--学习词汇': { file: '2.幼儿园--学习词汇.js', variable: 'VOCAB_2__________' },
        '3.幼儿园--自然词汇': { file: '3.幼儿园--自然词汇.js', variable: 'VOCAB_3__________' },
        '4.交流词汇': { file: '4.交流词汇.js', variable: 'VOCAB_4_____' },
        '5.日常词汇': { file: '5.日常词汇.js', variable: 'VOCAB_5_____' },
        '6.幼儿园词汇': { file: '6.幼儿园词汇.js', variable: 'VOCAB_6______' }
    };
    
    if (!targetFile && fallbackMappings[vocabName]) {
        targetFile = fallbackMappings[vocabName].file;
        targetVariable = fallbackMappings[vocabName].variable;
    }
    
    // 检查是否有对应的词库数据
    if (VOCABULARY_DATA.hasOwnProperty(vocabName) && VOCABULARY_DATA[vocabName]) {
        console.log(`Using cached vocabulary data: ${vocabName}`);
        return VOCABULARY_DATA[vocabName];
    }
    
    // 尝试从新的词库文件夹加载
    if (targetFile && targetVariable) {
        try {
            await loadVocabularyFile(targetFile);
            if (window[targetVariable]) {
                VOCABULARY_DATA[vocabName] = window[targetVariable];
                console.log(`Successfully loaded vocabulary from file: ${vocabName}`);
                return VOCABULARY_DATA[vocabName];
            }
        } catch (error) {
            console.warn(`Failed to load vocabulary file for ${vocabName}:`, error);
        }
    }
    
    // 如果是file://协议且没有找到词库，提供友好的错误信息
    if (window.location.protocol === 'file:') {
        const availableVocabs = [];
        if (window.VOCABULARY_MAPPINGS) {
            for (const [category, vocabularies] of Object.entries(window.VOCABULARY_MAPPINGS)) {
                availableVocabs.push(...vocabularies.map(v => v.original_name));
            }
        }
        availableVocabs.push(...Object.keys(fallbackMappings));
        const uniqueVocabs = [...new Set(availableVocabs)];
        throw new Error(`词库 "${vocabName}" 在离线模式下不可用。可用的词库：${uniqueVocabs.join(', ')}`);
    }
    
    // 对于http://协议，尝试从服务器加载JSON文件
    const vocabUrl = `${CONFIG.VOCAB_PATH}${vocabName}.json`;
    try {
        const response = await fetch(vocabUrl);
        if (!response.ok) {
            throw new Error(`Vocabulary file not found: ${vocabUrl} (status: ${response.status})`);
        }
        const data = await response.json();
        VOCABULARY_DATA[vocabName] = data;
        return data;
    } catch (error) {
        // 如果服务器加载失败，检查是否有内置数据作为备用
        if (VOCABULARY_DATA.hasOwnProperty(vocabName) && VOCABULARY_DATA[vocabName]) {
            console.log(`Fallback to embedded data for: ${vocabName}`);
            return VOCABULARY_DATA[vocabName];
        }
        throw error;
    }
}

// 基础词汇数据
VOCABULARY_DATA['words-basic'] = [
  {
    "word": "smile",
    "standardized": "smile",
    "chinese": "微笑",
    "phonetic": "/smile/",
    "phrase": "Smile happily",
    "phraseTranslation": "开心地微笑",
    "difficulty": "basic",
    "category": "general",
    "imageURLs": [
      {
        "filename": "smile.jpg",
        "url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "hello",
    "standardized": "hello",
    "chinese": "你好",
    "phonetic": "/həˈloʊ/",
    "phrase": "Hello there",
    "phraseTranslation": "你好呀",
    "difficulty": "basic",
    "category": "greeting",
    "imageURLs": [
      {
        "filename": "hello.jpg",
        "url": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "happy",
    "standardized": "happy",
    "chinese": "开心的",
    "phonetic": "/ˈhæpi/",
    "phrase": "Happy child",
    "phraseTranslation": "开心的小朋友",
    "difficulty": "basic",
    "category": "general",
    "imageURLs": [
      {
        "filename": "happy.jpg",
        "url": "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  }
];

// 暂时为其他词库提供空数组，避免加载错误
VOCABULARY_DATA['1.幼儿园--基础词汇'] = [];
VOCABULARY_DATA['2.幼儿园--学习词汇'] = [];
VOCABULARY_DATA['3.幼儿园--自然词汇'] = [];
VOCABULARY_DATA['4.交流词汇'] = [];
VOCABULARY_DATA['5.日常词汇'] = [];
VOCABULARY_DATA['6.幼儿园词汇'] = [];



console.log('Vocabulary data loaded successfully');
