// 拼写模式（最简可用版）：输入英文拼写并判定正确/错误

// 仅本模块内部状态（其余使用 config.js 中的全局变量）
let currentQuizAudioLang = 'zh'; // 交替播放：中文->英文

function startQuiz() {
  if (!Array.isArray(currentVocabulary) || currentVocabulary.length === 0) {
    showNotification && showNotification('请先加载词库', 'error');
    return;
  }
  const count = parseInt(getSettings().quizCount || 10);
  quizWords = getRandomElements(currentVocabulary, Math.min(count, currentVocabulary.length));
  currentQuizIndex = 0;
  quizScore = 0;
  updateQuizDisplay();
  updateQuizGroupDisplay();
  updateQuizStats();
  updateQuizProgressBar();
}

function updateQuizDisplay() {
  if (currentQuizIndex >= quizWords.length) { showQuizResults(); return; }
  const word = quizWords[currentQuizIndex];
  quizAnswered = false;
  currentQuizAudioLang = 'zh';

  // 题干（中文提示，要求拼写英文）
  const qTitle = document.querySelector('.quiz-question h3');
  if (qTitle) {
    const cn = (word.chinese || '').trim();
    qTitle.textContent = cn ? `请拼写：${cn} 的英文` : '请根据发音拼写英文';
  }
  updateQuizImage(word);
  generateSpellingTask(word);
  updateQuizScore();
  updateQuizGroupDisplay();
  updateQuizStats();
  updateQuizProgressBar();
  const nextBtn = document.getElementById('nextQuizBtn');
  if (nextBtn) nextBtn.disabled = true;
  updateQuizAudioButton();
  setTimeout(() => { try{ playQuizAudio(); }catch(e){} }, 400);
}

function updateQuizImage(word){
  const img = document.getElementById('quizImage');
  if(!img) return;
  if (word.imageURLs && word.imageURLs.length>0) {
    convertToDirectImageUrl(word.imageURLs[0].url, word.imageURLs[0].filename)
      .then(u=>{ img.src=u; })
      .catch(()=>{ img.src=createPlaceholderImage('图片无法加载'); });
    img.onerror=()=>{ img.src=createPlaceholderImage('图片无法加载'); };
  } else {
    img.src = createPlaceholderImage('暂无图片');
  }
}

// 生成拼写交互：输入框 + 提交按钮 + 显示提示
function generateSpellingTask(word){
  const ctn = document.getElementById('quizOptions');
  if(!ctn) return;
  ctn.innerHTML = '';

  // 目标英文
  const original = (word.standardized || word.word || '').trim();
  const lettersOnly = original.replace(/[^A-Za-z]/g,'');
  const needBlanks = lettersOnly.length >= 5 ? 2 : 1; // 3字母挖1个；5字母挖2个，4字母仍挖1个

  // 选择挖空位置（避开首尾和非字母）
  const positions = chooseBlankPositions(original, needBlanks);

  // 显示被挖空的单词（如下划线），并可动态填入
  const maskEl = document.createElement('div');
  maskEl.className = 'spelling-mask';
  maskEl.id = 'spellingMask';
  maskEl.textContent = buildMaskedWord(original, positions, []);

  // 只读输入框：用于 submitSpelling 读取最终答案
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'spellingInput';
  input.className = 'spelling-input';
  input.placeholder = '点击下面字母补齐空缺…';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.readOnly = true;

  // 回退按钮
  const undoBtn = document.createElement('button');
  undoBtn.type = 'button';
  undoBtn.className = 'control-btn';
  undoBtn.textContent = '⬅️ 回退';

  // 提交按钮
  const submitBtn = document.createElement('button');
  submitBtn.className = 'control-btn';
  submitBtn.textContent = '提交答案';
  submitBtn.disabled = true;
  submitBtn.onclick = () => submitSpelling(word);

  // 说明
  const helper = document.createElement('div');
  helper.style.color = '#666';
  helper.style.marginTop = '8px';
  helper.textContent = '提示：点击字母按顺序补空，支持回退；按 Enter 也可提交';

  // 渲染字母按钮（必需字母 + 干扰字母）
  const requiredLetters = positions.map(i => original[i]);
  const distractors = buildDistractorLetters(requiredLetters, original);
  const pool = shuffleArray([...requiredLetters, ...distractors]);

  const letterGroup = document.createElement('div');
  letterGroup.className = 'spell-choice-group';

  // 填字状态
  const filled = [];
  const needed = requiredLetters.slice(); // 剩余需求（可能存在重复字母）

  pool.forEach(ch => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'spell-choice';
    btn.textContent = ch.toLowerCase();

    // 统计该字母在需求中的数量
    const needCount = needed.filter(x => x.toLowerCase()===ch.toLowerCase()).length;
    let used = 0;

    btn.onclick = () => {
      // 若该字母已用尽或已填满，则不处理
      const remaining = needed.filter(x => x.toLowerCase()===ch.toLowerCase()).length;
      if (remaining <= 0) return;

      // 填入下一个空位
      const idx = nextBlankIndex(positions, filled);
      if (idx === -1) return;
      filled.push({ pos: positions[idx], ch });
      // 从 needed 中移除一个该字母
      const rmIndex = needed.findIndex(x => x.toLowerCase()===ch.toLowerCase());
      if (rmIndex>-1) needed.splice(rmIndex,1);

      // 更新展示与输入值
      maskEl.textContent = buildMaskedWord(original, positions, filled);
      input.value = composeFullWord(original, positions, filled);

      used++;
      if (used >= needCount) { btn.disabled = true; btn.style.opacity = 0.6; }

      // 已填完所有空，则允许提交
      if (needed.length === 0) submitBtn.disabled = false;
    };

    letterGroup.appendChild(btn);
  });

  undoBtn.onclick = () => {
    if (!filled.length) return;
    const last = filled.pop();
    needed.push(original[last.pos]); // 归还需求
    // 重新启用相应字母按钮一次（找到第一个文本相同且disabled的按钮）
    const btns = letterGroup.querySelectorAll('.spell-choice');
    for (const b of btns) {
      if (b.textContent.toLowerCase() === last.ch.toLowerCase() && b.disabled) { b.disabled = false; b.style.opacity = ''; break; }
    }
    maskEl.textContent = buildMaskedWord(original, positions, filled);
    input.value = composeFullWord(original, positions, filled);
    submitBtn.disabled = true; // 撤回后需重新填完才能提交
  };

  // 装配到容器
  ctn.appendChild(maskEl);
  ctn.appendChild(input);
  const controls = document.createElement('div');
  controls.style.display = 'flex';
  controls.style.gap = '8px';
  controls.style.marginTop = '8px';
  controls.style.flexWrap = 'wrap';
  controls.style.justifyContent = 'center';
  controls.appendChild(undoBtn);
  controls.appendChild(submitBtn);
  ctn.appendChild(controls);
  ctn.appendChild(letterGroup);
  ctn.appendChild(helper);

  setTimeout(()=>{ try{ document.getElementById('spellingMask').scrollIntoView({block:'center', behavior:'smooth'}); }catch(e){} }, 50);
  input.onkeydown = (e)=>{ if(e.key==='Enter' && !submitBtn.disabled){ submitSpelling(word); } };

  // 内部工具
  function chooseBlankPositions(str, count){
    const validIdx=[];
    for(let i=0;i<str.length;i++){
      const ch=str[i];
      if(/[A-Za-z]/.test(ch) && i>0 && i<str.length-1) validIdx.push(i);
    }
    if(validIdx.length===0){ return [Math.max(1, Math.floor(str.length/2))]; }
    const k=Math.min(count, validIdx.length);
    return shuffleArray(validIdx).slice(0,k).sort((a,b)=>a-b);
  }
  function buildMaskedWord(str, blanks, filledPairs){
    const set = new Map(); filledPairs.forEach(p=>set.set(p.pos, p.ch));
    let out='';
    for(let i=0;i<str.length;i++){
      if(blanks.includes(i)){
        out += set.has(i) ? set.get(i) : '_';
      } else {
        out += str[i];
      }
    }
    return out;
  }
  function composeFullWord(str, blanks, filledPairs){
    const set = new Map(); filledPairs.forEach(p=>set.set(p.pos, p.ch));
    let chars=str.split('');
    blanks.forEach(idx=>{ if(set.has(idx)) chars[idx]=set.get(idx); });
    return chars.join('');
  }
  function nextBlankIndex(blanks, filledPairs){
    const filledPositions = new Set(filledPairs.map(p=>p.pos));
    for(let i=0;i<blanks.length;i++){ if(!filledPositions.has(blanks[i])) return i; }
    return -1;
  }
  function buildDistractorLetters(required, originalStr){
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const reqLower = required.map(c=>c.toLowerCase());
    const forbid = new Set(reqLower);
    // 也避免大量重复字母（尽量不与原词相邻字母相同）
    const distractPool = alphabet.filter(ch=>!forbid.has(ch));
    const need = required.length===1 ? 2 : 3; // 方案B：加入干扰字母
    return getRandomElements(distractPool, need);
  }
}

function normalizeWord(s){ return (s||'').toLowerCase().replace(/\s+/g,'').replace(/-/g,''); }

async function submitSpelling(word){
  if (quizAnswered) return;
  const el = document.getElementById('spellingInput');
  const resultEl = document.getElementById('quizResult');
  const nextBtn = document.getElementById('nextQuizBtn');
  const answer = normalizeWord(el ? el.value : '');
  const correct = normalizeWord(word.standardized || word.word || '');

  // 发音被提交的文本（英文）
  try {
    if (window.TTS && answer) {
      const s = getSettings();
      await TTS.speak(el.value, { lang:'en-US', rate: Math.max(0.7, s.speechRate*0.9), pitch:s.speechPitch, volume:s.speechVolume });
    }
  } catch(e){}

  quizAnswered = true;
  if (!resultEl) return;
  resultEl.style.display = 'block';

  if (answer && correct && answer === correct) {
    quizScore++;
    resultEl.textContent = '✅ 回答正确！';
    resultEl.className = 'learn-result correct';
    try{ createStarAnimation(); }catch(e){}
    try{ if(getSettings().kindergartenMode){ awardDiamond(); } }catch(e){}
  } else {
    const show = word.standardized || word.word || '';
    resultEl.textContent = `❌ 回答错误！正确答案是：${show}`;
    resultEl.className = 'learn-result wrong';
  }

  if (nextBtn) nextBtn.disabled = false;
  updateQuizScore();
  updateQuizStats();
  setTimeout(()=>{ nextQuiz(); }, 1200);
}

function updateQuizScore(){
  const t = document.getElementById('quizTotal');
  const s = document.getElementById('quizScore');
  const a = document.getElementById('quizAccuracy');
  if (s) s.textContent = quizScore;
  if (t) t.textContent = currentQuizIndex + (quizAnswered?1:0);
  if (a) {
    const total = currentQuizIndex + (quizAnswered?1:0);
    a.textContent = total>0 ? Math.round((quizScore/total)*100)+'%' : '0%';
  }
}

function nextQuiz(){ currentQuizIndex++; updateQuizDisplay(); }

function playQuizAudio(){
  if (!quizWords.length || currentQuizIndex>=quizWords.length) return;
  const w = quizWords[currentQuizIndex];
  if (currentQuizAudioLang==='zh') playQuizChinese(w); else playQuizEnglish(w);
  currentQuizAudioLang = currentQuizAudioLang==='zh' ? 'en' : 'zh';
  updateQuizAudioButton();
}

function playQuizChinese(w){
  const txt = (w.chinese||'').trim(); if(!txt) return; const s=getSettings();
  if (window.TTS) TTS.speak(txt,{lang:'zh-CN', rate:Math.max(0.85,s.speechRate*0.95), pitch:s.speechPitch, volume:s.speechVolume});
}
function playQuizEnglish(w){
  const txt = (w.standardized||w.word||'').trim(); if(!txt) return; const s=getSettings();
  if (window.TTS) TTS.speak(txt,{lang:'en-US', rate:Math.max(0.6,s.speechRate*0.8), pitch:s.speechPitch, volume:s.speechVolume});
}

function updateQuizAudioButton(){
  const btn = document.querySelector('#quizMode .control-btn.play');
  if(!btn) return; if(currentQuizAudioLang==='zh'){ btn.innerHTML='🔊 听中文'; btn.title='点击播放中文发音'; } else { btn.innerHTML='🔊 听英文'; btn.title='点击播放英文发音'; }
}

function updateQuizGroupDisplay(){
  if(!getSettings().kindergartenMode) return;
  const n = CONFIG.KINDERGARTEN.WORDS_PER_GROUP;
  const cg = Math.floor(currentQuizIndex / n) + 1;
  const gp = (currentQuizIndex % n) + 1;
  const e1 = document.getElementById('currentQuizGroup');
  const e2 = document.getElementById('quizGroupProgress');
  const fill = document.getElementById('quizGroupProgressFill');
  if(e1) e1.textContent = cg; if(e2) e2.textContent = gp; if(fill) fill.style.width = (gp/n*100)+'%';
}

function updateQuizStats(){
  const i=document.getElementById('currentQuizIndex');
  const total=document.getElementById('totalQuizWords');
  const correct=document.getElementById('correctCount');
  if(i) i.textContent = currentQuizIndex+1;
  if(total) total.textContent = quizWords.length;
  if(correct) correct.textContent = quizScore;
}

function updateQuizProgressBar(){
  const fill = document.getElementById('quizProgressFill');
  if(fill && quizWords.length>0) fill.style.width = (((currentQuizIndex+1)/quizWords.length)*100)+'%';
}

function showQuizResults(){
  const acc = Math.round((quizScore/quizWords.length)*100);
  const emoji = acc>=90?'🏆': acc>=70?'✨': acc>=60?'🙂':'💪';
  if(getSettings().kindergartenMode){ try{ if(acc>=80) { createFireworks(); createHeartAnimation(); } else if(acc>=60){ createRainbowParticles && createRainbowParticles(); } }catch(e){}
    showAchievement && showAchievement(`${emoji} 测试完成！\n得分：${quizScore}/${quizWords.length}\n正确率：${acc}%`);
  } else { alert(`测试完成！\n得分：${quizScore}/${quizWords.length}\n正确率：${acc}%`); }
  saveQuizResult(quizScore, quizWords.length, acc);
}

function restartQuiz(){ if(!currentVocabulary.length){ showNotification('请先加载词库','error'); return;} startQuiz(); }

function saveQuizResult(score,total,accuracy){
  const lt=(()=>{ try{return (typeof learnType!=='undefined')?learnType:(localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE)||'word');}catch(e){return 'word';} })();
  const key=(lt==='word'||lt==='word_zh')?CONFIG.STORAGE_KEYS.PROGRESS:CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
  const saved=localStorage.getItem(key)||localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
  const p=saved?JSON.parse(saved):{}; p.quizResults=p.quizResults||[];
  p.quizResults.push({date:new Date().toISOString(),score,total,accuracy,vocabulary:document.getElementById('vocabSelect').value,learnType:lt});
  if(p.quizResults.length>50) p.quizResults=p.quizResults.slice(-50);
  localStorage.setItem(key, JSON.stringify(p));
}

function getQuizStats(){
  const lt=(()=>{ try{return (typeof learnType!=='undefined')?learnType:(localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE)||'word');}catch(e){return 'word';} })();
  const key=(lt==='word'||lt==='word_zh')?CONFIG.STORAGE_KEYS.PROGRESS:CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
  const saved=localStorage.getItem(key)||localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS); if(!saved) return null;
  const p=JSON.parse(saved); const rs=p.quizResults||[]; if(!rs.length) return null;
  const totalTests=rs.length; const totalScore=rs.reduce((s,r)=>s+r.score,0); const totalQuestions=rs.reduce((s,r)=>s+r.total,0);
  const avg=Math.round(rs.reduce((s,r)=>s+r.accuracy,0)/totalTests); const recent=rs.slice(-10); const recentAcc=Math.round(recent.reduce((s,r)=>s+r.accuracy,0)/recent.length);
  return { totalTests, totalScore, totalQuestions, averageAccuracy:avg, recentAccuracy:recentAcc, bestScore: Math.max(...rs.map(r=>r.accuracy)), lastTestDate: rs[rs.length-1].date };
}

function exportQuizData(){ const st=getQuizStats(); if(!st){ showNotification('请先加载词库','error'); return;} const lt=(()=>{ try{return (typeof learnType!=='undefined')?learnType:(localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE)||'word');}catch(e){return 'word';} })(); const key=(lt==='word'||lt==='word_zh')?CONFIG.STORAGE_KEYS.PROGRESS:CONFIG.STORAGE_KEYS.PROGRESS_PHRASE; const saved=localStorage.getItem(key)||localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS); const p=JSON.parse(saved); const data={learnType:lt, stats:st, results:p.quizResults, exportDate:new Date().toISOString(), version:'1.1'}; const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`quiz_data_${lt}_${getCurrentDateString()}.json`; a.click(); URL.revokeObjectURL(url); showNotification('测试数据已导出'); }