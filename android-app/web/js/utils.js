// 工具函数

// 显示通知
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show';
    
    if (type === 'error') {
        notification.style.background = '#dc3545';
    } else {
        notification.style.background = '#28a745';
    }
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 随机排序数组
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 获取随机元素
function getRandomElements(array, count) {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
}

// 转换Minecraft Wiki文件页面链接为直接图片链接
async function convertToDirectImageUrl(filePageUrl, filename) {
    // 如果已经是直接图片链接，直接返回
    if (filePageUrl.includes('/images/') || filePageUrl.includes('format=original')) {
        return filePageUrl;
    }
    
    // 检查缓存
    if (imageUrlCache.has(filePageUrl)) {
        return imageUrlCache.get(filePageUrl);
    }
    
    // 如果是文件页面链接，通过API获取真实图片链接
    if (filePageUrl.includes('/w/File:')) {
        try {
            // 提取文件名
            const fileName = filename || filePageUrl.split('/File:')[1];
            if (fileName) {
                // 使用MediaWiki API获取图片信息
                const apiUrl = `https://minecraft.wiki/api.php?action=query&titles=File:${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                var pages = data && data.query ? data.query.pages : undefined;
                if (pages) {
                    var pageId = Object.keys(pages)[0];
                    var imageInfoArr = pages[pageId] && pages[pageId].imageinfo ? pages[pageId].imageinfo : undefined;
                    var imageUrl = (Array.isArray(imageInfoArr) && imageInfoArr.length > 0) ? imageInfoArr[0].url : undefined;
                    if (imageUrl) {
                        // 缓存结果
                        imageUrlCache.set(filePageUrl, imageUrl);
                        return imageUrl;
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to fetch image URL:', error);
        }
    }
    
    // 如果无法转换，返回原链接
    return filePageUrl;
}

// 新增：将 minecraft.wiki 的 File: 图片页面转换为 zh 中文条目链接
function transformMinecraftWikiLink(rawUrl) {
    try {
        if (!rawUrl) return null;
        const u = new URL(rawUrl);
        const host = u.hostname || '';
        const path = decodeURIComponent(u.pathname || '');
        // 仅处理 minecraft.wiki 站点上的 File: 页面
        if (!host.includes('minecraft.wiki') || !/\/File:/i.test(path)) return rawUrl;
        // 匹配 /w/File:Name.ext 或 /wiki/File:Name.ext
        const m = path.match(/\/w(?:iki)?\/File:([^/]+?)(?:\.(?:png|jpe?g|gif|webp|svg))?$/i);
        if (!m) return rawUrl;
        const baseName = m[1]; // 不含扩展名
        // 规则：取 File 后面的第一个“单词”（按下划线分割取第一个）
        const title = (baseName.split('_')[0] || baseName).trim();
        if (!title) return rawUrl;
        return `https://zh.minecraft.wiki/w/${encodeURIComponent(title)}`;
    } catch (e) {
        return rawUrl;
    }
}

// 使用 UTF-8 对字符串进行 Base64 编码，兼容中文
function toBase64Utf8(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// 创建占位符图片（兼容中文字符）
function createPlaceholderImage(text = '图片无法加载') {
    const svg = `
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="#f0f0f0"/>
            <text x="100" y="100" font-family="Arial" font-size="14" fill="#999" text-anchor="middle" dominant-baseline="middle">${text}</text>
        </svg>
    `;
    return `data:image/svg+xml;base64,${toBase64Utf8(svg)}`;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 格式化时间
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
        return `${hours}小时${minutes % 60}分钟`;
    } else if (minutes > 0) {
        return `${minutes}分钟`;
    } else {
        return `${seconds}秒`;
    }
}

// 获取当前日期字符串
function getCurrentDateString() {
    return new Date().toISOString().slice(0, 10);
}

// 深拷贝对象
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

// 检查是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 获取随机颜色
function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 计算两个日期之间的天数差
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// 验证JSON格式
function validateVocabularyJSON(data) {
    if (!Array.isArray(data)) {
        throw new Error('词库文件格式错误：应该是数组格式');
    }
    
    if (data.length === 0) {
        throw new Error('词库文件为空');
    }
    
    const firstItem = data[0];
    if (!firstItem.word || !firstItem.chinese) {
        throw new Error('词库文件格式错误：缺少必要字段 word 或 chinese');
    }
    
    return true;
}

// 生成唯一ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 新增：获取当前学习类型（与全局逻辑保持一致）
function getCurrentLearnType() {
  try {
    return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
  } catch (e) {
    return 'word';
  }
}

// 新增：根据学习类型获取结果存储键
function getResultsStorageKeyByType(lt) {
  const isWord = (lt === 'word' || lt === 'word_zh');
  return isWord ? CONFIG.STORAGE_KEYS.WORD_RESULTS : CONFIG.STORAGE_KEYS.WORD_RESULTS_PHRASE;
}

// 新增：统一获取词条键值（单词/短语）
function getWordKey(wordObj) {
  if (!wordObj) return '';
  const lt = getCurrentLearnType();
  let raw = '';
  if (lt === 'word' || lt === 'word_zh') {
    raw = (wordObj.standardized || wordObj.word || '').toString();
  } else {
    raw = (wordObj.phrase || wordObj.standardized || wordObj.word || '').toString();
  }
  return raw.trim().toLowerCase();
}

// 新增：读取/保存 per-word 结果映射
function getWordResultsMap() {
  const lt = getCurrentLearnType();
  const key = getResultsStorageKeyByType(lt);
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { version: 1, updatedAt: new Date().toISOString(), items: {} };
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') throw new Error('bad data');
    data.items = data.items || {};
    return data;
  } catch (e) {
    return { version: 1, updatedAt: new Date().toISOString(), items: {} };
  }
}

function saveWordResultsMap(map) {
  const lt = getCurrentLearnType();
  const key = getResultsStorageKeyByType(lt);
  try {
    const data = Object.assign({ version: 1 }, map || {});
    data.updatedAt = new Date().toISOString();
    if (!data.items) data.items = {};
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) { /* ignore */ }
}

// 新增：记录某词是否答对
function recordWordResult(wordObj, isCorrect) {
  try {
    const data = getWordResultsMap();
    const key = getWordKey(wordObj);
    if (!key) return;
    const it = data.items[key] || { lastResult: null, lastAt: null, correct: 0, wrong: 0, seen: 0 };
    it.seen = (it.seen || 0) + 1;
    if (isCorrect) { it.correct = (it.correct || 0) + 1; it.lastResult = 1; } else { it.wrong = (it.wrong || 0) + 1; it.lastResult = 0; }
    it.lastAt = new Date().toISOString();
    data.items[key] = it;
    saveWordResultsMap(data);
  } catch (e) { /* ignore */ }
}

// 新增：获取单词学习状态
function getWordLearningStatus(wordObj) {
  try {
    const data = getWordResultsMap();
    const key = getWordKey(wordObj);
    if (!key) return 'unlearned';
    const item = data.items[key];
    if (!item) return 'unlearned';

    // 判断学习状态
    if (item.correct >= 3) return 'mastered';      // 掌握：答对3次及以上
    if (item.correct >= 1) return 'learning';      // 学习中：至少答对1次
    if (item.seen > 0) return 'seen';              // 已见过：至少见过1次
    return 'unlearned';                              // 未学习
  } catch (e) {
    return 'unlearned';
  }
}

// 新增：获取所有单词的学习统计
function getLearningStatistics() {
  try {
    const data = getWordResultsMap();
    const items = data.items || {};
    const stats = {
      total: 0,
      mastered: 0,
      learning: 0,
      seen: 0,
      unlearned: 0,
      totalSeen: 0,
      totalCorrect: 0,
      totalWrong: 0,
      accuracy: 0
    };

    Object.values(items).forEach(item => {
      stats.total++;
      stats.totalSeen += item.seen || 0;
      stats.totalCorrect += item.correct || 0;
      stats.totalWrong += item.wrong || 0;

      if (item.correct >= 3) stats.mastered++;
      else if (item.correct >= 1) stats.learning++;
      else if (item.seen > 0) stats.seen++;
    });

    // 计算准确率
    if (stats.totalSeen > 0) {
      stats.accuracy = Math.round((stats.totalCorrect / stats.totalSeen) * 100);
    }

    return stats;
  } catch (e) {
    return {
      total: 0,
      mastered: 0,
      learning: 0,
      seen: 0,
      unlearned: 0,
      totalSeen: 0,
      totalCorrect: 0,
      totalWrong: 0,
      accuracy: 0
    };
  }
}

// 新增：按学习状态筛选单词
function filterWordsByLearningStatus(vocabulary, status) {
  if (!vocabulary || !Array.isArray(vocabulary)) return [];

  return vocabulary.filter(wordObj => {
    const wordStatus = getWordLearningStatus(wordObj);
    return wordStatus === status;
  });
}

// 新增：智能词汇排序 - 优先未学习的单词
function prioritizeUnlearnedWords(vocabulary, limit = null) {
  if (!vocabulary || !Array.isArray(vocabulary)) return [];

  // 按学习状态分组
  const unlearned = filterWordsByLearningStatus(vocabulary, 'unlearned');
  const seen = filterWordsByLearningStatus(vocabulary, 'seen');
  const learning = filterWordsByLearningStatus(vocabulary, 'learning');
  const mastered = filterWordsByLearningStatus(vocabulary, 'mastered');

  // 按优先级排序：未学习 > 已见过 > 学习中 > 已掌握
  const prioritized = [...unlearned, ...seen, ...learning, ...mastered];

  // 如果指定了限制数量，返回前N个
  if (limit && limit > 0) {
    return prioritized.slice(0, limit);
  }

  return prioritized;
}

// 新增：获取推荐学习单词（混合模式）
function getRecommendedWords(vocabulary, count = 10) {
  if (!vocabulary || !Array.isArray(vocabulary)) return [];

  // 获取各状态单词
  const unlearned = filterWordsByLearningStatus(vocabulary, 'unlearned');
  const seen = filterWordsByLearningStatus(vocabulary, 'seen');
  const learning = filterWordsByLearningStatus(vocabulary, 'learning');

  // 推荐策略：70% 未学习，20% 已见过，10% 学习中
  const recommended = [];

  const unlearnedCount = Math.ceil(count * 0.7);
  const seenCount = Math.ceil(count * 0.2);
  const learningCount = count - unlearnedCount - seenCount;

  // 随机选择各状态单词
  const selectRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  recommended.push(...selectRandom(unlearned, Math.min(unlearnedCount, unlearned.length)));
  recommended.push(...selectRandom(seen, Math.min(seenCount, seen.length)));
  recommended.push(...selectRandom(learning, Math.min(learningCount, learning.length)));

  // 如果还不够，从已掌握单词中补充
  if (recommended.length < count) {
    const mastered = filterWordsByLearningStatus(vocabulary, 'mastered');
    const remaining = count - recommended.length;
    recommended.push(...selectRandom(mastered, Math.min(remaining, mastered.length)));
  }

  // 随机打乱顺序
  return recommended.sort(() => 0.5 - Math.random());
}

// 新增：获取学习记录导出数据
function getLearningRecordExport() {
  try {
    const lt = getCurrentLearnType();
    const vocabName = document.getElementById('vocabSelect')?.value || 'unknown';
    const data = getWordResultsMap();
    const stats = getLearningStatistics();

    return {
      version: '2.0',
      exportDate: new Date().toISOString(),
      vocabulary: vocabName,
      learnType: lt,
      statistics: stats,
      wordDetails: data.items || {},
      summary: {
        totalWords: stats.total,
        masteredWords: stats.mastered,
        learningWords: stats.learning,
        seenWords: stats.seen,
        overallAccuracy: stats.accuracy,
        totalAttempts: stats.totalSeen
      }
    };
  } catch (e) {
    return {
      version: '2.0',
      exportDate: new Date().toISOString(),
      vocabulary: 'unknown',
      learnType: getCurrentLearnType(),
      statistics: getLearningStatistics(),
      wordDetails: {},
      summary: {},
      error: e.message
    };
  }
}

// 新增：导出学习记录
function exportLearningRecord() {
  try {
    const exportData = getLearningRecordExport();
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning_record_${exportData.vocabulary}_${getCurrentDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('学习记录已导出');
    return true;
  } catch (e) {
    console.error('导出学习记录失败:', e);
    showNotification('导出失败：' + e.message, 'error');
    return false;
  }
}

// ===== 激活与试用：B2 极简实现 =====
// 说明：根据你的偏好，不绑定设备ID，不设过期；
// 激活信息结构：{ activated: true/false, code?: string, activatedAt?: iso }
function getActivationInfo() {
  try {
    const raw = localStorage.getItem(CONFIG.STORAGE_KEYS.ACTIVATION_INFO);
    if (!raw) return { activated: false };
    const data = JSON.parse(raw);
    return (data && typeof data === 'object') ? data : { activated: false };
  } catch(e){ return { activated: false }; }
}

function saveActivationInfo(info){
  try {
    const data = Object.assign({ activated: false }, info||{});
    localStorage.setItem(CONFIG.STORAGE_KEYS.ACTIVATION_INFO, JSON.stringify(data));
  } catch(e){}
}

function isActivated(){
  const a = getActivationInfo();
  return !!a.activated;
}

// 试用计数：按学习类型区分唯一词条集合
// 结构：{ version:1, byType: { word: { set: [key1,key2,...] }, phrase_en: {...} }, updatedAt }
function getTrialUsage(){
  try{
    const raw = localStorage.getItem(CONFIG.STORAGE_KEYS.TRIAL_USAGE);
    if(!raw) return { version:1, byType:{}, updatedAt:new Date().toISOString() };
    const data = JSON.parse(raw);
    data.byType = data.byType || {};
    return data;
  }catch(e){ return { version:1, byType:{}, updatedAt:new Date().toISOString() }; }
}

function saveTrialUsage(data){
  try{
    data = Object.assign({version:1, byType:{}}, data||{});
    data.updatedAt = new Date().toISOString();
    localStorage.setItem(CONFIG.STORAGE_KEYS.TRIAL_USAGE, JSON.stringify(data));
  }catch(e){}
}

function addTrialLearned(wordObj){
  try{
    const lt = getCurrentLearnType();
    const key = getWordKey(wordObj);
    if(!key) return;
    const tu = getTrialUsage();
    const bucket = tu.byType[lt] || { set: [] };
    if(!bucket.set.includes(key)) bucket.set.push(key);
    tu.byType[lt] = bucket;
    saveTrialUsage(tu);
  }catch(e){}
}

function getTrialCount(){
  try{
    const lt = getCurrentLearnType();
    const tu = getTrialUsage();
    const bucket = tu.byType[lt] || { set: [] };
    return (bucket.set||[]).length;
  }catch(e){ return 0; }
}

// 统一外链图片兜底（icons8 ORB 拦截）
(function setupGlobalImageFallback(){
  try {
    const ICONS8 = /https?:\/\/img\.icons8\.com\//i;

    // 针对已有 <img> 标签：绑定 onerror
    function attachOnError(img){
      if (!img || img.dataset.__fallbackBound) return;
      img.dataset.__fallbackBound = '1';
      const origSrc = img.getAttribute('src') || '';
      if (ICONS8.test(origSrc)) {
        img.addEventListener('error', () => {
          img.src = createPlaceholderImage('图片受限');
        }, { once: true });
      }
    }

    // 初始扫描
    document.querySelectorAll('img[src]').forEach(attachOnError);

    // 监听后续 DOM 变化
    const observer = new MutationObserver((mutList) => {
      for (const m of mutList) {
        if (m.type === 'attributes' && m.attributeName === 'src' && m.target.tagName === 'IMG') {
          attachOnError(m.target);
        } else if (m.type === 'childList') {
          m.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (node.tagName === 'IMG') attachOnError(node);
              node.querySelectorAll && node.querySelectorAll('img[src]').forEach(attachOnError);
            }
          });
        }
      }
    });
    observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src'] });

    console.info('[INIT] Global image fallback for icons8 enabled');
  } catch (e) {
    console.warn('setupGlobalImageFallback error', e);
  }
})();

/**
 * 输入验证和清理函数 - 安全增强
 */

/**
 * 清理HTML内容，防止XSS攻击
 */
function sanitizeHTML(str) {
  if (typeof str !== 'string') return str;

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * 验证激活码格式
 */
function validateActivationCode(code) {
  if (typeof code !== 'string') return false;

  // 清理输入
  const cleanCode = code.trim();

  // 基本格式验证
  if (cleanCode.length < 8 || cleanCode.length > 50) return false;

  // 只允许字母、数字和连字符
  if (!/^[A-Za-z0-9-]+$/.test(cleanCode)) return false;

  // 必须以MC-开头
  if (!cleanCode.startsWith('MC-')) return false;

  return true;
}

/**
 * 验证文件上传
 */
function validateFileUpload(file) {
  if (!file) return { valid: false, error: '没有选择文件' };

  // 检查文件类型
  if (!file.name.toLowerCase().endsWith('.json')) {
    return { valid: false, error: '只支持JSON文件' };
  }

  // 检查文件大小 (最大10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: '文件大小不能超过10MB' };
  }

  return { valid: true };
}

/**
 * 安全解析JSON
 */
function safeJSONParse(str, defaultValue = null) {
  try {
    // 限制输入长度
    if (typeof str !== 'string' || str.length > 100000) {
      return defaultValue;
    }

    return JSON.parse(str);
  } catch (e) {
    console.warn('JSON解析失败:', e);
    return defaultValue;
  }
}

/**
 * 验证用户输入的单词数据
 */
function validateWordData(wordObj) {
  if (!wordObj || typeof wordObj !== 'object') {
    return { valid: false, error: '无效的数据格式' };
  }

  // 检查必需字段
  if (!wordObj.word || typeof wordObj.word !== 'string') {
    return { valid: false, error: '缺少单词字段' };
  }

  // 清理单词内容
  const cleanWord = wordObj.word.trim();
  if (cleanWord.length === 0 || cleanWord.length > 100) {
    return { valid: false, error: '单词长度必须在1-100字符之间' };
  }

  // 检查中文翻译
  if (wordObj.chinese && typeof wordObj.chinese !== 'string') {
    return { valid: false, error: '中文翻译必须是字符串' };
  }

  // 检查图片URL
  if (wordObj.imageURLs && Array.isArray(wordObj.imageURLs)) {
    const validUrls = wordObj.imageURLs.filter(url => {
      return typeof url === 'string' &&
             (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'));
    });

    if (validUrls.length !== wordObj.imageURLs.length) {
      return { valid: false, error: '包含无效的图片URL' };
    }
  }

  return { valid: true };
}

/**
 * 清理用户输入的文本
 */
function sanitizeInput(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';

  // 限制长度
  if (input.length > maxLength) {
    input = input.substring(0, maxLength);
  }

  // 移除控制字符
  input = input.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

  // 标准化空白字符
  input = input.replace(/\s+/g, ' ').trim();

  return input;
}

/**
 * 验证学习类型
 */
function validateLearnType(type) {
  const validTypes = ['word', 'word_zh', 'phrase_en', 'phrase_zh'];
  return validTypes.includes(type);
}

/**
 * 安全设置localStorage
 */
function safeLocalStorageSet(key, value) {
  try {
    // 验证键名
    if (typeof key !== 'string' || key.length === 0 || key.length > 100) {
      return false;
    }

    // 验证值的大小（限制为5MB）
    const valueStr = JSON.stringify(value);
    if (valueStr.length > 5 * 1024 * 1024) {
      console.warn('localStorage值过大，跳过存储');
      return false;
    }

    localStorage.setItem(key, valueStr);
    return true;
  } catch (e) {
    console.warn('localStorage存储失败:', e);
    return false;
  }
}

/**
 * 安全获取localStorage
 */
function safeLocalStorageGet(key, defaultValue = null) {
  try {
    if (typeof key !== 'string' || key.length === 0) {
      return defaultValue;
    }

    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;

    // 限制解析长度
    if (value.length > 100000) {
      console.warn('localStorage值过大，返回默认值');
      return defaultValue;
    }

    return JSON.parse(value);
  } catch (e) {
    console.warn('localStorage读取失败:', e);
    return defaultValue;
  }
}