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
  },
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
        "filename": "baby.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f476.svg",
        "type": "Emoji"
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
  },

  // === 更多数字 ===
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
    "phrase": "Eight balloons",
    "phraseTranslation": "八个气球",
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
    "phrase": "Nine candles",
    "phraseTranslation": "九根蜡烛",
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
    "phrase": "Ten fingers",
    "phraseTranslation": "十个手指",
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
  {
    "word": "zero",
    "standardized": "zero",
    "chinese": "零",
    "phonetic": "/ˈzɪroʊ/",
    "phrase": "Zero cookies",
    "phraseTranslation": "零个饼干",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "zero.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/30-fe0f-20e3.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多食物 ===
  {
    "word": "pizza",
    "standardized": "pizza",
    "chinese": "比萨饼",
    "phonetic": "/ˈpiːtsə/",
    "phrase": "Delicious pizza",
    "phraseTranslation": "美味的比萨饼",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "pizza.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f355.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hamburger",
    "standardized": "hamburger",
    "chinese": "汉堡包",
    "phonetic": "/ˈhæmbɜːrɡər/",
    "phrase": "Eat hamburger",
    "phraseTranslation": "吃汉堡包",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "hamburger.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f354.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sandwich",
    "standardized": "sandwich",
    "chinese": "三明治",
    "phonetic": "/ˈsændwɪtʃ/",
    "phrase": "Make sandwich",
    "phraseTranslation": "做三明治",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "sandwich.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f96a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hot dog",
    "standardized": "hot dog",
    "chinese": "热狗",
    "phonetic": "/hɑːt dɔːɡ/",
    "phrase": "Yummy hot dog",
    "phraseTranslation": "美味的热狗",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "hot_dog.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f32d.svg",
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
    "category": "food",
    "imageURLs": [
      {
        "filename": "cake.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f382.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cookie",
    "standardized": "cookie",
    "chinese": "饼干",
    "phonetic": "/ˈkʊki/",
    "phrase": "Sweet cookie",
    "phraseTranslation": "甜饼干",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "cookie.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f36a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ice cream",
    "standardized": "ice cream",
    "chinese": "冰淇淋",
    "phonetic": "/aɪs kriːm/",
    "phrase": "Cold ice cream",
    "phraseTranslation": "冷冰淇淋",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "ice_cream.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f366.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "candy",
    "standardized": "candy",
    "chinese": "糖果",
    "phonetic": "/ˈkændi/",
    "phrase": "Colorful candy",
    "phraseTranslation": "彩色糖果",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "candy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f36d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "chocolate",
    "standardized": "chocolate",
    "chinese": "巧克力",
    "phonetic": "/ˈtʃɔːklət/",
    "phrase": "Sweet chocolate",
    "phraseTranslation": "甜巧克力",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "chocolate.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f36b.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 房间与家具 ===
  {
    "word": "house",
    "standardized": "house",
    "chinese": "房子",
    "phonetic": "/haʊs/",
    "phrase": "My house",
    "phraseTranslation": "我的房子",
    "difficulty": "basic",
    "category": "home",
    "imageURLs": [
      {
        "filename": "house.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "room",
    "standardized": "room",
    "chinese": "房间",
    "phonetic": "/ruːm/",
    "phrase": "Clean room",
    "phraseTranslation": "干净的房间",
    "difficulty": "basic",
    "category": "home",
    "imageURLs": [
      {
        "filename": "room.jpg",
        "url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "bedroom",
    "standardized": "bedroom",
    "chinese": "卧室",
    "phonetic": "/ˈbɛdruːm/",
    "phrase": "Sleep in bedroom",
    "phraseTranslation": "在卧室睡觉",
    "difficulty": "basic",
    "category": "home",
    "imageURLs": [
      {
        "filename": "bedroom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6cf.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "kitchen",
    "standardized": "kitchen",
    "chinese": "厨房",
    "phonetic": "/ˈkɪtʃən/",
    "phrase": "Cook in kitchen",
    "phraseTranslation": "在厨房做饭",
    "difficulty": "basic",
    "category": "home",
    "imageURLs": [
      {
        "filename": "kitchen.jpg",
        "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "bathroom",
    "standardized": "bathroom",
    "chinese": "浴室",
    "phonetic": "/ˈbæθruːm/",
    "phrase": "Wash in bathroom",
    "phraseTranslation": "在浴室洗澡",
    "difficulty": "basic",
    "category": "home",
    "imageURLs": [
      {
        "filename": "bathroom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6c0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "living room",
    "standardized": "living room",
    "chinese": "客厅",
    "phonetic": "/ˈlɪvɪŋ ruːm/",
    "phrase": "Watch TV in living room",
    "phraseTranslation": "在客厅看电视",
    "difficulty": "intermediate",
    "category": "home",
    "imageURLs": [
      {
        "filename": "living_room.jpg",
        "url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "bed",
    "standardized": "bed",
    "chinese": "床",
    "phonetic": "/bɛd/",
    "phrase": "Sleep on bed",
    "phraseTranslation": "在床上睡觉",
    "difficulty": "basic",
    "category": "home",
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
    "category": "home",
    "imageURLs": [
      {
        "filename": "table.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4ba.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sofa",
    "standardized": "sofa",
    "chinese": "沙发",
    "phonetic": "/ˈsoʊfə/",
    "phrase": "Sit on sofa",
    "phraseTranslation": "坐在沙发上",
    "difficulty": "basic",
    "category": "home",
    "imageURLs": [
      {
        "filename": "sofa.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6cb.svg",
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
    "category": "home",
    "imageURLs": [
      {
        "filename": "window.jpg",
        "url": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
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
    "category": "home",
    "imageURLs": [
      {
        "filename": "door.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6aa.svg",
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
    "phrase": "Play with toy",
    "phraseTranslation": "玩玩具",
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
    "word": "doll",
    "standardized": "doll",
    "chinese": "娃娃",
    "phonetic": "/dɑːl/",
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
    "word": "ball",
    "standardized": "ball",
    "chinese": "球",
    "phonetic": "/bɔːl/",
    "phrase": "Throw the ball",
    "phraseTranslation": "扔球",
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
    "word": "puzzle",
    "standardized": "puzzle",
    "chinese": "拼图",
    "phonetic": "/ˈpʌzəl/",
    "phrase": "Solve puzzle",
    "phraseTranslation": "拼拼图",
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
    "word": "blocks",
    "standardized": "blocks",
    "chinese": "积木",
    "phonetic": "/blɑːks/",
    "phrase": "Build with blocks",
    "phraseTranslation": "用积木搭建",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "blocks.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "car",
    "standardized": "car",
    "chinese": "汽车",
    "phonetic": "/kɑːr/",
    "phrase": "Red toy car",
    "phraseTranslation": "红色玩具汽车",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "car.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f697.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "train",
    "standardized": "train",
    "chinese": "火车",
    "phonetic": "/treɪn/",
    "phrase": "Toy train",
    "phraseTranslation": "玩具火车",
    "difficulty": "basic",
    "category": "toy",
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
    "phrase": "Fly airplane",
    "phraseTranslation": "开飞机",
    "difficulty": "basic",
    "category": "toy",
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
    "phrase": "Toy boat",
    "phraseTranslation": "玩具船",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "boat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26f5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "teddy bear",
    "standardized": "teddy bear",
    "chinese": "泰迪熊",
    "phonetic": "/ˈtɛdi bɛr/",
    "phrase": "Soft teddy bear",
    "phraseTranslation": "柔软的泰迪熊",
    "difficulty": "intermediate",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "teddy_bear.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f8.svg",
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
        "filename": "morning.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f305.svg",
        "type": "Emoji"
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
        "filename": "afternoon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2600.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "evening",
    "standardized": "evening",
    "chinese": "晚上",
    "phonetic": "/ˈiːvnɪŋ/",
    "phrase": "Good evening",
    "phraseTranslation": "晚上好",
    "difficulty": "intermediate",
    "category": "time",
    "imageURLs": [
      {
        "filename": "evening.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f307.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "night",
    "standardized": "night",
    "chinese": "夜晚",
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
    "phraseTranslation": "今天是晴天",
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
  {
    "word": "tomorrow",
    "standardized": "tomorrow",
    "chinese": "明天",
    "phonetic": "/təˈmɑːroʊ/",
    "phrase": "Tomorrow will be great",
    "phraseTranslation": "明天会很棒",
    "difficulty": "intermediate",
    "category": "time",
    "imageURLs": [
      {
        "filename": "tomorrow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "week",
    "standardized": "week",
    "chinese": "星期",
    "phonetic": "/wiːk/",
    "phrase": "One week",
    "phraseTranslation": "一个星期",
    "difficulty": "intermediate",
    "category": "time",
    "imageURLs": [
      {
        "filename": "week.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 日常用品 ===
  {
    "word": "toothbrush",
    "standardized": "toothbrush",
    "chinese": "牙刷",
    "phonetic": "/ˈtuːθbrʌʃ/",
    "phrase": "Use toothbrush",
    "phraseTranslation": "使用牙刷",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "toothbrush.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1faa5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "soap",
    "standardized": "soap",
    "chinese": "肥皂",
    "phonetic": "/soʊp/",
    "phrase": "Wash with soap",
    "phraseTranslation": "用肥皂洗",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "soap.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9fc.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "towel",
    "standardized": "towel",
    "chinese": "毛巾",
    "phonetic": "/ˈtaʊəl/",
    "phrase": "Dry with towel",
    "phraseTranslation": "用毛巾擦干",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "towel.jpg",
        "url": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "mirror",
    "standardized": "mirror",
    "chinese": "镜子",
    "phonetic": "/ˈmɪrər/",
    "phrase": "Look in mirror",
    "phraseTranslation": "照镜子",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "mirror.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fa9e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "comb",
    "standardized": "comb",
    "chinese": "梳子",
    "phonetic": "/koʊm/",
    "phrase": "Comb your hair",
    "phraseTranslation": "梳头发",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "comb.jpg",
        "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "brush",
    "standardized": "brush",
    "chinese": "刷子",
    "phonetic": "/brʌʃ/",
    "phrase": "Hair brush",
    "phraseTranslation": "头发刷",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "brush.jpg",
        "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "cup",
    "standardized": "cup",
    "chinese": "杯子",
    "phonetic": "/kʌp/",
    "phrase": "Drink from cup",
    "phraseTranslation": "用杯子喝",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "cup.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2615.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "plate",
    "standardized": "plate",
    "chinese": "盘子",
    "phonetic": "/pleɪt/",
    "phrase": "Food on plate",
    "phraseTranslation": "盘子里的食物",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "plate.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f37d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bowl",
    "standardized": "bowl",
    "chinese": "碗",
    "phonetic": "/boʊl/",
    "phrase": "Eat from bowl",
    "phraseTranslation": "用碗吃饭",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "bowl.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f963.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "spoon",
    "standardized": "spoon",
    "chinese": "勺子",
    "phonetic": "/spuːn/",
    "phrase": "Eat with spoon",
    "phraseTranslation": "用勺子吃",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "spoon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f944.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fork",
    "standardized": "fork",
    "chinese": "叉子",
    "phonetic": "/fɔːrk/",
    "phrase": "Eat with fork",
    "phraseTranslation": "用叉子吃",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "fork.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f374.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "knife",
    "standardized": "knife",
    "chinese": "刀子",
    "phonetic": "/naɪf/",
    "phrase": "Cut with knife",
    "phraseTranslation": "用刀子切",
    "difficulty": "basic",
    "category": "daily",
    "imageURLs": [
      {
        "filename": "knife.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f52a.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多情感词汇 ===
  {
    "word": "love",
    "standardized": "love",
    "chinese": "爱",
    "phonetic": "/lʌv/",
    "phrase": "I love you",
    "phraseTranslation": "我爱你",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "love.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2764.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "worried",
    "standardized": "worried",
    "chinese": "担心的",
    "phonetic": "/ˈwɜːrid/",
    "phrase": "Don't be worried",
    "phraseTranslation": "不要担心",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "worried.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "proud",
    "standardized": "proud",
    "chinese": "骄傲的",
    "phonetic": "/praʊd/",
    "phrase": "I am proud",
    "phraseTranslation": "我很骄傲",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "proud.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f60c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shy",
    "standardized": "shy",
    "chinese": "害羞的",
    "phonetic": "/ʃaɪ/",
    "phrase": "Feel shy",
    "phraseTranslation": "感到害羞",
    "difficulty": "basic",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "shy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f633.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "brave",
    "standardized": "brave",
    "chinese": "勇敢的",
    "phonetic": "/breɪv/",
    "phrase": "Be brave",
    "phraseTranslation": "要勇敢",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "brave.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4aa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "calm",
    "standardized": "calm",
    "chinese": "冷静的",
    "phonetic": "/kɑːm/",
    "phrase": "Stay calm",
    "phraseTranslation": "保持冷静",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "calm.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f60c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "confused",
    "standardized": "confused",
    "chinese": "困惑的",
    "phonetic": "/kənˈfjuːzd/",
    "phrase": "I am confused",
    "phraseTranslation": "我很困惑",
    "difficulty": "advanced",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "confused.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f615.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lonely",
    "standardized": "lonely",
    "chinese": "孤独的",
    "phonetic": "/ˈloʊnli/",
    "phrase": "Feel lonely",
    "phraseTranslation": "感到孤独",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "lonely.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f622.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多动作词汇 ===
  {
    "word": "dance",
    "standardized": "dance",
    "chinese": "跳舞",
    "phonetic": "/dæns/",
    "phrase": "Dance together",
    "phraseTranslation": "一起跳舞",
    "difficulty": "basic",
    "category": "action",
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
    "category": "action",
    "imageURLs": [
      {
        "filename": "sing.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3a4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "clap",
    "standardized": "clap",
    "chinese": "拍手",
    "phonetic": "/klæp/",
    "phrase": "Clap your hands",
    "phraseTranslation": "拍拍手",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "clap.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f44f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "wave",
    "standardized": "wave",
    "chinese": "挥手",
    "phonetic": "/weɪv/",
    "phrase": "Wave goodbye",
    "phraseTranslation": "挥手再见",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "wave.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f44b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "point",
    "standardized": "point",
    "chinese": "指向",
    "phonetic": "/pɔɪnt/",
    "phrase": "Point at the sky",
    "phraseTranslation": "指向天空",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "point.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f448.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hug",
    "standardized": "hug",
    "chinese": "拥抱",
    "phonetic": "/hʌɡ/",
    "phrase": "Give a hug",
    "phraseTranslation": "给一个拥抱",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "hug.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f917.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "kiss",
    "standardized": "kiss",
    "chinese": "亲吻",
    "phonetic": "/kɪs/",
    "phrase": "Kiss goodnight",
    "phraseTranslation": "晚安吻",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "kiss.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f618.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "laugh",
    "standardized": "laugh",
    "chinese": "笑",
    "phonetic": "/læf/",
    "phrase": "Laugh loudly",
    "phraseTranslation": "大声笑",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "laugh.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f602.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cry",
    "standardized": "cry",
    "chinese": "哭",
    "phonetic": "/kraɪ/",
    "phrase": "Don't cry",
    "phraseTranslation": "不要哭",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "cry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f622.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shout",
    "standardized": "shout",
    "chinese": "喊叫",
    "phonetic": "/ʃaʊt/",
    "phrase": "Don't shout",
    "phraseTranslation": "不要喊叫",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "shout.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4e2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "whisper",
    "standardized": "whisper",
    "chinese": "低声说话",
    "phonetic": "/ˈwɪspər/",
    "phrase": "Whisper quietly",
    "phraseTranslation": "小声说话",
    "difficulty": "intermediate",
    "category": "action",
    "imageURLs": [
      {
        "filename": "whisper.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f92b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "listen",
    "standardized": "listen",
    "chinese": "听",
    "phonetic": "/ˈlɪsən/",
    "phrase": "Listen carefully",
    "phraseTranslation": "仔细听",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "listen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f442.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 形容词 ===
  {
    "word": "big",
    "standardized": "big",
    "chinese": "大的",
    "phonetic": "/bɪɡ/",
    "phrase": "Big elephant",
    "phraseTranslation": "大象",
    "difficulty": "basic",
    "category": "adjective",
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
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "small.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f401.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tall",
    "standardized": "tall",
    "chinese": "高的",
    "phonetic": "/tɔːl/",
    "phrase": "Tall tree",
    "phraseTranslation": "高大的树",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "tall.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f333.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "short",
    "standardized": "short",
    "chinese": "矮的",
    "phonetic": "/ʃɔːrt/",
    "phrase": "Short person",
    "phraseTranslation": "矮的人",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "short.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fat",
    "standardized": "fat",
    "chinese": "胖的",
    "phonetic": "/fæt/",
    "phrase": "Fat cat",
    "phraseTranslation": "胖猫",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "fat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f431.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "thin",
    "standardized": "thin",
    "chinese": "瘦的",
    "phonetic": "/θɪn/",
    "phrase": "Thin stick",
    "phraseTranslation": "细棍子",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "thin.jpg",
        "url": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "fast",
    "standardized": "fast",
    "chinese": "快的",
    "phonetic": "/fæst/",
    "phrase": "Run fast",
    "phraseTranslation": "跑得快",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "fast.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "slow",
    "standardized": "slow",
    "chinese": "慢的",
    "phonetic": "/sloʊ/",
    "phrase": "Walk slow",
    "phraseTranslation": "走得慢",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "slow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f422.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hot",
    "standardized": "hot",
    "chinese": "热的",
    "phonetic": "/hɑːt/",
    "phrase": "Hot soup",
    "phraseTranslation": "热汤",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "hot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f525.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cold",
    "standardized": "cold",
    "chinese": "冷的",
    "phonetic": "/koʊld/",
    "phrase": "Cold ice",
    "phraseTranslation": "冷冰",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "cold.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ca.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "warm",
    "standardized": "warm",
    "chinese": "温暖的",
    "phonetic": "/wɔːrm/",
    "phrase": "Warm hug",
    "phraseTranslation": "温暖的拥抱",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "warm.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f917.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cool",
    "standardized": "cool",
    "chinese": "凉爽的",
    "phonetic": "/kuːl/",
    "phrase": "Cool breeze",
    "phraseTranslation": "凉爽的微风",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "cool.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f32c.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多家庭关系 ===
  {
    "word": "aunt",
    "standardized": "aunt",
    "chinese": "阿姨",
    "phonetic": "/ænt/",
    "phrase": "My aunt",
    "phraseTranslation": "我的阿姨",
    "difficulty": "intermediate",
    "category": "family",
    "imageURLs": [
      {
        "filename": "aunt.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f469.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "uncle",
    "standardized": "uncle",
    "chinese": "叔叔",
    "phonetic": "/ˈʌŋkəl/",
    "phrase": "My uncle",
    "phraseTranslation": "我的叔叔",
    "difficulty": "intermediate",
    "category": "family",
    "imageURLs": [
      {
        "filename": "uncle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cousin",
    "standardized": "cousin",
    "chinese": "表兄弟姐妹",
    "phonetic": "/ˈkʌzən/",
    "phrase": "Play with cousin",
    "phraseTranslation": "和表兄弟姐妹玩",
    "difficulty": "intermediate",
    "category": "family",
    "imageURLs": [
      {
        "filename": "cousin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pet",
    "standardized": "pet",
    "chinese": "宠物",
    "phonetic": "/pɛt/",
    "phrase": "My pet dog",
    "phraseTranslation": "我的宠物狗",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "pet.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f436.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 社交词汇 ===
  {
    "word": "friend",
    "standardized": "friend",
    "chinese": "朋友",
    "phonetic": "/frɛnd/",
    "phrase": "My best friend",
    "phraseTranslation": "我最好的朋友",
    "difficulty": "basic",
    "category": "social",
    "imageURLs": [
      {
        "filename": "friend.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f465.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "share",
    "standardized": "share",
    "chinese": "分享",
    "phonetic": "/ʃɛr/",
    "phrase": "Share with friends",
    "phraseTranslation": "和朋友分享",
    "difficulty": "basic",
    "category": "social",
    "imageURLs": [
      {
        "filename": "share.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "help",
    "standardized": "help",
    "chinese": "帮助",
    "phonetic": "/hɛlp/",
    "phrase": "Help each other",
    "phraseTranslation": "互相帮助",
    "difficulty": "basic",
    "category": "social",
    "imageURLs": [
      {
        "filename": "help.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "kind",
    "standardized": "kind",
    "chinese": "善良的",
    "phonetic": "/kaɪnd/",
    "phrase": "Be kind",
    "phraseTranslation": "要善良",
    "difficulty": "basic",
    "category": "social",
    "imageURLs": [
      {
        "filename": "kind.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f917.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "nice",
    "standardized": "nice",
    "chinese": "友好的",
    "phonetic": "/naɪs/",
    "phrase": "Nice person",
    "phraseTranslation": "友好的人",
    "difficulty": "basic",
    "category": "social",
    "imageURLs": [
      {
        "filename": "nice.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f60a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "polite",
    "standardized": "polite",
    "chinese": "礼貌的",
    "phonetic": "/pəˈlaɪt/",
    "phrase": "Be polite",
    "phraseTranslation": "要有礼貌",
    "difficulty": "intermediate",
    "category": "social",
    "imageURLs": [
      {
        "filename": "polite.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 基础对话用语 ===
  {
    "word": "what",
    "standardized": "what",
    "chinese": "什么",
    "phonetic": "/wʌt/",
    "phrase": "What is this?",
    "phraseTranslation": "这是什么？",
    "difficulty": "basic",
    "category": "question",
    "imageURLs": [
      {
        "filename": "what.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2753.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "where",
    "standardized": "where",
    "chinese": "哪里",
    "phonetic": "/wɛr/",
    "phrase": "Where are you?",
    "phraseTranslation": "你在哪里？",
    "difficulty": "basic",
    "category": "question",
    "imageURLs": [
      {
        "filename": "where.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2753.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "when",
    "standardized": "when",
    "chinese": "什么时候",
    "phonetic": "/wɛn/",
    "phrase": "When will you come?",
    "phraseTranslation": "你什么时候来？",
    "difficulty": "basic",
    "category": "question",
    "imageURLs": [
      {
        "filename": "when.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "who",
    "standardized": "who",
    "chinese": "谁",
    "phonetic": "/hu/",
    "phrase": "Who is that?",
    "phraseTranslation": "那是谁？",
    "difficulty": "basic",
    "category": "question",
    "imageURLs": [
      {
        "filename": "who.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f464.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "why",
    "standardized": "why",
    "chinese": "为什么",
    "phonetic": "/waɪ/",
    "phrase": "Why are you sad?",
    "phraseTranslation": "你为什么难过？",
    "difficulty": "intermediate",
    "category": "question",
    "imageURLs": [
      {
        "filename": "why.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2753.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "how",
    "standardized": "how",
    "chinese": "怎么样",
    "phonetic": "/haʊ/",
    "phrase": "How are you?",
    "phraseTranslation": "你好吗？",
    "difficulty": "basic",
    "category": "question",
    "imageURLs": [
      {
        "filename": "how.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2753.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "can",
    "standardized": "can",
    "chinese": "可以",
    "phonetic": "/kæn/",
    "phrase": "Can you help me?",
    "phraseTranslation": "你可以帮助我吗？",
    "difficulty": "basic",
    "category": "question",
    "imageURLs": [
      {
        "filename": "can.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2753.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "may",
    "standardized": "may",
    "chinese": "可能",
    "phonetic": "/meɪ/",
    "phrase": "May I play?",
    "phraseTranslation": "我可以玩吗？",
    "difficulty": "intermediate",
    "category": "question",
    "imageURLs": [
      {
        "filename": "may.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2753.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "will",
    "standardized": "will",
    "chinese": "将要",
    "phonetic": "/wɪl/",
    "phrase": "I will come",
    "phraseTranslation": "我将会来",
    "difficulty": "intermediate",
    "category": "question",
    "imageURLs": [
      {
        "filename": "will.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多衣物配饰 ===
  {
    "word": "gloves",
    "standardized": "gloves",
    "chinese": "手套",
    "phonetic": "/ɡlʌvz/",
    "phrase": "Warm gloves",
    "phraseTranslation": "暖和的手套",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "gloves.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "scarf",
    "standardized": "scarf",
    "chinese": "围巾",
    "phonetic": "/skɑːrf/",
    "phrase": "Colorful scarf",
    "phraseTranslation": "彩色围巾",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "scarf.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "belt",
    "standardized": "belt",
    "chinese": "腰带",
    "phonetic": "/bɛlt/",
    "phrase": "Leather belt",
    "phraseTranslation": "皮腰带",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "belt.jpg",
        "url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "tie",
    "standardized": "tie",
    "chinese": "领带",
    "phonetic": "/taɪ/",
    "phrase": "Blue tie",
    "phraseTranslation": "蓝色领带",
    "difficulty": "intermediate",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "tie.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f454.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "glasses",
    "standardized": "glasses",
    "chinese": "眼镜",
    "phonetic": "/ˈɡlæsəz/",
    "phrase": "Wear glasses",
    "phraseTranslation": "戴眼镜",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "glasses.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f453.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "watch",
    "standardized": "watch",
    "chinese": "手表",
    "phonetic": "/wɑːtʃ/",
    "phrase": "Check the watch",
    "phraseTranslation": "看手表",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "watch.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/231a.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多身体部位 ===
  {
    "word": "face",
    "standardized": "face",
    "chinese": "脸",
    "phonetic": "/feɪs/",
    "phrase": "Wash your face",
    "phraseTranslation": "洗脸",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "face.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "neck",
    "standardized": "neck",
    "chinese": "脖子",
    "phonetic": "/nɛk/",
    "phrase": "Turn your neck",
    "phraseTranslation": "转动脖子",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "neck.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shoulder",
    "standardized": "shoulder",
    "chinese": "肩膀",
    "phonetic": "/ˈʃoʊldər/",
    "phrase": "Strong shoulders",
    "phraseTranslation": "强壮的肩膀",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "shoulder.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4aa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "back",
    "standardized": "back",
    "chinese": "背部",
    "phonetic": "/bæk/",
    "phrase": "Straight back",
    "phraseTranslation": "挺直背部",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "back.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9cd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "chest",
    "standardized": "chest",
    "chinese": "胸部",
    "phonetic": "/tʃɛst/",
    "phrase": "Deep breath in chest",
    "phraseTranslation": "胸部深呼吸",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "chest.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "stomach",
    "standardized": "stomach",
    "chinese": "肚子",
    "phonetic": "/ˈstʌmək/",
    "phrase": "Full stomach",
    "phraseTranslation": "饱饱的肚子",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "stomach.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "knee",
    "standardized": "knee",
    "chinese": "膝盖",
    "phonetic": "/niː/",
    "phrase": "Bend your knee",
    "phraseTranslation": "弯曲膝盖",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "knee.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9b5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "toe",
    "standardized": "toe",
    "chinese": "脚趾",
    "phonetic": "/toʊ/",
    "phrase": "Wiggle your toes",
    "phraseTranslation": "摆动脚趾",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "toe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9b6.svg",
        "type": "Emoji"
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
    "phrase": "Special gift",
    "phraseTranslation": "特别的礼物",
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
    "word": "present",
    "standardized": "present",
    "chinese": "礼品",
    "phonetic": "/ˈprɛzənt/",
    "phrase": "Unwrap present",
    "phraseTranslation": "拆礼品",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "present.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f381.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "candle",
    "standardized": "candle",
    "chinese": "蜡烛",
    "phonetic": "/ˈkændəl/",
    "phrase": "Blow out candle",
    "phraseTranslation": "吹灭蜡烛",
    "difficulty": "basic",
    "category": "celebration",
    "imageURLs": [
      {
        "filename": "candle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f56f.svg",
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

  // === 更多生活场景词汇 ===
  {
    "word": "kitchen",
    "standardized": "kitchen",
    "chinese": "厨房",
    "phonetic": "/ˈkɪtʃən/",
    "phrase": "Cook in kitchen",
    "phraseTranslation": "在厨房做饭",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "kitchen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bathroom",
    "standardized": "bathroom",
    "chinese": "浴室",
    "phonetic": "/ˈbæθruːm/",
    "phrase": "Use bathroom",
    "phraseTranslation": "使用浴室",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "bathroom.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6c1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "garden",
    "standardized": "garden",
    "chinese": "花园",
    "phonetic": "/ˈɡɑːrdən/",
    "phrase": "Beautiful garden",
    "phraseTranslation": "美丽的花园",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "garden.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "playground",
    "standardized": "playground",
    "chinese": "操场",
    "phonetic": "/ˈpleɪɡraʊnd/",
    "phrase": "Play at playground",
    "phraseTranslation": "在操场玩",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "playground.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3de.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "park",
    "standardized": "park",
    "chinese": "公园",
    "phonetic": "/pɑːrk/",
    "phrase": "Walk in park",
    "phraseTranslation": "在公园散步",
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
    "word": "store",
    "standardized": "store",
    "chinese": "商店",
    "phonetic": "/stɔːr/",
    "phrase": "Go to store",
    "phraseTranslation": "去商店",
    "difficulty": "basic",
    "category": "place",
    "imageURLs": [
      {
        "filename": "store.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3ea.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hospital",
    "standardized": "hospital",
    "chinese": "医院",
    "phonetic": "/ˈhɑːspɪtəl/",
    "phrase": "Visit hospital",
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
    "word": "library",
    "standardized": "library",
    "chinese": "图书馆",
    "phonetic": "/ˈlaɪbreri/",
    "phrase": "Read at library",
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
    "word": "restaurant",
    "standardized": "restaurant",
    "chinese": "餐厅",
    "phonetic": "/ˈrestərɑːnt/",
    "phrase": "Eat at restaurant",
    "phraseTranslation": "在餐厅吃饭",
    "difficulty": "intermediate",
    "category": "place",
    "imageURLs": [
      {
        "filename": "restaurant.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f37d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多动物 ===
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
    "word": "lion",
    "standardized": "lion",
    "chinese": "狮子",
    "phonetic": "/ˈlaɪən/",
    "phrase": "Brave lion",
    "phraseTranslation": "勇敢的狮子",
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
    "phrase": "Strong tiger",
    "phraseTranslation": "强壮的老虎",
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
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f407.svg",
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
    "phrase": "Milk cow",
    "phraseTranslation": "奶牛",
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
    "phraseTranslation": "粉红猪",
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
    "chinese": "羊",
    "phonetic": "/ʃiːp/",
    "phrase": "Fluffy sheep",
    "phraseTranslation": "毛茸茸的羊",
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

  // === 交通工具 ===
  {
    "word": "car",
    "standardized": "car",
    "chinese": "汽车",
    "phonetic": "/kɑːr/",
    "phrase": "Red car",
    "phraseTranslation": "红色汽车",
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
    "phrase": "School bus",
    "phraseTranslation": "校车",
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
    "word": "plane",
    "standardized": "plane",
    "chinese": "飞机",
    "phonetic": "/pleɪn/",
    "phrase": "Flying plane",
    "phraseTranslation": "飞行的飞机",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "plane.svg",
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
    "phrase": "Sailing boat",
    "phraseTranslation": "帆船",
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
  {
    "word": "bike",
    "standardized": "bike",
    "chinese": "自行车",
    "phonetic": "/baɪk/",
    "phrase": "Ride bike",
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
    "word": "truck",
    "standardized": "truck",
    "chinese": "卡车",
    "phonetic": "/trʌk/",
    "phrase": "Big truck",
    "phraseTranslation": "大卡车",
    "difficulty": "basic",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "truck.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f69a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "taxi",
    "standardized": "taxi",
    "chinese": "出租车",
    "phonetic": "/ˈtæksi/",
    "phrase": "Yellow taxi",
    "phraseTranslation": "黄色出租车",
    "difficulty": "intermediate",
    "category": "transport",
    "imageURLs": [
      {
        "filename": "taxi.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f695.svg",
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
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-2695-fe0f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "teacher",
    "standardized": "teacher",
    "chinese": "老师",
    "phonetic": "/ˈtiːtʃər/",
    "phrase": "Good teacher",
    "phraseTranslation": "好老师",
    "difficulty": "basic",
    "category": "job",
    "imageURLs": [
      {
        "filename": "teacher.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-1f3eb.svg",
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
    "phrase": "Hero firefighter",
    "phraseTranslation": "英雄消防员",
    "difficulty": "intermediate",
    "category": "job",
    "imageURLs": [
      {
        "filename": "firefighter.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-1f692.svg",
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
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-1f373.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "farmer",
    "standardized": "farmer",
    "chinese": "农民",
    "phonetic": "/ˈfɑːrmər/",
    "phrase": "Hard-working farmer",
    "phraseTranslation": "勤劳的农民",
    "difficulty": "basic",
    "category": "job",
    "imageURLs": [
      {
        "filename": "farmer.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-1f33e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pilot",
    "standardized": "pilot",
    "chinese": "飞行员",
    "phonetic": "/ˈpaɪlət/",
    "phrase": "Skilled pilot",
    "phraseTranslation": "技术熟练的飞行员",
    "difficulty": "intermediate",
    "category": "job",
    "imageURLs": [
      {
        "filename": "pilot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-2708-fe0f.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 运动和活动 ===
  {
    "word": "swim",
    "standardized": "swim",
    "chinese": "游泳",
    "phonetic": "/swɪm/",
    "phrase": "Swim in pool",
    "phraseTranslation": "在游泳池游泳",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "swim.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3ca.svg",
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
    "category": "activity",
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
    "chinese": "跳跃",
    "phonetic": "/dʒʌmp/",
    "phrase": "Jump high",
    "phraseTranslation": "跳得高",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "jump.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f938.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "kick",
    "standardized": "kick",
    "chinese": "踢",
    "phonetic": "/kɪk/",
    "phrase": "Kick ball",
    "phraseTranslation": "踢球",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "kick.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26bd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "throw",
    "standardized": "throw",
    "chinese": "扔",
    "phonetic": "/θroʊ/",
    "phrase": "Throw ball",
    "phraseTranslation": "扔球",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "throw.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f93e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "catch",
    "standardized": "catch",
    "chinese": "接住",
    "phonetic": "/kætʃ/",
    "phrase": "Catch ball",
    "phraseTranslation": "接球",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "catch.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f945.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "climb",
    "standardized": "climb",
    "chinese": "爬",
    "phonetic": "/klaɪm/",
    "phrase": "Climb tree",
    "phraseTranslation": "爬树",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "climb.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d7.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "slide",
    "standardized": "slide",
    "chinese": "滑",
    "phonetic": "/slaɪd/",
    "phrase": "Slide down",
    "phraseTranslation": "滑下来",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "slide.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6dd.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 感官词汇 ===
  {
    "word": "see",
    "standardized": "see",
    "chinese": "看见",
    "phonetic": "/siː/",
    "phrase": "I can see",
    "phraseTranslation": "我能看见",
    "difficulty": "basic",
    "category": "sense",
    "imageURLs": [
      {
        "filename": "see.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f440.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hear",
    "standardized": "hear",
    "chinese": "听见",
    "phonetic": "/hɪr/",
    "phrase": "I can hear",
    "phraseTranslation": "我能听见",
    "difficulty": "basic",
    "category": "sense",
    "imageURLs": [
      {
        "filename": "hear.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f442.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "smell",
    "standardized": "smell",
    "chinese": "闻",
    "phonetic": "/smɛl/",
    "phrase": "Smell flowers",
    "phraseTranslation": "闻花香",
    "difficulty": "basic",
    "category": "sense",
    "imageURLs": [
      {
        "filename": "smell.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f443.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "taste",
    "standardized": "taste",
    "chinese": "尝",
    "phonetic": "/teɪst/",
    "phrase": "Taste food",
    "phraseTranslation": "尝食物",
    "difficulty": "basic",
    "category": "sense",
    "imageURLs": [
      {
        "filename": "taste.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f445.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "touch",
    "standardized": "touch",
    "chinese": "触摸",
    "phonetic": "/tʌtʃ/",
    "phrase": "Touch gently",
    "phraseTranslation": "轻轻触摸",
    "difficulty": "basic",
    "category": "sense",
    "imageURLs": [
      {
        "filename": "touch.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f590.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "feel",
    "standardized": "feel",
    "chinese": "感觉",
    "phonetic": "/fiːl/",
    "phrase": "Feel happy",
    "phraseTranslation": "感觉快乐",
    "difficulty": "basic",
    "category": "sense",
    "imageURLs": [
      {
        "filename": "feel.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f917.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多描述词汇 ===
  {
    "word": "new",
    "standardized": "new",
    "chinese": "新的",
    "phonetic": "/nuː/",
    "phrase": "New toy",
    "phraseTranslation": "新玩具",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "new.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f195.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "old",
    "standardized": "old",
    "chinese": "旧的",
    "phonetic": "/oʊld/",
    "phrase": "Old book",
    "phraseTranslation": "旧书",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "old.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "clean",
    "standardized": "clean",
    "chinese": "干净的",
    "phonetic": "/kliːn/",
    "phrase": "Clean room",
    "phraseTranslation": "干净的房间",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "clean.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2728.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dirty",
    "standardized": "dirty",
    "chinese": "脏的",
    "phonetic": "/ˈdɜːrti/",
    "phrase": "Dirty hands",
    "phraseTranslation": "脏手",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "dirty.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "soft",
    "standardized": "soft",
    "chinese": "柔软的",
    "phonetic": "/sɔːft/",
    "phrase": "Soft pillow",
    "phraseTranslation": "柔软的枕头",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "soft.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hard",
    "standardized": "hard",
    "chinese": "硬的",
    "phonetic": "/hɑːrd/",
    "phrase": "Hard rock",
    "phraseTranslation": "坚硬的岩石",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "hard.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1faa8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "smooth",
    "standardized": "smooth",
    "chinese": "光滑的",
    "phonetic": "/smuːð/",
    "phrase": "Smooth surface",
    "phraseTranslation": "光滑的表面",
    "difficulty": "intermediate",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "smooth.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2728.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rough",
    "standardized": "rough",
    "chinese": "粗糙的",
    "phonetic": "/rʌf/",
    "phrase": "Rough bark",
    "phraseTranslation": "粗糙的树皮",
    "difficulty": "intermediate",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "rough.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f333.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "heavy",
    "standardized": "heavy",
    "chinese": "重的",
    "phonetic": "/ˈhɛvi/",
    "phrase": "Heavy box",
    "phraseTranslation": "重箱子",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "heavy.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4e6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "light",
    "standardized": "light",
    "chinese": "轻的",
    "phonetic": "/laɪt/",
    "phrase": "Light feather",
    "phraseTranslation": "轻羽毛",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "light.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1fab6.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多常用动词 ===
  {
    "word": "give",
    "standardized": "give",
    "chinese": "给",
    "phonetic": "/ɡɪv/",
    "phrase": "Give me",
    "phraseTranslation": "给我",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "give.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "take",
    "standardized": "take",
    "chinese": "拿",
    "phonetic": "/teɪk/",
    "phrase": "Take this",
    "phraseTranslation": "拿这个",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "take.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "put",
    "standardized": "put",
    "chinese": "放",
    "phonetic": "/pʊt/",
    "phrase": "Put down",
    "phraseTranslation": "放下",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "put.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f448.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "get",
    "standardized": "get",
    "chinese": "得到",
    "phonetic": "/ɡɛt/",
    "phrase": "Get ready",
    "phraseTranslation": "准备好",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "get.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f44d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "make",
    "standardized": "make",
    "chinese": "制作",
    "phonetic": "/meɪk/",
    "phrase": "Make cake",
    "phraseTranslation": "做蛋糕",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "make.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f382.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "do",
    "standardized": "do",
    "chinese": "做",
    "phonetic": "/duː/",
    "phrase": "Do homework",
    "phraseTranslation": "做作业",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "do.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4dd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "go",
    "standardized": "go",
    "chinese": "去",
    "phonetic": "/ɡoʊ/",
    "phrase": "Go home",
    "phraseTranslation": "回家",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "go.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6b6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "come",
    "standardized": "come",
    "chinese": "来",
    "phonetic": "/kʌm/",
    "phrase": "Come here",
    "phraseTranslation": "来这里",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "come.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6b6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "stop",
    "standardized": "stop",
    "chinese": "停止",
    "phonetic": "/stɑːp/",
    "phrase": "Stop running",
    "phraseTranslation": "停止跑步",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "stop.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "start",
    "standardized": "start",
    "chinese": "开始",
    "phonetic": "/stɑːrt/",
    "phrase": "Start game",
    "phraseTranslation": "开始游戏",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "start.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/25b6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "finish",
    "standardized": "finish",
    "chinese": "完成",
    "phonetic": "/ˈfɪnɪʃ/",
    "phrase": "Finish work",
    "phraseTranslation": "完成工作",
    "difficulty": "intermediate",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "finish.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "open",
    "standardized": "open",
    "chinese": "打开",
    "phonetic": "/ˈoʊpən/",
    "phrase": "Open door",
    "phraseTranslation": "开门",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "open.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6aa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "close",
    "standardized": "close",
    "chinese": "关闭",
    "phonetic": "/kloʊz/",
    "phrase": "Close book",
    "phraseTranslation": "合上书",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "close.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "turn",
    "standardized": "turn",
    "chinese": "转",
    "phonetic": "/tɜːrn/",
    "phrase": "Turn around",
    "phraseTranslation": "转身",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "turn.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f504.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "move",
    "standardized": "move",
    "chinese": "移动",
    "phonetic": "/muːv/",
    "phrase": "Move slowly",
    "phraseTranslation": "慢慢移动",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "move.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6b6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "push",
    "standardized": "push",
    "chinese": "推",
    "phonetic": "/pʊʃ/",
    "phrase": "Push button",
    "phraseTranslation": "按按钮",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "push.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f590.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pull",
    "standardized": "pull",
    "chinese": "拉",
    "phonetic": "/pʊl/",
    "phrase": "Pull rope",
    "phraseTranslation": "拉绳子",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "pull.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "carry",
    "standardized": "carry",
    "chinese": "携带",
    "phonetic": "/ˈkæri/",
    "phrase": "Carry bag",
    "phraseTranslation": "背包",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "carry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f45c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hold",
    "standardized": "hold",
    "chinese": "握住",
    "phonetic": "/hoʊld/",
    "phrase": "Hold tight",
    "phraseTranslation": "握紧",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "hold.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "drop",
    "standardized": "drop",
    "chinese": "掉落",
    "phonetic": "/drɑːp/",
    "phrase": "Don't drop",
    "phraseTranslation": "不要掉落",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "drop.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a7.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pick",
    "standardized": "pick",
    "chinese": "捡起",
    "phonetic": "/pɪk/",
    "phrase": "Pick up toy",
    "phraseTranslation": "捡起玩具",
    "difficulty": "basic",
    "category": "verb",
    "imageURLs": [
      {
        "filename": "pick.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f590.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多水果 ===
  {
    "word": "grape",
    "standardized": "grape",
    "chinese": "葡萄",
    "phonetic": "/ɡreɪp/",
    "phrase": "Purple grape",
    "phraseTranslation": "紫葡萄",
    "difficulty": "basic",
    "category": "fruit",
    "imageURLs": [
      {
        "filename": "grape.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f347.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "watermelon",
    "standardized": "watermelon",
    "chinese": "西瓜",
    "phonetic": "/ˈwɔːtərˌmɛlən/",
    "phrase": "Sweet watermelon",
    "phraseTranslation": "甜西瓜",
    "difficulty": "intermediate",
    "category": "fruit",
    "imageURLs": [
      {
        "filename": "watermelon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f349.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "strawberry",
    "standardized": "strawberry",
    "chinese": "草莓",
    "phonetic": "/ˈstrɔːbɛri/",
    "phrase": "Red strawberry",
    "phraseTranslation": "红草莓",
    "difficulty": "intermediate",
    "category": "fruit",
    "imageURLs": [
      {
        "filename": "strawberry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f353.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "peach",
    "standardized": "peach",
    "chinese": "桃子",
    "phonetic": "/piːtʃ/",
    "phrase": "Juicy peach",
    "phraseTranslation": "多汁的桃子",
    "difficulty": "basic",
    "category": "fruit",
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
    "phrase": "Green pear",
    "phraseTranslation": "绿梨",
    "difficulty": "basic",
    "category": "fruit",
    "imageURLs": [
      {
        "filename": "pear.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f350.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cherry",
    "standardized": "cherry",
    "chinese": "樱桃",
    "phonetic": "/ˈtʃɛri/",
    "phrase": "Sweet cherry",
    "phraseTranslation": "甜樱桃",
    "difficulty": "basic",
    "category": "fruit",
    "imageURLs": [
      {
        "filename": "cherry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f352.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lemon",
    "standardized": "lemon",
    "chinese": "柠檬",
    "phonetic": "/ˈlɛmən/",
    "phrase": "Sour lemon",
    "phraseTranslation": "酸柠檬",
    "difficulty": "basic",
    "category": "fruit",
    "imageURLs": [
      {
        "filename": "lemon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pineapple",
    "standardized": "pineapple",
    "chinese": "菠萝",
    "phonetic": "/ˈpaɪnæpəl/",
    "phrase": "Tropical pineapple",
    "phraseTranslation": "热带菠萝",
    "difficulty": "intermediate",
    "category": "fruit",
    "imageURLs": [
      {
        "filename": "pineapple.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 蔬菜 ===
  {
    "word": "carrot",
    "standardized": "carrot",
    "chinese": "胡萝卜",
    "phonetic": "/ˈkærət/",
    "phrase": "Orange carrot",
    "phraseTranslation": "橙色胡萝卜",
    "difficulty": "basic",
    "category": "vegetable",
    "imageURLs": [
      {
        "filename": "carrot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f955.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "potato",
    "standardized": "potato",
    "chinese": "土豆",
    "phonetic": "/pəˈteɪtoʊ/",
    "phrase": "Big potato",
    "phraseTranslation": "大土豆",
    "difficulty": "basic",
    "category": "vegetable",
    "imageURLs": [
      {
        "filename": "potato.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f954.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tomato",
    "standardized": "tomato",
    "chinese": "番茄",
    "phonetic": "/təˈmeɪtoʊ/",
    "phrase": "Red tomato",
    "phraseTranslation": "红番茄",
    "difficulty": "basic",
    "category": "vegetable",
    "imageURLs": [
      {
        "filename": "tomato.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f345.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "onion",
    "standardized": "onion",
    "chinese": "洋葱",
    "phonetic": "/ˈʌnjən/",
    "phrase": "White onion",
    "phraseTranslation": "白洋葱",
    "difficulty": "basic",
    "category": "vegetable",
    "imageURLs": [
      {
        "filename": "onion.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "broccoli",
    "standardized": "broccoli",
    "chinese": "西兰花",
    "phonetic": "/ˈbrɑːkəli/",
    "phrase": "Green broccoli",
    "phraseTranslation": "绿色西兰花",
    "difficulty": "intermediate",
    "category": "vegetable",
    "imageURLs": [
      {
        "filename": "broccoli.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f966.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "corn",
    "standardized": "corn",
    "chinese": "玉米",
    "phonetic": "/kɔːrn/",
    "phrase": "Yellow corn",
    "phraseTranslation": "黄玉米",
    "difficulty": "basic",
    "category": "vegetable",
    "imageURLs": [
      {
        "filename": "corn.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多食物 ===
  {
    "word": "pizza",
    "standardized": "pizza",
    "chinese": "比萨",
    "phonetic": "/ˈpiːtsə/",
    "phrase": "Delicious pizza",
    "phraseTranslation": "美味的比萨",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "pizza.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f355.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hamburger",
    "standardized": "hamburger",
    "chinese": "汉堡包",
    "phonetic": "/ˈhæmbɜːrɡər/",
    "phrase": "Big hamburger",
    "phraseTranslation": "大汉堡包",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "hamburger.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f354.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sandwich",
    "standardized": "sandwich",
    "chinese": "三明治",
    "phonetic": "/ˈsænwɪtʃ/",
    "phrase": "Tasty sandwich",
    "phraseTranslation": "美味的三明治",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "sandwich.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f96a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "noodles",
    "standardized": "noodles",
    "chinese": "面条",
    "phonetic": "/ˈnuːdəlz/",
    "phrase": "Hot noodles",
    "phraseTranslation": "热面条",
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
    "word": "soup",
    "standardized": "soup",
    "chinese": "汤",
    "phonetic": "/suːp/",
    "phrase": "Warm soup",
    "phraseTranslation": "热汤",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "soup.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f372.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "salad",
    "standardized": "salad",
    "chinese": "沙拉",
    "phonetic": "/ˈsæləd/",
    "phrase": "Fresh salad",
    "phraseTranslation": "新鲜沙拉",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "salad.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f957.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 饮料 ===
  {
    "word": "juice",
    "standardized": "juice",
    "chinese": "果汁",
    "phonetic": "/dʒuːs/",
    "phrase": "Orange juice",
    "phraseTranslation": "橙汁",
    "difficulty": "basic",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "juice.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9c3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "milk",
    "standardized": "milk",
    "chinese": "牛奶",
    "phonetic": "/mɪlk/",
    "phrase": "Cold milk",
    "phraseTranslation": "冷牛奶",
    "difficulty": "basic",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "milk.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f95b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "coffee",
    "standardized": "coffee",
    "chinese": "咖啡",
    "phonetic": "/ˈkɔːfi/",
    "phrase": "Hot coffee",
    "phraseTranslation": "热咖啡",
    "difficulty": "intermediate",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "coffee.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2615.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tea",
    "standardized": "tea",
    "chinese": "茶",
    "phonetic": "/tiː/",
    "phrase": "Green tea",
    "phraseTranslation": "绿茶",
    "difficulty": "basic",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "tea.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f375.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 天气 ===
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
    "phrase": "Full moon",
    "phraseTranslation": "满月",
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
    "phrase": "Shining star",
    "phraseTranslation": "闪亮的星星",
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
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f328.svg",
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
    "phraseTranslation": "强风",
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
    "phonetic": "/ˈreɪnboʊ/",
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

  // === 学习用品 ===
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
    "phonetic": "/pɛn/",
    "phrase": "Blue pen",
    "phraseTranslation": "蓝钢笔",
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
    "phonetic": "/ˈpɛnsəl/",
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
    "word": "ruler",
    "standardized": "ruler",
    "chinese": "尺子",
    "phonetic": "/ˈruːlər/",
    "phrase": "Long ruler",
    "phraseTranslation": "长尺子",
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
    "word": "eraser",
    "standardized": "eraser",
    "chinese": "橡皮擦",
    "phonetic": "/ɪˈreɪsər/",
    "phrase": "Pink eraser",
    "phraseTranslation": "粉色橡皮擦",
    "difficulty": "intermediate",
    "category": "school",
    "imageURLs": [
      {
        "filename": "eraser.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9fd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "crayon",
    "standardized": "crayon",
    "chinese": "蜡笔",
    "phonetic": "/ˈkreɪɑːn/",
    "phrase": "Colorful crayon",
    "phraseTranslation": "彩色蜡笔",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "crayon.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f58d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "scissors",
    "standardized": "scissors",
    "chinese": "剪刀",
    "phonetic": "/ˈsɪzərz/",
    "phrase": "Sharp scissors",
    "phraseTranslation": "锋利的剪刀",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "scissors.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2702.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "glue",
    "standardized": "glue",
    "chinese": "胶水",
    "phonetic": "/ɡluː/",
    "phrase": "Sticky glue",
    "phraseTranslation": "粘胶水",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "glue.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f4.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 音乐 ===
  {
    "word": "music",
    "standardized": "music",
    "chinese": "音乐",
    "phonetic": "/ˈmjuːzɪk/",
    "phrase": "Beautiful music",
    "phraseTranslation": "美丽的音乐",
    "difficulty": "basic",
    "category": "music",
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
    "category": "music",
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
    "category": "music",
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
    "phrase": "Beat drum",
    "phraseTranslation": "敲鼓",
    "difficulty": "basic",
    "category": "music",
    "imageURLs": [
      {
        "filename": "drum.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f941.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 运动器材 ===
  {
    "word": "ball",
    "standardized": "ball",
    "chinese": "球",
    "phonetic": "/bɔːl/",
    "phrase": "Round ball",
    "phraseTranslation": "圆球",
    "difficulty": "basic",
    "category": "sport",
    "imageURLs": [
      {
        "filename": "ball.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/26bd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "bat",
    "standardized": "bat",
    "chinese": "球拍",
    "phonetic": "/bæt/",
    "phrase": "Wooden bat",
    "phraseTranslation": "木球拍",
    "difficulty": "basic",
    "category": "sport",
    "imageURLs": [
      {
        "filename": "bat.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3cf.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "net",
    "standardized": "net",
    "chinese": "网",
    "phonetic": "/nɛt/",
    "phrase": "Tennis net",
    "phraseTranslation": "网球网",
    "difficulty": "basic",
    "category": "sport",
    "imageURLs": [
      {
        "filename": "net.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f945.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多形状 ===
  {
    "word": "circle",
    "standardized": "circle",
    "chinese": "圆形",
    "phonetic": "/ˈsɜːrkəl/",
    "phrase": "Perfect circle",
    "phraseTranslation": "完美的圆形",
    "difficulty": "intermediate",
    "category": "shape",
    "imageURLs": [
      {
        "filename": "circle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f534.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "square",
    "standardized": "square",
    "chinese": "正方形",
    "phonetic": "/skwɛr/",
    "phrase": "Blue square",
    "phraseTranslation": "蓝色正方形",
    "difficulty": "intermediate",
    "category": "shape",
    "imageURLs": [
      {
        "filename": "square.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f7e6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "triangle",
    "standardized": "triangle",
    "chinese": "三角形",
    "phonetic": "/ˈtraɪæŋɡəl/",
    "phrase": "Sharp triangle",
    "phraseTranslation": "尖三角形",
    "difficulty": "intermediate",
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
    "word": "rectangle",
    "standardized": "rectangle",
    "chinese": "长方形",
    "phonetic": "/ˈrɛktæŋɡəl/",
    "phrase": "Long rectangle",
    "phraseTranslation": "长长方形",
    "difficulty": "advanced",
    "category": "shape",
    "imageURLs": [
      {
        "filename": "rectangle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f7e8.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 方向 ===
  {
    "word": "up",
    "standardized": "up",
    "chinese": "向上",
    "phonetic": "/ʌp/",
    "phrase": "Look up",
    "phraseTranslation": "向上看",
    "difficulty": "basic",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "up.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b06.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "down",
    "standardized": "down",
    "chinese": "向下",
    "phonetic": "/daʊn/",
    "phrase": "Look down",
    "phraseTranslation": "向下看",
    "difficulty": "basic",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "down.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b07.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "left",
    "standardized": "left",
    "chinese": "左边",
    "phonetic": "/lɛft/",
    "phrase": "Turn left",
    "phraseTranslation": "向左转",
    "difficulty": "basic",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "left.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b05.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "right",
    "standardized": "right",
    "chinese": "右边",
    "phonetic": "/raɪt/",
    "phrase": "Turn right",
    "phraseTranslation": "向右转",
    "difficulty": "basic",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "right.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/27a1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "front",
    "standardized": "front",
    "chinese": "前面",
    "phonetic": "/frʌnt/",
    "phrase": "In front",
    "phraseTranslation": "在前面",
    "difficulty": "basic",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "front.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b06.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "behind",
    "standardized": "behind",
    "chinese": "后面",
    "phonetic": "/bɪˈhaɪnd/",
    "phrase": "Stand behind",
    "phraseTranslation": "站在后面",
    "difficulty": "intermediate",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "behind.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b07.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "inside",
    "standardized": "inside",
    "chinese": "里面",
    "phonetic": "/ɪnˈsaɪd/",
    "phrase": "Go inside",
    "phraseTranslation": "进里面",
    "difficulty": "intermediate",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "inside.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "outside",
    "standardized": "outside",
    "chinese": "外面",
    "phonetic": "/ˈaʊtsaɪd/",
    "phrase": "Play outside",
    "phraseTranslation": "在外面玩",
    "difficulty": "intermediate",
    "category": "direction",
    "imageURLs": [
      {
        "filename": "outside.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3de.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多数字 ===
  {
    "word": "eleven",
    "standardized": "eleven",
    "chinese": "十一",
    "phonetic": "/ɪˈlɛvən/",
    "phrase": "Count eleven",
    "phraseTranslation": "数到十一",
    "difficulty": "intermediate",
    "category": "number",
    "imageURLs": [
      {
        "filename": "eleven.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/31-20e3-31-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "twelve",
    "standardized": "twelve",
    "chinese": "十二",
    "phonetic": "/twɛlv/",
    "phrase": "Count twelve",
    "phraseTranslation": "数到十二",
    "difficulty": "intermediate",
    "category": "number",
    "imageURLs": [
      {
        "filename": "twelve.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/31-20e3-32-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "twenty",
    "standardized": "twenty",
    "chinese": "二十",
    "phonetic": "/ˈtwɛnti/",
    "phrase": "Count twenty",
    "phraseTranslation": "数到二十",
    "difficulty": "intermediate",
    "category": "number",
    "imageURLs": [
      {
        "filename": "twenty.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/32-20e3-30-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hundred",
    "standardized": "hundred",
    "chinese": "一百",
    "phonetic": "/ˈhʌndrəd/",
    "phrase": "One hundred",
    "phraseTranslation": "一百",
    "difficulty": "advanced",
    "category": "number",
    "imageURLs": [
      {
        "filename": "hundred.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4af.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多常用词汇 ===
  {
    "word": "yes",
    "standardized": "yes",
    "chinese": "是的",
    "phonetic": "/jɛs/",
    "phrase": "Yes, please",
    "phraseTranslation": "是的，请",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "yes.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2705.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "no",
    "standardized": "no",
    "chinese": "不",
    "phonetic": "/noʊ/",
    "phrase": "No, thanks",
    "phraseTranslation": "不，谢谢",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "no.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/274c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "maybe",
    "standardized": "maybe",
    "chinese": "也许",
    "phonetic": "/ˈmeɪbi/",
    "phrase": "Maybe later",
    "phraseTranslation": "也许稍后",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "maybe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f937.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "always",
    "standardized": "always",
    "chinese": "总是",
    "phonetic": "/ˈɔːlweɪz/",
    "phrase": "Always happy",
    "phraseTranslation": "总是快乐",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "always.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/267e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "never",
    "standardized": "never",
    "chinese": "从不",
    "phonetic": "/ˈnɛvər/",
    "phrase": "Never give up",
    "phraseTranslation": "永不放弃",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "never.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6ab.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sometimes",
    "standardized": "sometimes",
    "chinese": "有时候",
    "phonetic": "/ˈsʌmtaɪmz/",
    "phrase": "Sometimes play",
    "phraseTranslation": "有时候玩",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "sometimes.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f504.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "here",
    "standardized": "here",
    "chinese": "这里",
    "phonetic": "/hɪr/",
    "phrase": "Come here",
    "phraseTranslation": "来这里",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "here.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4cd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "there",
    "standardized": "there",
    "chinese": "那里",
    "phonetic": "/ðɛr/",
    "phrase": "Over there",
    "phraseTranslation": "在那里",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "there.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f449.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "now",
    "standardized": "now",
    "chinese": "现在",
    "phonetic": "/naʊ/",
    "phrase": "Do it now",
    "phraseTranslation": "现在做",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "now.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/23f0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "later",
    "standardized": "later",
    "chinese": "稍后",
    "phonetic": "/ˈleɪtər/",
    "phrase": "See you later",
    "phraseTranslation": "稍后见",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "later.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/23f3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "today",
    "standardized": "today",
    "chinese": "今天",
    "phonetic": "/təˈdeɪ/",
    "phrase": "Play today",
    "phraseTranslation": "今天玩",
    "difficulty": "basic",
    "category": "common",
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
    "phonetic": "/təˈmɔːroʊ/",
    "phrase": "See tomorrow",
    "phraseTranslation": "明天见",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "tomorrow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "yesterday",
    "standardized": "yesterday",
    "chinese": "昨天",
    "phonetic": "/ˈjɛstərdeɪ/",
    "phrase": "Play yesterday",
    "phraseTranslation": "昨天玩",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "yesterday.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "first",
    "standardized": "first",
    "chinese": "第一",
    "phonetic": "/fɜːrst/",
    "phrase": "First place",
    "phraseTranslation": "第一名",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "first.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f947.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "last",
    "standardized": "last",
    "chinese": "最后",
    "phonetic": "/læst/",
    "phrase": "Last one",
    "phraseTranslation": "最后一个",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "last.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/23f9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "next",
    "standardized": "next",
    "chinese": "下一个",
    "phonetic": "/nɛkst/",
    "phrase": "Next turn",
    "phraseTranslation": "下一轮",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "next.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/23ed.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "before",
    "standardized": "before",
    "chinese": "之前",
    "phonetic": "/bɪˈfɔːr/",
    "phrase": "Before dinner",
    "phraseTranslation": "晚餐之前",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "before.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/23ee.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "after",
    "standardized": "after",
    "chinese": "之后",
    "phonetic": "/ˈæftər/",
    "phrase": "After lunch",
    "phraseTranslation": "午餐之后",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "after.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/23ed.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "more",
    "standardized": "more",
    "chinese": "更多",
    "phonetic": "/mɔːr/",
    "phrase": "Want more",
    "phraseTranslation": "想要更多",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "more.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2795.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "less",
    "standardized": "less",
    "chinese": "更少",
    "phonetic": "/lɛs/",
    "phrase": "Need less",
    "phraseTranslation": "需要更少",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "less.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2796.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "same",
    "standardized": "same",
    "chinese": "相同",
    "phonetic": "/seɪm/",
    "phrase": "Same color",
    "phraseTranslation": "相同颜色",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "same.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/267e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "different",
    "standardized": "different",
    "chinese": "不同",
    "phonetic": "/ˈdɪfərənt/",
    "phrase": "Different size",
    "phraseTranslation": "不同大小",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "different.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f504.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "all",
    "standardized": "all",
    "chinese": "全部",
    "phonetic": "/ɔːl/",
    "phrase": "All together",
    "phraseTranslation": "全部一起",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "all.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f465.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "some",
    "standardized": "some",
    "chinese": "一些",
    "phonetic": "/sʌm/",
    "phrase": "Some toys",
    "phraseTranslation": "一些玩具",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "some.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "many",
    "standardized": "many",
    "chinese": "许多",
    "phonetic": "/ˈmɛni/",
    "phrase": "Many friends",
    "phraseTranslation": "许多朋友",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "many.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f465.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "few",
    "standardized": "few",
    "chinese": "少数",
    "phonetic": "/fjuː/",
    "phrase": "Few people",
    "phraseTranslation": "少数人",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "few.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f464.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "every",
    "standardized": "every",
    "chinese": "每个",
    "phonetic": "/ˈɛvri/",
    "phrase": "Every day",
    "phraseTranslation": "每天",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "every.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "each",
    "standardized": "each",
    "chinese": "每一个",
    "phonetic": "/iːtʃ/",
    "phrase": "Each child",
    "phraseTranslation": "每一个孩子",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "each.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "other",
    "standardized": "other",
    "chinese": "其他",
    "phonetic": "/ˈʌðər/",
    "phrase": "Other toys",
    "phraseTranslation": "其他玩具",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "other.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f504.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "another",
    "standardized": "another",
    "chinese": "另一个",
    "phonetic": "/əˈnʌðər/",
    "phrase": "Another book",
    "phraseTranslation": "另一本书",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "another.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "both",
    "standardized": "both",
    "chinese": "两个都",
    "phonetic": "/boʊθ/",
    "phrase": "Both hands",
    "phraseTranslation": "双手",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "both.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "either",
    "standardized": "either",
    "chinese": "任一",
    "phonetic": "/ˈiːðər/",
    "phrase": "Either way",
    "phraseTranslation": "任一方式",
    "difficulty": "advanced",
    "category": "common",
    "imageURLs": [
      {
        "filename": "either.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f937.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "neither",
    "standardized": "neither",
    "chinese": "两个都不",
    "phonetic": "/ˈniːðər/",
    "phrase": "Neither one",
    "phraseTranslation": "两个都不",
    "difficulty": "advanced",
    "category": "common",
    "imageURLs": [
      {
        "filename": "neither.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6ab.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "only",
    "standardized": "only",
    "chinese": "只有",
    "phonetic": "/ˈoʊnli/",
    "phrase": "Only one",
    "phraseTranslation": "只有一个",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "only.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/31-20e3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "also",
    "standardized": "also",
    "chinese": "也",
    "phonetic": "/ˈɔːlsoʊ/",
    "phrase": "Also good",
    "phraseTranslation": "也很好",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "also.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2795.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "too",
    "standardized": "too",
    "chinese": "也",
    "phonetic": "/tuː/",
    "phrase": "Me too",
    "phraseTranslation": "我也是",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "too.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f44d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "very",
    "standardized": "very",
    "chinese": "非常",
    "phonetic": "/ˈvɛri/",
    "phrase": "Very good",
    "phraseTranslation": "非常好",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "very.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2728.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "much",
    "standardized": "much",
    "chinese": "很多",
    "phonetic": "/mʌtʃ/",
    "phrase": "Too much",
    "phraseTranslation": "太多了",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "much.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4af.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "little",
    "standardized": "little",
    "chinese": "小的",
    "phonetic": "/ˈlɪtəl/",
    "phrase": "Little bit",
    "phraseTranslation": "一点点",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "little.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4cf.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "enough",
    "standardized": "enough",
    "chinese": "足够",
    "phonetic": "/ɪˈnʌf/",
    "phrase": "Good enough",
    "phraseTranslation": "足够好",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "enough.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2705.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多家庭关系 ===
  {
    "word": "grandmother",
    "standardized": "grandmother",
    "chinese": "奶奶",
    "phonetic": "/ˈɡrænmʌðər/",
    "phrase": "Kind grandmother",
    "phraseTranslation": "慈祥的奶奶",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "grandmother.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f475.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grandfather",
    "standardized": "grandfather",
    "chinese": "爷爷",
    "phonetic": "/ˈɡrænfɑːðər/",
    "phrase": "Wise grandfather",
    "phraseTranslation": "智慧的爷爷",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "grandfather.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f474.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "uncle",
    "standardized": "uncle",
    "chinese": "叔叔",
    "phonetic": "/ˈʌŋkəl/",
    "phrase": "Funny uncle",
    "phraseTranslation": "有趣的叔叔",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "uncle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f468.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "aunt",
    "standardized": "aunt",
    "chinese": "阿姨",
    "phonetic": "/ænt/",
    "phrase": "Sweet aunt",
    "phraseTranslation": "甜美的阿姨",
    "difficulty": "basic",
    "category": "family",
    "imageURLs": [
      {
        "filename": "aunt.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f469.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cousin",
    "standardized": "cousin",
    "chinese": "表兄弟姐妹",
    "phonetic": "/ˈkʌzən/",
    "phrase": "Play with cousin",
    "phraseTranslation": "和表兄弟姐妹玩",
    "difficulty": "intermediate",
    "category": "family",
    "imageURLs": [
      {
        "filename": "cousin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "nephew",
    "standardized": "nephew",
    "chinese": "侄子",
    "phonetic": "/ˈnefjuː/",
    "phrase": "Little nephew",
    "phraseTranslation": "小侄子",
    "difficulty": "intermediate",
    "category": "family",
    "imageURLs": [
      {
        "filename": "nephew.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f466.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "niece",
    "standardized": "niece",
    "chinese": "侄女",
    "phonetic": "/niːs/",
    "phrase": "Cute niece",
    "phraseTranslation": "可爱的侄女",
    "difficulty": "intermediate",
    "category": "family",
    "imageURLs": [
      {
        "filename": "niece.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f467.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "twin",
    "standardized": "twin",
    "chinese": "双胞胎",
    "phonetic": "/twɪn/",
    "phrase": "Identical twin",
    "phraseTranslation": "同卵双胞胎",
    "difficulty": "intermediate",
    "category": "family",
    "imageURLs": [
      {
        "filename": "twin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多情感表达 ===
  {
    "word": "excited",
    "standardized": "excited",
    "chinese": "兴奋的",
    "phonetic": "/ɪkˈsaɪtɪd/",
    "phrase": "I am excited",
    "phraseTranslation": "我很兴奋",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "excited.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f604.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "worried",
    "standardized": "worried",
    "chinese": "担心的",
    "phonetic": "/ˈwɜːrid/",
    "phrase": "I feel worried",
    "phraseTranslation": "我感到担心",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "worried.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "proud",
    "standardized": "proud",
    "chinese": "骄傲的",
    "phonetic": "/praʊd/",
    "phrase": "I am proud",
    "phraseTranslation": "我很骄傲",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "proud.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f60e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "jealous",
    "standardized": "jealous",
    "chinese": "嫉妒的",
    "phonetic": "/ˈdʒeləs/",
    "phrase": "I feel jealous",
    "phraseTranslation": "我感到嫉妒",
    "difficulty": "advanced",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "jealous.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grateful",
    "standardized": "grateful",
    "chinese": "感激的",
    "phonetic": "/ˈɡreɪtfəl/",
    "phrase": "I am grateful",
    "phraseTranslation": "我很感激",
    "difficulty": "advanced",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "grateful.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "confused",
    "standardized": "confused",
    "chinese": "困惑的",
    "phonetic": "/kənˈfjuːzd/",
    "phrase": "I am confused",
    "phraseTranslation": "我很困惑",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "confused.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f615.svg",
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
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f62e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "disappointed",
    "standardized": "disappointed",
    "chinese": "失望的",
    "phonetic": "/ˌdɪsəˈpɔɪntɪd/",
    "phrase": "I feel disappointed",
    "phraseTranslation": "我感到失望",
    "difficulty": "advanced",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "disappointed.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61e.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多身体部位 ===
  {
    "word": "forehead",
    "standardized": "forehead",
    "chinese": "额头",
    "phonetic": "/ˈfɔːrhed/",
    "phrase": "Touch forehead",
    "phraseTranslation": "摸额头",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "forehead.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "eyebrow",
    "standardized": "eyebrow",
    "chinese": "眉毛",
    "phonetic": "/ˈaɪbraʊ/",
    "phrase": "Raise eyebrow",
    "phraseTranslation": "挑眉",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "eyebrow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "eyelash",
    "standardized": "eyelash",
    "chinese": "睫毛",
    "phonetic": "/ˈaɪlæʃ/",
    "phrase": "Long eyelash",
    "phraseTranslation": "长睫毛",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "eyelash.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cheek",
    "standardized": "cheek",
    "chinese": "脸颊",
    "phonetic": "/tʃiːk/",
    "phrase": "Soft cheek",
    "phraseTranslation": "柔软的脸颊",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "cheek.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "chin",
    "standardized": "chin",
    "chinese": "下巴",
    "phonetic": "/tʃɪn/",
    "phrase": "Pointed chin",
    "phraseTranslation": "尖下巴",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "chin.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shoulder",
    "standardized": "shoulder",
    "chinese": "肩膀",
    "phonetic": "/ˈʃoʊldər/",
    "phrase": "Strong shoulder",
    "phraseTranslation": "强壮的肩膀",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "shoulder.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "elbow",
    "standardized": "elbow",
    "chinese": "肘部",
    "phonetic": "/ˈelboʊ/",
    "phrase": "Bend elbow",
    "phraseTranslation": "弯曲肘部",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "elbow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "wrist",
    "standardized": "wrist",
    "chinese": "手腕",
    "phonetic": "/rɪst/",
    "phrase": "Flexible wrist",
    "phraseTranslation": "灵活的手腕",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "wrist.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "ankle",
    "standardized": "ankle",
    "chinese": "脚踝",
    "phonetic": "/ˈæŋkəl/",
    "phrase": "Sore ankle",
    "phraseTranslation": "疼痛的脚踝",
    "difficulty": "intermediate",
    "category": "body",
    "imageURLs": [
      {
        "filename": "ankle.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "heel",
    "standardized": "heel",
    "chinese": "脚跟",
    "phonetic": "/hiːl/",
    "phrase": "High heel",
    "phraseTranslation": "高跟鞋",
    "difficulty": "basic",
    "category": "body",
    "imageURLs": [
      {
        "filename": "heel.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多食物 ===
  {
    "word": "sandwich",
    "standardized": "sandwich",
    "chinese": "三明治",
    "phonetic": "/ˈsænwɪtʃ/",
    "phrase": "Eat sandwich",
    "phraseTranslation": "吃三明治",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "sandwich.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f96a.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pizza",
    "standardized": "pizza",
    "chinese": "披萨",
    "phonetic": "/ˈpiːtsə/",
    "phrase": "Delicious pizza",
    "phraseTranslation": "美味的披萨",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "pizza.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f355.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hamburger",
    "standardized": "hamburger",
    "chinese": "汉堡包",
    "phonetic": "/ˈhæmbɜːrɡər/",
    "phrase": "Big hamburger",
    "phraseTranslation": "大汉堡包",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "hamburger.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f354.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hotdog",
    "standardized": "hotdog",
    "chinese": "热狗",
    "phonetic": "/ˈhɑːtdɔːɡ/",
    "phrase": "Yummy hotdog",
    "phraseTranslation": "美味的热狗",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "hotdog.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f32d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "noodles",
    "standardized": "noodles",
    "chinese": "面条",
    "phonetic": "/ˈnuːdəlz/",
    "phrase": "Slurp noodles",
    "phraseTranslation": "吸面条",
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
    "word": "soup",
    "standardized": "soup",
    "chinese": "汤",
    "phonetic": "/suːp/",
    "phrase": "Warm soup",
    "phraseTranslation": "温热的汤",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "soup.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f35b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "salad",
    "standardized": "salad",
    "chinese": "沙拉",
    "phonetic": "/ˈsæləd/",
    "phrase": "Fresh salad",
    "phraseTranslation": "新鲜的沙拉",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "salad.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f957.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "pasta",
    "standardized": "pasta",
    "chinese": "意大利面",
    "phonetic": "/ˈpɑːstə/",
    "phrase": "Creamy pasta",
    "phraseTranslation": "奶油意大利面",
    "difficulty": "intermediate",
    "category": "food",
    "imageURLs": [
      {
        "filename": "pasta.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f35d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "rice",
    "standardized": "rice",
    "chinese": "米饭",
    "phonetic": "/raɪs/",
    "phrase": "Steamed rice",
    "phraseTranslation": "蒸米饭",
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
    "word": "bread",
    "standardized": "bread",
    "chinese": "面包",
    "phonetic": "/bred/",
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

  // === 更多饮料 ===
  {
    "word": "coffee",
    "standardized": "coffee",
    "chinese": "咖啡",
    "phonetic": "/ˈkɔːfi/",
    "phrase": "Hot coffee",
    "phraseTranslation": "热咖啡",
    "difficulty": "basic",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "coffee.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2615.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tea",
    "standardized": "tea",
    "chinese": "茶",
    "phonetic": "/tiː/",
    "phrase": "Green tea",
    "phraseTranslation": "绿茶",
    "difficulty": "basic",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "tea.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f375.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hotchocolate",
    "standardized": "hotchocolate",
    "chinese": "热巧克力",
    "phonetic": "/hɑːtˈtʃɔːklət/",
    "phrase": "Creamy hotchocolate",
    "phraseTranslation": "奶油热巧克力",
    "difficulty": "intermediate",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "hotchocolate.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2615.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "lemonade",
    "standardized": "lemonade",
    "chinese": "柠檬水",
    "phonetic": "/ˌleməˈneɪd/",
    "phrase": "Sweet lemonade",
    "phraseTranslation": "甜柠檬水",
    "difficulty": "intermediate",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "lemonade.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "smoothie",
    "standardized": "smoothie",
    "chinese": "奶昔",
    "phonetic": "/ˈsmuːði/",
    "phrase": "Fruit smoothie",
    "phraseTranslation": "水果奶昔",
    "difficulty": "intermediate",
    "category": "drink",
    "imageURLs": [
      {
        "filename": "smoothie.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f95d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多衣物 ===
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
    "phraseTranslation": "冬装外套",
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
  {
    "word": "sweater",
    "standardized": "sweater",
    "chinese": "毛衣",
    "phonetic": "/ˈswetər/",
    "phrase": "Cozy sweater",
    "phraseTranslation": "舒适的毛衣",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "sweater.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hoodie",
    "standardized": "hoodie",
    "chinese": "连帽衫",
    "phonetic": "/ˈhʊdi/",
    "phrase": "Comfortable hoodie",
    "phraseTranslation": "舒适的连帽衫",
    "difficulty": "intermediate",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "hoodie.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9e5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "jeans",
    "standardized": "jeans",
    "chinese": "牛仔裤",
    "phonetic": "/dʒiːnz/",
    "phrase": "Blue jeans",
    "phraseTranslation": "蓝色牛仔裤",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "jeans.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f456.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shorts",
    "standardized": "shorts",
    "chinese": "短裤",
    "phonetic": "/ʃɔːrts/",
    "phrase": "Summer shorts",
    "phraseTranslation": "夏季短裤",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "shorts.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f456.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "skirt",
    "standardized": "skirt",
    "chinese": "裙子",
    "phonetic": "/skɜːrt/",
    "phrase": "Pretty skirt",
    "phraseTranslation": "漂亮的裙子",
    "difficulty": "basic",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "skirt.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f459.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "dress",
    "standardized": "dress",
    "chinese": "连衣裙",
    "phonetic": "/dres/",
    "phrase": "Beautiful dress",
    "phraseTranslation": "美丽的连衣裙",
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
    "word": "pajamas",
    "standardized": "pajamas",
    "chinese": "睡衣",
    "phonetic": "/pəˈdʒɑːməz/",
    "phrase": "Soft pajamas",
    "phraseTranslation": "柔软的睡衣",
    "difficulty": "intermediate",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "pajamas.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9bd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "underwear",
    "standardized": "underwear",
    "chinese": "内衣",
    "phonetic": "/ˈʌndərwer/",
    "phrase": "Clean underwear",
    "phraseTranslation": "干净的内衣",
    "difficulty": "intermediate",
    "category": "clothes",
    "imageURLs": [
      {
        "filename": "underwear.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9bd.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多动作词汇 ===
  {
    "word": "jump",
    "standardized": "jump",
    "chinese": "跳",
    "phonetic": "/dʒʌmp/",
    "phrase": "Jump high",
    "phraseTranslation": "跳得高",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "jump.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "run",
    "standardized": "run",
    "chinese": "跑",
    "phonetic": "/rʌn/",
    "phrase": "Run fast",
    "phraseTranslation": "跑得快",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "run.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3c3.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "walk",
    "standardized": "walk",
    "chinese": "走",
    "phonetic": "/wɔːk/",
    "phrase": "Walk slowly",
    "phraseTranslation": "慢慢走",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "walk.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6b6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "crawl",
    "standardized": "crawl",
    "chinese": "爬",
    "phonetic": "/krɔːl/",
    "phrase": "Crawl on floor",
    "phraseTranslation": "在地上爬",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "crawl.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "climb",
    "standardized": "climb",
    "chinese": "攀登",
    "phonetic": "/klaɪm/",
    "phrase": "Climb tree",
    "phraseTranslation": "爬树",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "climb.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "swim",
    "standardized": "swim",
    "chinese": "游泳",
    "phonetic": "/swɪm/",
    "phrase": "Swim in pool",
    "phraseTranslation": "在游泳池游泳",
    "difficulty": "basic",
    "category": "action",
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
    "phraseTranslation": "快乐地跳舞",
    "difficulty": "basic",
    "category": "action",
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
    "phrase": "Sing loudly",
    "phraseTranslation": "大声唱歌",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "sing.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3a4.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "laugh",
    "standardized": "laugh",
    "chinese": "笑",
    "phonetic": "/læf/",
    "phrase": "Laugh loudly",
    "phraseTranslation": "大声笑",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "laugh.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f602.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cry",
    "standardized": "cry",
    "chinese": "哭",
    "phonetic": "/kraɪ/",
    "phrase": "Cry softly",
    "phraseTranslation": "轻声哭",
    "difficulty": "basic",
    "category": "action",
    "imageURLs": [
      {
        "filename": "cry.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f622.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多形容词 ===
  {
    "word": "big",
    "standardized": "big",
    "chinese": "大的",
    "phonetic": "/bɪɡ/",
    "phrase": "Big house",
    "phraseTranslation": "大房子",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "big.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3e0.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "small",
    "standardized": "small",
    "chinese": "小的",
    "phonetic": "/smɔːl/",
    "phrase": "Small toy",
    "phraseTranslation": "小玩具",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "small.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "tall",
    "standardized": "tall",
    "chinese": "高的",
    "phonetic": "/tɔːl/",
    "phrase": "Tall tree",
    "phraseTranslation": "高树",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "tall.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f332.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "short",
    "standardized": "short",
    "chinese": "矮的",
    "phonetic": "/ʃɔːrt/",
    "phrase": "Short person",
    "phraseTranslation": "矮的人",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "short.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fast",
    "standardized": "fast",
    "chinese": "快的",
    "phonetic": "/fæst/",
    "phrase": "Fast car",
    "phraseTranslation": "快车",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "fast.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f697.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "slow",
    "standardized": "slow",
    "chinese": "慢的",
    "phonetic": "/sloʊ/",
    "phrase": "Slow turtle",
    "phraseTranslation": "慢乌龟",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "slow.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f422.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hot",
    "standardized": "hot",
    "chinese": "热的",
    "phonetic": "/hɑːt/",
    "phrase": "Hot soup",
    "phraseTranslation": "热汤",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "hot.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f35b.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cold",
    "standardized": "cold",
    "chinese": "冷的",
    "phonetic": "/koʊld/",
    "phrase": "Cold ice",
    "phraseTranslation": "冷冰",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "cold.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9ca.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "warm",
    "standardized": "warm",
    "chinese": "温暖的",
    "phonetic": "/wɔːrm/",
    "phrase": "Warm sun",
    "phraseTranslation": "温暖的太阳",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "warm.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2600.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cool",
    "standardized": "cool",
    "chinese": "凉爽的",
    "phonetic": "/kuːl/",
    "phrase": "Cool wind",
    "phraseTranslation": "凉爽的风",
    "difficulty": "basic",
    "category": "adjective",
    "imageURLs": [
      {
        "filename": "cool.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a8.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多数字 ===
  {
    "word": "eleven",
    "standardized": "eleven",
    "chinese": "十一",
    "phonetic": "/ɪˈlevən/",
    "phrase": "Eleven apples",
    "phraseTranslation": "十一个苹果",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "eleven.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f34e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "twelve",
    "standardized": "twelve",
    "chinese": "十二",
    "phonetic": "/twelv/",
    "phrase": "Twelve months",
    "phraseTranslation": "十二个月",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "twelve.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "thirteen",
    "standardized": "thirteen",
    "chinese": "十三",
    "phonetic": "/θɜːrˈtiːn/",
    "phrase": "Thirteen candles",
    "phraseTranslation": "十三根蜡烛",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "thirteen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f56f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fourteen",
    "standardized": "fourteen",
    "chinese": "十四",
    "phonetic": "/fɔːrˈtiːn/",
    "phrase": "Fourteen days",
    "phraseTranslation": "十四天",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "fourteen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fifteen",
    "standardized": "fifteen",
    "chinese": "十五",
    "phonetic": "/fɪfˈtiːn/",
    "phrase": "Fifteen minutes",
    "phraseTranslation": "十五分钟",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "fifteen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/23f2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sixteen",
    "standardized": "sixteen",
    "chinese": "十六",
    "phonetic": "/sɪksˈtiːn/",
    "phrase": "Sixteen years",
    "phraseTranslation": "十六年",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "sixteen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "seventeen",
    "standardized": "seventeen",
    "chinese": "十七",
    "phonetic": "/sevənˈtiːn/",
    "phrase": "Seventeen books",
    "phraseTranslation": "十七本书",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "seventeen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "eighteen",
    "standardized": "eighteen",
    "chinese": "十八",
    "phonetic": "/eɪˈtiːn/",
    "phrase": "Eighteen flowers",
    "phraseTranslation": "十八朵花",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "eighteen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f33c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "nineteen",
    "standardized": "nineteen",
    "chinese": "十九",
    "phonetic": "/naɪnˈtiːn/",
    "phrase": "Nineteen stars",
    "phraseTranslation": "十九颗星星",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "nineteen.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2b50.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "twenty",
    "standardized": "twenty",
    "chinese": "二十",
    "phonetic": "/ˈtwenti/",
    "phrase": "Twenty fingers",
    "phraseTranslation": "二十根手指",
    "difficulty": "basic",
    "category": "number",
    "imageURLs": [
      {
        "filename": "twenty.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9d1.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多常用词汇 ===
  {
    "word": "yes",
    "standardized": "yes",
    "chinese": "是的",
    "phonetic": "/jes/",
    "phrase": "Yes, please",
    "phraseTranslation": "是的，请",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "yes.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2705.svg",
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
    "category": "common",
    "imageURLs": [
      {
        "filename": "no.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/274c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "maybe",
    "standardized": "maybe",
    "chinese": "也许",
    "phonetic": "/ˈmeɪbi/",
    "phrase": "Maybe later",
    "phraseTranslation": "也许稍后",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "maybe.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f937.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "always",
    "standardized": "always",
    "chinese": "总是",
    "phonetic": "/ˈɔːlweɪz/",
    "phrase": "Always happy",
    "phraseTranslation": "总是快乐",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "always.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f604.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "never",
    "standardized": "never",
    "chinese": "从不",
    "phonetic": "/ˈnevər/",
    "phrase": "Never give up",
    "phraseTranslation": "从不放弃",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "never.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4aa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "sometimes",
    "standardized": "sometimes",
    "chinese": "有时",
    "phonetic": "/ˈsʌmtaɪmz/",
    "phrase": "Sometimes sad",
    "phraseTranslation": "有时悲伤",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "sometimes.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "often",
    "standardized": "often",
    "chinese": "经常",
    "phonetic": "/ˈɔːfən/",
    "phrase": "Often play",
    "phraseTranslation": "经常玩",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "often.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3ae.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "usually",
    "standardized": "usually",
    "chinese": "通常",
    "phonetic": "/ˈjuːʒuəli/",
    "phrase": "Usually eat",
    "phraseTranslation": "通常吃",
    "difficulty": "intermediate",
    "category": "common",
    "imageURLs": [
      {
        "filename": "usually.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f35d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "really",
    "standardized": "really",
    "chinese": "真的",
    "phonetic": "/ˈriːəli/",
    "phrase": "Really good",
    "phraseTranslation": "真的很好",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "really.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/2705.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "very",
    "standardized": "very",
    "chinese": "非常",
    "phonetic": "/ˈveri/",
    "phrase": "Very happy",
    "phraseTranslation": "非常快乐",
    "difficulty": "basic",
    "category": "common",
    "imageURLs": [
      {
        "filename": "very.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f604.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多日常对话词汇 ===
  {
    "word": "wonderful",
    "standardized": "wonderful",
    "chinese": "精彩的",
    "phonetic": "/ˈwʌndərfəl/",
    "phrase": "What a wonderful day",
    "phraseTranslation": "多么美好的一天",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "wonderful.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f31f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "amazing",
    "standardized": "amazing",
    "chinese": "令人惊叹的",
    "phonetic": "/əˈmeɪzɪŋ/",
    "phrase": "That's amazing",
    "phraseTranslation": "太令人惊叹了",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "amazing.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f929.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "fantastic",
    "standardized": "fantastic",
    "chinese": "极好的",
    "phonetic": "/fænˈtæstɪk/",
    "phrase": "Fantastic job",
    "phraseTranslation": "做得太棒了",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "fantastic.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f389.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "terrible",
    "standardized": "terrible",
    "chinese": "糟糕的",
    "phonetic": "/ˈterəbəl/",
    "phrase": "That's terrible",
    "phraseTranslation": "太糟糕了",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "terrible.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "worried",
    "standardized": "worried",
    "chinese": "担心的",
    "phonetic": "/ˈwɜːrid/",
    "phrase": "I feel worried",
    "phraseTranslation": "我感到担心",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "worried.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "confused",
    "standardized": "confused",
    "chinese": "困惑的",
    "phonetic": "/kənˈfjuːzd/",
    "phrase": "I am confused",
    "phraseTranslation": "我很困惑",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "confused.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f615.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "proud",
    "standardized": "proud",
    "chinese": "骄傲的",
    "phonetic": "/praʊd/",
    "phrase": "I am proud of you",
    "phraseTranslation": "我为你感到骄傲",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "proud.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f60c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "jealous",
    "standardized": "jealous",
    "chinese": "嫉妒的",
    "phonetic": "/ˈdʒeləs/",
    "phrase": "Don't be jealous",
    "phraseTranslation": "不要嫉妒",
    "difficulty": "advanced",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "jealous.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f620.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 更多家庭活动词汇 ===
  {
    "word": "cooking",
    "standardized": "cooking",
    "chinese": "做饭",
    "phonetic": "/ˈkʊkɪŋ/",
    "phrase": "Help with cooking",
    "phraseTranslation": "帮忙做饭",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "cooking.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f373.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "cleaning",
    "standardized": "cleaning",
    "chinese": "打扫",
    "phonetic": "/ˈkliːnɪŋ/",
    "phrase": "Cleaning the house",
    "phraseTranslation": "打扫房子",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "cleaning.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9f9.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "shopping",
    "standardized": "shopping",
    "chinese": "购物",
    "phonetic": "/ˈʃɑːpɪŋ/",
    "phrase": "Go shopping together",
    "phraseTranslation": "一起去购物",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "shopping.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6d2.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "gardening",
    "standardized": "gardening",
    "chinese": "园艺",
    "phonetic": "/ˈɡɑːrdənɪŋ/",
    "phrase": "Gardening with family",
    "phraseTranslation": "和家人一起园艺",
    "difficulty": "intermediate",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "gardening.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f331.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "picnic",
    "standardized": "picnic",
    "chinese": "野餐",
    "phonetic": "/ˈpɪknɪk/",
    "phrase": "Family picnic",
    "phraseTranslation": "家庭野餐",
    "difficulty": "basic",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "picnic.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f9fa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "vacation",
    "standardized": "vacation",
    "chinese": "假期",
    "phonetic": "/vəˈkeɪʃən/",
    "phrase": "Summer vacation",
    "phraseTranslation": "暑假",
    "difficulty": "intermediate",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "vacation.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3d6.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "camping",
    "standardized": "camping",
    "chinese": "露营",
    "phonetic": "/ˈkæmpɪŋ/",
    "phrase": "Go camping",
    "phraseTranslation": "去露营",
    "difficulty": "intermediate",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "camping.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f3d5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "hiking",
    "standardized": "hiking",
    "chinese": "徒步旅行",
    "phonetic": "/ˈhaɪkɪŋ/",
    "phrase": "Hiking in mountains",
    "phraseTranslation": "在山里徒步",
    "difficulty": "intermediate",
    "category": "activity",
    "imageURLs": [
      {
        "filename": "hiking.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f6b6.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 小学阶段高级情感表达词汇 ===
  {
    "word": "embarrassed",
    "standardized": "embarrassed",
    "chinese": "尴尬的",
    "phonetic": "/ɪmˈbærəst/",
    "phrase": "I feel embarrassed",
    "phraseTranslation": "我感到尴尬",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "embarrassed.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f633.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "disappointed",
    "standardized": "disappointed",
    "chinese": "失望的",
    "phonetic": "/ˌdɪsəˈpɔɪntəd/",
    "phrase": "I am disappointed",
    "phraseTranslation": "我很失望",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "disappointed.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f61e.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "grateful",
    "standardized": "grateful",
    "chinese": "感激的",
    "phonetic": "/ˈɡreɪtfəl/",
    "phrase": "I am grateful for your help",
    "phraseTranslation": "我很感激你的帮助",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "grateful.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f64f.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "nervous",
    "standardized": "nervous",
    "chinese": "紧张的",
    "phonetic": "/ˈnɜːrvəs/",
    "phrase": "I feel nervous about the test",
    "phraseTranslation": "我对考试感到紧张",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "nervous.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f630.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "relieved",
    "standardized": "relieved",
    "chinese": "松了一口气的",
    "phonetic": "/rɪˈliːvd/",
    "phrase": "I am relieved",
    "phraseTranslation": "我松了一口气",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "relieved.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f60c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "enthusiastic",
    "standardized": "enthusiastic",
    "chinese": "热情的",
    "phonetic": "/ɪnˌθuːziˈæstɪk/",
    "phrase": "She is enthusiastic about learning",
    "phraseTranslation": "她对学习很热情",
    "difficulty": "advanced",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "enthusiastic.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f929.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "frustrated",
    "standardized": "frustrated",
    "chinese": "沮丧的",
    "phonetic": "/ˈfrʌstreɪtəd/",
    "phrase": "I feel frustrated",
    "phraseTranslation": "我感到沮丧",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "frustrated.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f624.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "determined",
    "standardized": "determined",
    "chinese": "坚定的",
    "phonetic": "/dɪˈtɜːrmɪnd/",
    "phrase": "I am determined to succeed",
    "phraseTranslation": "我决心要成功",
    "difficulty": "intermediate",
    "category": "emotion",
    "imageURLs": [
      {
        "filename": "determined.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4aa.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 小学阶段复杂对话词汇 ===
  {
    "word": "conversation",
    "standardized": "conversation",
    "chinese": "对话",
    "phonetic": "/ˌkɑːnvərˈseɪʃən/",
    "phrase": "Have a conversation",
    "phraseTranslation": "进行对话",
    "difficulty": "intermediate",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "conversation.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4ac.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "discussion",
    "standardized": "discussion",
    "chinese": "讨论",
    "phonetic": "/dɪˈskʌʃən/",
    "phrase": "Class discussion",
    "phraseTranslation": "课堂讨论",
    "difficulty": "intermediate",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "discussion.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4ac.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "explanation",
    "standardized": "explanation",
    "chinese": "解释",
    "phonetic": "/ˌekspləˈneɪʃən/",
    "phrase": "Give an explanation",
    "phraseTranslation": "给出解释",
    "difficulty": "intermediate",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "explanation.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4dd.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "opinion",
    "standardized": "opinion",
    "chinese": "意见",
    "phonetic": "/əˈpɪnjən/",
    "phrase": "What's your opinion?",
    "phraseTranslation": "你的意见是什么？",
    "difficulty": "intermediate",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "opinion.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4ad.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "suggestion",
    "standardized": "suggestion",
    "chinese": "建议",
    "phonetic": "/səˈdʒestʃən/",
    "phrase": "I have a suggestion",
    "phraseTranslation": "我有一个建议",
    "difficulty": "intermediate",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "suggestion.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4a1.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "agreement",
    "standardized": "agreement",
    "chinese": "同意",
    "phonetic": "/əˈɡriːmənt/",
    "phrase": "We reached an agreement",
    "phraseTranslation": "我们达成了一致",
    "difficulty": "intermediate",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "agreement.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "disagreement",
    "standardized": "disagreement",
    "chinese": "不同意",
    "phonetic": "/ˌdɪsəˈɡriːmənt/",
    "phrase": "We have a disagreement",
    "phraseTranslation": "我们有分歧",
    "difficulty": "intermediate",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "disagreement.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/274c.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "compromise",
    "standardized": "compromise",
    "chinese": "妥协",
    "phonetic": "/ˈkɑːmprəmaɪz/",
    "phrase": "Let's find a compromise",
    "phraseTranslation": "让我们找到一个妥协方案",
    "difficulty": "advanced",
    "category": "communication",
    "imageURLs": [
      {
        "filename": "compromise.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },

  // === 小学阶段社交词汇 ===
  {
    "word": "invitation",
    "standardized": "invitation",
    "chinese": "邀请",
    "phonetic": "/ˌɪnvɪˈteɪʃən/",
    "phrase": "Send an invitation",
    "phraseTranslation": "发送邀请",
    "difficulty": "intermediate",
    "category": "social",
    "imageURLs": [
      {
        "filename": "invitation.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4e8.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "appointment",
    "standardized": "appointment",
    "chinese": "约会",
    "phonetic": "/əˈpɔɪntmənt/",
    "phrase": "Make an appointment",
    "phraseTranslation": "预约",
    "difficulty": "intermediate",
    "category": "social",
    "imageURLs": [
      {
        "filename": "appointment.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "introduction",
    "standardized": "introduction",
    "chinese": "介绍",
    "phonetic": "/ˌɪntrəˈdʌkʃən/",
    "phrase": "Make an introduction",
    "phraseTranslation": "做介绍",
    "difficulty": "intermediate",
    "category": "social",
    "imageURLs": [
      {
        "filename": "introduction.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "compliment",
    "standardized": "compliment",
    "chinese": "赞美",
    "phonetic": "/ˈkɑːmpləmənt/",
    "phrase": "Give a compliment",
    "phraseTranslation": "给予赞美",
    "difficulty": "intermediate",
    "category": "social",
    "imageURLs": [
      {
        "filename": "compliment.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f44d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "encouragement",
    "standardized": "encouragement",
    "chinese": "鼓励",
    "phonetic": "/ɪnˈkɜːrɪdʒmənt/",
    "phrase": "Words of encouragement",
    "phraseTranslation": "鼓励的话语",
    "difficulty": "intermediate",
    "category": "social",
    "imageURLs": [
      {
        "filename": "encouragement.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f4aa.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "support",
    "standardized": "support",
    "chinese": "支持",
    "phonetic": "/səˈpɔːrt/",
    "phrase": "Give support to friends",
    "phraseTranslation": "给朋友支持",
    "difficulty": "basic",
    "category": "social",
    "imageURLs": [
      {
        "filename": "support.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "teamwork",
    "standardized": "teamwork",
    "chinese": "团队合作",
    "phonetic": "/ˈtiːmwɜːrk/",
    "phrase": "Good teamwork",
    "phraseTranslation": "良好的团队合作",
    "difficulty": "intermediate",
    "category": "social",
    "imageURLs": [
      {
        "filename": "teamwork.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f91d.svg",
        "type": "Emoji"
      }
    ]
  },
  {
    "word": "leadership",
    "standardized": "leadership",
    "chinese": "领导力",
    "phonetic": "/ˈliːdərʃɪp/",
    "phrase": "Show leadership",
    "phraseTranslation": "展现领导力",
    "difficulty": "advanced",
    "category": "social",
    "imageURLs": [
      {
        "filename": "leadership.svg",
        "url": "https://twemoji.maxcdn.com/v/latest/svg/1f451.svg",
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
