import React , {useState} from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Main from "./Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = ()=>{
  // const [email , setEmail] = useState("");
  // const [password , setPassword] = useState("");

  return(
    <Router>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/main" component={Main} />
      </Switch>
    </Router>
  )
}

export default App;
// ReactDOM.render(<App />,document.getElementById("root"));