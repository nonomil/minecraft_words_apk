(function (global) {
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
    return new Promise(function (resolve) {
      var synth = global.speechSynthesis;
      if (!synth) return resolve([]);
      var voices = synth.getVoices();
      if (voices && voices.length) {
        state.voices = voices;
        return resolve(voices);
      }
      var t = setInterval(function () {
        voices = synth.getVoices();
        if (voices && voices.length) {
          clearInterval(t);
          state.voices = voices;
          resolve(voices);
        }
      }, 150);
      setTimeout(function () { clearInterval(t); resolve(state.voices || []); }, 4000);
    });
  }

  function pickVoice(lang) {
    lang = (lang || '').toLowerCase();
    if (!state.voices || !state.voices.length) return null;
    // 优先匹配完整 lang，其次前缀
    var exact = state.voices.find(function (v) { return (v.lang || '').toLowerCase() === lang; });
    if (exact) return exact;
    var prefix = state.voices.find(function (v) { return (v.lang || '').toLowerCase().startsWith(lang.split('-')[0]); });
    if (prefix) return prefix;
    // 中文优先选择 zh-CN/zh-Hans
    if (lang.startsWith('zh')) {
      var zhVoice = state.voices.find(function (v) { return /zh|cmn|chi/i.test(v.lang) || /Chinese|Zh|中/i.test(v.name); });
      if (zhVoice) return zhVoice;
    }
    // 英语优先 en-US/en-GB
    if (lang.startsWith('en')) {
      var enVoice = state.voices.find(function (v) { return /en/i.test(v.lang); });
      if (enVoice) return enVoice;
    }
    return state.voices[0] || null;
  }

  function guessLangByText(text) {
    if (!text) return 'en-US';
    // 简单判断：含中文字符
    if (/\u4e00-\u9fa5/.test(text)) return 'zh-CN';
    // 含有拼音字符或字母
    return 'en-US';
  }

  async function ensureReady() {
    if (!('speechSynthesis' in global)) return false;
    await loadVoices();
    return true;
  }

  async function enable() {
    // 通过一次空的 speak 来激活移动端音频策略（不少浏览器需要手势触发）
    state.enabled = true;
    try {
      var ok = await ensureReady();
      if (!ok) return false;
      var u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      global.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function cancel() {
    try { global.speechSynthesis && global.speechSynthesis.cancel(); } catch (e) { }
    state.speaking = false;
    state.current = null;
  }

  function pause() { try { global.speechSynthesis && global.speechSynthesis.pause(); } catch (e) { } }
  function resume() { try { global.speechSynthesis && global.speechSynthesis.resume(); } catch (e) { } }
  function isSpeaking() { return !!(global.speechSynthesis && global.speechSynthesis.speaking); }

  async function speak(text, opts) {
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

    return new Promise(function (resolve) {
      utter.onstart = function () { state.speaking = true; state.current = utter; };
      utter.onend = function () { state.speaking = false; state.current = null; resolve(true); };
      utter.onerror = function () { state.speaking = false; state.current = null; resolve(false); };
      try {
        global.speechSynthesis.speak(utter);
      } catch (e) { resolve(false); }
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
(function (global) {
  'use strict';

  // 简单防抖：避免在快速连续调用时重复 speak
  var lastSpeakAt = 0;
  var SPEAK_COOLDOWN_MS = 50; // 降低冷却时间，避免阻止正常的自动发音

  // 兼容读取设置
  function getSettingsSafe() {
    try {
      if (typeof getSettings === 'function') return getSettings();
      if (global.CONFIG && global.CONFIG.DEFAULT_SETTINGS) return global.CONFIG.DEFAULT_SETTINGS;
    } catch (e) { }
    return {
      speechRate: 1,
      speechPitch: 1,
      speechVolume: 1,
      enableTTS: true,
    };
  }

  // 判断是否处于 Capacitor 原生环境且安装了 TextToSpeech 插件
  function isNativeTTSAvailable() {
    try {
      var Cap = global.Capacitor;
      if (!Cap || typeof Cap.isNativePlatform !== 'function') return false;
      if (!Cap.isNativePlatform()) return false;
      var plugins = (Cap.Plugins || {});
      return !!plugins.TextToSpeech;
    } catch (e) { return false; }
  }

  function getNativeTTS() {
    try {
      return global.Capacitor && global.Capacitor.Plugins && global.Capacitor.Plugins.TextToSpeech;
    } catch (e) { return null; }
  }

  // Web Speech 相关（作为回退）
  var synth = global.speechSynthesis;

  function cancelWebSpeech() { try { synth && synth.cancel(); } catch (e) { } }
  function pauseWebSpeech() { try { synth && synth.pause(); } catch (e) { } }
  function resumeWebSpeech() { try { synth && synth.resume(); } catch (e) { } }
  function isSpeakingWebSpeech() { return !!(synth && synth.speaking); }

  // 语言猜测：简单基于字符范围
  function guessLang(text) {
    if (!text) return 'en-US';
    var hasCJK = /[\u4e00-\u9fa5]/.test(text);
    return hasCJK ? 'zh-CN' : 'en-US';
  }

  // 主体 API
  var TTS = {
    enable: function () {
      // 对于 WebSpeech：通过一次空发声“解锁”音频上下文；对于原生无需特殊处理
      try {
        if (isNativeTTSAvailable()) {
          return Promise.resolve(true);
        }
        if (!('speechSynthesis' in global)) return Promise.resolve(false);
        var u = new SpeechSynthesisUtterance('');
        synth && synth.speak(u);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.resolve(false);
      }
    },

    speak: function (text, opts) {
      var now = Date.now();
      if (now - lastSpeakAt < SPEAK_COOLDOWN_MS) {
        // 冷却期内丢弃，避免抖动
        return Promise.resolve(false);
      }
      lastSpeakAt = now;

      var settings = getSettingsSafe();
      if (settings && settings.enableTTS === false) return Promise.resolve(false);

      var lang = (opts && opts.lang) || guessLang(text);
      var rate = (opts && opts.rate) || settings.speechRate || 1;
      var pitch = (opts && opts.pitch) || settings.speechPitch || 1;
      var volume = (opts && opts.volume) || settings.speechVolume || 1;

      // 优先使用原生 TTS
      if (isNativeTTSAvailable()) {
        var nativeTTS = getNativeTTS();
        if (nativeTTS && typeof nativeTTS.speak === 'function') {
          // @capacitor-community/text-to-speech 接口：speak({ text, lang, rate, pitch, volume, category? })
          return nativeTTS.speak({ text: String(text || ''), lang: lang, rate: rate, pitch: pitch, volume: volume })
            .then(function () { return true; })
            .catch(function (err) { console.warn('[TTS] native speak failed, fallback to web', err); return TTS._speakWeb(text, { lang, rate, pitch, volume }); });
        }
      }

      // 回退至 Web Speech
      return TTS._speakWeb(text, { lang: lang, rate: rate, pitch: pitch, volume: volume });
    },

    _speakWeb: function (text, opts) {
      try {
        cancelWebSpeech(); // 先停止之前的发音，减少叠音
        var utter = new SpeechSynthesisUtterance(String(text || ''));
        utter.lang = opts.lang || guessLang(text);
        utter.rate = Math.max(0.1, Math.min(10, Number(opts.rate) || 1));
        utter.pitch = Math.max(0, Math.min(2, Number(opts.pitch) || 1));
        utter.volume = Math.max(0, Math.min(1, Number(opts.volume) || 1));
        synth && synth.speak(utter);
        return Promise.resolve(true);
      } catch (e) {
        console.warn('[TTS] web speak failed', e);
        return Promise.resolve(false);
      }
    },

    cancel: function () {
      // 原生优先
      if (isNativeTTSAvailable()) {
        var nativeTTS = getNativeTTS();
        if (nativeTTS && typeof nativeTTS.stop === 'function') {
          return nativeTTS.stop().catch(function () { cancelWebSpeech(); });
        }
      }
      cancelWebSpeech();
      return Promise.resolve();
    },

    pause: function () {
      // 原生插件无 pause 接口，尽量 stop；否则使用 WebSpeech 暂停
      if (isNativeTTSAvailable()) {
        var nativeTTS = getNativeTTS();
        if (nativeTTS && typeof nativeTTS.stop === 'function') {
          return nativeTTS.stop().catch(function () { pauseWebSpeech(); });
        }
      }
      pauseWebSpeech();
      return Promise.resolve();
    },

    resume: function () {
      // 原生插件没有 resume；WebSpeech 则尝试恢复
      if (!isNativeTTSAvailable()) {
        resumeWebSpeech();
      }
      return Promise.resolve();
    },

    isSpeaking: function () {
      if (isNativeTTSAvailable()) {
        // 社区 TTS 插件没有提供 speaking 状态，保守返回 false，避免误判
        return false;
      }
      return isSpeakingWebSpeech();
    }
  };

  global.TTS = TTS;
})(window);