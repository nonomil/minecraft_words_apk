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