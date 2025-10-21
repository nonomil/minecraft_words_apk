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
  }
];

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KINDERGARTEN_LEARNING_NATURE;
} else if (typeof window !== 'undefined') {
  window.KINDERGARTEN_LEARNING_NATURE = KINDERGARTEN_LEARNING_NATURE;
}

