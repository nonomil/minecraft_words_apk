/*
  浏览器原生TTS模拟（Capacitor TextToSpeech Mock）
  - 当本地存储 MOCK_NATIVE_TTS=1 或 URL 包含 ?mockNative=1 时启用
  - 对外暴露 window.Capacitor.isNativePlatform() 与 window.Capacitor.Plugins.TextToSpeech
  - TextToSpeech.speak/stop 的入参与 @capacitor-community/text-to-speech 对齐
*/
(function () {
  var enabled = false;
  try {
    var fromLS = (typeof localStorage !== 'undefined') && localStorage.getItem('MOCK_NATIVE_TTS') === '1';
    var fromQuery = /[?&]mockNative=1/.test(typeof location !== 'undefined' ? location.search : '');
    enabled = fromLS || fromQuery;
  } catch (e) {
    enabled = false;
  }

  if (!enabled) {
    // 未启用模拟；若已经存在真实 Capacitor 则不干预
    return;
  }

  var mock = {
    _currentAudio: null,
    _currentUtterance: null,
    _synth: (typeof window !== 'undefined' ? window.speechSynthesis : null),

    async speak(options) {
      var opts = options || {};
      var text = String(opts.text || '');
      if (!text) return { value: false };

      // 先停止现有播放
      try { await mock.stop(); } catch (_) {}

      var rate = typeof opts.rate === 'number' ? opts.rate : 1.0;
      var pitch = typeof opts.pitch === 'number' ? opts.pitch : 1.0;
      var volume = typeof opts.volume === 'number' ? opts.volume : 1.0;
      var lang = opts.lang || (/[0-\u02AF\u0370-\u03FF\u4E00-\u9FFF]/.test(text) ? 'zh-CN' : 'en-US');

      // 优先用 Web Speech API 模拟
      if (mock._synth && typeof SpeechSynthesisUtterance !== 'undefined') {
        var u = new SpeechSynthesisUtterance(text);
        u.lang = lang; u.rate = rate; u.pitch = pitch; u.volume = volume;
        mock._currentUtterance = u;
        try {
          mock._synth.speak(u);
          return { value: true };
        } catch (err) {
          console.warn('[Mock TTS] WebSpeech speak failed, fallback to online audio', err);
        }
      }

      // 退回在线音频（尽量不依赖外网，但作为兜底）
      try {
        var url = 'https://translate.googleapis.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(text) + '&tl=' + encodeURIComponent(lang) + '&client=tw-ob';
        var a = new Audio(url);
        a.volume = Math.max(0, Math.min(1, volume));
        mock._currentAudio = a;
        await a.play();
        return { value: true };
      } catch (e) {
        console.warn('[Mock TTS] online audio fallback failed', e);
        return { value: false };
      }
    },

    async stop() {
      try {
        if (mock._synth && mock._synth.speaking) {
          mock._synth.cancel();
        }
      } catch (_) {}
      try {
        if (mock._currentAudio) {
          mock._currentAudio.pause();
          mock._currentAudio.currentTime = 0;
          mock._currentAudio = null;
        }
      } catch (_) {}
      mock._currentUtterance = null;
      return { value: true };
    },

    async getSupportedLanguages() {
      // 简单返回常见语言代码
      return {
        value: [
          'en-US','en-GB','zh-CN','zh-TW','ja-JP','ko-KR','fr-FR','de-DE','es-ES','ru-RU'
        ]
      };
    }
  };

  // 安装到全局（模拟 Capacitor 接口）
  if (typeof window !== 'undefined') {
    window.Capacitor = window.Capacitor || {};
    window.Capacitor.isNativePlatform = function () { return true; };
    window.Capacitor.Plugins = window.Capacitor.Plugins || {};
    window.Capacitor.Plugins.TextToSpeech = mock;

    // 兼容某些直接引用 TextToSpeech 的代码
    if (!window.TextToSpeech) {
      window.TextToSpeech = mock;
    }

    console.info('[Mock Capacitor TextToSpeech] 已启用（浏览器模拟原生TTS）。可用 URL 参数 ?mockNative=1 或 localStorage.MOCK_NATIVE_TTS=1 控制开关');
  }
})();