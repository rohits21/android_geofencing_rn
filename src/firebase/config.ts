import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBlYqvkBNrBqxR-bsdGNS4JLUKU6pR0HyY",
  authDomain: "flavour-ba610.firebaseapp.com",
  projectId: "flavour-ba610",
  storageBucket: "flavour-ba610.appspot.com",
  messagingSenderId: "1079342389440",
  appId: "1:1079342389440:web:a027234653ec54fbaa7525"
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

// const db = firebase.firestore();
// const auth = firebase.auth();

// export { firebase };
