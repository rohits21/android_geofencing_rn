import React, { useEffect, useState } from 'react'
import { ScrollView, FlatList, View, Text, StyleSheet } from 'react-native'
import getGeofenceAlerts from '../utility/getGeofenceAlerts';
import SecondBackground from '../background/SecondBackground';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreenAlertsRV = () => {

    const [geofenceAlerts, setGeofenceAlerts] = useState(null)
   const geofenceActivities =  getGeofenceAlerts();

   useEffect(()=>{

   }, [geofenceActivities])
   



    return (

        <View style={{ height: 400, width: '100%', flex:1}}>

            <Text style={styles.titleText}> Activity and Alerts</Text>

            <LinearGradient
                colors={['#121142', '#535278']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
            <View style={{padding:10}}>

            <FlatList
                    data={geofenceActivities}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    style={{ width: "100%", padding:20 }}
                />

            </View>

               


            </LinearGradient>
        </View>

    )


}



const renderItem = ({ item }) => (

    <View style={styles.renderItem}>
        <Text style={styles.alertText}>{`Geofence Event happened by ${item.userId}`}</Text>
        <Text style={styles.alertText}>{`User entered in geofence from location ${item.latitude}, ${item.longitude} at ${item.geofenceId}`}</Text>
    </View>
);

export default HomeScreenAlertsRV

const styles = StyleSheet.create(
    {
        alertText: {
            color: "#000",
            fontWeight:'bold',

        },

        titleText : {
            color:"#fff",
            padding:20,
            fontSize:20,
            fontWeight:'bold'

        },
        renderItem:{
            padding: 10, 
            paddingHorizontal:20,
            textAlign:'center',
            borderWidth: 3, 
           borderStartWidth:3,
           borderColor:'#E0B122',

            backgroundColor:'#fff',
            margin:5,
            borderRadius:40,
        }
    }
)




