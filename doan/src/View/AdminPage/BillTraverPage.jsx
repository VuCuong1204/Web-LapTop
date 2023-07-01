import { Button, Empty } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { changeStatusBillAdmin, completeBillAction, getListBillTraver, stateBillAdmin } from "../../Reducer/BillAdminReducer/BillAdminReducer";
import { stateGlobal } from "../../Reducer/GlobalReducer/GlobalReducer";
import province from "../../Template/AddressJson/province.json"
import district from "../../Template/AddressJson/district.json"
import ward from "../../Template/AddressJson/ward.json"

export default function BillTraverPage() {
    const dispatch = useDispatch();
    const { listBillTraver } = useSelector(stateBillAdmin)
    const { userInfo } = useSelector(stateGlobal)
    const history = useHistory();
    useEffect(() => {
        dispatch(getListBillTraver());
    }, [])

    const renderAddress = (data) => {
        try {
            const json = JSON.parse(data.address)
            let provinceName = null;
            let districtName = null;
            let wardName = null;
            if (json.province) {
                provinceName = province.find((item) => {
                    return item.id === json.province;
                }).name;
                if (json.district) {
                    districtName = district.find((item) => {
                        return item.id === json.district;
                    }).name;
                    if (json.ward) {
                        wardName = ward.find((item) => {
                            return item.id === json.ward;
                        }).name;
                    }
                }
            }
            const result = json.addressdetail + "," + wardName + "," + districtName + "," + provinceName
            return <span className="mr-2">{result}</span>;
        } catch (e) {
            return <p className="mr-2">{data.address}</p>
        }

    }
    return (
        <>
            {
                listBillTraver.length === 0 ? (
                    <Empty
                        description="Không có dữ liệu"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    listBillTraver.map((item) => (
                        <>
                            <div className="web-laptop-billadminpage">
                                <div className="web-laptop-billadminpage-item">
                                    <div className="d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #a0a0a0" }}>
                                        <div className="d-flex align-items-center">
                                            {
                                                item.cartInfo[0].username ? (<>
                                                    <span class="material-icons">
                                                        person_outline
                                                    </span>
                                                    {
                                                        item.cartInfo[0].username
                                                    }
                                                </>) : (<></>)
                                            }
                                        </div>
                                        <div>
                                            <div className="text-success">ĐANG GIAO</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: "12px 12px 12px 12px" }}>
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
                                <div style={{ padding: "12px 12px 12px 12px" }} >
                                    <div style={{ width: "100%", borderBottom: '1px solid #a0a0a0', paddingBottom: '20px' }}>
                                        <strong>Thông tin giao hàng</strong>
                                        <div className="d-flex  mt-2 mr-3">
                                            <p className="text-black " style={{ fontSize: 15 }}>Người nhận : {item.fullname}</p>
                                        </div>
                                        <div className="d-flex  mt-2 mr-3">
                                            <p className="text-black " style={{ fontSize: 15 }}>Số điện thoại : {item.phone}</p>
                                        </div>
                                        <div className="d-flex  mt-2 mr-3">
                                            <p className="text-black " style={{ fontSize: 15 }}>Địa chỉ : {renderAddress(item)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end justify-content-end mt-2 mr-3">
                                    <p className="text-red " style={{ fontSize: 15 }}>Thành tiền :{parseInt(item.totalPrice).toLocaleString('vi-VN')}   VNĐ</p>
                                </div>
                                <div className="d-flex align-items-end justify-content-end mt-2 mr-3">
                                    {/* <p className="text-red " style={{ fontSize: 15 }}>Thành tiền :{parseInt(item.totalPrice).toLocaleString('vi-VN')}   VNĐ</p> */}
                                    {item.statusPayment === "0" ? (
                                        <p className="text-black " style={{ fontSize: 15 }}>Chưa thanh toán</p>
                                    ) : (
                                        <p className="text-success " style={{ fontSize: 15 }}>Đã thanh toán</p>
                                    )}
                                </div>
                                <div className="d-flex align-items-end justify-content-end mt-2">
                                    {/* <p className="text-red mr-3">Đơn hàng đang giao</p> */}
                                    <Button
                                        danger
                                        type="primary"
                                        className="mr-3"
                                        style={{ width: 120 }}
                                        onClick={() => {
                                            let data = new FormData();
                                            // data.append('accountId', item.idAccount)
                                            data.append('idBill', item.idBill)
                                            data.append('status', 0)
                                            dispatch(changeStatusBillAdmin(data));
                                        }}
                                    >Hủy đơn hàng</Button>
                                    <Button
                                        danger
                                        type="primary"
                                        className="mr-3"
                                        style={{ width: 200 }}
                                        onClick={() => {
                                            let data = new FormData();
                                            data.append('accountId', item.idAccount)
                                            data.append('idBill', item.idBill)
                                            data.append('status', 3)
                                            data.append('statusPayment', 1)
                                            dispatch(completeBillAction(data));
                                        }}
                                    >Hoàn thành đơn hàng</Button>
                                </div>
                            </div>

                        </>
                    )))
            }
        </>
    )
}