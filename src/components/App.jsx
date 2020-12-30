import React  from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Main   from "./Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { AuthProvider } from "../AuthService";

const App = () => {
  return(
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/"       component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/main"   component=  {Main} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;