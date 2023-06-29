import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBillCompleteUser, stateBillUser } from "../../../Reducer/BillReducer/BillReducer";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { Button, Empty } from "antd";
import axios from "axios";
import { URLAPI } from "../../../Template/systemConfig";
import { openNotification } from "../../SupportView/Notification/Notification";

export default function CompleteBillPage(props) {
    const dispatch = useDispatch();
    const { listBillCompleteUser } = useSelector(stateBillUser)
    const { userInfo } = useSelector(stateGlobal)
    const history = useHistory();
    useEffect(() => {
        let data = new FormData();
        data.append("accountId", userInfo.id)
        dispatch(getListBillCompleteUser(data));
    }, [])
    return (
        <>
            {
                listBillCompleteUser.length === 0 ? (
                    <Empty
                        description = "Không có dữ liệu"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />) : (
                    listBillCompleteUser.map((item) => (
                        <>
                            <div className="web-laptop-billadminpage">
                                <div className="web-laptop-billadminpage-item">
                                    <div className="d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #a0a0a0" }}>
                                        <div className="d-flex align-items-center">
                                            {/* <span class="material-icons">
                                                person_outline
                                            </span>
                                            {
                                                item.cartInfo[0].username
                                            } */}
                                        </div>
                                        <div>
                                            <div className="text-success mb-2">ĐÃ HOÀN THÀNH</div>

                                        </div>
                                    </div>
                                </div>
                                <div style={{padding: "12px 12px 12px 12px"}}>
                                    {
                                        item.cartInfo.map((item1) => (
                                            <Link to={`/ProductPage/${item1.productId}`} style={{ width: "100%", borderBottom: '1px solid #a0a0a0', paddingBottom: '20px' }} className="d-flex justify-content-between  align-items-center">
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
                                    <p className="text-black " style={{ fontSize: 15 }}>Thành tiền :{parseInt(item.totalPrice).toLocaleString('vi-VN')}   VNĐ</p>
                                </div>
                                <div className="d-flex align-items-end justify-content-end mt-2 mr-3">
                                    {/* <p className="text-red " style={{ fontSize: 15 }}>Thành tiền :{parseInt(item.totalPrice).toLocaleString('vi-VN')}   VNĐ</p> */}
                                    {item.statusPayment === "0" ? (
                                        <p className="text-red " style={{ fontSize: 15 }}>Chưa thanh toán</p>
                                    ) : (
                                        <p className="text-success " style={{ fontSize: 15 }}>Đã thanh toán</p>
                                    )}
                                </div>
                                <div className="d-flex align-items-end justify-content-end mt-2">
                                    <Button
                                        danger
                                        type="primary"
                                        className="mr-3"
                                        style={{ width: 100 }}

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
                                                        `${URLAPI}/cart_add.php`,
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
                                    >Mua lại</Button>
                                </div>
                            </div>

                        </>
                    ))
                )
            }
        </>
    )
}