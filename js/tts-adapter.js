(function(global){
  'use strict';

  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  var isAndroid = /Android/.test(navigator.userAgent);

  // 使用 CONFIG.DEFAULT_SETTINGS（如果存在），否则退回到 DEFAULT_SETTINGS 或默认值
  var settings = ((global.CONFIG && global.CONFIG.DEFAULT_SETTINGS) || global.DEFAULT_SETTINGS || {
    speechRate: 1,
    speechPitch: 1,
    speechVolume: 1,
  });

  var state = {
    enabled: false,
    speaking: false,
    current: null,
    voices: [],
    lastSpeakTime: 0,
  };

  function loadVoices() {
    return new Promise(function(resolve){
      var synth = global.speechSynthesis;
      if (!synth) return resolve([]);
      var voices = synth.getVoices();
      if (voices && voices.length) {
        state.voices = voices;
        return resolve(voices);
      }
      var t = setInterval(function(){
        voices = synth.getVoices();
        if (voices && voices.length) {
          clearInterval(t);
          state.voices = voices;
          resolve(voices);
        }
      }, 150);
      setTimeout(function(){ clearInterval(t); resolve(state.voices || []); }, 4000);
    });
  }

  function pickVoice(lang){
    lang = (lang || '').toLowerCase();
    if (!state.voices || !state.voices.length) return null;
    // 优先匹配完整 lang，其次前缀
    var exact = state.voices.find(function(v){ return (v.lang||'').toLowerCase() === lang; });
    if (exact) return exact;
    var prefix = state.voices.find(function(v){ return (v.lang||'').toLowerCase().startsWith(lang.split('-')[0]); });
    if (prefix) return prefix;
    // 中文优先选择 zh-CN/zh-Hans
    if (lang.startsWith('zh')) {
      var zhVoice = state.voices.find(function(v){ return /zh|cmn|chi/i.test(v.lang) || /Chinese|Zh|中/i.test(v.name); });
      if (zhVoice) return zhVoice;
    }
    // 英语优先 en-US/en-GB
    if (lang.startsWith('en')) {
      var enVoice = state.voices.find(function(v){ return /en/i.test(v.lang); });
      if (enVoice) return enVoice;
    }
    return state.voices[0] || null;
  }

  function guessLangByText(text){
    if (!text) return 'en-US';
    // 简单判断：含中文字符
    if (/\u4e00-\u9fa5/.test(text)) return 'zh-CN';
    // 含有拼音字符或字母
    return 'en-US';
  }

  async function ensureReady(){
    if (!('speechSynthesis' in global)) return false;
    await loadVoices();
    return true;
  }

  async function enable(){
    // 通过一次空的 speak 来激活移动端音频策略（不少浏览器需要手势触发）
    state.enabled = true;
    try {
      var ok = await ensureReady();
      if (!ok) return false;
      var u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      global.speechSynthesis.speak(u);
      return true;
    } catch(e){ return false; }
  }

  function cancel(){
    try { global.speechSynthesis && global.speechSynthesis.cancel(); } catch(e) {}
    state.speaking = false;
    state.current = null;
  }

  function pause(){ try { global.speechSynthesis && global.speechSynthesis.pause(); } catch(e) {} }
  function resume(){ try { global.speechSynthesis && global.speechSynthesis.resume(); } catch(e) {} }
  function isSpeaking(){ return !!(global.speechSynthesis && global.speechSynthesis.speaking); }

  async function speak(text, opts){
    opts = opts || {};
    if (!state.enabled && (isAndroid || isIOS)) {
      // 移动端未启用时直接返回 false，避免报错
      return false;
    }
    var ok = await ensureReady();
    if (!ok) return false;
    cancel();

    // 每次发声时获取最新设置（若提供 getSettings）
    var currentSettings = (typeof global.getSettings === 'function') ? global.getSettings() : settings;

    var lang = (opts.lang) || guessLangByText(text);
    var rate = (typeof opts.rate === 'number' ? opts.rate : (currentSettings.speechRate || 1));
    var pitch = (typeof opts.pitch === 'number' ? opts.pitch : (currentSettings.speechPitch || 1));
    var volume = (typeof opts.volume === 'number' ? opts.volume : (currentSettings.speechVolume || 1));

    var voice = pickVoice(lang);
    var utter = new SpeechSynthesisUtterance(String(text || ''));
    utter.lang = voice ? voice.lang : lang;
    if (voice) utter.voice = voice;
    utter.rate = rate;
    utter.pitch = pitch;
    utter.volume = volume;

    return new Promise(function(resolve){
      utter.onstart = function(){ state.speaking = true; state.current = utter; };
      utter.onend = function(){ state.speaking = false; state.current = null; resolve(true); };
      utter.onerror = function(){ state.speaking = false; state.current = null; resolve(false); };
      try {
        global.speechSynthesis.speak(utter);
      } catch(e){ resolve(false); }
    });
  }

  // 预留 Capacitor 原生 TTS 接口位置（如果后续加入，可在此切换实现）
  // if (global.Capacitor && global.Capacitor.isNativePlatform) {
  //   // 可在此处优先调用 @capacitor-community/text-to-speech
  // }

  global.TTS = {
    enable: enable,
    speak: speak,
    cancel: cancel,
    pause: pause,
    resume: resume,
    isSpeaking: isSpeaking,
    _loadVoices: loadVoices, // 测试辅助
    _pickVoice: pickVoice,
  };
})(window);