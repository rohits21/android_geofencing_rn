import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCswMQm_hFMpKTi-RIRgAur5uNAiUCxOQU',
  authDomain: 'cadenalocationsharingrn.firebaseapp.com',
  projectId: 'cadenalocationsharingrn',
  storageBucket: 'cadenalocationsharingrn.appspot.com',
  messagingSenderId: '719282494144',
  appId: '1:719282494144:web:e6f456d85b6676eb6eab25',
  measurementId: 'G-PLEFHWQK80',
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app = firebase.app();
}

// const db = firebase.firestore();
// const auth = firebase.auth();

// export { firebase };
