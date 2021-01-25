//Contextの継承を定義//
import React, { useState, useEffect } from "react";
import { auth } from "./config/firebase";

const AuthContext = React.createContext();
//コンテキストオブジェクトを生成//

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //初回描写時、.onAuthStateChanged()を使用し、認証情報を確認
    auth.onAuthStateChanged((user) => {
    // firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
