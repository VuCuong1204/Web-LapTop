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
import ProductPage from "./View/AppPage/ProductPage/ProductPage";
import LoadingPage from "./View/SupportView/LoadingPage/LoadingPage";
import { useSelector } from "react-redux";
import { stateLoadingPage } from "./Reducer/LoadingReducer/LoadingPageReducer";
import PopUp from "./View/SupportView/PopUp/Popup";
import CartPage from "./View/AppPage/CartPage/CartPage";
import CheckoutPage from "./View/AppPage/CheckoutPage/CheckoutPage";
import ConfirmCartPage from "./View/AdminPage/ConfirmCartPage";
import SearchByProducer from "./View/AppPage/SearchByProducer/SearchByProducer";
import PaymentPage from "./View/AppPage/CheckoutPage/PaymentPage";

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

  return online ? (
    <Router>
      <PopUp />
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/SearchByProducer" component={SearchByProducer} />
        <Route exact path="/Payment" component={PaymentPage} />
        <Route exact path="/ProductPage/:id" component={ProductPage} />
        <Route exact path="/Signin" component={Signin} />
        <Route exact path="/NotFound" component={PageNotFound} />
        <Route exact path="/Profile" render={() => {
          return <TemplateProfilePage
            Title="Thông tin tài khoản"
            Component=<ProfilePage /> />
        }} />

        <Route excact path="/Cart" component={CartPage} />
        <Route excact path="/CheckOut" component={CheckoutPage} />

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

        <Route exact path="/ConfirmCart" render={() => {
          return <TemplateProfilePage
            Title="Xác nhận đơn hàng"
            Component=<ConfirmCartPage /> />
        }} />
        <Redirect to="/NotFound" />
      </Switch>
    </Router>
  ) : (<NoConectionPage />);
}

export default App;
