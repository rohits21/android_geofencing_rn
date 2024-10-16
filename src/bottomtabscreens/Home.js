import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MainBackground from '../background/MainBackground'
import ActionBar from '../components/ActionBar'
import HomeActionButtons from '../components/HomeActionButtons'
import HomeScreenAlertsRV from '../components/HomeScreenAlertsRV'
import MyGroups from '../components/MyGroups'

const Home = ({navigation}) => {


  return (

    <MainBackground>

      <View style={styles.container}>
          <ActionBar navigation={navigation}/>
          <HomeActionButtons navigation={navigation} />
          <HomeScreenAlertsRV/>
          <Text style={styles.titleText}>My Groups</Text>

          <MyGroups/>


    </View>

    </MainBackground>

 
   
  )
}

export default Home


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%'
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  titleText : {
    color:"#fff",
    padding:20,
    fontSize:20,
    fontWeight:'bold',
    marginTop: 60
},
});


