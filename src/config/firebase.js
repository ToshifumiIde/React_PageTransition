import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import * as firebase from "firebase";
// import 'firebase/analytics';
// import "firebase/firestore";
// var firebase = require("firebase/app");


const firebaseConfig = {
  apiKey: "AIzaSyBe89HC1jt0C7kYpBxvixSB-AsRJpBllZA",
  authDomain: "chatapp2-972c4.firebaseapp.com",
  databaseURL: "https://chatapp2-972c4.firebaseio.com",
  projectId: "chatapp2-972c4",
  storageBucket: "chatapp2-972c4.appspot.com",
  messagingSenderId: "755396197947",
  appId: "1:755396197947:web:f5ff2d828f6bcb3fbb661e",
  measurementId: "G-DBGT3Q5M0T"
};

firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
//firebase.defaultとdefaultオブジェクト？メソッド？を追加することで解決した
export default firebase;