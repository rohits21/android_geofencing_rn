import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MainBackground = ({children}) => {
  return (
    <LinearGradient
      colors={['#00091B', '#363578']} // start and end colors
      start={{ x: 0, y: 0 }} // equivalent to 270-degree angle in XML
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default MainBackground;
