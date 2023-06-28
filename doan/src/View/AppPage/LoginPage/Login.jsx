import { Button, Input } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  getMessageNotice,
  getUserInfo,
  stateGlobal,
} from "../../../Reducer/GlobalReducer/GlobalReducer";
import { openNotification } from "../../SupportView/Notification/Notification";
import { URLAPI } from "../../../Template/systemConfig";
import { useEffect } from "react";
import { setTrueLoading } from "../../../Reducer/LoadingReducer/LoadingPageReducer";
import { selected0 } from "../../../Reducer/CartReducer/CartReducer";
export default function Login(props) {
  useEffect(() => {
    document.title = "Đăng nhập"
  })
  const { messageNotice } = useSelector(stateGlobal);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Không được để trống").nullable(),
      password: Yup.string().required("Không được để trống").nullable(),
    }),
    onSubmit: async (values) => {
      let data = new FormData();
      data.append("username", values.username);
      data.append("password", values.password);

      try {
        const response = await axios.post(
          `${URLAPI}/login.php`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.code === 0) {
          dispatch(getUserInfo(response.data.data[0]));
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify(response.data.data[0])
          );
          let formdata = new FormData();
          formdata.append("accountId", response.data.data[0].id);
          formdata.append("cartSelected", 0);
          dispatch(selected0(formdata))
          if (sessionStorage.getItem("pathName")) {
            dispatch(setTrueLoading())
            history.push(JSON.parse(sessionStorage.getItem("pathName")));
            sessionStorage.removeItem("pathName");
            dispatch(openNotification("SUCCESS", "Đăng nhập thành công"));
          }
          else {
            dispatch(setTrueLoading())
            history.push("/");
            dispatch(openNotification("SUCCESS", "Đăng nhập thành công"));
          }
        } else {
          dispatch(getMessageNotice(response.data.msg));
        }
      } catch (err) { }
    },
  });

  let history = useHistory();
  function handleSignin(e) {
    e.preventDefault();
    history.push("/Signin");
  }
  return (
    <div className="web-laptop-layout">
      <div className="login-form">
        <span className="borderLine"></span>
        <div className="web-laptop-login-content">
          <Button
            type="link"
            onClick={() => {
              history.push("/");
            }}
            style={{
              width: 300,
              padding: 0,
            }}
          >
            <div className="web-laptop-login-logo"></div>
          </Button>
          <div className="web-laptop-loginform">
            <form
              onSubmit={formik.handleSubmit}
              className="web-laptop-login-form"
            >
              <div class="form-outline">
                <Input
                  placeholder="Tên đăng nhập"
                  id="username"
                  className={formik.touched.username && formik.errors.username ? "username ant-input-custom error" : "username ant-input-custom"}
                  onChange={(e) => {
                    formik.handleChange(e);
                    dispatch(getMessageNotice(""));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                <div className="message-notice">
                  {formik.touched.username && formik.errors.username ? (
                    <span className="text-danger">
                      {formik.errors.username}
                    </span>
                  ) : null}
                </div>
              </div>
              <div class="form-outline">
                <Input.Password
                  placeholder="Mật khẩu"
                  id="password"
                  className={formik.touched.password && formik.errors.password ? "password ant-input-password-custom error" : "password password ant-input-password-custom"}
                  onChange={(e) => {
                    formik.handleChange(e);
                    dispatch(getMessageNotice(""));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  status={
                    formik.touched.password && formik.errors.password
                      ? "error "
                      : ""
                  }
                />
                <div className="message-notice">
                  {formik.touched.password && formik.errors.password ? (
                    <span className="text-danger">
                      {formik.errors.password}
                    </span>
                  ) : (
                    <span className="text-danger">{messageNotice}</span>
                  )}
                </div>
              </div>

              <Button
                type="primary"
                danger
                onClick={formik.handleSubmit}
                className="mb-3 ant-btn-custom"
              >
                Đăng nhập
              </Button>
              <Button
                className="ant-btn-custom"
                type="primary"
                danger
                onClick={handleSignin}
              >
                Đăng Ký
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
