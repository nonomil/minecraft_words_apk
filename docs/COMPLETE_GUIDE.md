# 📱 Android APK 自动化构建与发布完整指南

本文档提供从零开始配置 GitHub Actions 自动化构建、签名和发布 Android APK 的完整流程。

---

## 📋 目录

1. [系统要求](#系统要求)
2. [第一步：准备 GitHub 仓库](#第一步准备-github-仓库)
3. [第二步：生成 Android 签名密钥](#第二步生成-android-签名密钥)
4. [第三步：配置 GitHub Secrets](#第三步配置-github-secrets)
5. [第四步：配置项目文件](#第四步配置项目文件)
6. [第五步：触发自动构建](#第五步触发自动构建)
7. [第六步：验证和下载](#第六步验证和下载)
8. [常见问题排查](#常见问题排查)

---

## 系统要求

### 本地开发环境
- ✅ Git 已安装
- ✅ Node.js 已安装（用于版本管理脚本）
- ✅ Java JDK 已安装（用于生成签名密钥）
- ✅ 文本编辑器（VS Code、Notepad++ 等）

### GitHub 账号
- ✅ 拥有仓库的管理员权限
- ✅ 能够访问仓库的 Settings 页面

---

## 第一步：准备 GitHub 仓库

### 1.1 克隆或初始化仓库

如果还没有本地仓库：

```bash
# 克隆远程仓库
git clone https://github.com/你的用户名/你的仓库名.git
cd 你的仓库名
```

如果已有本地项目但未连接 GitHub：

```bash
# 初始化 Git 仓库
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 拉取远程分支
git pull origin main --rebase
```

### 1.2 验证连接

```bash
# 查看远程仓库
git remote -v

# 应该看到类似输出：
# origin  https://github.com/你的用户名/你的仓库名.git (fetch)
# origin  https://github.com/你的用户名/你的仓库名.git (push)
```

---

## 第二步：生成 Android 签名密钥

### 2.1 为什么需要签名密钥？

Android 应用必须经过数字签名才能发布到 Google Play 或其他应用商店。签名密钥用于：
- 验证应用的真实性
- 确保应用更新来自同一开发者
- 保护应用不被篡改

### 2.2 生成密钥（自动化脚本）

#### 方法一：使用 PowerShell 脚本（推荐）

在项目根目录创建 `generate_keystore.ps1` 文件：

```powershell
# 配置参数
$keystoreName = "你的应用名.keystore"
$alias = "你的应用别名"
$password = "你的强密码"  # 请使用强密码！
$dname = "CN=你的名字, OU=Development, O=你的组织, L=城市, ST=省份, C=CN"

# 查找 keytool
Write-Host "正在查找 keytool..." -ForegroundColor Yellow

$keytoolPath = Get-ChildItem -Path "C:\Program Files" -Filter "keytool.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName

if (-not $keytoolPath) {
    Write-Host "错误: 找不到 keytool。请确保已安装 Java JDK。" -ForegroundColor Red
    Write-Host "下载地址: https://adoptium.net/" -ForegroundColor Yellow
    exit 1
}

Write-Host "找到 keytool: $keytoolPath" -ForegroundColor Green

# 生成 keystore
Write-Host "正在生成 keystore..." -ForegroundColor Yellow

& $keytoolPath -genkeypair -v -storetype PKCS12 -keystore $keystoreName -alias $alias -keyalg RSA -keysize 2048 -validity 10000 -storepass $password -keypass $password -dname $dname

if (Test-Path $keystoreName) {
    Write-Host "✓ Keystore 生成成功!" -ForegroundColor Green

    # 转换为 Base64
    Write-Host "正在转换为 Base64..." -ForegroundColor Yellow
    $bytes = [System.IO.File]::ReadAllBytes($keystoreName)
    $base64 = [System.Convert]::ToBase64String($bytes)
    $base64 | Out-File -Encoding ASCII "keystore_base64.txt"

    Write-Host "✓ Base64 转换成功!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== 重要信息 ===" -ForegroundColor Green
    Write-Host "Keystore 文件: $keystoreName" -ForegroundColor Cyan
    Write-Host "密码: $password" -ForegroundColor Cyan
    Write-Host "别名: $alias" -ForegroundColor Cyan
    Write-Host "Base64 文件: keystore_base64.txt" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⚠️  请妥善保管这些信息！" -ForegroundColor Yellow
} else {
    Write-Host "错误: Keystore 生成失败" -ForegroundColor Red
}
```

执行脚本：

```powershell
# 在 PowerShell 中执行
powershell -ExecutionPolicy Bypass -File generate_keystore.ps1
```

#### 方法二：手动生成

```bash
# Windows 用户（在 CMD 中执行）
keytool -genkeypair -v -storetype PKCS12 -keystore 你的应用名.keystore -alias 你的应用别名 -keyalg RSA -keysize 2048 -validity 10000

# 然后在 PowerShell 中转换为 Base64
[Convert]::ToBase64String([IO.File]::ReadAllBytes("你的应用名.keystore")) | Out-File -Encoding ASCII keystore_base64.txt
```

```bash
# Mac/Linux 用户
keytool -genkeypair -v -storetype PKCS12 -keystore 你的应用名.keystore -alias 你的应用别名 -keyalg RSA -keysize 2048 -validity 10000

# 转换为 Base64
base64 你的应用名.keystore > keystore_base64.txt
```

### 2.3 记录重要信息

⚠️ **非常重要！** 请将以下信息保存到密码管理器：

```
Keystore 文件: 你的应用名.keystore
Keystore 密码: [你设置的密码]
Key 别名: [你设置的别名]
Key 密码: [你设置的密码]
```

**注意：**
- 密钥文件丢失后无法恢复
- 丢失密钥意味着无法更新已发布的应用
- 请备份 keystore 文件到安全位置

---

## 第三步：配置 GitHub Secrets

### 3.1 什么是 GitHub Secrets？

GitHub Secrets 是一种安全存储敏感信息的方式，用于：
- 存储密码、API 密钥等敏感数据
- 在 GitHub Actions 中使用这些数据
- 确保敏感信息不会泄露到代码仓库

### 3.2 打开 Secrets 配置页面

1. 在浏览器中打开你的 GitHub 仓库
2. 点击顶部的 **Settings** 标签
3. 在左侧菜单找到 **Secrets and variables**
4. 点击展开，选择 **Actions**
5. 你会看到 "Actions secrets and variables" 页面

**直接访问链接：**
```
https://github.com/你的用户名/你的仓库名/settings/secrets/actions
```

### 3.3 添加 4 个必需的 Secrets

#### Secret 1: SIGNING_STORE_FILE

这是 keystore 文件的 Base64 编码。

1. 点击 **New repository secret**
2. **Name** 字段输入：
   ```
   SIGNING_STORE_FILE
   ```
3. **Secret** 字段：
   - 打开 `keystore_base64.txt` 文件
   - 复制**全部内容**（一长串字符）
   - 粘贴到 Secret 字段
4. 点击 **Add secret**

#### Secret 2: SIGNING_STORE_PASSWORD

这是 keystore 的密码。

1. 点击 **New repository secret**
2. **Name** 字段输入：
   ```
   SIGNING_STORE_PASSWORD
   ```
3. **Secret** 字段输入你在生成密钥时设置的密码
4. 点击 **Add secret**

#### Secret 3: SIGNING_KEY_ALIAS

这是密钥的别名。

1. 点击 **New repository secret**
2. **Name** 字段输入：
   ```
   SIGNING_KEY_ALIAS
   ```
3. **Secret** 字段输入你在生成密钥时设置的别名
4. 点击 **Add secret**

#### Secret 4: SIGNING_KEY_PASSWORD

这是密钥的密码（通常与 keystore 密码相同）。

1. 点击 **New repository secret**
2. **Name** 字段输入：
   ```
   SIGNING_KEY_PASSWORD
   ```
3. **Secret** 字段输入你在生成密钥时设置的密钥密码
4. 点击 **Add secret**

### 3.4 验证配置

配置完成后，你应该在 "Repository secrets" 列表中看到 4 个 secrets：

- ✅ SIGNING_STORE_FILE
- ✅ SIGNING_STORE_PASSWORD
- ✅ SIGNING_KEY_ALIAS
- ✅ SIGNING_KEY_PASSWORD

---

## 第四步：配置项目文件

### 4.1 配置 build.gradle

在 `android/app/build.gradle` 文件中添加签名配置：

```gradle
android {
    namespace "com.example.yourapp"
    compileSdk rootProject.ext.compileSdkVersion

    // 添加签名配置
    def signingStoreFile = System.getenv("SIGNING_STORE_FILE")
    if (signingStoreFile) {
        signingConfigs {
            release {
                storeFile file(signingStoreFile)
                storeType "PKCS12"
                storePassword System.getenv("SIGNING_STORE_PASSWORD") ?: ""
                keyAlias System.getenv("SIGNING_KEY_ALIAS") ?: ""
                keyPassword System.getenv("SIGNING_KEY_PASSWORD") ?: ""
            }
        }
    }

    defaultConfig {
        applicationId "com.example.yourapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        debug {
            if (signingStoreFile) {
                signingConfig signingConfigs.release
            }
        }
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            if (signingStoreFile) {
                signingConfig signingConfigs.release
            }
        }
    }
}
```

### 4.2 创建版本管理文件

#### version.json

在项目根目录创建 `version.json`：

```json
{
  "versionCode": 1,
  "versionName": "1.0.0",
  "buildNumber": 1,
  "lastBuildDate": "2026-02-18T00:00:00.000Z",
  "releaseNotes": {
    "zh": "首次发布",
    "en": "Initial release"
  }
}
```

#### scripts/version-manager.js

创建 `scripts/version-manager.js` 文件：

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BUILD_GRADLE_PATH = path.join(__dirname, '../android/app/build.gradle');
const VERSION_FILE_PATH = path.join(__dirname, '../version.json');

function readCurrentVersion() {
    if (fs.existsSync(VERSION_FILE_PATH)) {
        return JSON.parse(fs.readFileSync(VERSION_FILE_PATH, 'utf8'));
    }
    return {
        versionCode: 1,
        versionName: "1.0.0",
        buildNumber: 0,
        lastBuildDate: new Date().toISOString()
    };
}

function incrementVersion(currentVersion, incrementType = 'patch') {
    const newVersion = { ...currentVersion };
    newVersion.buildNumber = (currentVersion.buildNumber || 0) + 1;
    newVersion.versionCode = (currentVersion.versionCode || 1) + 1;
    newVersion.lastBuildDate = new Date().toISOString();

    const versionParts = (currentVersion.versionName || '1.0.0').split('.');
    let major = parseInt(versionParts[0]) || 1;
    let minor = parseInt(versionParts[1]) || 0;
    let patch = parseInt(versionParts[2]) || 0;

    switch (incrementType) {
        case 'major':
            major++;
            minor = 0;
            patch = 0;
            break;
        case 'minor':
            minor++;
            patch = 0;
            break;
        case 'patch':
        default:
            patch++;
            break;
    }

    newVersion.versionName = `${major}.${minor}.${patch}`;
    return newVersion;
}

function updateBuildGradle(versionInfo) {
    let content = fs.readFileSync(BUILD_GRADLE_PATH, 'utf8');
    content = content.replace(/versionCode\s+\d+/, `versionCode ${versionInfo.versionCode}`);
    content = content.replace(/versionName\s+"[^"]*"/, `versionName "${versionInfo.versionName}"`);
    fs.writeFileSync(BUILD_GRADLE_PATH, content);
}

function saveVersion(versionInfo) {
    fs.writeFileSync(VERSION_FILE_PATH, JSON.stringify(versionInfo, null, 2));
}

async function main() {
    const currentVersion = readCurrentVersion();
    const incrementType = process.argv[2] || 'patch';
    const newVersion = incrementVersion(currentVersion, incrementType);

    updateBuildGradle(newVersion);
    saveVersion(newVersion);

    console.log(`Version updated to ${newVersion.versionName}`);
}

main().catch(console.error);
```

### 4.3 创建 GitHub Actions 工作流

创建 `.github/workflows/android.yml`：

```yaml
name: Android Release Build

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:
    inputs:
      version_increment:
        description: 'Version increment type'
        required: false
        default: 'patch'
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Auto-increment version
        id: version
        run: |
          INCREMENT_TYPE="${{ github.event.inputs.version_increment || 'patch' }}"
          node scripts/version-manager.js $INCREMENT_TYPE
          echo "VERSION_NAME=$(node -p "require('./version.json').versionName")" >> $GITHUB_OUTPUT
          echo "VERSION_CODE=$(node -p "require('./version.json').versionCode")" >> $GITHUB_OUTPUT

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
          cache: 'gradle'

      - name: Set up Android SDK
        uses: android-actions/setup-android@v3

      - name: Build Debug APK
        run: ./gradlew assembleDebug

      - name: Decode keystore
        run: |
          echo "${{ secrets.SIGNING_STORE_FILE }}" | base64 -d > android/keystore.jks

      - name: Build Release APK
        env:
          SIGNING_STORE_FILE: ${{ github.workspace }}/android/keystore.jks
          SIGNING_STORE_PASSWORD: ${{ secrets.SIGNING_STORE_PASSWORD }}
          SIGNING_KEY_ALIAS: ${{ secrets.SIGNING_KEY_ALIAS }}
          SIGNING_KEY_PASSWORD: ${{ secrets.SIGNING_KEY_PASSWORD }}
        run: ./gradlew assembleRelease

      - name: Rename APKs
        run: |
          VERSION_NAME="${{ steps.version.outputs.VERSION_NAME }}"
          cp android/app/build/outputs/apk/debug/app-debug.apk "yourapp_v${VERSION_NAME}_debug.apk"
          cp android/app/build/outputs/apk/release/app-release.apk "yourapp_v${VERSION_NAME}_release.apk"

      - name: Commit version changes
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add version.json android/app/build.gradle
          git diff --staged --quiet || git commit -m "chore: bump version to ${{ steps.version.outputs.VERSION_NAME }}"

      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: ${{ github.ref }}

      - name: Create GitHub Release
        uses: ncipollo/release-action@v1
        with:
          tag: v${{ steps.version.outputs.VERSION_NAME }}
          name: v${{ steps.version.outputs.VERSION_NAME }}
          artifacts: "*.apk"
          token: ${{ secrets.GITHUB_TOKEN }}
```

### 4.4 添加 .gitignore

确保 `.gitignore` 包含：

```
*.keystore
*.jks
keystore_base64.txt
generate_keystore.ps1
```

---

## 第五步：触发自动构建

### 5.1 方法一：推送代码触发

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "feat: 配置自动化构建和发布"

# 推送到 GitHub
git push origin main
```

推送后，GitHub Actions 会自动触发构建。

### 5.2 方法二：手动触发

1. 访问 GitHub Actions 页面：
   ```
   https://github.com/你的用户名/你的仓库名/actions
   ```

2. 在左侧选择 **Android Release Build** 工作流

3. 点击右侧的 **Run workflow** 按钮

4. 选择版本递增类型：
   - **patch**: 1.0.0 → 1.0.1
   - **minor**: 1.0.0 → 1.1.0
   - **major**: 1.0.0 → 2.0.0

5. 点击绿色的 **Run workflow** 按钮

---

## 第六步：验证和下载

### 6.1 查看构建状态

访问 Actions 页面：
```
https://github.com/你的用户名/你的仓库名/actions
```

点击最新的工作流运行，查看详细日志：
- ✅ 绿色勾号 = 成功
- 🟡 黄色圆圈 = 进行中
- ❌ 红色叉号 = 失败

### 6.2 下载 APK

构建成功后，访问 Releases 页面：
```
https://github.com/你的用户名/你的仓库名/releases
```

你会看到：
- 新的版本 Release（如 v1.0.1）
- Debug APK（未签名，用于测试）
- Release APK（已签名，可发布）

点击 APK 文件即可下载。

### 6.3 验证签名

下载 Release APK 后，可以验证签名：

```bash
# 查看签名信息
jarsigner -verify -verbose -certs yourapp_v1.0.1_release.apk

# 应该看到 "jar verified" 表示签名成功
```

---

## 常见问题排查

### 问题 1: Actions 页面没有显示工作流

**原因：** 工作流文件还没有推送到 GitHub

**解决方法：**
```bash
git add .github/workflows/android.yml
git commit -m "feat: 添加 GitHub Actions 工作流"
git push origin main
```

### 问题 2: 构建失败 - "Decode keystore" 步骤

**原因：** SIGNING_STORE_FILE 配置错误

**解决方法：**
1. 检查 Base64 内容是否完整
2. 重新生成 Base64：
   ```powershell
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("你的应用名.keystore")) | Out-File -Encoding ASCII keystore_base64.txt
   ```
3. 重新配置 SIGNING_STORE_FILE Secret

### 问题 3: 构建失败 - "Build Release APK" 步骤

**原因：** 签名密码错误

**解决方法：**
1. 确认密码正确（注意大小写）
2. 重新配置 SIGNING_STORE_PASSWORD 和 SIGNING_KEY_PASSWORD

### 问题 4: Release 创建失败

**原因：** Tag 已存在

**解决方法：**
```bash
# 删除本地 tag
git tag -d v1.0.1

# 删除远程 tag
git push origin :refs/tags/v1.0.1

# 重新触发构建
```

### 问题 5: 权限错误

**原因：** 工作流没有写入权限

**解决方法：**
1. 检查工作流文件中是否有：
   ```yaml
   permissions:
     contents: write
   ```
2. 或在仓库设置中启用：
   - Settings → Actions → General
   - Workflow permissions → Read and write permissions

---

## 🎉 完成！

现在你已经成功配置了完整的自动化构建和发布流程！

### 自动化流程总结

每次推送代码到 main 分支，系统会自动：

1. ✅ 递增版本号
2. ✅ 构建 Debug APK
3. ✅ 解码签名密钥
4. ✅ 构建并签名 Release APK
5. ✅ 创建 GitHub Release
6. ✅ 上传 APK 文件
7. ✅ 提交版本变更回仓库

### 下一步

- 📱 下载并测试 APK
- 🚀 发布到 Google Play Store
- 📊 监控 Actions 运行状态
- 🔄 持续迭代和改进

---

## 📚 参考资料

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Android 应用签名](https://developer.android.com/studio/publish/app-signing)
- [keytool 命令参考](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)
- [语义化版本](https://semver.org/lang/zh-CN/)

---

**文档版本：** 1.0.0
**最后更新：** 2026-02-18
**作者：** Claude Code Assistant
