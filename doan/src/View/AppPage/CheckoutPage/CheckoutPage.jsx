import React, { useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import province from "../../../Template/AddressJson/province.json"
import district from "../../../Template/AddressJson/district.json"
import ward from "../../../Template/AddressJson/ward.json"
import { useDispatch, useSelector } from "react-redux";
import { setDefaultAdressAction, stateProduct } from "../../../Reducer/ProductReducer/ProductReducer";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import _ from "lodash";
import { Button, Select } from "antd";
import { openModalAction } from "../../../Reducer/ModalReducer/ModalReducer";
import ChooseAddressPage from "../ProductPage/ChooseAddressPage";
import { getListCartChoose, stateCheckout } from "../../../Reducer/CheckoutReducer/CheckoutReducer";
export default function CheckoutPage(props) {

    const dispatch = useDispatch()
    const { defaultAddress } = useSelector(stateProduct)
    const { userInfo } = useSelector(stateGlobal)
    const { listCartChoose, totalPrice, priceProduct } = useSelector(stateCheckout)

    useEffect(() => {
        console.log(listCartChoose)
    }, [listCartChoose])
    useEffect(() => {
        document.title = "Thanh toán"
        renderCart()
        let data = new FormData()
        data.append("accountId", userInfo.id)
        dispatch(getListCartChoose(data))
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
            const result1 = data.fullname + "   " + data.phone + "       "
            const result = json.addressdetail + "," + wardName + "," + districtName + "," + provinceName
            return <span className="mr-2"><strong>{result1}</strong>{result}</span>;
        } catch (e) {
            return <p className="mr-2">{data.address}</p>
        }

    }

    const renderCart = () => {
        let dataAddress = new FormData()
        dataAddress.append("idAccount", userInfo.id)
        dispatch(setDefaultAdressAction(dataAddress))
    }
    return (
        <>
            <Header />
            <div className="homepage">
                <div style={{ minHeight: 600 }}>
                    <div className="web-laptop-container">
                        <h1 className="m-2" style={{ fontSize: 30 }}>Thanh Toán</h1>
                    </div>
                    <div className="web-laptop-container">
                        <div className="p-3" style={{ backgroundColor: "#FFF" }}>
                            <div className="checkout-title d-flex align-items-center">
                                <span class="material-icons md-red">
                                    location_on
                                </span>
                                <div className="text-red" style={{ fontSize: 20 }}>Địa Chỉ Nhận Hàng</div>
                            </div>
                            <div className="pt-3 d-flex align-items-center  ">
                                <div className="">
                                    {!_.isEmpty(defaultAddress) ? (renderAddress(defaultAddress)) : (<></>)}
                                </div>
                                <div className="">
                                    <Button
                                        type="link"
                                        style={{
                                            padding: 0,
                                            color: "#cd1818"
                                        }}
                                        onClick={() => {
                                            dispatch(openModalAction({
                                                title: "Chọn địa chỉ",
                                                ModalComponent: <ChooseAddressPage />
                                            }))
                                        }}
                                    > Chọn địa chỉ</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="web-laptop-container mt-2 p-3" style={{ backgroundColor: "#FFF" }}>
                        <div className="text-red" style={{ fontSize: 20 }}>Sản phẩm</div>
                    </div>
                    <div className="web-laptop-container" style={{ backgroundColor: "#FFF" }}>
                        <div className="d-flex justify-content-between cart-title" style={{
                            height: 30,
                            backgroundColor: "#fff",
                            placeContent: "space-evenly",
                            padding: "15px 35px"
                        }}>
                            <div className="col-title-name">
                                Sản phẩm
                            </div>
                            <div className="col-title-price-product">
                                Đơn giá
                            </div>
                            <div className="col-title-quantity">
                                Số lượng
                            </div>
                            <div className="col-title-total-price">
                                Số tiền
                            </div>
                        </div>
                    </div>
                    {
                        listCartChoose.map((item) => (
                            <div className="web-laptop-container">
                                <div className="d-flex justify-content-between cart-title cart-product align-items-center" style={{ paddingTop: 0 }}>
                                    <div className="col-title-name">
                                        <div className="d-flex" >
                                            <div style={{
                                                backgroundImage: `url(${item.productImage})`,
                                                backgroundSize: "contain",
                                                backgroundRepeat: "no-repeat",
                                                width: 80,
                                                height: 80
                                            }}>

                                            </div>
                                            <div className="mt-2 ml-3">
                                                <p>{item.productId}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-title-price-product">
                                        {parseInt(item.productPrice).toLocaleString('vi-VN')}
                                    </div>
                                    <div className="col-title-quantity">
                                        {parseInt(item.quantity).toLocaleString('vi-VN')}
                                    </div>
                                    <div className="col-title-total-price">
                                        {(item.productPrice * item.quantity).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="web-laptop-container" style={{ backgroundColor: "#FFF", paddingBottom: 20 }}>
                        <div className="d-flex justify-content-end">
                            <p className="mr-4">Vận chuyển : 30.000 VNĐ</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="mr-4">Tổng tiền{" "}({listCartChoose.length} sản phẩm) : {totalPrice.toLocaleString('vi-VN')} {" "}VNĐ</p>
                        </div>
                    </div>
                    <div className="web-laptop-container mt-2 p-3" style={{ backgroundColor: "#FFF" }}>
                        <div className="text-red" style={{ fontSize: 20 }}>Phương thức thanh toán</div>
                        <div className="d-flex align-items-center justify-content-end pb-3" style={{ borderBottom: "1px solid black" }}>
                            <p>Chọn phương thức thanh toán</p>
                            <Select
                                placeholder="Chọn phương thức thanh toán"
                                className="ml-2"
                                style={{ width: 300 }}
                                options={[{
                                    value: '1',
                                    label: 'Thanh toán khi nhận hàng'
                                },
                                {
                                    value: '2',
                                    label: 'Thanh toán bằng tài khoản ngân hàng'
                                }]}
                            >

                            </Select>
                        </div>
                        <div className="d-flex justify-content-end mr-2 mt-2 pb-3" style={{ borderBottom: "1px solid black" }}>
                            <div>
                                <div>
                                    Tổng tiền hàng : {priceProduct.toLocaleString('vi-VN')} {" "}VNĐ
                                </div>
                                <div>
                                    Tổng tiền hàng : 30.000 {" "}VNĐ
                                </div>
                                <div>
                                    Tổng tiền hàng : {totalPrice.toLocaleString('vi-VN')} {" "}VNĐ
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mr-2 mt-2 pb-3">
                            <Button
                                type="primary"
                                danger
                                className="mt-2"
                                style={{width:120 , height : 40 , borderRadius:5}}
                                >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}