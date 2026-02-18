#!/usr/bin/env python3
"""
Minecraft Words 应用图标生成器
自动生成所有需要的 Android 应用图标尺寸
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_minecraft_icon(size, output_path):
    """
    创建 Minecraft 主题的应用图标

    Args:
        size: 图标尺寸（正方形）
        output_path: 输出文件路径
    """
    # Minecraft 草方块配色
    grass_green = '#7CB342'
    dark_green = '#558B2F'
    dirt_brown = '#8D6E63'

    # 创建图像
    img = Image.new('RGB', (size, size), color=grass_green)
    draw = ImageDraw.Draw(img)

    # 绘制草方块效果（上半部分草，下半部分泥土）
    dirt_height = size // 3
    draw.rectangle(
        [(0, size - dirt_height), (size, size)],
        fill=dirt_brown
    )

    # 添加方块纹理效果
    border_width = max(1, size // 64)

    # 绘制草地纹理线条
    for i in range(3):
        y = (size - dirt_height) // 4 * (i + 1)
        draw.line([(0, y), (size, y)], fill=dark_green, width=border_width)

    # 绘制泥土纹理
    for i in range(2):
        y = size - dirt_height + (dirt_height // 3) * (i + 1)
        draw.line([(0, y), (size, y)], fill='#6D4C41', width=border_width)

    # 绘制外边框
    border_width = max(2, size // 32)
    draw.rectangle(
        [(0, 0), (size-1, size-1)],
        outline=dark_green,
        width=border_width
    )

    # 添加文字 "MW" (Minecraft Words)
    try:
        # 尝试使用系统字体
        font_size = size // 2
        try:
            # Windows
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            try:
                # Mac
                font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
            except:
                try:
                    # Linux
                    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
                except:
                    font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    text = "MW"

    # 计算文字位置（居中）
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    position = (
        (size - text_width) // 2,
        (size - text_height) // 2 - size // 10
    )

    # 绘制文字阴影
    shadow_offset = max(2, size // 64)
    draw.text(
        (position[0] + shadow_offset, position[1] + shadow_offset),
        text,
        fill='#000000',
        font=font
    )

    # 绘制文字
    draw.text(position, text, fill='white', font=font)

    # 保存图标
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    print(f"Created: {output_path} ({size}x{size})")

def main():
    """主函数：生成所有尺寸的图标"""
    print("Minecraft Words Icon Generator")
    print("=" * 50)

    # 资源目录
    res_dir = "android-app/android/app/src/main/res"

    # 检查目录是否存在
    if not os.path.exists("android-app/android/app"):
        print("Error: Android project directory not found")
        print("Please run this script from the project root directory")
        return

    # Android 图标尺寸
    sizes = {
        "mdpi": 48,
        "hdpi": 72,
        "xhdpi": 96,
        "xxhdpi": 144,
        "xxxhdpi": 192
    }

    print("\nGenerating icons...")

    # 生成所有尺寸的图标
    for density, size in sizes.items():
        dir_path = f"{res_dir}/mipmap-{density}"

        # 创建普通图标
        create_minecraft_icon(size, f"{dir_path}/ic_launcher.png")

        # 创建圆形图标（使用相同的图标）
        create_minecraft_icon(size, f"{dir_path}/ic_launcher_round.png")

    print("\n" + "=" * 50)
    print("All icons generated successfully!")
    print("\nIcon location:")
    print(f"   {res_dir}/mipmap-*/ic_launcher.png")
    print("\nNext steps:")
    print("   1. Check the generated icons")
    print("   2. Run: cd android-app/android && ./gradlew clean")
    print("   3. Rebuild APK")
    print("   4. Commit to Git")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\nError: {e}")
        print("\nPlease make sure Pillow is installed:")
        print("   pip install Pillow")
