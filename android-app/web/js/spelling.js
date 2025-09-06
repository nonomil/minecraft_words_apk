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

  // 本地占位 emoji 资源（最后兜底）
  const localEmojis = ['css/emoji-smile.svg','css/emoji-heart.svg','css/emoji-star.svg','css/emoji-sparkle.svg'];
  const pickLocalEmoji = () => localEmojis[Math.floor(Math.random()*localEmojis.length)];

  // 在线 emoji 资源（优先于本地）
  const onlineEmojis = [
    'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f60a.svg', // 😊
    'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2b50.svg',   // ⭐
    'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2728.svg',  // ✨
    'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f389.svg'  // 🎉
  ];
  const pickOnlineEmoji = () => onlineEmojis[Math.floor(Math.random()*onlineEmojis.length)];

  const setClickToOpen = (url)=>{
    img.style.cursor = url ? 'pointer' : '';
    if (!url) { img.onclick = null; return; }
    img.onclick = async ()=>{
      const targetUrl = url;
      try {
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser) {
          await window.Capacitor.Plugins.Browser.open({ url: targetUrl });
          return;
        }
      } catch(e){}
      try { window.open(targetUrl, (/(Android)/i.test(navigator.userAgent)) ? '_system' : '_blank'); } catch(e){}
    };
  };

  const original = (word.standardized || word.word || '').trim();
  const keywords = encodeURIComponent(original.replace(/[^A-Za-z\s]/g, ' ').trim() || 'education');
  const unsplashUrl = `https://source.unsplash.com/featured/800x600/?${keywords}`;
  const loremUrl = `https://loremflickr.com/800/600/${keywords}?random=${Date.now()%100000}`;

  // 兜底链：自带图片 -> Unsplash -> loremflickr -> 在线emoji -> 本地emoji
  const useLocalEmoji = () => {
    const u = pickLocalEmoji();
    img.onerror = null;
    img.onload = null;
    img.src = u;
    setClickToOpen(null);
  };
  const useOnlineEmoji = () => {
    const u = pickOnlineEmoji();
    img.onerror = useLocalEmoji;
    img.onload = () => setClickToOpen(u);
    img.src = u;
  };
  const useLorem = () => {
    img.onerror = useOnlineEmoji;
    img.onload = () => setClickToOpen(loremUrl);
    img.src = loremUrl;
  };
  const useUnsplash = () => {
    img.onerror = useLorem;
    img.onload = () => setClickToOpen(unsplashUrl);
    img.src = unsplashUrl;
  };

  // 首选：使用单词自带图片（若存在）
  if (word.imageURLs && word.imageURLs.length>0) {
    const raw = word.imageURLs[0];
    try {
      convertToDirectImageUrl(raw.url, raw.filename)
        .then(u=>{
          img.onerror = useUnsplash; // 若加载失败，继续兜底
          img.onload = () => setClickToOpen(raw.url||u);
          img.src = u;
        })
        .catch(()=>{ useUnsplash(); });
    } catch(e){ useUnsplash(); }
  } else {
    useUnsplash();
  }
}

// 生成拼写交互：输入框 + 提交按钮 + 显示提示
function generateSpellingTask(word){
  const ctn = document.getElementById('quizOptions');
  if(!ctn) return; ctn.innerHTML = '';
  const original = (word.standardized || word.word || '').trim();
  const lettersOnly = original.replace(/[^A-Za-z]/g,'');

  // 拼写子模式（spell）：显示 mask + 第二框直接显示单词且只读
  if (typeof spellingSubmode !== 'undefined' ? spellingSubmode==='spell' : true) {
    const maskEl = document.createElement('div');
    maskEl.className='spelling-mask'; maskEl.id='spellingMask';
    maskEl.textContent = '_'.repeat(lettersOnly.length);

    const input = document.createElement('input');
    input.type='text'; input.id='spellingInput'; input.className='spelling-input';
    input.value = original; input.autocomplete='off'; input.spellcheck=false; input.readOnly=true;
    input.style.display='block'; input.style.margin='6px auto'; input.style.maxWidth='640px'; input.style.width='72%';

    const undoBtn = document.createElement('button'); undoBtn.type='button'; undoBtn.className='control-btn'; undoBtn.textContent='⬅️ 回退';
    const submitBtn = document.createElement('button'); submitBtn.className='control-btn'; submitBtn.textContent='提交答案'; submitBtn.disabled=true;

    const helper = document.createElement('div'); helper.style.color='#666'; helper.style.marginTop='8px'; helper.textContent='提示：点击下面字母按顺序完成拼写；支持回退；按 Enter 也可提交';

    const pool = shuffleArray(lettersOnly.split(''));
    const letterGroup = document.createElement('div'); letterGroup.className='spell-choice-group';
    const typed=[]; const usedButtons=[];
    const tryAutoSubmit=()=>{ const cur=typed.join(''); if(cur.length===lettersOnly.length && normalizeWord(cur)===normalizeWord(original)){ submitSpelling(word, cur); } };

    pool.forEach(ch=>{ const btn=document.createElement('button'); btn.type='button'; btn.className='spell-choice'; btn.textContent=ch.toLowerCase(); btn.onclick=()=>{ if(typed.length>=lettersOnly.length) return; typed.push(ch); usedButtons.push(btn); btn.disabled=true; btn.style.opacity=0.6; const cur=typed.join(''); maskEl.textContent = cur + '_'.repeat(lettersOnly.length-cur.length); submitBtn.disabled=(typed.length!==lettersOnly.length); tryAutoSubmit(); }; letterGroup.appendChild(btn); });

    undoBtn.onclick=()=>{ if(!typed.length) return; const last=usedButtons.pop(); typed.pop(); if(last){ last.disabled=false; last.style.opacity=''; } const cur=typed.join(''); maskEl.textContent = cur + '_'.repeat(lettersOnly.length-cur.length); submitBtn.disabled=true; };
    submitBtn.onclick=()=>submitSpelling(word, typed.join(''));

    const controls=document.createElement('div'); controls.style.display='flex'; controls.style.gap='8px'; controls.style.marginTop='8px'; controls.style.flexWrap='wrap'; controls.style.justifyContent='center'; controls.appendChild(undoBtn); controls.appendChild(submitBtn);

    ctn.appendChild(maskEl); ctn.appendChild(input); ctn.appendChild(controls); ctn.appendChild(letterGroup); ctn.appendChild(helper);
    setTimeout(()=>{ try{ document.getElementById('spellingMask').scrollIntoView({block:'center', behavior:'smooth'}); }catch(e){} }, 50);
    input.onkeydown=(e)=>{ if(e.key==='Enter' && !submitBtn.disabled){ submitSpelling(word, typed.join('')); } };
    return;
  }

  // 补全子模式（fill）
  const needBlanks = lettersOnly.length >= 5 ? 2 : 1;
  const positions = (function chooseBlankPositions(originalStr, need){ const letterIdx=[]; for(let i=0;i<originalStr.length;i++){ if(/[A-Za-z]/.test(originalStr[i])) letterIdx.push(i); } if(letterIdx.length===0) return []; let candidates=letterIdx.slice(1,-1); if(candidates.length<need) candidates=letterIdx.slice(); const picked=[]; const pool=shuffleArray(candidates.slice()); while(picked.length<need && pool.length){ const p=pool.shift(); if(!picked.includes(p)) picked.push(p); } picked.sort((a,b)=>a-b); return picked; })(original, needBlanks);

  const maskEl=document.createElement('div'); maskEl.className='spelling-mask'; maskEl.id='spellingMask';
  const buildMaskedWord=(ori, blanks, selected)=>{ const map=new Map(); blanks.forEach((pos,idx)=>map.set(pos, idx)); const chars=ori.split(''); for(let i=0;i<chars.length;i++){ const idx=map.get(i); if(idx===undefined) continue; const sel=selected[idx]; chars[i]= sel ? sel.toLowerCase() : '_'; } return chars.join(''); };
  maskEl.textContent = buildMaskedWord(original, positions, []);

  const input = document.createElement('input'); input.type='text'; input.id='spellingInput'; input.className='spelling-input'; input.placeholder='点击下面字母补齐空缺…'; input.autocomplete='off'; input.spellcheck=false; input.readOnly=true; input.style.display='block'; input.style.margin='6px auto'; input.style.maxWidth='640px'; input.style.width='72%';

  const undoBtn=document.createElement('button'); undoBtn.type='button'; undoBtn.className='control-btn'; undoBtn.textContent='⬅️ 回退';
  const submitBtn=document.createElement('button'); submitBtn.className='control-btn'; submitBtn.textContent='提交答案'; submitBtn.disabled=true; submitBtn.onclick=()=>submitSpelling(word);

  const helper=document.createElement('div'); helper.style.color='#666'; helper.style.marginTop='8px'; helper.textContent='提示：点击字母按顺序补空，支持回退；按 Enter 也可提交';

  const requiredLetters = positions.map(i=>original[i]);
  const distractors = (function buildDistractorLetters(requiredLetters, ori){ const letters='abcdefghijklmnopqrstuvwxyz'.split(''); const reqSet=new Set(requiredLetters.map(c=>c.toLowerCase())); const candidates=letters.filter(ch=>!reqSet.has(ch)); const need=Math.min(6, Math.max(1, requiredLetters.length)); const distractors=[]; const shuffled=shuffleArray(candidates); while(distractors.length<need && shuffled.length){ distractors.push(shuffled.shift()); } return distractors; })(requiredLetters, original);
  const pool=shuffleArray([...requiredLetters, ...distractors]);

  const letterGroup=document.createElement('div'); letterGroup.className='spell-choice-group';
  const selected=[];

  pool.forEach(ch=>{ const btn=document.createElement('button'); btn.type='button'; btn.className='spell-choice'; btn.textContent=ch.toLowerCase(); btn.onclick=()=>{
    if (selected.length >= positions.length) return;
    selected.push(ch);
    btn.disabled = true; btn.style.opacity=0.6;
    // 依据当前已选字母，构建显示串
    const filled = buildMaskedWord(original, positions, selected);
    maskEl.textContent = filled;
    // 输入框保存“去掉下划线后的字符串”，在填满时即为完整单词
    input.value = filled.replace(/_/g, '');
    if (selected.length === positions.length) {
      submitBtn.disabled = false;
      // 补全模式：若补全后与正确答案相同，则自动提交并切题
      try {
        const normalizedCandidate = normalizeWord(input.value);
        const normalizedCorrect = normalizeWord(original);
        if (normalizedCandidate && normalizedCandidate === normalizedCorrect) {
          submitSpelling(word, input.value);
        }
      } catch(e){}
    }
  };
  letterGroup.appendChild(btn);
  });

  undoBtn.onclick=()=>{ if(!selected.length) return; selected.pop(); const filled=buildMaskedWord(original, positions, selected); input.value=filled.replace(/_/g,''); maskEl.textContent=filled; submitBtn.disabled=true; const buttons=letterGroup.querySelectorAll('button'); for(let i=buttons.length-1;i>=0;i--){ if(buttons[i].disabled){ buttons[i].disabled=false; buttons[i].style.opacity=''; break; } } };

  const controls=document.createElement('div'); controls.style.display='flex'; controls.style.gap='8px'; controls.style.marginTop='8px'; controls.style.flexWrap='wrap'; controls.style.justifyContent='center'; controls.appendChild(undoBtn); controls.appendChild(submitBtn);

  ctn.appendChild(maskEl); ctn.appendChild(input); ctn.appendChild(controls); ctn.appendChild(letterGroup); ctn.appendChild(helper);
  setTimeout(()=>{ try{ document.getElementById('spellingMask').scrollIntoView({block:'center', behavior:'smooth'}); }catch(e){} }, 50);
  input.onkeydown=(e)=>{ if(e.key==='Enter' && !submitBtn.disabled){ submitSpelling(word); } };
}

function normalizeWord(s){ return (s||'').toLowerCase().replace(/\s+/g,'').replace(/-/g,''); }

async function submitSpelling(word, answerOverride){
  if (quizAnswered) return;
  const el=document.getElementById('spellingInput');
  const resultEl=document.getElementById('quizResult');
  const nextBtn=document.getElementById('nextQuizBtn');
  const answer = normalizeWord(answerOverride != null ? String(answerOverride) : (el ? el.value : ''));
  const correct = normalizeWord(word.standardized || word.word || '');
  try{ if(window.TTS && (answerOverride || (el && el.value))){ const s=getSettings(); await TTS.speak(answerOverride || (el?el.value:''), { lang:'en-US', rate: Math.max(0.7, s.speechRate*0.9), pitch:s.speechPitch, volume:s.speechVolume }); } }catch(e){}
  quizAnswered=true; if(!resultEl) return; resultEl.style.display='block';
  if(answer && correct && answer===correct){ quizScore++; resultEl.textContent='✅ 回答正确！'; resultEl.className='learn-result correct'; try{ createStarAnimation(); }catch(e){} try{ if(getSettings().kindergartenMode){ awardDiamond(); } }catch(e){} } else { const show=word.standardized||word.word||''; resultEl.textContent=`❌ 回答错误！正确答案是：${show}`; resultEl.className='learn-result wrong'; }
  if(nextBtn) nextBtn.disabled=false; updateQuizScore(); updateQuizStats(); setTimeout(()=>{ nextQuiz(); }, 1200);
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