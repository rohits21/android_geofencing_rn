// import React from 'react'
// import { Button, Text, View } from 'react-native'

// const GuardianActivity = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text style={{color:'#000'}}>Gaurdian activityddddddddddd</Text>
//         <Button
//             title='Next'
//             onPress={() => navigation.navigate('RegistrationActivity')}
//         />
//     </View>
//   )
// }

// export default GuardianActivity

import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View, ActivityIndicator, Button} from 'react-native';
import GradientBackgroundScreen from '../components/GradientBackgroundScreen';
import GradientButton from '../components/GradientButton';
import AsyncStorage from '@react-native-async-storage/async-storage';





const GuardianActivity = ({navigation}) => {


  const checkLogIn = async ()=>{
    let user = await AsyncStorage.getItem('user');
    console.log(user);
    
    if(user){
      user = JSON.parse(user); 
     if(user.email){
        navigation.navigate('HomeActivity')
     }
    }else{
      console.log("not logged in");
      
      return null;
    }
  
  }
useEffect(()=>{
  console.log("use effext");
  checkLogIn()
  
  
}, [])
 // const navigation = useNavigation();
  
  return (
    <GradientBackgroundScreen>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>You are..</Text>

          {/* Guardian Card */}
          <View style={styles.card}>
            <Image
              source={require('../assets/Images/guardian_image.png')}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>A Guardian</Text>
              <Text style={styles.cardDescription}>
                Administer dependents, create geo-fences and time-fences, create
                groups, etc.
              </Text>
            </View>
          </View>

          {/* Dependent Card */}
          <View style={styles.card}>
            <Image
              source={require('../assets/Images/dependent_image.png')}
              style={styles.cardImage}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>A Dependent</Text>
              <Text style={styles.cardDescription}>
                Receive notifications, function as emergency contacts, trigger
                notifications via SOS, etc.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomScreen}>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Next Button */}
          <View style={styles.nextButton} >
            <GradientButton text="NEXT" onPress={() => navigation.navigate('RegistrationActivity')} />
          </View>
        </View>
      </View>
    </GradientBackgroundScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  contentContainer: {
    marginTop: 80, // Centers content vertically
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#4D3E81',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: '90%',
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardTextContainer: {
    marginLeft: 20,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  bottomScreen: {
    alignItems: 'center', // Centers content horizontally
    paddingBottom: 20, // Adds space at the bottom of the screen
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF5A4D',
  },
  nextButton: {
    width: '100%',
    marginTop: 10,
  },
});

export default GuardianActivity;

