import React from "react";
import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Login from "./View/AppPage/LoginPage/Login";
import Signin from "./View/AppPage/SigninPage/Signin";
import HomePage from "./View/AppPage/HomePage/HomePage";
import { useEffect } from "react";
import { getData } from "./Reducer/TableTestApi/test";
import { NotificationContainer } from "react-notifications";

function App() {
  useEffect(() => {
    getData();
  }, []);
  return (
    <Router>
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signin" component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
