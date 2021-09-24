import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import Login from "./components/entry/Login";
import SignUp from "./components/entry/SignUp";
import Home from "./components/Home";
import LoginGuardRoute from "./LoginGuardRoute";

import "./styles.scss";

const App = () => {
  const history = useHistory();

  return (
    <Router>
      <Switch>
        <LoginGuardRoute path="/login" component={Login} />
        <LoginGuardRoute path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
