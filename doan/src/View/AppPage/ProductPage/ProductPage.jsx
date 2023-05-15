import { Avatar, Button, Checkbox, Comment, Empty, Form, Input, InputNumber, Popconfirm } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import { setTrueLoading, stateLoadingPage } from "../../../Reducer/LoadingReducer/LoadingPageReducer";
import { addCommentAction, decreaseCount, deleteCommentAction, getListCommentAction, getProductById, increaseCount, setDefaultAdressAction, setOptionRomRamAction, stateProduct } from "../../../Reducer/ProductReducer/ProductReducer";
import Styled from "../../../css/Styled";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import LoadingPage from "../../SupportView/LoadingPage/LoadingPage";
import ProductNotFoundPage from "../ProductNotFoundPage/ProductNotFoundPage";
import { UserOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";
import province from "../../../Template/AddressJson/province.json"
import district from "../../../Template/AddressJson/district.json"
import ward from "../../../Template/AddressJson/ward.json"
import { openModalAction } from "../../../Reducer/ModalReducer/ModalReducer";
import ChooseAddressPage from "./ChooseAddressPage";

export default function ProductPage(props) {
    const dispatch = useDispatch()
    const { products, optionRomRam, listoptionRomRam, count, listComment, defaultAddress } = useSelector(stateProduct)
    const { userInfo } = useSelector(stateGlobal)
    const [option, setOption] = useState([]);
    const [comment, setComment] = useState("");
    useEffect(() => {
        document.title = "Thông tin sản phẩm"
        renderOption();
        console.log(props)
        return (() => {
            dispatch(setTrueLoading())
        })
    }, [])
    const { loading } = useSelector(stateLoadingPage)
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
        dispatch(getListCommentAction(data))
        let dataAddress = new FormData()
        dataAddress.append("idAccount", userInfo.id)
        dispatch(setDefaultAdressAction(dataAddress))
    }

    const [state, setState] = useState({
        province: [],
        district: [],
        ward: [],
        values: {
            province: null,
            district: null,
            ward: null,
            provinceName: null,
            districtName: null,
            wardName: null,
            addressdetail: null,
        },
    });


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
            const result = wardName + "," + districtName
            return <p className="mr-2">{result}</p>;
        } catch (e) {
            return <p className="mr-2">{data.address}</p>
        }

    }

    return (
        <>
            {loading ? (<LoadingPage />) : (
                <>
                    {_.isEmpty(products.objectProduct) ? (<ProductNotFoundPage />) : (
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
                                                                    <div className="mr-2"
                                                                        style={{ marginTop: 6 }}>
                                                                        <span class="material-icons md-red">
                                                                            local_shipping
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <div className="d-flex flex-column">
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="_label">Địa chỉ</div>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="">
                                                                                        {!_.isEmpty(defaultAddress) ? (renderAddress(defaultAddress)) : (<></>)}
                                                                                    </div>
                                                                                    <div>
                                                                                        <Button

                                                                                            type="link"
                                                                                            style={{ padding: 0 }}
                                                                                            onClick={() => {
                                                                                                dispatch(openModalAction({
                                                                                                    title: "Chọn địa chỉ",
                                                                                                    ModalComponent: <ChooseAddressPage />
                                                                                                }))
                                                                                            }}
                                                                                        >
                                                                                            Chọn địa chỉ
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
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
                                                        <div className="d-flex product-method-image mt-3">
                                                            <label>Số lượng</label>
                                                            <div className="d-flex">
                                                                <Button
                                                                    disabled={count <= 0 ? true : false}
                                                                    onClick={() => {
                                                                        dispatch(decreaseCount())
                                                                    }}
                                                                >
                                                                    -
                                                                </Button>
                                                                <InputNumber
                                                                    className="hide-arrow"
                                                                    value={count}
                                                                    style={{
                                                                        width: 50,
                                                                        textAlign: 'center'
                                                                    }}
                                                                />
                                                                <Button
                                                                    onClick={() => {
                                                                        dispatch(increaseCount())
                                                                    }}
                                                                >
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    { }
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
                                            <div>
                                                <div className="">
                                                    <Comment
                                                        avatar={
                                                            <Avatar
                                                                icon={<UserOutlined />}
                                                                size="large"
                                                            />
                                                        }
                                                        content={
                                                            <div>
                                                                <TextArea rows={4} onChange={(e) => {
                                                                    setComment(e.target.value)
                                                                }} value={comment} />
                                                                <Button
                                                                    disabled={_.isEmpty(userInfo) || comment === "" ? true : false}
                                                                    className="mt-2"
                                                                    style={{
                                                                        width: 80,
                                                                        height: 40,
                                                                        borderRadius: 5
                                                                    }}
                                                                    type="primary"
                                                                    danger
                                                                    onClick={() => {
                                                                        let data = new FormData();
                                                                        data.append("productId", props.match.params.id)
                                                                        data.append("accountId", userInfo.id)
                                                                        data.append("message", comment)
                                                                        data.append("username", userInfo.use_name)
                                                                        dispatch(addCommentAction(data))
                                                                        setComment("")
                                                                    }}

                                                                >Gửi</Button>
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                                {listComment.length >= 0 ? (
                                                    listComment.map((item) => (
                                                        <div className="product-comment">
                                                            <Comment
                                                                actions={
                                                                    item.accountId === userInfo.id ? ([
                                                                        <span>
                                                                            <Popconfirm
                                                                                style={{ width: 200, height: 200 }}
                                                                                title="Xóa bình luận"
                                                                                description="Bạn có chắc chắn muốn xóa bình luận này"
                                                                                onConfirm={() => {
                                                                                    let data = new FormData()
                                                                                    data.append("idRate", item.idRate)
                                                                                    data.append("productId", item.productId)
                                                                                    dispatch(deleteCommentAction(data))
                                                                                }}
                                                                                okText="Xóa"
                                                                                cancelText="Hủy"
                                                                            >
                                                                                <Button
                                                                                    type="link"
                                                                                    style={{ padding: 0 }}>Xóa</Button>
                                                                            </Popconfirm>

                                                                        </span>,
                                                                        <span>
                                                                            <Button
                                                                                type="link"
                                                                                style={{ padding: 0 }}
                                                                                onClick={() => {

                                                                                }}
                                                                            >
                                                                                Sửa
                                                                            </Button>
                                                                        </span>
                                                                    ]) : ([])

                                                                }
                                                                author={<p>{item.username}</p>}
                                                                avatar={
                                                                    <Avatar
                                                                        icon={<UserOutlined />}
                                                                        size="large"
                                                                    />

                                                                }
                                                                content={
                                                                    <p>
                                                                        {item.message}
                                                                    </p>
                                                                }
                                                            >
                                                                { }
                                                            </Comment>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <Empty />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </>)
                    }</>
            )
            }

        </>

    )
}