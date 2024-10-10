import React, { useEffect } from 'react'
import { Text, View , StyleSheet} from 'react-native'
import MainBackground from '../background/MainBackground'
import ActionBar from '../components/ActionBar'
import HomeActionButtons from '../components/HomeActionButtons'
import Icon from 'react-native-vector-icons/Ionicons'; 
import Chat from '../bottomtabscreens/Chat'
import Settings from '../bottomtabscreens/Settings'
import SOSButton from '../components/SOSButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../bottomtabscreens/Home'
import MapsActivity from '../bottomtabscreens/MapsActivity'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tab = createBottomTabNavigator();

const HomeActivity = ({navigation}) => {

  const getUserData = async()=>{
    let res = await AsyncStorage.getItem('user')
    console.log("Home", res);
    
    if(res){
     res = JSON.parse(res);
     console.log("Home Activity", res);
     
    }
  }

  useEffect(()=>{

   getUserData()

   
  })


  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#363578',
        height: 80,
        paddingBottom: 12,
      },
      tabBarLabelStyle: { // Customize the tab label
        fontSize: 14, // Increase font size
        color: '#fff', // Change font color (gold in this case)
        fontWeight: 'bold', // Optional: make text bold
      },
      tabBarIcon: ({ focused }) => {
        let iconName;
        let iconColor = focused ? '#E0B122' : '#fff';

        // Dynamically set the icon for each tab
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'chatbubble' : 'chatbubble-outline';
        } else if (route.name === 'MyMap') {
          iconName = focused ? 'map' : 'map-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === 'SOS') {
          iconName = 'alert-circle';
          iconColor = '#e32f45'; // Special color for SOS button
        }

        return <Icon name={iconName} size={30} color={iconColor} />;
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="MyMap"
      component={MapsActivity}
    />
    <Tab.Screen
      name="SOS"
      component={Home}
      options={{
        tabBarButton: (props) => (
          <SOSButton {...props} onPress={initiateSOS}>
            SOS
          </SOSButton>
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
    />
  </Tab.Navigator>
  )
}

export default HomeActivity

const initiateSOS = () => {
    // Your SOS logic here
    alert('SOS initiated!');
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
  
