// Browser-compatible vocabulary manifest
window.vocabManifest = window.vocabManifest || { version: '2.3.0', packs: [] };

// ========================================
// 01_幼儿园 (Kindergarten)
// ========================================

// 幼儿园完整词库
window.vocabManifest.packs.push({
  id: 'vocab.kindergarten.full',
  title: '幼儿园完整词库',
  stage: 'kindergarten',
  difficulty: 'full',
  level: 'full',
  weight: 1,
  mode: 'english',
  type: 'merged',
  file: 'words/vocabs/01_幼儿园/幼儿园完整词库.js',
  globals: ['MERGED_KINDERGARTEN_VOCAB']
});

// 幼儿园基础
window.vocabManifest.packs.push({
  id: 'vocab.kindergarten.basic',
  title: '幼儿园基础',
  stage: 'kindergarten',
  difficulty: 'basic',
  level: 'basic',
  weight: 1,
  mode: 'english',
  type: 'basic',
  file: 'words/vocabs/01_幼儿园/幼儿园基础.js',
  globals: ['VOCAB_KINDERGARTEN_BASIC']
});

// 幼儿园分卷 01-10
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  window.vocabManifest.packs.push({
    id: `vocab.kindergarten.part${num}`,
    title: `幼儿园分卷_${num}`,
    stage: 'kindergarten',
    difficulty: 'basic',
    level: `part${num}`,
    weight: 1,
    mode: 'english',
    type: 'split',
    file: `words/vocabs/01_幼儿园/幼儿园_分卷_${num}.js`,
    globals: [`STAGE_KINDERGARTEN_PART${num}`]
  });
}

// 幼儿园主题分类 1-6
const kindergartenThemes = [
  { num: '1', name: '基础', global: 'VOCAB_1__________' },
  { num: '2', name: '学习', global: 'VOCAB_2______' },
  { num: '3', name: '自然', global: 'VOCAB_3______' },
  { num: '4', name: '沟通', global: 'VOCAB_4______' },
  { num: '5', name: '日常', global: 'VOCAB_5______' },
  { num: '6', name: '通用', global: 'VOCAB_6______' }
];

kindergartenThemes.forEach(theme => {
  window.vocabManifest.packs.push({
    id: `vocab.kindergarten.theme${theme.num}`,
    title: `幼儿园_${theme.num}_${theme.name}`,
    stage: 'kindergarten',
    difficulty: 'basic',
    level: `theme${theme.num}`,
    weight: 1,
    mode: 'english',
    type: 'theme',
    file: `words/vocabs/01_幼儿园/幼儿园_${theme.num}_${theme.name}.js`,
    globals: [theme.global]
  });
});

// 幼儿园补充词库
window.vocabManifest.packs.push({
  id: 'vocab.kindergarten.supplement',
  title: '幼儿园补充词库',
  stage: 'kindergarten',
  difficulty: 'basic',
  level: 'supplement',
  weight: 1,
  mode: 'english',
  type: 'supplement',
  file: 'words/vocabs/01_幼儿园/kindergarten_supplement_external_20260221.js',
  globals: ['KINDERGARTEN_SUPPLEMENT_EXTERNAL_20260221']
});

// ========================================
// 02_小学_低年级 (Elementary Lower)
// ========================================

// 小学低年级分卷 01-10
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  window.vocabManifest.packs.push({
    id: `vocab.elementary_lower.part${num}`,
    title: `小学低年级_分卷_${num}`,
    stage: 'elementary_lower',
    difficulty: 'basic',
    level: `part${num}`,
    weight: 1,
    mode: 'english',
    type: 'split',
    file: `words/vocabs/02_小学_低年级/小学低年级_分卷_${num}.js`,
    globals: [`STAGE_ELEMENTARY_LOWER_PART${num}`]
  });
}

// 小学低年级补充词库
window.vocabManifest.packs.push({
  id: 'vocab.elementary_lower.supplement',
  title: '小学低年级补充词库',
  stage: 'elementary_lower',
  difficulty: 'basic',
  level: 'supplement',
  weight: 1,
  mode: 'english',
  type: 'supplement',
  file: 'words/vocabs/02_小学_低年级/elementary_supplement_external_20260221.js',
  globals: ['ELEMENTARY_SUPPLEMENT_EXTERNAL_20260221']
});

// ========================================
// 03_小学_高年级 (Elementary Upper)
// ========================================

// 小学高年级分卷 01-10
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  window.vocabManifest.packs.push({
    id: `vocab.elementary_upper.part${num}`,
    title: `小学高年级_分卷_${num}`,
    stage: 'elementary_upper',
    difficulty: 'intermediate',
    level: `part${num}`,
    weight: 1,
    mode: 'english',
    type: 'split',
    file: `words/vocabs/03_小学_高年级/小学高年级_分卷_${num}.js`,
    globals: [`STAGE_ELEMENTARY_UPPER_PART${num}`]
  });
}

// ========================================
// 04_我的世界 (Minecraft)
// ========================================

const minecraftPacks = [
  { file: 'minecraft_basic.js', global: 'VOCAB_1_MINECRAFT____BASIC', level: 'basic', title: 'Minecraft基础' },
  { file: 'minecraft_intermediate.js', global: 'VOCAB_2_MINECRAFT____INTERMEDIATE', level: 'intermediate', title: 'Minecraft中级' },
  { file: 'minecraft_advanced.js', global: 'VOCAB_3_MINECRAFT____ADVANCED', level: 'advanced', title: 'Minecraft高级' },
  { file: 'minecraft_blocks.js', global: 'MINECRAFT_BLOCKS', level: 'blocks', title: 'Minecraft方块' },
  { file: 'minecraft_items.js', global: 'MINECRAFT_ITEMS', level: 'items', title: 'Minecraft物品' },
  { file: 'minecraft_items_2.js', global: 'MINECRAFT_ITEMS_2', level: 'items2', title: 'Minecraft物品2' },
  { file: 'minecraft_entities.js', global: 'MINECRAFT_ENTITIES', level: 'entities', title: 'Minecraft实体' },
  { file: 'minecraft_biomes.js', global: 'MINECRAFT_BIOMES', level: 'biomes', title: 'Minecraft生物群系' },
  { file: 'minecraft_enchantments.js', global: 'MINECRAFT_ENCHANTMENTS', level: 'enchantments', title: 'Minecraft附魔' },
  { file: 'minecraft_status_effects.js', global: 'MINECRAFT_STATUS_EFFECTS', level: 'effects', title: 'Minecraft状态效果' },
  { file: 'minecraft_advancements.js', global: 'MINECRAFT_ADVANCEMENTS', level: 'advancements', title: 'Minecraft成就' },
  { file: 'minecraft_environment.js', global: 'MINECRAFT_ENVIRONMENT', level: 'environment', title: 'Minecraft环境' },
  { file: 'minecraft_words_full.js', global: 'MINECRAFT_WORDS_FULL', level: 'full', title: 'Minecraft完整词库' }
];

minecraftPacks.forEach(pack => {
  window.vocabManifest.packs.push({
    id: `vocab.minecraft.${pack.level}`,
    title: pack.title,
    stage: 'minecraft',
    difficulty: pack.level === 'basic' ? 'basic' : pack.level === 'intermediate' ? 'intermediate' : 'advanced',
    level: pack.level,
    weight: 1,
    mode: 'english',
    type: 'minecraft',
    file: `words/vocabs/04_我的世界/${pack.file}`,
    globals: [pack.global]
  });
});

// ========================================
// 05_初中 (Junior High)
// ========================================

// 初中分卷 01-10
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  window.vocabManifest.packs.push({
    id: `vocab.junior_high.part${num}`,
    title: `初中_分卷_${num}`,
    stage: 'junior_high',
    difficulty: 'advanced',
    level: `part${num}`,
    weight: 1,
    mode: 'english',
    type: 'split',
    file: `words/vocabs/05_初中/初中_分卷_${num}.js`,
    globals: [`STAGE_JUNIOR_HIGH_PART${num}`]
  });
}

// ========================================
// 06_汉字 (Chinese Characters)
// ========================================

window.vocabManifest.packs.push({
  id: 'vocab.kindergarten.hanzi',
  title: '幼儿园汉字',
  stage: 'kindergarten',
  difficulty: 'basic',
  level: 'full',
  weight: 1,
  mode: 'chinese',
  type: 'hanzi',
  file: 'words/vocabs/06_汉字/幼儿园汉字.js',
  globals: ['kindergartenHanzi']
});

// Add getRaw() method to each pack
window.vocabManifest.packs.forEach(pack => {
  if (!pack.getRaw) {
    pack.getRaw = function() {
      const words = [];
      if (Array.isArray(pack.globals)) {
        pack.globals.forEach(globalName => {
          if (typeof window[globalName] !== 'undefined' && Array.isArray(window[globalName])) {
            words.push(...window[globalName]);
          }
        });
      }
      return words;
    };
  }
});

// Create byId index
const byId = Object.create(null);
window.vocabManifest.packs.forEach(p => { byId[p.id] = p; });
window.vocabManifest.byId = byId;

// Expose as MMWG_VOCAB_MANIFEST for compatibility
window.MMWG_VOCAB_MANIFEST = window.vocabManifest;

// Node.js compatibility (for build tools)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.vocabManifest.packs;
}
