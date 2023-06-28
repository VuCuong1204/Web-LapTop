import { Button, Empty } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory  , Link} from "react-router-dom/cjs/react-router-dom.min";
import { getListBillTraver, stateBillAdmin } from "../../Reducer/BillAdminReducer/BillAdminReducer";
import { stateGlobal } from "../../Reducer/GlobalReducer/GlobalReducer";

export default function BillTraverPage() {
    const dispatch = useDispatch();
    const { listBillTraver } = useSelector(stateBillAdmin)
    const { userInfo } = useSelector(stateGlobal)
    const history = useHistory();
    useEffect(() => {
        dispatch(getListBillTraver());
    }, [])
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
                                        <div className="text-red">ĐANG GIAO</div>
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
                            <div className="d-flex align-items-end justify-content-end mt-2">
                                {/* <p className="text-red mr-3">Đơn hàng đang giao</p> */}
                                <Button
                                    danger
                                    type="primary"
                                    className="mr-3"
                                    style={{ width: 120 }}
                                >Hủy đơn hàng</Button>
                            </div>
                        </div>

                    </>
                )))
            }
        </>
    )
}