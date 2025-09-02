// 交流词汇数据
const COMMUNICATION_VOCABULARY = [
  {
    "word": "mine",
    "standardized": "mine",
    "chinese": "挖掘",
    "phonetic": "",
    "phrase": "Let's mine some diamonds!",
    "phraseTranslation": "我们去挖钻石吧！",
    "difficulty": "basic",
    "category": "basic_actions",
    "imageURLs": [
      {
        "filename": "Mining-Pixel-Icons-1.png",
        "url": "https://craftpix.net/wp-content/uploads/2024/10/Mining-Pixel-Icons-1.png",
        "type": "Default"
      }
    ]
  },
  {
    "word": "dig",
    "standardized": "dig",
    "chinese": "挖",
    "phonetic": "",
    "phrase": "Dig down carefully!",
    "phraseTranslation": "小心往下挖！",
    "difficulty": "basic",
    "category": "basic_actions",
    "imageURLs": [
      {
        "filename": "",
        "url": "",
        "type": "Default"
      }
    ]
  },
  {
    "word": "build",
    "standardized": "build",
    "chinese": "建造",
    "phonetic": "",
    "phrase": "I'm building a castle",
    "phraseTranslation": "我在建城堡",
    "difficulty": "basic",
    "category": "basic_actions",
    "imageURLs": [
      {
        "filename": "hammer.png",
        "url": "https://img.icons8.com/color/48/hammer.png",
        "type": "Default"
      }
    ]
  },
  {
    "word": "craft",
    "standardized": "craft",
    "chinese": "合成",
    "phonetic": "",
    "phrase": "Can you craft some tools?",
    "phraseTranslation": "你能合成一些工具吗？",
    "difficulty": "basic",
    "category": "basic_actions",
    "imageURLs": [
      {
        "filename": "gear.png",
        "url": "https://img.icons8.com/color/48/gear.png",
        "type": "Default"
      }
    ]
  },
  {
    "word": "hello",
    "standardized": "hello",
    "chinese": "你好",
    "phonetic": "/h??lo?/",
    "phrase": "Hello there!",
    "phraseTranslation": "你好呀！",
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
    "word": "thank you",
    "standardized": "thank you",
    "chinese": "谢谢",
    "phonetic": "/θ??k ju?/",
    "phrase": "Thank you very much!",
    "phraseTranslation": "非常感谢！",
    "difficulty": "basic",
    "category": "greeting",
    "imageURLs": [
      {
        "filename": "thank-you.jpg",
        "url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  }
];

// 导出词库数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COMMUNICATION_VOCABULARY;
} else if (typeof window !== 'undefined') {
  window.COMMUNICATION_VOCABULARY = COMMUNICATION_VOCABULARY;
}