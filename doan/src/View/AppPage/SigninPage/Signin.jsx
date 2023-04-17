import { Button, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  getMessageNoticeSignin,
  getUserInfo,
  stateGlobal,
} from "../../../Reducer/GlobalReducer/GlobalReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { openNotification } from "../../SupportView/Notification/Notification";
export default function Signin() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { messageNoticeSignin } = useSelector(stateGlobal);
  function handleSignin(e) {
    e.preventDefault();
    history.push("/Login");
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Không được để trống").nullable(),
      password: Yup.string().required("Không được để trống").nullable(),
      confirmpassword: Yup.string()
        .required("Không được để trống")
        .nullable()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng"),
    }),
    onSubmit: async (values) => {
      var formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      try {
        const response = await axios.post(
          "https://vuquoccuong.000webhostapp.com/web_laptop/register.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.code === 0) {
          dispatch(getUserInfo(response.data.data[0]));
          history.push("/");
          dispatch(openNotification("SUCCESS", "Đăng ký thành công"));
        } else {
          dispatch(getMessageNoticeSignin(response.data.msg));
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="web-laptop-layout">
      <div className="signin-form">
        <span className="borderLine"></span>
        <div className="web-laptop-signin-content">
          <div className="web-laptop-signin-logo"></div>
          <form
            onSubmit={formik.handleSubmit}
            className="web-laptop-login-form"
          >
            <div class="form-outline">
              <Input
                placeholder="Tên đăng nhập"
                id="username"
                className="username ant-input-signin-custom"
                onChange={(e) => {
                  formik.handleChange(e);
                  dispatch(getMessageNoticeSignin(""));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <div className="message-notice">
                {formik.touched.username && formik.errors.username ? (
                  <span className="text-danger">{formik.errors.username}</span>
                ) : null}
              </div>
            </div>
            <div class="form-outline">
              <Input.Password
                placeholder="Mật khẩu"
                id="password"
                className="password ant-input-password-signin-custom"
                onChange={(e) => {
                  formik.handleChange(e);
                  dispatch(getMessageNoticeSignin(""));
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
                  <span className="text-danger">{formik.errors.password}</span>
                ) : null}
              </div>
            </div>

            <div class="form-outline">
              <Input.Password
                placeholder="Xác nhận mật khẩu"
                id="confirmpassword"
                className="confirmpassword ant-input-password-signin-custom"
                onChange={(e) => {
                  formik.handleChange(e);
                  dispatch(getMessageNoticeSignin(""));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpassword}
                status={
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                    ? "error "
                    : ""
                }
              />
              <div className="message-notice">
                {formik.touched.confirmpassword &&
                formik.errors.confirmpassword ? (
                  <span className="text-danger">
                    {formik.errors.confirmpassword}
                  </span>
                ) : null}
                <span className="text-danger">{messageNoticeSignin}</span>
              </div>
            </div>

            <Button
              type="primary"
              onClick={formik.handleSubmit}
              className="mb-3 btn-red ant-btn-signin-custom"
            >
              Đăng Ký
            </Button>
            <Button
              type="primary"
              onClick={handleSignin}
              className="btn-red ant-btn-signin-custom"
            >
              Đăng Nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
