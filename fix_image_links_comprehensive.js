const fs = require('fs');

// 需要修复的词库文件
const vocabFiles = [
  'js/vocabularies/stage/stage_kindergarten.js',
  'js/vocabularies/stage/stage_elementary_lower.js',
  'js/vocabularies/stage/stage_elementary_upper.js'
];

// 错误的图片链接模式
const badUrlPatterns = [
  'https://twemoji.maxcdn.com/v/latest/svg/1f4a0.svg',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
  'w=1080?w=400',
  'w=1080\\?w=\\d+'
];

// 词汇到正确图片的映射
const wordToImageMap = {
  // 基础词汇
  'smile': { filename: 'smile.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f60a.svg', type: 'Emoji' },
  'kiss': { filename: 'kiss.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f617.svg', type: 'Emoji' },
  'look': { filename: 'look.jpg', url: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'hello': { filename: 'hello.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f44b.svg', type: 'Emoji' },
  'goodbye': { filename: 'goodbye.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f44b.svg', type: 'Emoji' },
  'thank': { filename: 'thank.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg', type: 'Emoji' },
  'please': { filename: 'please.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg', type: 'Emoji' },

  // 身体部位
  'head': { filename: 'head.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'eye': { filename: 'eye.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'nose': { filename: 'nose.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'mouth': { filename: 'mouth.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'ear': { filename: 'ear.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'hand': { filename: 'hand.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'foot': { filename: 'foot.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'leg': { filename: 'leg.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'arm': { filename: 'arm.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'finger': { filename: 'finger.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },

  // 动物
  'dog': { filename: 'dog.jpg', url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'cat': { filename: 'cat.jpg', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'bird': { filename: 'bird.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'fish': { filename: 'fish.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'horse': { filename: 'horse.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'cow': { filename: 'cow.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'pig': { filename: 'pig.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'sheep': { filename: 'sheep.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'chicken': { filename: 'chicken.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'duck': { filename: 'duck.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },

  // 食物
  'bread': { filename: 'bread.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'milk': { filename: 'milk.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'water': { filename: 'water.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'juice': { filename: 'juice.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'apple': { filename: 'apple.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'banana': { filename: 'banana.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },

  // 家庭成员
  'father': { filename: 'father.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'mother': { filename: 'mother.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'brother': { filename: 'brother.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'sister': { filename: 'sister.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'baby': { filename: 'baby.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'grandfather': { filename: 'grandfather.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },
  'grandmother': { filename: 'grandmother.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop', type: 'Concept Image' },

  // 颜色
  'red': { filename: 'red.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f534.svg', type: 'Emoji' },
  'blue': { filename: 'blue.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f535.svg', type: 'Emoji' },
  'green': { filename: 'green.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f7e2.svg', type: 'Emoji' },
  'yellow': { filename: 'yellow.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f7e1.svg', type: 'Emoji' },
  'orange': { filename: 'orange.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f7e0.svg', type: 'Emoji' },
  'purple': { filename: 'purple.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f7e3.svg', type: 'Emoji' },
  'pink': { filename: 'pink.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f7e4.svg', type: 'Emoji' },
  'black': { filename: 'black.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/26ab.svg', type: 'Emoji' },
  'white': { filename: 'white.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/26aa.svg', type: 'Emoji' },

  // 数字
  'one': { filename: 'one.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/31-20e3.svg', type: 'Emoji' },
  'two': { filename: 'two.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/32-20e3.svg', type: 'Emoji' },
  'three': { filename: 'three.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/33-20e3.svg', type: 'Emoji' },
  'four': { filename: 'four.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/34-20e3.svg', type: 'Emoji' },
  'five': { filename: 'five.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/35-20e3.svg', type: 'Emoji' },
  'six': { filename: 'six.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/36-20e3.svg', type: 'Emoji' },
  'seven': { filename: 'seven.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/37-20e3.svg', type: 'Emoji' },
  'eight': { filename: 'eight.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/38-20e3.svg', type: 'Emoji' },
  'nine': { filename: 'nine.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/39-20e3.svg', type: 'Emoji' },
  'ten': { filename: 'ten.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f51f.svg', type: 'Emoji' },

  // 默认图片
  'default': { filename: 'default.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4ad.svg', type: 'Emoji' }
};

// 获取正确的图片URL
function getCorrectImageURL(word) {
  const normalizedWord = word.toLowerCase().trim();
  return wordToImageMap[normalizedWord] || wordToImageMap['default'];
}

// 修复单个词库文件
function fixVocabFile(filePath) {
  console.log(`\n修复文件: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.log(`文件不存在: ${filePath}`);
    return 0;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fixedCount = 0;
  let processedWords = new Set();

  // 查找所有词汇项
  const wordRegex = /{\s*"word":\s*"([^"]+)"/g;
  let match;

  while ((match = wordRegex.exec(content)) !== null) {
    const word = match[1];

    // 跳过已处理的词汇
    if (processedWords.has(word)) continue;
    processedWords.add(word);

    // 查找对应的imageURLs部分
    const wordStart = match.index;
    const imageUrlStart = content.indexOf('"imageURLs":', wordStart);

    if (imageUrlStart !== -1) {
      const imageUrlEnd = content.indexOf(']', imageUrlStart) + 1;

      if (imageUrlEnd > imageUrlStart) {
        const imageUrlSection = content.substring(imageUrlStart, imageUrlEnd);

        // 检查是否包含错误的URL
        let hasBadUrl = false;
        badUrlPatterns.forEach(pattern => {
          if (imageUrlSection.includes(pattern.replace(/\\/g, ''))) {
            hasBadUrl = true;
          }
        });

        if (hasBadUrl || imageUrlSection.includes('1f4a0.svg')) {
          // 获取正确的图片
          const correctImage = getCorrectImageURL(word);

          // 构建新的imageURLs部分
          const newImageUrlSection = `"imageURLs": [
      {
        "filename": "${correctImage.filename}",
        "url": "${correctImage.url}",
        "type": "${correctImage.type}"
      }
    ]`;

          // 替换
          content = content.substring(0, imageUrlStart) + newImageUrlSection + content.substring(imageUrlEnd);
          fixedCount++;
        }
      }
    }
  }

  if (fixedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`修复了 ${fixedCount} 个错误的图片链接`);
  } else {
    console.log('未发现需要修复的链接');
  }

  return fixedCount;
}

// 验证修复结果
function validateFixes() {
  console.log('\n=== 验证修复结果 ===');

  vocabFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    let badCount = 0;
    let totalWords = 0;

    // 统计词汇总数
    const wordMatches = content.match(/"word":\s*"[^"]+"/g);
    if (wordMatches) {
      totalWords = wordMatches.length;
    }

    // 检查错误链接
    badUrlPatterns.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.replace(/\\/g, ''), 'g'));
      if (matches) {
        badCount += matches.length;
      }
    });

    // 检查1f4a0.svg
    const emojiMatches = content.match(/1f4a0\.svg/g);
    if (emojiMatches) {
      badCount += emojiMatches.length;
    }

    if (badCount > 0) {
      console.log(`❌ ${filePath}: 仍有 ${badCount} 个错误链接 (${totalWords} 个词汇)`);
    } else {
      console.log(`✅ ${filePath}: 修复完成 (${totalWords} 个词汇)`);
    }
  });
}

// 主执行函数
function main() {
  console.log('开始全面修复图片链接...');

  let totalFixed = 0;
  vocabFiles.forEach(filePath => {
    totalFixed += fixVocabFile(filePath);
  });

  console.log(`\n总共修复了 ${totalFixed} 个错误的图片链接`);

  validateFixes();

  console.log('\n图片链接修复完成！');
}

// 执行
main();
