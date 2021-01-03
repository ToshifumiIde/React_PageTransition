import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from "../LoggedInRoute";

import { AuthProvider } from "../AuthService";

const App = () => {
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

export default App;
