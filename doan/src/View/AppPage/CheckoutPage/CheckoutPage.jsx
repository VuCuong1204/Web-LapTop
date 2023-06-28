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
import { Button } from "antd";
import { openModalAction } from "../../../Reducer/ModalReducer/ModalReducer";
import ChooseAddressPage from "../ProductPage/ChooseAddressPage";
export default function CheckoutPage(props) {

    const dispatch = useDispatch()
    const { defaultAddress } = useSelector(stateProduct)
    const { userInfo } = useSelector(stateGlobal)
    useEffect(() => {
        document.title = "Thanh toán"
        renderCart()
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
                </div>
            </div>
            <Footer />
        </>
    )
}