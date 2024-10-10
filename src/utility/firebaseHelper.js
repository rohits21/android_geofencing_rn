import firestore from '@react-native-firebase/firestore';

// Method to add geofence to Firestore
const addGeofenceToFirestore = async (geofence) => {
  try {
    // Add a new geofence document with auto-generated ID
    const geofenceRef = await firestore()
      .collection('geofence')
      .add({
        id: geofence.id, // Unique ID for the geofence (you can use timestamp or other identifier)
        latitude: geofence.latitude,
        longitude: geofence.longitude,
        radius: geofence.radius,
        userId: "rohit@gmail.com"
       // createdAt: firestore.FieldValue.serverTimestamp(), // Store server timestamp
      });

    console.log('Geofence added with ID: ', geofenceRef.id);
  } catch (error) {
    console.error('Error adding geofence: ', error);
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


export {addGeofenceToFirestore, fetchAllGeofences, removeAllGeofencesFromFirestore, removeAllGeofencesFromFirestoreByUserId}
