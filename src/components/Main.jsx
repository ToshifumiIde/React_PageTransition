import React, { useState, useContext, useEffect } from "react";
import { db, auth } from "../config/firebase";
// import firebase from "firebase/app";
import { AuthContext } from "../AuthService";
import { makeStyles } from "@material-ui/core/styles";
import { Post } from "./Post";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#eee",
  },
  messageList: {
    listStyle: "none",
  },
});

export const Main = ({ history }) => {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const [messages, setMessages] = useState([
    {
      // id:"",
      title: "",
      interviewee: "",
      conclusion: "",
      content: "",
      user: "",
      timestamp: null,
      interviewDay: null,
      startTime: null,
      finishedTime: null,
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          title: doc.data().title,
          interviewee: doc.data().interviewee,
          content: doc.data().content,
          user: doc.data().user,
          timestamp: doc.data().timestamp,
          interviewDay: doc.data().interviewDay,
          startTime: doc.data().startTime,
          finishedTime: doc.data().finishedTime,
        }));
        setMessages(messages);
      });
    return () => {
      unSub();
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div>
      <p>Main</p>
      <p>ログインユーザー：{user ? user.displayName : "...loading"}</p>
      <ul>
        {messages.map((message, index) => {
          return (
            <li key={index} className={classes.messageList}>
              <span>担当 : {message.user}</span>
              <span>面談者 : {message.interviewee} </span>
              <span>タイトル : {message.title}</span>
              <span>面談内容 : {message.content} </span>
              <span>
                面談日時 : 
                {new Date(message.interviewDay?.toDate()).getFullYear()}年{"  "}
                {new Date(message.interviewDay?.toDate()).getMonth() + 1}月{"  "}
                {new Date(message.interviewDay?.toDate()).getDate()}日{"  "}
                {message.startTime}〜{message.finishedTime}
              </span>
              <span>
                投稿日：
                {new Date(message.timestamp?.toDate()).getFullYear()}年{" "}
                {new Date(message.timestamp?.toDate()).getMonth() + 1}月{" "}
                {new Date(message.timestamp?.toDate()).getDate()}日{" "}
              </span>
            </li>
          );
        })}
      </ul>
      <Post />
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
