// Vocabulary file mappings

(function () {
  // Helper to safely read global arrays by name
  function getGlobalArray(varName) {
    try {
      if (typeof window !== 'undefined' && Array.isArray(window[varName])) return window[varName];
      if (typeof global !== 'undefined' && typeof eval !== 'undefined') {
        try { if (Array.isArray(eval(varName))) return eval(varName); } catch (_) {}
      }
    } catch (_) {}
    return [];
  }

  // Collect source arrays for kindergarten (1~6). Some may be undefined depending on load order.
  const sourceKindergarten = [
    getGlobalArray('VOCAB_1__________'),
    getGlobalArray('VOCAB_2__________'),
    getGlobalArray('VOCAB_3__________'),
    getGlobalArray('VOCAB_4_____'),
    getGlobalArray('VOCAB_5_____'),
    getGlobalArray('VOCAB_6______')
  ];

  // Small set of emoji SVGs as online placeholders (cute style)
  const EMOJI_SVGS = [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60a.svg', // 😊
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg', // 🐶
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg', // 🐱
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg', // 🐰
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43c.svg', // 🐼
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f437.svg', // 🐷
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f338.svg', // 🌸
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f31f.svg'  // 🌟
  ];
  function randomEmojiURL() {
    return EMOJI_SVGS[Math.floor(Math.random() * EMOJI_SVGS.length)];
  }

  // Minimal phonetic corrections for high-frequency words (American pronunciation)
  const PHONETIC_FIX = {
    'hello': '/həˈloʊ/',
    'small': '/smɔːl/',
    'big': '/bɪɡ/',
    'happy': '/ˈhæpi/'
  };

  function normalizePhonetic(item) {
    try {
      const key = (item.standardized || item.word || '').toLowerCase().trim();
      if (PHONETIC_FIX[key]) {
        item.phonetic = PHONETIC_FIX[key];
      }
    } catch (_) {}
    return item;
  }

  // Fix common Unsplash URL issues (duplicate ?w params like ?w=1080?w=400)
  function fixUnsplashURL(url) {
    if (!url || typeof url !== 'string') return url;
    try {
      if (url.includes('images.unsplash.com')) {
        // Collapse multiple question marks into one
        const parts = url.split('?');
        if (parts.length > 2) {
          url = parts[0] + '?' + parts.slice(1).join('&');
        }
        // Replace sequences like w=1080?w=400 -> w=400
        url = url.replace(/([?&])w=1080\?w=(\d+)/g, '$1w=$2');
        url = url.replace(/\?w=1080\?w=(\d+)/g, '?w=$1');
        url = url.replace(/w=1080\?w=(\d+)/g, 'w=$1');
        // If no size specified, add a reasonable default
        if (!/[?&]w=\d+/.test(url)) {
          url += (url.includes('?') ? '&' : '?') + 'w=400&q=80&auto=format&fit=crop';
        }
      }
    } catch (_) {}
    return url;
  }

  function fixImageURLs(imageURLs) {
    const arr = Array.isArray(imageURLs) ? imageURLs : [];
    const fixed = arr.map((entry) => {
      if (!entry || typeof entry !== 'object') return entry;
      const copy = { ...entry };
      copy.url = fixUnsplashURL(copy.url);
      return copy;
    }).filter(Boolean);

    if (fixed.length === 0) {
      fixed.push({ filename: 'emoji.svg', url: randomEmojiURL(), type: 'Fallback' });
    }
    return fixed;
  }

  function normalizeItem(item) {
    if (!item || typeof item !== 'object') return item;
    const standardized = (item.standardized || item.word || '').trim();
    const normalized = {
      ...item,
      standardized: standardized,
      imageURLs: fixImageURLs(item.imageURLs)
    };
    return normalizePhonetic(normalized);
  }

  function mergeAndDedup(arrays) {
    const out = [];
    const seen = new Map(); // key: standardized.toLowerCase()

    arrays.forEach((arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((raw) => {
        const item = normalizeItem(raw);
        const key = (item.standardized || item.word || '').toLowerCase();
        if (!key) return;
        if (!seen.has(key)) {
          seen.set(key, out.length);
          out.push(item);
        }
        // else: keep the first occurrence (simple rule for now)
      });
    });

    return out;
  }

  const KINDERGARTEN_CORE = mergeAndDedup(sourceKindergarten);

  // 新版幼儿园词汇合集（改为动态 getter，按需合并三大词库并去重）
  function computeKindergartenAllNew() {
    try {
      const parts = [];
      const names = [
        'KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED',
        'KINDERGARTEN_LEARNING_NATURE',
        'KINDERGARTEN_GENERAL_EXTENDED'
      ];
      names.forEach((n) => {
        const arr = getGlobalArray(n);
        if (Array.isArray(arr) && arr.length) parts.push(arr);
      });
      return mergeAndDedup(parts);
    } catch (_) { return []; }
  }

  // 三个合并后的幼儿园数据包（满足“3个文件”诉求）
  const K_PACK_1 = mergeAndDedup([
    getGlobalArray('VOCAB_1__________'), // 基础
    getGlobalArray('VOCAB_4_____'),      // 交流
    getGlobalArray('VOCAB_5_____')       // 日常
  ]);

  const K_PACK_2 = mergeAndDedup([
    getGlobalArray('VOCAB_2__________'), // 学习
    getGlobalArray('VOCAB_3__________')  // 自然
  ]);

  const K_PACK_3 = mergeAndDedup([
    getGlobalArray('VOCAB_6______')      // 综合
  ]);

  // 将物理三包（若已加载）纳入数据集导出，供 UI 使用
  const datasetsWithPacks = {
    KINDERGARTEN_CORE,
    // KINDERGARTEN_ALL_NEW 由 getter 提供，这里不直接存值
    K_PACK_1,
    K_PACK_2,
    K_PACK_3,
    // 物理包（可选）
    VOCAB_K_PACK_LIFE: (typeof window !== 'undefined' && Array.isArray(window.VOCAB_K_PACK_LIFE)) ? window.VOCAB_K_PACK_LIFE : undefined,
    VOCAB_K_PACK_LN: (typeof window !== 'undefined' && Array.isArray(window.VOCAB_K_PACK_LN)) ? window.VOCAB_K_PACK_LN : undefined,
    VOCAB_K_PACK_GENERAL: (typeof window !== 'undefined' && Array.isArray(window.VOCAB_K_PACK_GENERAL)) ? window.VOCAB_K_PACK_GENERAL : undefined,
  };
  // 清理 undefined 字段
  Object.keys(datasetsWithPacks).forEach(k => { if (datasetsWithPacks[k] === undefined) delete datasetsWithPacks[k]; });

  const VOCAB_DATASETS = datasetsWithPacks;

  // 新版幼儿园词汇库结构：3个主题文件 + 全部合集
  const VOCABULARY_MAPPINGS = {
    "Kindergarten_New": [
      { "original_name": "生活交流", "js_file": "kindergarten_life_communication_expanded.js", "variable_name": "KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED", "word_count": 45, "description": "基础问候、情感、家庭、动作、身体、食物、衣物、颜色、数字等" },
      { "original_name": "学习自然", "js_file": "kindergarten_learning_nature.js", "variable_name": "KINDERGARTEN_LEARNING_NATURE", "word_count": 65, "description": "学习用品、学校生活、动物、植物、天气、自然环境等" },
      { "original_name": "综合拓展", "js_file": "kindergarten_general_extended.js", "variable_name": "KINDERGARTEN_GENERAL_EXTENDED", "word_count": 85, "description": "地点场所、交通工具、职业、时间概念、玩具游戏、音乐艺术、运动活动等" },
      { "original_name": "幼儿园全部", "js_file": "mappings.js", "variable_name": "KINDERGARTEN_ALL_NEW", "word_count": 195, "description": "包含所有幼儿园词汇的完整合集" }
    ],
    "Kindergarten_Legacy": [],
    "Kindergarten_Packs": [],
    "Minecraft_Standard": [
      { "original_name": "minecraft_1.blocks_方块", "js_file": "minecraft_blocks.js", "variable_name": "MINECRAFT_1_BLOCKS___", "word_count": 130 },
      { "original_name": "minecraft_2.items_物品", "js_file": "minecraft_items.js", "variable_name": "MINECRAFT_2_ITEMS___", "word_count": 221 },
      { "original_name": "minecraft_2.items_物品2", "js_file": "minecraft_items_2.js", "variable_name": "MINECRAFT_2_ITEMS___2", "word_count": 106 },
      { "original_name": "minecraft_3.entities_实体", "js_file": "minecraft_entities.js", "variable_name": "MINECRAFT_3_ENTITIES___", "word_count": 107 },
      { "original_name": "minecraft_4.environment_环境", "js_file": "minecraft_environment.js", "variable_name": "MINECRAFT_4_ENVIRONMENT___", "word_count": 128 },
      { "original_name": "minecraft_5.biomes_生物群系", "js_file": "minecraft_biomes.js", "variable_name": "MINECRAFT_5_BIOMES_____", "word_count": 69 },
      { "original_name": "minecraft_6.状态效果 (Status Effects)", "js_file": "minecraft_status_effects.js", "variable_name": "MINECRAFT_6_______STATUS_EFFECTS_", "word_count": 84 },
      { "original_name": "minecraft_7.魔咒 (Enchantments)", "js_file": "minecraft_enchantments.js", "variable_name": "MINECRAFT_7_____ENCHANTMENTS_", "word_count": 77 },
      { "original_name": "minecraft_8.进度 (Advancements)", "js_file": "minecraft_advancements.js", "variable_name": "MINECRAFT_8_____ADVANCEMENTS_", "word_count": 110 }
    ],
    "Minecraft_Simple": [
      { "original_name": "1.minecraft_基础_basic", "js_file": "minecraft_basic.js", "variable_name": "VOCAB_1_MINECRAFT____BASIC", "word_count": 63 },
      { "original_name": "1.普通_common", "js_file": "common_vocabulary.js", "variable_name": "VOCAB_1____COMMON", "word_count": 84 },
      { "original_name": "2.minecraft_中级_basic", "js_file": "minecraft_intermediate.js", "variable_name": "VOCAB_2_MINECRAFT____BASIC", "word_count": 60 },
      { "original_name": "3.minecraft_高级_advanced", "js_file": "minecraft_advanced.js", "variable_name": "VOCAB_3_MINECRAFT____ADVANCED", "word_count": 60 },
      { "original_name": "minecraft_3.单词汇总", "js_file": "minecraft_words_full.js", "variable_name": "MINECRAFT_3_____", "word_count": 1174 }
    ]
  };

  // UMD-style exports
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      KINDERGARTEN_CORE,
      // 通过 getter 暴露（Node 环境下不强制）
      get KINDERGARTEN_ALL_NEW() { return computeKindergartenAllNew(); },
      K_PACK_1,
      K_PACK_2,
      K_PACK_3,
      VOCAB_DATASETS,
      VOCABULARY_MAPPINGS
    };
  } else if (typeof window !== 'undefined') {
    window.KINDERGARTEN_CORE = KINDERGARTEN_CORE;
    // 通过动态 getter 暴露 KINDERGARTEN_ALL_NEW，确保子词库加载后再合并
    try {
      Object.defineProperty(window, 'KINDERGARTEN_ALL_NEW', {
        get: computeKindergartenAllNew,
        configurable: true
      });
    } catch (_) {
      // 兼容极端环境：直接计算一次
      window.KINDERGARTEN_ALL_NEW = computeKindergartenAllNew();
    }
    window.K_PACK_1 = K_PACK_1;
    window.K_PACK_2 = K_PACK_2;
    window.K_PACK_3 = K_PACK_3;
    window.VOCAB_DATASETS = VOCAB_DATASETS;
    window.VOCABULARY_MAPPINGS = VOCABULARY_MAPPINGS;
  }
})();