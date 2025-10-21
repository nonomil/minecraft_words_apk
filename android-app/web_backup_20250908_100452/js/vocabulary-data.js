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
        script.src = encodeURI(`js/vocabularies/${filename}`);
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
        '1.幼儿园--基础词汇': { file: 'kindergarten_1_basic.js', variable: 'VOCAB_1__________' },
        '2.幼儿园--学习词汇': { file: 'kindergarten_2_study.js', variable: 'VOCAB_2__________' },
        '3.幼儿园--自然词汇': { file: 'kindergarten_3_nature.js', variable: 'VOCAB_3__________' },
        '4.交流词汇': { file: 'kindergarten_4_communication.js', variable: 'VOCAB_4_____' },
        '5.日常词汇': { file: 'kindergarten_5_daily.js', variable: 'VOCAB_5_____' },
        '6.幼儿园词汇': { file: 'kindergarten_6_general.js', variable: 'VOCAB_6______' },
        'kindergarten_vocabulary': { file: 'kindergarten_6_general.js', variable: 'VOCAB_6______' },
        'minecraft_basic': { file: 'minecraft_basic.js', variable: 'VOCAB_1_MINECRAFT____BASIC' },
        'minecraft_intermediate': { file: 'minecraft_intermediate.js', variable: 'VOCAB_2_MINECRAFT____BASIC' },
        'minecraft_advanced': { file: 'minecraft_advanced.js', variable: 'VOCAB_3_MINECRAFT____ADVANCED' },
        'common_vocabulary': { file: 'common_vocabulary.js', variable: 'VOCAB_1____COMMON' },
        'minecraft_image_links': { file: 'minecraft_words_full.js', variable: 'MINECRAFT_3_____' }
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
            // 先加载目标文件（通常是 mappings.js）
            await loadVocabularyFile(targetFile);
    
            // 特殊处理：当目标变量是 KINDERGARTEN_ALL_NEW 时，
            // 需确保三份子词库已加载，以便 getter 能返回完整合集
            if (targetVariable === 'KINDERGARTEN_ALL_NEW' && window.VOCABULARY_MAPPINGS) {
                try {
                    const group = (window.VOCABULARY_MAPPINGS['Kindergarten_New'] || []);
                    const deps = group.filter(e => e.original_name !== '幼儿园全部');
                    for (const dep of deps) {
                        if (!Array.isArray(window[dep.variable_name])) {
                            await loadVocabularyFile(dep.js_file);
                        }
                    }
                } catch (e) {
                    console.warn('Failed to preload Kindergarten_New deps for ALL:', e);
                }
            }
    
            if (window[targetVariable]) {
                VOCABULARY_DATA[vocabName] = window[targetVariable];
                console.log(`Successfully loaded vocabulary from file: ${vocabName}`);
                // 成功后直接返回
                // 注意：对于 KINDERGARTEN_ALL_NEW，window[targetVariable] 是一个 getter，读取时会动态合并
                return VOCABULARY_DATA[vocabName];
            }
        } catch (error) {
            console.warn(`Failed to load vocabulary file for ${vocabName}:`, error);
        }
    }
    
    throw new Error(`词库文件未找到: ${vocabName}。请确认 vocabularies 目录下存在对应 JS 文件，或检查 mappings.js / fallbackMappings 配置。`);
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
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2753.svg",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "hello",
    "standardized": "hello",
    "chinese": "你好",
    "phonetic": "/h??lo?/",
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
    "phonetic": "/?h?pi/",
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

console.log('Vocabulary data loaded successfully');
