// 动画效果相关函数

// 创建星星动画
function createStarAnimation() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    const starCount = CONFIG.KINDERGARTEN.STAR_COUNT;
    
    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            createSingleStar();
        }, i * 200); // 每颗星星间隔200ms
    }
}

// 创建单个星星
function createSingleStar() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '⭐';
    
    // 随机位置
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight / 2);
    
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    
    starsContainer.appendChild(star);
    
    // 移除星星
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, CONFIG.ANIMATION.STAR_DURATION);
}

// 创建彩虹粒子效果
function createRainbowParticles() {
    const particleCount = 20;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle(colors[i % colors.length]);
        }, i * 50);
    }
}

// 创建单个粒子
function createParticle(color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999';
    
    // 随机起始位置
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    // 随机运动方向
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    
    document.body.appendChild(particle);
    
    // 动画
    let x = startX;
    let y = startY;
    let opacity = 1;
    
    const animate = () => {
        x += dx;
        y += dy;
        opacity -= 0.02;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0 && x > -10 && x < window.innerWidth + 10 && y > -10 && y < window.innerHeight + 10) {
            requestAnimationFrame(animate);
        } else {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    };
    
    requestAnimationFrame(animate);
}

// 创建爆炸效果
function createExplosionEffect(x, y) {
    const explosionCount = 15;
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#ff9ff3'];
    
    for (let i = 0; i < explosionCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = colors[i % colors.length];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        // 爆炸动画
        const angle = (i / explosionCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.animate([
            {
                left: x + 'px',
                top: y + 'px',
                opacity: 1,
                transform: 'scale(1)'
            },
            {
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0,
                transform: 'scale(0)'
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// 创建心形动画
function createHeartAnimation() {
    const hearts = ['💖', '💝', '💗', '💓', '💕'];
    const heartCount = 8;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[i % hearts.length];
            heart.style.position = 'fixed';
            heart.style.fontSize = '24px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            
            const x = Math.random() * (window.innerWidth - 50);
            const y = window.innerHeight;
            
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            
            document.body.appendChild(heart);
            
            // 上升动画
            heart.animate([
                {
                    top: y + 'px',
                    opacity: 1,
                    transform: 'scale(1) rotate(0deg)'
                },
                {
                    top: (y - 200) + 'px',
                    opacity: 0,
                    transform: 'scale(1.5) rotate(360deg)'
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            };
        }, i * 100);
    }
}

// 创建彩虹文字效果
function createRainbowText(element, text) {
    if (!element) return;
    
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const letters = text.split('');
    
    element.innerHTML = '';
    
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.color = colors[index % colors.length];
        span.style.display = 'inline-block';
        span.style.animation = `rainbow-bounce 0.6s ease-in-out ${index * 0.1}s`;
        element.appendChild(span);
    });
}

// 添加彩虹弹跳动画的CSS
function addRainbowBounceCSS() {
    if (document.getElementById('rainbow-bounce-style')) return;
    
    const style = document.createElement('style');
    style.id = 'rainbow-bounce-style';
    style.textContent = `
        @keyframes rainbow-bounce {
            0%, 100% {
                transform: translateY(0) scale(1);
            }
            50% {
                transform: translateY(-10px) scale(1.1);
            }
        }
    `;
    document.head.appendChild(style);
}

// 创建烟花效果
function createFireworks() {
    const fireworkCount = 3;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2) + 100;
            createSingleFirework(x, y);
        }, i * 500);
    }
}

// 创建单个烟花
function createSingleFirework(x, y) {
    const sparkCount = 20;
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#ff9ff3', '#54a0ff', '#feca57'];
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '999';
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        
        document.body.appendChild(spark);
        
        // 烟花爆炸动画
        const angle = (i / sparkCount) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        spark.animate([
            {
                left: x + 'px',
                top: y + 'px',
                opacity: 1,
                transform: 'scale(1)'
            },
            {
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0,
                transform: 'scale(0)'
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'ease-out'
        }).onfinish = () => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        };
    }
}

// 创建脉冲效果
function createPulseEffect(element) {
    if (!element) return;
    
    element.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// 添加脉冲动画CSS
function addPulseCSS() {
    if (document.getElementById('pulse-style')) return;
    
    const style = document.createElement('style');
    style.id = 'pulse-style';
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
    `;
    document.head.appendChild(style);
}

// 初始化动画CSS
function initializeAnimationCSS() {
    addRainbowBounceCSS();
    addPulseCSS();
}

// 在页面加载时初始化动画CSS
document.addEventListener('DOMContentLoaded', initializeAnimationCSS);