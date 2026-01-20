
package com.kidsfun.game

import android.os.Bundle
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Capacitor سيتولى تحميل واجهة الويب (التي تحتوي على اللعبة) 
        // وسيتيح لـ adService.ts التواصل مع نظام إعلانات أندرويد.
    }
}
