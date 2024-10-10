
import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker, Polygon,Circle } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import Boundary, {Events} from 'react-native-boundary';


const initialRegion = {
    latitude: 28.4916,
    longitude: 77.0745,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  

const GeofenceActivity_2 = () => {

    

  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [geofenceRadius, setGeofenceRadius] = useState(500);
  const mapRef = useRef(null);

  useEffect(()=>{
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
         // checkGeofence(latitude, longitude);
        },
        error => console.log(error),
        { enableHighAccuracy: true, distanceFilter: 10 }
      );

      return () => Geolocation.clearWatch(watchId);

  }, []);

 
//   useEffect(() => {
//     if (markerCoordinate) {
//       // Add the geofence when markerCoordinate changes
//       Boundary.add({
//         lat: markerCoordinate.latitude,
//         lng: markerCoordinate.longitude,
//         radius: geofenceRadius, // in meters
//         id: 'CustomGeofence',
//       })
//         .then(() => console.log('Geofence added successfully!'))
//         .catch(e => console.error('Failed to add geofence:', e));

//       Boundary.on(Events.ENTER, id => {
//         console.log(`Entered the geofence with id: ${id}`);
//       });

//       Boundary.on(Events.EXIT, id => {
//         console.log(`Exited the geofence with id: ${id}`);
//       });

//       // Cleanup function when component unmounts or markerCoordinate changes
//       return () => {
//         Boundary.off(Events.ENTER);
//         Boundary.off(Events.EXIT);
//         Boundary.remove('CustomGeofence')
//           .then(() => console.log('Geofence removed successfully'))
//           .catch(e => console.error('Failed to remove geofence:', e));
//       };
//     }
//   }, [markerCoordinate, geofenceRadius]);


  const handleLongPress = async (e) =>{
    const { latitude, longitude } = e.nativeEvent.coordinate;
     setMarkerCoordinate({ latitude, longitude });

    addGeofence(markerCoordinate, latitude, longitude, geofenceRadius);

  }
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
          <Text style={styles.controlValue}>Radius</Text>
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

  )
}

export default GeofenceActivity_2


const addGeofence = (markerCoordinate, latitude, longitude, geofenceRadius)=>{
   
            if (markerCoordinate) {
              // Add the geofence when markerCoordinate changes
              Boundary.add({
                lat: latitude,
                lng: longitude,
                radius: geofenceRadius, // in meters
                id: 'CustomGeofence',
              })
                .then(() => console.log('Geofence added successfully!'))
                .catch(e => console.error('Failed to add geofence:', e));
        
              Boundary.on(Events.ENTER, id => {
                console.log(`Entered the geofence with id: ${id}`);
              });
        
              Boundary.on(Events.EXIT, id => {
                console.log(`Exited the geofence with id: ${id}`);
              });
        
              // Cleanup function when component unmounts or markerCoordinate changes
              return () => {
                Boundary.off(Events.ENTER);
                Boundary.off(Events.EXIT);
                Boundary.remove('CustomGeofence')
                  .then(() => console.log('Geofence removed successfully'))
                  .catch(e => console.error('Failed to remove geofence:', e));
              };
            }
          
        
}


// const addGeofence = (id, lat, lng, radius) =>{

//     Boundary.add({
//         lat,
//         lng,
//         radius,
//         id

//     }).then(()=> console.log("success!")).catch((e)=> console.error("error :(", e))


// }

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
  
