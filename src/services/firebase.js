import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyChO4ixlpjEZ0LfP-y2zrRf2nY049OssC8",
    authDomain: "rentwebsite1.firebaseapp.com",
    databaseURL: "https://rentwebsite1.firebaseio.com",
    projectId: "rentwebsite1",
    storageBucket: "rentwebsite1.appspot.com",
    messagingSenderId: "629420365792",
    appId: "1:629420365792:web:f9adbae90babbd06667d85",
    measurementId: "G-QNFDH3R0MX"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;