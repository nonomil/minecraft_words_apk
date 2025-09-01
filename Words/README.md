# MineCraft学单词游戏 - 词汇文件整理说明

## 文件结构

本项目的词汇文件已合并整理为以下4个主要JSON文件：

### ? 根目录主要文件
- `minecraft_vocabulary.json` - 完整的Minecraft游戏词汇 (1181个词汇)
- `daily_vocabulary.json` - 日常生活词汇 (138个词汇)
- `communication_vocabulary.json` - 交流沟通词汇 (约150个词汇)
- `image_resources.json` - 图片资源链接 (1174个资源)

### ? 原始分类目录（备份）

### ? minecraft_vocabulary/ - Minecraft游戏词汇
包含Minecraft游戏中的专业词汇，按难度分级：
- `minecraft_basic.json` - 基础词汇
- `minecraft_intermediate.json` - 中级词汇  
- `minecraft_advanced.json` - 高级词汇

### ? daily_vocabulary/ - 日常生活词汇
包含日常生活和幼儿园阶段的基础词汇：
- `common_vocabulary.json` - 通用日常词汇
- `kindergarten_vocabulary.json` - 幼儿园词汇
- `kindergarten_vocabulary.md` - 幼儿园词汇说明文档

### ? communication_vocabulary/ - 交流沟通词汇
包含游戏中常用的交流和沟通词汇：
- `minecraft_communication_vocab.json` - 交流词汇数据
- `minecraft_communication_vocab.md` - 交流词汇说明文档

### ?? image_resources/ - 图片资源文件
包含所有词汇相关的图片链接和资源：
- `minecraft_image_links.json` - 完整图片链接数据
- `minecraft_image_links_A_F.json` - A-F字母开头的图片链接
- `minecraft_image_links_G_M.json` - G-M字母开头的图片链接
- `minecraft_image_links_N_S.json` - N-S字母开头的图片链接
- `minecraft_image_links_T_Z.json` - T-Z字母开头的图片链接
- `minecraft_vocabulary_with_images_and_chinese.txt` - 带图片和中文的词汇文本

### ? tools/ - 工具脚本
包含用于处理和整理词汇数据的Python脚本：
- `organize_vocabulary.py` - 词汇整理脚本
- `process_words.py` - 词汇处理脚本
- `process_words_enhanced.py` - 增强版词汇处理脚本

## 使用说明

### ? 推荐学习路径
1. **学习基础词汇**：从 `daily_vocabulary.json` 开始，掌握日常生活词汇
2. **学习游戏词汇**：使用 `minecraft_vocabulary.json`，按difficulty字段（basic → intermediate → advanced）顺序学习
3. **练习交流**：使用 `communication_vocabulary.json` 中的词汇进行游戏内交流
4. **查看图片**：在 `image_resources.json` 中找到对应的图片资源

### ? 数据处理
- 使用 `tools/` 目录中的脚本进行词汇数据的处理和分析
- 合并脚本：`merge_minecraft_vocab.py`, `merge_daily_vocab.py`, `merge_image_resources.py`

## 文件格式说明

所有JSON文件都遵循统一的数据结构：
```json
{
  "word": "单词",
  "standardized": "标准化单词",
  "chinese": "中文翻译",
  "phonetic": "音标",
  "phrase": "例句",
  "phraseTranslation": "例句翻译",
  "difficulty": "难度级别",
  "category": "分类",
  "imageURLs": ["图片链接数组"]
}
```

整理完成时间：2025年1月