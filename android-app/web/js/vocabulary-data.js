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
        // 全局去重：同一文件的并发加载复用同一Promise，且已加载后直接返回
        window.__VOCAB_SCRIPT_PROMISES__ = window.__VOCAB_SCRIPT_PROMISES__ || {};
        window.__VOCAB_SCRIPT_LOADED__ = window.__VOCAB_SCRIPT_LOADED__ || {};
        const key = (filename || '').trim();
        if (!key) return;
        if (window.__VOCAB_SCRIPT_LOADED__[key]) return;
        if (window.__VOCAB_SCRIPT_PROMISES__[key]) return window.__VOCAB_SCRIPT_PROMISES__[key];

        const base = `js/vocabularies/${key}`;
        const normalized = String(base).replace(/[?#].*$/, '');
        const id = `vocab-${key}`;

        // 检查是否已有相同（忽略查询参数）的脚本标签，避免重复注入
        let existing = document.querySelector(`script[data-vocab-id="${id}"]`);
        if (!existing) {
            const scripts = Array.from(document.getElementsByTagName('script'));
            existing = scripts.find(s => {
                const ssrc = s.getAttribute('src');
                if (!ssrc) return false;
                return String(ssrc).replace(/[?#].*$/, '').endsWith(normalized);
            });
        }

        const p = new Promise((resolve, reject) => {
            const done = () => { window.__VOCAB_SCRIPT_LOADED__[key] = true; resolve(); };
            const fail = () => { reject(new Error(`Failed to load ${key}`)); };

            if (existing) {
                if (window.__VOCAB_SCRIPT_LOADED__[key] || (existing.dataset && existing.dataset.loaded === 'true')) {
                    return done();
                }
                existing.addEventListener('load', () => {
                    if (existing && existing.dataset) existing.dataset.loaded = 'true';
                    done();
                }, { once: true });
                existing.addEventListener('error', fail, { once: true });
                return;
            }

            const script = document.createElement('script');
            script.setAttribute('data-vocab-id', id);
            script.setAttribute('data-normalized-src', normalized);
            const cacheBuster = `_v=${Date.now()}`;
            script.src = encodeURI(base) + (base.includes('?') ? '&' : '?') + cacheBuster;
            script.onload = () => {
                if (script && script.dataset) script.dataset.loaded = 'true';
                done();
            };
            script.onerror = fail;
            document.head.appendChild(script);
        });

        window.__VOCAB_SCRIPT_PROMISES__[key] = p;
        return p;
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

    // 如果目标变量已经在全局存在，则直接返回，避免重复加载脚本
    if (targetVariable && window[targetVariable]) {
        VOCABULARY_DATA[vocabName] = window[targetVariable];
        console.log(`Using existing global variable for: ${vocabName}`);
        return VOCABULARY_DATA[vocabName];
    }

    // 备用映射（用于向后兼容）
    const fallbackMappings = {
        'words-basic': { file: 'basic.js', variable: 'BASIC_VOCABULARY' },
        '1.幼儿园--基础词汇': { file: 'kindergarten/kindergarten_1_basic.js', variable: 'VOCAB_1__________' },
        '2.幼儿园--学习词汇': { file: 'kindergarten/kindergarten_2_study.js', variable: 'VOCAB_2__________' },
        '3.幼儿园--自然词汇': { file: 'kindergarten/kindergarten_3_nature.js', variable: 'VOCAB_3__________' },
        '4.交流词汇': { file: 'kindergarten/kindergarten_4_communication.js', variable: 'VOCAB_4_____' },
        '5.日常词汇': { file: 'kindergarten/kindergarten_5_daily.js', variable: 'VOCAB_5_____' },
        '6.幼儿园词汇': { file: 'kindergarten/kindergarten_6_general.js', variable: 'VOCAB_6______' },
        'kindergarten_vocabulary': { file: 'kindergarten/kindergarten_6_general.js', variable: 'VOCAB_6______' },
        'minecraft_basic': { file: 'minecraft/minecraft_basic.js', variable: 'VOCAB_1_MINECRAFT____BASIC' },
        'minecraft_intermediate': { file: 'minecraft/minecraft_intermediate.js', variable: 'VOCAB_2_MINECRAFT____BASIC' },
        'minecraft_advanced': { file: 'minecraft/minecraft_advanced.js', variable: 'VOCAB_3_MINECRAFT____ADVANCED' },
        'common_vocabulary': { file: 'common/common_vocabulary.js', variable: 'VOCAB_1____COMMON' },
        'minecraft_image_links': { file: 'minecraft/minecraft_words_full.js', variable: 'MINECRAFT_3_____' }
    };

    if (!targetFile && fallbackMappings[vocabName]) {
        targetFile = fallbackMappings[vocabName].file;
        targetVariable = fallbackMappings[vocabName].variable;
    }

    // 如果选择“幼儿园全部”，先确保三份子词库均已加载，再访问动态 getter
    if (vocabName === '幼儿园全部') {
        // mappings.js 里给出的是 variable_name: KINDERGARTEN_ALL_NEW（由 getter 计算）
        // 但 getter 依赖以下三个物理文件先注入 window：
        // kindergarten_life_communication_expanded.js, kindergarten_learning_nature.js, kindergarten_general_extended.js
        try {
            if (!window.KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED) {
                await loadVocabularyFile('kindergarten/kindergarten_life_communication_expanded.js');
            }
        } catch (e) { console.warn('load life_communication skipped/failed', e); }
        try {
            if (!window.KINDERGARTEN_LEARNING_NATURE) {
                await loadVocabularyFile('kindergarten/kindergarten_learning_nature.js');
            }
        } catch (e) { console.warn('load learning_nature skipped/failed', e); }
        try {
            if (!window.KINDERGARTEN_GENERAL_EXTENDED) {
                await loadVocabularyFile('kindergarten/kindergarten_general_extended.js');
            }
        } catch (e) { console.warn('load general_extended skipped/failed', e); }
    }

    // 检查是否有对应的词库数据
    if (VOCABULARY_DATA.hasOwnProperty(vocabName) && VOCABULARY_DATA[vocabName]) {
        console.log(`Using cached vocabulary data: ${vocabName}`);
        return VOCABULARY_DATA[vocabName];
    }

    // 尝试从新的词库文件夹加载
    if (targetFile && targetVariable) {
        try {
            // 二次防护：若变量已存在则不再加载对应文件
            if (!window[targetVariable]) {
                await loadVocabularyFile(targetFile);
            }
            if (window[targetVariable]) {
                VOCABULARY_DATA[vocabName] = window[targetVariable];
                console.log(`Successfully loaded vocabulary from file: ${vocabName}`);
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
        "url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "hello",
    "standardized": "hello",
    "chinese": "你好",
    "phonetic": "/h??lo?",
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
