import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Header/Header";
import { useEffect } from "react";

export default function PageNotFound(props) {
  const history = useHistory();
  useEffect(() => {
    document.title = "NotFound"
  })
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
            <p className="h2">404</p>
            <p className="h2">Không tìm thấy trang hiện tại</p>
            <Button
              type="primary"
              onClick={() => {
                history.push("/");
              }}
              danger
              style={{
                borderRadius: 8,
                width : 150,
                height: 40
              }}
            >
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
