import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker, Polygon } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
//import BackgroundGeolocation from "react-native-background-geolocation";

const MapsActivity = () => {

  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  useEffect(() => {
    if (polygonCoordinates.length >= 3) {
     // createGeofence(polygonCoordinates);
    }
  }, [polygonCoordinates]);

  const initialRegion = {
    latitude: 28.4916,
    longitude: 77.0745,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const [polygonPoints, setPolygonPoints] = useState([]);
  const mapRef = useRef(null);

  const handleLongPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPolygonCoordinates((prevCoords) => [...prevCoords, { latitude, longitude }]);
  };


  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.controlsContainer}>
        
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
      </View> */}

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={initialRegion}
          onLongPress={handleLongPress}  
          ref={mapRef}
        >

{polygonCoordinates.length >= 3 && (
          <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(0, 255, 0, 0.5)"
            strokeColor="green"
          />
        )}


        {polygonPoints.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}



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

export default MapsActivity;
