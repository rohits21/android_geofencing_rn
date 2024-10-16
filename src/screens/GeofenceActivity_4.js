import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker, Polygon,Circle } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import Geofencing, {Events} from '@rn-bridge/react-native-geofencing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addGeofenceEventsToFirestore, addGeofenceToFirestore, fetchAllGeofences, removeAllGeofencesFromFirestoreByUserId } from '../utility/firebaseHelper';
import { getUserData } from '../utility/utilityFunctions';

const GeofenceActivity_4 = () => {

    const [geofences, setGeofences] = useState([]);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [geofenceRadius, setGeofenceRadius] = useState(500);
    const [geofenceTime, setGeofenceTime] = useState(2);
    const mapRef = useRef(null);
  return (




    
  )
}

export default GeofenceActivity_4
