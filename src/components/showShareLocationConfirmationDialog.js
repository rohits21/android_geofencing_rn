import React, {useState, useEffect} from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { View, Button, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from "react-native-geolocation-service";
import database from '@react-native-firebase/database';

const showShareLocationConfirmationDialog = (navigation) => {
Alert.alert(
    'Share Location',  
    'Your live location will be shared with group members. Are you okay with sharing your location?',  // Message
    [
      {
        text: 'No',
        onPress: () => ToastAndroid.show('Location sharing canceled', ToastAndroid.SHORT),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => shareLiveLocation(navigation),
      },
    ],
    { cancelable: true }
  );
};

 // Function to request location permission
 const requestLocationPermission = async (navigation) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app requires access to your location to share it with the group members.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ToastAndroid.show('Location permission Granted', ToastAndroid.SHORT);
      showLocationSharedDialog(navigation);
      requestLocationUpdates();
      
    } else {
      ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
    }
  } catch (err) {
    console.warn(err);
  }
};
  

  const showLocationSharedDialog = (navigation) => {
    
    Alert.alert(
      'Location Shared',
      'Your location is now visible to other group members.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('LiveLocationActivity'), 
        },
      ],
      { cancelable: false }
    );
  };


const requestLocationUpdates = () => {
  
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      const { latitude, longitude, accuracy } = position.coords;
      ToastAndroid.show(position, ToastAndroid.SHORT);
      ToastAndroid.show("Requesting ", ToastAndroid.SHORT);
      
    },
    (error) => {
      console.log(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  
  // Geolocation.watchPosition(
  //   (position) => {
  //     const { latitude, longitude, accuracy } = position.coords;
  //     ToastAndroid.show(`Lat: ${latitude}, Lon: ${longitude}`, ToastAndroid.SHORT);
  //     console.log("Position:", latitude, longitude, accuracy);
  //     sendLocationToFirebase(latitude, longitude, accuracy); // Your function to send data to Firebase
  //   },
  //   (error) => {
  //     ToastAndroid.show("Error occurred", ToastAndroid.SHORT);
      // console.error("Error getting location:", error);
  //   },
  //   {
  //     enableHighAccuracy: true,
  //     distanceFilter: 0,
  //     interval: 5000,       // Time between location updates in milliseconds
  //     fastestInterval: 2000, // Fastest allowed update interval
  //     timeout: 10000,        // Timeout in milliseconds for the location request
  //   }
  // );
};

// Function to send live location to Firebase
const sendLocationToFirebase = (latitude, longitude, accuracy) => {
  const userName = 'Ashutosh Pandey'; 
  const locationData = {
    latitude,
    longitude,
    accuracy,
  };
  console.log(locationData);
  
  database().ref(`/locations/${userName}`).set(locationData)
    .then(() => {
      console.log('Location sent to Firebase');
    })
    .catch((error) => {
      console.error('Error sending location to Firebase: ', error);
    });
};


const shareLiveLocation = (navigation) => {
  requestLocationPermission(navigation);
};

export default showShareLocationConfirmationDialog;