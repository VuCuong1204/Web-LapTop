import { Button } from "antd";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import Header from "../../Header/Header";
import { useEffect } from "react";

export default function AuthPage(props) {
  useEffect(() => {
    document.title = "Enough Auth"
  })
  const history = useHistory();
  const { userInfo } = useSelector(stateGlobal);
  return (
    <>
      <Header />
      <div
        className="justify-content-center align-content-center"
        style={{
          height: 600,
          width: 1200,
          position: "relative",
          margin: "0 auto",
        }}
      >
        <div
          className="justify-content-center"
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className=""
            style={{
              textAlign: "center",
              height: 300,
            }}
          >
            <div className="web-laptop-page-logo"></div>
            {_.isEmpty(userInfo) ? (
              <>
                <p className="h2"></p>
                <p className="h2">
                  Bạn cần đăng nhập để sử dụng trang hiện tại
                </p>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push("/");
                  }}
                  danger
                  style={{
                    borderRadius: 8,
                    width: 150,
                    height: 40,
                  }}
                >
                  Về trang chủ
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    sessionStorage.setItem("pathName", JSON.stringify(window.location.pathname))
                    history.push("/Login");
                  }}
                  danger
                  style={{
                    marginLeft: 20,
                    borderRadius: 8,
                    width: 150,
                    height: 40,
                  }}
                >
                  Đăng nhập
                </Button>
              </>
            ) : (
              <>
                <p className="h2">401</p>
                <p className="h2">
                  Bạn không đủ quyền để sử dụng trang hiện tại
                </p>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push("/");
                  }}
                  danger
                  style={{
                    borderRadius: 8,
                    width: 150,
                    height: 40,
                  }}
                >
                  Về trang chủ
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
