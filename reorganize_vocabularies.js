const fs = require('fs');

// 不适合小学生的词汇列表
const inappropriateWords = [
  // 文艺复兴相关
  'renaissance', 'baroque', 'classicism', 'romanticism', 'impressionism',
  'expressionism', 'surrealism', 'cubism', 'abstraction', 'minimalism',

  // 哲学相关
  'philosophy', 'psychology', 'sociology', 'anthropology', 'metaphysics',
  'epistemology', 'ethics', 'aesthetics', 'logic', 'rhetoric', 'hermeneutics',
  'semiotics', 'structuralism', 'postmodernism',

  // 复杂科学概念
  'thermodynamics', 'electromagnetism', 'optics', 'acoustics', 'mechanics',
  'astronomy', 'astrophysics', 'cosmology', 'paleontology', 'archaeology',
  'quantum', 'relativity', 'evolution', 'genetics', 'biotechnology',
  'nanotechnology', 'artificial intelligence', 'robotics', 'cybernetics',
  'bioinformatics',

  // 复杂数学概念
  'calculus', 'trigonometry', 'probability', 'topology', 'number theory',
  'set theory', 'group theory', 'linear algebra', 'differential equations',
  'complex analysis', 'analysis', 'synthesis', 'theorem', 'proof', 'axiom',
  'postulate', 'corollary', 'lemma', 'conjecture',

  // 复杂社会概念
  'ideology', 'paradigm', 'methodology', 'ontology', 'phenomenology',
  'capitalism', 'socialism', 'communism', 'fascism', 'liberalism',
  'conservatism', 'feminism', 'environmentalism', 'humanism',

  // 其他不适合的词汇
  'thermodynamics', 'electromagnetism', 'optics', 'acoustics', 'mechanics',
  'astronomy', 'astrophysics', 'cosmology', 'paleontology', 'archaeology'
];

// 适合幼儿园的词汇分类
const kindergartenCategories = {
  basic: ['smile', 'kiss', 'look', 'hello', 'goodbye', 'thank you', 'please'],
  body: ['head', 'eye', 'nose', 'mouth', 'ear', 'hand', 'foot', 'leg', 'arm', 'finger', 'tooth', 'hair'],
  family: ['father', 'mother', 'brother', 'sister', 'baby', 'grandfather', 'grandmother'],
  food: ['bread', 'milk', 'water', 'juice', 'apple', 'banana', 'rice', 'meat', 'vegetable'],
  animal: ['dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'pig', 'sheep', 'chicken', 'duck'],
  color: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'black', 'white'],
  number: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
  action: ['walk', 'run', 'jump', 'sit', 'stand', 'sleep', 'eat', 'drink', 'play', 'sing']
};

// 适合小学低年级的词汇分类
const elementaryLowerCategories = {
  time: ['morning', 'afternoon', 'evening', 'night', 'week', 'month', 'year', 'season', 'yesterday', 'today', 'tomorrow'],
  place: ['home', 'school', 'park', 'zoo', 'museum', 'hospital', 'library', 'bank', 'store', 'farm'],
  transport: ['car', 'bus', 'train', 'plane', 'boat', 'bicycle', 'motorcycle', 'truck'],
  job: ['teacher', 'doctor', 'nurse', 'police', 'farmer', 'cook', 'driver'],
  weather: ['sun', 'moon', 'rain', 'snow', 'cloud', 'wind', 'hot', 'cold', 'warm'],
  emotion: ['happy', 'sad', 'angry', 'surprised', 'excited', 'tired', 'hungry', 'thirsty'],
  math: ['add', 'subtract', 'multiply', 'divide', 'equal', 'circle', 'square', 'triangle', 'rectangle'],
  science: ['plant', 'seed', 'root', 'stem', 'grow', 'water', 'soil', 'sunlight', 'temperature']
};

// 适合小学高年级的词汇分类
const elementaryUpperCategories = {
  advanced_action: ['think', 'learn', 'study', 'read', 'write', 'draw', 'paint', 'dance', 'sing', 'play'],
  advanced_emotion: ['proud', 'brave', 'kind', 'honest', 'helpful', 'friendly', 'polite', 'patient'],
  advanced_concept: ['freedom', 'justice', 'peace', 'love', 'hope', 'dream', 'goal', 'plan', 'team', 'friend'],
  advanced_science: ['experiment', 'observation', 'hypothesis', 'conclusion', 'energy', 'force', 'gravity', 'magnetism'],
  advanced_math: ['fraction', 'decimal', 'percentage', 'geometry', 'algebra', 'equation', 'graph', 'chart'],
  advanced_social: ['government', 'citizen', 'election', 'culture', 'tradition', 'heritage', 'cooperation'],
  advanced_art: ['music', 'art', 'poetry', 'story', 'painting', 'sculpture', 'photography', 'film'],
  advanced_technology: ['computer', 'internet', 'email', 'video', 'camera', 'telephone', 'radio', 'television']
};

// 生成正确的图片URL
function getCorrectImageURL(word, category) {
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
    'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'wind', 'tree', 'flower', 'grass', 'mountain', 'river', 'sea', 'sky'
  ];

  // 抽象概念用Emoji
  const abstractWords = [
    'think', 'learn', 'study', 'read', 'write', 'draw', 'paint', 'dance', 'sing', 'play', 'happy', 'sad', 'angry', 'surprised', 'excited', 'tired', 'hungry', 'thirsty',
    'proud', 'brave', 'kind', 'honest', 'helpful', 'friendly', 'polite', 'patient', 'freedom', 'justice', 'peace', 'love', 'hope', 'dream', 'goal', 'plan', 'team', 'friend',
    'experiment', 'observation', 'hypothesis', 'conclusion', 'energy', 'force', 'gravity', 'magnetism', 'music', 'art', 'poetry', 'story', 'painting', 'sculpture',
    'computer', 'internet', 'email', 'video', 'camera', 'telephone', 'radio', 'television', 'time', 'space', 'number', 'color', 'shape', 'size', 'sound', 'light',
    'morning', 'afternoon', 'evening', 'night', 'week', 'month', 'year', 'season', 'yesterday', 'today', 'tomorrow', 'hot', 'cold', 'warm', 'wet', 'dry', 'fast', 'slow'
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
      'moon': { filename: 'moon.svg', url: 'https://twemoji.maxcdn.com/v/latest/svg/1f315.svg', type: 'Emoji' }
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

// 从幼儿园词库中提取词汇
function extractKindergartenVocabularies() {
  const kindergartenFiles = [
    'kindergarten_1_basic.js',
    'kindergarten_2_study.js',
    'kindergarten_3_nature.js',
    'kindergarten_4_communication.js',
    'kindergarten_5_daily.js',
    'kindergarten_6_general.js',
    'kindergarten_general_extended.js',
    'kindergarten_learning_nature.js',
    'kindergarten_life_communication.js',
    'kindergarten_life_communication_expanded.js'
  ];

  const allKindergartenWords = [];

  kindergartenFiles.forEach(filename => {
    try {
      const filePath = `js/vocabularies/kindergarten/${filename}`;
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const variableName = filename.replace('.js', '').toUpperCase().replace(/-/g, '_');

        // 提取变量内容
        const regex = new RegExp(`const ${variableName} = \\[([\\s\\S]*?)\\];`);
        const match = content.match(regex);

        if (match) {
          try {
            // 简单的提取数组内容
            const arrayContent = '[' + match[1] + ']';
            const words = JSON.parse(arrayContent.replace(/'/g, '"'));
            allKindergartenWords.push(...words);
          } catch (e) {
            console.log(`无法解析 ${filename}: ${e.message}`);
          }
        }
      }
    } catch (e) {
      console.log(`处理 ${filename} 时出错: ${e.message}`);
    }
  });

  return allKindergartenWords;
}

// 清理和重组小学高年级词库
function reorganizeElementaryUpperVocabulary() {
  const filePath = 'js/vocabularies/stage/stage_elementary_upper.js';

  if (!fs.existsSync(filePath)) {
    console.log('小学高年级词库文件不存在');
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // 提取现有词汇
  const existingWords = [];
  const wordMatches = content.match(/{\s*"word":\s*"([^"]+)"/g);

  if (wordMatches) {
    wordMatches.forEach(match => {
      const wordMatch = match.match(/"word":\s*"([^"]+)"/);
      if (wordMatch) {
        existingWords.push(wordMatch[1]);
      }
    });
  }

  // 过滤掉不合适的词汇
  const filteredWords = existingWords.filter(word =>
    !inappropriateWords.includes(word.toLowerCase())
  );

  console.log(`原有词汇: ${existingWords.length}, 过滤后: ${filteredWords.length}`);

  // 创建新的小学高年级词库
  const newUpperWords = [];

  // 添加适合小学高年级的词汇
  Object.keys(elementaryUpperCategories).forEach(category => {
    elementaryUpperCategories[category].forEach(word => {
      if (!newUpperWords.find(w => w.word === word)) {
        const imageURL = getCorrectImageURL(word, category);
        newUpperWords.push({
          word: word,
          standardized: word,
          chinese: getChineseTranslation(word),
          phonetic: getPhonetic(word),
          phrase: getPhrase(word),
          phraseTranslation: getPhraseTranslation(word),
          difficulty: 'intermediate',
          category: category.replace('advanced_', ''),
          stage: 'elementary_upper',
          imageURLs: [imageURL]
        });
      }
    });
  });

  // 保留一些适合的原有词汇
  const suitableExistingWords = ['homework', 'classmate', 'supermarket', 'hospital', 'countryside', 'blackboard', 'calendar', 'test', 'science', 'principal', 'english', 'chinese', 'vocabulary', 'pronunciation', 'grammar', 'sentence', 'paragraph', 'dictionary', 'encyclopedia'];

  suitableExistingWords.forEach(word => {
    if (filteredWords.includes(word)) {
      const imageURL = getCorrectImageURL(word, 'school');
      newUpperWords.push({
        word: word,
        standardized: word,
        chinese: getChineseTranslation(word),
        phonetic: getPhonetic(word),
        phrase: getPhrase(word),
        phraseTranslation: getPhraseTranslation(word),
        difficulty: 'intermediate',
        category: 'school',
        stage: 'elementary_upper',
        imageURLs: [imageURL]
      });
    }
  });

  // 生成新的文件内容
  const wordsJson = newUpperWords.map(word => JSON.stringify(word, null, 2)).join(',\n  ');

  const newContent = `// 小学高年级词汇库 - 适合小学生学习的词汇
// Elementary Upper Grade Vocabulary - Age-appropriate words for elementary students

const STAGE_ELEMENTARY_UPPER = [
  ${wordsJson}
];

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = STAGE_ELEMENTARY_UPPER;
} else if (typeof window !== 'undefined') {
  window.STAGE_ELEMENTARY_UPPER = STAGE_ELEMENTARY_UPPER;
}`;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`小学高年级词库重组完成，共 ${newUpperWords.length} 个词汇`);
}

// 中英翻译映射
function getChineseTranslation(word) {
  const translations = {
    'homework': '家庭作业',
    'classmate': '同学',
    'supermarket': '超市',
    'hospital': '医院',
    'countryside': '乡村',
    'blackboard': '黑板',
    'calendar': '日历',
    'test': '考试',
    'science': '科学',
    'principal': '校长',
    'english': '英语',
    'chinese': '中文',
    'vocabulary': '词汇',
    'pronunciation': '发音',
    'grammar': '语法',
    'sentence': '句子',
    'paragraph': '段落',
    'dictionary': '字典',
    'encyclopedia': '百科全书',
    'think': '思考',
    'learn': '学习',
    'study': '学习',
    'read': '阅读',
    'write': '写作',
    'draw': '绘画',
    'paint': '绘画',
    'dance': '跳舞',
    'sing': '唱歌',
    'play': '玩耍',
    'proud': '骄傲的',
    'brave': '勇敢的',
    'kind': '善良的',
    'honest': '诚实的',
    'helpful': '乐于助人的',
    'friendly': '友好的',
    'polite': '有礼貌的',
    'patient': '耐心的',
    'freedom': '自由',
    'justice': '正义',
    'peace': '和平',
    'love': '爱',
    'hope': '希望',
    'dream': '梦想',
    'goal': '目标',
    'plan': '计划',
    'team': '团队',
    'friend': '朋友',
    'experiment': '实验',
    'observation': '观察',
    'hypothesis': '假设',
    'conclusion': '结论',
    'energy': '能量',
    'force': '力',
    'gravity': '重力',
    'magnetism': '磁性',
    'fraction': '分数',
    'decimal': '小数',
    'percentage': '百分比',
    'geometry': '几何',
    'algebra': '代数',
    'equation': '方程式',
    'graph': '图表',
    'chart': '图表',
    'government': '政府',
    'citizen': '公民',
    'election': '选举',
    'culture': '文化',
    'tradition': '传统',
    'heritage': '遗产',
    'cooperation': '合作',
    'music': '音乐',
    'art': '艺术',
    'poetry': '诗歌',
    'story': '故事',
    'painting': '绘画',
    'sculpture': '雕塑',
    'photography': '摄影',
    'film': '电影',
    'computer': '电脑',
    'internet': '互联网',
    'email': '电子邮件',
    'video': '视频',
    'camera': '相机',
    'telephone': '电话',
    'radio': '收音机',
    'television': '电视'
  };

  return translations[word] || word;
}

// 音标映射
function getPhonetic(word) {
  const phonetics = {
    'homework': '/ˈhoʊmwɜːrk/',
    'classmate': '/ˈklæsmeɪt/',
    'supermarket': '/ˈsuːpərˌmɑːrkət/',
    'hospital': '/ˈhɑːspɪtəl/',
    'countryside': '/ˈkʌntriˌsaɪd/',
    'blackboard': '/ˈblækbɔːrd/',
    'calendar': '/ˈkæləndər/',
    'test': '/tɛst/',
    'science': '/ˈsaɪəns/',
    'principal': '/ˈprɪnsəpəl/',
    'english': '/ˈɪŋɡlɪʃ/',
    'chinese': '/tʃaɪˈniːz/',
    'vocabulary': '/vəˈkæbjəˌleri/',
    'pronunciation': '/prəˌnʌnsiˈeɪʃən/',
    'grammar': '/ˈɡræmər/',
    'sentence': '/ˈsɛntəns/',
    'paragraph': '/ˈpærəˌɡræf/',
    'dictionary': '/ˈdɪkʃəˌneri/',
    'encyclopedia': '/ɪnˌsaɪkləˈpiːdiə/',
    'think': '/θɪŋk/',
    'learn': '/lɜːrn/',
    'study': '/ˈstʌdi/',
    'read': '/riːd/',
    'write': '/raɪt/',
    'draw': '/drɔː/',
    'paint': '/peɪnt/',
    'dance': '/dæns/',
    'sing': '/sɪŋ/',
    'play': '/pleɪ/',
    'proud': '/praʊd/',
    'brave': '/breɪv/',
    'kind': '/kaɪnd/',
    'honest': '/ˈɑːnɪst/',
    'helpful': '/ˈhelpfəl/',
    'friendly': '/ˈfrendli/',
    'polite': '/pəˈlaɪt/',
    'patient': '/ˈpeɪʃənt/',
    'freedom': '/ˈfriːdəm/',
    'justice': '/ˈdʒʌstɪs/',
    'peace': '/piːs/',
    'love': '/lʌv/',
    'hope': '/hoʊp/',
    'dream': '/driːm/',
    'goal': '/ɡoʊl/',
    'plan': '/plæn/',
    'team': '/tiːm/',
    'friend': '/frend/',
    'experiment': '/ɪkˈsperɪmənt/',
    'observation': '/ˌɑːbzərˈveɪʃən/',
    'hypothesis': '/haɪˈpɑːθəsɪs/',
    'conclusion': '/kənˈkluːʒən/',
    'energy': '/ˈenərdʒi/',
    'force': '/fɔːrs/',
    'gravity': '/ˈɡrævəti/',
    'magnetism': '/ˈmæɡnətɪzəm/',
    'fraction': '/ˈfrækʃən/',
    'decimal': '/ˈdesɪməl/',
    'percentage': '/pərˈsentɪdʒ/',
    'geometry': '/dʒiˈɑːmətri/',
    'algebra': '/ˈældʒəbrə/',
    'equation': '/ɪˈkweɪʒən/',
    'graph': '/ɡræf/',
    'chart': '/tʃɑːrt/',
    'government': '/ˈɡʌvərnmənt/',
    'citizen': '/ˈsɪtɪzən/',
    'election': '/ɪˈlekʃən/',
    'culture': '/ˈkʌltʃər/',
    'tradition': '/trəˈdɪʃən/',
    'heritage': '/ˈherɪtɪdʒ/',
    'cooperation': '/koʊˌɑːpəˈreɪʃən/',
    'music': '/ˈmjuzɪk/',
    'art': '/ɑːrt/',
    'poetry': '/ˈpoʊətri/',
    'story': '/ˈstɔːri/',
    'painting': '/ˈpeɪntɪŋ/',
    'sculpture': '/ˈskʌlptʃər/',
    'photography': '/fəˈtɑːɡrəfi/',
    'film': '/fɪlm/',
    'computer': '/kəmˈpjuːtər/',
    'internet': '/ˈɪntərnet/',
    'email': '/ˈiːmeɪl/',
    'video': '/ˈvɪdioʊ/',
    'camera': '/ˈkæmərə/',
    'telephone': '/ˈteləfoʊn/',
    'radio': '/ˈreɪdioʊ/',
    'television': '/ˈteləvɪʒən/'
  };

  return phonetics[word] || `/${word}/`;
}

// 短语映射
function getPhrase(word) {
  const phrases = {
    'homework': 'Do homework',
    'classmate': 'My classmate',
    'supermarket': 'Go to supermarket',
    'hospital': 'Visit hospital',
    'countryside': 'Beautiful countryside',
    'blackboard': 'Write on blackboard',
    'calendar': 'Check calendar',
    'test': 'Take a test',
    'science': 'Study science',
    'principal': 'Meet principal',
    'english': 'Speak English',
    'chinese': 'Learn Chinese',
    'vocabulary': 'Learn vocabulary',
    'pronunciation': 'Practice pronunciation',
    'grammar': 'Study grammar',
    'sentence': 'Write sentence',
    'paragraph': 'Read paragraph',
    'dictionary': 'Use dictionary',
    'encyclopedia': 'Read encyclopedia',
    'think': 'Think carefully',
    'learn': 'Learn new things',
    'study': 'Study hard',
    'read': 'Read books',
    'write': 'Write letters',
    'draw': 'Draw pictures',
    'paint': 'Paint canvas',
    'dance': 'Dance happily',
    'sing': 'Sing songs',
    'play': 'Play games',
    'proud': 'Feel proud',
    'brave': 'Be brave',
    'kind': 'Be kind',
    'honest': 'Be honest',
    'helpful': 'Be helpful',
    'friendly': 'Be friendly',
    'polite': 'Be polite',
    'patient': 'Be patient',
    'freedom': 'Love freedom',
    'justice': 'Seek justice',
    'peace': 'Want peace',
    'love': 'Share love',
    'hope': 'Have hope',
    'dream': 'Chase dreams',
    'goal': 'Set goals',
    'plan': 'Make plans',
    'team': 'Join team',
    'friend': 'Make friends',
    'experiment': 'Do experiment',
    'observation': 'Make observation',
    'hypothesis': 'Form hypothesis',
    'conclusion': 'Draw conclusion',
    'energy': 'Use energy',
    'force': 'Apply force',
    'gravity': 'Fight gravity',
    'magnetism': 'Study magnetism',
    'fraction': 'Learn fraction',
    'decimal': 'Use decimal',
    'percentage': 'Calculate percentage',
    'geometry': 'Study geometry',
    'algebra': 'Solve algebra',
    'equation': 'Solve equation',
    'graph': 'Draw graph',
    'chart': 'Make chart',
    'government': 'Trust government',
    'citizen': 'Good citizen',
    'election': 'Vote election',
    'culture': 'Learn culture',
    'tradition': 'Keep tradition',
    'heritage': 'Protect heritage',
    'cooperation': 'Work cooperation',
    'music': 'Listen music',
    'art': 'Create art',
    'poetry': 'Write poetry',
    'story': 'Tell story',
    'painting': 'View painting',
    'sculpture': 'See sculpture',
    'photography': 'Take photography',
    'film': 'Watch film',
    'computer': 'Use computer',
    'internet': 'Browse internet',
    'email': 'Send email',
    'video': 'Watch video',
    'camera': 'Use camera',
    'telephone': 'Call telephone',
    'radio': 'Listen radio',
    'television': 'Watch television'
  };

  return phrases[word] || `${word} example`;
}

// 短语翻译映射
function getPhraseTranslation(word) {
  const translations = {
    'homework': '做家庭作业',
    'classmate': '我的同学',
    'supermarket': '去超市',
    'hospital': '参观医院',
    'countryside': '美丽的乡村',
    'blackboard': '在黑板上写字',
    'calendar': '查看日历',
    'test': '参加考试',
    'science': '学习科学',
    'principal': '见校长',
    'english': '说英语',
    'chinese': '学中文',
    'vocabulary': '学习词汇',
    'pronunciation': '练习发音',
    'grammar': '学习语法',
    'sentence': '写句子',
    'paragraph': '阅读段落',
    'dictionary': '使用字典',
    'encyclopedia': '阅读百科全书',
    'think': '仔细思考',
    'learn': '学习新事物',
    'study': '努力学习',
    'read': '读书',
    'write': '写信',
    'draw': '画画',
    'paint': '画画',
    'dance': '快乐地跳舞',
    'sing': '唱歌',
    'play': '玩游戏',
    'proud': '感到骄傲',
    'brave': '勇敢',
    'kind': '善良',
    'honest': '诚实',
    'helpful': '乐于助人',
    'friendly': '友好',
    'polite': '有礼貌',
    'patient': '耐心',
    'freedom': '热爱自由',
    'justice': '追求正义',
    'peace': '渴望和平',
    'love': '分享爱',
    'hope': '有希望',
    'dream': '追逐梦想',
    'goal': '设定目标',
    'plan': '制定计划',
    'team': '加入团队',
    'friend': '交朋友',
    'experiment': '做实验',
    'observation': '进行观察',
    'hypothesis': '形成假设',
    'conclusion': '得出结论',
    'energy': '使用能量',
    'force': '施加力',
    'gravity': '对抗重力',
    'magnetism': '研究磁性',
    'fraction': '学习分数',
    'decimal': '使用小数',
    'percentage': '计算百分比',
    'geometry': '学习几何',
    'algebra': '解代数',
    'equation': '解方程式',
    'graph': '绘制图表',
    'chart': '制作图表',
    'government': '信任政府',
    'citizen': '好公民',
    'election': '选举投票',
    'culture': '学习文化',
    'tradition': '保持传统',
    'heritage': '保护遗产',
    'cooperation': '合作工作',
    'music': '听音乐',
    'art': '创造艺术',
    'poetry': '写诗歌',
    'story': '讲故事',
    'painting': '欣赏绘画',
    'sculpture': '观看雕塑',
    'photography': '拍摄摄影',
    'film': '观看电影',
    'computer': '使用电脑',
    'internet': '浏览互联网',
    'email': '发送邮件',
    'video': '观看视频',
    'camera': '使用相机',
    'telephone': '打电话',
    'radio': '听收音机',
    'television': '看电视'
  };

  return translations[word] || `${word} 示例`;
}

// 主执行函数
function main() {
  console.log('开始重组词库...');

  // 1. 重组小学高年级词库
  reorganizeElementaryUpperVocabulary();

  // 2. 提取幼儿园词汇作为参考
  console.log('提取幼儿园词汇...');
  const kindergartenWords = extractKindergartenVocabularies();
  console.log(`共提取到 ${kindergartenWords.length} 个幼儿园词汇`);

  console.log('词库重组完成！');
}

// 执行
main();

