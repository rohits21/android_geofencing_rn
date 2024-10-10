import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import SecondBackground from '../background/SecondBackground';
import LinearGradient from 'react-native-linear-gradient';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Share from 'react-native-share';

const HomeActionButtons = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      }
    );
  }, []);


  const shareLocation = () => {
    if (currentLocation) {
      const latitude = currentLocation.latitude;
      const longitude = currentLocation.longitude;
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;
      const options = {
        message: `Hey, here is my current location:`,
        url: url,
      };

      Share.open(options)
        .then((res) => {
          console.log('Share success:', res);
        })
        .catch((err) => {
          err && console.error('Error sharing:', err);
        });
    } else {
      console.error('Location not available');
    }
  };
  return (
    <LinearGradient
    colors={['#121142', '#535278']} 
    start={{ x: 0, y: 0 }}  
    end={{ x: 1, y: 0 }}      
  >
    <View style={styles.actionButtonsContainer}>

      {/* Live Tracking Button */}
      <View style={styles.actionButton}>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => openLiveTracking(navigation)}
          >
          <Image
            source={require('../assets/Images/livetracking.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <Text style={styles.buttonText}>Live Tracking</Text>
      </View>

      {/* Geo-Locations Button */}
      <View style={styles.actionButton}>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => requestLocationPermissionN(navigation)}
           >
          <Image
            source={require('../assets/Images/geolocationIcon.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <Text style={styles.buttonText}>Geo-Locations</Text>
      </View>

      {/* Share Location Button */}
      <View style={styles.actionButton}>
        <TouchableOpacity style={styles.buttonContainer} onPress={shareLocation}>
          <Image
            source={require('../assets/Images/share_location_icon.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <Text style={styles.buttonText}>Share Location</Text>
      </View>

    </View>
    </LinearGradient>
  );
};


async function requestLocationPermissionN(navigation) 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )

     

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
     // alert("You can use the location");
      requestPermission(navigation)

    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}


async function requestPermission(navigation) {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    ]);

    if (
      result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
      result['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
      result['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Permissions granted');
      navigation.navigate('GeofenceActivity');
    } else if (
      result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      result['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      result['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      Alert.alert('Please enable location permissions from the settings.');
    } else {
      console.log('Permissions denied');
      Alert.alert('Location permissions denied.');
    }
  }
}




async function requestLocationPermissions(navigation){
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    ]);

    if (
      granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Location permissions granted');
      openGeofence(navigation);
    } else {
      console.log('Location permissions denied');
      Alert.alert("Please allow all the required permissions.");
    }
  } catch (err) {
    console.warn(err);
  }
};


const openLiveTracking = (navigation) =>{
  navigation.navigate('LiveLocationActivity')
}

const openGeofence = (navigation)=>{
  navigation.navigate('GeofenceActivity')
}

const styles = StyleSheet.create({
  actionButtonsContainer: {
    height:"auto",
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
     // Example background color, replace with your gradient.
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  buttonContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FFF', 
    borderRadius: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, 
  },
  buttonImage: {
    width: 70, 
    height: 70,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff', 
  },
});

export default HomeActionButtons;
