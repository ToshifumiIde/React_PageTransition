import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_FIREBASE_AUTH_DOMAIN,
//   REACT_APP_FIREBASE_DATABASE_URL,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET,
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   REACT_APP_FIREBASE_APP_ID,
//   REACT_APP_FIREBASE_MEASUREMENT_ID,
// } = process.env;

const firebaseConfig = {
  // apiKey: REACT_APP_FIREBASE_API_KEY,
  // authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: REACT_APP_FIREBASE_APP_ID,
  // measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyBe89HC1jt0C7kYpBxvixSB-AsRJpBllZA",
  authDomain: "chatapp2-972c4.firebaseapp.com",
  databaseURL: "https://chatapp2-972c4.firebaseio.com",
  projectId: "chatapp2-972c4",
  storageBucket: "chatapp2-972c4.appspot.com",
  messagingSenderId: "755396197947",
  appId: "1:755396197947:web:f5ff2d828f6bcb3fbb661e",
  measurementId: "G-DBGT3Q5M0T",
};

firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
//firebase.defaultとdefaultオブジェクト？メソッド？を追加することで解決した
export default firebase;