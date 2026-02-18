# 🚀 快速开始指南

本文档提供最简单的方式来发布和更新 Minecraft 单词学习游戏 APK。

## 📋 前置要求

- Git 已安装并配置
- 已有 GitHub 账号并配置好仓库访问权限
- Windows 系统 (使用 push.bat)

## 🎯 发布新版本 (3步完成)

### 步骤 1: 提交代码

```bash
# 查看修改的文件
git status

# 添加所有修改
git add .

# 提交修改 (使用清晰的提交信息)
git commit -m "feat: 添加新功能描述"
# 或
git commit -m "fix: 修复bug描述"
# 或
git commit -m "docs: 更新文档"
```

### 步骤 2: 推送到 GitHub

**方式 A: 使用 push.bat (推荐)**

双击运行 `push.bat` 或在命令行中执行:

```bash
.\push.bat
```

脚本会自动:
- ✅ 检查 git 仓库状态
- ✅ 显示当前版本信息 (version.json)
- ✅ 显示待推送的提交
- ✅ 推送到 GitHub (自动重试处理网络问题)
- ✅ 显示 GitHub Actions 链接

**方式 B: 手动推送**

```bash
git push origin main
```

### 步骤 3: 等待自动构建并下载 APK

1. 访问 [GitHub Actions](https://github.com/nonomil/minecraft_words_apk/actions)
2. 等待构建完成 (约 5-10 分钟)
3. 点击最新的工作流运行
4. 滚动到底部 "Artifacts" 部分
5. 下载 APK 文件

**APK 文件命名格式:**
```
mcwords_v{版本号}_b{构建号}_{时间戳}_{commit}.apk
例如: mcwords_v2.2.4_b10_20260218_143025_a1b2c3d.apk
```

## 🔄 版本号管理

### 自动版本管理 (默认)

GitHub Actions 会自动递增 patch 版本号:
- `2.2.3` → `2.2.4` → `2.2.5` ...

**自动更新的文件:**
- `version.json` - 版本信息
- `android-app/android/app/build.gradle` - Android 版本配置

### 手动版本管理 (可选)

如需手动控制版本号:

```bash
# 递增 patch 版本 (2.2.3 → 2.2.4) - 小修复
node scripts/version-manager.js patch

# 递增 minor 版本 (2.2.3 → 2.3.0) - 新功能
node scripts/version-manager.js minor

# 递增 major 版本 (2.2.3 → 3.0.0) - 重大更新
node scripts/version-manager.js major
```

然后提交并推送:
```bash
git add version.json android-app/android/app/build.gradle
git commit -m "chore: bump version to x.x.x"
.\push.bat
```

## 📝 更新 CHANGELOG

每次发布新版本后,建议更新 `docs/CHANGELOG.md`:

```markdown
## [2.2.4] - 2026-02-18

### ✨ 新增
- 添加了新功能 A
- 添加了新功能 B

### 🔧 优化
- 优化了性能
- 改进了用户体验

### 🐛 修复
- 修复了 bug X
- 修复了 bug Y
```

## 🎯 完整工作流示例

```bash
# 1. 开发完成后,查看修改
git status

# 2. 添加并提交
git add .
git commit -m "feat: 添加单词收藏功能"

# 3. (可选) 更新 CHANGELOG
# 编辑 docs/CHANGELOG.md

# 4. (可选) 如果是重大更新,手动更新版本
# node scripts/version-manager.js minor

# 5. 推送到 GitHub
.\push.bat

# 6. 等待 GitHub Actions 构建完成
# 访问: https://github.com/nonomil/minecraft_words_apk/actions

# 7. 下载 APK 并测试

# 8. (可选) 创建 GitHub Release
# 在 GitHub 仓库页面创建 Release,上传 APK
```

## 🔍 查看当前版本

```bash
# 查看 version.json
cat version.json

# 或在 Windows 中
type version.json
```

输出示例:
```json
{
  "versionCode": 9,
  "versionName": "2.2.3",
  "buildNumber": 9,
  "lastBuildDate": "2026-02-18T05:50:45.785Z"
}
```

## ❓ 常见问题

### Q: push.bat 推送失败怎么办?

**A:** 检查以下几点:
1. 网络连接是否正常
2. 是否能访问 github.com
3. Git 凭据是否正确
4. 是否有仓库推送权限

脚本会自动重试,如果仍然失败,可以手动推送:
```bash
git push origin main
```

### Q: 如何查看构建日志?

**A:**
1. 访问 [GitHub Actions](https://github.com/nonomil/minecraft_words_apk/actions)
2. 点击最新的工作流运行
3. 点击 "build" 查看详细日志

### Q: 构建失败怎么办?

**A:**
1. 查看 Actions 日志找到错误信息
2. 常见问题:
   - Gradle 构建错误: 检查 build.gradle 语法
   - 依赖问题: 检查 package.json 和 node_modules
   - 资源同步问题: 检查文件路径是否正确

### Q: 如何回退版本?

**A:**
```bash
# 查看提交历史
git log --oneline

# 回退到指定提交
git reset --hard <commit-hash>

# 强制推送 (谨慎使用)
git push -f origin main
```

### Q: 版本号跳过了怎么办?

**A:** 手动修改 `version.json`:
```json
{
  "versionCode": 10,
  "versionName": "2.2.5",
  "buildNumber": 10
}
```

然后提交并推送。

## 📚 更多文档

- [完整部署指南](./docs/DEPLOYMENT.md) - 详细的部署流程
- [开发指南](./docs/DEVELOPMENT.md) - 开发环境配置
- [更新日志](./docs/CHANGELOG.md) - 版本历史记录
- [功能说明](./docs/FEATURES.md) - 完整功能列表

## 🆘 获取帮助

如遇到问题:
1. 查看 [Issues](https://github.com/nonomil/minecraft_words_apk/issues)
2. 创建新 Issue 描述问题
3. 查看文档目录获取更多信息

---

**提示**: 保持简单!大多数情况下,只需要 `git commit` + `.\push.bat` 即可完成发布。
