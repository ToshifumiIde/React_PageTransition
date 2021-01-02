import React ,{ useContext } from "react";
import { Route , Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";

const LoggedInRoute =({ component: Component , ...rest }) => {
  const user = useContext(AuthContext);
  console.log(user);
  return(
    <Route
      {...rest}//渡す関数を{...rest}でスプレッド構文として全て展開
      render = {routeProps => {
        user ? (
          <Component { ...routeProps } />
        ) : (
          <Redirect to="/login" />
        )
      }}
    />
  )
};

export default LoggedInRoute;