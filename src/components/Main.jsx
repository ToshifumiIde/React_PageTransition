import React, { useState, useContext, useEffect } from "react";
import { db, auth } from "../config/firebase";
import firebase from "firebase/app";
import { AuthContext } from "../AuthService";
// import { Link as Lnk } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#eee",
  },
  messageList: {
    listStyle: "none",
  },
});

const Main = ({ history }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const user = useContext(AuthContext);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessages(messages);
      });
  }, []);
  console.log(user.displayName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return alert("メッセージを入力してください");
    db.collection("messages").add({
      content: value,
      user: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div>
      <p>Main</p>
      <p>ログインユーザーアドレス：{user ? user.email : "...loading"}</p>
      <ul>
        {messages.map((message, index) => {
          return (
            <li key={index} className={classes.messageList}>
              <span>User : {message.user}</span>
              <span>Message : {message.content} </span>
              {/* <span>Time : {message.createdAt}</span> */}
            </li>
          );
        })}
      </ul>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit">送信</button>
      </form>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Main;
