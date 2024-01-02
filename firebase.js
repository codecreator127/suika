import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH7ts9wm8v-YUHfCOXrSsRNgxUejj4B_o",
  authDomain: "suika-e91cc.firebaseapp.com",
  projectId: "suika-e91cc",
  storageBucket: "suika-e91cc.appspot.com",
  messagingSenderId: "560969905130",
  appId: "1:560969905130:web:265a35652977ee30783893",
  measurementId: "G-3WLNF6L3Z1"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();


export {db, storage}