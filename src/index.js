import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Main from "./components/Main";

const App = ()=>{
  return(
    <>
    <SignUp />
    <SignIn />
    <Main />
    </>
  )
}

ReactDOM.render(<App />,document.getElementById("root"));