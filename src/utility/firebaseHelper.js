import firestore from '@react-native-firebase/firestore';

// Method to add geofence to Firestore


const getCurrentDateTimeId = () => {
  const now = new Date();
  return now.toISOString(); // Generates an ISO string as unique ID
};

const addSOSToFirestore = async (sosDoc) => {
  try {
    // Add a new geofence document with auto-generated ID
    const geofenceRef = await firestore()
      .collection('sos')
      .add(sosDoc);

    console.log('SOS created with id : ', geofenceRef.id);
  } catch (error) {
    console.error('Error creating sos : ', error);
  }
}

const addGeofenceToFirestore = async (geofence, userEmail) => {
  try {
    // Add a new geofence document with auto-generated ID
    const geofenceRef = await firestore()
      .collection('geofence')
      .add({
        id: geofence.id, // Unique ID for the geofence (you can use timestamp or other identifier)
        latitude: geofence.latitude,
        longitude: geofence.longitude,
        radius: geofence.radius,
        userId: userEmail
       // createdAt: firestore.FieldValue.serverTimestamp(), // Store server timestamp
      });

    console.log('Geofence added with ID: ', geofenceRef.id);
  } catch (error) {
    console.error('Error adding geofence: ', error);
  }
};


const addGeofenceEventsToFirestore = async (geofenceEvent) => {
  try {
    // Add a new geofence document with auto-generated ID
    const geofenceEventRef = await firestore()
      .collection('geofenceEvent')
      .add({
        id: geofenceEvent.id, // Unique ID for the geofence (you can use timestamp or other identifier)
        latitude: geofenceEvent.latitude,
        longitude: geofenceEvent.longitude,
        geofenceEventType: geofenceEvent.geofenceEventType,
        geofenceId: geofenceEvent.geofenceId,
        userId: geofenceEvent.userId,
        happenedAt: geofenceEvent.happenedAt
        
      });

    console.log('Geofence Event added with ID: ', geofenceEventRef.id);
  } catch (error) {
    console.error('Error adding geofence Event: ', error);
  }
};


// Method to fetch all geofences from Firestore
const fetchAllGeofences = async (userId) => {
    try {
      // Query the 'geofence' collection where the geofences match the provided userId
      const geofencesSnapshot = await firestore()
        .collection('geofence')
        .where('userId', '==', userId) // Filter by userId
        .get();
  
      if (!geofencesSnapshot.empty) {
        const geofences = geofencesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log('Fetched geofences for userId:', userId, geofences);
        return geofences; // Return the array of geofences
      } else {
        console.log('No geofences found for userId:', userId);
        return [];
      }
    } catch (error) {
      console.error('Error fetching geofences: ', error);
      return [];
    }
  };



  const removeAllGeofencesFromFirestoreByUserId = async (userId) => {
    try {
      // Query the 'geofence' collection where the geofences match the provided userId
      const geofencesCollection = firestore()
        .collection('geofence')
        .where('userId', '==', userId); // Filter by userId
  
      // Fetch all geofences matching the userId
      const snapshot = await geofencesCollection.get();
  
      // Check if there are any geofences to delete
      if (!snapshot.empty) {
        // Batch delete all geofences
        const batch = firestore().batch();
  
        snapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        // Commit the batch
        await batch.commit();
  
        console.log(`All geofences for userId ${userId} have been removed from Firestore.`);
      } else {
        console.log(`No geofences found for userId ${userId}.`);
      }
    } catch (error) {
      console.error('Error removing geofences:', error);
    }
  };
  
  


const removeAllGeofencesFromFirestore = async () => {
    try {
      // Reference to the 'geofence' collection
      const geofencesCollection = firestore().collection('geofence');
  
      // Fetch all geofences
      const snapshot = await geofencesCollection.get();
  
      // Check if there are any geofences to delete
      if (!snapshot.empty) {
        // Batch delete all geofences
        const batch = firestore().batch();
  
        snapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        // Commit the batch
        await batch.commit();
  
        console.log("All geofences have been removed from Firestore.");
      } else {
        console.log("No geofences to remove.");
      }
    } catch (error) {
      console.error("Error removing geofences: ", error);
    }
  };


export {addGeofenceToFirestore, fetchAllGeofences, removeAllGeofencesFromFirestore, removeAllGeofencesFromFirestoreByUserId, addGeofenceEventsToFirestore, addSOSToFirestore}
