import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginApi,
  getMessageNotice,
  getUserInfo,
  stateGlobal,
} from "../../../Reducer/GlobalReducer/GlobalReducer";
import axios from "axios";
import { openNotification } from "../../SupportView/Notification/Notification";
export default function Login(props) {
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
          "https://vuquoccuong.000webhostapp.com/web_laptop/login.php",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.code === 0) {
          dispatch(getUserInfo(response.data.data[0]));
          history.push("/");
          dispatch(openNotification("SUCCESS", "Đăng nhập thành công"));
        } else {
          dispatch(getMessageNotice(response.data.msg));
        }
      } catch (err) {}
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
          <div className="web-laptop-logo"></div>
          <div className="web-laptop-loginform">
            <form
              onSubmit={formik.handleSubmit}
              className="web-laptop-login-form"
            >
              <div class="form-outline">
                <Input
                  placeholder="Tên đăng nhập"
                  id="username"
                  className="username ant-input-custom"
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
                  className="password ant-input-password-custom"
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
                onClick={formik.handleSubmit}
                className="mb-3 btn-red ant-btn-custom"
              >
                Đăng nhập
              </Button>
              <Button
                className="btn-red ant-btn-custom"
                type="primary"
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
