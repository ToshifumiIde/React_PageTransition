import React from "react";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { Main } from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggedInRoute from "../LoggedInRoute";
import { AuthProvider } from "../AuthService";
import dayjs from "dayjs";
import DayjsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
dayjs.locale("ja");

export const App = () => {
  return (
    <AuthProvider>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <Router>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <LoggedInRoute exact path="/" component={Main} />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </AuthProvider>
  );
};
