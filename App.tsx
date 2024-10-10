import React, { useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import './src/firebase/config';

// Import Firestore
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuardianActivity from './src/screens/GuardianActivity';
import LoginActivity from './src/screens/LoginActivity';
import RegistrationActivity from './src/screens/RegistrationActivity';
import HomeActivity from './src/screens/HomeActivity';
import GeofenceActivity from './src/screens/GeofenceActivity';
import LiveLocationActivity from './src/screens/LiveLocationActivity';
import GeofenceActivity_2 from './src/screens/GeofenceActivity_2';
import GeofenceActivity_3 from './src/screens/GeofenceActivity_3';


const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {


  useEffect(() => {
    // Initialize Firestore
    const initializeFirestore = async () => {
      try {
        // Creating a reference to the 'Users' collection
        const usersCollectionRef = firestore().collection('Users');

        // Adding a new document to the 'Users' collection
        await usersCollectionRef.add({
          name: 'John Doe',
          age: 30,
          email: 'john.doe@example.com',
        });

        console.log('User added!');
      } catch (error) {
        console.error('Error adding user: ', error);
      }
    };

   // initializeFirestore();
  }, []);

  // Function to add another user to the 'Users' collection
  const addNewUser = async () => {
    try {
      await firestore().collection('Users').add({
        name: 'Jane Doe',
        age: 25,
        email: 'jane.doe@example.com',
      });
      console.log('Another user added!');
    } catch (error) {
      console.error('Error adding another user: ', error);
    }
  };


  return (
    <NavigationContainer>
     

          <Stack.Navigator initialRouteName="GuardianActivity">
            <Stack.Screen name='GuardianActivity' options={{ headerShown: false }} component={GuardianActivity}/>
            <Stack.Screen name='LoginActivity' options={{ headerShown: false }} component={LoginActivity}/>
            <Stack.Screen name='RegistrationActivity' options={{ headerShown: false }} component={RegistrationActivity}/>
            <Stack.Screen name='HomeActivity' options={{ headerShown: false }} component={HomeActivity}/>
            <Stack.Screen name='GeofenceActivity' options={{headerShown:false}} component={GeofenceActivity_3} />
            <Stack.Screen name='LiveLocationActivity' options={{headerShown:false}} component={LiveLocationActivity} />
          </Stack.Navigator>
     

    </NavigationContainer>

  );
}



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
