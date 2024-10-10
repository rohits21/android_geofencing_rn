import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker, Polygon,Circle } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import { NativeModules } from 'react-native';

console.log("Native module", NativeModules);
const { GeofenceModule } = NativeModules;

console.log('GeofenceModule:', GeofenceModule);
//import BackgroundGeolocation from "react-native-background-geolocation";

const createGeofence = (id, latitude, longitude, radius) => {


  if (GeofenceModule) {
    console.log('GeofenceModule initiated');
    GeofenceModule.createGeofence(id, latitude, longitude, radius, 24 * 60 * 60 * 1000); // Duration in milliseconds
  } else {
    console.error('GeofenceModule is not available');
  }
};

const initialRegion = {
  latitude: 28.4916,
  longitude: 77.0745,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};


const GeofenceActivity = () => {

  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [geofenceRadius, setGeofenceRadius] = useState(500);
  const mapRef = useRef(null);

  useEffect(() => {
    // Request current location on component mount



    if (GeofenceModule) {
        console.log("GeofenceModule is properly linked");
    } else {
        console.error("GeofenceModule is not linked");
    }
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 1500, maximumAge: 1000 }
    );

    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        checkGeofence(latitude, longitude);
      },
      error => console.log(error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);



   const handleLongPress = async  e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoordinate({ latitude, longitude });
    createGeofence("1", latitude, longitude, geofenceRadius);
  };

  const checkGeofence = (latitude, longitude) => {
    if (markerCoordinate) {
      const distance = getDistanceFromLatLonInMeters(
        latitude,
        longitude,
        markerCoordinate.latitude,
        markerCoordinate.longitude
      );

      if (distance <= geofenceRadius) {
        console.log("ntered geofence")
        ToastAndroid.show('Entered geofence', ToastAndroid.SHORT);
      } else {
        console.log("Exited geofence")
        ToastAndroid.show('Exited geofence', ToastAndroid.SHORT);
      }
    }
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
  };


  return (
    <View style={styles.mainContainer}>
      <View style={styles.controlsContainer}>
        {/* Geofence Radius Controls */}
        <View style={styles.controlBox}>
          <TouchableOpacity style={styles.circularButton}>
            <Text style={styles.controlButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.controlTextContainer}>
            <Text style={styles.controlLabel}>Geofence Radius</Text>
            <Text style={styles.controlValue}>hhhhhhh</Text>
          </View>
          <TouchableOpacity style={styles.circularButton}>
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Time Limit Controls */}
        <View style={styles.controlBox}>
          <TouchableOpacity style={styles.circularButton}>
            <Text style={styles.controlButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.controlTextContainer}>
            <Text style={styles.controlLabel}>Time Limit</Text>
            <Text style={styles.controlValue}>2 minutes</Text>
          </View>
          <TouchableOpacity style={styles.circularButton}>
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={initialRegion}
          onLongPress={handleLongPress}  
          ref={mapRef}
          showsUserLocation={true}
          followsUserLocation={true}
        >

{markerCoordinate && (
            <>
              <Marker coordinate={markerCoordinate} />
              <Circle
                center={markerCoordinate}
                radius={geofenceRadius}
                strokeWidth={2}
                strokeColor="red"
                fillColor="rgba(255,0,0,0.3)"
              />
            </>
          )}

        </MapView>
      </View>
    </View>
  );
};


// const createGeofence = (polygonCoordinates) => {
//   // Convert polygon into geofence bounds
//   BackgroundGeolocation.addGeofence({
//     identifier: "polygon-geofence",
//     radius: 200, // radius in meters
//     latitude: polygonCoordinates[0].latitude, // centroid of the polygon
//     longitude: polygonCoordinates[0].longitude,
//     notifyOnEntry: true,
//     notifyOnExit: true
//   }).then(() => {
//     console.log('[Geofence] Geofence added');
//   }).catch((error) => {
//     console.log('[Geofence] Failed to add geofence', error);
//   });
// };

// // Listen for geofence events
// BackgroundGeolocation.onGeofence((event) => {
//   if (event.action === 'ENTER') {
//     console.log('[Geofence] Entered geofence: ', event.identifier);
//   } else if (event.action === 'EXIT') {
//     console.log('[Geofence] Exited geofence: ', event.identifier);
//   }
// });

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8', // Optional gradient replacement
  },
  controlBox: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Optional rectangle background replacement
    padding: 10,
    borderRadius: 10,
  },
  circularButton: {
    backgroundColor: '#535278', // Button background
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  controlTextContainer: {
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  controlValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GeofenceActivity;
