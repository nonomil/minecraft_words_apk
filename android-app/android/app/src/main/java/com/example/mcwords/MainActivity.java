package com.example.mcwords;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.example.mcwords.plugins.SystemTTSPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 注册应用内自定义插件
        registerPlugin(SystemTTSPlugin.class);
    }
}
