import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateGlobal } from "../../../Reducer/GlobalReducer/GlobalReducer";
import AuthPage from "../AuthPage/AuthPage";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Button, Checkbox, Empty, InputNumber, Popconfirm } from "antd";
import { deleteCartAction, getListCartAction, putListCartAction, putListOptionCartAction, setCheckedAction, setCheckedAll, setCheckedAllAction, stateCart, updateQuantityAction } from "../../../Reducer/CartReducer/CartReducer";
import { Link, useHistory } from "react-router-dom";
import { setTrueLoading } from "../../../Reducer/LoadingReducer/LoadingPageReducer";
import { parse } from "date-fns";

export default function CartPage(props) {

    const { userInfo } = useSelector(stateGlobal)
    const { listCart, listOptionCart, cartChoose, checkedAll, totalQuantity, totalPrice } = useSelector(stateCart)
    const dispatch = useDispatch()
    useEffect(() => {


        document.title = "Giỏ hàng"
        getListCart();
        return () => {
            dispatch(putListCartAction([]))
            dispatch(setTrueLoading())
            dispatch(putListOptionCartAction([]))
        }
    }, [])

    const history = useHistory()

    const handleCheckedAll = (e) => {
        const checked = e.target.checked;
        if (checked) {
            let formdata = new FormData();
            formdata.append("accountId", userInfo.id)
            formdata.append("cartSelected", 1)
            dispatch(setCheckedAllAction(formdata))
        }
        else {
            let formdata = new FormData();
            formdata.append("accountId", userInfo.id)
            formdata.append("cartSelected", 0)
            dispatch(setCheckedAllAction(formdata))
        }
        // dispatch(setCheckedAll(checked))
    }

    const getListCart = () => {
        let formdata = new FormData();
        formdata.append("accountId", userInfo.id)
        dispatch(getListCartAction(formdata))
    }
    return (
        <>
            {
                _.isEmpty(userInfo) ? (<AuthPage />) : (
                    <>
                        <Header />
                        <div className="homepage">
                            <div style={{ minHeight: 600 }}>
                                <div className="web-laptop-container">
                                    <h1 className="m-2" style={{ fontSize: 30 }}>Giỏ Hàng</h1>
                                </div>
                                {
                                    listCart.length > 0 ? (
                                        <>
                                            <div className="web-laptop-container mt-5">
                                                <div className="d-flex justify-content-between cart-title" style={{
                                                    height: 50,
                                                    backgroundColor: "#fff",
                                                    placeContent: "space-evenly",
                                                    padding: 30
                                                }}>
                                                    <div className="col-title-select">
                                                        <Checkbox
                                                            // indeterminate={checkedList.length > 0 && checkedList.length < listCart.length}
                                                            onChange={(e) => {
                                                                handleCheckedAll(e)
                                                            }}
                                                            checked={checkedAll}
                                                        >
                                                        </Checkbox>
                                                    </div>
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
                                                    <div className="col-title-total-price">
                                                        Thao tác
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                listCart.map((item) => (
                                                    <div className="web-laptop-container mt-2">
                                                        <div className="d-flex justify-content-between cart-title cart-product align-items-center">
                                                            <div className="col-title-select">
                                                                <Checkbox
                                                                    value={item}
                                                                    onChange={(e) => {
                                                                        const checked = e.target.checked;
                                                                        if (checked) {
                                                                            let formdata = new FormData();
                                                                            formdata.append("accountId", userInfo.id)
                                                                            formdata.append("cartId", item.cartId)
                                                                            formdata.append("cartSelected", 1)
                                                                            dispatch(setCheckedAction(formdata))
                                                                        }
                                                                        else {
                                                                            let formdata = new FormData();
                                                                            formdata.append("accountId", userInfo.id)
                                                                            formdata.append("cartId", item.cartId)
                                                                            formdata.append("cartSelected", 0)
                                                                            dispatch(setCheckedAction(formdata))
                                                                        }
                                                                    }}
                                                                    checked={item.cartSelected === "1"}
                                                                >
                                                                </Checkbox>
                                                            </div>
                                                            <div className="col-title-name">
                                                                <Link to={`/ProductPage/${item.productId}`} className="d-flex" >
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
                                                                </Link>
                                                            </div>
                                                            <div className="col-title-price-product">
                                                                {parseInt(item.productPrice).toLocaleString('vi-VN')}
                                                            </div>
                                                            <div className="col-title-quantity">
                                                                <div className="d-flex">
                                                                    <Button
                                                                        disabled={item.quantity <= 1 ? true : false}
                                                                        onClick={() => {
                                                                            let formdata = new FormData();
                                                                            formdata.append("accountId", userInfo.id)
                                                                            formdata.append("cartId", item.cartId)
                                                                            formdata.append("quantity", (parseInt(item.quantity) - 1))
                                                                            formdata.append("totalPrice", (parseInt(item.quantity) - 1) * item.productPrice)
                                                                            dispatch(updateQuantityAction(formdata))
                                                                        }}
                                                                    >
                                                                        -
                                                                    </Button>
                                                                    <InputNumber
                                                                        className="hide-arrow"
                                                                        value={item.quantity}
                                                                        style={{
                                                                            width: 50,
                                                                            textAlign: 'center'
                                                                        }}
                                                                    />
                                                                    <Button
                                                                        onClick={() => {
                                                                            let formdata = new FormData();
                                                                            formdata.append("accountId", userInfo.id)
                                                                            formdata.append("cartId", item.cartId)
                                                                            formdata.append("quantity", (parseInt(item.quantity) + 1))
                                                                            formdata.append("totalPrice", (parseInt(item.quantity) + 1) * item.productPrice)
                                                                            dispatch(updateQuantityAction(formdata))
                                                                        }}
                                                                    >
                                                                        +
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div className="col-title-total-price">
                                                                {(item.productPrice * item.quantity).toLocaleString('vi-VN')}
                                                            </div>
                                                            <div className="col-title-total-price">


                                                                <Popconfirm
                                                                    style={{ width: 200, height: 200 }}
                                                                    title="Xóa sản phẩm khỏi giỏ hàng"
                                                                    description="Bạn có chắc chắn muốn xóa sản phẩm này"
                                                                    onConfirm={() => {
                                                                        let data = new FormData()
                                                                        data.append("accountId", userInfo.id)
                                                                        data.append("cartId", item.cartId)
                                                                        dispatch(deleteCartAction(data))
                                                                    }}
                                                                    okText="Xóa"
                                                                    cancelText="Hủy"
                                                                >
                                                                    <Button
                                                                        type="link"
                                                                        style={{
                                                                            padding: 0,
                                                                            color: "#cd1818"
                                                                        }}
                                                                    >Xóa</Button>
                                                                </Popconfirm>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className="web-laptop-container mt-2">
                                                <div className="d-flex justify-content-between cart-title1 align-items-center" style={{
                                                    height: 60,
                                                    backgroundColor: "#fff",
                                                    placeContent: "space-evenly",
                                                    padding: 30
                                                }}>
                                                    <div className="col-title-select" style={{ width: "5%" }}>
                                                        <Checkbox
                                                            // indeterminate={checkedList.length > 0 && checkedList.length < listCart.length}
                                                            onChange={(e) => {
                                                                handleCheckedAll(e)
                                                            }}
                                                            checked={checkedAll}
                                                        >
                                                        </Checkbox>
                                                    </div>
                                                    <div style={{ width: "43%" }}>
                                                        Chọn tất cả
                                                    </div>
                                                    <div style={{ width: "37%" }}>
                                                        Tổng thanh toán ({totalQuantity} sản phẩm ) :
                                                        {
                                                            " "
                                                        }
                                                        {
                                                            <span style={{ fontSize: 20, color: "#cd1818" }}>{totalPrice.toLocaleString('vi-VN')}</span>
                                                        }
                                                        {" "}
                                                        VNĐ
                                                    </div>
                                                    <div style={{ width: "15%" }} class="d-flex justify-content-end">
                                                        <Button
                                                            disabled={listCart.filter(i => i.cartSelected === "1").length > 0 ? false : true}
                                                            type="primary"
                                                            danger
                                                            style={{
                                                                borderRadius: "6px",
                                                                width: 120,
                                                                height: 40
                                                            }}
                                                            onClick={() => {
                                                                history.push("/checkout")
                                                            }}
                                                        >Mua Hàng</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>

                                    ) : (
                                        <>
                                            <div className="mt-5">
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                    description={"Hiện bạn không có sản phẩm nào trong giỏ hàng"}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <Footer />
                    </>
                )
            }
        </>
    )
}