import React, { useState, useContext , useEffect } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const user = useContext(AuthContext);

  useEffect(()=> {
    firebase.firestore().collection("messages")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map(doc =>{
          return doc.data()
        })
        setMessages(messages);
      })
  } , {})

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        user:"John",
        // user: user.displayName,
        content: value,
      },
    ]);
    console.log(messages);
    console.log(user);
  };

  return (
    <div>
      <p>Main</p>
      <ul>
        {messages.map(message => {
          return(
            <li>
              <span>User : {message.user}</span>
              <span>Message : {message.content} </span>
            </li>
          )
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
      <button onClick={() =>
        firebase.auth().signOut()
      }>
        Logout
      </button>
    </div>
  );
};

export default Main;
