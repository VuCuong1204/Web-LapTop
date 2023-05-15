import { Button, Input } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import { setTrueLoadingSpin } from "../../../Reducer/LoadingReducer/LoadingPageReducer";
import { editProfileAction, setMessageNoticeEditProfile, stateProfile } from "../../../Reducer/ProfileReducer/ProfileReducer";
import { REGEX_PHONE_NUMBER_VN } from "../../../Template/Regex";


export default function ProfilePage(props) {
    useEffect(() => {
        document.title = "Thông tin tài khoản"
        return () => {
            dispatch(setMessageNoticeEditProfile(""));
        }
    }, [])
    const { userInfo } = useSelector(stateGlobal);
    const { messageNoticeEditProfile } = useSelector(stateProfile);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: userInfo.id,
            fullname: userInfo.full_name,
            email: userInfo.email,
            phone: userInfo.phone
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().required("Không được để trống").nullable(),
            email: Yup.string().required("Không được để trống").nullable().email("Sai định dạng email"),
            phone: Yup.string().required("Không được để trống").nullable().matches(REGEX_PHONE_NUMBER_VN, "Sai định dạng số điện thoại VN"),
        }),
        onSubmit: (values) => {
            let data = new FormData();
            data.append("id", values.id);
            data.append("fullname", values.fullname)
            data.append("email", values.email)
            data.append("phone", values.phone)
            dispatch(editProfileAction(data))
        }
    })

    return (
        <>
            <div className="web-laptop-profile-col2-title">
                <h1>Thông tin cá nhân</h1>
            </div>
            <div>
                <div className="web-laptop-profile-col2-changepassword-content">
                    <div className="web-laptop-profile-col2-changepassword-content-column">
                        <div className="web-laptop-profile-col2-changepassword-content-column-children">
                            <div className="d-flex align-items-center">
                                <div style={{ width: "20%" }}>
                                    <label>Tên đăng nhập</label>
                                </div>
                                <div style={{ width: "50%" }}>
                                    <Input
                                        disabled
                                        id="username"
                                        value={userInfo.use_name}
                                        style={{
                                            width: "100%",
                                            height: 40
                                        }}
                                        className={formik.touched.newpassword && formik.errors.newpassword ? "error" : ""}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="web-laptop-profile-col2-changepassword-content-column">
                        <div className="web-laptop-profile-col2-changepassword-content-column-children">
                            <div className="d-flex align-items-center">
                                <div style={{ width: "20%" }}>
                                    <label>Họ và tên</label>
                                </div>
                                <div style={{ width: "50%" }}>
                                    <Input
                                        id="fullname"
                                        onChange={(e) => {
                                            formik.handleChange(e)
                                            dispatch(setMessageNoticeEditProfile(""));
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fullname}
                                        style={{
                                            width: "100%",
                                            height: 40
                                        }}
                                        className={formik.touched.fullname && formik.errors.fullname ? "error" : ""}

                                    />
                                </div>
                                {formik.touched.fullname && formik.errors.fullname ? (
                                    <span className="text-danger p-2">{formik.errors.fullname}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="web-laptop-profile-col2-changepassword-content-column">
                        <div className="web-laptop-profile-col2-changepassword-content-column-children">
                            <div className="d-flex align-items-center">
                                <div style={{ width: "20%" }}>
                                    <label>Email</label>
                                </div>
                                <div style={{ width: "50%" }}>
                                    <Input

                                        id="email"
                                        onChange={(e) => {
                                            formik.handleChange(e)
                                            dispatch(setMessageNoticeEditProfile(""));
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        style={{
                                            width: "100%",
                                            height: 40
                                        }}
                                        className={formik.touched.email && formik.errors.email ? "error" : ""}

                                    />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <span className="text-danger p-2">{formik.errors.email}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="web-laptop-profile-col2-changepassword-content-column">
                        <div className="web-laptop-profile-col2-changepassword-content-column-children">
                            <div className="d-flex align-items-center">
                                <div style={{ width: "20%" }}>
                                    <label>Số điện thoại</label>
                                </div>
                                <div style={{ width: "50%" }}>
                                    <Input
                                        id="phone"
                                        onChange={(e) => {
                                            formik.handleChange(e)
                                            dispatch(setMessageNoticeEditProfile(""));
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        style={{
                                            width: "100%",
                                            height: 40
                                        }}
                                        className={formik.touched.phone && formik.errors.phone ? "error" : ""}

                                    />

                                </div>
                                {formik.touched.phone && formik.errors.phone ? (
                                    <span className="text-danger p-2">{formik.errors.phone}</span>
                                ) : <span className="text-danger p-2">{messageNoticeEditProfile}</span>}
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
                                onClick={(e) => {
                                    formik.handleSubmit(e)
                                    dispatch(setTrueLoadingSpin())
                                }}
                                className="col-4 btn-save"
                            >
                                Lưu</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}