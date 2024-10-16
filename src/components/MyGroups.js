import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyGroups = () => {
  return (
    <View style={{flex:1, width: '100%', marginTop:-20}}>



    <ScrollView style={styles.scrollView}>
      {/* My Groups Header */}
     

      {/* My Family Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>My Family</Text>
        <View style={styles.tableRow}>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_harish.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Harish</Text>
          </View>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_prashant.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Prashant</Text>
          </View>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_ashutosh.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Ashutosh</Text>
          </View>
        </View>
        <View style={[styles.tableRow, { marginTop: 20 }]}>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_rohit.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Rohit</Text>
          </View>
          <View style={styles.memberContainer}>
          <Icon name="add" size={60} borderColor="#D9B122" color="#D9B122" />
            <Text style={styles.memberName}>Add Member</Text>
          </View>
        </View>
      </View>

      {/* My Friends Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>My Friends</Text>
        <View style={styles.tableRow}>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_harish.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Harish</Text>
          </View>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_prashant.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Prashant</Text>
          </View>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_ashutosh.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Ashutosh</Text>
          </View>
        </View>
        <View style={[styles.tableRow, { marginTop: 20 }]}>
          <View style={styles.memberContainer}>
            <Image source={require('../assets/Images/media_rohit.jpg')} style={styles.circleImage} />
            <Text style={styles.memberName}>Rohit</Text>
          </View>
          <View style={styles.memberContainer}>
          <Icon name="add" size={60} borderColor="#D9B122" color="#D9B122" />
            <Text style={styles.memberName}>Add Member</Text>
          </View>
        </View>
      </View>
    </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
   
   
    padding: 10,
  },
  titleText : {
    color:"#fff",
    padding:20,
    fontSize:20,
    fontWeight:'bold'

},
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    paddingHorizontal: 20,
    color: '#000', // Replace with your color reference
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 23,
    color: '#FFD700', // Replace with your color reference for yellow_dark
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  memberContainer: {
    alignItems: 'center',
  },
  circleImage: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    borderWidth: 2,
    borderColor: '#FFD700', // Replace with civ_border_color equivalent
  },
  memberName: {
    fontSize: 15,
    color: '#fff', // Replace with text_color equivalent
    marginTop: 5,
  },
});

export default MyGroups;
