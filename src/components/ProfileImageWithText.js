import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ProfileImageWithText = () => {
  return (
    <View style={styles.container}>
      {/* Profile Text */}
      <Text style={styles.profileText}>Guardian</Text>

      {/* Profile Image */}
      <Image
        source={require('../assets/Images/guardian_image.png')}
        style={styles.profileImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160, // Adjusted width to accommodate text and image
    backgroundColor: '#4D3E81', // Rounded background similar to the drawable
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  profileText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  profileImage: {
    width: 140,
    height: 120,
    resizeMode: 'contain',
  },
});

export default ProfileImageWithText;
