package com.location_sharing_app_mark2

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingEvent
import android.widget.Toast

class GeofenceBroadcastReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val geofencingEvent = GeofencingEvent.fromIntent(intent)

        if (geofencingEvent == null) {
            Log.e("GeofenceBroadcastReceiver", "Error: GeofencingEvent is null")
            return
        }

        if (geofencingEvent.hasError()) {
            val errorMessage = geofencingEvent.errorCode
            Log.e("GeofenceBroadcastReceiver", "Error code: $errorMessage")
            return
        }

        // Get the geofence transition type.
        val geofenceTransition = geofencingEvent.geofenceTransition


      

        // Get the list of triggered geofences.
        val triggeringGeofences = geofencingEvent.triggeringGeofences

        // Ensure that triggeringGeofences is not null before using it
        triggeringGeofences?.let { geofences ->
            for (geofence in geofences) {
                Log.i("GeofenceBroadcastReceiver", "Geofence ID: ${geofence.requestId}")


                  val geofenceId = geofence.requestId
                   val transitionType: Number = geofencingEvent.geofenceTransition

                   when(transitionType){
                    Geofence.GEOFENCE_TRANSITION_ENTER ->{
                        Toast.makeText(context, "GEOFENCE_TRANSITION_ENTER", Toast.LENGTH_LONG).show()
                          Log.d("GeofenceReceiver", "Exited geofence")

                    }

                    Geofence.GEOFENCE_TRANSITION_EXIT ->{
                         Toast.makeText(context, "GEOFENCE_TRANSITION_EXIT", Toast.LENGTH_LONG).show()
                           Log.d("GeofenceReceiver", "Exited geofence")

                    }
                   }


            }
        }
    }
}
