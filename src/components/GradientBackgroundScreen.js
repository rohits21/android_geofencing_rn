import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackgroundScreen = ({children}) => {
  return (
    <LinearGradient
      colors={['#00091B', '#363578']} // Gradient colors
      start={{x: 0.25, y: 0.5}} // Start position of the gradient
      end={{x: 0.75, y: 0.5}} // End position of the gradient
      style={styles.gradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackgroundScreen;
