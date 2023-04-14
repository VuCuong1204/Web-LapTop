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
import Login from "./View/Login";
import Signin from "./View/Signin";
import HomePage from "./View/HomePage";
import { useEffect } from "react";
import { getData } from "./Reducer/TableTestApi/test";

function App() {
  useEffect(() => {
    getData();
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signin" component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
