from PIL import Image, ImageDraw, ImageFont
import os

def create_default_image():
    # 创建一个300x250的白色图片
    img = Image.new('RGB', (300, 250), 'white')
    draw = ImageDraw.Draw(img)
    
    # 添加文字
    text = "图片加载失败"
    
    # 尝试使用系统字体
    try:
        # Windows系统字体
        font = ImageFont.truetype("simhei.ttf", 32)
    except:
        try:
            # macOS系统字体
            font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 32)
        except:
            # 如果找不到中文字体，使用默认字体
            font = ImageFont.load_default()
    
    # 获取文字大小
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    # 计算文字位置（居中）
    x = (300 - text_width) // 2
    y = (250 - text_height) // 2
    
    # 绘制文字
    draw.text((x, y), text, fill='black', font=font)
    
    # 确保images目录存在
    if not os.path.exists('images'):
        os.makedirs('images')
    
    # 保存图片
    img.save('images/default.jpg', 'JPEG')
    print("默认图片已创建：images/default.jpg")

if __name__ == '__main__':
    create_default_image() 