// Game Vocabularies Config - 游戏词汇库主配置文件
// 整合所有游戏词汇库和配置信息
const GAME_VOCABULARIES_CONFIG = {
  "version": "1.0.0",
  "description": "幼儿游戏词汇库配置",
  "last_updated": "2025-09-08",
  "cleanup_date": "2025-09-08",
  "cleanup_notes": "移除了不适合幼儿园的词汇，优化了图片资源",
  
  // 词汇库文件映射
  "vocabulary_files": {
    "animal_crossing": {
      "items": "animal_crossing/animal_crossing_items.js",
      "all_items": "animal_crossing/animal_crossing_all_items.js"
    },
    "pokemon": {
      "basic": "pokemon/pokemon_basic.js"
    },
    "toca_boca": {
      "kitchen": "toca_boca/toca_boca_kitchen.js",
      "all_games": "toca_boca/toca_boca_all_games.js"
    },
    "pbs_kids": {
      "colors": "pbs_kids/pbs_kids_colors.js",
      "all_programs": "pbs_kids/pbs_kids_all_programs.js"
    },
    "pvz": {
      // 极简词库，后续补全
      "basic": "pvz/pvz_basic.js"
    },
    "mario": {
      "basic": "mario/mario_basic.js"
    },
    "kirby": {
      "basic": "kirby/kirby_basic.js"
    },
    "lego": {
      "basic": "lego/lego_basic.js"
    },
    "scribblenauts": {
      "basic": "scribblenauts/scribblenauts_basic.js"
    },
    "disney_illusion_island": {
      "basic": "disney_illusion_island/disney_illusion_island_basic.js"
    }
  },
  
  // 词汇库统计
  "vocabulary_stats": {
    "animal_crossing": {
      "items": 30,
      "all_items": 60,
      "total": 90
    },
    "pokemon": {
      "basic": 15,
      "total": 15
    },
    "toca_boca": {
      "kitchen": 29,
      "all_games": 80,
      "total": 109
    },
    "pbs_kids": {
      "colors": 25,
      "all_programs": 60,
      "total": 85
    },
    "pvz": {
      "basic": 100,
      "total": 100
    },
    "mario": {
      "basic": 73,
      "total": 73
    },
    "kirby": {
      "basic": 67,
      "total": 67
    },
    "lego": {
      "basic": 100,
      "total": 100
    },
    "scribblenauts": {
      "basic": 100,
      "total": 100
    },
    "disney_illusion_island": {
      "basic": 30,
      "total": 30
    },
    "total_words": 891
  },
  
  // 游戏源信息
  "game_sources": {
    "Animal Crossing": {
      "name": "动物森友会",
      "description": "温馨的动物村庄生活游戏",
      "age_range": "3-6",
      "features": ["可爱角色", "日常物品", "简单动作"],
      "website": "https://animalcrossing.fandom.com/zh/wiki/"
    },
    "Pokemon": {
      "name": "宝可梦",
      "description": "收集和训练宝可梦的冒险游戏",
      "age_range": "3-6",
      "features": ["可爱宝可梦", "颜色学习", "基础词汇"],
      "website": "https://wiki.52poke.com/"
    },
    "Toca Boca": {
      "name": "Toca Boca",
      "description": "创意教育游戏系列",
      "age_range": "3-8",
      "features": ["无胜负概念", "纯创意玩具", "生活技能"],
      "website": "https://www.tocaboca.com/"
    },
    "PBS Kids": {
      "name": "PBS Kids",
      "description": "美国公共广播公司儿童教育内容",
      "age_range": "2-9",
      "features": ["教育游戏", "颜色学习", "基础认知"],
      "website": "https://pbskids.org/"
    },
    "Super Mario": {
      "name": "超级马里奥",
      "description": "经典平台动作游戏系列",
      "age_range": "3-6",
      "features": ["动作", "道具", "想象力"],
      "website": "https://mario.fandom.com/wiki/"
    },
    "Kirby": {
      "name": "星之卡比",
      "description": "可爱冒险与能力拷贝的动作游戏",
      "age_range": "3-6",
      "features": ["可爱角色", "能力变化", "简单操作"],
      "website": "https://kirby.fandom.com/wiki/"
    },
    "PVZ": {
      "name": "植物大战僵尸",
      "description": "植物与僵尸的策略塔防",
      "age_range": "4-7",
      "features": ["植物", "僵尸", "简易道具"],
      "website": "https://plantsvszombies.fandom.com/wiki/"
    },
    "LEGO": {
      "name": "乐高",
      "description": "积木拼搭与角色扮演，适合幼儿启蒙与创意表达",
      "age_range": "3-7",
      "features": ["动物", "日常物品", "职业角色"],
      "website": "https://www.lego.com/"
    },
    "Scribblenauts": {
      "name": "涂鸦冒险家",
      "description": "通过书写词汇生成物体并解谜的创意游戏",
      "age_range": "5-8",
      "features": ["词汇拓展", "创造力", "拼写练习"],
      "website": "https://scribblenauts.fandom.com/wiki/"
    },
    "Disney Illusion Island": {
      "name": "迪士尼幻影岛",
      "description": "米老鼠与朋友们在莫诺斯岛展开的合作冒险",
      "age_range": "4-8",
      "features": ["合作机制", "角色动画", "友好世界观"],
      "website": "https://disney.fandom.com/wiki/Illusion_Island"
    }
  },
  
  // 推荐学习路径
  "learning_paths": {
    "beginner": {
      "name": "初学者路径",
      "age_range": "3-4",
      "focus": ["colors", "basic_animals", "simple_food"],
      "recommended_games": ["PBS Kids", "Toca Boca"],
      "daily_words": 3
    },
    "intermediate": {
      "name": "中级路径",
      "age_range": "4-5",
      "focus": ["food", "furniture", "actions"],
      "recommended_games": ["Animal Crossing", "Toca Boca"],
      "daily_words": 5
    },
    "advanced": {
      "name": "高级路径",
      "age_range": "5-6",
      "focus": ["characters", "complex_actions", "emotions"],
      "recommended_games": ["Pokemon", "Animal Crossing", "PVZ"],
      "daily_words": 7
    }
  },
  
  // 特色功能
  "special_features": {
    "multilingual_support": true,
    "age_appropriate_content": true,
    "game_integration": true,
    "progressive_learning": true,
    "interactive_activities": true
  }
};

// 词汇库加载器
const GAME_VOCABULARY_LOADER = {
  // 加载指定游戏的所有词汇库
  loadGameVocabularies: function(gameName) {
    const gameConfig = GAME_VOCABULARIES_CONFIG.vocabulary_files[gameName];
    if (!gameConfig) {
      console.error(`Game ${gameName} not found in configuration`);
      return null;
    }
    
    const vocabularies = {};
    for (const [category, filePath] of Object.entries(gameConfig)) {
      try {
        // 这里应该动态加载对应的JavaScript文件
        // 在实际应用中，可以使用模块加载器或动态导入
        console.log(`Loading ${gameName} ${category} from ${filePath}`);
        vocabularies[category] = null; // 占位符，实际应该加载文件内容
      } catch (error) {
        console.error(`Failed to load ${filePath}:`, error);
      }
    }
    
    return vocabularies;
  },
  
  // 获取所有可用的游戏
  getAvailableGames: function() {
    return Object.keys(GAME_VOCABULARIES_CONFIG.vocabulary_files);
  },
  
  // 基于配置构建 UI 友好的菜单数据
  buildMenuModel: function() {
    const files = GAME_VOCABULARIES_CONFIG.vocabulary_files;
    const sources = GAME_VOCABULARIES_CONFIG.game_sources;
    return Object.entries(files).map(([gameKey, categories]) => {
      // 找到英文源名称与中文名
      const sourceEntry = Object.entries(sources).find(([enName]) => enName.toLowerCase().replace(/\s+/g, '_') === gameKey);
      const display = sourceEntry ? sourceEntry[1].name : gameKey;
      const enDisplay = sourceEntry ? sourceEntry[0] : gameKey;
      return {
        key: gameKey,
        name: display,
        enName: enDisplay,
        categories: Object.keys(categories)
      };
    });
  },
  
  // 获取指定年龄段的推荐游戏
  getRecommendedGames: function(age) {
    const games = [];
    for (const [gameName, config] of Object.entries(GAME_VOCABULARIES_CONFIG.game_sources)) {
      if (age >= 3 && age <= 6) { // 简化判断，实际应该更精确
        games.push({
          name: gameName,
          chinese_name: config.name,
          description: config.description,
          age_range: config.age_range
        });
      }
    }
    return games;
  }
};

// Export configuration and loader
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GAME_VOCABULARIES_CONFIG,
    GAME_VOCABULARY_LOADER
  };
} else if (typeof window !== 'undefined') {
  window.GAME_VOCABULARIES_CONFIG = GAME_VOCABULARIES_CONFIG;
  window.GAME_VOCABULARY_LOADER = GAME_VOCABULARY_LOADER;
}
