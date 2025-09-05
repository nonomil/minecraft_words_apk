// 全局配置和常量
const CONFIG = {
    // 词库路径
    VOCAB_PATH: 'js/vocabularies/',
    
    // 默认设置
    DEFAULT_SETTINGS: {
        speechRate: 1.0,
        speechPitch: 1.0,
        speechVolume: 1.0,
        autoPlay: true,
        showImages: true,
        kindergartenMode: true,
        quizCount: '10',
        // 新增：点击策略与时长
        // pressMode: 'shortSelect' | 'shortSpeak'
        pressMode: 'shortSelect',
        // 长按阈值（毫秒）
        longPressMs: 320,
        // 悬停发音延时（毫秒）
        hoverDelayMs: 150
    },
    
    // 幼儿园模式设置
    KINDERGARTEN: {
        WORDS_PER_GROUP: 10,
        STAR_COUNT: 5,
        DIAMOND_REWARD: 1,
        SWORD_REWARD_THRESHOLD: 10
    },
    
    // 动画持续时间
    ANIMATION: {
        STAR_DURATION: 2000,
        ACHIEVEMENT_DURATION: 3000,
        PHRASE_DELAY: 1500,
        ANSWER_DELAY: 2000,
        HOVER_TTS_DELAY: 150
    },
    
    // 本地存储键名
    STORAGE_KEYS: {
        SETTINGS: 'wordGameSettings',
        PROGRESS: 'wordGameProgress',
        KINDERGARTEN_PROGRESS: 'kindergartenProgress',
        // 短语模式：独立的进度与奖励存储键
        PROGRESS_PHRASE: 'wordGameProgress_phrase',
        KINDERGARTEN_PROGRESS_PHRASE: 'kindergartenProgress_phrase',
        LEARN_TYPE: 'learnType',
        // 新增：每个词库 + 学习类型的当前位置索引
        PROGRESS_INDEX_PREFIX: 'wordGameIndex::'
    },
    
    // 可用词库
    VOCABULARIES: {
        'words-basic': { name: '基础词汇', count: 157 },
        '1.幼儿园--基础词汇': { name: '幼儿园基础词汇', count: 157 },
        '2.幼儿园--学习词汇': { name: '幼儿园学习词汇', count: 202 },
        '3.幼儿园--自然词汇': { name: '幼儿园自然词汇', count: 212 },
        '4.交流词汇': { name: '交流词汇', count: 149 },
        '5.日常词汇': { name: '日常词汇', count: 138 },
        '6.幼儿园词汇': { name: '幼儿园综合词汇', count: 157 },
        'kindergarten_vocabulary': { name: '原幼儿园词汇', count: 50 },
        'minecraft_basic': { name: 'Minecraft基础词汇', count: 62 },
        'minecraft_intermediate': { name: 'Minecraft中级词汇', count: 60 },
        'minecraft_advanced': { name: 'Minecraft高级词汇', count: 60 },
        'common_vocabulary': { name: '通用词汇', count: 80 },
        'minecraft_image_links': { name: '完整词库', count: 2000 }
    }
};

// 全局变量
let currentVocabulary = [];
let currentWordIndex = 0;
let currentMode = 'learn';
// 学习类型：'word' | 'word_zh' | 'phrase_en' | 'phrase_zh'
let learnType = (function(){
    try { return localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'; } catch(e) { return 'word'; }
})();
let quizWords = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
studyStartTime = Date.now();

// 幼儿园模式相关变量
let currentGroup = 1;
let groupProgress = 0;
let totalDiamonds = 0;
let totalSwords = 0;
let correctAnswersInGroup = 0;

// 语音合成
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// 图片URL缓存
const imageUrlCache = new Map();