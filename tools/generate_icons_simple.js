const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// 创建 Minecraft 风格的草方块图标
function createMinecraftIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Minecraft 草方块配色
    const grassGreen = '#7CB342';
    const darkGreen = '#558B2F';
    const dirtBrown = '#8D6E63';
    const darkBrown = '#6D4C41';

    // 背景 - 草绿色
    ctx.fillStyle = grassGreen;
    ctx.fillRect(0, 0, size, size);

    // 下半部分 - 泥土色 (1/3 高度)
    const dirtHeight = Math.floor(size / 3);
    ctx.fillStyle = dirtBrown;
    ctx.fillRect(0, size - dirtHeight, size, dirtHeight);

    // 草地纹理线条
    ctx.strokeStyle = darkGreen;
    ctx.lineWidth = Math.max(1, Math.floor(size / 64));
    for (let i = 1; i <= 3; i++) {
        const y = Math.floor(((size - dirtHeight) / 4) * i);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
    }

    // 泥土纹理线条
    ctx.strokeStyle = darkBrown;
    for (let i = 1; i <= 2; i++) {
        const y = size - dirtHeight + Math.floor((dirtHeight / 3) * i);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
    }

    // 添加方块像素化效果
    const pixelSize = Math.max(2, Math.floor(size / 16));
    for (let y = 0; y < size - dirtHeight; y += pixelSize * 2) {
        for (let x = 0; x < size; x += pixelSize * 2) {
            if (Math.random() > 0.7) {
                ctx.fillStyle = darkGreen;
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    }

    // 泥土部分的像素化效果
    for (let y = size - dirtHeight; y < size; y += pixelSize * 2) {
        for (let x = 0; x < size; x += pixelSize * 2) {
            if (Math.random() > 0.7) {
                ctx.fillStyle = darkBrown;
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    }

    // 绘制外边框
    ctx.strokeStyle = darkGreen;
    ctx.lineWidth = Math.max(2, Math.floor(size / 32));
    ctx.strokeRect(0, 0, size, size);

    // 添加文字 "MW" (Minecraft Words)
    const fontSize = Math.floor(size / 2);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 文字阴影
    const shadowOffset = Math.max(2, Math.floor(size / 64));
    ctx.fillStyle = '#000000';
    ctx.fillText('MW', size / 2 + shadowOffset, size / 2 - size / 10 + shadowOffset);

    // 文字
    ctx.fillStyle = 'white';
    ctx.fillText('MW', size / 2, size / 2 - size / 10);

    return canvas;
}

// 生成所有尺寸的图标
const sizes = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192
};

const resDir = 'android-app/android/app/src/main/res';

console.log('Generating Minecraft-style grass block icons...\n');

for (const [density, size] of Object.entries(sizes)) {
    const dir = path.join(resDir, `mipmap-${density}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const canvas = createMinecraftIcon(size);
    const buffer = canvas.toBuffer('image/png');

    // 保存 ic_launcher.png
    const launcherPath = path.join(dir, 'ic_launcher.png');
    fs.writeFileSync(launcherPath, buffer);
    console.log(`✓ Created: ${launcherPath} (${size}x${size})`);

    // 保存 ic_launcher_round.png
    const roundPath = path.join(dir, 'ic_launcher_round.png');
    fs.writeFileSync(roundPath, buffer);
    console.log(`✓ Created: ${roundPath} (${size}x${size})`);
}

console.log('\n✅ All Minecraft-style icons generated successfully!');
console.log('Features: Grass block texture, dirt layer, pixelated effect, "MW" text');

