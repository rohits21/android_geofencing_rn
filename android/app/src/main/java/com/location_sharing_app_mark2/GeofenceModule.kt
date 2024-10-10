package com.location_sharing_app_mark2

import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingClient
import com.google.android.gms.location.GeofencingRequest
import com.google.android.gms.location.LocationServices

class GeofenceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val geofencingClient: GeofencingClient = LocationServices.getGeofencingClient(reactContext)
    private val geofencePendingIntent: PendingIntent by lazy {
        val intent = Intent(reactContext, GeofenceBroadcastReceiver::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            PendingIntent.getBroadcast(reactContext, 0, intent, PendingIntent.FLAG_MUTABLE)
        } else {
            PendingIntent.getBroadcast(reactContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)
        }
    }

    override fun getName(): String {
        return "GeofenceModule"
    }

    @ReactMethod
    fun createGeofence(id: String, latitude: Double, longitude: Double, radius: Float, duration: Long) {



        Log.i("Geofence created", "Geofence method called")
        val geofence = Geofence.Builder()
            .setRequestId(id)
            .setCircularRegion(latitude, longitude, radius)
            .setExpirationDuration(duration)
            .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER or Geofence.GEOFENCE_TRANSITION_EXIT)
            .build()

        val geofencingRequest = GeofencingRequest.Builder()
            .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
            .addGeofence(geofence)
            .build()

        geofencingClient.addGeofences(geofencingRequest, geofencePendingIntent)
            .addOnSuccessListener {
                Log.d("GeofenceModule", "Geofence added successfully")
            }
            .addOnFailureListener { e ->
                Log.e("GeofenceModule", "Failed to add geofence", e)
            }
    }
}
