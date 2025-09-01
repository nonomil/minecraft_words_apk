// 词库管理相关函数

// 加载预设词库
async function loadVocabulary() {
    const selectedVocab = document.getElementById('vocabSelect').value;
    
    try {
        let data;
        
        // 检测是否为file://协议，如果是则使用内嵌数据
        if (window.location.protocol === 'file:' && typeof loadEmbeddedVocabulary === 'function') {
            console.log('Loading embedded vocabulary for file:// protocol:', selectedVocab);
            data = await loadEmbeddedVocabulary(selectedVocab);
        } else {
            // 使用原来的fetch方式
            const vocabUrl = `${CONFIG.VOCAB_PATH}${selectedVocab}.json`;
            console.log('Loading vocabulary from:', vocabUrl);
            const response = await fetch(vocabUrl);
            if (!response.ok) {
                throw new Error(`词库文件未找到: ${vocabUrl} (状态: ${response.status})`);
            }
            data = await response.json();
        }
        
        validateVocabularyJSON(data);
        
        currentVocabulary = data;
        currentWordIndex = 0;
        
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
    reader.onload = function(e) {
        try {
            const jsonData = JSON.parse(e.target.result);
            validateVocabularyJSON(jsonData);
            
            currentVocabulary = jsonData;
            currentWordIndex = 0;
            
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

// 导出当前词库
function exportCurrentVocab() {
    if (currentVocabulary.length === 0) {
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

// 启用控制按钮
function enableControls() {
    const nextBtn = document.querySelector('.control-btn.next');
    const prevBtn = document.querySelector('.control-btn.prev');
    const exportBtn = document.getElementById('exportBtn');
    
    if (nextBtn) nextBtn.disabled = false;
    if (prevBtn) prevBtn.disabled = currentWordIndex === 0;
    if (exportBtn) exportBtn.disabled = false;
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

// 按分类筛选词汇
function filterByCategory(category) {
    if (!category || category === 'all') {
        return currentVocabulary;
    }
    
    return currentVocabulary.filter(word => 
        (word.category || '未分类') === category
    );
}

// 按难度筛选词汇
function filterByDifficulty(difficulty) {
    if (!difficulty || difficulty === 'all') {
        return currentVocabulary;
    }
    
    return currentVocabulary.filter(word => 
        (word.difficulty || '未知') === difficulty
    );
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