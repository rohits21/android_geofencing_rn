
import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker, Polygon,Circle } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import Geofencing, {Events} from '@rn-bridge/react-native-geofencing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addGeofenceEventsToFirestore, addGeofenceToFirestore, fetchAllGeofences, removeAllGeofencesFromFirestoreByUserId } from '../utility/firebaseHelper';
import { getUserData } from '../utility/utilityFunctions';

const initialRegion = {
    latitude: 28.4916,
    longitude: 77.0745,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };



const removeGeofences = async (setGeofences)=>{
  const currGeofences = await Geofencing.getRegisteredGeofences()


  for (const geofence of currGeofences) {
    const response = await Geofencing.removeGeofence(geofence);
    console.log("Removing geofence of id:", geofence.id, "response is:", response);
  }

  

  await AsyncStorage.removeItem('geofences');
  //setGeofences([]);

  let res = await AsyncStorage.getItem('user')
  res = await JSON.parse(res);

  await removeAllGeofencesFromFirestoreByUserId(res.email)

  const firestoreGeofences = await fetchAllGeofences(res.email);

  console.log("Fetched Geofences ", firestoreGeofences);
  setGeofences(firestoreGeofences);







  // currGeofences.forEach(async (geofence)=>{
  //   const response = await Geofencing.removeGeofence(id)
  
  //   console.log("Removing geofence of id : ", geofence , "respones is : ", response);  
  // })
}

let userData;
const GeofenceActivity_3 = () => {

    
  const [geofences, setGeofences] = useState([]);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [geofenceRadius, setGeofenceRadius] = useState(500);
  const [geofenceTime, setGeofenceTime] = useState(2);
  const mapRef = useRef(null);


  const getCurrentDateTimeId = () => {
    const now = new Date();
    return now.toISOString(); // Generates an ISO string as unique ID
  };


  const addGeofenceEvents = async (eventType, ids)=>{

    console.log("Adding geofence event :: Event type is :: ", eventType);
    

    let res = await AsyncStorage.getItem('user')
    res = await JSON.parse(res);
  
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();
    
    var ISTOffset = 330;   // IST offset UTC +5:30 
    
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    
    


    console.log("Geofence Activity 3 :: Add Geofence Event :: time when event occure :: ", ISTTime);
    

    
  
    
  
   // userData = await getUserData();
  
    Geolocation.getCurrentPosition(
      async position => {
         const { latitude, longitude } =  position.coords;
        // console.log("Geofence Activity :: USer Data when event occur :: ", userData);
         
         const geofenceEvent = {
         id:ISTTime,
         latitude: latitude,
         longitude: longitude,
         geofenceEventType: eventType,
         geofenceId: ids[0],
         userId: res.email,
         happenedAt : ISTTime
  
         }
         console.log("Geofence Activity :: Event object :: ", geofenceEvent);
         
         await addGeofenceEventsToFirestore(geofenceEvent)
       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 1500, maximumAge: 1000 }
     );
  
  
  }


    




  useEffect(() => {



    Geofencing.onEnter((ids) => {
      console.log("Enter:", ids);

      ToastAndroid.show("User entered into geofence", ToastAndroid.LONG);

      setTimeout(async () => {
        await addGeofenceEvents("Enter", ids);
      }, 0); 

     // await addGeofenceEvents("Enter", ids);
     
    });
  
    Geofencing.onExit((ids) => {
      console.log("Exit:", ids);

      ToastAndroid.show("User exited from geofence", ToastAndroid.LONG);

      setTimeout(async () => {
        await addGeofenceEvents("Exit", ids);
      }, 0); 

     // await addGeofenceEvents("Exit", ids);
    });
    //userData = getUserData();
    addPreviousGeofences(setGeofences)

    
   
    
  }, []); // Empty dependency array to run only once
  
  

  useEffect(()=>{

    //removeGeofences();
   
    console.log("Previous Geofences", geofences[0]);
    
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
        { enableHighAccuracy: true, distanceFilter: 5 }
      );

      return () => Geolocation.clearWatch(watchId);

  }, [markerCoordinate]);

  const handleLongPress = async (e) =>{
    const currentDate = new Date().toDateString();
    const { latitude, longitude } = e.nativeEvent.coordinate;
     setMarkerCoordinate({ latitude, longitude });

     const newGeofence = {
      id: getCurrentDateTimeId(),
      latitude,
      longitude,
      radius: geofenceRadius,
    };

    //setGeofences([...geofences, newGeofence]);
    addGeofence(newGeofence, setGeofences, geofenceTime, addGeofenceEvents);

   // addGeofence(markerCoordinate, latitude, longitude, geofenceRadius);

    
  }
  return (
    
    <View style={styles.mainContainer}>
    <View style={styles.controlsContainer}>
      {/* Geofence Radius Controls */}
      <View style={styles.controlBox}>
        <TouchableOpacity style={styles.circularButton} onPress={() => setGeofenceRadius((prevRadius) => Math.max(100, prevRadius - 100))} >
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.controlTextContainer}>
          <Text style={styles.controlLabel}>Geofence Radius</Text>
          <Text style={styles.controlValue}>{geofenceRadius}</Text>
        </View>
        <TouchableOpacity style={styles.circularButton}  onPress={() => setGeofenceRadius((prevRadius) => prevRadius + 100)}>
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Time Limit Controls */}
      <View style={styles.controlBox}>
        <TouchableOpacity style={styles.circularButton} onPress={() => setGeofenceTime((prevTime) => Math.max(1, prevTime - 1))}>
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.controlTextContainer}>
          <Text style={styles.controlLabel}>Time Limit</Text>
          <Text style={styles.controlValue}>{geofenceTime} minutes</Text>
        </View>
        <TouchableOpacity style={styles.circularButton}  onPress={() => setGeofenceTime((prevRadius) => prevRadius + 1)}>
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
      </View>

     
    </View>

    <View  style={styles.removeGeofenceContainer} >
    <TouchableOpacity style={styles.removeButton} onPress={()=>removeGeofences(setGeofences)}>
          <Text style={styles.removeButtonText}>Remove All Geofences</Text>
    </TouchableOpacity>

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


{geofences && geofences.map((geofence, index) => (
    <React.Fragment key={index}>
      <Marker coordinate={{ latitude: geofence.latitude, longitude: geofence.longitude }} />
      <Circle
        center={{ latitude: geofence.latitude, longitude: geofence.longitude }}
        radius={geofence.radius}
        strokeWidth={2}
        strokeColor="red"
        fillColor="rgba(255,0,0,0.3)"
      />
    </React.Fragment>
  ))}

    {/* {markerCoordinate && (
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
        )} */}

      </MapView>
    </View>
  </View>

  )
}

export default GeofenceActivity_3



const addPreviousGeofences = async (setGeofences) => {


  const currGeofences = await Geofencing.getRegisteredGeofences()


  for (const geofence of currGeofences) {
    const response = await Geofencing.removeGeofence(geofence);
    console.log("Removing geofence of id:", geofence.id, "response is:", response);
  }

  

  await AsyncStorage.removeItem('geofences');

  let res = await AsyncStorage.getItem('user')
  res = await JSON.parse(res);


  const firestoreGeofences = await fetchAllGeofences(res.email);

  console.log("Fetched Geofences ", firestoreGeofences);
  setGeofences(firestoreGeofences);

  await AsyncStorage.setItem('geofences', JSON.stringify(firestoreGeofences));

  firestoreGeofences.forEach(async (geofence) =>{
    const response = await Geofencing.addGeofence({
      id: geofence.id,
      latitude: geofence.latitude,
      longitude: geofence.longitude,
      radius: geofence.radius
    });

    console.log("Geofence response", response);
  })

};


const addGeofence = async (geofence, setGeofences, geofenceTime, addGeofenceEvents) => {
  try {
    const response = await Geofencing.addGeofence({
      id: geofence.id,
      latitude: geofence.latitude,
      longitude: geofence.longitude,
      radius: geofence.radius,
    });

    
    console.log("Goefence Activity :: Add Geofence :: Response :: ", response);

    if(response){
      const timerDuration = geofenceTime * 60 * 1000;

      const timerId = setTimeout(async () => {
        console.log('Alert: No one has entered the geofence within the given time frame!');
        await addGeofenceEvents("No Event Happened", response.id);
      }, timerDuration);

      let res = await AsyncStorage.getItem('user')
      res = await JSON.parse(res);

      await addGeofenceToFirestore(geofence, res.email);

      
      console.log("Geofence adding", res);
      
      //console.log("Action bar", res);

      console.log("Geofence Activity :: User Data :: ",userData);
      
      const firestoreGeofences = await fetchAllGeofences(res.email);

      console.log("Fetched Geofences ", firestoreGeofences);
      setGeofences(firestoreGeofences);

      await AsyncStorage.setItem('geofences', JSON.stringify(firestoreGeofences));

      console.log('Geofence added successfully, timer started.');

      Geofencing.onEnter(async (ids) => {
        console.log("Geofence Enter Event with geofence id :", ids);

        ToastAndroid.show("User entered into geofence", ToastAndroid.LONG);

        // setTimeout(async () => {
        //   await addGeofenceEvents("Enter", ids);
        // }, 0); 


      //  await addGeofenceEvents("Enter", ids);

        // Geolocation.getCurrentPosition(
        //  async position => {
        //     const { latitude, longitude } = position.coords;
        //     const geofenceEvent = {
        //       id:getCurrentDateTimeId(), // Unique ID for the geofence (you can use timestamp or other identifier)
        //     latitude: latitude,
        //     longitude: longitude,
        //     geofenceEventType: "Enter",
        //     geofenceId: ids[0],
        //     userId: "rohit@gmail.com",
    
        //     }
        //     await addGeofenceEventsToFirestore(geofenceEvent)
        //   },
        //   error => console.log(error),
        //   { enableHighAccuracy: true, timeout: 1500, maximumAge: 1000 }
        // );

       
        clearTimeout(timerId)
      });
    
      Geofencing.onExit(async (ids) => {
        console.log("Exit:", ids);

        ToastAndroid.show("User exited from geofence", ToastAndroid.LONG);

        // setTimeout(async () => {
        //   await addGeofenceEvents("Exit", ids);
        // }, 0); 
       // await addGeofenceEvents("Exit", ids);
      });
      

    }

    // let geofences = await AsyncStorage.getItem('geofences');
    // geofences = geofences ? JSON.parse(geofences) : [];
    // geofences.push(geofence);
    // setGeofences(geofences)
    // await AsyncStorage.setItem('geofences', JSON.stringify(geofences));


  } catch (error) {
    console.error("Error adding geofence", error);
  }
};




  








// const addGeofence =async (markerCoordinate, latitude, longitude, geofenceRadius)=>{
   
          
//           const response = await Geofencing.addGeofence({
//             id: "1",
//             latitude,
//             longitude,
//             radius: geofenceRadius
//           });

//           console.log("Geofence response", response);
          
        
// }


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
    removeGeofenceContainer:{
      
     
      
      backgroundColor: '#f8f8f8',
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
    removeButton: {
    backgroundColor: '#ff3b3b',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:5
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  
