// Kindergarten Pack: 学习自然 (Learning & Nature)
// 包含：学习用品、学校生活、动物、植物、天气、自然环境等
// 目标：支持幼儿学习认知和自然探索

const KINDERGARTEN_LEARNING_NATURE = [
  // === 学习用品 ===
  {
    "word": "book",
    "standardized": "book",
    "chinese": "书",
    "phonetic": "/bʊk/",
    "phrase": "Read a book",
    "phraseTranslation": "读一本书",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "book.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pencil",
    "standardized": "pencil",
    "chinese": "铅笔",
    "phonetic": "/ˈpɛnsəl/",
    "phrase": "Write with pencil",
    "phraseTranslation": "用铅笔写字",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "pencil.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/270f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pen",
    "standardized": "pen",
    "chinese": "钢笔",
    "phonetic": "/pɛn/",
    "phrase": "Blue pen",
    "phraseTranslation": "蓝色钢笔",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "pen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "paper",
    "standardized": "paper",
    "chinese": "纸",
    "phonetic": "/ˈpeɪpər/",
    "phrase": "White paper",
    "phraseTranslation": "白纸",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "paper.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "eraser",
    "standardized": "eraser",
    "chinese": "橡皮擦",
    "phonetic": "/ɪˈreɪsər/",
    "phrase": "Use eraser",
    "phraseTranslation": "使用橡皮擦",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "eraser.jpg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f642.svg",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "ruler",
    "standardized": "ruler",
    "chinese": "尺子",
    "phonetic": "/ˈruːlər/",
    "phrase": "Measure with ruler",
    "phraseTranslation": "用尺子测量",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "ruler.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4cf.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "scissors",
    "standardized": "scissors",
    "chinese": "剪刀",
    "phonetic": "/ˈsɪzərz/",
    "phrase": "Cut with scissors",
    "phraseTranslation": "用剪刀剪",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "scissors.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2702.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "crayon",
    "standardized": "crayon",
    "chinese": "蜡笔",
    "phonetic": "/ˈkreɪɒn/",
    "phrase": "Color with crayon",
    "phraseTranslation": "用蜡笔涂色",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "crayon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 学校生活 ===
  {
    "word": "school",
    "standardized": "school",
    "chinese": "学校",
    "phonetic": "/skuːl/",
    "phrase": "Go to school",
    "phraseTranslation": "去学校",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "school.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3eb.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "classroom",
    "standardized": "classroom",
    "chinese": "教室",
    "phonetic": "/ˈklæsˌruːm/",
    "phrase": "Clean classroom",
    "phraseTranslation": "干净的教室",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "classroom.jpg",
        "url": "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "teacher",
    "standardized": "teacher",
    "chinese": "老师",
    "phonetic": "/ˈtiːtʃər/",
    "phrase": "My teacher",
    "phraseTranslation": "我的老师",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "teacher.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f3eb.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "student",
    "standardized": "student",
    "chinese": "学生",
    "phonetic": "/ˈstuːdənt/",
    "phrase": "Good student",
    "phraseTranslation": "好学生",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "student.jpg",
        "url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "desk",
    "standardized": "desk",
    "chinese": "桌子",
    "phonetic": "/dɛsk/",
    "phrase": "Sit at desk",
    "phraseTranslation": "坐在桌子旁",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "desk.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4ba.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "chair",
    "standardized": "chair",
    "chinese": "椅子",
    "phonetic": "/tʃɛr/",
    "phrase": "Sit on chair",
    "phraseTranslation": "坐在椅子上",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "chair.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa91.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "blackboard",
    "standardized": "blackboard",
    "chinese": "黑板",
    "phonetic": "/ˈblækˌbɔːrd/",
    "phrase": "Write on blackboard",
    "phraseTranslation": "在黑板上写字",
    "difficulty": "intermediate",
    "category": "school",
    "imageURLs": [
      {
        "filename": "blackboard.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4cb.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 动物 ===
  {
    "word": "cat",
    "standardized": "cat",
    "chinese": "猫",
    "phonetic": "/kæt/",
    "phrase": "Cute cat",
    "phraseTranslation": "可爱的猫",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "cat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f431.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dog",
    "standardized": "dog",
    "chinese": "狗",
    "phonetic": "/dɔːɡ/",
    "phrase": "Friendly dog",
    "phraseTranslation": "友好的狗",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "dog.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f436.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rabbit",
    "standardized": "rabbit",
    "chinese": "兔子",
    "phonetic": "/ˈræbɪt/",
    "phrase": "White rabbit",
    "phraseTranslation": "白兔子",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "rabbit.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f430.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bird",
    "standardized": "bird",
    "chinese": "鸟",
    "phonetic": "/bɜːrd/",
    "phrase": "Flying bird",
    "phraseTranslation": "飞翔的鸟",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "bird.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f426.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fish",
    "standardized": "fish",
    "chinese": "鱼",
    "phonetic": "/fɪʃ/",
    "phrase": "Swimming fish",
    "phraseTranslation": "游泳的鱼",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "fish.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "elephant",
    "standardized": "elephant",
    "chinese": "大象",
    "phonetic": "/ˈɛlɪfənt/",
    "phrase": "Big elephant",
    "phraseTranslation": "大象",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "elephant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f418.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "monkey",
    "standardized": "monkey",
    "chinese": "猴子",
    "phonetic": "/ˈmʌŋki/",
    "phrase": "Funny monkey",
    "phraseTranslation": "有趣的猴子",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "monkey.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f412.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lion",
    "standardized": "lion",
    "chinese": "狮子",
    "phonetic": "/ˈlaɪən/",
    "phrase": "Strong lion",
    "phraseTranslation": "强壮的狮子",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "lion.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f981.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tiger",
    "standardized": "tiger",
    "chinese": "老虎",
    "phonetic": "/ˈtaɪɡər/",
    "phrase": "Orange tiger",
    "phraseTranslation": "橙色的老虎",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "tiger.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f405.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bear",
    "standardized": "bear",
    "chinese": "熊",
    "phonetic": "/bɛr/",
    "phrase": "Brown bear",
    "phraseTranslation": "棕熊",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "bear.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f43b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "panda",
    "standardized": "panda",
    "chinese": "熊猫",
    "phonetic": "/ˈpændə/",
    "phrase": "Black and white panda",
    "phraseTranslation": "黑白熊猫",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "panda.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f43c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "butterfly",
    "standardized": "butterfly",
    "chinese": "蝴蝶",
    "phonetic": "/ˈbʌtərˌflaɪ/",
    "phrase": "Beautiful butterfly",
    "phraseTranslation": "美丽的蝴蝶",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "butterfly.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 植物 ===
  {
    "word": "flower",
    "standardized": "flower",
    "chinese": "花",
    "phonetic": "/ˈflaʊər/",
    "phrase": "Beautiful flower",
    "phraseTranslation": "美丽的花",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "flower.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tree",
    "standardized": "tree",
    "chinese": "树",
    "phonetic": "/triː/",
    "phrase": "Big tree",
    "phraseTranslation": "大树",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "tree.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f333.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grass",
    "standardized": "grass",
    "chinese": "草",
    "phonetic": "/ɡræs/",
    "phrase": "Green grass",
    "phraseTranslation": "绿草",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "grass.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "leaf",
    "standardized": "leaf",
    "chinese": "叶子",
    "phonetic": "/liːf/",
    "phrase": "Green leaf",
    "phraseTranslation": "绿叶子",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "leaf.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f343.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rose",
    "standardized": "rose",
    "chinese": "玫瑰",
    "phonetic": "/roʊz/",
    "phrase": "Red rose",
    "phraseTranslation": "红玫瑰",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "rose.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f339.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sunflower",
    "standardized": "sunflower",
    "chinese": "向日葵",
    "phonetic": "/ˈsʌnˌflaʊər/",
    "phrase": "Yellow sunflower",
    "phraseTranslation": "黄向日葵",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "sunflower.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 天气与自然 ===
  {
    "word": "sun",
    "standardized": "sun",
    "chinese": "太阳",
    "phonetic": "/sʌn/",
    "phrase": "Bright sun",
    "phraseTranslation": "明亮的太阳",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "sun.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2600.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "moon",
    "standardized": "moon",
    "chinese": "月亮",
    "phonetic": "/muːn/",
    "phrase": "Round moon",
    "phraseTranslation": "圆月亮",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "moon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f319.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "star",
    "standardized": "star",
    "chinese": "星星",
    "phonetic": "/stɑːr/",
    "phrase": "Twinkle star",
    "phraseTranslation": "闪闪发光的星星",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "star.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b50.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cloud",
    "standardized": "cloud",
    "chinese": "云",
    "phonetic": "/klaʊd/",
    "phrase": "White cloud",
    "phraseTranslation": "白云",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "cloud.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2601.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rain",
    "standardized": "rain",
    "chinese": "雨",
    "phonetic": "/reɪn/",
    "phrase": "Heavy rain",
    "phraseTranslation": "大雨",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "rain.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f327.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "snow",
    "standardized": "snow",
    "chinese": "雪",
    "phonetic": "/snoʊ/",
    "phrase": "White snow",
    "phraseTranslation": "白雪",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "snow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2744.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "wind",
    "standardized": "wind",
    "chinese": "风",
    "phonetic": "/wɪnd/",
    "phrase": "Strong wind",
    "phraseTranslation": "大风",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "wind.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f32c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rainbow",
    "standardized": "rainbow",
    "chinese": "彩虹",
    "phonetic": "/ˈreɪnˌboʊ/",
    "phrase": "Beautiful rainbow",
    "phraseTranslation": "美丽的彩虹",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "rainbow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f308.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 自然环境 ===
  {
    "word": "mountain",
    "standardized": "mountain",
    "chinese": "山",
    "phonetic": "/ˈmaʊntən/",
    "phrase": "High mountain",
    "phraseTranslation": "高山",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "mountain.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26f0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "river",
    "standardized": "river",
    "chinese": "河",
    "phonetic": "/ˈrɪvər/",
    "phrase": "Long river",
    "phraseTranslation": "长河",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "river.jpg",
        "url": "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "ocean",
    "standardized": "ocean",
    "chinese": "海洋",
    "phonetic": "/ˈoʊʃən/",
    "phrase": "Blue ocean",
    "phraseTranslation": "蓝色海洋",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "ocean.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "beach",
    "standardized": "beach",
    "chinese": "海滩",
    "phonetic": "/biːtʃ/",
    "phrase": "Sandy beach",
    "phraseTranslation": "沙滩",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "beach.jpg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f642.svg",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "forest",
    "standardized": "forest",
    "chinese": "森林",
    "phonetic": "/ˈfɔːrəst/",
    "phrase": "Green forest",
    "phraseTranslation": "绿色森林",
    "difficulty": "intermediate",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "forest.jpg",
        "url": "https://images.unsplash.com/photo-1552083375-1447ce886485?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "rock",
    "standardized": "rock",
    "chinese": "岩石",
    "phonetic": "/rɑːk/",
    "phrase": "Hard rock",
    "phraseTranslation": "坚硬的岩石",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "rock.jpg",
        "url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },

  // === 形状与数学概念 ===
  {
    "word": "circle",
    "standardized": "circle",
    "chinese": "圆形",
    "phonetic": "/ˈsɜːrkəl/",
    "phrase": "Draw a circle",
    "phraseTranslation": "画一个圆形",
    "difficulty": "basic",
    "category": "shape",
    "imageURLs": [
      {
        "filename": "circle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f7e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "square",
    "standardized": "square",
    "chinese": "正方形",
    "phonetic": "/skwɛr/",
    "phrase": "Red square",
    "phraseTranslation": "红正方形",
    "difficulty": "basic",
    "category": "shape",
    "imageURLs": [
      {
        "filename": "square.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f7e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "triangle",
    "standardized": "triangle",
    "chinese": "三角形",
    "phonetic": "/ˈtraɪˌæŋɡəl/",
    "phrase": "Blue triangle",
    "phraseTranslation": "蓝三角形",
    "difficulty": "basic",
    "category": "shape",
    "imageURLs": [
      {
        "filename": "triangle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f53a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "big",
    "standardized": "big",
    "chinese": "大的",
    "phonetic": "/bɪɡ/",
    "phrase": "Big elephant",
    "phraseTranslation": "大象",
    "difficulty": "basic",
    "category": "size",
    "imageURLs": [
      {
        "filename": "big.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f418.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "small",
    "standardized": "small",
    "chinese": "小的",
    "phonetic": "/smɔːl/",
    "phrase": "Small mouse",
    "phraseTranslation": "小老鼠",
    "difficulty": "basic",
    "category": "size",
    "imageURLs": [
      {
        "filename": "small.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f401.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "long",
    "standardized": "long",
    "chinese": "长的",
    "phonetic": "/lɔːŋ/",
    "phrase": "Long snake",
    "phraseTranslation": "长蛇",
    "difficulty": "basic",
    "category": "size",
    "imageURLs": [
      {
        "filename": "long.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f40d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "short",
    "standardized": "short",
    "chinese": "短的",
    "phonetic": "/ʃɔːrt/",
    "phrase": "Short pencil",
    "phraseTranslation": "短铅笔",
    "difficulty": "basic",
    "category": "size",
    "imageURLs": [
      {
        "filename": "short.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/270f.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多动物 ===
  {
    "word": "horse",
    "standardized": "horse",
    "chinese": "马",
    "phonetic": "/hɔːrs/",
    "phrase": "Fast horse",
    "phraseTranslation": "快马",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "horse.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f40e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cow",
    "standardized": "cow",
    "chinese": "奶牛",
    "phonetic": "/kaʊ/",
    "phrase": "Black and white cow",
    "phraseTranslation": "黑白奶牛",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "cow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f404.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pig",
    "standardized": "pig",
    "chinese": "猪",
    "phonetic": "/pɪɡ/",
    "phrase": "Pink pig",
    "phraseTranslation": "粉色的猪",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "pig.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f437.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sheep",
    "standardized": "sheep",
    "chinese": "绵羊",
    "phonetic": "/ʃiːp/",
    "phrase": "White sheep",
    "phraseTranslation": "白绵羊",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "sheep.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f411.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "goat",
    "standardized": "goat",
    "chinese": "山羊",
    "phonetic": "/ɡoʊt/",
    "phrase": "Mountain goat",
    "phraseTranslation": "山羊",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "goat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f410.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "duck",
    "standardized": "duck",
    "chinese": "鸭子",
    "phonetic": "/dʌk/",
    "phrase": "Yellow duck",
    "phraseTranslation": "黄鸭子",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "duck.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f986.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "chicken",
    "standardized": "chicken",
    "chinese": "小鸡",
    "phonetic": "/ˈtʃɪkən/",
    "phrase": "Little chicken",
    "phraseTranslation": "小鸡",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "chicken.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f414.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rooster",
    "standardized": "rooster",
    "chinese": "公鸡",
    "phonetic": "/ˈruːstər/",
    "phrase": "Rooster crows",
    "phraseTranslation": "公鸡打鸣",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "rooster.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f413.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "frog",
    "standardized": "frog",
    "chinese": "青蛙",
    "phonetic": "/frɔːɡ/",
    "phrase": "Green frog",
    "phraseTranslation": "绿青蛙",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "frog.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f438.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "turtle",
    "standardized": "turtle",
    "chinese": "乌龟",
    "phonetic": "/ˈtɜːrtəl/",
    "phrase": "Slow turtle",
    "phraseTranslation": "慢乌龟",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "turtle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f422.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "snake",
    "standardized": "snake",
    "chinese": "蛇",
    "phonetic": "/sneɪk/",
    "phrase": "Long snake",
    "phraseTranslation": "长蛇",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "snake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f40d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "spider",
    "standardized": "spider",
    "chinese": "蜘蛛",
    "phonetic": "/ˈspaɪdər/",
    "phrase": "Small spider",
    "phraseTranslation": "小蜘蛛",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "spider.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f577.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bee",
    "standardized": "bee",
    "chinese": "蜜蜂",
    "phonetic": "/biː/",
    "phrase": "Busy bee",
    "phraseTranslation": "忙碌的蜜蜂",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "bee.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ant",
    "standardized": "ant",
    "chinese": "蚂蚁",
    "phonetic": "/ænt/",
    "phrase": "Working ant",
    "phraseTranslation": "工作的蚂蚁",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "ant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ladybug",
    "standardized": "ladybug",
    "chinese": "瓢虫",
    "phonetic": "/ˈleɪdiˌbʌɡ/",
    "phrase": "Red ladybug",
    "phraseTranslation": "红瓢虫",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "ladybug.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dragonfly",
    "standardized": "dragonfly",
    "chinese": "蜻蜓",
    "phonetic": "/ˈdræɡənˌflaɪ/",
    "phrase": "Flying dragonfly",
    "phraseTranslation": "飞翔的蜻蜓",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "dragonfly.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多植物 ===
  {
    "word": "cactus",
    "standardized": "cactus",
    "chinese": "仙人掌",
    "phonetic": "/ˈkæktəs/",
    "phrase": "Green cactus",
    "phraseTranslation": "绿仙人掌",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "cactus.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f335.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "mushroom",
    "standardized": "mushroom",
    "chinese": "蘑菇",
    "phonetic": "/ˈmʌʃruːm/",
    "phrase": "Red mushroom",
    "phraseTranslation": "红蘑菇",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "mushroom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f344.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bamboo",
    "standardized": "bamboo",
    "chinese": "竹子",
    "phonetic": "/bæmˈbuː/",
    "phrase": "Tall bamboo",
    "phraseTranslation": "高竹子",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "bamboo.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f38d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pine tree",
    "standardized": "pine tree",
    "chinese": "松树",
    "phonetic": "/paɪn triː/",
    "phrase": "Tall pine tree",
    "phraseTranslation": "高松树",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "pine_tree.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "palm tree",
    "standardized": "palm tree",
    "chinese": "棕榈树",
    "phonetic": "/pɑːm triː/",
    "phrase": "Tropical palm tree",
    "phraseTranslation": "热带棕榈树",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "palm_tree.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f334.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "seed",
    "standardized": "seed",
    "chinese": "种子",
    "phonetic": "/siːd/",
    "phrase": "Plant a seed",
    "phraseTranslation": "种一颗种子",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "seed.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f331.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "root",
    "standardized": "root",
    "chinese": "根",
    "phonetic": "/ruːt/",
    "phrase": "Tree root",
    "phraseTranslation": "树根",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "root.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fab4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "branch",
    "standardized": "branch",
    "chinese": "树枝",
    "phonetic": "/bræntʃ/",
    "phrase": "Tree branch",
    "phraseTranslation": "树枝",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "branch.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f333.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 天气与季节 ===
  {
    "word": "spring",
    "standardized": "spring",
    "chinese": "春天",
    "phonetic": "/sprɪŋ/",
    "phrase": "Beautiful spring",
    "phraseTranslation": "美丽的春天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "spring.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "summer",
    "standardized": "summer",
    "chinese": "夏天",
    "phonetic": "/ˈsʌmər/",
    "phrase": "Hot summer",
    "phraseTranslation": "炎热的夏天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "summer.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2600.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "autumn",
    "standardized": "autumn",
    "chinese": "秋天",
    "phonetic": "/ˈɔːtəm/",
    "phrase": "Colorful autumn",
    "phraseTranslation": "多彩的秋天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "autumn.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f342.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "winter",
    "standardized": "winter",
    "chinese": "冬天",
    "phonetic": "/ˈwɪntər/",
    "phrase": "Cold winter",
    "phraseTranslation": "寒冷的冬天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "winter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2744.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "storm",
    "standardized": "storm",
    "chinese": "暴风雨",
    "phonetic": "/stɔːrm/",
    "phrase": "Strong storm",
    "phraseTranslation": "强烈的暴风雨",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "storm.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26c8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lightning",
    "standardized": "lightning",
    "chinese": "闪电",
    "phonetic": "/ˈlaɪtnɪŋ/",
    "phrase": "Bright lightning",
    "phraseTranslation": "明亮的闪电",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "lightning.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26a1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "thunder",
    "standardized": "thunder",
    "chinese": "雷声",
    "phonetic": "/ˈθʌndər/",
    "phrase": "Loud thunder",
    "phraseTranslation": "响亮的雷声",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "thunder.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f329.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 学科词汇 ===
  {
    "word": "science",
    "standardized": "science",
    "chinese": "科学",
    "phonetic": "/ˈsaɪəns/",
    "phrase": "Learn science",
    "phraseTranslation": "学习科学",
    "difficulty": "intermediate",
    "category": "subject",
    "imageURLs": [
      {
        "filename": "science.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "art",
    "standardized": "art",
    "chinese": "美术",
    "phonetic": "/ɑːrt/",
    "phrase": "Create art",
    "phraseTranslation": "创作美术",
    "difficulty": "basic",
    "category": "subject",
    "imageURLs": [
      {
        "filename": "art.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3a8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "music",
    "standardized": "music",
    "chinese": "音乐",
    "phonetic": "/ˈmjuːzɪk/",
    "phrase": "Listen to music",
    "phraseTranslation": "听音乐",
    "difficulty": "basic",
    "category": "subject",
    "imageURLs": [
      {
        "filename": "music.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3b5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "English",
    "standardized": "English",
    "chinese": "英语",
    "phonetic": "/ˈɪŋɡlɪʃ/",
    "phrase": "Learn English",
    "phraseTranslation": "学习英语",
    "difficulty": "intermediate",
    "category": "subject",
    "imageURLs": [
      {
        "filename": "english.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f1ec-1f1e7.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "Chinese",
    "standardized": "Chinese",
    "chinese": "中文",
    "phonetic": "/tʃaɪˈniːz/",
    "phrase": "Speak Chinese",
    "phraseTranslation": "说中文",
    "difficulty": "intermediate",
    "category": "subject",
    "imageURLs": [
      {
        "filename": "chinese.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f1e8-1f1f3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "math",
    "standardized": "math",
    "chinese": "数学",
    "phonetic": "/mæθ/",
    "phrase": "Study math",
    "phraseTranslation": "学习数学",
    "difficulty": "basic",
    "category": "subject",
    "imageURLs": [
      {
        "filename": "math.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d0.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多学习用品 ===
  {
    "word": "backpack",
    "standardized": "backpack",
    "chinese": "背包",
    "phonetic": "/ˈbækˌpæk/",
    "phrase": "School backpack",
    "phraseTranslation": "学校背包",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "backpack.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f392.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "notebook",
    "standardized": "notebook",
    "chinese": "笔记本",
    "phonetic": "/ˈnoʊtˌbʊk/",
    "phrase": "Write in notebook",
    "phraseTranslation": "在笔记本上写字",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "notebook.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "calculator",
    "standardized": "calculator",
    "chinese": "计算器",
    "phonetic": "/ˈkælkjəˌleɪtər/",
    "phrase": "Use calculator",
    "phraseTranslation": "使用计算器",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "calculator.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f5a9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "globe",
    "standardized": "globe",
    "chinese": "地球仪",
    "phonetic": "/ɡloʊb/",
    "phrase": "Spin the globe",
    "phraseTranslation": "转动地球仪",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "globe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "microscope",
    "standardized": "microscope",
    "chinese": "显微镜",
    "phonetic": "/ˈmaɪkrəˌskoʊp/",
    "phrase": "Look through microscope",
    "phraseTranslation": "通过显微镜观察",
    "difficulty": "advanced",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "microscope.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "telescope",
    "standardized": "telescope",
    "chinese": "望远镜",
    "phonetic": "/ˈtɛləˌskoʊp/",
    "phrase": "Look through telescope",
    "phraseTranslation": "通过望远镜观察",
    "difficulty": "advanced",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "telescope.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多动物 ===
  {
    "word": "giraffe",
    "standardized": "giraffe",
    "chinese": "长颈鹿",
    "phonetic": "/dʒɪˈræf/",
    "phrase": "Tall giraffe",
    "phraseTranslation": "高大的长颈鹿",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "giraffe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f992.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "zebra",
    "standardized": "zebra",
    "chinese": "斑马",
    "phonetic": "/ˈziːbrə/",
    "phrase": "Striped zebra",
    "phraseTranslation": "有条纹的斑马",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "zebra.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f993.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "kangaroo",
    "standardized": "kangaroo",
    "chinese": "袋鼠",
    "phonetic": "/ˌkæŋɡəˈruː/",
    "phrase": "Jumping kangaroo",
    "phraseTranslation": "跳跃的袋鼠",
    "difficulty": "advanced",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "kangaroo.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f998.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "penguin",
    "standardized": "penguin",
    "chinese": "企鹅",
    "phonetic": "/ˈpɛŋɡwɪn/",
    "phrase": "Cute penguin",
    "phraseTranslation": "可爱的企鹅",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "penguin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f427.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dolphin",
    "standardized": "dolphin",
    "chinese": "海豚",
    "phonetic": "/ˈdɑːlfɪn/",
    "phrase": "Smart dolphin",
    "phraseTranslation": "聪明的海豚",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "dolphin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f42c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "whale",
    "standardized": "whale",
    "chinese": "鲸鱼",
    "phonetic": "/weɪl/",
    "phrase": "Big whale",
    "phraseTranslation": "大鲸鱼",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "whale.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f40b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shark",
    "standardized": "shark",
    "chinese": "鲨鱼",
    "phonetic": "/ʃɑːrk/",
    "phrase": "Swimming shark",
    "phraseTranslation": "游泳的鲨鱼",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "shark.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f988.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "octopus",
    "standardized": "octopus",
    "chinese": "章鱼",
    "phonetic": "/ˈɑːktəpəs/",
    "phrase": "Eight arms octopus",
    "phraseTranslation": "八条手臂的章鱼",
    "difficulty": "advanced",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "octopus.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f419.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "turtle",
    "standardized": "turtle",
    "chinese": "海龟",
    "phonetic": "/ˈtɜːrtəl/",
    "phrase": "Slow turtle",
    "phraseTranslation": "慢海龟",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "turtle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f422.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "frog",
    "standardized": "frog",
    "chinese": "青蛙",
    "phonetic": "/frɔːɡ/",
    "phrase": "Green frog",
    "phraseTranslation": "绿色青蛙",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "frog.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f438.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "snake",
    "standardized": "snake",
    "chinese": "蛇",
    "phonetic": "/sneɪk/",
    "phrase": "Long snake",
    "phraseTranslation": "长蛇",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "snake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f40d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lizard",
    "standardized": "lizard",
    "chinese": "蜥蜴",
    "phonetic": "/ˈlɪzərd/",
    "phrase": "Small lizard",
    "phraseTranslation": "小蜥蜴",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "lizard.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98e.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 昆虫 ===
  {
    "word": "butterfly",
    "standardized": "butterfly",
    "chinese": "蝴蝶",
    "phonetic": "/ˈbʌtərflaɪ/",
    "phrase": "Beautiful butterfly",
    "phraseTranslation": "美丽的蝴蝶",
    "difficulty": "intermediate",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "butterfly.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bee",
    "standardized": "bee",
    "chinese": "蜜蜂",
    "phonetic": "/biː/",
    "phrase": "Busy bee",
    "phraseTranslation": "忙碌的蜜蜂",
    "difficulty": "basic",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "bee.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ant",
    "standardized": "ant",
    "chinese": "蚂蚁",
    "phonetic": "/ænt/",
    "phrase": "Working ant",
    "phraseTranslation": "工作的蚂蚁",
    "difficulty": "basic",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "ant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "spider",
    "standardized": "spider",
    "chinese": "蜘蛛",
    "phonetic": "/ˈspaɪdər/",
    "phrase": "Web spider",
    "phraseTranslation": "结网的蜘蛛",
    "difficulty": "basic",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "spider.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f577.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ladybug",
    "standardized": "ladybug",
    "chinese": "瓢虫",
    "phonetic": "/ˈleɪdiˌbʌɡ/",
    "phrase": "Red ladybug",
    "phraseTranslation": "红瓢虫",
    "difficulty": "intermediate",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "ladybug.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dragonfly",
    "standardized": "dragonfly",
    "chinese": "蜻蜓",
    "phonetic": "/ˈdræɡənflaɪ/",
    "phrase": "Flying dragonfly",
    "phraseTranslation": "飞行的蜻蜓",
    "difficulty": "advanced",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "dragonfly.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多植物 ===
  {
    "word": "sunflower",
    "standardized": "sunflower",
    "chinese": "向日葵",
    "phonetic": "/ˈsʌnflaʊər/",
    "phrase": "Tall sunflower",
    "phraseTranslation": "高大的向日葵",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "sunflower.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rose",
    "standardized": "rose",
    "chinese": "玫瑰",
    "phonetic": "/roʊz/",
    "phrase": "Red rose",
    "phraseTranslation": "红玫瑰",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "rose.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f339.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tulip",
    "standardized": "tulip",
    "chinese": "郁金香",
    "phonetic": "/ˈtuːlɪp/",
    "phrase": "Beautiful tulip",
    "phraseTranslation": "美丽的郁金香",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "tulip.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f337.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "daisy",
    "standardized": "daisy",
    "chinese": "雏菊",
    "phonetic": "/ˈdeɪzi/",
    "phrase": "White daisy",
    "phraseTranslation": "白雏菊",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "daisy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grass",
    "standardized": "grass",
    "chinese": "草",
    "phonetic": "/ɡræs/",
    "phrase": "Green grass",
    "phraseTranslation": "绿草",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "grass.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "moss",
    "standardized": "moss",
    "chinese": "苔藓",
    "phonetic": "/mɔːs/",
    "phrase": "Soft moss",
    "phraseTranslation": "柔软的苔藓",
    "difficulty": "advanced",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "moss.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "mushroom",
    "standardized": "mushroom",
    "chinese": "蘑菇",
    "phonetic": "/ˈmʌʃruːm/",
    "phrase": "Red mushroom",
    "phraseTranslation": "红蘑菇",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "mushroom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f344.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cactus",
    "standardized": "cactus",
    "chinese": "仙人掌",
    "phonetic": "/ˈkæktəs/",
    "phrase": "Desert cactus",
    "phraseTranslation": "沙漠仙人掌",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "cactus.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f335.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 自然环境 ===
  {
    "word": "mountain",
    "standardized": "mountain",
    "chinese": "山",
    "phonetic": "/ˈmaʊntən/",
    "phrase": "High mountain",
    "phraseTranslation": "高山",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "mountain.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26f0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "river",
    "standardized": "river",
    "chinese": "河流",
    "phonetic": "/ˈrɪvər/",
    "phrase": "Flowing river",
    "phraseTranslation": "流淌的河流",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "river.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lake",
    "standardized": "lake",
    "chinese": "湖",
    "phonetic": "/leɪk/",
    "phrase": "Calm lake",
    "phraseTranslation": "平静的湖",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "lake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ocean",
    "standardized": "ocean",
    "chinese": "海洋",
    "phonetic": "/ˈoʊʃən/",
    "phrase": "Deep ocean",
    "phraseTranslation": "深海",
    "difficulty": "intermediate",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "ocean.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "beach",
    "standardized": "beach",
    "chinese": "海滩",
    "phonetic": "/biːtʃ/",
    "phrase": "Sandy beach",
    "phraseTranslation": "沙滩",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "beach.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "desert",
    "standardized": "desert",
    "chinese": "沙漠",
    "phonetic": "/ˈdɛzərt/",
    "phrase": "Hot desert",
    "phraseTranslation": "炎热的沙漠",
    "difficulty": "intermediate",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "desert.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3dc.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "forest",
    "standardized": "forest",
    "chinese": "森林",
    "phonetic": "/ˈfɔːrəst/",
    "phrase": "Green forest",
    "phraseTranslation": "绿色森林",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "forest.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "jungle",
    "standardized": "jungle",
    "chinese": "丛林",
    "phonetic": "/ˈdʒʌŋɡəl/",
    "phrase": "Dense jungle",
    "phraseTranslation": "茂密的丛林",
    "difficulty": "intermediate",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "jungle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f333.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cave",
    "standardized": "cave",
    "chinese": "洞穴",
    "phonetic": "/keɪv/",
    "phrase": "Dark cave",
    "phraseTranslation": "黑暗的洞穴",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "cave.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f573.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "volcano",
    "standardized": "volcano",
    "chinese": "火山",
    "phonetic": "/vɑːlˈkeɪnoʊ/",
    "phrase": "Active volcano",
    "phraseTranslation": "活火山",
    "difficulty": "advanced",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "volcano.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 天体 ===
  {
    "word": "earth",
    "standardized": "earth",
    "chinese": "地球",
    "phonetic": "/ɜːrθ/",
    "phrase": "Blue earth",
    "phraseTranslation": "蓝色地球",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "earth.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "planet",
    "standardized": "planet",
    "chinese": "行星",
    "phonetic": "/ˈplænət/",
    "phrase": "Red planet",
    "phraseTranslation": "红色行星",
    "difficulty": "intermediate",
    "category": "space",
    "imageURLs": [
      {
        "filename": "planet.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa90.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rocket",
    "standardized": "rocket",
    "chinese": "火箭",
    "phonetic": "/ˈrɑːkət/",
    "phrase": "Flying rocket",
    "phraseTranslation": "飞行的火箭",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "rocket.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f680.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "astronaut",
    "standardized": "astronaut",
    "chinese": "宇航员",
    "phonetic": "/ˈæstrənɔːt/",
    "phrase": "Brave astronaut",
    "phraseTranslation": "勇敢的宇航员",
    "difficulty": "advanced",
    "category": "space",
    "imageURLs": [
      {
        "filename": "astronaut.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f680.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 季节 ===
  {
    "word": "spring",
    "standardized": "spring",
    "chinese": "春天",
    "phonetic": "/sprɪŋ/",
    "phrase": "Beautiful spring",
    "phraseTranslation": "美丽的春天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "spring.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "summer",
    "standardized": "summer",
    "chinese": "夏天",
    "phonetic": "/ˈsʌmər/",
    "phrase": "Hot summer",
    "phraseTranslation": "炎热的夏天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "summer.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2600.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "autumn",
    "standardized": "autumn",
    "chinese": "秋天",
    "phonetic": "/ˈɔːtəm/",
    "phrase": "Colorful autumn",
    "phraseTranslation": "多彩的秋天",
    "difficulty": "intermediate",
    "category": "season",
    "imageURLs": [
      {
        "filename": "autumn.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f342.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "winter",
    "standardized": "winter",
    "chinese": "冬天",
    "phonetic": "/ˈwɪntər/",
    "phrase": "Cold winter",
    "phraseTranslation": "寒冷的冬天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "winter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2744.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多学习用品 ===
  {
    "word": "notebook",
    "standardized": "notebook",
    "chinese": "笔记本",
    "phonetic": "/ˈnoʊtbʊk/",
    "phrase": "Write in notebook",
    "phraseTranslation": "在笔记本上写字",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "notebook.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "marker",
    "standardized": "marker",
    "chinese": "记号笔",
    "phonetic": "/ˈmɑːrkər/",
    "phrase": "Colorful marker",
    "phraseTranslation": "彩色记号笔",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "marker.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "calculator",
    "standardized": "calculator",
    "chinese": "计算器",
    "phonetic": "/ˈkælkjəleɪtər/",
    "phrase": "Use calculator",
    "phraseTranslation": "使用计算器",
    "difficulty": "advanced",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "calculator.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ee.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "compass",
    "standardized": "compass",
    "chinese": "圆规",
    "phonetic": "/ˈkʌmpəs/",
    "phrase": "Draw with compass",
    "phraseTranslation": "用圆规画图",
    "difficulty": "advanced",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "compass.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ed.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "globe",
    "standardized": "globe",
    "chinese": "地球仪",
    "phonetic": "/ɡloʊb/",
    "phrase": "Spin the globe",
    "phraseTranslation": "转动地球仪",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "globe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "microscope",
    "standardized": "microscope",
    "chinese": "显微镜",
    "phonetic": "/ˈmaɪkrəskoʊp/",
    "phrase": "Look through microscope",
    "phraseTranslation": "通过显微镜观察",
    "difficulty": "advanced",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "microscope.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "telescope",
    "standardized": "telescope",
    "chinese": "望远镜",
    "phonetic": "/ˈtɛləskoʊp/",
    "phrase": "See stars with telescope",
    "phraseTranslation": "用望远镜看星星",
    "difficulty": "advanced",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "telescope.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 学校场所 ===
  {
    "word": "classroom",
    "standardized": "classroom",
    "chinese": "教室",
    "phonetic": "/ˈklæsruːm/",
    "phrase": "Study in classroom",
    "phraseTranslation": "在教室学习",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "classroom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3eb.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "laboratory",
    "standardized": "laboratory",
    "chinese": "实验室",
    "phonetic": "/ˈlæbrəˌtɔːri/",
    "phrase": "Science laboratory",
    "phraseTranslation": "科学实验室",
    "difficulty": "advanced",
    "category": "school",
    "imageURLs": [
      {
        "filename": "laboratory.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ea.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "gymnasium",
    "standardized": "gymnasium",
    "chinese": "体育馆",
    "phonetic": "/dʒɪmˈneɪziəm/",
    "phrase": "Play in gymnasium",
    "phraseTranslation": "在体育馆玩",
    "difficulty": "advanced",
    "category": "school",
    "imageURLs": [
      {
        "filename": "gymnasium.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cafeteria",
    "standardized": "cafeteria",
    "chinese": "食堂",
    "phonetic": "/ˌkæfəˈtɪriə/",
    "phrase": "Eat in cafeteria",
    "phraseTranslation": "在食堂吃饭",
    "difficulty": "advanced",
    "category": "school",
    "imageURLs": [
      {
        "filename": "cafeteria.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f37d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多海洋动物 ===
  {
    "word": "whale",
    "standardized": "whale",
    "chinese": "鲸鱼",
    "phonetic": "/weɪl/",
    "phrase": "Big whale",
    "phraseTranslation": "大鲸鱼",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "whale.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f40b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dolphin",
    "standardized": "dolphin",
    "chinese": "海豚",
    "phonetic": "/ˈdɑːlfɪn/",
    "phrase": "Smart dolphin",
    "phraseTranslation": "聪明的海豚",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "dolphin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f42c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shark",
    "standardized": "shark",
    "chinese": "鲨鱼",
    "phonetic": "/ʃɑːrk/",
    "phrase": "Scary shark",
    "phraseTranslation": "可怕的鲨鱼",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "shark.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f988.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "octopus",
    "standardized": "octopus",
    "chinese": "章鱼",
    "phonetic": "/ˈɑːktəpəs/",
    "phrase": "Eight arms octopus",
    "phraseTranslation": "八条腿的章鱼",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "octopus.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f419.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "jellyfish",
    "standardized": "jellyfish",
    "chinese": "水母",
    "phonetic": "/ˈdʒelifɪʃ/",
    "phrase": "Transparent jellyfish",
    "phraseTranslation": "透明的水母",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "jellyfish.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fabc.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "seahorse",
    "standardized": "seahorse",
    "chinese": "海马",
    "phonetic": "/ˈsiːhɔːrs/",
    "phrase": "Tiny seahorse",
    "phraseTranslation": "小海马",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "seahorse.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3ac.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "starfish",
    "standardized": "starfish",
    "chinese": "海星",
    "phonetic": "/ˈstɑːrfɪʃ/",
    "phrase": "Five arms starfish",
    "phraseTranslation": "五条腿的海星",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "starfish.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "crab",
    "standardized": "crab",
    "chinese": "螃蟹",
    "phonetic": "/kræb/",
    "phrase": "Sideways crab",
    "phraseTranslation": "横着走的螃蟹",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "crab.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f980.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多鸟类 ===
  {
    "word": "eagle",
    "standardized": "eagle",
    "chinese": "老鹰",
    "phonetic": "/ˈiːɡəl/",
    "phrase": "Flying eagle",
    "phraseTranslation": "飞翔的老鹰",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "eagle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f985.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "owl",
    "standardized": "owl",
    "chinese": "猫头鹰",
    "phonetic": "/aʊl/",
    "phrase": "Wise owl",
    "phraseTranslation": "智慧的猫头鹰",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "owl.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f989.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "parrot",
    "standardized": "parrot",
    "chinese": "鹦鹉",
    "phonetic": "/ˈpærət/",
    "phrase": "Colorful parrot",
    "phraseTranslation": "彩色的鹦鹉",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "parrot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f99c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "penguin",
    "standardized": "penguin",
    "chinese": "企鹅",
    "phonetic": "/ˈpeŋɡwɪn/",
    "phrase": "Waddling penguin",
    "phraseTranslation": "摇摆的企鹅",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "penguin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f427.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "flamingo",
    "standardized": "flamingo",
    "chinese": "火烈鸟",
    "phonetic": "/fləˈmɪŋɡoʊ/",
    "phrase": "Pink flamingo",
    "phraseTranslation": "粉色的火烈鸟",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "flamingo.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9a9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "peacock",
    "standardized": "peacock",
    "chinese": "孔雀",
    "phonetic": "/ˈpiːkɑːk/",
    "phrase": "Beautiful peacock",
    "phraseTranslation": "美丽的孔雀",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "peacock.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f99a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "swan",
    "standardized": "swan",
    "chinese": "天鹅",
    "phonetic": "/swɑːn/",
    "phrase": "Graceful swan",
    "phraseTranslation": "优雅的天鹅",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "swan.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9a2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hummingbird",
    "standardized": "hummingbird",
    "chinese": "蜂鸟",
    "phonetic": "/ˈhʌmɪŋbɜːrd/",
    "phrase": "Tiny hummingbird",
    "phraseTranslation": "小蜂鸟",
    "difficulty": "advanced",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "hummingbird.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f985.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多哺乳动物 ===
  {
    "word": "giraffe",
    "standardized": "giraffe",
    "chinese": "长颈鹿",
    "phonetic": "/dʒəˈræf/",
    "phrase": "Tall giraffe",
    "phraseTranslation": "高的长颈鹿",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "giraffe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f992.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "elephant",
    "standardized": "elephant",
    "chinese": "大象",
    "phonetic": "/ˈeləfənt/",
    "phrase": "Big elephant",
    "phraseTranslation": "大象",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "elephant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f418.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rhinoceros",
    "standardized": "rhinoceros",
    "chinese": "犀牛",
    "phonetic": "/raɪˈnɑːsərəs/",
    "phrase": "Horned rhinoceros",
    "phraseTranslation": "有角的犀牛",
    "difficulty": "advanced",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "rhinoceros.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hippo",
    "standardized": "hippo",
    "chinese": "河马",
    "phonetic": "/ˈhɪpoʊ/",
    "phrase": "Water hippo",
    "phraseTranslation": "水中的河马",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "hippo.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f99b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "zebra",
    "standardized": "zebra",
    "chinese": "斑马",
    "phonetic": "/ˈziːbrə/",
    "phrase": "Striped zebra",
    "phraseTranslation": "条纹斑马",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "zebra.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f993.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "kangaroo",
    "standardized": "kangaroo",
    "chinese": "袋鼠",
    "phonetic": "/ˌkæŋɡəˈruː/",
    "phrase": "Jumping kangaroo",
    "phraseTranslation": "跳跃的袋鼠",
    "difficulty": "intermediate",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "kangaroo.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f998.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "koala",
    "standardized": "koala",
    "chinese": "考拉",
    "phonetic": "/koʊˈɑːlə/",
    "phrase": "Sleepy koala",
    "phraseTranslation": "困倦的考拉",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "koala.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f428.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "panda",
    "standardized": "panda",
    "chinese": "熊猫",
    "phonetic": "/ˈpændə/",
    "phrase": "Cute panda",
    "phraseTranslation": "可爱的熊猫",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "panda.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f43c.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多植物 ===
  {
    "word": "cactus",
    "standardized": "cactus",
    "chinese": "仙人掌",
    "phonetic": "/ˈkæktəs/",
    "phrase": "Prickly cactus",
    "phraseTranslation": "多刺的仙人掌",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "cactus.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f335.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bamboo",
    "standardized": "bamboo",
    "chinese": "竹子",
    "phonetic": "/bæmˈbuː/",
    "phrase": "Tall bamboo",
    "phraseTranslation": "高竹子",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "bamboo.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f38d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "mushroom",
    "standardized": "mushroom",
    "chinese": "蘑菇",
    "phonetic": "/ˈmʌʃruːm/",
    "phrase": "Red mushroom",
    "phraseTranslation": "红蘑菇",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "mushroom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f344.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fern",
    "standardized": "fern",
    "chinese": "蕨类植物",
    "phonetic": "/fɜːrn/",
    "phrase": "Green fern",
    "phraseTranslation": "绿色蕨类",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "fern.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "moss",
    "standardized": "moss",
    "chinese": "苔藓",
    "phonetic": "/mɔːs/",
    "phrase": "Soft moss",
    "phraseTranslation": "柔软的苔藓",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "moss.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "algae",
    "standardized": "algae",
    "chinese": "藻类",
    "phonetic": "/ˈældʒiː/",
    "phrase": "Green algae",
    "phraseTranslation": "绿色藻类",
    "difficulty": "advanced",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "algae.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "vine",
    "standardized": "vine",
    "chinese": "藤蔓",
    "phonetic": "/vaɪn/",
    "phrase": "Climbing vine",
    "phraseTranslation": "攀爬的藤蔓",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "vine.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ivy",
    "standardized": "ivy",
    "chinese": "常春藤",
    "phonetic": "/ˈaɪvi/",
    "phrase": "Green ivy",
    "phraseTranslation": "绿色常春藤",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "ivy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多天气现象 ===
  {
    "word": "fog",
    "standardized": "fog",
    "chinese": "雾",
    "phonetic": "/fɔːɡ/",
    "phrase": "Thick fog",
    "phraseTranslation": "浓雾",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "fog.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f32b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "mist",
    "standardized": "mist",
    "chinese": "薄雾",
    "phonetic": "/mɪst/",
    "phrase": "Light mist",
    "phraseTranslation": "轻雾",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "mist.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f32b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dew",
    "standardized": "dew",
    "chinese": "露水",
    "phonetic": "/duː/",
    "phrase": "Morning dew",
    "phraseTranslation": "晨露",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "dew.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a7.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "frost",
    "standardized": "frost",
    "chinese": "霜",
    "phonetic": "/frɔːst/",
    "phrase": "White frost",
    "phraseTranslation": "白霜",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "frost.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2744.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hail",
    "standardized": "hail",
    "chinese": "冰雹",
    "phonetic": "/heɪl/",
    "phrase": "Falling hail",
    "phraseTranslation": "下冰雹",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "hail.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f328.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sleet",
    "standardized": "sleet",
    "chinese": "雨夹雪",
    "phonetic": "/sliːt/",
    "phrase": "Wet sleet",
    "phraseTranslation": "湿雨夹雪",
    "difficulty": "advanced",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "sleet.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f328.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "blizzard",
    "standardized": "blizzard",
    "chinese": "暴风雪",
    "phonetic": "/ˈblɪzərd/",
    "phrase": "Fierce blizzard",
    "phraseTranslation": "猛烈的暴风雪",
    "difficulty": "advanced",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "blizzard.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f328.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "humidity",
    "standardized": "humidity",
    "chinese": "湿度",
    "phonetic": "/hjuːˈmɪdəti/",
    "phrase": "High humidity",
    "phraseTranslation": "高湿度",
    "difficulty": "advanced",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "humidity.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a7.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多学习用品 ===
  {
    "word": "calculator",
    "standardized": "calculator",
    "chinese": "计算器",
    "phonetic": "/ˈkælkjəleɪtər/",
    "phrase": "Use calculator",
    "phraseTranslation": "使用计算器",
    "difficulty": "intermediate",
    "category": "school",
    "imageURLs": [
      {
        "filename": "calculator.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f5a9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "compass",
    "standardized": "compass",
    "chinese": "圆规",
    "phonetic": "/ˈkʌmpəs/",
    "phrase": "Drawing compass",
    "phraseTranslation": "画圆规",
    "difficulty": "intermediate",
    "category": "school",
    "imageURLs": [
      {
        "filename": "compass.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ed.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "protractor",
    "standardized": "protractor",
    "chinese": "量角器",
    "phonetic": "/proʊˈtræktər/",
    "phrase": "Measure angle protractor",
    "phraseTranslation": "测量角度的量角器",
    "difficulty": "advanced",
    "category": "school",
    "imageURLs": [
      {
        "filename": "protractor.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ed.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ruler",
    "standardized": "ruler",
    "chinese": "尺子",
    "phonetic": "/ˈruːlər/",
    "phrase": "Measure with ruler",
    "phraseTranslation": "用尺子测量",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "ruler.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4cf.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "stapler",
    "standardized": "stapler",
    "chinese": "订书机",
    "phonetic": "/ˈsteɪplər/",
    "phrase": "Staple papers",
    "phraseTranslation": "订文件",
    "difficulty": "intermediate",
    "category": "school",
    "imageURLs": [
      {
        "filename": "stapler.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "paperclip",
    "standardized": "paperclip",
    "chinese": "回形针",
    "phonetic": "/ˈpeɪpərklɪp/",
    "phrase": "Hold papers paperclip",
    "phraseTranslation": "用回形针夹文件",
    "difficulty": "intermediate",
    "category": "school",
    "imageURLs": [
      {
        "filename": "paperclip.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f587.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "binder",
    "standardized": "binder",
    "chinese": "活页夹",
    "phonetic": "/ˈbaɪndər/",
    "phrase": "Organize papers binder",
    "phraseTranslation": "用活页夹整理文件",
    "difficulty": "intermediate",
    "category": "school",
    "imageURLs": [
      {
        "filename": "binder.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "folder",
    "standardized": "folder",
    "chinese": "文件夹",
    "phonetic": "/ˈfoʊldər/",
    "phrase": "Keep papers folder",
    "phraseTranslation": "用文件夹保存文件",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "folder.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c1.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多昆虫 ===
  {
    "word": "butterfly",
    "standardized": "butterfly",
    "chinese": "蝴蝶",
    "phonetic": "/ˈbʌtərflaɪ/",
    "phrase": "Beautiful butterfly",
    "phraseTranslation": "美丽的蝴蝶",
    "difficulty": "basic",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "butterfly.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bee",
    "standardized": "bee",
    "chinese": "蜜蜂",
    "phonetic": "/biː/",
    "phrase": "Busy bee",
    "phraseTranslation": "忙碌的蜜蜂",
    "difficulty": "basic",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "bee.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ant",
    "standardized": "ant",
    "chinese": "蚂蚁",
    "phonetic": "/ænt/",
    "phrase": "Hardworking ant",
    "phraseTranslation": "勤劳的蚂蚁",
    "difficulty": "basic",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "ant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "spider",
    "standardized": "spider",
    "chinese": "蜘蛛",
    "phonetic": "/ˈspaɪdər/",
    "phrase": "Eight legs spider",
    "phraseTranslation": "八条腿的蜘蛛",
    "difficulty": "basic",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "spider.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f577.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ladybug",
    "standardized": "ladybug",
    "chinese": "瓢虫",
    "phonetic": "/ˈleɪdibʌɡ/",
    "phrase": "Red ladybug",
    "phraseTranslation": "红色瓢虫",
    "difficulty": "intermediate",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "ladybug.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f41e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dragonfly",
    "standardized": "dragonfly",
    "chinese": "蜻蜓",
    "phonetic": "/ˈdræɡənflaɪ/",
    "phrase": "Flying dragonfly",
    "phraseTranslation": "飞行的蜻蜓",
    "difficulty": "intermediate",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "dragonfly.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grasshopper",
    "standardized": "grasshopper",
    "chinese": "蚱蜢",
    "phonetic": "/ˈɡræshɑːpər/",
    "phrase": "Jumping grasshopper",
    "phraseTranslation": "跳跃的蚱蜢",
    "difficulty": "advanced",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "grasshopper.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f997.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cricket",
    "standardized": "cricket",
    "chinese": "蟋蟀",
    "phonetic": "/ˈkrɪkɪt/",
    "phrase": "Singing cricket",
    "phraseTranslation": "唱歌的蟋蟀",
    "difficulty": "intermediate",
    "category": "insect",
    "imageURLs": [
      {
        "filename": "cricket.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f997.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多植物 ===
  {
    "word": "tree",
    "standardized": "tree",
    "chinese": "树",
    "phonetic": "/triː/",
    "phrase": "Tall tree",
    "phraseTranslation": "高树",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "tree.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "flower",
    "standardized": "flower",
    "chinese": "花",
    "phonetic": "/ˈflaʊər/",
    "phrase": "Beautiful flower",
    "phraseTranslation": "美丽的花",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "flower.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grass",
    "standardized": "grass",
    "chinese": "草",
    "phonetic": "/ɡræs/",
    "phrase": "Green grass",
    "phraseTranslation": "绿草",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "grass.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "leaf",
    "standardized": "leaf",
    "chinese": "叶子",
    "phonetic": "/liːf/",
    "phrase": "Green leaf",
    "phraseTranslation": "绿叶",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "leaf.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "root",
    "standardized": "root",
    "chinese": "根",
    "phonetic": "/ruːt/",
    "phrase": "Deep root",
    "phraseTranslation": "深根",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "root.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "seed",
    "standardized": "seed",
    "chinese": "种子",
    "phonetic": "/siːd/",
    "phrase": "Plant seed",
    "phraseTranslation": "种植种子",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "seed.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f331.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "branch",
    "standardized": "branch",
    "chinese": "树枝",
    "phonetic": "/bræntʃ/",
    "phrase": "Tree branch",
    "phraseTranslation": "树枝",
    "difficulty": "basic",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "branch.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "trunk",
    "standardized": "trunk",
    "chinese": "树干",
    "phonetic": "/trʌŋk/",
    "phrase": "Thick trunk",
    "phraseTranslation": "粗树干",
    "difficulty": "intermediate",
    "category": "plant",
    "imageURLs": [
      {
        "filename": "trunk.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多天体 ===
  {
    "word": "sun",
    "standardized": "sun",
    "chinese": "太阳",
    "phonetic": "/sʌn/",
    "phrase": "Bright sun",
    "phraseTranslation": "明亮的太阳",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "sun.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2600.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "moon",
    "standardized": "moon",
    "chinese": "月亮",
    "phonetic": "/muːn/",
    "phrase": "Round moon",
    "phraseTranslation": "圆月亮",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "moon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f319.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "star",
    "standardized": "star",
    "chinese": "星星",
    "phonetic": "/stɑːr/",
    "phrase": "Twinkling star",
    "phraseTranslation": "闪烁的星星",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "star.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b50.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "planet",
    "standardized": "planet",
    "chinese": "行星",
    "phonetic": "/ˈplænɪt/",
    "phrase": "Big planet",
    "phraseTranslation": "大行星",
    "difficulty": "intermediate",
    "category": "space",
    "imageURLs": [
      {
        "filename": "planet.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "earth",
    "standardized": "earth",
    "chinese": "地球",
    "phonetic": "/ɜːrθ/",
    "phrase": "Our earth",
    "phraseTranslation": "我们的地球",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "earth.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sky",
    "standardized": "sky",
    "chinese": "天空",
    "phonetic": "/skaɪ/",
    "phrase": "Blue sky",
    "phraseTranslation": "蓝天",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "sky.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cloud",
    "standardized": "cloud",
    "chinese": "云",
    "phonetic": "/klaʊd/",
    "phrase": "White cloud",
    "phraseTranslation": "白云",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "cloud.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2601.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rainbow",
    "standardized": "rainbow",
    "chinese": "彩虹",
    "phonetic": "/ˈreɪnboʊ/",
    "phrase": "Colorful rainbow",
    "phraseTranslation": "彩色彩虹",
    "difficulty": "basic",
    "category": "space",
    "imageURLs": [
      {
        "filename": "rainbow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f308.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多季节 ===
  {
    "word": "spring",
    "standardized": "spring",
    "chinese": "春天",
    "phonetic": "/sprɪŋ/",
    "phrase": "Beautiful spring",
    "phraseTranslation": "美丽的春天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "spring.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "summer",
    "standardized": "summer",
    "chinese": "夏天",
    "phonetic": "/ˈsʌmər/",
    "phrase": "Hot summer",
    "phraseTranslation": "炎热的夏天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "summer.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2600.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "autumn",
    "standardized": "autumn",
    "chinese": "秋天",
    "phonetic": "/ˈɔːtəm/",
    "phrase": "Colorful autumn",
    "phraseTranslation": "多彩的秋天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "autumn.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f342.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "winter",
    "standardized": "winter",
    "chinese": "冬天",
    "phonetic": "/ˈwɪntər/",
    "phrase": "Cold winter",
    "phraseTranslation": "寒冷的冬天",
    "difficulty": "basic",
    "category": "season",
    "imageURLs": [
      {
        "filename": "winter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2744.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多学习用品 ===
  {
    "word": "book",
    "standardized": "book",
    "chinese": "书",
    "phonetic": "/bʊk/",
    "phrase": "Read book",
    "phraseTranslation": "读书",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "book.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pen",
    "standardized": "pen",
    "chinese": "钢笔",
    "phonetic": "/pen/",
    "phrase": "Write with pen",
    "phraseTranslation": "用钢笔写字",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "pen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pencil",
    "standardized": "pencil",
    "chinese": "铅笔",
    "phonetic": "/ˈpensəl/",
    "phrase": "Sharp pencil",
    "phraseTranslation": "尖铅笔",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "pencil.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/270f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "paper",
    "standardized": "paper",
    "chinese": "纸",
    "phonetic": "/ˈpeɪpər/",
    "phrase": "White paper",
    "phraseTranslation": "白纸",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "paper.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "eraser",
    "standardized": "eraser",
    "chinese": "橡皮",
    "phonetic": "/ɪˈreɪsər/",
    "phrase": "Pink eraser",
    "phraseTranslation": "粉色橡皮",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "eraser.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "backpack",
    "standardized": "backpack",
    "chinese": "背包",
    "phonetic": "/ˈbækpæk/",
    "phrase": "School backpack",
    "phraseTranslation": "学校背包",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "backpack.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f392.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "desk",
    "standardized": "desk",
    "chinese": "桌子",
    "phonetic": "/desk/",
    "phrase": "School desk",
    "phraseTranslation": "学校桌子",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "desk.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4bb.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "chair",
    "standardized": "chair",
    "chinese": "椅子",
    "phonetic": "/tʃer/",
    "phrase": "Comfortable chair",
    "phraseTranslation": "舒适的椅子",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "chair.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa91.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多科学概念词汇 ===
  {
    "word": "experiment",
    "standardized": "experiment",
    "chinese": "实验",
    "phonetic": "/ɪkˈsperɪmənt/",
    "phrase": "Science experiment",
    "phraseTranslation": "科学实验",
    "difficulty": "intermediate",
    "category": "science",
    "imageURLs": [
      {
        "filename": "experiment.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ea.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "microscope",
    "standardized": "microscope",
    "chinese": "显微镜",
    "phonetic": "/ˈmaɪkrəskoʊp/",
    "phrase": "Look through microscope",
    "phraseTranslation": "通过显微镜观察",
    "difficulty": "advanced",
    "category": "science",
    "imageURLs": [
      {
        "filename": "microscope.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "telescope",
    "standardized": "telescope",
    "chinese": "望远镜",
    "phonetic": "/ˈteləskoʊp/",
    "phrase": "Look at stars with telescope",
    "phraseTranslation": "用望远镜看星星",
    "difficulty": "intermediate",
    "category": "science",
    "imageURLs": [
      {
        "filename": "telescope.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "magnet",
    "standardized": "magnet",
    "chinese": "磁铁",
    "phonetic": "/ˈmæɡnət/",
    "phrase": "Strong magnet",
    "phraseTranslation": "强磁铁",
    "difficulty": "intermediate",
    "category": "science",
    "imageURLs": [
      {
        "filename": "magnet.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "gravity",
    "standardized": "gravity",
    "chinese": "重力",
    "phonetic": "/ˈɡrævəti/",
    "phrase": "Things fall due to gravity",
    "phraseTranslation": "物体因重力而下落",
    "difficulty": "advanced",
    "category": "science",
    "imageURLs": [
      {
        "filename": "gravity.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "energy",
    "standardized": "energy",
    "chinese": "能量",
    "phonetic": "/ˈenərdʒi/",
    "phrase": "Solar energy",
    "phraseTranslation": "太阳能",
    "difficulty": "intermediate",
    "category": "science",
    "imageURLs": [
      {
        "filename": "energy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26a1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "electricity",
    "standardized": "electricity",
    "chinese": "电",
    "phonetic": "/ɪˌlekˈtrɪsəti/",
    "phrase": "Turn on electricity",
    "phraseTranslation": "打开电源",
    "difficulty": "intermediate",
    "category": "science",
    "imageURLs": [
      {
        "filename": "electricity.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f50c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "battery",
    "standardized": "battery",
    "chinese": "电池",
    "phonetic": "/ˈbætəri/",
    "phrase": "Toy needs battery",
    "phraseTranslation": "玩具需要电池",
    "difficulty": "basic",
    "category": "science",
    "imageURLs": [
      {
        "filename": "battery.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f50b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多自然现象词汇 ===
  {
    "word": "thunder",
    "standardized": "thunder",
    "chinese": "雷声",
    "phonetic": "/ˈθʌndər/",
    "phrase": "Loud thunder",
    "phraseTranslation": "响亮的雷声",
    "difficulty": "basic",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "thunder.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f329.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lightning",
    "standardized": "lightning",
    "chinese": "闪电",
    "phonetic": "/ˈlaɪtnɪŋ/",
    "phrase": "Bright lightning",
    "phraseTranslation": "明亮的闪电",
    "difficulty": "intermediate",
    "category": "weather",
    "imageURLs": [
      {
        "filename": "lightning.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26a1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "earthquake",
    "standardized": "earthquake",
    "chinese": "地震",
    "phonetic": "/ˈɜːrθkweɪk/",
    "phrase": "Small earthquake",
    "phraseTranslation": "小地震",
    "difficulty": "advanced",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "earthquake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "volcano",
    "standardized": "volcano",
    "chinese": "火山",
    "phonetic": "/vɑːlˈkeɪnoʊ/",
    "phrase": "Active volcano",
    "phraseTranslation": "活火山",
    "difficulty": "intermediate",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "volcano.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ocean",
    "standardized": "ocean",
    "chinese": "海洋",
    "phonetic": "/ˈoʊʃən/",
    "phrase": "Deep ocean",
    "phraseTranslation": "深海",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "ocean.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "desert",
    "standardized": "desert",
    "chinese": "沙漠",
    "phonetic": "/ˈdezərt/",
    "phrase": "Hot desert",
    "phraseTranslation": "炎热的沙漠",
    "difficulty": "intermediate",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "desert.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3dc.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "forest",
    "standardized": "forest",
    "chinese": "森林",
    "phonetic": "/ˈfɔːrəst/",
    "phrase": "Green forest",
    "phraseTranslation": "绿色森林",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "forest.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "mountain",
    "standardized": "mountain",
    "chinese": "山",
    "phonetic": "/ˈmaʊntən/",
    "phrase": "High mountain",
    "phraseTranslation": "高山",
    "difficulty": "basic",
    "category": "nature",
    "imageURLs": [
      {
        "filename": "mountain.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26f0.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多学习工具词汇 ===
  {
    "word": "calculator",
    "standardized": "calculator",
    "chinese": "计算器",
    "phonetic": "/ˈkælkjəleɪtər/",
    "phrase": "Use calculator for math",
    "phraseTranslation": "用计算器做数学",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "calculator.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ee.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "globe",
    "standardized": "globe",
    "chinese": "地球仪",
    "phonetic": "/ɡloʊb/",
    "phrase": "Spin the globe",
    "phraseTranslation": "转动地球仪",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "globe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dictionary",
    "standardized": "dictionary",
    "chinese": "字典",
    "phonetic": "/ˈdɪkʃəˌneri/",
    "phrase": "Look up words in dictionary",
    "phraseTranslation": "在字典里查单词",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "dictionary.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "notebook",
    "standardized": "notebook",
    "chinese": "笔记本",
    "phonetic": "/ˈnoʊtbʊk/",
    "phrase": "Write in notebook",
    "phraseTranslation": "在笔记本上写字",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "notebook.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "marker",
    "standardized": "marker",
    "chinese": "记号笔",
    "phonetic": "/ˈmɑːrkər/",
    "phrase": "Draw with marker",
    "phraseTranslation": "用记号笔画画",
    "difficulty": "basic",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "marker.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "highlighter",
    "standardized": "highlighter",
    "chinese": "荧光笔",
    "phonetic": "/ˈhaɪlaɪtər/",
    "phrase": "Mark important words with highlighter",
    "phraseTranslation": "用荧光笔标记重要单词",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "highlighter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "compass",
    "standardized": "compass",
    "chinese": "指南针",
    "phonetic": "/ˈkʌmpəs/",
    "phrase": "Find direction with compass",
    "phraseTranslation": "用指南针找方向",
    "difficulty": "intermediate",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "compass.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ed.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "protractor",
    "standardized": "protractor",
    "chinese": "量角器",
    "phonetic": "/prəˈtræktər/",
    "phrase": "Measure angles with protractor",
    "phraseTranslation": "用量角器测量角度",
    "difficulty": "advanced",
    "category": "learning",
    "imageURLs": [
      {
        "filename": "protractor.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4cf.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 小学阶段地理概念词汇 ===
  {
    "word": "continent",
    "standardized": "continent",
    "chinese": "大洲",
    "phonetic": "/ˈkɑːntənənt/",
    "phrase": "Seven continents",
    "phraseTranslation": "七大洲",
    "difficulty": "intermediate",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "continent.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "country",
    "standardized": "country",
    "chinese": "国家",
    "phonetic": "/ˈkʌntri/",
    "phrase": "My country",
    "phraseTranslation": "我的国家",
    "difficulty": "basic",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "country.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3f4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "capital",
    "standardized": "capital",
    "chinese": "首都",
    "phonetic": "/ˈkæpətəl/",
    "phrase": "Capital city",
    "phraseTranslation": "首都城市",
    "difficulty": "intermediate",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "capital.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3db.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "river",
    "standardized": "river",
    "chinese": "河流",
    "phonetic": "/ˈrɪvər/",
    "phrase": "Long river",
    "phraseTranslation": "长河",
    "difficulty": "basic",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "river.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lake",
    "standardized": "lake",
    "chinese": "湖泊",
    "phonetic": "/leɪk/",
    "phrase": "Beautiful lake",
    "phraseTranslation": "美丽的湖泊",
    "difficulty": "basic",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "lake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "island",
    "standardized": "island",
    "chinese": "岛屿",
    "phonetic": "/ˈaɪlənd/",
    "phrase": "Tropical island",
    "phraseTranslation": "热带岛屿",
    "difficulty": "basic",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "island.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3dd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "valley",
    "standardized": "valley",
    "chinese": "山谷",
    "phonetic": "/ˈvæli/",
    "phrase": "Green valley",
    "phraseTranslation": "绿色山谷",
    "difficulty": "intermediate",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "valley.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3d4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "peninsula",
    "standardized": "peninsula",
    "chinese": "半岛",
    "phonetic": "/pəˈnɪnsələ/",
    "phrase": "Large peninsula",
    "phraseTranslation": "大半岛",
    "difficulty": "advanced",
    "category": "geography",
    "imageURLs": [
      {
        "filename": "peninsula.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f30d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 小学阶段生物知识词汇 ===
  {
    "word": "mammal",
    "standardized": "mammal",
    "chinese": "哺乳动物",
    "phonetic": "/ˈmæməl/",
    "phrase": "Whale is a mammal",
    "phraseTranslation": "鲸鱼是哺乳动物",
    "difficulty": "intermediate",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "mammal.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f43b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "reptile",
    "standardized": "reptile",
    "chinese": "爬行动物",
    "phonetic": "/ˈreptaɪl/",
    "phrase": "Snake is a reptile",
    "phraseTranslation": "蛇是爬行动物",
    "difficulty": "intermediate",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "reptile.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f40d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "amphibian",
    "standardized": "amphibian",
    "chinese": "两栖动物",
    "phonetic": "/æmˈfɪbiən/",
    "phrase": "Frog is an amphibian",
    "phraseTranslation": "青蛙是两栖动物",
    "difficulty": "advanced",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "amphibian.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f438.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "insect",
    "standardized": "insect",
    "chinese": "昆虫",
    "phonetic": "/ˈɪnsekt/",
    "phrase": "Butterfly is an insect",
    "phraseTranslation": "蝴蝶是昆虫",
    "difficulty": "basic",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "insect.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f98b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "habitat",
    "standardized": "habitat",
    "chinese": "栖息地",
    "phonetic": "/ˈhæbətæt/",
    "phrase": "Animal habitat",
    "phraseTranslation": "动物栖息地",
    "difficulty": "intermediate",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "habitat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ecosystem",
    "standardized": "ecosystem",
    "chinese": "生态系统",
    "phonetic": "/ˈiːkoʊsɪstəm/",
    "phrase": "Forest ecosystem",
    "phraseTranslation": "森林生态系统",
    "difficulty": "advanced",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "ecosystem.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f333.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "photosynthesis",
    "standardized": "photosynthesis",
    "chinese": "光合作用",
    "phonetic": "/ˌfoʊtoʊˈsɪnθəsɪs/",
    "phrase": "Plants use photosynthesis",
    "phraseTranslation": "植物进行光合作用",
    "difficulty": "advanced",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "photosynthesis.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f331.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "adaptation",
    "standardized": "adaptation",
    "chinese": "适应",
    "phonetic": "/ˌædæpˈteɪʃən/",
    "phrase": "Animal adaptation",
    "phraseTranslation": "动物适应",
    "difficulty": "intermediate",
    "category": "biology",
    "imageURLs": [
      {
        "filename": "adaptation.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f43b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 小学阶段物理现象词汇 ===
  {
    "word": "motion",
    "standardized": "motion",
    "chinese": "运动",
    "phonetic": "/ˈmoʊʃən/",
    "phrase": "Object in motion",
    "phraseTranslation": "运动中的物体",
    "difficulty": "intermediate",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "motion.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "force",
    "standardized": "force",
    "chinese": "力",
    "phonetic": "/fɔːrs/",
    "phrase": "Apply force",
    "phraseTranslation": "施加力",
    "difficulty": "intermediate",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "force.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4aa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "friction",
    "standardized": "friction",
    "chinese": "摩擦力",
    "phonetic": "/ˈfrɪkʃən/",
    "phrase": "Friction slows down",
    "phraseTranslation": "摩擦力使物体减速",
    "difficulty": "intermediate",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "friction.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f525.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "reflection",
    "standardized": "reflection",
    "chinese": "反射",
    "phonetic": "/rɪˈflekʃən/",
    "phrase": "Light reflection",
    "phraseTranslation": "光的反射",
    "difficulty": "intermediate",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "reflection.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa9e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "refraction",
    "standardized": "refraction",
    "chinese": "折射",
    "phonetic": "/rɪˈfrækʃən/",
    "phrase": "Light refraction",
    "phraseTranslation": "光的折射",
    "difficulty": "advanced",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "refraction.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f308.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "vibration",
    "standardized": "vibration",
    "chinese": "振动",
    "phonetic": "/vaɪˈbreɪʃən/",
    "phrase": "Sound vibration",
    "phraseTranslation": "声音振动",
    "difficulty": "intermediate",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "vibration.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4f3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "temperature",
    "standardized": "temperature",
    "chinese": "温度",
    "phonetic": "/ˈtemprətʃər/",
    "phrase": "Measure temperature",
    "phraseTranslation": "测量温度",
    "difficulty": "intermediate",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "temperature.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f321.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pressure",
    "standardized": "pressure",
    "chinese": "压力",
    "phonetic": "/ˈpreʃər/",
    "phrase": "Air pressure",
    "phraseTranslation": "气压",
    "difficulty": "intermediate",
    "category": "physics",
    "imageURLs": [
      {
        "filename": "pressure.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a8.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 小学阶段化学基础词汇 ===
  {
    "word": "molecule",
    "standardized": "molecule",
    "chinese": "分子",
    "phonetic": "/ˈmɑːlɪkjuːl/",
    "phrase": "Water molecule",
    "phraseTranslation": "水分子",
    "difficulty": "advanced",
    "category": "chemistry",
    "imageURLs": [
      {
        "filename": "molecule.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ea.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "element",
    "standardized": "element",
    "chinese": "元素",
    "phonetic": "/ˈeləmənt/",
    "phrase": "Chemical element",
    "phraseTranslation": "化学元素",
    "difficulty": "intermediate",
    "category": "chemistry",
    "imageURLs": [
      {
        "filename": "element.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ea.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "mixture",
    "standardized": "mixture",
    "chinese": "混合物",
    "phonetic": "/ˈmɪkstʃər/",
    "phrase": "Oil and water mixture",
    "phraseTranslation": "油水混合物",
    "difficulty": "intermediate",
    "category": "chemistry",
    "imageURLs": [
      {
        "filename": "mixture.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ea.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "solution",
    "standardized": "solution",
    "chinese": "溶液",
    "phonetic": "/səˈluːʃən/",
    "phrase": "Salt water solution",
    "phraseTranslation": "盐水溶液",
    "difficulty": "intermediate",
    "category": "chemistry",
    "imageURLs": [
      {
        "filename": "solution.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ea.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "evaporation",
    "standardized": "evaporation",
    "chinese": "蒸发",
    "phonetic": "/ɪˌvæpəˈreɪʃən/",
    "phrase": "Water evaporation",
    "phraseTranslation": "水的蒸发",
    "difficulty": "intermediate",
    "category": "chemistry",
    "imageURLs": [
      {
        "filename": "evaporation.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "condensation",
    "standardized": "condensation",
    "chinese": "凝结",
    "phonetic": "/ˌkɑːndenˈseɪʃən/",
    "phrase": "Water condensation",
    "phraseTranslation": "水的凝结",
    "difficulty": "intermediate",
    "category": "chemistry",
    "imageURLs": [
      {
        "filename": "condensation.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a7.svg",
        "type": "Emoji"
      }
    ]
  }
];

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KINDERGARTEN_LEARNING_NATURE;
} else if (typeof window !== 'undefined') {
  window.KINDERGARTEN_LEARNING_NATURE = KINDERGARTEN_LEARNING_NATURE;
}

