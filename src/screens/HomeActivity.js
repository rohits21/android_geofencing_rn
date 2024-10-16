import React, { useEffect , useState} from 'react'
import { Text, View , StyleSheet, Alert} from 'react-native'
import MainBackground from '../background/MainBackground'
import ActionBar from '../components/ActionBar'
import HomeActionButtons from '../components/HomeActionButtons'
import Icon from 'react-native-vector-icons/Ionicons'; 
import Chat from '../bottomtabscreens/Chat'
import Settings from '../bottomtabscreens/Settings'
import SOSButton from '../components/SOSButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../bottomtabscreens/Home'
import MapsActivity from '../bottomtabscreens/MapsActivity'
import AsyncStorage from '@react-native-async-storage/async-storage'

import firestore from '@react-native-firebase/firestore';
import { triggerLocalNotification } from '../..'
import { addGeofenceEventsToFirestore, addSOSToFirestore } from '../utility/firebaseHelper'
import Geolocation from '@react-native-community/geolocation'


const getCurrentDateTimeId = () => {
  const now = new Date();
  return now.toISOString(); // Generates an ISO string as unique ID
};


const Tab = createBottomTabNavigator();

const handleGeofenceEvent = (data) =>{
  console.log(data);
  triggerLocalNotification("Event happened");
  
}

let userlatitude, userlongitude

const HomeActivity = ({navigation}) => {


  const [newDocs, setNewDocs] = useState([]);

  const [sosnewDocs, setsosNewDocs] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const initiateSOS = async () => {
    // Your SOS logic here
   // alert('SOS initiated!');

    let res = await AsyncStorage.getItem('user')
    res = await JSON.parse(res);
    console.log(res);

    const sosDoc = {
      createdBy : res.email,
      createdAt : getCurrentDateTimeId(),
      latitude : currentLocation.latitude || 0.00,
      longitude : currentLocation.longitude || 0.00
    }

    console.log(sosDoc);
    

    await addSOSToFirestore(sosDoc)
  };


  Geolocation.watchPosition(
    async position => {
       const { latitude, longitude } =  position.coords;

       setCurrentLocation({ latitude, longitude });
      // console.log("Geofence Activity :: USer Data when event occur :: ", userData);
      userlatitude = this.latitude
      userlongitude = this.longitude
       
     //r  console.log("Tracking Started :: Coordinates :: ", latitude, longitude);
       
     },
     error => console.log(error),
     { enableHighAccuracy: true, timeout: 1500, maximumAge: 1000 }
   );


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('geofenceEvent') // Your Firestore collection name
      .onSnapshot(querySnapshot => {
        const newDocumentData = [];

        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // Fetch the new document data
            const newData = change.doc.data();
            newDocumentData.push(newData);

            console.log("Home Activity :: New Event :: Data ", newData);

            const givenTime = new Date(newData.geofenceId);
            const currentTime = new Date();
            const timeDifference = currentTime - givenTime;

            const timeDifferenceInMinutes = timeDifference / (1000 * 60);

            if (timeDifferenceInMinutes < 5) {
              // Invoke the function
              console.log("Less than 5 minutes have passed, invoking function...");
              handleNewGeofenceEvent(newData);
            } else {
              console.log("More than 5 minutes have passed.");
            }

            

            // Call a function or trigger a notification here
           
          }
        });

        setNewDocs(prevDocs => [...prevDocs, ...newDocumentData]);
      });

    // Unsubscribe from Firestore updates when component unmounts
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const sosunsubscribe = firestore()
      .collection('sos') // Your Firestore collection name
      .onSnapshot(querySnapshot => {
        const newDocumentData = [];

        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // Fetch the new document data
            const newData = change.doc.data();
            newDocumentData.push(newData);

            const date = new Date(newData.createdAt);
            const humanReadableDate = date.toLocaleString();

            console.log("Home Activity :: SOS :: firestoredata :: ", newData);
            
            const givenTime = new Date(newData.createdAt);
            const currentTime = new Date();
            const timeDifference = currentTime - givenTime;

            const timeDifferenceInMinutes = timeDifference / (1000 * 60);

            if (timeDifferenceInMinutes < 5) {
              // Invoke the function
              console.log("Less than 5 minutes have passed, invoking function...");
              const message = `${newData.createdBy} is in danger, SOS created at ${humanReadableDate}, Coordinates of user when alert generated is lat : ${newData.latitude}, lng : ${newData.longitude}`
              triggerLocalNotification("Emergency SOS !!!", message)
            } else {
              console.log("More than 5 minutes have passed.");
            }

            // Call a function or trigger a notification here
           
          }
        });

        setsosNewDocs(prevDocs => [...prevDocs, ...newDocumentData]);
      });

    // Unsubscribe from Firestore updates when component unmounts
    return () => sosunsubscribe();
  }, []);

  const handleNewGeofenceEvent = (data) => {
    // Example function - this will be called when a new geofence event is added
   // Alert.alert('New Geofence Event', `User: ${data.userEmail}, Geofence ID: ${data.geofenceId}`);
    console.log('New geofence event:', data);

    if(data.geofenceId)

    if(data.geofenceEventType == "Enter"){

      const title = `Geofence Event happened by ${data.userId}`
      const message = `User entered in geofence from location ${data.latitude}, ${data.longitude}`
      triggerLocalNotification(title, message)
    }
    else if(data.geofenceEventType == "Exit"){
      const title = `Geofence Event happened by ${data.userId}`
      const message = `User exited from geofence from location ${data.latitude}, ${data.longitude}`
      triggerLocalNotification(title, message)
    }
    else if(data.geofenceEventType == "No Event Happened"){
      const title = `No Event happened by ${data.userId}`
      const message = `User didn't enteredinto  geofence into given time frame last location of user is ${data.latitude}, ${data.longitude}`
      triggerLocalNotification(title, message)
    }

    
    // Add any additional logic here (e.g., triggering a local notification)
  };

  


  const getUserData = async()=>{
    let res = await AsyncStorage.getItem('user')
  //  console.log("Home", res);
    
    if(res){
     res = JSON.parse(res);
   //  console.log("Home Activity", res);
     
    }
  }

  useEffect(()=>{

   getUserData()

   
  }, [])


  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#363578',
        height: 80,
        paddingBottom: 12,
      },
      tabBarLabelStyle: { // Customize the tab label
        fontSize: 14, // Increase font size
        color: '#fff', // Change font color (gold in this case)
        fontWeight: 'bold', // Optional: make text bold
      },
      tabBarIcon: ({ focused }) => {
        let iconName;
        let iconColor = focused ? '#E0B122' : '#fff';

        // Dynamically set the icon for each tab
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'chatbubble' : 'chatbubble-outline';
        } else if (route.name === 'MyMap') {
          iconName = focused ? 'map' : 'map-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === 'SOS') {
          iconName = 'alert-circle';
          iconColor = '#e32f45'; // Special color for SOS button
        }

        return <Icon name={iconName} size={30} color={iconColor} />;
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="MyMap"
      component={MapsActivity}
    />
    <Tab.Screen
      name="SOS"
      component={Home}
      options={{
        tabBarButton: (props) => (
          <SOSButton {...props} onPress={initiateSOS}>
            SOS
          </SOSButton>
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
    />
  </Tab.Navigator>
  )
}

export default HomeActivity



const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    text: {
      color: '#fff',
      fontSize: 24,
    },
  });
  
