import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = ()=>{
  return(
    <Router>
      <Switch>
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/main" component={Main} />
    </Switch>
    </Router>
  )
}

ReactDOM.render(<App />,document.getElementById("root"));