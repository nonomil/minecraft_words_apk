const fs = require('fs');

// 需要修复的词库文件
const vocabFiles = [
  'js/vocabularies/stage/stage_kindergarten.js',
  'js/vocabularies/stage/stage_elementary_lower.js',
  'js/vocabularies/stage/stage_elementary_upper.js'
];

// 错误的图片链接
const badImageUrls = [
  'https://twemoji.maxcdn.com/v/latest/svg/1f4a0.svg',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
];

// 正确的图片链接映射
function getCorrectImageURL(word) {
  // 具体可想象的物体用Unsplash
  const concreteWords = [
    // 动物
    'dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'pig', 'sheep', 'duck', 'chicken', 'elephant', 'rabbit', 'bear', 'lion', 'tiger', 'monkey', 'snake', 'frog', 'butterfly', 'bee', 'spider',
    // 食物
    'bread', 'milk', 'water', 'juice', 'apple', 'banana', 'rice', 'meat', 'vegetable', 'egg', 'cheese', 'butter', 'salt', 'sugar',
    // 身体部位
    'head', 'eye', 'nose', 'mouth', 'ear', 'hand', 'foot', 'leg', 'arm', 'finger', 'tooth', 'hair', 'neck', 'shoulder', 'chest', 'back', 'stomach', 'knee', 'ankle', 'toe',
    // 交通工具
    'car', 'bus', 'train', 'plane', 'boat', 'bicycle', 'motorcycle', 'truck', 'taxi', 'subway',
    // 地点
    'school', 'home', 'park', 'zoo', 'museum', 'hospital', 'library', 'bank', 'store', 'farm', 'beach', 'mountain', 'river', 'forest',
    // 物品
    'book', 'pencil', 'paper', 'desk', 'chair', 'table', 'door', 'window', 'bag', 'shoe', 'hat', 'coat', 'shirt', 'pants',
    // 自然
    'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'wind', 'tree', 'flower', 'grass', 'mountain', 'river', 'sea', 'sky',
    // 其他具体物品
    'computer', 'television', 'telephone', 'camera', 'dictionary', 'encyclopedia', 'calendar', 'blackboard', 'whiteboard', 'scissors', 'marker', 'crayon', 'paint', 'brush'
  ];

  // 抽象概念用Emoji
  const abstractWords = [
    'think', 'learn', 'study', 'read', 'write', 'draw', 'paint', 'dance', 'sing', 'play', 'happy', 'sad', 'angry', 'surprised', 'excited', 'tired', 'hungry', 'thirsty',
    'proud', 'brave', 'kind', 'honest', 'helpful', 'friendly', 'polite', 'patient', 'freedom', 'justice', 'peace', 'love', 'hope', 'dream', 'goal', 'plan', 'team', 'friend',
    'experiment', 'observation', 'hypothesis', 'conclusion', 'energy', 'force', 'gravity', 'magnetism', 'music', 'art', 'poetry', 'story', 'painting', 'sculpture',
    'internet', 'email', 'video', 'radio', 'time', 'space', 'number', 'color', 'shape', 'size', 'sound', 'light',
    'morning', 'afternoon', 'evening', 'night', 'week', 'month', 'year', 'season', 'yesterday', 'today', 'tomorrow', 'hot', 'cold', 'warm', 'wet', 'dry', 'fast', 'slow',
    'homework', 'classmate', 'test', 'science', 'english', 'chinese', 'vocabulary', 'pronunciation', 'grammar', 'sentence', 'paragraph', 'fraction', 'decimal', 'percentage', 'geometry', 'algebra', 'equation', 'graph', 'chart'
  ];

  if (concreteWords.includes(word.toLowerCase())) {
    return {
      filename: `${word}.jpg`,
      url: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop`,
      type: "Concept Image"
    };
  } else if (abstractWords.includes(word.toLowerCase())) {
    // 根据词义选择合适的Emoji
    const emojiMap = {
      'think': { filename: 'think.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f914.svg', type: 'Emoji' },
      'happy': { filename: 'happy.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f60a.svg', type: 'Emoji' },
      'sad': { filename: 'sad.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f622.svg', type: 'Emoji' },
      'angry': { filename: 'angry.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f621.svg', type: 'Emoji' },
      'love': { filename: 'love.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/2764.svg', type: 'Emoji' },
      'friend': { filename: 'friend.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg', type: 'Emoji' },
      'music': { filename: 'music.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f3b5.svg', type: 'Emoji' },
      'book': { filename: 'book.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg', type: 'Emoji' },
      'sun': { filename: 'sun.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/2600.svg', type: 'Emoji' },
      'moon': { filename: 'moon.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f315.svg', type: 'Emoji' },
      'star': { filename: 'star.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/2b50.svg', type: 'Emoji' },
      'cloud': { filename: 'cloud.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/2601.svg', type: 'Emoji' },
      'rain': { filename: 'rain.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f327.svg', type: 'Emoji' },
      'snow': { filename: 'snow.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/2744.svg', type: 'Emoji' },
      'wind': { filename: 'wind.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f32c.svg', type: 'Emoji' },
      'hot': { filename: 'hot.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f525.svg', type: 'Emoji' },
      'cold': { filename: 'cold.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f976.svg', type: 'Emoji' },
      'fast': { filename: 'fast.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f3c3.svg', type: 'Emoji' },
      'slow': { filename: 'slow.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f422.svg', type: 'Emoji' },
      'homework': { filename: 'homework.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4dd.svg', type: 'Emoji' },
      'school': { filename: 'school.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f3eb.svg', type: 'Emoji' },
      'book': { filename: 'book.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg', type: 'Emoji' },
      'pencil': { filename: 'pencil.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/270f.svg', type: 'Emoji' },
      'paper': { filename: 'paper.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4c4.svg', type: 'Emoji' },
      'computer': { filename: 'computer.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4bb.svg', type: 'Emoji' },
      'television': { filename: 'television.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4fa.svg', type: 'Emoji' },
      'telephone': { filename: 'telephone.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/260e.svg', type: 'Emoji' },
      'camera': { filename: 'camera.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4f7.svg', type: 'Emoji' }
    };

    return emojiMap[word.toLowerCase()] || {
      filename: `${word}.svg`,
      url: 'https://twemoji.maxcdn.com/v/latest/svg/1f4ad.svg',
      type: 'Emoji'
    };
  } else {
    // 默认处理
    return {
      filename: `${word}.jpg`,
      url: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop`,
      type: "Concept Image"
    };
  }
}

// 修复单个词库文件
function fixVocabFile(filePath) {
  console.log(`修复文件: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.log(`文件不存在: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fixedCount = 0;

  // 修复错误的图片链接
  badImageUrls.forEach(badUrl => {
    // 查找包含错误URL的词汇项
    const regex = new RegExp(`({\\s*"word":\\s*"([^"]+)"[\\s\\S]*?"url":\\s*"${badUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?})`, 'g');

    content = content.replace(regex, (match, fullMatch, word) => {
      const correctImage = getCorrectImageURL(word);
      const newImageUrl = `"filename": "${correctImage.filename}",\n        "url": "${correctImage.url}",\n        "type": "${correctImage.type}"`;

      // 替换imageURLs部分
      const imageUrlRegex = /"imageURLs":\s*\[\s*\{\s*"filename":\s*"[^"]*",\s*"url":\s*"[^"]*",\s*"type":\s*"[^"]*"\s*\}\s*\]/;
      const replacement = `"imageURLs": [
      {
        ${newImageUrl}
      }
    ]`;

      fixedCount++;
      return fullMatch.replace(imageUrlRegex, replacement);
    });
  });

  // 修复双URL参数问题
  content = content.replace(/w=\d+\?w=\d+/g, 'w=400');

  if (fixedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`修复了 ${fixedCount} 个错误的图片链接`);
  } else {
    console.log('未发现需要修复的链接');
  }
}

// 检查并修复所有词库文件
function fixAllVocabFiles() {
  vocabFiles.forEach(filePath => {
    fixVocabFile(filePath);
  });
}

// 验证修复结果
function validateFixes() {
  console.log('\n验证修复结果:');

  vocabFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    let badCount = 0;

    badImageUrls.forEach(badUrl => {
      const matches = content.match(new RegExp(badUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
      if (matches) {
        badCount += matches.length;
      }
    });

    if (badCount > 0) {
      console.log(`❌ ${filePath}: 仍有 ${badCount} 个错误链接`);
    } else {
      console.log(`✅ ${filePath}: 修复完成`);
    }
  });
}

// 主执行函数
function main() {
  console.log('开始修复图片链接...');
  fixAllVocabFiles();
  validateFixes();
  console.log('图片链接修复完成！');
}

// 执行
main();

