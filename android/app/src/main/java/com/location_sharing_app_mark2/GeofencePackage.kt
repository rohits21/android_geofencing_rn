  package com.location_sharing_app_mark2
//
//    import android.view.View
//    import com.facebook.react.ReactPackage
//    import com.facebook.react.bridge.NativeModule
//    import com.facebook.react.bridge.ReactApplicationContext
//    import com.facebook.react.uimanager.ReactShadowNode
//    import com.facebook.react.uimanager.ViewManager
//
//    class GeofencePackage : ReactPackage {
//
//        override fun createViewManagers(
//            reactContext: ReactApplicationContext
//        ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()
//
//        override fun createNativeModules(
//            reactContext: ReactApplicationContext
//        ): MutableList<NativeModule> = listOf(GeofenceModule(reactContext)).toMutableList()
//    }


import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class GeofencePackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(GeofenceModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
