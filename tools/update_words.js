const fs = require('fs');
const path = require('path');

// 配置
const DATA_DIR = path.join(__dirname, '../data');
const UNSPLASH_BASE_URL = 'https://images.unsplash.com/photo-';
const UNSPLASH_SIZE = 'w=400';

// 读取JSON文件
function readJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return null;
    }
}

// 写入JSON文件
function writeJsonFile(filePath, data) {
    try {
        const content = JSON.stringify(data, null, 4);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully wrote to ${filePath}`);
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error.message);
    }
}

// 生成Unsplash图片URL
function generateImageUrl() {
    const randomId = Math.floor(Math.random() * 1000000000);
    return `${UNSPLASH_BASE_URL}${randomId}?${UNSPLASH_SIZE}`;
}

// 更新单词文件
function updateWordFiles() {
    // 读取所有分类信息
    const categories = readJsonFile(path.join(DATA_DIR, 'all_categories.json'));
    if (!categories) return;

    // 读取主单词文件
    const mainWords = readJsonFile(path.join(DATA_DIR, 'wordlist.json'));
    if (!mainWords) return;

    // 为每个单词添加分类和图片
    const updatedMainWords = mainWords.map(word => {
        // 如果单词没有图片，添加一个
        if (!word.image) {
            word.image = generateImageUrl();
        }
        return word;
    });

    // 更新主文件
    writeJsonFile(path.join(DATA_DIR, 'wordlist.json'), updatedMainWords);

    // 更新每个分类文件
    categories.forEach(category => {
        const categoryFile = path.join(DATA_DIR, category.file);
        const categoryWords = readJsonFile(categoryFile);
        if (categoryWords) {
            // 更新分类文件中的单词
            const updatedCategoryWords = categoryWords.map(word => {
                // 如果单词没有图片，添加一个
                if (!word.image) {
                    word.image = generateImageUrl();
                }
                return word;
            });
            writeJsonFile(categoryFile, updatedCategoryWords);
            
            // 更新分类信息中的单词数量
            category.count = updatedCategoryWords.length;
        }
    });

    // 更新分类信息文件
    writeJsonFile(path.join(DATA_DIR, 'all_categories.json'), categories);
}

// 运行更新
updateWordFiles(); 