import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SocialSignUp = () => {
  return (
    <View style={styles.container}>
      {/* Sign Up with Section */}
      <Text style={styles.signUpText}>Or Sign Up With</Text>

      {/* Social Media Buttons */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/Images/google_icon.png')} // Replace with your Google icon path
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/Images/apple_icon.png')} // Replace with your Apple icon path
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  signUpText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default SocialSignUp;
