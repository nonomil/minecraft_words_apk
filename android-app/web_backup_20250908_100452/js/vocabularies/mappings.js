// Vocabulary file mappings
// Auto-generated, do not edit manually

const VOCABULARY_MAPPINGS_LEGACY = {
  "Kindergarten": [
    {
      "original_name": "1.幼儿园--基础词汇",
      "js_file": "kindergarten_1_basic.js",
      "variable_name": "VOCAB_1__________",
      "word_count": 157
    },
    {
      "original_name": "2.幼儿园--学习词汇",
      "js_file": "kindergarten_2_study.js",
      "variable_name": "VOCAB_2__________",
      "word_count": 202
    },
    {
      "original_name": "3.幼儿园--自然词汇",
      "js_file": "kindergarten_3_nature.js",
      "variable_name": "VOCAB_3__________",
      "word_count": 212
    },
    {
      "original_name": "4.交流词汇",
      "js_file": "kindergarten_4_communication.js",
      "variable_name": "VOCAB_4_____",
      "word_count": 149
    },
    {
      "original_name": "5.日常词汇",
      "js_file": "kindergarten_5_daily.js",
      "variable_name": "VOCAB_5_____",
      "word_count": 138
    },
    {
      "original_name": "6.幼儿园词汇",
      "js_file": "kindergarten_6_general.js",
      "variable_name": "VOCAB_6______",
      "word_count": 157
    }
  ],
  "Minecraft_Standard": [
    {
      "original_name": "minecraft_1.blocks_方块",
      "js_file": "minecraft_blocks.js",
      "variable_name": "MINECRAFT_1_BLOCKS___",
      "word_count": 130
    },
    {
      "original_name": "minecraft_2.items_物品",
      "js_file": "minecraft_items.js",
      "variable_name": "MINECRAFT_2_ITEMS___",
      "word_count": 221
    },
    {
      "original_name": "minecraft_2.items_物品2",
      "js_file": "minecraft_items_2.js",
      "variable_name": "MINECRAFT_2_ITEMS___2",
      "word_count": 106
    },
    {
      "original_name": "minecraft_3.entities_实体",
      "js_file": "minecraft_entities.js",
      "variable_name": "MINECRAFT_3_ENTITIES___",
      "word_count": 107
    },
    {
      "original_name": "minecraft_4.environment_环境",
      "js_file": "minecraft_environment.js",
      "variable_name": "MINECRAFT_4_ENVIRONMENT___",
      "word_count": 128
    },
    {
      "original_name": "minecraft_5.biomes_生物群系",
      "js_file": "minecraft_biomes.js",
      "variable_name": "MINECRAFT_5_BIOMES_____",
      "word_count": 69
    },
    {
      "original_name": "minecraft_6.状态效果 (Status Effects)",
      "js_file": "minecraft_status_effects.js",
      "variable_name": "MINECRAFT_6_______STATUS_EFFECTS_",
      "word_count": 84
    },
    {
      "original_name": "minecraft_7.魔咒 (Enchantments)",
      "js_file": "minecraft_enchantments.js",
      "variable_name": "MINECRAFT_7_____ENCHANTMENTS_",
      "word_count": 77
    },
    {
      "original_name": "minecraft_8.进度 (Advancements)",
      "js_file": "minecraft_advancements.js",
      "variable_name": "MINECRAFT_8_____ADVANCEMENTS_",
      "word_count": 110
    }
  ],
  "Minecraft_Simple": [
    {
      "original_name": "1.minecraft_基础_basic",
      "js_file": "minecraft_basic.js",
      "variable_name": "VOCAB_1_MINECRAFT____BASIC",
      "word_count": 63
    },
    {
      "original_name": "1.普通_common",
      "js_file": "common_vocabulary.js",
      "variable_name": "VOCAB_1____COMMON",
      "word_count": 84
    },
    {
      "original_name": "2.minecraft_中级_basic",
      "js_file": "minecraft_intermediate.js",
      "variable_name": "VOCAB_2_MINECRAFT____BASIC",
      "word_count": 60
    },
    {
      "original_name": "3.minecraft_高级_advanced",
      "js_file": "minecraft_advanced.js",
      "variable_name": "VOCAB_3_MINECRAFT____ADVANCED",
      "word_count": 60
    },
    {
      "original_name": "minecraft_3.单词汇总",
      "js_file": "minecraft_words_full.js",
      "variable_name": "MINECRAFT_3_____",
      "word_count": 1174
    }
  ]
};

// Export legacy mapping without overriding active mapping
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOCABULARY_MAPPINGS_LEGACY };
} else if (typeof window !== 'undefined') {
  window.VOCABULARY_MAPPINGS_LEGACY = VOCABULARY_MAPPINGS_LEGACY;
}

// 合并新版幼儿园三个主题为“幼儿园全部”
function computeKindergartenAllNew() {
  const all = [];
  try {
    if (Array.isArray(window.KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED)) all.push(...window.KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED);
    if (Array.isArray(window.KINDERGARTEN_LEARNING_NATURE)) all.push(...window.KINDERGARTEN_LEARNING_NATURE);
    if (Array.isArray(window.KINDERGARTEN_GENERAL_EXTENDED)) all.push(...window.KINDERGARTEN_GENERAL_EXTENDED);
  } catch (_) {}
  return all;
}

// 通过动态 getter 暴露，确保在三份词库任意加载顺序下都能返回最新合并结果
if (typeof window !== 'undefined') {
  try {
    Object.defineProperty(window, 'KINDERGARTEN_ALL_NEW', {
      get: computeKindergartenAllNew,
      configurable: true
    });
  } catch (e) {
    // 回退：若 defineProperty 不可用，则直接给出当前快照
    window.KINDERGARTEN_ALL_NEW = computeKindergartenAllNew();
  }
}

// 仅保留三大新类目与“幼儿园全部”
const VOCABULARY_MAPPINGS = {
  "Kindergarten_New": [
    { "original_name": "生活交流", "js_file": "kindergarten_life_communication_expanded.js", "variable_name": "KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED", "word_count": 45, "description": "基础问候、情感、家庭、动作、身体、食物、衣物、颜色、数字等" },
    { "original_name": "学习自然", "js_file": "kindergarten_learning_nature.js", "variable_name": "KINDERGARTEN_LEARNING_NATURE", "word_count": 65, "description": "学习用品、学校生活、动物、植物、天气、自然环境等" },
    { "original_name": "综合拓展", "js_file": "kindergarten_general_extended.js", "variable_name": "KINDERGARTEN_GENERAL_EXTENDED", "word_count": 85, "description": "地点场所、交通工具、职业、时间概念、玩具游戏、音乐艺术、运动活动等" },
    { "original_name": "幼儿园全部", "js_file": "mappings.js", "variable_name": "KINDERGARTEN_ALL_NEW", "word_count": 195, "description": "包含所有幼儿园词汇的完整合集" }
  ],
  "Kindergarten_Legacy": [],
  "Kindergarten_Packs": []
};

// 暴露到全局（供 vocabulary-data.js 读取）
if (typeof window !== 'undefined') {
  // window.KINDERGARTEN_ALL_NEW 由上面的 getter 暴露，这里不要覆盖
  window.VOCABULARY_MAPPINGS = VOCABULARY_MAPPINGS;
}