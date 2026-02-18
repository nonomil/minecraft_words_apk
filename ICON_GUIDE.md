# 📱 Android 应用图标配置指南

本文档说明如何为 Minecraft Words APK 创建和配置应用图标。

---

## 📋 图标要求

Android 应用需要多种尺寸的图标：

| 密度 | 尺寸 | 用途 |
|------|------|------|
| mdpi | 48x48 | 中密度屏幕 |
| hdpi | 72x72 | 高密度屏幕 |
| xhdpi | 96x96 | 超高密度屏幕 |
| xxhdpi | 144x144 | 超超高密度屏幕 |
| xxxhdpi | 192x192 | 超超超高密度屏幕 |

**推荐：** 准备一个 **512x512** 的高质量图标，然后缩放到各个尺寸。

---

## 🎨 方法一：使用在线工具生成（推荐）

### 1. 准备图标素材

创建一个 512x512 的图标，可以包含：
- Minecraft 方块元素
- 字母 "M" 或 "W"
- 草方块、泥土方块等 Minecraft 元素

### 2. 使用在线图标生成器

访问以下任一工具：

#### 选项 A: Android Asset Studio
```
https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
```

步骤：
1. 上传你的 512x512 图标
2. 调整 padding、背景色等
3. 点击 "Download" 下载 ZIP 文件
4. 解压后将所有文件复制到 `android-app/android/app/src/main/res/`

#### 选项 B: App Icon Generator
```
https://appicon.co/
```

步骤：
1. 上传图标
2. 选择 "Android"
3. 下载生成的图标包
4. 复制到项目的 res 目录

---

## 🛠️ 方法二：使用 ImageMagick 批量生成

### 1. 安装 ImageMagick

**Windows:**
```bash
# 使用 Chocolatey
choco install imagemagick

# 或下载安装包
# https://imagemagick.org/script/download.php
```

**Mac:**
```bash
brew install imagemagick
```

**Linux:**
```bash
sudo apt-get install imagemagick
```

### 2. 准备源图标

将你的 512x512 图标保存为 `icon_source.png`

### 3. 运行生成脚本

创建 `generate_icons.sh` 文件：

```bash
#!/bin/bash

# 源图标文件
SOURCE="icon_source.png"

# 输出目录
RES_DIR="android-app/android/app/src/main/res"

# 检查源文件
if [ ! -f "$SOURCE" ]; then
    echo "错误: 找不到源图标文件 $SOURCE"
    exit 1
fi

# 生成各种尺寸的图标
echo "正在生成应用图标..."

# mdpi (48x48)
convert "$SOURCE" -resize 48x48 "$RES_DIR/mipmap-mdpi/ic_launcher.png"
convert "$SOURCE" -resize 48x48 "$RES_DIR/mipmap-mdpi/ic_launcher_round.png"

# hdpi (72x72)
convert "$SOURCE" -resize 72x72 "$RES_DIR/mipmap-hdpi/ic_launcher.png"
convert "$SOURCE" -resize 72x72 "$RES_DIR/mipmap-hdpi/ic_launcher_round.png"

# xhdpi (96x96)
convert "$SOURCE" -resize 96x96 "$RES_DIR/mipmap-xhdpi/ic_launcher.png"
convert "$SOURCE" -resize 96x96 "$RES_DIR/mipmap-xhdpi/ic_launcher_round.png"

# xxhdpi (144x144)
convert "$SOURCE" -resize 144x144 "$RES_DIR/mipmap-xxhdpi/ic_launcher.png"
convert "$SOURCE" -resize 144x144 "$RES_DIR/mipmap-xxhdpi/ic_launcher_round.png"

# xxxhdpi (192x192)
convert "$SOURCE" -resize 192x192 "$RES_DIR/mipmap-xxxhdpi/ic_launcher.png"
convert "$SOURCE" -resize 192x192 "$RES_DIR/mipmap-xxxhdpi/ic_launcher_round.png"

echo "✓ 图标生成完成！"
```

执行脚本：
```bash
chmod +x generate_icons.sh
./generate_icons.sh
```

---

## 🎨 方法三：使用 PowerShell 脚本（Windows）

创建 `generate_icons.ps1` 文件：

```powershell
# 需要安装 ImageMagick
$source = "icon_source.png"
$resDir = "android-app/android/app/src/main/res"

if (-not (Test-Path $source)) {
    Write-Host "错误: 找不到源图标文件 $source" -ForegroundColor Red
    exit 1
}

Write-Host "正在生成应用图标..." -ForegroundColor Yellow

# 定义尺寸
$sizes = @{
    "mdpi" = 48
    "hdpi" = 72
    "xhdpi" = 96
    "xxhdpi" = 144
    "xxxhdpi" = 192
}

foreach ($density in $sizes.Keys) {
    $size = $sizes[$density]
    $dir = "$resDir/mipmap-$density"

    Write-Host "生成 $density ($size x $size)..." -ForegroundColor Cyan

    # 普通图标
    magick convert $source -resize "${size}x${size}" "$dir/ic_launcher.png"

    # 圆形图标
    magick convert $source -resize "${size}x${size}" "$dir/ic_launcher_round.png"
}

Write-Host "✓ 图标生成完成！" -ForegroundColor Green
```

执行脚本：
```powershell
powershell -ExecutionPolicy Bypass -File generate_icons.ps1
```

---

## 🎯 方法四：手动创建简单图标

如果没有设计工具，可以创建一个简单的文字图标：

### 使用 Python + Pillow

创建 `create_simple_icon.py`：

```python
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, output_path):
    # 创建图像（Minecraft 草方块绿色）
    img = Image.new('RGB', (size, size), color='#7CB342')
    draw = ImageDraw.Draw(img)

    # 绘制边框
    border_width = max(2, size // 32)
    draw.rectangle(
        [(0, 0), (size-1, size-1)],
        outline='#558B2F',
        width=border_width
    )

    # 添加文字 "MW"
    try:
        font_size = size // 2
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()

    text = "MW"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    position = ((size - text_width) // 2, (size - text_height) // 2 - size // 10)
    draw.text(position, text, fill='white', font=font)

    # 保存
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path)
    print(f"✓ 创建: {output_path}")

# 生成所有尺寸
res_dir = "android-app/android/app/src/main/res"
sizes = {
    "mdpi": 48,
    "hdpi": 72,
    "xhdpi": 96,
    "xxhdpi": 144,
    "xxxhdpi": 192
}

for density, size in sizes.items():
    dir_path = f"{res_dir}/mipmap-{density}"
    create_icon(size, f"{dir_path}/ic_launcher.png")
    create_icon(size, f"{dir_path}/ic_launcher_round.png")

print("\n✓ 所有图标创建完成！")
```

安装依赖并运行：
```bash
pip install Pillow
python create_simple_icon.py
```

---

## 📂 图标文件位置

生成的图标应该放在以下位置：

```
android-app/android/app/src/main/res/
├── mipmap-mdpi/
│   ├── ic_launcher.png (48x48)
│   └── ic_launcher_round.png (48x48)
├── mipmap-hdpi/
│   ├── ic_launcher.png (72x72)
│   └── ic_launcher_round.png (72x72)
├── mipmap-xhdpi/
│   ├── ic_launcher.png (96x96)
│   └── ic_launcher_round.png (96x96)
├── mipmap-xxhdpi/
│   ├── ic_launcher.png (144x144)
│   └── ic_launcher_round.png (144x144)
└── mipmap-xxxhdpi/
    ├── ic_launcher.png (192x192)
    └── ic_launcher_round.png (192x192)
```

---

## ✅ 验证图标

### 1. 检查文件是否存在

```bash
find android-app/android/app/src/main/res/mipmap-* -name "ic_launcher.png"
```

应该看到 5 个文件（每个密度一个）。

### 2. 构建并安装 APK

```bash
cd android-app/android
./gradlew assembleDebug
```

安装到设备后，检查应用图标是否正确显示。

---

## 🎨 设计建议

### Minecraft Words 图标设计思路：

1. **草方块主题**
   - 使用 Minecraft 经典的草方块绿色 (#7CB342)
   - 添加方块纹理效果

2. **字母标识**
   - 在中心显示 "MW" 或 "M"
   - 使用像素风格字体

3. **简洁明了**
   - 图标在小尺寸下也要清晰可辨
   - 避免过多细节

4. **颜色方案**
   - 主色：草方块绿 (#7CB342)
   - 辅色：深绿 (#558B2F)
   - 文字：白色或浅色

---

## 🔄 更新图标后

1. **清理构建缓存**
   ```bash
   cd android-app/android
   ./gradlew clean
   ```

2. **重新构建**
   ```bash
   ./gradlew assembleDebug
   ```

3. **提交到 Git**
   ```bash
   git add android-app/android/app/src/main/res/mipmap-*
   git commit -m "feat: 更新应用图标"
   git push origin main
   ```

---

## 📚 参考资源

- [Android 图标设计指南](https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher)
- [Material Design 图标](https://material.io/design/iconography)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)

---

**提示：** 如果你需要我帮你创建一个简单的图标，请告诉我你想要的设计风格！
