import * as firebase from 'firebase/app';
import 'firebase/auth';
// import * as firebase from "firebase";
// import 'firebase/analytics';
// import "firebase/firestore";
// var firebase = require("firebase/app");


const firebaseConfig ={
  apiKey: "AIzaSyCc9hZzV5UXsCBpKVrKb7BKqrhk5gBi2vs",
  authDomain: "toshifumiide-calendar.firebaseapp.com",
  databaseURL: "https://toshifumiide-calendar.firebaseio.com",
  projectId: "toshifumiide-calendar",
  storageBucket: "toshifumiide-calendar.appspot.com",
  messagingSenderId: "511604151119",
  appId: "1:511604151119:web:81e32d9d438d4a11ef2b3a",
  measurementId: "G-F8WZCT33RB"
};

firebase.default.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
//firebase.defaultとdefaultオブジェクト？メソッド？を追加することで解決した
export default firebase;