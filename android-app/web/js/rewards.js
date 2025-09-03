// 奖励系统相关函数

// 初始化幼儿园模式
function initializeKindergartenMode() {
    // 启用幼儿园模式样式
    document.body.classList.add('kindergarten-mode');
    
    // 显示奖励系统
    const rewardSystem = document.getElementById('rewardSystem');
    if (rewardSystem) {
        rewardSystem.style.display = 'block';
    }
    
    // 重置分组相关变量
    currentGroup = 1;
    groupProgress = 0;
    correctAnswersInGroup = 0;
    
    // 加载保存的奖励进度
    loadKindergartenProgress();
    
    // 更新分组显示
    updateGroupDisplay();
    
    // 更新奖励显示
    updateRewardDisplay();
}

// 更新分组显示
function updateGroupDisplay() {
    const currentGroupElement = document.getElementById('currentGroup');
    const groupProgressElement = document.getElementById('groupProgress');
    const groupProgressFill = document.getElementById('groupProgressFill');
    
    if (currentGroupElement) {
        currentGroupElement.textContent = currentGroup;
    }
    
    if (groupProgressElement) {
        groupProgressElement.textContent = groupProgress;
    }
    
    if (groupProgressFill) {
        const progressPercentage = (groupProgress / CONFIG.KINDERGARTEN.WORDS_PER_GROUP) * 100;
        groupProgressFill.style.width = progressPercentage + '%';
    }
}

// 更新奖励显示
function updateRewardDisplay() {
    updateUnifiedRewardsDisplay();
}

// 统一奖励显示（新设计：一行显示所有奖励）
function updateUnifiedRewardsDisplay() {
    const rewardsRow = document.getElementById('rewardsRow');
    const diamondTotal = document.getElementById('diamondTotal');
    const swordTotal = document.getElementById('swordTotal');
    
    if (!rewardsRow) return;
    
    // 更新总数显示
    if (diamondTotal) {
        diamondTotal.textContent = totalDiamonds;
    }
    if (swordTotal) {
        swordTotal.textContent = totalSwords;
    }
    
    rewardsRow.innerHTML = '';
    
    // 显示钻石（最多10个，超过后从0开始）
    const displayDiamonds = totalDiamonds % 10 || (totalDiamonds > 0 ? 10 : 0);
    for (let i = 0; i < displayDiamonds; i++) {
        const diamond = document.createElement('div');
        diamond.className = 'diamond';
        diamond.textContent = '💎';
        diamond.title = `当前组钻石 ${i + 1}/10 (总计: ${totalDiamonds})`;
        rewardsRow.appendChild(diamond);
    }
    
    // 显示钻石剑（最多10个，超过后从0开始）
    const displaySwords = totalSwords % 10 || (totalSwords > 0 ? 10 : 0);
    for (let i = 0; i < displaySwords; i++) {
        const sword = document.createElement('div');
        sword.className = 'sword';
        sword.textContent = '⚔️';
        sword.title = `当前组钻石剑 ${i + 1}/10 (总计: ${totalSwords})`;
        rewardsRow.appendChild(sword);
    }
}

// 保持向后兼容的函数（可能被其他地方调用）
function updateDiamondsDisplay() {
    updateUnifiedRewardsDisplay();
}

function updateSwordsDisplay() {
    updateUnifiedRewardsDisplay();
}

// 奖励钻石
function awardDiamond() {
    totalDiamonds += CONFIG.KINDERGARTEN.DIAMOND_REWARD;
    
    // 创建钻石动画
    createDiamondAnimation();
    
    // 更新显示
    updateDiamondsDisplay();
    
    // 保存进度
    saveKindergartenProgress();
    
    // 播放奖励音效（如果有的话）
    playRewardSound('diamond');
}

// 奖励钻石剑
function awardSword() {
    totalSwords++;
    
    // 创建钻石剑动画
    createSwordAnimation();
    
    // 更新显示
    updateSwordsDisplay();
    
    // 显示成就
    showAchievement('🎉 恭喜获得钻石剑！\n完成了一组单词学习！');
    
    // 保存进度
    saveKindergartenProgress();
    
    // 播放奖励音效
    playRewardSound('sword');
}

// 创建钻石动画
function createDiamondAnimation() {
    const diamondsRow = document.getElementById('diamondsRow');
    if (!diamondsRow) return;
    
    // 创建临时钻石元素用于动画
    const tempDiamond = document.createElement('div');
    tempDiamond.className = 'diamond';
    tempDiamond.style.position = 'fixed';
    tempDiamond.style.top = '50%';
    tempDiamond.style.left = '50%';
    tempDiamond.style.transform = 'translate(-50%, -50%) scale(2)';
    tempDiamond.style.zIndex = '1000';
    tempDiamond.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(tempDiamond);
    
    // 动画到目标位置
    setTimeout(() => {
        const rect = diamondsRow.getBoundingClientRect();
        tempDiamond.style.top = rect.top + 'px';
        tempDiamond.style.left = (rect.right - 25) + 'px';
        tempDiamond.style.transform = 'scale(1)';
    }, 100);
    
    // 移除临时元素
    setTimeout(() => {
        document.body.removeChild(tempDiamond);
    }, 1100);
}

// 创建钻石剑动画
function createSwordAnimation() {
    const swordsRow = document.getElementById('swordsRow');
    if (!swordsRow) return;
    
    // 创建临时钻石剑元素用于动画
    const tempSword = document.createElement('div');
    tempSword.className = 'sword';
    tempSword.style.position = 'fixed';
    tempSword.style.top = '50%';
    tempSword.style.left = '50%';
    tempSword.style.transform = 'translate(-50%, -50%) scale(3) rotate(360deg)';
    tempSword.style.zIndex = '1000';
    tempSword.style.transition = 'all 1.5s ease-out';
    
    document.body.appendChild(tempSword);
    
    // 动画到目标位置
    setTimeout(() => {
        const rect = swordsRow.getBoundingClientRect();
        tempSword.style.top = rect.top + 'px';
        tempSword.style.left = (rect.right - 25) + 'px';
        tempSword.style.transform = 'scale(1) rotate(0deg)';
    }, 100);
    
    // 移除临时元素
    setTimeout(() => {
        document.body.removeChild(tempSword);
    }, 1600);
}

// 显示成就
function showAchievement(message) {
    // 移除现有的成就显示
    const existingAchievement = document.querySelector('.achievement');
    if (existingAchievement) {
        existingAchievement.remove();
    }
    
    // 创建新的成就显示
    const achievement = document.createElement('div');
    achievement.className = 'achievement';
    achievement.innerHTML = message.replace('\n', '<br>');
    
    document.body.appendChild(achievement);
    
    // 自动移除
    setTimeout(() => {
        if (achievement.parentNode) {
            achievement.parentNode.removeChild(achievement);
        }
    }, CONFIG.ANIMATION.ACHIEVEMENT_DURATION);
}

// 播放奖励音效
function playRewardSound(type) {
    // 这里可以添加音效播放逻辑
    // 由于浏览器限制，需要用户交互后才能播放音频
    try {
        if (type === 'diamond') {
            // 播放钻石音效
            console.log('播放钻石奖励音效');
        } else if (type === 'sword') {
            // 播放钻石剑音效
            console.log('播放钻石剑奖励音效');
        }
    } catch (error) {
        console.warn('无法播放音效:', error);
    }
}

// 处理正确答案
function handleCorrectAnswer() {
    if (!getSettings().kindergartenMode) {
        return;
    }
    
    // 增加组内正确答案计数
    correctAnswersInGroup++;
    groupProgress++;
    
    // 奖励钻石
    awardDiamond();
    
    // 检查是否完成一组
    if (groupProgress >= CONFIG.KINDERGARTEN.WORDS_PER_GROUP) {
        // 奖励钻石剑
        awardSword();
        
        // 重置组进度
        groupProgress = 0;
        correctAnswersInGroup = 0;
        currentGroup++;
    }
    
    // 更新显示
    updateGroupDisplay();
}

// 保存幼儿园进度（按学习类型分开存储）
function saveKindergartenProgress() {
    const progress = {
        currentGroup,
        groupProgress,
        totalDiamonds,
        totalSwords,
        correctAnswersInGroup,
        lastSaveDate: new Date().toISOString(),
        learnType: (function(){
            try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
        })()
    };

    // 根据学习类型选择键（默认回退到单词键确保兼容）
    const lt = progress.learnType;
    const key = lt === 'word' ? CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS : CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS_PHRASE;
    localStorage.setItem(key, JSON.stringify(progress));
}

// 加载幼儿园进度（按学习类型分开加载，含兼容旧数据）
function loadKindergartenProgress() {
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const key = lt === 'word' ? CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS : CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS_PHRASE;

    // 兼容：若新键无数据且为短语模式，回退尝试旧键
    let saved = localStorage.getItem(key);
    if (!saved && lt !== 'word') {
        saved = localStorage.getItem(CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS);
    }

    if (saved) {
        try {
            const progress = JSON.parse(saved);
            currentGroup = progress.currentGroup || 1;
            groupProgress = progress.groupProgress || 0;
            totalDiamonds = progress.totalDiamonds || 0;
            totalSwords = progress.totalSwords || 0;
            correctAnswersInGroup = progress.correctAnswersInGroup || 0;
        } catch (error) {
            console.warn('加载幼儿园进度失败:', error);
            resetKindergartenProgress();
        }
    } else {
        // 如果没有数据，则重置并保存一份
        resetKindergartenProgress();
    }
}

// 重置幼儿园进度（当前学习类型）
function resetKindergartenProgress() {
    currentGroup = 1;
    groupProgress = 0;
    totalDiamonds = 0;
    totalSwords = 0;
    correctAnswersInGroup = 0;

    updateGroupDisplay();
    updateRewardDisplay();
    saveKindergartenProgress();

    showNotification('幼儿园进度已重置');
}

// 获取奖励统计
function getRewardStats() {
    return {
        currentGroup,
        groupProgress,
        totalDiamonds,
        totalSwords,
        correctAnswersInGroup,
        completedGroups: currentGroup - 1 + (groupProgress === CONFIG.KINDERGARTEN.WORDS_PER_GROUP ? 1 : 0)
    };
}

// 导出奖励数据
function exportRewardData() {
    const stats = getRewardStats();
    const data = {
        ...stats,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `kindergarten_rewards_${getCurrentDateString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('奖励数据已导出');
}