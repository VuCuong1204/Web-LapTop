import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBillLast, stateBillUser } from "../../../Reducer/BillReducer/BillReducer";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { changeStatusPaymentUser } from "../../../Reducer/BillAdminReducer/BillAdminReducer";
import AuthPage from "../AuthPage/AuthPage";
import _ from "lodash";


export default function PaymentPage(props) {
    const { billLast } = useSelector(stateBillUser)
    const { userInfo } = useSelector(stateGlobal)
    const dispatch = useDispatch()
    useEffect(() => {
        let data = new FormData();
        data.append("accountId", userInfo.id)
        dispatch(getBillLast(data))
    }, [])
    const history = useHistory()
    return (
        <>
            {
                _.isEmpty(userInfo) ? (<AuthPage />) : (
                    billLast.status === "0" || billLast.statusPayment === "1" || billLast.status === "3" ? (
                        <>
                            <Header />
                            <div className="homepage">
                                <div className="web-laptop-container p-3" style={{ backgroundColor: "#fff", minHeight: 600 }}>
                                    <div className="text-center">
                                        <p className="text-red" style={{ fontSize: 40 }}>Bạn không có hóa đơn để thanh toán</p>
                                        <p className="text-red" style={{ fontSize: 40 }}>Vui lòng quay lại trang chủ để mua hàng</p>
                                        <div>
                                            <Button
                                                danger
                                                type="primary"
                                                style={{ height: 40, borderRadius: 5 }}

                                            >
                                                Về trang chủ
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </>
                    ) : (
                        <>
                            <Header />
                            <div className="homepage">
                                <div className="web-laptop-container p-3" style={{ backgroundColor: "#fff" }}>
                                    <div className="d-flex" style={{ width: '100%', minHeight: 400 }}>
                                        <div style={{ width: "40%", backgroundColor: "#f5f5f5" }} className="p-4" >
                                            <div>
                                                <h1 style={{ fontSize: 30, borderBottom: "1px solid #bfccd9" }} className="p-2">Thông tin đơn hàng</h1>
                                            </div>
                                            <div className="mt-2 p-2">
                                                <div>
                                                    <p style={{ fontSize: 20 }}>Số tiền thanh toán</p>
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 30 }}>{parseInt(billLast.totalPrice).toLocaleString('vi-VN')}   VNĐ</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 p-2">
                                                <div>
                                                    <p style={{ fontSize: 20 }}>Giá trị đơn hàng</p>
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 30 }}>{parseInt(billLast.totalPrice).toLocaleString('vi-VN')}   VNĐ</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 p-2">
                                                <div>
                                                    <p style={{ fontSize: 20 }}>Phí giao dịch</p>
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 30 }}>0 VNĐ</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 p-2">
                                                <div>
                                                    <p style={{ fontSize: 20 }}>Mã đơn hàng</p>
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 30 }}>{billLast.idBill}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 p-2">
                                                <p className="text-red">Vui lòng quét mã QR và chuyển khoản đúng số tiền với lời nhắn : "Thanh toán hóa đơn số {billLast.idBill}"</p>
                                            </div>
                                        </div>
                                        <div style={{ width: "60%" }} className="p-4">
                                            <div className="text-center">
                                                <h1 style={{ fontSize: 30 }}>Quét mã qua ứng dụng ngân hàng hoặc ví điện tử</h1>
                                            </div>
                                            <div className="d-flex justify-content-center mt-2">
                                                <div className="image-QR">
                                                </div>
                                            </div>
                                            <div className="mt-2 d-flex justify-content-center">
                                                <Button
                                                    danger
                                                    style={{ height: 40, borderRadius: 5 }}
                                                    onClick={() => {
                                                        history.push("/")
                                                    }}
                                                >
                                                    Hủy thanh toán
                                                </Button>
                                                <Button
                                                    danger
                                                    className="ml-2"
                                                    type="primary"
                                                    style={{ height: 40, borderRadius: 5 }}
                                                    onClick={() => {
                                                        let data = new FormData();
                                                        data.append('accountId', billLast.idAccount)
                                                        data.append('idBill', billLast.idBill)
                                                        data.append('statusPayment', 1)
                                                        dispatch(changeStatusPaymentUser(data))
                                                        history.push("/")
                                                    }}
                                                >
                                                    Tôi đã thanh toán qua ứng dụng
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </>
                    )
                )

            }

        </>
    )
}