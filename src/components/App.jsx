import React  from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Main   from "./Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import LoggedInRoute from "../LoggedInRoute";

import { AuthProvider } from "../AuthService";

const App = () => {
  return(
    <AuthProvider>
      <Router>
        <Switch>
          {/* <LoggedInRoute path="/main"   component= {Main} /> */}
          <Route exact path="/"       component={SignUp} />
          <Route exact path="/login"  component={Login} />
          <Route exact path="/main"   component= {Main} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;