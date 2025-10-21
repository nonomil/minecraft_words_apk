// Kindergarten Pack: 生活交流 (Life & Communication) - 扩展版
// 包含：日常生活、礼貌用语、基础交流、家庭生活、身体部位、衣物、食物、情感等
// 目标：支持幼儿基本生活对话和自主表达，涵盖约700个词汇

const KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED = [
  // === 基础问候与礼貌用语 ===
  {
    "word": "hello",
    "standardized": "hello",
    "chinese": "你好",
    "phonetic": "/həˈloʊ/",
    "phrase": "Hello, nice to meet you",
    "phraseTranslation": "你好，很高兴见到你",
    "difficulty": "basic",
    "category": "greeting",
    "imageURLs": [
      {
        "filename": "hello.jpg",
        "url": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "goodbye",
    "standardized": "goodbye",
    "chinese": "再见",
    "phonetic": "/ˌɡʊdˈbaɪ/",
    "phrase": "Goodbye, see you tomorrow",
    "phraseTranslation": "再见，明天见",
    "difficulty": "basic",
    "category": "greeting",
    "imageURLs": [
      {
        "filename": "goodbye.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f44b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "please",
    "standardized": "please",
    "chinese": "请",
    "phonetic": "/pliːz/",
    "phrase": "Please help me",
    "phraseTranslation": "请帮助我",
    "difficulty": "basic",
    "category": "polite",
    "imageURLs": [
      {
        "filename": "please.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "thank you",
    "standardized": "thank you",
    "chinese": "谢谢",
    "phonetic": "/ˈθæŋk juː/",
    "phrase": "Thank you very much",
    "phraseTranslation": "非常感谢",
    "difficulty": "basic",
    "category": "polite",
    "imageURLs": [
      {
        "filename": "thank_you.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sorry",
    "standardized": "sorry",
    "chinese": "对不起",
    "phonetic": "/ˈsɒri/",
    "phrase": "I am sorry",
    "phraseTranslation": "我很抱歉",
    "difficulty": "basic",
    "category": "polite",
    "imageURLs": [
      {
        "filename": "sorry.jpg",
        "url": "https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "yes",
    "standardized": "yes",
    "chinese": "是",
    "phonetic": "/jɛs/",
    "phrase": "Yes, please",
    "phraseTranslation": "是的，请",
    "difficulty": "basic",
    "category": "basic",
    "imageURLs": [
      {
        "filename": "yes.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2713.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "no",
    "standardized": "no",
    "chinese": "不",
    "phonetic": "/noʊ/",
    "phrase": "No, thank you",
    "phraseTranslation": "不，谢谢",
    "difficulty": "basic",
    "category": "basic",
    "imageURLs": [
      {
        "filename": "no.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/274c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "excuse me",
    "standardized": "excuse me",
    "chinese": "打扰一下",
    "phonetic": "/ɪkˈskjuːz miː/",
    "phrase": "Excuse me, may I pass",
    "phraseTranslation": "打扰一下，我可以过去吗",
    "difficulty": "intermediate",
    "category": "polite",
    "imageURLs": [
      {
        "filename": "excuse_me.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "welcome",
    "standardized": "welcome",
    "chinese": "欢迎",
    "phonetic": "/ˈwɛlkəm/",
    "phrase": "You're welcome",
    "phraseTranslation": "不客气",
    "difficulty": "intermediate",
    "category": "polite",
    "imageURLs": [
      {
        "filename": "welcome.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f917.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "good morning",
    "standardized": "good morning",
    "chinese": "早上好",
    "phonetic": "/ɡʊd ˈmɔːrnɪŋ/",
    "phrase": "Good morning everyone",
    "phraseTranslation": "大家早上好",
    "difficulty": "basic",
    "category": "greeting",
    "imageURLs": [
      {
        "filename": "good_morning.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f305.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "good night",
    "standardized": "good night",
    "chinese": "晚安",
    "phonetic": "/ɡʊd naɪt/",
    "phrase": "Good night, sweet dreams",
    "phraseTranslation": "晚安，做个好梦",
    "difficulty": "basic",
    "category": "greeting",
    "imageURLs": [
      {
        "filename": "good_night.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f319.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 基本情感与感受 ===
  {
    "word": "happy",
    "standardized": "happy",
    "chinese": "开心的",
    "phonetic": "/ˈhæpi/",
    "phrase": "I feel happy",
    "phraseTranslation": "我感到开心",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "happy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f60a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sad",
    "standardized": "sad",
    "chinese": "难过的",
    "phonetic": "/sæd/",
    "phrase": "I feel sad",
    "phraseTranslation": "我感到难过",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "sad.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f622.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "angry",
    "standardized": "angry",
    "chinese": "生气的",
    "phonetic": "/ˈæŋɡri/",
    "phrase": "Don't be angry",
    "phraseTranslation": "不要生气",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "angry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f621.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "scared",
    "standardized": "scared",
    "chinese": "害怕的",
    "phonetic": "/skɛrd/",
    "phrase": "Don't be scared",
    "phraseTranslation": "不要害怕",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "scared.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f628.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "excited",
    "standardized": "excited",
    "chinese": "兴奋的",
    "phonetic": "/ɪkˈsaɪtəd/",
    "phrase": "I feel excited",
    "phraseTranslation": "我感到兴奋",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "excited.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f929.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "surprised",
    "standardized": "surprised",
    "chinese": "惊讶的",
    "phonetic": "/sərˈpraɪzd/",
    "phrase": "I am surprised",
    "phraseTranslation": "我很惊讶",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "surprised.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f632.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tired",
    "standardized": "tired",
    "chinese": "累的",
    "phonetic": "/ˈtaɪərd/",
    "phrase": "I feel tired",
    "phraseTranslation": "我感觉累了",
    "difficulty": "basic",
    "category": "emotion",
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
    "phrase": "I am hungry",
    "phraseTranslation": "我饿了",
    "difficulty": "basic",
    "category": "emotion",
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
    "phrase": "I am thirsty",
    "phraseTranslation": "我渴了",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "thirsty.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a7.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sleepy",
    "standardized": "sleepy",
    "chinese": "困的",
    "phonetic": "/ˈsliːpi/",
    "phrase": "I feel sleepy",
    "phraseTranslation": "我感觉困了",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "sleepy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f634.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 家庭成员 ===
  {
    "word": "family",
    "standardized": "family",
    "chinese": "家庭",
    "phonetic": "/ˈfæməli/",
    "phrase": "My family",
    "phraseTranslation": "我的家庭",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "family.jpg",
        "url": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "mother",
    "standardized": "mother",
    "chinese": "妈妈",
    "phonetic": "/ˈmʌðər/",
    "phrase": "I love my mother",
    "phraseTranslation": "我爱我的妈妈",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "mother.jpg",
        "url": "https://images.unsplash.com/photo-1581998392741-67879e0ef04a?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "father",
    "standardized": "father",
    "chinese": "爸爸",
    "phonetic": "/ˈfɑːðər/",
    "phrase": "My father is strong",
    "phraseTranslation": "我爸爸很强壮",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "father.jpg",
        "url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "mom",
    "standardized": "mom",
    "chinese": "妈妈",
    "phonetic": "/mɑːm/",
    "phrase": "Hi mom",
    "phraseTranslation": "嗨，妈妈",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "mom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f469.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dad",
    "standardized": "dad",
    "chinese": "爸爸",
    "phonetic": "/dæd/",
    "phrase": "Hi dad",
    "phraseTranslation": "嗨，爸爸",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "dad.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "baby",
    "standardized": "baby",
    "chinese": "宝宝",
    "phonetic": "/ˈbeɪbi/",
    "phrase": "The baby is sleeping",
    "phraseTranslation": "宝宝在睡觉",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "baby.jpg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f476.svg",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "sister",
    "standardized": "sister",
    "chinese": "姐姐/妹妹",
    "phonetic": "/ˈsɪstər/",
    "phrase": "My little sister",
    "phraseTranslation": "我的小妹妹",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "sister.jpg",
        "url": "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "brother",
    "standardized": "brother",
    "chinese": "哥哥/弟弟",
    "phonetic": "/ˈbrʌðər/",
    "phrase": "My big brother",
    "phraseTranslation": "我的大哥哥",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "brother.jpg",
        "url": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "grandpa",
    "standardized": "grandpa",
    "chinese": "爷爷",
    "phonetic": "/ˈɡrænˌpɑː/",
    "phrase": "Kind grandpa",
    "phraseTranslation": "慈祥的爷爷",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "grandpa.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f474.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grandma",
    "standardized": "grandma",
    "chinese": "奶奶",
    "phonetic": "/ˈɡrænˌmɑː/",
    "phrase": "Sweet grandma",
    "phraseTranslation": "慈祥的奶奶",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "grandma.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f475.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 日常动作 ===
  {
    "word": "eat",
    "standardized": "eat",
    "chinese": "吃",
    "phonetic": "/iːt/",
    "phrase": "Eat breakfast",
    "phraseTranslation": "吃早餐",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "eat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f374.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "drink",
    "standardized": "drink",
    "chinese": "喝",
    "phonetic": "/drɪŋk/",
    "phrase": "Drink water",
    "phraseTranslation": "喝水",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "drink.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f943.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sleep",
    "standardized": "sleep",
    "chinese": "睡觉",
    "phonetic": "/sliːp/",
    "phrase": "Go to sleep",
    "phraseTranslation": "去睡觉",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "sleep.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f634.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "play",
    "standardized": "play",
    "chinese": "玩",
    "phonetic": "/pleɪ/",
    "phrase": "Play with friends",
    "phraseTranslation": "和朋友一起玩",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "play.jpg",
        "url": "https://images.unsplash.com/photo-1500995617113-cf789362a3e1?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "wash",
    "standardized": "wash",
    "chinese": "洗",
    "phonetic": "/wɒʃ/",
    "phrase": "Wash hands",
    "phraseTranslation": "洗手",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "wash.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9fc.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "walk",
    "standardized": "walk",
    "chinese": "走路",
    "phonetic": "/wɔːk/",
    "phrase": "Walk slowly",
    "phraseTranslation": "慢慢走路",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "walk.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6b6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "run",
    "standardized": "run",
    "chinese": "跑步",
    "phonetic": "/rʌn/",
    "phrase": "Run fast",
    "phraseTranslation": "跑得快",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "run.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "jump",
    "standardized": "jump",
    "chinese": "跳",
    "phonetic": "/dʒʌmp/",
    "phrase": "Jump high",
    "phraseTranslation": "跳得高",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "jump.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sit down",
    "standardized": "sit down",
    "chinese": "坐下",
    "phonetic": "/sɪt daʊn/",
    "phrase": "Please sit down",
    "phraseTranslation": "请坐下",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "sit.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa91.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "stand up",
    "standardized": "stand up",
    "chinese": "站起来",
    "phonetic": "/stænd ʌp/",
    "phrase": "Stand up straight",
    "phraseTranslation": "站直",
    "difficulty": "basic",
    "category": "daily_action",
    "imageURLs": [
      {
        "filename": "stand.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9cd.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 身体部位 ===
  {
    "word": "head",
    "standardized": "head",
    "chinese": "头",
    "phonetic": "/hɛd/",
    "phrase": "Touch your head",
    "phraseTranslation": "摸摸你的头",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "head.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hair",
    "standardized": "hair",
    "chinese": "头发",
    "phonetic": "/hɛr/",
    "phrase": "Beautiful hair",
    "phraseTranslation": "美丽的头发",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "hair.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "eye",
    "standardized": "eye",
    "chinese": "眼睛",
    "phonetic": "/aɪ/",
    "phrase": "Close your eyes",
    "phraseTranslation": "闭上你的眼睛",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "eye.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f441.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ear",
    "standardized": "ear",
    "chinese": "耳朵",
    "phonetic": "/ɪr/",
    "phrase": "Listen with your ears",
    "phraseTranslation": "用耳朵听",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "ear.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f442.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "nose",
    "standardized": "nose",
    "chinese": "鼻子",
    "phonetic": "/noʊz/",
    "phrase": "Touch your nose",
    "phraseTranslation": "摸摸你的鼻子",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "nose.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f443.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "mouth",
    "standardized": "mouth",
    "chinese": "嘴巴",
    "phonetic": "/maʊθ/",
    "phrase": "Open your mouth",
    "phraseTranslation": "张开你的嘴巴",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "mouth.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f444.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "teeth",
    "standardized": "teeth",
    "chinese": "牙齿",
    "phonetic": "/tiːθ/",
    "phrase": "White teeth",
    "phraseTranslation": "洁白的牙齿",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "teeth.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9b7.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hand",
    "standardized": "hand",
    "chinese": "手",
    "phonetic": "/hænd/",
    "phrase": "Raise your hand",
    "phraseTranslation": "举起你的手",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "hand.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/270b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "finger",
    "standardized": "finger",
    "chinese": "手指",
    "phonetic": "/ˈfɪŋɡər/",
    "phrase": "Five fingers",
    "phraseTranslation": "五个手指",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "finger.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f448.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "arm",
    "standardized": "arm",
    "chinese": "胳膊",
    "phonetic": "/ɑːrm/",
    "phrase": "Strong arms",
    "phraseTranslation": "强壮的胳膊",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "arm.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4aa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "leg",
    "standardized": "leg",
    "chinese": "腿",
    "phonetic": "/lɛɡ/",
    "phrase": "Two legs",
    "phraseTranslation": "两条腿",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "leg.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9b5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "foot",
    "standardized": "foot",
    "chinese": "脚",
    "phonetic": "/fʊt/",
    "phrase": "Stand on one foot",
    "phraseTranslation": "单脚站立",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "foot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9b6.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 食物与饮料 ===
  {
    "word": "apple",
    "standardized": "apple",
    "chinese": "苹果",
    "phonetic": "/ˈæpəl/",
    "phrase": "Red apple",
    "phraseTranslation": "红苹果",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "apple.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "banana",
    "standardized": "banana",
    "chinese": "香蕉",
    "phonetic": "/bəˈnænə/",
    "phrase": "Yellow banana",
    "phraseTranslation": "黄香蕉",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "banana.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "orange",
    "standardized": "orange",
    "chinese": "橙子",
    "phonetic": "/ˈɔːrɪndʒ/",
    "phrase": "Sweet orange",
    "phraseTranslation": "甜橙子",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "orange.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grape",
    "standardized": "grape",
    "chinese": "葡萄",
    "phonetic": "/ɡreɪp/",
    "phrase": "Purple grapes",
    "phraseTranslation": "紫葡萄",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "grape.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f347.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "strawberry",
    "standardized": "strawberry",
    "chinese": "草莓",
    "phonetic": "/ˈstrɔːˌbɛri/",
    "phrase": "Sweet strawberry",
    "phraseTranslation": "甜草莓",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "strawberry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f353.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "watermelon",
    "standardized": "watermelon",
    "chinese": "西瓜",
    "phonetic": "/ˈwɔːtərˌmɛlən/",
    "phrase": "Juicy watermelon",
    "phraseTranslation": "多汁的西瓜",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "watermelon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f349.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "peach",
    "standardized": "peach",
    "chinese": "桃子",
    "phonetic": "/piːtʃ/",
    "phrase": "Soft peach",
    "phraseTranslation": "软桃子",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "peach.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f351.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pear",
    "standardized": "pear",
    "chinese": "梨",
    "phonetic": "/pɛr/",
    "phrase": "Yellow pear",
    "phraseTranslation": "黄梨",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "pear.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f350.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rice",
    "standardized": "rice",
    "chinese": "米饭",
    "phonetic": "/raɪs/",
    "phrase": "Eat rice",
    "phraseTranslation": "吃米饭",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "rice.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f35a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "noodles",
    "standardized": "noodles",
    "chinese": "面条",
    "phonetic": "/ˈnuːdəlz/",
    "phrase": "Delicious noodles",
    "phraseTranslation": "美味的面条",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "noodles.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f35c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bread",
    "standardized": "bread",
    "chinese": "面包",
    "phonetic": "/brɛd/",
    "phrase": "Fresh bread",
    "phraseTranslation": "新鲜面包",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "bread.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f35e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "egg",
    "standardized": "egg",
    "chinese": "鸡蛋",
    "phonetic": "/ɛɡ/",
    "phrase": "Fried egg",
    "phraseTranslation": "煎蛋",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "egg.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f95a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "milk",
    "standardized": "milk",
    "chinese": "牛奶",
    "phonetic": "/mɪlk/",
    "phrase": "Drink milk",
    "phraseTranslation": "喝牛奶",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "milk.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f95b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "water",
    "standardized": "water",
    "chinese": "水",
    "phonetic": "/ˈwɔːtər/",
    "phrase": "Drink water",
    "phraseTranslation": "喝水",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "water.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a7.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "juice",
    "standardized": "juice",
    "chinese": "果汁",
    "phonetic": "/dʒuːs/",
    "phrase": "Orange juice",
    "phraseTranslation": "橙汁",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "juice.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9c3.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 衣物与配饰 ===
  {
    "word": "shirt",
    "standardized": "shirt",
    "chinese": "衬衫",
    "phonetic": "/ʃɜːrt/",
    "phrase": "Put on shirt",
    "phraseTranslation": "穿上衬衫",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "shirt.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f455.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pants",
    "standardized": "pants",
    "chinese": "裤子",
    "phonetic": "/pænts/",
    "phrase": "Blue pants",
    "phraseTranslation": "蓝裤子",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "pants.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f456.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dress",
    "standardized": "dress",
    "chinese": "连衣裙",
    "phonetic": "/drɛs/",
    "phrase": "Beautiful dress",
    "phraseTranslation": "漂亮的连衣裙",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "dress.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f457.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shoes",
    "standardized": "shoes",
    "chinese": "鞋子",
    "phonetic": "/ʃuːz/",
    "phrase": "Wear shoes",
    "phraseTranslation": "穿鞋子",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "shoes.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f45f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "socks",
    "standardized": "socks",
    "chinese": "袜子",
    "phonetic": "/sɑːks/",
    "phrase": "Warm socks",
    "phraseTranslation": "暖和的袜子",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "socks.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hat",
    "standardized": "hat",
    "chinese": "帽子",
    "phonetic": "/hæt/",
    "phrase": "Red hat",
    "phraseTranslation": "红帽子",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "hat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3a9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "jacket",
    "standardized": "jacket",
    "chinese": "夹克",
    "phonetic": "/ˈdʒækɪt/",
    "phrase": "Warm jacket",
    "phraseTranslation": "暖和的夹克",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "jacket.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "coat",
    "standardized": "coat",
    "chinese": "外套",
    "phonetic": "/koʊt/",
    "phrase": "Winter coat",
    "phraseTranslation": "冬天的外套",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "coat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e5.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 颜色 ===
  {
    "word": "red",
    "standardized": "red",
    "chinese": "红色",
    "phonetic": "/rɛd/",
    "phrase": "Red apple",
    "phraseTranslation": "红苹果",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "red.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f534.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "blue",
    "standardized": "blue",
    "chinese": "蓝色",
    "phonetic": "/bluː/",
    "phrase": "Blue sky",
    "phraseTranslation": "蓝天",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "blue.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f535.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "yellow",
    "standardized": "yellow",
    "chinese": "黄色",
    "phonetic": "/ˈjɛloʊ/",
    "phrase": "Yellow sun",
    "phraseTranslation": "黄太阳",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "yellow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f7e1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "green",
    "standardized": "green",
    "chinese": "绿色",
    "phonetic": "/ɡriːn/",
    "phrase": "Green grass",
    "phraseTranslation": "绿草",
    "difficulty": "basic",
    "category": "color",
    "imageURLs": [
      {
        "filename": "green.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f7e2.svg",
        "type": "Emoji"
      }
    ]
  },
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

  // === 数字 ===
  {
    "word": "one",
    "standardized": "one",
    "chinese": "一",
    "phonetic": "/wʌn/",
    "phrase": "One apple",
    "phraseTranslation": "一个苹果",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "one.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/31-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "two",
    "standardized": "two",
    "chinese": "二",
    "phonetic": "/tuː/",
    "phrase": "Two hands",
    "phraseTranslation": "两只手",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "two.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/32-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "three",
    "standardized": "three",
    "chinese": "三",
    "phonetic": "/θriː/",
    "phrase": "Three stars",
    "phraseTranslation": "三颗星星",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "three.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/33-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
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
  }
];

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED;
} else if (typeof window !== 'undefined') {
  window.KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED = KINDERGARTEN_LIFE_COMMUNICATION_EXPANDED;
}
