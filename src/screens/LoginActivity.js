
import React,{useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ToastAndroid} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import GradientBackgroundScreen from '../components/GradientBackgroundScreen';
import GradientButton from '../components/GradientButton';
import SocialSignUp from '../components/SocialSignUp';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginActivity = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {

      console.log("Login Activity :: Handle Login :: Entered data :: ", email, password);
      
      // Query Firestore to find the user with the given email
      const usersCollection = firestore().collection('users');
      const querySnapshot = await usersCollection
        .where('email', '==', email)
        .where('password', '==', password) // Check for matching password
        .get();

        console.log("Login Activity :: Handle Login :: query snapshot :: ", querySnapshot);
        

      if (!querySnapshot.empty) {
        // User exists, extract user data
        const userData = querySnapshot.docs[0].data();

        // Save user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));

        // Navigate to HomeActivity
        navigation.navigate('HomeActivity');
      } else {
        // User not found, show a toast
        ToastAndroid.show('User not found. Please check your credentials.', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
    }
  };


  return (
    <GradientBackgroundScreen>
      <Image
        source={require('../assets/Images/img.png')}
        style={styles.spiderBackgroundImage}
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/Images/logo_tracker.png')}
            style={styles.logo}
          />

          <CustomTextInput 
          placeholder="Enter Email ID*"
          value={email}
          setValue={setEmail}
           />

          <CustomTextInput
            placeholder="Enter your password*"
            secureTextEntry={true}
            value={password}
            setValue={setPassword}
          />

          {/* Remember me and Forgot Password */}
          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity>
              <Text style={styles.rememberMe}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SocialSignUp />

        <View style={styles.bottomScreen}>
          {/* Pagination dots */}
          <View style={styles.paginationContainer}>
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={[styles.dot, styles.inactiveDot]} />
          </View>

          {/* Login button */}
          <View style={styles.nextButton}>
            <GradientButton text="LOGIN" onPress={handleLogin} />
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
  spiderBackgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    opacity: 0.4,
  },
  contentContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginVertical: 10,
  },
  rememberMe: {
    color: '#fff',
  },
  forgotPassword: {
    color: '#ffd700',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#ff6347',
  },
  bottomScreen: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  nextButton: {
    width: '100%',
    marginTop: 10,
  },
});

export default LoginActivity;

