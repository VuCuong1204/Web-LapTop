import { Button, Input } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import { setMessageNoticeChangePassword, stateProfile } from "../../../Reducer/ProfileReducer/ProfileReducer";
import { URLAPI } from "../../../Template/systemConfig";
import { openNotification } from "../../SupportView/Notification/Notification";
import { useEffect } from "react";

export default function ChangePassWordPage(props) {
  useEffect(() => {
    document.title = "Đổi mật khẩu"
    return () => {
      dispatch(setMessageNoticeChangePassword(""))
    }
  },[])
  const { userInfo } = useSelector(stateGlobal)
  const { messageNoticeChangePassword } = useSelector(stateProfile)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("Không được để trống").nullable(),
      newpassword: Yup.string().required("Không được để trống").nullable(),
      confirmpassword: Yup.string()
        .required("Không được để trống")
        .nullable()
        .oneOf([Yup.ref("newpassword"), null], "Mật khẩu mới không trùng"),
    }),
    onSubmit: async (values) => {
      let data = new FormData();
      data.append("id", userInfo.id);
      data.append("password_old", values.password);
      data.append("password_new", values.newpassword);
      try {
        const response = await axios.post(
          `${URLAPI}/change_password.php`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.code === 0) {
          formik.resetForm();
          dispatch(openNotification("SUCCESS", "Đổi mật khẩu thành công"));
        } else {
          dispatch(setMessageNoticeChangePassword(response.data.msg))
          dispatch(openNotification("ERROR", "Đổi mật khẩu thất bại"))
        }
      } catch (err) { }
    }
  })

  return (<>
    <div className="web-laptop-profile-col2-title">
      <h1>Đổi mật khẩu</h1>
    </div>
    <div>
      <div className="web-laptop-profile-col2-changepassword-content">
        <div className="web-laptop-profile-col2-changepassword-content-column">
          <div className="web-laptop-profile-col2-changepassword-content-column-children">
            <div className="d-flex align-items-center">
              <div style={{ width: "20%" }}>
                <label>Mật khẩu hiện tại</label>
              </div>
              <div style={{ width: "50%" }}>
                <Input.Password
                  id="password"
                  onChange={(e) => {
                    formik.handleChange(e)
                    dispatch(setMessageNoticeChangePassword(""));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  style={{
                    width: "100%",
                    height: 40
                  }}
                  className={formik.touched.password && formik.errors.password ? "error" : ""}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <span className="text-danger p-2">{formik.errors.password}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="web-laptop-profile-col2-changepassword-content-column">
          <div className="web-laptop-profile-col2-changepassword-content-column-children">
            <div className="d-flex align-items-center">
              <div style={{ width: "20%" }}>
                <label>Mật khẩu mới</label>
              </div>
              <div style={{ width: "50%" }}>
                <Input.Password
                  id="newpassword"
                  onChange={(e) => {
                    formik.handleChange(e)
                    dispatch(setMessageNoticeChangePassword(""));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.newpassword}
                  style={{
                    width: "100%",
                    height: 40
                  }}
                  className={formik.touched.newpassword && formik.errors.newpassword ? "error" : ""}
                />
              </div>
              {formik.touched.newpassword && formik.errors.newpassword ? (
                <span className="text-danger p-2">{formik.errors.newpassword}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="web-laptop-profile-col2-changepassword-content-column">
          <div className="web-laptop-profile-col2-changepassword-content-column-children">
            <div className="d-flex align-items-center">
              <div style={{ width: "20%" }}>
                <label>Xác nhận mật khẩu</label>
              </div>
              <div style={{ width: "50%" }}>
                <Input.Password
                  id="confirmpassword"
                  onChange={(e) => {
                    formik.handleChange(e)
                    dispatch(setMessageNoticeChangePassword(""));
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpassword}
                  style={{
                    width: "100%",
                    height: 40
                  }}
                  className={formik.touched.confirmpassword && formik.errors.confirmpassword ? "error" : ""}
                />
              </div>
              {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                <span className="text-danger p-2">{formik.errors.confirmpassword}</span>
              ) : <span className="text-danger p-2">{messageNoticeChangePassword}</span>}
            </div>
          </div>
        </div>
        <div className="web-laptop-profile-col2-changepassword-content-column">
          <div className="d-flex justify-content-end col-2"></div>
          <div className="d-flex"
            style={{
              width: "50%",
              paddingLeft: "1.55rem",
              paddingRight: "1.25rem"
            }}>
            <Button
              type="primary"
              style={{
                borderRadius: 6,
                height: 40,
                fontSize: 18
              }}
              danger
              onClick={formik.handleSubmit}
              className="col-4 btn-save"
            >
              Lưu</Button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
