# 🔐 激活系统说明

本文档介绍激活系统的工作原理和管理方法。

## 目录
- [激活方案](#激活方案)
- [激活码类型](#激活码类型)
- [生成激活码](#生成激活码)
- [管理激活码](#管理激活码)
- [安全建议](#安全建议)

---

## 激活方案

### 当前实现

应用支持**多源验证**机制:

1. **在线验证** (优先)
   - GitHub Raw文件
   - 其他在线源

2. **离线验证** (备用)
   - 本地激活码文件
   - 加密激活码

3. **调试模式**
   - 仅用于开发调试
   - 不解除激活限制

---

## 激活码类型

### 1. 简单激活码 (Simple)

**格式**: `MC-XXXX-XXXX-XXXX`

**特点**:
- ✅ 简单易用
- ✅ 易于管理
- ⚠️ 需要在线验证或本地文件
- ⚠️ 无法设置过期时间

**示例**:
```
MC-2024-ABCD-1234
MC-2024-EFGH-5678
MC-2024-IJKL-9012
```

**生成方法**:
```javascript
function generateSimpleCode() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MC-2024-${timestamp}-${random}`;
}

// 生成10个激活码
for (let i = 0; i < 10; i++) {
  console.log(generateSimpleCode());
}
```

---

### 2. 加密激活码 (Encrypted)

**格式**: `MC-ENC-[Base64编码的数据]`

**特点**:
- ✅ 包含过期时间
- ✅ 无需在线验证
- ✅ 难以伪造
- ⚠️ 较长,不易手动输入

**数据结构**:
```
userId|expiryDate|signature
```

**生成方法**:
```javascript
function generateEncryptedCode(userId, daysValid = 365) {
  const SECRET_KEY = 'minecraft-words-secret-key-2024'; // 与config.js中一致
  
  // 计算过期日期
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + daysValid);
  const expiryStr = expiryDate.toISOString();
  
  // 生成签名
  const signature = btoa(`${userId}${expiryStr}${SECRET_KEY}`).substring(0, 16);
  
  // 组合数据
  const data = `${userId}|${expiryStr}|${signature}`;
  
  // Base64编码
  const encoded = btoa(data);
  
  return `MC-ENC-${encoded}`;
}

// 示例
console.log(generateEncryptedCode('user001', 365)); // 1年有效期
console.log(generateEncryptedCode('user002', 30));  // 30天有效期
```

---

## 生成激活码

### 在线生成工具

创建一个HTML工具页面 (`docs/activation-generator.html`):

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>激活码生成工具</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        button {
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
        }
        textarea {
            width: 100%;
            height: 200px;
            font-family: monospace;
        }
        input[type="number"], input[type="text"] {
            padding: 8px;
            margin: 5px;
        }
    </style>
</head>
<body>
    <h1>🔐 激活码生成工具</h1>
    
    <div class="section">
        <h2>简单激活码</h2>
        <label>数量: <input type="number" id="simpleCount" value="10" min="1" max="100"></label>
        <button onclick="generateSimpleCodes()">生成</button>
        <button onclick="copyToClipboard('simpleOutput')">复制</button>
        <textarea id="simpleOutput" readonly></textarea>
    </div>
    
    <div class="section">
        <h2>加密激活码</h2>
        <label>用户ID: <input type="text" id="userId" value="user001"></label>
        <label>有效天数: <input type="number" id="daysValid" value="365" min="1"></label>
        <button onclick="generateEncryptedCode()">生成</button>
        <button onclick="copyToClipboard('encryptedOutput')">复制</button>
        <textarea id="encryptedOutput" readonly></textarea>
    </div>
    
    <script>
        const SECRET_KEY = 'minecraft-words-secret-key-2024';
        
        function generateSimpleCodes() {
            const count = parseInt(document.getElementById('simpleCount').value);
            const codes = [];
            
            for (let i = 0; i < count; i++) {
                const timestamp = Date.now().toString(36).toUpperCase();
                const random = Math.random().toString(36).substring(2, 6).toUpperCase();
                codes.push(`MC-2024-${timestamp}-${random}`);
            }
            
            document.getElementById('simpleOutput').value = codes.join('\n');
        }
        
        function generateEncryptedCode() {
            const userId = document.getElementById('userId').value;
            const daysValid = parseInt(document.getElementById('daysValid').value);
            
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + daysValid);
            const expiryStr = expiryDate.toISOString();
            
            const signature = btoa(`${userId}${expiryStr}${SECRET_KEY}`).substring(0, 16);
            const data = `${userId}|${expiryStr}|${signature}`;
            const encoded = btoa(data);
            const code = `MC-ENC-${encoded}`;
            
            document.getElementById('encryptedOutput').value = code;
        }
        
        function copyToClipboard(elementId) {
            const el = document.getElementById(elementId);
            el.select();
            document.execCommand('copy');
            alert('已复制到剪贴板!');
        }
    </script>
</body>
</html>
```

### 批量生成脚本

创建 Node.js 脚本 (`scripts/generate-codes.js`):

```javascript
const fs = require('fs');

const SECRET_KEY = 'minecraft-words-secret-key-2024';

// 生成简单激活码
function generateSimpleCode() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MC-2024-${timestamp}-${random}`;
}

// 生成加密激活码
function generateEncryptedCode(userId, daysValid = 365) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + daysValid);
  const expiryStr = expiryDate.toISOString();
  
  const signature = Buffer.from(`${userId}${expiryStr}${SECRET_KEY}`).toString('base64').substring(0, 16);
  const data = `${userId}|${expiryStr}|${signature}`;
  const encoded = Buffer.from(data).toString('base64');
  
  return `MC-ENC-${encoded}`;
}

// 生成100个简单激活码
const simpleCodes = [];
for (let i = 0; i < 100; i++) {
  simpleCodes.push(generateSimpleCode());
}

// 保存到文件
fs.writeFileSync('docs/activation_codes.txt', simpleCodes.join('\n'));
console.log('✅ 已生成100个简单激活码到 docs/activation_codes.txt');

// 生成10个加密激活码(1年有效期)
const encryptedCodes = [];
for (let i = 1; i <= 10; i++) {
  encryptedCodes.push(generateEncryptedCode(`user${String(i).padStart(3, '0')}`, 365));
}

fs.writeFileSync('docs/encrypted_codes.txt', encryptedCodes.join('\n'));
console.log('✅ 已生成10个加密激活码到 docs/encrypted_codes.txt');
```

**使用**:
```bash
node scripts/generate-codes.js
```

---

## 管理激活码

### 激活码文件格式

**docs/activation_codes.txt**:
```
# Minecraft单词学习游戏 - 激活码列表
# 格式: MC-YYYY-XXXX-XXXX
# 生成日期: 2024-11-27

MC-2024-ABCD-1234
MC-2024-EFGH-5678
MC-2024-IJKL-9012

# 批次2 - 2024-12-01
MC-2024-MNOP-3456
MC-2024-QRST-7890
```

**规则**:
- 每行一个激活码
- `#` 开头的行为注释
- 空行会被忽略

### 更新激活码

#### 方法1: 直接编辑文件
1. 编辑 `docs/activation_codes.txt`
2. 添加新的激活码
3. 提交到GitHub

#### 方法2: 使用脚本
```bash
# 生成新的激活码
node scripts/generate-codes.js

# 提交更新
git add docs/activation_codes.txt
git commit -m "chore: 更新激活码列表"
git push
```

### 验证流程

```
用户输入激活码
    ↓
格式检查 (MC-开头)
    ↓
在线验证 (GitHub Raw)
    ↓ (失败)
本地验证 (docs/activation_codes.txt)
    ↓ (失败)
加密激活码验证
    ↓ (失败)
激活失败
```

---

## 安全建议

### ⚠️ 当前方案的安全问题

1. **激活码明文存储**: 任何人都可以访问GitHub上的激活码列表
2. **无使用追踪**: 无法知道哪些激活码被使用
3. **无法撤销**: 已发放的激活码无法远程禁用

### ✅ 改进建议

#### 短期改进 (无需服务器)

1. **使用私有仓库**
   - 将激活码文件放在私有仓库
   - 使用GitHub Personal Access Token访问

2. **使用加密激活码**
   - 优先使用加密激活码
   - 设置合理的过期时间

3. **定期更换密钥**
   - 定期更换 `SECRET_KEY`
   - 重新生成激活码

#### 长期改进 (需要服务器)

1. **服务器端验证**
   ```
   客户端 → API服务器 → 数据库
   ```

2. **使用次数限制**
   - 每个激活码限制激活次数
   - 记录激活设备

3. **远程管理**
   - 实时禁用激活码
   - 查看使用统计

### 推荐的服务器方案

#### 免费方案: Vercel + MongoDB Atlas

**优点**:
- ✅ 完全免费
- ✅ 自动HTTPS
- ✅ 全球CDN

**实现**:
```javascript
// api/verify.js (Vercel Serverless Function)
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { code } = req.body;
  
  try {
    await client.connect();
    const db = client.db('minecraft-words');
    const activation = await db.collection('activations').findOne({ code });
    
    if (!activation) {
      return res.json({ success: false, message: '激活码不存在' });
    }
    
    if (activation.used >= activation.maxUses) {
      return res.json({ success: false, message: '激活码已达使用上限' });
    }
    
    // 记录使用
    await db.collection('activations').updateOne(
      { code },
      { 
        $inc: { used: 1 },
        $push: { usedAt: new Date() }
      }
    );
    
    res.json({ success: true, message: '激活成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
```

---

## 常见问题

### Q: 如何批量生成激活码?
A: 使用 `scripts/generate-codes.js` 脚本或在线生成工具。

### Q: 激活码可以重复使用吗?
A: 简单激活码可以,加密激活码也可以,但建议设置使用次数限制。

### Q: 如何撤销已发放的激活码?
A: 当前方案无法撤销。建议使用服务器端验证方案。

### Q: 加密激活码的密钥在哪里?
A: 在 `js/config.js` 的 `CONFIG.ACTIVATION.SECRET_KEY`。

### Q: 如何更换密钥?
A: 
1. 修改 `js/config.js` 中的 `SECRET_KEY`
2. 使用新密钥重新生成激活码
3. 旧激活码将失效

---

## 附录

### 激活码格式规范

| 类型 | 格式 | 长度 | 示例 |
|------|------|------|------|
| 简单 | MC-YYYY-XXXX-XXXX | 19 | MC-2024-ABCD-1234 |
| 加密 | MC-ENC-[Base64] | 变长 | MC-ENC-dXNlcjAwMXwyMDI1... |
| 调试 | MC-DEBUG-XXXX | 14 | MC-DEBUG-2024 |

### 验证源优先级

1. GitHub Raw (在线)
2. 本地文件 (离线)
3. 加密验证 (离线)

### 相关文件

- `js/config.js` - 激活配置
- `js/settings.js` - 验证逻辑
- `docs/activation_codes.txt` - 激活码列表
- `docs/activation-generator.html` - 生成工具
- `scripts/generate-codes.js` - 批量生成脚本
