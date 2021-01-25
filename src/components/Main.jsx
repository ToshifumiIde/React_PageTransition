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
  const user = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [interviewee, setInterviewee] = useState("");
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([
    {
      // id:"",
      title: "",
      interviewee:"",
      content: "",
      user: "",
      timestamp: null,
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          title: doc.data().title,
          interviewee:doc.data().interviewee,
          content: doc.data().content,
          user: doc.data().user,
          timestamp: doc.data().timestamp,
        }));
        setMessages(messages);
        // );
      });
    return () => {
      unSub();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return alert("メッセージを入力してください");
    db.collection("messages").add({
      title: title,
      content: value,
      user: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
    setTitle("");
    setInterviewee("");
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
              <span>タイトル：{message.title}</span>
              <span>Message : {message.content} </span>
              <span>
                投稿日：
                {new Date(message.timestamp?.toDate()).getFullYear()}年{"  "}
                {new Date(message.timestamp?.toDate()).getMonth() + 1}月{"  "}
                {new Date(message.timestamp?.toDate()).getDate()}日{"  "}
              </span>
            </li>
          );
        })}
      </ul>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="title">投稿タイトル</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="interviewee">面談者</label>
        <input
          id="interviewee"
          type="text"
          value={interviewee}
          onChange={(e) => {
            setInterviewee(e.target.value);
          }}
        />
        <label htmlFor="text">投稿内容</label>
        <input
          id="text"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <button type="submit" disabled={!title || !value || !interviewee}>
          送信
        </button>
      </form>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Main;
