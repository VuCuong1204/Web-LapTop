import { Button } from "antd";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { stateGlobal } from "../../Reducer/GlobalReducer/GlobalReducer";
import AuthPage from "../AppPage/AuthPage/AuthPage";
import Header from "../Header/Header";

export default function TemplateProfilePage(props) {
  const { userInfo } = useSelector(stateGlobal);
  const history = useHistory();
  return (
    <>
      {_.isEmpty(userInfo) ? (
        <AuthPage />
      ) : (
        <>
          <Header />
          <div
            className="d-flex web-laptop-profile-content"
            style={{

            }}
          >
            <div className="web-laptop-profile-col1">
              <div className="web-laptop-profile-col1-content">
                <div className="d-flex">
                  <Button type="link" onClick={() => {
                    history.push("/Profile");
                  }}
                  >
                    <span className="profile-title">Thông tin cá nhân</span>
                  </Button>
                </div>
                <div className="d-flex pt-3">
                  <Button type="link" onClick={() => {
                    history.push("/ChangePassword");
                  }}
                  >
                    <span className="profile-title">Đổi mật khẩu</span>
                  </Button>
                </div>
                <div className="d-flex pt-3">
                  <Button type="link" onClick={() => {
                    history.push("/Addresses");
                  }}
                  >
                    <span className="profile-title">Địa chỉ</span>
                  </Button>
                </div>
                <div className="d-flex pt-3">
                  <Button type="link" onClick={() => {
                    history.push("/Bill");
                  }}
                  >
                    <span className="profile-title">Đơn mua</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="web-laptop-profile-col2">
              {props.Component}
            </div>
          </div>
        </>
      )}
    </>
  );
}
