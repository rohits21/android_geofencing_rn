 import firestore from '@react-native-firebase/firestore';
 import { useState, useEffect } from 'react';

const getGeofenceAlerts = () => {
  const [geofenceActivities, setGeofenceActivities] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('geofenceTransitionEvents')
      .onSnapshot(querySnapshot => {
        const activities = [];
        querySnapshot.forEach(documentSnapshot => {
          activities.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setGeofenceActivities(activities);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return geofenceActivities;
};

export default getGeofenceAlerts;
