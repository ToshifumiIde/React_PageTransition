import React from "react";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { Main } from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from "../LoggedInRoute";
import { AuthProvider } from "../AuthService";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <LoggedInRoute exact path="/" component={Main} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};
