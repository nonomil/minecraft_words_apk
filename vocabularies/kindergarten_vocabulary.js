// ?????? - kindergarten_vocabulary
const KINDERGARTEN_VOCABULARY = [
  {
    "word": "apple",
    "standardized": "apple",
    "chinese": "??",
    "phonetic": "/?æp?l/",
    "phrase": "Red apple",
    "phraseTranslation": "???",
    "difficulty": "basic",
    "category": "food",
    "imageURLs": [
      {
        "filename": "apple.jpg",
        "url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "cat",
    "standardized": "cat",
    "chinese": "?",
    "phonetic": "/kæt/",
    "phrase": "Cute cat",
    "phraseTranslation": "????",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "cat.jpg",
        "url": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "dog",
    "standardized": "dog",
    "chinese": "?",
    "phonetic": "/d???/",
    "phrase": "Friendly dog",
    "phraseTranslation": "????",
    "difficulty": "basic",
    "category": "animal",
    "imageURLs": [
      {
        "filename": "dog.jpg",
        "url": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "ball",
    "standardized": "ball",
    "chinese": "?",
    "phonetic": "/b??l/",
    "phrase": "Play with ball",
    "phraseTranslation": "??",
    "difficulty": "basic",
    "category": "toy",
    "imageURLs": [
      {
        "filename": "ball.jpg",
        "url": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  },
  {
    "word": "book",
    "standardized": "book",
    "chinese": "?",
    "phonetic": "/b?k/",
    "phrase": "Read a book",
    "phraseTranslation": "??",
    "difficulty": "basic",
    "category": "school",
    "imageURLs": [
      {
        "filename": "book.jpg",
        "url": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80&auto=format&fit=crop",
        "type": "Concept Image"
      }
    ]
  }
];

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KINDERGARTEN_VOCABULARY;
} else if (typeof window !== 'undefined') {
  window.KINDERGARTEN_VOCABULARY = KINDERGARTEN_VOCABULARY;
}