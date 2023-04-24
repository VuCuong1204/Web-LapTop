import React, { useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import "./App.css";
import { getData } from "./Reducer/TableTestApi/test";
import AddressPage from "./View/AppPage/AddressPage/AddressPage";
import ChangePassWordPage from "./View/AppPage/ChangePassword/ChangePasswordPage";
import HomePage from "./View/AppPage/HomePage/HomePage";
import Login from "./View/AppPage/LoginPage/Login";
import PageNotFound from "./View/AppPage/PageNotFound/PageNotFound";
import ProfilePage from "./View/AppPage/ProfilePage/ProfilePage";
import Signin from "./View/AppPage/SigninPage/Signin";
import Footer from "./View/Footer/Footer";
import TemplateProfilePage from "./View/TemplateProfile/TemplateProfilePage";
import "./index.css";
import NoConectionPage from "./View/AppPage/NoConection/NoConection";
import BillPage from "./View/AppPage/BillPage/BillPage";

function App() {

  const [online, setOnline] = useState([true]);
  useEffect(() => {
    window.addEventListener("offline", function (e) {
      setOnline(false)
    })
    window.addEventListener("online", function (e) {
      setOnline(true)
    })
  }, [])

  useEffect(() => {
    getData();
  }, []);
  return online ? (
    <Router>
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Login/:id" component={Footer} />
        <Route exact path="/Signin" component={Signin} />
        <Route exact path="/NotFound" component={PageNotFound} />
        <Route exact path="/Profile" render={() => {
          return <TemplateProfilePage
            Title="Thông tin tài khoản"
            Component=<ProfilePage /> />
        }} />

        <Route exact path="/ChangePassword" render={() => {
          return <TemplateProfilePage
            Title="Đổi mật khẩu"
            Component=<ChangePassWordPage /> />
        }} />

        <Route exact path="/Addresses" render={() => {
          return <TemplateProfilePage
            Title="Địa chỉ"
            Component=<AddressPage /> />
        }} />

        <Route exact path="/Bill" render={() => {
          return <TemplateProfilePage
            Title="Đơn mua"
            Component=<BillPage /> />
        }} />
        <Redirect to="/NotFound" />
      </Switch>
    </Router>
  ) : (<NoConectionPage />);
}

export default App;
