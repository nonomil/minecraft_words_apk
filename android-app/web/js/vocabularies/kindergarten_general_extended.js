// Kindergarten Pack: 综合拓展 (General & Extended)
// 包含：进阶词汇、综合应用、场所地点、交通工具、时间概念、职业等
// 目标：为幼儿提供更丰富的词汇基础，支持复杂表达和阅读理解

(function (global) {
  if (global.KINDERGARTEN_GENERAL_EXTENDED) { return; }
  const __DATA_K_GENERAL_EXTENDED = [
  // === 地点场所 ===
  {
    "word": "home",
    "standardized": "home",
    "chinese": "家",
    "phonetic": "/hoʊm/",
    "phrase": "Go home",
    "phraseTranslation": "回家",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "home.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "park",
    "standardized": "park",
    "chinese": "公园",
    "phonetic": "/pɑːrk/",
    "phrase": "Play in the park",
    "phraseTranslation": "在公园玩",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "park.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3de.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hospital",
    "standardized": "hospital",
    "chinese": "医院",
    "phonetic": "/ˈhɑːspɪtəl/",
    "phrase": "Go to hospital",
    "phraseTranslation": "去医院",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "hospital.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "supermarket",
    "standardized": "supermarket",
    "chinese": "超市",
    "phonetic": "/ˈsuːpərˌmɑːrkət/",
    "phrase": "Shop at supermarket",
    "phraseTranslation": "在超市购物",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "supermarket.jpg",
        "url": "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "library",
    "standardized": "library",
    "chinese": "图书馆",
    "phonetic": "/ˈlaɪˌbrɛri/",
    "phrase": "Read in library",
    "phraseTranslation": "在图书馆读书",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "library.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4da.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "playground",
    "standardized": "playground",
    "chinese": "操场",
    "phonetic": "/ˈpleɪˌɡraʊnd/",
    "phrase": "Play on playground",
    "phraseTranslation": "在操场玩",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "playground.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c0.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 交通工具 ===
  {
    "word": "car",
    "standardized": "car",
    "chinese": "汽车",
    "phonetic": "/kɑːr/",
    "phrase": "Red car",
    "phraseTranslation": "红汽车",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "car.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f697.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bus",
    "standardized": "bus",
    "chinese": "公交车",
    "phonetic": "/bʌs/",
    "phrase": "Take the bus",
    "phraseTranslation": "坐公交车",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "bus.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f68c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bike",
    "standardized": "bike",
    "chinese": "自行车",
    "phonetic": "/baɪk/",
    "phrase": "Ride a bike",
    "phraseTranslation": "骑自行车",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "bike.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6b2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "train",
    "standardized": "train",
    "chinese": "火车",
    "phonetic": "/treɪn/",
    "phrase": "Fast train",
    "phraseTranslation": "快速火车",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "train.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f686.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "airplane",
    "standardized": "airplane",
    "chinese": "飞机",
    "phonetic": "/ˈɛrˌpleɪn/",
    "phrase": "Flying airplane",
    "phraseTranslation": "飞行的飞机",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "airplane.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2708.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "boat",
    "standardized": "boat",
    "chinese": "船",
    "phonetic": "/boʊt/",
    "phrase": "Sail the boat",
    "phraseTranslation": "开船",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "boat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26f5.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 职业 ===
  {
    "word": "doctor",
    "standardized": "doctor",
    "chinese": "医生",
    "phonetic": "/ˈdɑːktər/",
    "phrase": "Kind doctor",
    "phraseTranslation": "善良的医生",
    "difficulty": "basic",
    "category": "job",
    "imageURLs": [
      {
        "filename": "doctor.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-2695-fe0f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "nurse",
    "standardized": "nurse",
    "chinese": "护士",
    "phonetic": "/nɜːrs/",
    "phrase": "Helpful nurse",
    "phraseTranslation": "乐于助人的护士",
    "difficulty": "basic",
    "category": "job",
    "imageURLs": [
      {
        "filename": "nurse.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f469-200d-2695-fe0f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "police",
    "standardized": "police",
    "chinese": "警察",
    "phonetic": "/pəˈliːs/",
    "phrase": "Brave police",
    "phraseTranslation": "勇敢的警察",
    "difficulty": "basic",
    "category": "job",
    "imageURLs": [
      {
        "filename": "police.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f46e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "firefighter",
    "standardized": "firefighter",
    "chinese": "消防员",
    "phonetic": "/ˈfaɪərˌfaɪtər/",
    "phrase": "Brave firefighter",
    "phraseTranslation": "勇敢的消防员",
    "difficulty": "intermediate",
    "category": "job",
    "imageURLs": [
      {
        "filename": "firefighter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f692.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cook",
    "standardized": "cook",
    "chinese": "厨师",
    "phonetic": "/kʊk/",
    "phrase": "Good cook",
    "phraseTranslation": "好厨师",
    "difficulty": "basic",
    "category": "job",
    "imageURLs": [
      {
        "filename": "cook.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f373.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 时间概念 ===
  {
    "word": "morning",
    "standardized": "morning",
    "chinese": "早上",
    "phonetic": "/ˈmɔːrnɪŋ/",
    "phrase": "Good morning",
    "phraseTranslation": "早上好",
    "difficulty": "basic",
    "category": "time",
    "imageURLs": [
      {
        "filename": "morning.jpg",
        "url": "https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "afternoon",
    "standardized": "afternoon",
    "chinese": "下午",
    "phonetic": "/ˌæftərˈnuːn/",
    "phrase": "Good afternoon",
    "phraseTranslation": "下午好",
    "difficulty": "intermediate",
    "category": "time",
    "imageURLs": [
      {
        "filename": "afternoon.jpg",
        "url": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "night",
    "standardized": "night",
    "chinese": "晚上",
    "phonetic": "/naɪt/",
    "phrase": "Good night",
    "phraseTranslation": "晚安",
    "difficulty": "basic",
    "category": "time",
    "imageURLs": [
      {
        "filename": "night.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f319.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "today",
    "standardized": "today",
    "chinese": "今天",
    "phonetic": "/təˈdeɪ/",
    "phrase": "Today is sunny",
    "phraseTranslation": "今天天气晴朗",
    "difficulty": "basic",
    "category": "time",
    "imageURLs": [
      {
        "filename": "today.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tomorrow",
    "standardized": "tomorrow",
    "chinese": "明天",
    "phonetic": "/təˈmɑːroʊ/",
    "phrase": "See you tomorrow",
    "phraseTranslation": "明天见",
    "difficulty": "intermediate",
    "category": "time",
    "imageURLs": [
      {
        "filename": "tomorrow.jpg",
        "url": "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "yesterday",
    "standardized": "yesterday",
    "chinese": "昨天",
    "phonetic": "/ˈjɛstərdeɪ/",
    "phrase": "Yesterday was fun",
    "phraseTranslation": "昨天很有趣",
    "difficulty": "intermediate",
    "category": "time",
    "imageURLs": [
      {
        "filename": "yesterday.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 玩具与游戏 ===
  {
    "word": "toy",
    "standardized": "toy",
    "chinese": "玩具",
    "phonetic": "/tɔɪ/",
    "phrase": "Fun toy",
    "phraseTranslation": "有趣的玩具",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "toy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ball",
    "standardized": "ball",
    "chinese": "球",
    "phonetic": "/bɔːl/",
    "phrase": "Bounce the ball",
    "phraseTranslation": "拍球",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "ball.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26bd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "doll",
    "standardized": "doll",
    "chinese": "娃娃",
    "phonetic": "/dɔːl/",
    "phrase": "Pretty doll",
    "phraseTranslation": "漂亮的娃娃",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "doll.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa86.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "puzzle",
    "standardized": "puzzle",
    "chinese": "拼图",
    "phonetic": "/ˈpʌzəl/",
    "phrase": "Solve the puzzle",
    "phraseTranslation": "解决拼图",
    "difficulty": "intermediate",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "puzzle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "block",
    "standardized": "block",
    "chinese": "积木",
    "phonetic": "/blɑːk/",
    "phrase": "Build with blocks",
    "phraseTranslation": "用积木搭建",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "block.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f1.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 音乐与艺术 ===
  {
    "word": "music",
    "standardized": "music",
    "chinese": "音乐",
    "phonetic": "/ˈmjuːzɪk/",
    "phrase": "Listen to music",
    "phraseTranslation": "听音乐",
    "difficulty": "basic",
    "category": "art",
    "imageURLs": [
      {
        "filename": "music.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3b5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "piano",
    "standardized": "piano",
    "chinese": "钢琴",
    "phonetic": "/piˈænoʊ/",
    "phrase": "Play piano",
    "phraseTranslation": "弹钢琴",
    "difficulty": "intermediate",
    "category": "art",
    "imageURLs": [
      {
        "filename": "piano.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3b9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "guitar",
    "standardized": "guitar",
    "chinese": "吉他",
    "phonetic": "/ɡɪˈtɑːr/",
    "phrase": "Play guitar",
    "phraseTranslation": "弹吉他",
    "difficulty": "intermediate",
    "category": "art",
    "imageURLs": [
      {
        "filename": "guitar.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3b8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "drum",
    "standardized": "drum",
    "chinese": "鼓",
    "phonetic": "/drʌm/",
    "phrase": "Beat the drum",
    "phraseTranslation": "敲鼓",
    "difficulty": "basic",
    "category": "art",
    "imageURLs": [
      {
        "filename": "drum.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f941.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "draw",
    "standardized": "draw",
    "chinese": "画画",
    "phonetic": "/drɔː/",
    "phrase": "Draw a picture",
    "phraseTranslation": "画一幅画",
    "difficulty": "basic",
    "category": "art",
    "imageURLs": [
      {
        "filename": "draw.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "paint",
    "standardized": "paint",
    "chinese": "涂颜料",
    "phonetic": "/peɪnt/",
    "phrase": "Paint with colors",
    "phraseTranslation": "用颜料涂色",
    "difficulty": "basic",
    "category": "art",
    "imageURLs": [
      {
        "filename": "paint.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3a8.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 运动与活动 ===
  {
    "word": "swim",
    "standardized": "swim",
    "chinese": "游泳",
    "phonetic": "/swɪm/",
    "phrase": "Swim in pool",
    "phraseTranslation": "在游泳池游泳",
    "difficulty": "basic",
    "category": "sport",
    "imageURLs": [
      {
        "filename": "swim.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3ca.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dance",
    "standardized": "dance",
    "chinese": "跳舞",
    "phonetic": "/dæns/",
    "phrase": "Dance happily",
    "phraseTranslation": "开心地跳舞",
    "difficulty": "basic",
    "category": "sport",
    "imageURLs": [
      {
        "filename": "dance.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f483.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sing",
    "standardized": "sing",
    "chinese": "唱歌",
    "phonetic": "/sɪŋ/",
    "phrase": "Sing a song",
    "phraseTranslation": "唱一首歌",
    "difficulty": "basic",
    "category": "sport",
    "imageURLs": [
      {
        "filename": "sing.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3a4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "exercise",
    "standardized": "exercise",
    "chinese": "锻炼",
    "phonetic": "/ˈɛksərˌsaɪz/",
    "phrase": "Do exercise",
    "phraseTranslation": "做运动",
    "difficulty": "intermediate",
    "category": "sport",
    "imageURLs": [
      {
        "filename": "exercise.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3cb.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 感觉与状态 ===
  {
    "word": "hot",
    "standardized": "hot",
    "chinese": "热的",
    "phonetic": "/hɑːt/",
    "phrase": "Hot soup",
    "phraseTranslation": "热汤",
    "difficulty": "basic",
    "category": "feeling",
    "imageURLs": [
      {
        "filename": "hot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f975.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cold",
    "standardized": "cold",
    "chinese": "冷的",
    "phonetic": "/koʊld/",
    "phrase": "Cold ice cream",
    "phraseTranslation": "冰冷的冰淇淋",
    "difficulty": "basic",
    "category": "feeling",
    "imageURLs": [
      {
        "filename": "cold.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f976.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tired",
    "standardized": "tired",
    "chinese": "累的",
    "phonetic": "/ˈtaɪərd/",
    "phrase": "Feel tired",
    "phraseTranslation": "感觉累了",
    "difficulty": "basic",
    "category": "feeling",
    "imageURLs": [
      {
        "filename": "tired.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f62b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hungry",
    "standardized": "hungry",
    "chinese": "饿的",
    "phonetic": "/ˈhʌŋɡri/",
    "phrase": "Feel hungry",
    "phraseTranslation": "感觉饿了",
    "difficulty": "basic",
    "category": "feeling",
    "imageURLs": [
      {
        "filename": "hungry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f924.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "thirsty",
    "standardized": "thirsty",
    "chinese": "渴的",
    "phonetic": "/ˈθɜːrsti/",
    "phrase": "Feel thirsty",
    "phraseTranslation": "感觉渴了",
    "difficulty": "basic",
    "category": "feeling",
    "imageURLs": [
      {
        "filename": "thirsty.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a7.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多数字 ===
  {
    "word": "four",
    "standardized": "four",
    "chinese": "四",
    "phonetic": "/fɔːr/",
    "phrase": "Four cats",
    "phraseTranslation": "四只猫",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "four.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/34-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "five",
    "standardized": "five",
    "chinese": "五",
    "phonetic": "/faɪv/",
    "phrase": "Five fingers",
    "phraseTranslation": "五个手指",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "five.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/35-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "six",
    "standardized": "six",
    "chinese": "六",
    "phonetic": "/sɪks/",
    "phrase": "Six toys",
    "phraseTranslation": "六个玩具",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "six.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/36-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "seven",
    "standardized": "seven",
    "chinese": "七",
    "phonetic": "/ˈsɛvən/",
    "phrase": "Seven days",
    "phraseTranslation": "七天",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "seven.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/37-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "eight",
    "standardized": "eight",
    "chinese": "八",
    "phonetic": "/eɪt/",
    "phrase": "Eight legs",
    "phraseTranslation": "八条腿",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "eight.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/38-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "nine",
    "standardized": "nine",
    "chinese": "九",
    "phonetic": "/naɪn/",
    "phrase": "Nine books",
    "phraseTranslation": "九本书",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "nine.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/39-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ten",
    "standardized": "ten",
    "chinese": "十",
    "phonetic": "/tɛn/",
    "phrase": "Ten apples",
    "phraseTranslation": "十个苹果",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "ten.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f51f.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多颜色 ===
  {
    "word": "purple",
    "standardized": "purple",
    "chinese": "紫色",
    "phonetic": "/ˈpɜːrpəl/",
    "phrase": "Purple flower",
    "phraseTranslation": "紫色花朵",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "purple.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f7e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pink",
    "standardized": "pink",
    "chinese": "粉色",
    "phonetic": "/pɪŋk/",
    "phrase": "Pink dress",
    "phraseTranslation": "粉色裙子",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "pink.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "black",
    "standardized": "black",
    "chinese": "黑色",
    "phonetic": "/blæk/",
    "phrase": "Black cat",
    "phraseTranslation": "黑猫",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "black.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26ab.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "white",
    "standardized": "white",
    "chinese": "白色",
    "phonetic": "/waɪt/",
    "phrase": "White cloud",
    "phraseTranslation": "白云",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "white.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26aa.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 房间与家具 ===
  {
    "word": "room",
    "standardized": "room",
    "chinese": "房间",
    "phonetic": "/ruːm/",
    "phrase": "My room",
    "phraseTranslation": "我的房间",
    "difficulty": "basic",
    "category": "house",
    "imageURLs": [
      {
        "filename": "room.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6cf.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bed",
    "standardized": "bed",
    "chinese": "床",
    "phonetic": "/bɛd/",
    "phrase": "Sleep in bed",
    "phraseTranslation": "在床上睡觉",
    "difficulty": "basic",
    "category": "house",
    "imageURLs": [
      {
        "filename": "bed.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6cf.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "table",
    "standardized": "table",
    "chinese": "桌子",
    "phonetic": "/ˈteɪbəl/",
    "phrase": "Eat at table",
    "phraseTranslation": "在桌子上吃饭",
    "difficulty": "basic",
    "category": "house",
    "imageURLs": [
      {
        "filename": "table.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa91.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "window",
    "standardized": "window",
    "chinese": "窗户",
    "phonetic": "/ˈwɪndoʊ/",
    "phrase": "Look out window",
    "phraseTranslation": "向窗外看",
    "difficulty": "basic",
    "category": "house",
    "imageURLs": [
      {
        "filename": "window.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa9f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "door",
    "standardized": "door",
    "chinese": "门",
    "phonetic": "/dɔːr/",
    "phrase": "Open the door",
    "phraseTranslation": "开门",
    "difficulty": "basic",
    "category": "house",
    "imageURLs": [
      {
        "filename": "door.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6aa.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多职业 ===
  {
    "word": "farmer",
    "standardized": "farmer",
    "chinese": "农民",
    "phonetic": "/ˈfɑːrmər/",
    "phrase": "Hard-working farmer",
    "phraseTranslation": "勤劳的农民",
    "difficulty": "basic",
    "category": "profession",
    "imageURLs": [
      {
        "filename": "farmer.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f33e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "chef",
    "standardized": "chef",
    "chinese": "厨师",
    "phonetic": "/ʃɛf/",
    "phrase": "Skilled chef",
    "phraseTranslation": "技术娴熟的厨师",
    "difficulty": "basic",
    "category": "profession",
    "imageURLs": [
      {
        "filename": "chef.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f373.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pilot",
    "standardized": "pilot",
    "chinese": "飞行员",
    "phonetic": "/ˈpaɪlət/",
    "phrase": "Airplane pilot",
    "phraseTranslation": "飞机飞行员",
    "difficulty": "intermediate",
    "category": "profession",
    "imageURLs": [
      {
        "filename": "pilot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-2708-fe0f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "firefighter",
    "standardized": "firefighter",
    "chinese": "消防员",
    "phonetic": "/ˈfaɪərˌfaɪtər/",
    "phrase": "Brave firefighter",
    "phraseTranslation": "勇敢的消防员",
    "difficulty": "intermediate",
    "category": "profession",
    "imageURLs": [
      {
        "filename": "firefighter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f692.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "artist",
    "standardized": "artist",
    "chinese": "艺术家",
    "phonetic": "/ˈɑːrtɪst/",
    "phrase": "Creative artist",
    "phraseTranslation": "有创造力的艺术家",
    "difficulty": "intermediate",
    "category": "profession",
    "imageURLs": [
      {
        "filename": "artist.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f3a8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "scientist",
    "standardized": "scientist",
    "chinese": "科学家",
    "phonetic": "/ˈsaɪəntɪst/",
    "phrase": "Smart scientist",
    "phraseTranslation": "聪明的科学家",
    "difficulty": "intermediate",
    "category": "profession",
    "imageURLs": [
      {
        "filename": "scientist.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1-200d-1f52c.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多交通工具 ===
  {
    "word": "helicopter",
    "standardized": "helicopter",
    "chinese": "直升机",
    "phonetic": "/ˈhɛlɪˌkɑːptər/",
    "phrase": "Flying helicopter",
    "phraseTranslation": "飞行的直升机",
    "difficulty": "intermediate",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "helicopter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f681.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rocket",
    "standardized": "rocket",
    "chinese": "火箭",
    "phonetic": "/ˈrɑːkɪt/",
    "phrase": "Space rocket",
    "phraseTranslation": "太空火箭",
    "difficulty": "intermediate",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "rocket.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f680.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sailboat",
    "standardized": "sailboat",
    "chinese": "帆船",
    "phonetic": "/ˈseɪlˌboʊt/",
    "phrase": "White sailboat",
    "phraseTranslation": "白色帆船",
    "difficulty": "intermediate",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "sailboat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26f5.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多地点场所 ===
  {
    "word": "hospital",
    "standardized": "hospital",
    "chinese": "医院",
    "phonetic": "/ˈhɑːspɪtəl/",
    "phrase": "Go to hospital",
    "phraseTranslation": "去医院",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "hospital.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "library",
    "standardized": "library",
    "chinese": "图书馆",
    "phonetic": "/ˈlaɪˌbrɛri/",
    "phrase": "Read in library",
    "phraseTranslation": "在图书馆读书",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "library.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "restaurant",
    "standardized": "restaurant",
    "chinese": "餐厅",
    "phonetic": "/ˈrɛstərənt/",
    "phrase": "Eat at restaurant",
    "phraseTranslation": "在餐厅吃饭",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "restaurant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "zoo",
    "standardized": "zoo",
    "chinese": "动物园",
    "phonetic": "/zuː/",
    "phrase": "Visit the zoo",
    "phraseTranslation": "参观动物园",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "zoo.jpg",
        "url": "https://images.unsplash.com/photo-1516642499105-492ff6d1c1d0?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "beach",
    "standardized": "beach",
    "chinese": "海滩",
    "phonetic": "/biːtʃ/",
    "phrase": "Play at beach",
    "phraseTranslation": "在海滩玩耍",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "beach.jpg",
        "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },

  // === 节日与庆典 ===
  {
    "word": "birthday",
    "standardized": "birthday",
    "chinese": "生日",
    "phonetic": "/ˈbɜːrθˌdeɪ/",
    "phrase": "Happy birthday",
    "phraseTranslation": "生日快乐",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "birthday.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f382.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "party",
    "standardized": "party",
    "chinese": "聚会",
    "phonetic": "/ˈpɑːrti/",
    "phrase": "Fun party",
    "phraseTranslation": "有趣的聚会",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "party.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f389.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "gift",
    "standardized": "gift",
    "chinese": "礼物",
    "phonetic": "/ɡɪft/",
    "phrase": "Beautiful gift",
    "phraseTranslation": "美丽的礼物",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "gift.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f381.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cake",
    "standardized": "cake",
    "chinese": "蛋糕",
    "phonetic": "/keɪk/",
    "phrase": "Birthday cake",
    "phraseTranslation": "生日蛋糕",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "cake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f370.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "balloon",
    "standardized": "balloon",
    "chinese": "气球",
    "phonetic": "/bəˈluːn/",
    "phrase": "Colorful balloon",
    "phraseTranslation": "彩色气球",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "balloon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f388.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 技术与电子产品 ===
  {
    "word": "computer",
    "standardized": "computer",
    "chinese": "电脑",
    "phonetic": "/kəmˈpjuːtər/",
    "phrase": "Use computer",
    "phraseTranslation": "使用电脑",
    "difficulty": "basic",
    "category": "technology",
    "imageURLs": [
      {
        "filename": "computer.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4bb.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "phone",
    "standardized": "phone",
    "chinese": "电话",
    "phonetic": "/foʊn/",
    "phrase": "Make a phone call",
    "phraseTranslation": "打电话",
    "difficulty": "basic",
    "category": "technology",
    "imageURLs": [
      {
        "filename": "phone.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4f1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "camera",
    "standardized": "camera",
    "chinese": "照相机",
    "phonetic": "/ˈkæmərə/",
    "phrase": "Take photo with camera",
    "phraseTranslation": "用照相机拍照",
    "difficulty": "basic",
    "category": "technology",
    "imageURLs": [
      {
        "filename": "camera.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4f7.svg",
        "type": "Emoji"
      }
    ]
  }
];

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = __DATA_K_GENERAL_EXTENDED;
} else if (typeof window !== 'undefined') {
  window.KINDERGARTEN_GENERAL_EXTENDED = window.KINDERGARTEN_GENERAL_EXTENDED || [
  // === 地点场所 ===
  {
    "word": "home",
    "standardized": "home",
    "chinese": "家",
    "phonetic": "/hoʊm/",
    "phrase": "Go home",
    "phraseTranslation": "回家",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "home.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "park",
    "standardized": "park",
    "chinese": "公园",
    "phonetic": "/pɑːrk/",
    "phrase": "Play in the park",
    "phraseTranslation": "在公园玩",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "park.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3de.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hospital",
    "standardized": "hospital",
    "chinese": "医院",
    "phonetic": "/ˈhɑːspɪtəl/",
    "phrase": "Go to hospital",
    "phraseTranslation": "去医院",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "hospital.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "supermarket",
    "standardized": "supermarket",
    "chinese": "超市",
    "phonetic": "/ˈsuːpərˌmɑːrkət/",
    "phrase": "Shop at supermarket",
    "phraseTranslation": "在超市购物",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "supermarket.jpg",
        "url": "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "library",
    "standardized": "library",
    "chinese": "图书馆",
    "phonetic": "/ˈlaɪˌbrɛri/",
    "phrase": "Read in library",
    "phraseTranslation": "在图书馆读书",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "library.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "restaurant",
    "standardized": "restaurant",
    "chinese": "餐厅",
    "phonetic": "/ˈrɛstərənt/",
    "phrase": "Eat at restaurant",
    "phraseTranslation": "在餐厅吃饭",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "restaurant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "zoo",
    "standardized": "zoo",
    "chinese": "动物园",
    "phonetic": "/zuː/",
    "phrase": "Visit the zoo",
    "phraseTranslation": "参观动物园",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "zoo.jpg",
        "url": "https://images.unsplash.com/photo-1516642499105-492ff6d1c1d0?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "beach",
    "standardized": "beach",
    "chinese": "海滩",
    "phonetic": "/biːtʃ/",
    "phrase": "Play at beach",
    "phraseTranslation": "在海滩玩耍",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "beach.jpg",
        "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },

  // === 节日与庆典 ===
  {
    "word": "birthday",
    "standardized": "birthday",
    "chinese": "生日",
    "phonetic": "/ˈbɜːrθˌdeɪ/",
    "phrase": "Happy birthday",
    "phraseTranslation": "生日快乐",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "birthday.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f382.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "party",
    "standardized": "party",
    "chinese": "聚会",
    "phonetic": "/ˈpɑːrti/",
    "phrase": "Fun party",
    "phraseTranslation": "有趣的聚会",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "party.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f389.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "gift",
    "standardized": "gift",
    "chinese": "礼物",
    "phonetic": "/ɡɪft/",
    "phrase": "Beautiful gift",
    "phraseTranslation": "美丽的礼物",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "gift.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f381.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cake",
    "standardized": "cake",
    "chinese": "蛋糕",
    "phonetic": "/keɪk/",
    "phrase": "Birthday cake",
    "phraseTranslation": "生日蛋糕",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "cake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f370.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "balloon",
    "standardized": "balloon",
    "chinese": "气球",
    "phonetic": "/bəˈluːn/",
    "phrase": "Colorful balloon",
    "phraseTranslation": "彩色气球",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "balloon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f388.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 技术与电子产品 ===
  {
    "word": "computer",
    "standardized": "computer",
    "chinese": "电脑",
    "phonetic": "/kəmˈpjuːtər/",
    "phrase": "Use computer",
    "phraseTranslation": "使用电脑",
    "difficulty": "basic",
    "category": "technology",
    "imageURLs": [
      {
        "filename": "computer.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4bb.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "phone",
    "standardized": "phone",
    "chinese": "电话",
    "phonetic": "/foʊn/",
    "phrase": "Make a phone call",
    "phraseTranslation": "打电话",
    "difficulty": "basic",
    "category": "technology",
    "imageURLs": [
      {
        "filename": "phone.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4f1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "camera",
    "standardized": "camera",
    "chinese": "照相机",
    "phonetic": "/ˈkæmərə/",
    "phrase": "Take photo with camera",
    "phraseTranslation": "用照相机拍照",
    "difficulty": "basic",
    "category": "technology",
    "imageURLs": [
      {
        "filename": "camera.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4f7.svg",
        "type": "Emoji"
      }
    ]
  }
];

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KINDERGARTEN_GENERAL_EXTENDED;
} else if (typeof window !== 'undefined') {
  window.KINDERGARTEN_GENERAL_EXTENDED = window.KINDERGARTEN_GENERAL_EXTENDED || [
  // === 地点场所 ===
  {
    "word": "home",
    "standardized": "home",
    "chinese": "家",
    "phonetic": "/hoʊm/",
    "phrase": "Go home",
    "phraseTranslation": "回家",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "home.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "park",
    "standardized": "park",
    "chinese": "公园",
    "phonetic": "/pɑːrk/",
    "phrase": "Play in the park",
    "phraseTranslation": "在公园玩",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "park.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3de.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hospital",
    "standardized": "hospital",
    "chinese": "医院",
    "phonetic": "/ˈhɑːspɪtəl/",
    "phrase": "Go to hospital",
    "phraseTranslation": "去医院",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "hospital.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "supermarket",
    "standardized": "supermarket",
    "chinese": "超市",
    "phonetic": "/ˈsuːpərˌmɑːrkət/",
    "phrase": "Shop at supermarket",
    "phraseTranslation": "在超市购物",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "supermarket.jpg",
        "url": "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "library",
    "standardized": "library",
    "chinese": "图书馆",
    "phonetic": "/ˈlaɪˌbrɛri/",
    "phrase": "Read in library",
    "phraseTranslation": "在图书馆读书",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "library.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "restaurant",
    "standardized": "restaurant",
    "chinese": "餐厅",
    "phonetic": "/ˈrɛstərənt/",
    "phrase": "Eat at restaurant",
    "phraseTranslation": "在餐厅吃饭",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "restaurant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3

