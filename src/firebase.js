import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCik50S_JR2plg6Vw1HSX4Sk2vbn785J_4",
  authDomain: "todo-app-react-7f324.firebaseapp.com",
  databaseURL: "https://todo-app-react-7f324.firebaseio.com",
  projectId: "todo-app-react-7f324",
  storageBucket: "todo-app-react-7f324.appspot.com",
  messagingSenderId: "613151809291",
  appId: "1:613151809291:web:19f0fa7430304a7a20cc0e",
  measurementId: "G-WKWX589ZCG",
});

const db = firebaseApp.firestore();

export { db };
