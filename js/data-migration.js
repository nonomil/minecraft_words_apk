/**
 * 数据迁移系统 - 保护用户数据在APK更新时不丢失
 * Data Migration System - Preserve user data during APK updates
 */

// 数据迁移配置
const MIGRATION_CONFIG = {
    // 需要保护的存储键
    PROTECTED_KEYS: [
        'settings',                    // 用户设置
        'activationInfo',              // 激活信息
        'trialUsage',                  // 试用记录
        'kgProgress',                  // 幼儿园进度（单词模式）
        'kgProgress_phrase',           // 幼儿园进度（短语模式）
        'wordGameProgress',            // 游戏进度（单词模式）
        'wordGameProgress_phrase',     // 游戏进度（短语模式）
        'wordResultsMap',              // 单词结果（单词模式）
        'wordResultsMap_phrase',       // 单词结果（短语模式）
        'learnType',                   // 学习类型
        'prioritizeUnlearned',         // 优先加载设置
        'totalDiamonds',               // 钻石数量（兼容旧版本）
        'totalSwords',                 // 钻石剑数量（兼容旧版本）
        'lastVocab',                   // 最后使用的词库
        'quizResults'                  // 测试结果
    ],

    // 迁移版本
    MIGRATION_VERSION: '2.1.0',

    // 备份配置
    BACKUP_PREFIX: 'backup_',
    MAX_BACKUPS: 3
};

/**
 * 创建数据备份
 */
function createDataBackup(backupName = null) {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupKey = backupName || `${MIGRATION_CONFIG.BACKUP_PREFIX}${timestamp}`;

        const backupData = {};
        let backupCount = 0;

        // 收集所有需要保护的数据
        MIGRATION_CONFIG.PROTECTED_KEYS.forEach(key => {
            try {
                const data = localStorage.getItem(key);
                if (data !== null) {
                    backupData[key] = data;
                    backupCount++;
                }
            } catch (e) {
                console.warn(`备份键 ${key} 失败:`, e);
            }
        });

        // 添加元数据
        backupData._metadata = {
            version: MIGRATION_CONFIG.MIGRATION_VERSION,
            backupDate: new Date().toISOString(),
            backupKey: backupKey,
            dataCount: backupCount,
            appVersion: getAppVersion()
        };

        // 保存备份
        localStorage.setItem(backupKey, JSON.stringify(backupData));

        console.log(`✅ 数据备份创建成功: ${backupKey} (${backupCount} 项数据)`);

        // 清理旧备份
        cleanupOldBackups();

        return backupKey;

    } catch (error) {
        console.error('❌ 创建数据备份失败:', error);
        return null;
    }
}

/**
 * 恢复数据备份
 */
function restoreDataBackup(backupKey) {
    try {
        const backupDataStr = localStorage.getItem(backupKey);
        if (!backupDataStr) {
            console.warn(`⚠️ 备份不存在: ${backupKey}`);
            return false;
        }

        const backupData = JSON.parse(backupDataStr);
        const metadata = backupData._metadata || {};

        console.log(`🔄 开始恢复备份: ${backupKey}`);
        console.log(`📋 备份信息:`, metadata);

        let restoreCount = 0;

        // 恢复数据
        Object.keys(backupData).forEach(key => {
            if (key === '_metadata') return; // 跳过元数据

            try {
                localStorage.setItem(key, backupData[key]);
                restoreCount++;
            } catch (e) {
                console.warn(`恢复键 ${key} 失败:`, e);
            }
        });

        console.log(`✅ 数据恢复完成: ${restoreCount} 项数据已恢复`);

        // 触发数据恢复事件
        window.dispatchEvent(new CustomEvent('dataRestored', {
            detail: { backupKey, restoreCount, metadata }
        }));

        return true;

    } catch (error) {
        console.error('❌ 恢复数据备份失败:', error);
        return false;
    }
}

/**
 * 清理旧备份
 */
function cleanupOldBackups() {
    try {
        const backupKeys = [];

        // 查找所有备份
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(MIGRATION_CONFIG.BACKUP_PREFIX)) {
                backupKeys.push(key);
            }
        }

        // 按时间排序（最新的在前）
        backupKeys.sort().reverse();

        // 删除多余的备份
        if (backupKeys.length > MIGRATION_CONFIG.MAX_BACKUPS) {
            const keysToDelete = backupKeys.slice(MIGRATION_CONFIG.MAX_BACKUPS);
            keysToDelete.forEach(key => {
                localStorage.removeItem(key);
                console.log(`🗑️  删除旧备份: ${key}`);
            });
        }

    } catch (error) {
        console.warn('⚠️  清理旧备份失败:', error);
    }
}

/**
 * 获取所有备份列表
 */
function getBackupList() {
    try {
        const backups = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(MIGRATION_CONFIG.BACKUP_PREFIX)) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    const metadata = data._metadata || {};

                    backups.push({
                        key: key,
                        version: metadata.version || 'unknown',
                        backupDate: metadata.backupDate || 'unknown',
                        dataCount: metadata.dataCount || 0,
                        appVersion: metadata.appVersion || 'unknown'
                    });
                } catch (e) {
                    console.warn(`解析备份 ${key} 失败:`, e);
                }
            }
        }

        return backups.sort((a, b) => new Date(b.backupDate) - new Date(a.backupDate));

    } catch (error) {
        console.error('❌ 获取备份列表失败:', error);
        return [];
    }
}

/**
 * 检查是否需要数据迁移
 */
function checkMigrationNeeded() {
    try {
        // 检查是否有新版本的数据格式
        const currentVersion = getAppVersion();
        const lastMigrationVersion = localStorage.getItem('lastMigrationVersion');

        if (!lastMigrationVersion) {
            console.log('🆕 首次运行，不需要迁移');
            localStorage.setItem('lastMigrationVersion', currentVersion);
            return false;
        }

        if (lastMigrationVersion !== currentVersion) {
            console.log(`🔄 检测到版本变化: ${lastMigrationVersion} -> ${currentVersion}`);
            return true;
        }

        return false;

    } catch (error) {
        console.warn('⚠️  检查迁移需求失败:', error);
        return false;
    }
}

/**
 * 执行数据迁移
 */
function performMigration() {
    try {
        console.log('🚀 开始数据迁移流程...');

        // 创建备份
        const backupKey = createDataBackup('pre_migration_backup');
        if (!backupKey) {
            console.error('❌ 迁移失败：无法创建备份');
            return false;
        }

        console.log('✅ 迁移备份创建完成');

        // 执行具体的迁移逻辑
        const migrationResult = executeMigrationSteps();

        if (migrationResult) {
            // 更新迁移版本
            const currentVersion = getAppVersion();
            localStorage.setItem('lastMigrationVersion', currentVersion);

            console.log(`✅ 数据迁移完成: ${currentVersion}`);

            // 触发迁移完成事件
            window.dispatchEvent(new CustomEvent('migrationCompleted', {
                detail: { backupKey, currentVersion }
            }));

            return true;
        } else {
            console.error('❌ 迁移步骤执行失败');
            return false;
        }

    } catch (error) {
        console.error('❌ 数据迁移失败:', error);
        return false;
    }
}

/**
 * 执行具体的迁移步骤
 */
function executeMigrationSteps() {
    try {
        // 这里可以添加具体的迁移逻辑
        // 例如：数据格式转换、键名更新、数据结构升级等

        console.log('📋 执行迁移步骤...');

        // 示例：迁移旧版本的奖励数据
        migrateRewardData();

        // 示例：迁移学习进度数据
        migrateLearningProgress();

        console.log('✅ 迁移步骤执行完成');
        return true;

    } catch (error) {
        console.error('❌ 迁移步骤执行失败:', error);
        return false;
    }
}

/**
 * 迁移奖励数据（示例）
 */
function migrateRewardData() {
    try {
        // 检查是否有旧格式的奖励数据
        const oldDiamonds = localStorage.getItem('totalDiamonds');
        const oldSwords = localStorage.getItem('totalSwords');

        if (oldDiamonds || oldSwords) {
            console.log('🔄 迁移奖励数据...');

            // 转换为新格式（如果需要）
            // 这里可以添加具体的转换逻辑

            console.log('✅ 奖励数据迁移完成');
        }

    } catch (error) {
        console.warn('⚠️  奖励数据迁移失败:', error);
    }
}

/**
 * 迁移学习进度数据（示例）
 */
function migrateLearningProgress() {
    try {
        // 检查是否有旧格式的学习数据
        const oldProgress = localStorage.getItem('learningProgress');

        if (oldProgress) {
            console.log('🔄 迁移学习进度数据...');

            // 转换为新格式（如果需要）
            // 这里可以添加具体的转换逻辑

            console.log('✅ 学习进度数据迁移完成');
        }

    } catch (error) {
        console.warn('⚠️  学习进度数据迁移失败:', error);
    }
}

/**
 * 获取应用版本
 */
function getAppVersion() {
    try {
        // 从构建信息或配置中获取版本
        if (typeof CONFIG !== 'undefined' && CONFIG.ACTIVATION) {
            return CONFIG.ACTIVATION.MIGRATION_VERSION || MIGRATION_CONFIG.MIGRATION_VERSION;
        }
        return MIGRATION_CONFIG.MIGRATION_VERSION;
    } catch (error) {
        return MIGRATION_CONFIG.MIGRATION_VERSION;
    }
}

/**
 * 初始化数据迁移系统
 */
function initializeMigration() {
    try {
        console.log('🔧 初始化数据迁移系统...');

        // 检查是否需要迁移
        if (checkMigrationNeeded()) {
            console.log('🔄 检测到需要数据迁移');

            // 延迟执行迁移，确保页面加载完成
            setTimeout(() => {
                performMigration();
            }, 1000);

        } else {
            console.log('✅ 数据迁移检查完成，无需迁移');
        }

        // 定期创建自动备份（每7天）
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% 概率，大约每10次检查创建1次备份
                createDataBackup('auto_backup');
            }
        }, 24 * 60 * 60 * 1000); // 24小时

    } catch (error) {
        console.error('❌ 初始化数据迁移系统失败:', error);
    }
}

/**
 * 手动触发备份（供调试使用）
 */
function manualBackup() {
    const backupKey = createDataBackup('manual_backup');
    if (backupKey) {
        showNotification('手动备份创建成功: ' + backupKey);
        return backupKey;
    } else {
        showNotification('手动备份创建失败', 'error');
        return null;
    }
}

/**
 * 手动触发恢复（供调试使用）
 */
function manualRestore(backupKey) {
    if (confirm(`确定要恢复备份 ${backupKey} 吗？当前数据将被覆盖。`)) {
        const success = restoreDataBackup(backupKey);
        if (success) {
            showNotification('备份恢复成功，请刷新页面');
            setTimeout(() => location.reload(), 1500);
        } else {
            showNotification('备份恢复失败', 'error');
        }
    }
}

// 导出函数供外部使用
window.DataMigration = {
    createBackup: createDataBackup,
    restoreBackup: restoreDataBackup,
    getBackupList: getBackupList,
    performMigration: performMigration,
    manualBackup: manualBackup,
    manualRestore: manualRestore,
    checkMigrationNeeded: checkMigrationNeeded
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMigration);
} else {
    // 如果已经加载完成，延迟执行以确保依赖项就绪
    setTimeout(initializeMigration, 100);
}

console.log('📦 数据迁移系统已加载');