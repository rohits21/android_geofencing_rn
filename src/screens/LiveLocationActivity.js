import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage'


const LiveLocationActivity = () => {
  const mapRef = useRef(null);
  
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [oneToOneShared, setOneToOneShared] = useState([]);
  const [selectedSharedMember, setSelectedSharedMember] = useState(null);
  const [locations, setLocations] = useState({});
  const [newLocations, setNewLocations] = useState({});
  const [initialRegion, setInitialRegion] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const handleFamilyMemberChange = value => {
    setSelectedFamilyMember(value);
    setSelectedSharedMember(value);

    if (value) {
      const selectedLocation = locations.find(loc => loc.label === value);
      if (selectedLocation && mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: selectedLocation.coordinate.latitude,
            longitude: selectedLocation.coordinate.longitude,
            latitudeDelta: 0.05, // Zoom level for latitude (smaller values for more zoom)
            longitudeDelta: 0.05, // Zoom level for longitude (smaller values for more zoom)
          },
          1000 // Duration of animation in ms
        );
      }
    } 
  };

  // Function to fetch locations from Firebase
  const fetchLocations = async () => {

    let res = await AsyncStorage.getItem('user')
    res = await JSON.parse(res);

    setCurrentUser(res.displayName);

    database()
      .ref('/locations')
      .once('value')
      .then(snapshot => {
        const locationData = snapshot.val();
        const names = Object.keys(locationData);
        setLocations(locationData); // Store the data in state
        const familyMembers = names.map(name => ({
          label: name,
          value: name,
        }));

        setFamilyMembers(familyMembers);

        const locationArray = Object.keys(locationData).map(name => ({
          label: name,
          value: name,
          coordinate: {
            latitude: locationData[name].latitude,
            longitude: locationData[name].longitude,
          },
        }));

        setLocations(locationArray);
        setNewLocations(locationArray);
        setMapRegion(locationArray);
      })
      .catch(error => {
        console.error('Error fetching locations from Firebase: ', error);
      });
  };
  const fetchOneToOneShared = async() =>{
    database()
    .ref(`/onetoonelocations/${currentUser}`)
    .once('value')
    .then(snapshot => {
      const locationData = snapshot.val();
      const names = Object.keys(locationData);
      setLocations(locationData); // Store the data in state
      const oneToOneShared = names.map(name => ({
        label: name,
        value: name,
      }));

      setOneToOneShared(oneToOneShared);

      const locationArray = Object.keys(locationData).map(name => ({
        label: name,
        value: name,
        coordinate: {
          latitude: locationData[name].latitude,
          longitude: locationData[name].longitude,
        },
      }));

      setLocations(locationArray);
      setNewLocations(locationArray);
      setMapRegion(locationArray);
    })
    .catch(error => {
      console.error('Error fetching locations from Firebase: ', error);
    });

  };

  // Fetch data on component mount
  useEffect(() => {
    fetchLocations();
    if(currentUser){
      fetchOneToOneShared();
    }
  }, []);


  // Function to calculate the map bounds and set the initial region
  const setMapRegion = locationArray => {
    if (locationArray.length > 0) {
      const latitudes = locationArray.map(
        location => location.coordinate.latitude,
      );
      const longitudes = locationArray.map(
        location => location.coordinate.longitude,
      );

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latitudeDelta = maxLat - minLat + 0.01; 
      const longitudeDelta = maxLng - minLng + 0.01;

      setInitialRegion({
        latitude: (maxLat + minLat) / 2,
        longitude: (maxLng + minLng) / 2,
        latitudeDelta,
        longitudeDelta,
      });
    }
  };

  const handleButtonClick = () => {
    fetchLocations();
    if (mapRef.current) {
      // When no user is selected (e.g. 'All of them'), fit to all family members' locations
      const allCoordinates = locations.map(loc => loc.coordinate);
      mapRef.current.fitToCoordinates(allCoordinates, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50}, // Adjust padding as needed
        animated: true, // Animation on zoom out
      });
    }
    setSelectedFamilyMember(null);
  };

  return (
    <View style={styles.container}  >
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Family Members</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchOneToOneShared}>
          <Text style={styles.buttonText}>One to one shared</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdowns */}
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <RNPickerSelect
            onValueChange={value => handleFamilyMemberChange(value)}
            items={familyMembers}
            placeholder={{label: 'Select Family Member', value: null}}
            style={pickerSelectStyles.inputAndroid}
          />
        </View>
        <View style={styles.pickerWrapper}>
          <RNPickerSelect
            onValueChange={value => handleFamilyMemberChange(value)}
            items={oneToOneShared}
            placeholder={{label: 'Select Shared Member', value: null}}
            style={pickerSelectStyles.inputAndroid}
          />
        </View>
      </View>

{initialRegion && ( // Render map only if initialRegion is set
  <MapView
  ref={mapRef}
    style={styles.map}
    initialRegion={initialRegion}
    showsUserLocation={false}
    followsUserLocation={false}
  >
    {locations && locations.length > 0 && (
      selectedFamilyMember === null ? (
        // Show all locations when no family member is selected
        locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location.coordinate}
            // title={location.label}// Display name as title on the marker
          >
            <View style={{alignItems: 'center'}}>
              <Text style={styles.markerText}>{location.label}</Text>
              <Image
                source={require('../assets/Images/location-marker.png')} // Replace with your marker image path
                style={styles.markerIcon}
              />
            </View>
          </Marker>

        ))
      ) : (
        // Show only the selected family member's location
        locations
          .filter(loc => loc.label === selectedFamilyMember)
          .map((location, index) => (
            <Marker
              key={index}
              coordinate={location.coordinate}
              // title={location.label} // Display name as title on the marker
              >
            <View style={{alignItems: 'center'}}>
              <Text style={styles.markerText}>{location.label}</Text>
              <Image
                source={require('../assets/Images/location-marker.png')} // Replace with your marker image path
                style={styles.markerIcon}
              />
            </View>
          </Marker>
          ))
      )
    )}
  </MapView>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    height: 40,
  },
  button: {
    flex: 1,
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    padding: 2,
    borderRadius: 5,
    marginBottom: 5, // Adds spacing between the label and marker icon
  },
  // markerIcon: {
  //   width: 20,
  //   height: 20,
  //   backgroundColor: 'red', // Marker color
  //   borderRadius: 10, // Circular marker
  // },
  markerIcon: {
    width: 30, // Adjust the size as per your marker image
    height: 40, // Adjust the height
    resizeMode: 'contain', // Ensure the image scales properly
  },

  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure equal spacing for the dropdowns
    marginHorizontal: 10,
    marginTop: 10,
  },
  pickerWrapper: {
    flex: 1, // Make each dropdown take up equal space
    marginHorizontal: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30,
  },
});

export default LiveLocationActivity;
