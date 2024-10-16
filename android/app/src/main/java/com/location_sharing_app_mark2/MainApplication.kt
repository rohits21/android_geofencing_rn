package com.location_sharing_app_mark2

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.eddieowens.RNBoundaryPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package


class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> {
                val packages = PackageList(this).packages.toMutableList()
                packages.add(GeofencePackage()) // Add your custom package here
               // packages.add(ReactNativePushNotificationPackage())
                //packages.add(RNBoundaryPackage())
                return packages
            }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            load()
        }
    }
}












//package com.location_sharing_app_mark2
//
//import android.app.Application
//import com.facebook.react.PackageList
//import com.facebook.react.ReactApplication
//import com.facebook.react.ReactHost
//import com.facebook.react.ReactNativeHost
//import com.facebook.react.ReactPackage
//import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
//import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
//import com.facebook.react.defaults.DefaultReactNativeHost
//import com.facebook.soloader.SoLoader
//
//class MainApplication : Application(), ReactApplication {
//
//
//
//  override val reactNativeHost: ReactNativeHost =
//      object : DefaultReactNativeHost(this) {
////        override fun getPackages(): List<ReactPackage> =
////            PackageList(this).packages.apply {
////              // Packages that cannot be autolinked yet can be added manually here, for example:
////              // add(MyReactNativePackage())
////
////            add(GeofencePackage()) // Add your custom package here
////           // return packages
////            }
//
//          override fun getPackages(): List<ReactPackage> {
//              val packages = PackageList(this).packages.toMutableList()
//              packages.add(GeofencePackage()) // Add your custom package here
//              return packages
//          }
//
//          override fun getJSMainModuleName(): String = "index"
//
//        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
//
//        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
//        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
//      }
//
//
//
//  override val reactHost: ReactHost
//    get() = getDefaultReactHost(applicationContext, reactNativeHost)
//
//  override fun onCreate() {
//    super.onCreate()
//    SoLoader.init(this, false)
//    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
//      // If you opted-in for the New Architecture, we load the native entry point for this app.
//      load()
//    }
//  }
//
//}
