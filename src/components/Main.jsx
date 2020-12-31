import React, { useState, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";

const Main = () => {
  const [messages, setMessages] = useState("");
  const [value, setValue] = useState("");
  const user = useContext(AuthContext);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        user: "john",
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
