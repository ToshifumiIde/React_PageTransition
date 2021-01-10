import React, { useState, useContext, useEffect } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";
// import { Link as Lnk } from "react-router-dom";

const Main = ({ history }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const user = useContext(AuthContext);

  useEffect(() => {
    //firebaseから初期データを取得
    firebase
      .firestore()
      .collection("messages")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessages(messages);
      }); //誰かから追加があった場合、常にこのuseEffect()が実行され、chatの情報が追加される。
  }, []);
  console.log(user.displayName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return alert("メッセージを入力してください");
    firebase.firestore().collection("messages").add({
      content: value,
      user: user.displayName,
    });
    setValue("");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
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
            <li key={index}>
              <span>User : {message.user}</span>
              <span>Message : {message.content} </span>
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
