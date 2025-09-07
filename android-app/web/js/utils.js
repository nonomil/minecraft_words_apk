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
                
                const pages = data.query?.pages;
                if (pages) {
                    const pageId = Object.keys(pages)[0];
                    const imageUrl = pages[pageId]?.imageinfo?.[0]?.url;
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

// ===== 激活与试用：极简实现（与根目录保持一致） =====
function getActivationInfo() {
    try {
        const raw = localStorage.getItem(CONFIG.STORAGE_KEYS.ACTIVATION_INFO);
        if (!raw) return { activated: false };
        const data = JSON.parse(raw);
        return (data && typeof data === 'object') ? data : { activated: false };
    } catch (e) {
        return { activated: false };
    }
}

function saveActivationInfo(info){
    try {
        const data = Object.assign({ activated: false }, info || {});
        localStorage.setItem(CONFIG.STORAGE_KEYS.ACTIVATION_INFO, JSON.stringify(data));
    } catch (e) {}
}

function isActivated(){
    const a = getActivationInfo();
    return !!a.activated;
}

// ===== 试用计数与依赖函数（极简对齐根目录） =====
// 当前学习类型
function getCurrentLearnType() {
    try {
        return (typeof learnType !== 'undefined' && learnType) || localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word';
    } catch (e) {
        return 'word';
    }
}

// 生成词条唯一键（大小写无关）
function getWordKey(wordObj) {
    try {
        if (!wordObj) return null;
        const key = (wordObj.standardized || wordObj.word || wordObj.phrase || '').toLowerCase();
        return key || null;
    } catch (e) {
        return null;
    }
}

// 试用计数：按学习类型区分唯一词条集合
// 结构：{ version:1, byType: { word: { set: [key1,key2,...] } }, updatedAt }
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