# 🚀 自动化发布配置指南

本文档提供**详细的图文步骤**，教你如何配置 GitHub Actions 自动化构建和发布流程。

## 📋 功能特性

✅ **自动版本管理** - 每次构建自动递增版本号
✅ **签名认证** - 支持 Release APK 签名
✅ **自动发布** - 自动创建 GitHub Release
✅ **版本记录** - 自动提交版本变更到仓库
✅ **多版本支持** - 同时生成 Debug 和 Release APK

---

## 🎯 快速开始 - 详细步骤

### 第一步：生成 Android 签名密钥

#### 1.1 打开命令行工具

- **Windows**: 按 `Win + R`，输入 `cmd`，回车
- **Mac/Linux**: 打开 Terminal

#### 1.2 执行生成密钥命令

复制以下命令并执行（根据提示输入信息）：

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore minecraft_words.keystore \
  -alias minecraft_words \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Windows 用户**使用这个命令（单行）：
```cmd
keytool -genkeypair -v -storetype PKCS12 -keystore minecraft_words.keystore -alias minecraft_words -keyalg RSA -keysize 2048 -validity 10000
```

#### 1.3 填写密钥信息

命令会提示你输入以下信息：

| 提示 | 说明 | 示例 |
|------|------|------|
| `Enter keystore password:` | 设置 keystore 密码（**记住这个密码**） | `MyStorePass123` |
| `Re-enter new password:` | 再次输入密码确认 | `MyStorePass123` |
| `Enter key password:` | 设置 key 密码（**记住这个密码**，可以与 keystore 密码相同） | `MyKeyPass123` |
| `What is your first and last name?` | 你的名字 | `Zhang San` |
| `What is the name of your organizational unit?` | 组织单位 | `Development` |
| `What is the name of your organization?` | 组织名称 | `My Company` |
| `What is the name of your City or Locality?` | 城市 | `Beijing` |
| `What is the name of your State or Province?` | 省份 | `Beijing` |
| `What is the two-letter country code?` | 国家代码 | `CN` |

#### 1.4 记录重要信息

**⚠️ 非常重要！** 请将以下信息记录在安全的地方：

```
Keystore 文件路径: minecraft_words.keystore
Keystore 密码: [你设置的密码]
Key 别名: minecraft_words
Key 密码: [你设置的密码]
```

---

### 第二步：将密钥转换为 Base64 格式

#### 2.1 Windows 用户

打开 PowerShell（不是 cmd），执行：

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("minecraft_words.keystore")) | Out-File -Encoding ASCII keystore_base64.txt
```

#### 2.2 Mac/Linux 用户

在 Terminal 中执行：

```bash
base64 minecraft_words.keystore > keystore_base64.txt
```

#### 2.3 获取 Base64 内容

用记事本打开 `keystore_base64.txt` 文件，复制**全部内容**（这是一长串字符）。

---

### 第三步：配置 GitHub Secrets（详细图文步骤）

#### 3.1 打开 GitHub 仓库设置页面

1. 在浏览器中打开你的仓库：
   ```
   https://github.com/nonomil/minecraft_words_apk
   ```

2. 点击页面顶部的 **Settings**（设置）标签
   - 如果看不到 Settings，说明你没有仓库权限，需要联系仓库所有者

#### 3.2 进入 Secrets 配置页面

1. 在左侧菜单中找到 **Secrets and variables**
2. 点击展开，选择 **Actions**
3. 你会看到 "Actions secrets and variables" 页面

#### 3.3 添加第一个 Secret：SIGNING_STORE_FILE

1. 点击右上角绿色按钮 **New repository secret**
2. 在 **Name** 字段中输入：
   ```
   SIGNING_STORE_FILE
   ```
3. 在 **Secret** 字段中粘贴刚才复制的 Base64 内容（整个 keystore_base64.txt 的内容）
4. 点击 **Add secret** 按钮保存

#### 3.4 添加第二个 Secret：SIGNING_STORE_PASSWORD

1. 再次点击 **New repository secret**
2. 在 **Name** 字段中输入：
   ```
   SIGNING_STORE_PASSWORD
   ```
3. 在 **Secret** 字段中输入你在第一步设置的 **keystore 密码**
4. 点击 **Add secret** 按钮保存

#### 3.5 添加第三个 Secret：SIGNING_KEY_ALIAS

1. 再次点击 **New repository secret**
2. 在 **Name** 字段中输入：
   ```
   SIGNING_KEY_ALIAS
   ```
3. 在 **Secret** 字段中输入：
   ```
   minecraft_words
   ```
4. 点击 **Add secret** 按钮保存

#### 3.6 添加第四个 Secret：SIGNING_KEY_PASSWORD

1. 再次点击 **New repository secret**
2. 在 **Name** 字段中输入：
   ```
   SIGNING_KEY_PASSWORD
   ```
3. 在 **Secret** 字段中输入你在第一步设置的 **key 密码**
4. 点击 **Add secret** 按钮保存

#### 3.7 验证配置

配置完成后，你应该在 "Repository secrets" 列表中看到 4 个 secrets：

- ✅ `SIGNING_STORE_FILE`
- ✅ `SIGNING_STORE_PASSWORD`
- ✅ `SIGNING_KEY_ALIAS`
- ✅ `SIGNING_KEY_PASSWORD`

---

### 第四步：更新工作流文件以支持 Base64 密钥

#### 4.1 修改 android.yml 工作流

在 `.github/workflows/android.yml` 文件中，找到 "Build Release APK" 步骤之前，添加解码密钥的步骤：

```yaml
      - name: Decode keystore
        run: |
          echo "${{ secrets.SIGNING_STORE_FILE }}" | base64 -d > keystore.jks
          echo "SIGNING_STORE_FILE=$(pwd)/keystore.jks" >> $GITHUB_ENV
```

完整的步骤顺序应该是：

```yaml
      - name: Make gradlew executable
        run: chmod +x android-app/android/gradlew

      - name: Build Debug APK
        working-directory: android-app/android
        run: ./gradlew --no-daemon assembleDebug

      - name: Decode keystore
        run: |
          echo "${{ secrets.SIGNING_STORE_FILE }}" | base64 -d > android-app/android/keystore.jks

      - name: Build Release APK
        working-directory: android-app/android
        env:
          SIGNING_STORE_FILE: ${{ github.workspace }}/android-app/android/keystore.jks
          SIGNING_STORE_PASSWORD: ${{ secrets.SIGNING_STORE_PASSWORD }}
          SIGNING_KEY_ALIAS: ${{ secrets.SIGNING_KEY_ALIAS }}
          SIGNING_KEY_PASSWORD: ${{ secrets.SIGNING_KEY_PASSWORD }}
        run: ./gradlew --no-daemon assembleRelease
```

---

### 第五步：推送代码并测试

#### 5.1 提交并推送代码

```bash
git add .
git commit -m "feat: 添加签名认证和自动发布配置"
git push origin main
```

#### 5.2 查看 Actions 运行状态

1. 打开浏览器，访问：
   ```
   https://github.com/nonomil/minecraft_words_apk/actions
   ```

2. 你应该看到一个新的工作流运行（名称：Android Release Build）

3. 点击进入查看详细日志

4. 等待构建完成（大约 5-10 分钟）

#### 5.3 查看 Release 页面

构建成功后，访问：
```
https://github.com/nonomil/minecraft_words_apk/releases
```

你应该看到：
- 一个新的版本 Release（如 v2.2.2）
- 一个 "latest" Release
- 每个 Release 都包含 Debug 和 Release APK 文件

---

## 📱 手动触发构建

### 方法一：通过 GitHub 网页

1. 打开 Actions 页面：
   ```
   https://github.com/nonomil/minecraft_words_apk/actions
   ```

2. 在左侧选择 **Android Release Build** 工作流

3. 点击右侧的 **Run workflow** 按钮

4. 选择版本递增类型：
   - **patch** - 小版本更新（2.2.1 → 2.2.2）
   - **minor** - 中版本更新（2.2.1 → 2.3.0）
   - **major** - 大版本更新（2.2.1 → 3.0.0）

5. 点击绿色的 **Run workflow** 按钮确认

### 方法二：通过本地命令

```bash
# 递增 patch 版本
node scripts/version-manager.js patch

# 递增 minor 版本
node scripts/version-manager.js minor

# 递增 major 版本
node scripts/version-manager.js major

# 提交并推送
git add version.json android-app/android/app/build.gradle
git commit -m "chore: bump version"
git push origin main
```

---

## 🔍 常见问题排查

### 问题 1：Actions 页面没有显示工作流

**原因**：工作流文件还没有推送到 GitHub

**解决方法**：
```bash
cd g:/UserCode/minecraft_words/minecraft_words_apk-main
git add .github/workflows/android.yml
git commit -m "feat: 添加自动发布工作流"
git push origin main
```

### 问题 2：构建失败，提示签名错误

**可能原因**：
- GitHub Secrets 配置错误
- Base64 编码有问题
- 密码输入错误

**解决方法**：
1. 检查 4 个 Secrets 是否都已配置
2. 重新生成 Base64 编码
3. 确认密码正确（注意大小写）

### 问题 3：Release 创建失败

**可能原因**：
- 工作流没有 `contents: write` 权限
- Tag 已存在

**解决方法**：
1. 检查工作流文件中是否有：
   ```yaml
   permissions:
     contents: write
   ```
2. 删除已存在的 tag：
   ```bash
   git tag -d v2.2.1
   git push origin :refs/tags/v2.2.1
   ```

### 问题 4：APK 没有签名

**检查方法**：
```bash
# 查看 APK 签名信息
jarsigner -verify -verbose -certs app-release.apk
```

**解决方法**：
- 确认 SIGNING_STORE_FILE 正确解码
- 检查环境变量是否正确传递

---

## 📚 参考链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Android 应用签名](https://developer.android.com/studio/publish/app-signing)
- [keytool 命令参考](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)

---

## 💡 提示

1. **保管好密钥文件**：`minecraft_words.keystore` 文件非常重要，丢失后无法更新已发布的应用
2. **备份密码**：将密码保存在密码管理器中
3. **不要提交密钥**：确保 `.gitignore` 中包含 `*.keystore`
4. **定期检查**：定期查看 Actions 运行状态，确保自动化流程正常

---

## 🎉 完成！

配置完成后，每次推送代码到 main 分支，系统会自动：
1. ✅ 递增版本号
2. ✅ 构建并签名 APK
3. ✅ 创建 GitHub Release
4. ✅ 上传 APK 文件
5. ✅ 提交版本变更

如有问题，请查看 [Actions 日志](https://github.com/nonomil/minecraft_words_apk/actions) 获取详细错误信息。

---

### 第一步：生成签名密钥

首先需要生成 Android 签名密钥（如果还没有）：

```bash
# 生成 PKCS12 格式的 keystore
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore minecraft_words.keystore \
  -alias minecraft_words \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

记录以下信息：
- Keystore 文件路径
- Keystore 密码
- Key 别名
- Key 密码

### 2. 配置 GitHub Secrets

在 GitHub 仓库中配置以下 Secrets：

1. 进入仓库 Settings → Secrets and variables → Actions
2. 点击 "New repository secret" 添加以下密钥：

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `SIGNING_STORE_FILE` | Keystore 文件的 Base64 编码 | (见下方说明) |
| `SIGNING_STORE_PASSWORD` | Keystore 密码 | `your_store_password` |
| `SIGNING_KEY_ALIAS` | Key 别名 | `minecraft_words` |
| `SIGNING_KEY_PASSWORD` | Key 密码 | `your_key_password` |

#### 如何获取 SIGNING_STORE_FILE 的值

```bash
# 将 keystore 文件转换为 Base64
base64 minecraft_words.keystore > keystore_base64.txt

# 或者在 Windows PowerShell 中
[Convert]::ToBase64String([IO.File]::ReadAllBytes("minecraft_words.keystore")) > keystore_base64.txt
```

将 `keystore_base64.txt` 的内容复制到 `SIGNING_STORE_FILE` Secret 中。

### 3. 更新工作流以使用 Base64 密钥

如果使用 Base64 编码的密钥，需要在工作流中添加解码步骤：

```yaml
- name: Decode keystore
  run: |
    echo "${{ secrets.SIGNING_STORE_FILE }}" | base64 -d > keystore.jks
    echo "SIGNING_STORE_FILE=$(pwd)/keystore.jks" >> $GITHUB_ENV
```

## 🎯 使用方法

### 自动触发（推荐）

每次推送到 `main` 分支时，工作流会自动：
1. 递增 patch 版本号（如 2.2.1 → 2.2.2）
2. 构建 Debug 和 Release APK
3. 创建带版本号的 GitHub Release
4. 更新 `latest` Release

### 手动触发

在 GitHub Actions 页面手动触发工作流，可以选择版本递增类型：

- **patch** - 修复版本（2.2.1 → 2.2.2）
- **minor** - 次要版本（2.2.1 → 2.3.0）
- **major** - 主要版本（2.2.1 → 3.0.0）

## 📦 版本管理

### 版本号规则

项目使用语义化版本号：`major.minor.patch`

- **major** - 重大更新，可能包含不兼容的变更
- **minor** - 新功能，向后兼容
- **patch** - Bug 修复，向后兼容

### 版本文件

- `version.json` - 版本信息存储
- `android-app/android/app/build.gradle` - Android 版本配置

版本管理脚本会自动同步这两个文件。

### 手动更新版本

```bash
# 递增 patch 版本
node scripts/version-manager.js patch

# 递增 minor 版本
node scripts/version-manager.js minor

# 递增 major 版本
node scripts/version-manager.js major
```

## 📝 Release Notes 管理

在 `version.json` 中更新 `releaseNotes` 字段：

```json
{
  "versionCode": 7,
  "versionName": "2.2.1",
  "buildNumber": 7,
  "releaseNotes": {
    "zh": "添加新功能 - 详细说明",
    "en": "Added new feature - detailed description"
  }
}
```

这些内容会自动包含在 GitHub Release 中。

## 🔍 工作流说明

### android.yml - 主要发布流程

- **触发条件**: 推送到 main 分支或手动触发
- **功能**:
  - 自动递增版本号
  - 构建 Debug 和 Release APK
  - 签名 Release APK
  - 创建版本化的 GitHub Release
  - 更新 latest Release
  - 提交版本变更到仓库

### android-debug.yml - 调试构建

- **触发条件**: 推送到 main 分支或手动触发
- **功能**:
  - 快速构建 Debug APK
  - 上传为 Artifact（不创建 Release）
  - 适合开发测试

## ⚠️ 注意事项

1. **首次配置**: 确保所有 GitHub Secrets 都已正确配置
2. **密钥安全**: 不要将 keystore 文件提交到仓库
3. **版本同步**: 不要手动修改 build.gradle 中的版本号，使用版本管理脚本
4. **Release 权限**: 确保工作流有 `contents: write` 权限

## 🐛 故障排查

### 签名失败

- 检查 GitHub Secrets 是否正确配置
- 验证 keystore 密码和别名
- 确认 Base64 编码正确

### 版本号不更新

- 检查 version.json 格式是否正确
- 确认 scripts/version-manager.js 可执行
- 查看工作流日志中的版本管理步骤

### Release 创建失败

- 确认工作流有 `contents: write` 权限
- 检查 tag 是否已存在
- 查看 APK 文件是否成功生成

## 📚 相关文档

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Android 签名配置](https://developer.android.com/studio/publish/app-signing)
- [语义化版本](https://semver.org/lang/zh-CN/)
