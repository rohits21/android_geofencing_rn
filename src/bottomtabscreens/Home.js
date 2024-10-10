import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MainBackground from '../background/MainBackground'
import ActionBar from '../components/ActionBar'
import HomeActionButtons from '../components/HomeActionButtons'
import HomeScreenAlertsRV from '../components/HomeScreenAlertsRV'

const Home = ({navigation}) => {


  return (

    <MainBackground>

      <View style={styles.container}>
          <ActionBar navigation={navigation}/>
          <HomeActionButtons navigation={navigation} />
          <HomeScreenAlertsRV/>

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
});
