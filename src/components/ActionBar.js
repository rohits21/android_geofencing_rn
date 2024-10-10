import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionBar = ({navigation}) => {

 
  const [userData, setUserData] = useState({})
  const [imagePath, setImagePath] = useState(null)

  const setImage = () =>{
    let imageUri;
    if(userData.displayName == 'Prashant Katiyar'){
      imageUri = require('../assets/Images/media_prashant.jpg')
       
     }else if(userData.displayName == 'Rohit Sahu'){
      imageUri = require('../assets/Images/media_rohit.jpg')
     
     }else if(userData.displayName == 'Ashutosh Pandey'){

      imageUri = require('../assets/Images/media_ashutosh.jpg')
      
     }else if(userData.displayName == 'Harish Kumar'){
      imageUri = require('../assets/Images/media_harish.jpg')
     
     }

     setImagePath(imageUri);
     
  }

  const getUserData = async()=>{
    let res = await AsyncStorage.getItem('user')
    //console.log("Action bar", res);
    
    if(res){
     res = await JSON.parse(res);
    setUserData(res);
    setTimeout(()=>{setImage()}, 1000)

    setImage();


     console.log("Action Bar", res.displayName,  userData.displayName);

    
    }
  }

  useEffect(()=>{
    getUserData()
    //console.log("imageuri", imageUri);
    
  },[imagePath])

  const handleLogout = async ()=>{
    await AsyncStorage.removeItem('user');
    navigation.navigate('GuardianActivity');
  }

  return (
    <View style={styles.actionBar}>
      {/* Left Section with Circular Image and Text */}
      <View style={styles.leftSection}>
        <View style={styles.circleImageContainer}>

        
          <Image
            source={imagePath} // Update the path to your image
            style={styles.circleImage}
          />
        </View>
        <Text style={styles.greetingsText}>Mr. {userData.displayName}</Text>
      </View>

      {/* Right Section with Image Buttons */}
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => console.log('Calendar Pressed')}>
        <Icon style={styles.iconButton} name="calendar-today" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Notification Pressed')}>
        <Icon style={styles.iconButton} name="notifications" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
        <Icon style={styles.iconButton} name="logout" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  actionBar: {
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circleImageContainer: {
    borderWidth: 2,
    borderColor: '#000', // Same as #FF000000 in Android XML
    borderRadius: 25, // Half of the image width/height for circular shape
    overflow: 'hidden',
  },
  circleImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  greetingsText: {
    marginLeft: 10,
    color: '#fff', // Update based on your color theme
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  rightSection: {
    paddingTop:10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    color:"#fff",
    marginHorizontal: 2,
    tintColor: '#00091B', 
  },
});

export default ActionBar;
