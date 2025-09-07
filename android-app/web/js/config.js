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
        // 新增：拼写页面默认子模式与提示开关
        spellingDefaultSubmode: 'spell',
        spellingHint: true,
        // 新增：混合幼儿园词库（默认关闭，比例30%）
        mixKindergartenEnabled: false,
        mixKindergartenRatio: 0.3,
        // 新增：设备与显示设置
        deviceMode: 'phone',
        uiScale: 0.95,
        compactMode: true
    },

    // 新增：试用上限（达到该唯一词条数需要激活）
    TRIAL_LIMIT: 20,
    
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
        ANSWER_DELAY: 2000
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
        // 新增：激活与试用相关键
        ACTIVATION_INFO: 'activationInfo',
        TRIAL_USAGE: 'trialUsage'
    },

    // 新增：激活相关配置
    ACTIVATION: {
        CODES_URL: 'https://raw.githubusercontent.com/nonomil/minecraft_words_apk/main/activation_codes.txt',
        PREFIX: 'MC-',
        DEBUG_PASSWORD: 'mc-debug-2025',
        CONTACT_TEXT: '请联系微信：weixin123 获取激活码'
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
// 测试相关状态由拼写模块维护并依赖同名全局变量在首次使用时创建
if (typeof quizWords === 'undefined') window.quizWords = [];
if (typeof currentQuizIndex === 'undefined') window.currentQuizIndex = 0;
if (typeof quizScore === 'undefined') window.quizScore = 0;
if (typeof quizAnswered === 'undefined') window.quizAnswered = false;
window.studyStartTime = Date.now();

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