/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import './src/firebase/config';

// Import Firestore
import firestore from '@react-native-firebase/firestore';



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

    initializeFirestore();
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
    <SafeAreaView>
      <StatusBar
        barStyle={'light-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Text>Firestore Data Initialization Example</Text>
        <Button title="Add Another User" onPress={() => addNewUser()} />
      </ScrollView>
    </SafeAreaView>
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
