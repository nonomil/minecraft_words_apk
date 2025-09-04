package com.example.mcwords.plugins;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.provider.Settings;
import android.speech.tts.TextToSpeech;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;

import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "SystemTTS")
public class SystemTTSPlugin extends Plugin {

    @PluginMethod
    public void openSettings(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            Activity activity = getActivity();
            try {
                // 首选直达 TTS 设置页
                Intent intent = new Intent("com.android.settings.TTS_SETTINGS");
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                activity.startActivity(intent);
                call.resolve();
                return;
            } catch (ActivityNotFoundException e1) {
                try {
                    // 替代 Action
                    Intent intent2 = new Intent("android.settings.TTS_SETTINGS");
                    intent2.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    activity.startActivity(intent2);
                    call.resolve();
                    return;
                } catch (ActivityNotFoundException e2) {
                    try {
                        // 退而求其次：语音输入设置
                        Intent voiceInput = new Intent(Settings.ACTION_VOICE_INPUT_SETTINGS);
                        voiceInput.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        activity.startActivity(voiceInput);
                        call.resolve();
                        return;
                    } catch (ActivityNotFoundException e3) {
                        try {
                            Intent settings = new Intent(Settings.ACTION_SETTINGS);
                            settings.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            activity.startActivity(settings);
                            call.resolve();
                            return;
                        } catch (Exception e4) {
                            call.reject("No settings activity found", e4);
                        }
                    }
                }
            }
        });
    }

    @PluginMethod
    public void getCurrentEngine(PluginCall call) {
        Context context = getContext();
        JSObject ret = new JSObject();
        String pkg = null;
        try {
            // 优先尝试读取系统设置
            String key = "tts_default_synth"; // 系统默认引擎键
            pkg = Settings.Secure.getString(context.getContentResolver(), key);
        } catch (Exception ignore) {}
        if (pkg == null) {
            // 回退：创建 TTS 实例查询默认引擎
            try {
                TextToSpeech tts = new TextToSpeech(context, status -> {});
                pkg = tts.getDefaultEngine();
                tts.shutdown();
            } catch (Exception ignore) {}
        }
        ret.put("engine", pkg);
        ret.put("label", getAppLabel(context, pkg));
        call.resolve(ret);
    }

    @PluginMethod
    public void getAvailableEngines(PluginCall call) {
        Context context = getContext();
        JSArray arr = new JSArray();
        try {
            TextToSpeech tts = new TextToSpeech(context, status -> {});
            List<TextToSpeech.EngineInfo> engines = tts.getEngines();
            if (engines != null) {
                for (TextToSpeech.EngineInfo info : engines) {
                    String pkg = info != null ? info.name : null;
                    JSObject item = new JSObject();
                    item.put("engine", pkg);
                    item.put("label", (info != null && info.label != null) ? info.label : getAppLabel(context, pkg));
                    arr.put(item);
                }
            }
            tts.shutdown();
        } catch (Exception e) {
            // ignore and return empty list
        }
        JSObject ret = new JSObject();
        ret.put("engines", arr);
        call.resolve(ret);
    }

    private String getAppLabel(Context context, String packageName) {
        if (packageName == null) return null;
        try {
            PackageManager pm = context.getPackageManager();
            ApplicationInfo appInfo = pm.getApplicationInfo(packageName, 0);
            CharSequence label = pm.getApplicationLabel(appInfo);
            return label != null ? label.toString() : packageName;
        } catch (Exception e) {
            return packageName;
        }
    }
}