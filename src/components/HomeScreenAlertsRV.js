import React from 'react'
import { ScrollView, FlatList, View, Text, StyleSheet } from 'react-native'
import getGeofenceAlerts from '../utility/getGeofenceAlerts';
import SecondBackground from '../background/SecondBackground';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreenAlertsRV = () => {
    const geofenceActivities = getGeofenceAlerts();
    console.log(geofenceActivities);

    return (

        <View style={{ height: 400, width: '100%'}}>

            <Text style={styles.titleText}> Activity and Alerts</Text>

            <LinearGradient
                colors={['#121142', '#535278']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >

                <FlatList
                    data={geofenceActivities}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    style={{ width: "100%", padding:20 }}
                />


            </LinearGradient>
        </View>

    )


}

const renderItem = ({ item }) => (
    <View style={styles.renderItem}>
        <Text style={styles.alertText}>Type: {item.transitionType}</Text>
        <Text style={styles.alertText}>Timestamp: {item.createdAt}</Text>
        <Text style={styles.alertText}>User: {item.useremail}</Text>
    </View>
);

export default HomeScreenAlertsRV

const styles = StyleSheet.create(
    {
        alertText: {
            color: "#000"
        },

        titleText : {
            color:"#fff",
            padding:20,
            fontSize:20,
            fontWeight:'bold'

        },
        renderItem:{
            padding: 20, 
            borderWidth: 3, 
           borderStartWidth:3,
           borderColor:'#E0B122',

            backgroundColor:'#fff',
            margin:5,
            borderRadius:40,
        }
    }
)




