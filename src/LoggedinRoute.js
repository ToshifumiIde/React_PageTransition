import React from "react";
import { Route , Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";

const LoggedInRoute =({component:Component , ...rest}) =>{
  const user = useContext(AuthContext);

  return(
    <Route
      {...rest}//渡す関数を...restでスプレッド構文化
      render = {props => {
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login"/>
        )
      }}
    />
  )
};

export default LoggedInRoute;