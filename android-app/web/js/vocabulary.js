// 词库管理相关函数

// 加载预设词库
async function loadVocabulary() {
    const selectedVocab = document.getElementById('vocabSelect').value;
    
    try {
        let data;
        
        // 统一走内置JS词库加载，优先使用动态映射，其次fallback
        if (typeof loadEmbeddedVocabulary === 'function') {
            console.log('Loading vocabulary via embedded JS loader:', selectedVocab);
            data = await loadEmbeddedVocabulary(selectedVocab);
        } else {
            throw new Error('词库加载器未初始化');
        }
        
        validateVocabularyJSON(data);
        
        currentVocabulary = data;
        currentWordIndex = 0;

        // 新增：Minecraft 词库时按设置比例混入幼儿园词
        if (getSettings().mixKindergartenEnabled && /minecraft/i.test(selectedVocab)) {
            await mixKindergartenIntoCurrent(selectedVocab);
        }
        
        // 如果是幼儿园模式，初始化分组
        if (getSettings().kindergartenMode && (selectedVocab.includes('幼儿园') || selectedVocab === 'kindergarten_vocabulary')) {
            initializeKindergartenMode();
        }
        
        showNotification(`成功加载 ${currentVocabulary.length} 个单词！`);
        updateWordDisplay();
        updateStats();
        enableControls();
        
    } catch (error) {
        showNotification('加载词库失败: ' + error.message, 'error');
        console.error('Error loading vocabulary:', error);
    }
}

// 加载自定义词库
function loadCustomVocabulary() {
    const fileInput = document.getElementById('customVocabFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('请先选择一个JSON文件', 'error');
        return;
    }
    
    if (!file.name.toLowerCase().endsWith('.json')) {
        showNotification('请选择JSON格式的文件', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const jsonData = JSON.parse(e.target.result);
            validateVocabularyJSON(jsonData);
            
            currentVocabulary = jsonData;
            currentWordIndex = 0;
            
            // 新增：若自定义词库判断为 Minecraft 领域且开启了混合，则注入幼儿园词
            if (getSettings().mixKindergartenEnabled && isLikelyMinecraftVocabulary(currentVocabulary)) {
                await mixKindergartenIntoCurrent('custom');
            }
            
            // 检查是否启用幼儿园模式
            if (getSettings().kindergartenMode) {
                initializeKindergartenMode();
            }
            
            showNotification(`成功加载自定义词库：${currentVocabulary.length} 个单词！`);
            updateWordDisplay();
            updateStats();
            enableControls();
            
        } catch (error) {
            showNotification('加载自定义词库失败: ' + error.message, 'error');
            console.error('Error loading custom vocabulary:', error);
        }
    };
    
    reader.onerror = function() {
        showNotification('文件读取失败', 'error');
    };
    
    reader.readAsText(file, 'UTF-8');
}

// 随机排序词汇
function shuffleWords() {
    if (currentVocabulary.length === 0) {
        showNotification('请先加载词库', 'error');
        return;
    }
    
    currentVocabulary = shuffleArray(currentVocabulary);
    currentWordIndex = 0;
    
    // 重新初始化幼儿园模式
    if (getSettings().kindergartenMode) {
        initializeKindergartenMode();
    }
    
    updateWordDisplay();
    showNotification('词汇已随机排序！');
}

// 新增：判断自定义词库是否可能是 Minecraft 领域
function isLikelyMinecraftVocabulary(list) {
    if (!Array.isArray(list) || list.length === 0) return false;
    const categories = new Set(['block','item','entity','environment','biome']);
    let hits = 0;
    let checked = 0;
    for (let i = 0; i < list.length && checked < 100; i++, checked++) {
        const w = list[i] || {};
        if (typeof w.category === 'string' && categories.has(w.category)) hits++;
        const phrase = (w.phrase || '').toLowerCase();
        const std = (w.standardized || '').toLowerCase();
        if (phrase.includes('minecraft') || std.includes('minecraft')) hits++;
    }
    return hits >= Math.max(5, Math.floor(checked * 0.2));
}

// 新增：混入幼儿园综合词库
async function mixKindergartenIntoCurrent(contextName) {
    try {
        if (!Array.isArray(currentVocabulary) || currentVocabulary.length === 0) return;
        const ratio = Math.max(0, Math.min(1, parseFloat(getSettings().mixKindergartenRatio || 0)));
        if (ratio <= 0) return;
        const targetCount = Math.max(1, Math.round(currentVocabulary.length * ratio));
        // 取幼儿园综合词库作为来源
        let kindergartenWords = [];
        if (typeof loadEmbeddedVocabulary === 'function') {
            try {
                kindergartenWords = await loadEmbeddedVocabulary('6.幼儿园词汇');
            } catch (e) {
                // fallback 名称
                try { kindergartenWords = await loadEmbeddedVocabulary('kindergarten_vocabulary'); } catch(e2) {}
            }
        }
        if (!Array.isArray(kindergartenWords) || kindergartenWords.length === 0) return;
        const picks = getRandomElements(kindergartenWords, Math.min(kindergartenWords.length, targetCount));
        
        // 去重：基于 standardized 或 word 小写
        const key = (w) => (w && (w.standardized || w.word || '')).toString().trim().toLowerCase();
        const seen = new Set(currentVocabulary.map(key));
        const uniquePicks = [];
        for (const w of picks) {
            const k = key(w);
            if (!k || seen.has(k)) continue;
            seen.add(k);
            uniquePicks.push(w);
        }
        if (uniquePicks.length === 0) return;
        
        // 合并并随机打散，保证均匀混合
        currentVocabulary = shuffleArray(currentVocabulary.concat(uniquePicks));
        currentWordIndex = 0;
        console.log(`已向 ${contextName} 词库混入幼儿园词 ${uniquePicks.length}/${targetCount} 个，混合比例设置=${ratio}`);
    } catch (e) {
        console.warn('混合幼儿园词库失败：', e);
    }
}

// 获取当前单词
function getCurrentWord() {
    if (currentVocabulary.length === 0 || currentWordIndex >= currentVocabulary.length) {
        return null;
    }
    return currentVocabulary[currentWordIndex];
}

// 获取词库统计信息
function getVocabularyStats() {
    if (currentVocabulary.length === 0) {
        return {
            total: 0,
            categories: {},
            difficulties: {}
        };
    }
    
    const stats = {
        total: currentVocabulary.length,
        categories: {},
        difficulties: {}
    };
    
    currentVocabulary.forEach(word => {
        // 统计分类
        const category = word.category || '未分类';
        stats.categories[category] = (stats.categories[category] || 0) + 1;
        
        // 统计难度
        const difficulty = word.difficulty || '未知';
        stats.difficulties[difficulty] = (stats.difficulties[difficulty] || 0) + 1;
    });
    
    return stats;
}

// 搜索词汇
function searchVocabulary(query) {
    if (!query) {
        return currentVocabulary;
    }
    
    const lowerQuery = query.toLowerCase();
    return currentVocabulary.filter(word => 
        word.word.toLowerCase().includes(lowerQuery) ||
        word.chinese.toLowerCase().includes(lowerQuery) ||
        (word.standardized && word.standardized.toLowerCase().includes(lowerQuery))
    );
}

// 获取相似词汇（用于生成选择题选项）
function getSimilarWords(targetWord, count = 3) {
    const otherWords = currentVocabulary.filter(word => 
        word.chinese !== targetWord.chinese
    );
    
    if (otherWords.length === 0) {
        return [];
    }
    
    // 优先选择同类别的词汇
    const sameCategory = otherWords.filter(word => 
        word.category === targetWord.category
    );
    
    const sameDifficulty = otherWords.filter(word => 
        word.difficulty === targetWord.difficulty
    );
    
    // 组合候选词汇
    let candidates = [];
    
    // 添加同类别词汇
    if (sameCategory.length > 0) {
        candidates.push(...getRandomElements(sameCategory, Math.min(count, sameCategory.length)));
    }
    
    // 如果不够，添加同难度词汇
    if (candidates.length < count && sameDifficulty.length > 0) {
        const needed = count - candidates.length;
        const additional = sameDifficulty.filter(word => 
            !candidates.some(c => c.chinese === word.chinese)
        );
        candidates.push(...getRandomElements(additional, Math.min(needed, additional.length)));
    }
    
    // 如果还不够，随机添加其他词汇
    if (candidates.length < count) {
        const needed = count - candidates.length;
        const remaining = otherWords.filter(word => 
            !candidates.some(c => c.chinese === word.chinese)
        );
        candidates.push(...getRandomElements(remaining, Math.min(needed, remaining.length)));
    }
    
    return candidates.slice(0, count);
}

// 检查词汇完整性
function validateWordData(word) {
    const required = ['word', 'chinese'];
    const missing = required.filter(field => !word[field]);
    
    if (missing.length > 0) {
        console.warn(`词汇数据不完整，缺少字段: ${missing.join(', ')}`, word);
        return false;
    }
    
    return true;
}

// 修复词汇数据
function fixWordData(word) {
    const fixed = { ...word };
    
    // 确保有标准化单词
    if (!fixed.standardized) {
        fixed.standardized = fixed.word;
    }
    
    // 确保有分类
    if (!fixed.category) {
        fixed.category = '未分类';
    }
    
    // 确保有难度
    if (!fixed.difficulty) {
        fixed.difficulty = 'basic';
    }
    
    return fixed;
}

// 启用控制按钮（补回）
function enableControls() {
    const nextBtn = document.querySelector('.control-btn.next');
    const prevBtn = document.querySelector('.control-btn.prev');
    const exportBtn = document.getElementById('exportBtn');
    if (nextBtn) nextBtn.disabled = false;
    if (prevBtn) prevBtn.disabled = currentWordIndex === 0;
    if (exportBtn) exportBtn.disabled = (currentVocabulary.length === 0);
}

// 导出当前词库（补回）
function exportCurrentVocab() {
    if (!currentVocabulary || currentVocabulary.length === 0) {
        showNotification('没有词库可导出', 'error');
        return;
    }
    const dataStr = JSON.stringify(currentVocabulary, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocabulary_${getCurrentDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('词库已导出');
}