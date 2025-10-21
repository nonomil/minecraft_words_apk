// 全局配置和常量
const CONFIG = {
    // 资源路径
    VOCAB_PATH: 'js/vocabularies/',
    // 兼容：保留之前新增的别名（不强制使用）
    VOCAB_BASE_PATH: 'js/vocabularies/',

    // 默认设置
    DEFAULT_SETTINGS: {
        speechRate: 1.0,
        speechPitch: 1.0,
        speechVolume: 1.0,
        autoPlay: true,
        showImages: true,
        kindergartenMode: true,
        // 新增：拼写默认子模式
        spellingDefaultSubmode: 'spell',
        // 新增：拼写提示模式（none/ends/full），默认完整英文
        spellingHintMode: 'full',
        // 新增：设备与显示设置
        deviceMode: 'phone',
        uiScale: 0.95,
        compactMode: true,
        // 新增：题目来源过滤
        questionSource: 'all',
        // 新增：混合幼儿园词库设置
        mixKindergartenEnabled: false,
        mixKindergartenRatio: 0.3,
        // 测试题目数量
        quizCount: '10'
    },

    // 新增：试用上限（达到该唯一词条数需要激活）
    TRIAL_LIMIT: 20,

    // 兼容：提供原始使用的幼儿园配置对象（供 rewards/animations 等模块引用）
    KINDERGARTEN: {
        WORDS_PER_GROUP: 10,
        STAR_COUNT: 5,
        DIAMOND_REWARD: 1,
        SWORD_REWARD_THRESHOLD: 10
    },

    // 兼容：提供原始使用的动画配置对象
    ANIMATION: {
        STAR_DURATION: 2000,
        ACHIEVEMENT_DURATION: 3000,
        PHRASE_DELAY: 1500,
        ANSWER_DELAY: 2000,
        HOVER_TTS_DELAY: 150
    },

    // 动画时长设置（保留新增，不影响旧引用）
    ANIMATION_DURATION: {
        star: 1000,
        fireworks: 1500
    },

    // 幼儿园模式设置（保留新增，不影响旧引用）
    KINDERGARTEN_SETTINGS: {
        groupSize: 10,
        rewardThreshold: 5
    },

    // 本地存储键名
    STORAGE_KEYS: {
        SETTINGS: 'settings',
        PROGRESS: 'learningProgress',
        PROGRESS_PHRASE: 'learningProgress_phrase',
        KINDERGARTEN_PROGRESS: 'kgProgress',
        KINDERGARTEN_PROGRESS_PHRASE: 'kgProgress_phrase',
        LEARN_TYPE: 'learnType',
        WORD_RESULTS: 'wordResultsMap',
        WORD_RESULTS_PHRASE: 'wordResultsMap_phrase',
        // 新增：激活与试用相关键
        ACTIVATION_INFO: 'activationInfo', // 保存激活状态与激活码信息
        TRIAL_USAGE: 'trialUsage', // 记录试用唯一词条集合
        // 新增：拼写提示模式（供统一读取）
        SPELLING_HINT_MODE: 'SPELLING_HINT_MODE'
    },

    // 新增：激活相关配置
    ACTIVATION: {
        CODES_URL: 'https://raw.githubusercontent.com/nonomil/minecraft_words_apk/main/activation_codes.txt',
        PREFIX: 'MC-',
        DEBUG_PASSWORD: 'MC-TEST-001',
        CONTACT_TEXT: '请联系微信：weixin123 获取激活码'
    },

    // 可用词库列表（示意）
    AVAILABLE_VOCABS: [
        'kindergarten_1_basic',
        'minecraft_blocks'
    ]
};

// 全局状态与变量
let currentVocabulary = [];
let currentWordIndex = 0;
let currentMode = 'learn';
// 去重：仅保留一次 learnType 定义（从本地存储回退默认 'word'）
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