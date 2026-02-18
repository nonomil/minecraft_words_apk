const fs = require('fs');
const path = require('path');

// 简单的 PNG 编码器 - 创建纯色图标
function createSimplePNG(size, color) {
    // 创建一个简单的 PNG 文件
    // 这是一个最小化的 PNG 实现
    const width = size;
    const height = size;

    // PNG 文件头
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    // IHDR chunk
    const ihdr = Buffer.alloc(25);
    ihdr.writeUInt32BE(13, 0); // chunk length
    ihdr.write('IHDR', 4);
    ihdr.writeUInt32BE(width, 8);
    ihdr.writeUInt32BE(height, 12);
    ihdr.writeUInt8(8, 16); // bit depth
    ihdr.writeUInt8(2, 17); // color type (RGB)
    ihdr.writeUInt8(0, 18); // compression
    ihdr.writeUInt8(0, 19); // filter
    ihdr.writeUInt8(0, 20); // interlace

    // 计算 CRC
    const crc = require('zlib').crc32(ihdr.slice(4, 21));
    ihdr.writeUInt32BE(crc, 21);

    // 创建图像数据 (简化版 - 纯色)
    const pixelData = Buffer.alloc(height * (1 + width * 3));
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    for (let y = 0; y < height; y++) {
        pixelData[y * (1 + width * 3)] = 0; // filter type
        for (let x = 0; x < width; x++) {
            const offset = y * (1 + width * 3) + 1 + x * 3;
            pixelData[offset] = r;
            pixelData[offset + 1] = g;
            pixelData[offset + 2] = b;
        }
    }

    // 压缩数据
    const compressed = require('zlib').deflateSync(pixelData);

    // IDAT chunk
    const idat = Buffer.alloc(12 + compressed.length);
    idat.writeUInt32BE(compressed.length, 0);
    idat.write('IDAT', 4);
    compressed.copy(idat, 8);
    const idatCrc = require('zlib').crc32(idat.slice(4, 8 + compressed.length));
    idat.writeUInt32BE(idatCrc, 8 + compressed.length);

    // IEND chunk
    const iend = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);

    return Buffer.concat([signature, ihdr, idat, iend]);
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

// Minecraft 草方块绿色
const grassGreen = '#7CB342';

console.log('Generating Minecraft Words icons...\n');

for (const [density, size] of Object.entries(sizes)) {
    const dir = path.join(resDir, `mipmap-${density}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const pngData = createSimplePNG(size, grassGreen);

    // 保存 ic_launcher.png
    const launcherPath = path.join(dir, 'ic_launcher.png');
    fs.writeFileSync(launcherPath, pngData);
    console.log(`✓ Created: ${launcherPath} (${size}x${size})`);

    // 保存 ic_launcher_round.png
    const roundPath = path.join(dir, 'ic_launcher_round.png');
    fs.writeFileSync(roundPath, pngData);
    console.log(`✓ Created: ${roundPath} (${size}x${size})`);
}

console.log('\n✅ All icons generated successfully!');
console.log('Note: These are simple green square icons.');
console.log('For better icons with "MW" text, use the HTML generator or online tools.');
