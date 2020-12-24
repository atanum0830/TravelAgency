import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUBhMmy7vbrHpAYSxdH8yrcyYEwGDBz24",
    authDomain: "monarchtravels-9ed67.firebaseapp.com",
    projectId: "monarchtravels-9ed67",
    storageBucket: "monarchtravels-9ed67.appspot.com",
    messagingSenderId: "283563375791",
    appId: "1:283563375791:web:85c0c21de41334e7dc685a",
    measurementId: "G-S737E65BHJ"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;