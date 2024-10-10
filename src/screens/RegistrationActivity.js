// import React from 'react'
// import { Text, View, Button } from 'react-native'

// const RegistrationActivity = ({ navigation }) => {
//   return (
//     <View>
//         <Text>Registration activity</Text>
//         <Button
//             title='Next'
//             onPress={() => navigation.navigate('LoginActivity')}
//         />
//     </View>
//   )
// }

// export default RegistrationActivity

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import GradientBackgroundScreen from '../components/GradientBackgroundScreen';
import GradientButton from '../components/GradientButton';
import ProfileImageWithText from '../components/ProfileImageWithText';
import SocialSignUp from '../components/SocialSignUp';

const RegistrationActivity = () => {
  const navigation = useNavigation();
  const handleRegisterPress = () => {
    navigation.navigate('Login');
  };
  return (
    <GradientBackgroundScreen>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Create a Profile</Text>

          <ProfileImageWithText />

          {/* Input Fields */}
          <CustomTextInput placeholder="Enter Email ID*" />
          <CustomTextInput
            placeholder="Enter your password*"
            secureTextEntry={true}
          />
          <CustomTextInput
            placeholder="Confirm password*"
            secureTextEntry={true}
          />
        </View>
        <SocialSignUp />
        <View style={styles.bottomScreen}>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <View style={styles.nextButton}>
            <GradientButton text="REGISTER" onPress={() => navigation.navigate('LoginActivity')} />
          </View>
        </View>
      </View>
    </GradientBackgroundScreen>
  );
};

export default RegistrationActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomScreen: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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

