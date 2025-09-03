package com.example.mcwords;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;
import com.getcapacitor.community.tts.TextToSpeech;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Register the TextToSpeech plugin
        registerPlugin(TextToSpeech.class);
    }
}
