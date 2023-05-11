import { Button, Checkbox } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import { getProductById, setOptionRomRamAction, stateProduct } from "../../../Reducer/ProductReducer/ProductReducer";
import Styled from "../../../css/Styled";
import Header from "../../Header/Header";
import ProductNotFoundPage from "../ProductNotFoundPage/ProductNotFoundPage";
import Footer from "../../Footer/Footer";
import { useHistory } from "react-router-dom";

export default function ProductPage(props) {
    const dispatch = useDispatch()
    const { products, optionRomRam, listoptionRomRam } = useSelector(stateProduct)
    const { userInfo } = useSelector(stateGlobal)
    const [option, setOption] = useState([]);
    useEffect(() => {
        document.title = "Thông tin sản phẩm"
        renderOption();
    }, [])

    const history = useHistory();

    function onChange(values) {
        const valuesNew = values.filter((v) => v !== option);
        const value = valuesNew.length ? valuesNew[0] : '';
        setOption(value);
        dispatch(setOptionRomRamAction(value))
        console.log('checked = ', values);
        console.log(typeof values)
        console.log(optionRomRam.RAM)
    }

    const renderOption = () => {
        let data = new FormData()
        data.append("productId", props.match.params.id)
        dispatch(getProductById(data));
    }
    return (
        <>

            {
                _.isEmpty(products.objectProduct) ? (<ProductNotFoundPage />) : (
                    <>
                        <Header />
                        <div className="homepage">
                            <div className="web-laptop-container">
                                <div className="d-flex mt-2 web-laptop-container-background ">
                                    <div className="web-laptop-product-page-image">
                                        <div className="position-relative d-block">
                                            <div className="display-image-product mb-5"
                                                style={{
                                                    backgroundImage: `url(${products.objectProduct.productImage})`,
                                                    backgroundSize: "contain",
                                                    backgroundRepeat: "no-repeat"
                                                }}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-auto ">
                                        <div className="flex-auto flex-column display-profile-product">
                                            <div>
                                                <span className="image-title">{products.objectProduct.productName}</span>
                                            </div>
                                            <div className="note-box mt-3">
                                                <div className="image-price">
                                                    {parseInt(products.detailList[0].productPrice).toLocaleString('vi-VN')}   VNĐ
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="d-flex flex-column">
                                                    <div className="d-flex product-method-image">
                                                        <label className="">Vận chuyển</label>
                                                        <div className="">
                                                            <div className="d-flex">
                                                                <div className="mr-2">
                                                                    <span class="material-icons md-red">
                                                                        local_shipping
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <div className="d-flex flex-column">
                                                                        <div className="d-flex">
                                                                            <div className="_label">Địa chỉ</div>
                                                                            <div>30.000 vnđ</div>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <div className="_label">Phí vận chuyển</div>
                                                                            <div>30.000 vnđ</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex product-method-image mt-3">
                                                        <label>ROM-RAM</label>
                                                        <div>
                                                            <Styled>
                                                                <Checkbox.Group
                                                                    options={listoptionRomRam}
                                                                    value={[optionRomRam]}
                                                                    onChange={onChange}
                                                                />
                                                            </Styled>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <div className="d-flex">
                                                    <Button
                                                        className="ant-design-button-constom add-cart-btn"
                                                        onClick={() => {
                                                            if (_.isEmpty(userInfo)) {
                                                                sessionStorage.setItem("pathName", JSON.stringify(window.location.pathname))
                                                                history.push("/Login");
                                                            }
                                                            else {

                                                            }
                                                        }}
                                                    >
                                                        <div className="d-flex">
                                                            <span class="material-icons">
                                                                shopping_cart
                                                            </span>
                                                            Thêm vào giỏ hàng
                                                        </div>
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            if (_.isEmpty(userInfo)) {
                                                                sessionStorage.setItem("pathName", JSON.stringify(window.location.pathname))
                                                                history.push("/Login");
                                                            }
                                                            else {

                                                            }
                                                        }}
                                                        type="primary"
                                                        className="ml-3 ant-design-button-constom"
                                                        danger
                                                    >
                                                        Mua ngay
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="web-laptop-container">
                                <div className="mt-2 web-laptop-container-background p-4">
                                    <div>
                                        <div className="title">
                                            CẤU HÌNH SẢN PHẨM
                                        </div>
                                        <div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    CPU
                                                </div>
                                                <div>
                                                    {products.objectProduct.productCPU}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Card màn hình
                                                </div>
                                                <div>
                                                    {products.objectProduct.productCard}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Kích thước màn hình
                                                </div>
                                                <div>
                                                    {products.objectProduct.productScreen}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Độ phân giải
                                                </div>
                                                <div>
                                                    {products.objectProduct.productResolution}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Cảm ứng
                                                </div>
                                                <div>
                                                    {products.objectProduct.productTouch}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Vật liệu
                                                </div>
                                                <div>
                                                    {products.objectProduct.productMaterial}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Khối lượng
                                                </div>
                                                <div>
                                                    {products.objectProduct.productWeight}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Độ phân giải Camera
                                                </div>
                                                <div>
                                                    {products.objectProduct.productWebcam}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Hệ điều hành
                                                </div>
                                                <div>
                                                    {products.objectProduct.productSystem}
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="configuration-title">
                                                    Đặc biệt
                                                </div>
                                                <div>
                                                    {products.objectProduct.productSpecial}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="web-laptop-container">
                                <div className="mt-2 web-laptop-container-background p-4">
                                    <div>
                                        <div className="title">
                                            ĐÁNH GIÁ SẢN PHẨM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>)
            }
        </>

    )
}