# 🚀 部署和发布指南

本文档介绍如何部署和发布应用到不同平台。

## 目录
- [GitHub推送](#github推送)
- [GitHub Actions自动构建](#github-actions自动构建)
- [手动构建APK](#手动构建apk)
- [Web部署](#web部署)
- [发布流程](#发布流程)

---

## GitHub推送

### 快速推送 (推荐)

项目根目录提供了 `push.bat` 脚本,简化推送流程:

```bash
# Windows用户直接双击运行
push.bat

# 或在命令行中运行
.\push.bat
```

**脚本功能:**
- ✅ 自动检查 git 仓库状态
- ✅ 自动修复远程仓库 URL 问题
- ✅ 显示当前版本信息
- ✅ 显示待推送的提交
- ✅ 自动重试推送(处理网络问题)
- ✅ 推送成功后显示 GitHub Actions 链接

**注意事项:**
- 推送前请先使用 `git add` 和 `git commit` 提交更改
- 版本号会在 GitHub Actions 构建时自动递增
- 无需手动更新 version.json

### 首次推送
```bash
# 添加远程仓库
git remote add origin https://github.com/nonomil/minecraft_words_apk.git

# 推送代码
git push -u origin main
```

### 日常推送
```bash
# 添加更改
git add .

# 提交
git commit -m "描述你的更改"

# 使用 push.bat 推送 (推荐)
.\push.bat

# 或手动推送
git push origin main
```

### 推送标签
```bash
# 创建标签
git tag v2.2.0 -m "Release v2.2.0"

# 推送标签
git push origin v2.2.0

# 或推送所有标签
git push origin --tags
```

### 网络问题解决

如果遇到代理错误:
```bash
# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 或设置正确的代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

---

## GitHub Actions自动构建

### 配置说明

项目已配置两个GitHub Actions工作流:

#### 1. Android Debug APK构建
**文件**: `.github/workflows/android-debug.yml`

**触发条件**:
- 推送到 `main` 分支
- 手动触发 (workflow_dispatch)

**自动化流程**:
1. ✅ 自动递增版本号 (patch)
2. ✅ 更新 `version.json` 文件
3. ✅ 更新 `build.gradle` 中的 versionCode 和 versionName
4. ✅ 同步 Web 资源到 android-app
5. ✅ 构建 Android Debug APK
6. ✅ 重命名 APK (包含版本号、构建号、时间戳、commit SHA)
7. ✅ 上传 APK 作为 artifact
8. ✅ 生成 Release Notes

**构建产物**:
- `mcwords_v{版本号}_b{构建号}_{时间戳}_{commit}.apk` - Debug版本APK
- `release-notes-{版本}.md` - 发布说明

#### 2. Windows EXE构建 (可选)
**文件**: `.github/workflows/win-exe-online.yml`

**触发条件**:
- 手动触发

**构建产物**:
- Windows可执行文件

### 查看构建状态

1. 访问GitHub仓库
2. 点击 "Actions" 标签
3. 查看工作流运行状态

### 下载构建产物

1. 进入完成的工作流运行
2. 滚动到底部 "Artifacts" 部分
3. 点击下载链接

### 手动触发构建

1. 进入 "Actions" 标签
2. 选择工作流
3. 点击 "Run workflow"
4. 选择分支
5. 点击 "Run workflow" 按钮

---

## 手动构建APK

### 环境准备

确保已安装:
- Node.js 16+
- Android Studio
- JDK 17

### 构建步骤

#### 1. 同步Web资源
```bash
cd android-app
npm run sync
```

#### 2. 同步Capacitor
```bash
npx cap sync
```

#### 3. 在Android Studio中打开
```bash
npx cap open android
```

#### 4. 构建Debug APK
在Android Studio中:
- Build → Build Bundle(s) / APK(s) → Build APK(s)
- 等待构建完成
- APK位置: `android-app/android/app/build/outputs/apk/debug/app-debug.apk`

#### 5. 构建Release APK

**生成签名密钥** (首次):
```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

**配置签名**:
在 `android-app/android/app/build.gradle` 中添加:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("path/to/my-release-key.jks")
            storePassword "密码"
            keyAlias "my-key-alias"
            keyPassword "密码"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

**构建**:
- Build → Generate Signed Bundle / APK
- 选择 APK
- 选择签名密钥
- 选择 Release
- 构建完成

---

## Web部署

### 静态托管

#### GitHub Pages
1. 在仓库设置中启用GitHub Pages
2. 选择 `main` 分支
3. 访问 `https://你的用户名.github.io/MineCraft学单词游戏-v2/`

#### Vercel
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

#### Netlify
1. 在Netlify中创建新站点
2. 连接GitHub仓库
3. 设置构建命令: (留空)
4. 设置发布目录: `/`
5. 部署

### 服务器部署

#### Nginx配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/minecraft-words;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache配置示例
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/minecraft-words
    
    <Directory /var/www/minecraft-words>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # 缓存
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/* "access plus 1 year"
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
    </IfModule>
</VirtualHost>
```

---

## 发布流程

### 版本发布清单

#### 1. 准备阶段
- [ ] 完成所有功能开发
- [ ] 测试所有功能
- [ ] 更新 `docs/CHANGELOG.md` (添加新版本记录)
- [ ] 更新 `README.md` (如需要)
- [ ] 更新 `package.json` 中的 version (如有重大版本变更)

**注意**: `version.json` 和 `build.gradle` 会由 GitHub Actions 自动更新,无需手动修改

#### 2. 提交阶段
- [ ] 提交所有更改
  ```bash
  git add .
  git commit -m "feat: 添加新功能描述"
  # 或
  git commit -m "fix: 修复bug描述"
  # 或
  git commit -m "chore: 更新文档"
  ```

#### 3. 推送阶段
- [ ] 使用 push.bat 推送到 GitHub
  ```bash
  .\push.bat
  ```
- [ ] 等待 GitHub Actions 自动构建完成 (约5-10分钟)
- [ ] 检查 Actions 运行状态: https://github.com/nonomil/minecraft_words_apk/actions

#### 4. 下载构建产物
- [ ] 进入完成的工作流运行
- [ ] 滚动到底部 "Artifacts" 部分
- [ ] 下载 APK 文件 (格式: `mcwords_v{版本}_b{构建号}_{时间戳}_{commit}.apk`)
- [ ] 下载 Release Notes

#### 5. 测试阶段
- [ ] 在真机上安装测试 APK
- [ ] 测试核心功能
- [ ] 测试新增功能
- [ ] 检查版本号显示是否正确

#### 6. 发布阶段 (可选)
如需创建正式 Release:
1. 访问 GitHub 仓库
2. 点击 "Releases" → "Draft a new release"
3. 创建新标签: `v{版本号}` (例如: v2.2.4)
4. 填写发布说明 (可参考自动生成的 Release Notes)
5. 上传 APK 文件
6. 发布

#### 7. 更新 CHANGELOG
- [ ] 在 `docs/CHANGELOG.md` 中添加本次发布的详细记录
- [ ] 包含版本号、日期、新增功能、修复内容等

---

## 版本号管理

### 自动版本管理 (推荐)

项目使用自动版本管理系统,无需手动更新版本号:

**工作流程:**
1. 开发者提交代码并推送到 GitHub
2. GitHub Actions 自动运行 `scripts/version-manager.js`
3. 自动递增版本号 (patch: 2.2.3 → 2.2.4)
4. 自动更新 `version.json` 和 `build.gradle`
5. 构建 APK 并上传

**版本文件**: `version.json`
```json
{
  "versionCode": 9,
  "versionName": "2.2.3",
  "buildNumber": 9,
  "lastBuildDate": "2026-02-18T05:50:45.785Z",
  "releaseNotes": {
    "zh": "功能描述",
    "en": "Feature description"
  }
}
```

**手动递增版本** (仅在需要时):
```bash
# 递增 patch 版本 (2.2.3 → 2.2.4)
node scripts/version-manager.js patch

# 递增 minor 版本 (2.2.3 → 2.3.0)
node scripts/version-manager.js minor

# 递增 major 版本 (2.2.3 → 3.0.0)
node scripts/version-manager.js major
```

### 语义化版本
格式: `主版本.次版本.修订号`

- **主版本 (major)**: 不兼容的API修改
- **次版本 (minor)**: 向下兼容的功能新增
- **修订号 (patch)**: 向下兼容的问题修正

### 示例
- `2.0.0` → `2.1.0`: 新增功能 (minor)
- `2.1.0` → `2.1.1`: Bug修复 (patch)
- `2.1.1` → `3.0.0`: 重大更新 (major)

### 版本同步位置

版本号会自动同步到以下位置:

#### version.json (自动更新)
```json
{
  "versionCode": 9,
  "versionName": "2.2.3",
  "buildNumber": 9
}
```

#### build.gradle (自动更新)
```gradle
versionCode 9
versionName "2.2.3"
```

#### package.json (手动更新)
```json
{
  "version": "2.0.0"
}
```

**注意**: `package.json` 中的版本号用于项目标识,不会自动更新。

---

## 持续集成/持续部署 (CI/CD)

### GitHub Actions优势
- ✅ 自动构建
- ✅ 多平台支持
- ✅ 免费额度充足
- ✅ 与GitHub深度集成

### 工作流优化建议

#### 缓存依赖
```yaml
- name: Cache Gradle
  uses: actions/cache@v3
  with:
    path: |
      ~/.gradle/caches
      ~/.gradle/wrapper
    key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*') }}
```

#### 并行构建
```yaml
strategy:
  matrix:
    build-type: [debug, release]
```

#### 构建通知
使用GitHub Actions的通知功能或集成第三方服务(如Slack)。

---

## 故障排查

### 构建失败

#### Gradle构建错误
```bash
# 清理构建缓存
cd android-app/android
./gradlew clean

# 重新构建
./gradlew assembleDebug
```

#### 依赖问题
```bash
# 更新依赖
npm update

# 重新安装
rm -rf node_modules
npm install
```

### 推送失败

#### 认证问题
使用Personal Access Token代替密码:
1. GitHub → Settings → Developer settings → Personal access tokens
2. 生成新token
3. 使用token作为密码

#### 大文件问题
使用Git LFS:
```bash
git lfs install
git lfs track "*.apk"
git add .gitattributes
```

---

## 安全注意事项

### 敏感信息保护
- ❌ 不要提交签名密钥到Git
- ❌ 不要提交密码和token
- ✅ 使用 `.gitignore` 排除敏感文件
- ✅ 使用环境变量或GitHub Secrets

### GitHub Secrets配置
1. 仓库 → Settings → Secrets and variables → Actions
2. 添加secrets:
   - `KEYSTORE_FILE` (Base64编码的密钥文件)
   - `KEYSTORE_PASSWORD`
   - `KEY_ALIAS`
   - `KEY_PASSWORD`

### 在Actions中使用
```yaml
- name: Decode keystore
  run: echo "${{ secrets.KEYSTORE_FILE }}" | base64 -d > my-release-key.jks
```

---

## 参考资源

- [GitHub Actions文档](https://docs.github.com/en/actions)
- [Capacitor文档](https://capacitorjs.com/docs)
- [Android签名指南](https://developer.android.com/studio/publish/app-signing)
- [语义化版本](https://semver.org/lang/zh-CN/)
