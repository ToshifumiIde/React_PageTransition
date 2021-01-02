import React, { useState, useContext, useEffect } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";

const Main = ({ history }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const user = useContext(AuthContext);

  useEffect(() => {
    //firebaseから初期データを取得
    firebase
      .firestore()
      .collection("chatapp2-972c4")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          doc.data();
        });
        setMessages(messages);
      }); //誰かから追加があった場合、常にこのuseEffect()が実行され、chatの情報が追加される。
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return alert("メッセージを入力してください");
    setMessages([
      ...messages,
      {
        // user: "John",
        user: user.displayName,
        content: value,
      },
    ]);
    console.log(messages);
    console.log(user);
    setValue("");
  };

  return (
    <div>
      <p>Main</p>
      <ul>
        {messages.map((message) => {
          return (
            <li>
              <span>User : {message.user}</span>
              <span>Message : {message.content} </span>
            </li>
          );
        })}

        <li>sample user : sample message</li>
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
      <button
        onClick={() => {
          firebase.auth().signOut()
          .then(() => {
            history.push("/login");
            })
        }}
        // href="/signin"
      >
        Logout
      </button>
    </div>
  );
};

export default Main;
