# 🎮 Minecraft 单词学习游戏

一款结合 Minecraft 主题的趣味英语单词学习应用,支持Web、Android APK等多平台。

![Version](https://img.shields.io/badge/version-2.2.3-blue)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## ✨ 核心特性

### 📚 学习模式
- **多种学习类型**: 英文单词、中文单词、英文短语、中文短语
- **智能词库**: 支持多个分级词库(幼儿园、小学、初中、高中、大学、考研等)
- **幼儿园模式**: 专为儿童设计的简化学习界面
- **混合学习**: 可混合幼儿园词库与其他词库,自定义混合比例

### 🔤 拼写测试
- **多种拼写模式**:
  - 标准拼写: 完整拼写单词
  - 首字母拼写: 只需输入首字母
  - 听写模式: 听音拼写
- **智能提示**: 支持词尾提示/完整提示
- **自定义题量**: 可设置每次测试的题目数量

### 🎨 界面设计
- **双布局系统**: 
  - 桌面/平板: 传统单页面布局
  - 手机: 底部导航栏窗口切换模式
- **响应式设计**: 自动适配不同屏幕尺寸
- **主题**: Minecraft 风格UI设计

### 🎁 奖励系统
- **钻石奖励**: 学习单词获得钻石
- **钻石剑奖励**: 完成拼写测试获得钻石剑
- **进度追踪**: 记录学习时间、天数、掌握词汇数

### 🔊 语音功能
- **TTS语音**: 自动朗读单词和释义
- **语音设置**: 可调节语速、音调、音量
- **自动播放**: 支持自动播放语音

### 💾 数据管理
- **本地存储**: 所有数据保存在本地,无需联网
- **数据导出/导入**: 支持学习记录导出和导入
- **自动备份**: 定期自动备份学习数据
- **手动备份**: 可随时手动创建备份点

### 🔐 激活系统
- **试用模式**: 未激活时限制20个单词
- **在线激活**: 支持激活码在线验证
- **调试模式**: 开发者调试功能(不解除激活限制)

## 🚀 快速开始

### Web版本
1. 克隆仓库:
```bash
git clone https://github.com/你的用户名/MineCraft学单词游戏-v2.git
cd MineCraft学单词游戏-v2
```

2. 直接打开 `index.html` 或使用本地服务器:
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server -p 8000
```

3. 访问 `http://localhost:8000`

### Android APK版本
1. 同步Web资源到Android项目:
```bash
cd android-app
npm run sync
```

2. 使用 Capacitor 构建:
```bash
npx cap sync
npx cap open android
```

3. 在 Android Studio 中构建APK

### GitHub Actions 自动构建
项目配置了 GitHub Actions,推送代码后会自动构建:
- Android Debug APK
- Windows EXE (可选)

构建产物可在 Actions 页面下载。

## 📖 文档

详细文档请查看 [docs](./docs) 目录:

- [功能详解](./docs/FEATURES.md) - 完整功能说明
- [词库说明](./docs/VOCABULARY.md) - 词库结构和管理
- [开发指南](./docs/DEVELOPMENT.md) - 开发环境配置
- [部署指南](./docs/DEPLOYMENT.md) - 多平台部署方法
- [API文档](./docs/API.md) - 核心API说明
- [更新日志](./docs/CHANGELOG.md) - 版本更新记录
- [词库数据库维护](./docs/VOCAB_DB.md) - SQLite 词库维护与导出流程
- [词库维护新手指南](./docs/VOCAB_MAINTENANCE_BEGINNER_GUIDE.md) - 面向非技术维护者的步骤说明
- [词库维护图文指南](./docs/VOCAB_MAINTENANCE_ILLUSTRATED_GUIDE.md) - 带截图位的逐步操作手册
- [词库维护执行报告 (2026-02-18)](./docs/reports/2026-02-18-vocab-maintenance-run.md) - 本次去重/校验/外部对比的实操记录

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **移动端**: Capacitor (Android)
- **存储**: LocalStorage
- **语音**: Web Speech API
- **构建**: GitHub Actions

## 📱 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| Web浏览器 | ✅ 完全支持 | Chrome, Firefox, Safari, Edge |
| Android | ✅ 完全支持 | Android 5.0+ |
| iOS | ⚠️ 部分支持 | 需要 Xcode 构建 |
| Windows | 🔄 开发中 | 通过 Electron 打包 |

## 🎯 路线图

- [x] 基础学习功能
- [x] 拼写测试
- [x] 幼儿园模式
- [x] 手机UI优化
- [x] 数据备份/恢复
- [x] Android APK
- [ ] 云同步功能
- [ ] 微信小程序版本
- [ ] iOS版本
- [ ] 多语言支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 👨‍💻 作者

- 项目维护者: [您的名字]
- 联系方式: [您的邮箱/微信]

## 🙏 致谢

- Minecraft 主题灵感
- 词库来源: [词库来源说明]
- 图标资源: [图标来源]

---

**⭐ 如果这个项目对您有帮助,请给个Star支持一下!**
