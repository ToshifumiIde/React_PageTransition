import React, { useState, useContext } from "react";
import firebase from "firebase/app";
import { db } from "../config/firebase";
import { AuthContext } from "../AuthService";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Post.module.css";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#eee",
  },
  messageList: {
    listStyle: "none",
  },
});

export const Post = ({ history }) => {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [interviewee, setInterviewee] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [value, setValue] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishedTime, setFinishedTime] = useState("");
  const resetPost = () => {
    setTitle("");
    setInterviewee("");
    setConclusion("");
    setValue("");
    setStartTime("");
    setFinishedTime("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return alert("投稿内容を入力してください");
    db.collection("messages").add({
      user: user.displayName,
      title: title,
      interviewee: interviewee,
      conclusion: conclusion,
      content: value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      startTime: startTime,
      finishedTime: finishedTime,
    });
    resetPost();
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="title">投稿タイトル</label>
        <input
          id="title"
          placeholder="◯◯商談見積提示など"
          required
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="interviewee">面談者</label>
        <input
          id="interviewee"
          placeholder="◯◯社長など"
          required
          type="text"
          value={interviewee}
          onChange={(e) => {
            setInterviewee(e.target.value);
          }}
        />
        <label htmlFor="conclusion">結論</label>
        <input
          id="conclusion"
          required
          type="text"
          value={conclusion}
          onChange={(e) => {
            setConclusion(e.target.value);
          }}
        />
        <label htmlFor="text">詳細</label>
        <textarea
          cols="40"
          id="text"
          type="text"
          rows="4"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></textarea>
        <label htmlFor="time">面談時間</label>
        <input
          id="time"
          required
          step="900"
          type="time"
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />
        〜
        <input
          id="time"
          required
          type="time"
          value={finishedTime}
          step="900"
          onChange={(e) => {
            setFinishedTime(e.target.value);
          }}
        />
        <button type="submit" disabled={!title || !interviewee || !conclusion}>
          送信
        </button>
      </form>
    </>
  );
};
