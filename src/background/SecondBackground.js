import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SecondBackground = ({children}) => {
  return (
    <LinearGradient
      colors={['#121142', '#535278']} 
      start={{ x: 0, y: 0 }}           // Start at the left (horizontal)
      end={{ x: 1, y: 0 }}   
    // start and end colors
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default SecondBackground;
