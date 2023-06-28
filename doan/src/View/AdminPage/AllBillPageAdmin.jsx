import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAllBill, stateBillAdmin } from "../../Reducer/BillAdminReducer/BillAdminReducer";
import { Button, Empty } from "antd";
import { stateGlobal } from "../../Reducer/GlobalReducer/GlobalReducer";
import axios from "axios";
import { URLAPI } from "../../Template/systemConfig";
import { openNotification } from "../SupportView/Notification/Notification";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";

export default function AllBillPageAdmin() {
    const dispatch = useDispatch();
    const { listAllBill } = useSelector(stateBillAdmin)
    const { userInfo } = useSelector(stateGlobal)
    const history = useHistory();
    useEffect(() => {
        dispatch(getListAllBill());
    }, [])

    return (
        <>
            {
                listAllBill.length === 0 ? (
                    <Empty
                        description="Không có dữ liệu"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    listAllBill.map((item) => (
                        <>
                            <div className="web-laptop-billadminpage">
                                <div className="web-laptop-billadminpage-item">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <span class="material-icons">
                                                person_outline
                                            </span>
                                            {
                                                item.cartInfo[0].username
                                            }
                                        </div>
                                        <div>
                                            {
                                                item.status === "0" ? (
                                                    <div className="text-red">ĐÃ HỦY</div>
                                                ) : item.status === "1" ? (
                                                    <div className="text-red">CHỜ XÁC NHẬN</div>
                                                )
                                                    :
                                                    item.status === "2" ? (
                                                        <div className="text-red">ĐANG GIAO</div>
                                                    )
                                                        : item.status === "3" ? (
                                                            <div className="text-red">HOÀN THÀNH</div>
                                                        )
                                                            : (<></>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        item.cartInfo.map((item1) => (
                                            <Link to={`/ProductPage/${item1.productId}`} style={{ width: "100%", borderBottom: '1px solid #f5f5f5', paddingBottom: '20px' }} className="d-flex justify-content-between  align-items-center">
                                                <div className="d-flex mr-2" >
                                                    <div style={{
                                                        backgroundImage: `url(${item1.productImage})`,
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        width: 80,
                                                        height: 80
                                                    }}>
                                                    </div>
                                                    <div className="mt-2 ml-3">
                                                        <p>{item1.productId}</p>
                                                        <p>RAM : {item1.productRam}</p>
                                                        <p>ROM : {item1.productRom}</p>
                                                    </div>
                                                </div>
                                                <div style={{ marginRight: 20 }}>
                                                    <div>
                                                        {parseInt(item1.productPrice).toLocaleString('vi-VN')}   VNĐ
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div className="d-flex align-items-end justify-content-end mt-2 mr-3">
                                    <p className="text-red " style={{ fontSize: 15 }}>Thành tiền :{parseInt(item.totalPrice).toLocaleString('vi-VN')}   VNĐ</p>
                                </div>
                                {
                                    item.status === "1" ? (
                                        <div className="d-flex align-items-end justify-content-end mt-2">
                                            <Button
                                                danger
                                                // type="primary"
                                                className="mr-3"
                                                style={{ width: 100 }}
                                            >Từ chối</Button>

                                            <Button
                                                danger
                                                type="primary"
                                                className="mr-3"
                                                style={{ width: 100 }}
                                            >Xác nhận</Button>
                                        </div>
                                    ) :
                                        item.status === "0" ? (
                                            <div className="d-flex align-items-end justify-content-end mt-2">
                                                <p className="text-red mr-3">Đơn hàng này đã bị hủy</p>
                                            </div>
                                        )
                                            : item.status === "2" ? (
                                                <div className="d-flex align-items-end justify-content-end mt-2">
                                                    {/* <p className="text-red mr-3">Đơn hàng đang giao</p> */}
                                                    <Button
                                                        danger
                                                        type="primary"
                                                        className="mr-3"
                                                        style={{ width: 120 }}
                                                    >Hủy đơn hàng</Button>
                                                    {/* <Button
                                                    danger
                                                    type="primary"
                                                    style={{ width: 100, marginLeft: 20, marginRight: 20 }}

                                                    onClick={async () => {
                                                        let count = 0;
                                                        for (const items in item.cartInfo) {
                                                            let formdata = new FormData();
                                                            formdata.append("accountId", userInfo.id)
                                                            formdata.append("id_edit", item.cartInfo[items].idEdit)
                                                            formdata.append("quantity", item.cartInfo[items].quantity)
                                                            formdata.append("idAuto", item.idAuto)
                                                            formdata.append("price", parseInt(item.cartInfo[items].quantity) * parseInt(item.cartInfo[items].productPrice))
                                                            formdata.append("cartSelected", 1)
                                                            formdata.append("statusPayment", 0)
                                                            formdata.append("dateCart", new Date().toLocaleString())
                                                            try {
                                                                const response = await axios.post(
                                                                    `${URLAPI}//cart_add.php`,
                                                                    formdata,
                                                                    {
                                                                        headers: {
                                                                            "Content-Type": "multipart/form-data",
                                                                        },
                                                                    }
                                                                );
                                                                if (response.data.code === 0) {
                                                                    count++;

                                                                } else {
                                                                    dispatch(openNotification("ERROR", "Lỗi hệ thống"))
                                                                }
                                                            } catch (err) {
                                                                dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thêm lại sản phẩm"))
                                                            }
                                                        }
                                                        if (count === item.cartInfo.length) {
                                                            history.push(`/Cart`)
                                                        }
                                                    }}
                                                >Mua lại</Button> */}
                                                </div>
                                            ) : item.status === "3" ? (
                                                <div className="d-flex align-items-end justify-content-end mt-2">
                                                    <p className="text-red mr-3">Đơn hàng đã hoàn thành</p>
                                                </div>
                                            ) : (<></>)
                                }
                            </div>

                        </>
                    )))
            }
        </>
    )
}