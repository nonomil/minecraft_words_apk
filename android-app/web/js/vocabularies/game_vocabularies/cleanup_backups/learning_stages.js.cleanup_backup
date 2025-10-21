// Learning Stages - 学习阶段配置
// 定义不同年龄段的学习目标和推荐词汇
const LEARNING_STAGES = {
  "stage_1": {
    "age_range": "3-4",
    "name": "基础认知阶段",
    "description": "学习基础颜色、数字和简单动物",
    "focus": ["colors", "numbers_1_10", "basic_animals"],
    "recommended_words": [
      "red", "blue", "yellow", "green",
      "one", "two", "three", "four", "five",
      "cat", "dog", "bird", "fish"
    ],
    "daily_target": 3,
    "game_sources": ["PBS Kids", "Toca Boca"],
    "learning_activities": [
      "picture_recognition",
      "color_matching",
      "simple_counting"
    ]
  },
  "stage_2": {
    "age_range": "4-5",
    "name": "扩展词汇阶段",
    "description": "学习食物、家具和简单动作",
    "focus": ["food", "furniture", "basic_actions"],
    "recommended_words": [
      "apple", "banana", "bread", "milk",
      "chair", "table", "bed", "door",
      "run", "jump", "eat", "drink"
    ],
    "daily_target": 5,
    "game_sources": ["Animal Crossing", "Toca Boca"],
    "learning_activities": [
      "drag_match",
      "sound_matching",
      "coloring"
    ]
  },
  "stage_3": {
    "age_range": "5-6",
    "name": "综合应用阶段",
    "description": "学习天气、形状、情绪和复杂概念",
    "focus": ["weather", "shapes", "emotions", "complex_concepts"],
    "recommended_words": [
      "sunny", "rainy", "cloudy", "windy",
      "circle", "square", "triangle", "star",
      "happy", "sad", "angry", "excited",
      "big", "small", "fast", "slow"
    ],
    "daily_target": 7,
    "game_sources": ["Pokemon", "Animal Crossing"],
    "learning_activities": [
      "sentence_building",
      "story_creation",
      "role_playing"
    ]
  }
};

// Game Activities - 游戏活动配置
const GAME_ACTIVITIES = {
  "picture_recognition": {
    "name": "看图识词",
    "description": "显示游戏角色图片，选择对应单词",
    "method": "显示游戏角色图片，选择对应单词",
    "supported_categories": ["animals", "food", "colors", "characters"],
    "age_groups": ["3-4", "4-5", "5-6"],
    "difficulty": "basic"
  },
  "sound_matching": {
    "name": "听音辨词",
    "description": "播放动物叫声或发音，选择对应词汇",
    "method": "播放动物叫声或发音，选择对应词汇",
    "supported_categories": ["animals", "actions", "characters"],
    "age_groups": ["3-4", "4-5", "5-6"],
    "difficulty": "intermediate"
  },
  "drag_match": {
    "name": "拖拽配对",
    "description": "中英文词汇配对游戏",
    "method": "中英文词汇配对游戏",
    "supported_categories": "all",
    "age_groups": ["4-5", "5-6"],
    "difficulty": "intermediate"
  },
  "coloring": {
    "name": "涂色游戏",
    "description": "边涂色边学颜色单词",
    "method": "边涂色边学颜色单词",
    "supported_categories": ["colors", "animals", "characters"],
    "age_groups": ["3-4", "4-5"],
    "difficulty": "basic"
  },
  "color_matching": {
    "name": "颜色配对",
    "description": "将相同颜色的物品进行配对",
    "method": "将相同颜色的物品进行配对",
    "supported_categories": ["colors"],
    "age_groups": ["3-4"],
    "difficulty": "basic"
  },
  "simple_counting": {
    "name": "简单计数",
    "description": "数数游戏，学习数字词汇",
    "method": "数数游戏，学习数字词汇",
    "supported_categories": ["numbers", "animals", "food"],
    "age_groups": ["3-4", "4-5"],
    "difficulty": "basic"
  },
  "sentence_building": {
    "name": "句子构建",
    "description": "用学过的词汇构建简单句子",
    "method": "用学过的词汇构建简单句子",
    "supported_categories": "all",
    "age_groups": ["5-6"],
    "difficulty": "advanced"
  },
  "story_creation": {
    "name": "故事创作",
    "description": "用游戏角色和词汇创作小故事",
    "method": "用游戏角色和词汇创作小故事",
    "supported_categories": ["characters", "animals", "actions"],
    "age_groups": ["5-6"],
    "difficulty": "advanced"
  },
  "role_playing": {
    "name": "角色扮演",
    "description": "扮演游戏角色，使用相关词汇",
    "method": "扮演游戏角色，使用相关词汇",
    "supported_categories": ["characters", "actions", "emotions"],
    "age_groups": ["5-6"],
    "difficulty": "advanced"
  }
};

// Export configuration data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LEARNING_STAGES,
    GAME_ACTIVITIES
  };
} else if (typeof window !== 'undefined') {
  window.LEARNING_STAGES = LEARNING_STAGES;
  window.GAME_ACTIVITIES = GAME_ACTIVITIES;
}
