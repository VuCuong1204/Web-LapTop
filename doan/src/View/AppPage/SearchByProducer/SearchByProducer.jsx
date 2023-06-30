import React from "react";
import { useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import LoadingPage from "../../SupportView/LoadingPage/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { setTrueLoading, stateLoadingPage } from "../../../Reducer/LoadingReducer/LoadingPageReducer";
import { getListProductSearchAction, stateSearch } from "../../../Reducer/SearchByProducerReducer/SearchByProducerReducer";
import { Link, useLocation } from 'react-router-dom'
import { getListProductTypeAction, stateHome } from "../../../Reducer/HomeReducer/HomeReducer";
import { Empty } from "antd";


export default function SearchByProducer(props) {
    const { loading } = useSelector(stateLoadingPage)
    const { listProductSearch } = useSelector(stateSearch)
    const { listProductType } = useSelector(stateHome);

    const searchProduct = () => {
        const searchParams = new URLSearchParams(document.location.search)
        dispatch(getListProductTypeAction())
        dispatch(getListProductSearchAction(searchParams.get('productid')))
    }
    const dispatch = useDispatch();
    useEffect(() => {
        searchProduct()
    }, [props])
    return (
        <>
            {loading ? <LoadingPage /> :
                (
                    <>
                        <Header />
                        <div className="homepage">
                            <div className="web-laptop-container">
                                <div className="d-flex mt-2">
                                    <div className="home-container-slide-product-type">
                                        <div className="home-container-slide-product-type-image row">
                                            {
                                                listProductType.map((item) => (
                                                    <div className="col logo-product" style={{ height: "100%" }}>
                                                        {/* <Link to={`/Login/${item.productTypeId}?name=${name}`} style={{ width: "100%", height: "100%" }}>
                          <img src={`${item.productTypeImage}`} alt={`${item.manufacturer}`} className="image-product" />
                        </Link> */}
                                                        <Link to={`/SearchByProducer?productid=${item.productTypeId}`} style={{ width: "100%", height: "100%" }}>
                                                            <img src={`${item.productTypeImage}`} alt={`${item.manufacturer}`} className="image-product" />
                                                        </Link>
                                                    </div>

                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-list-product pt-2 mt-5" >
                                    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                                        {
                                            listProductSearch.length === 0 ? (
                                                <Empty
                                                    description="Không có dữ liệu"
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                />
                                            ) : (
                                                listProductSearch.map((item) => (
                                                    <div className="item-product item-product-container">
                                                        <Link to={`/ProductPage/${item.productId}`} className='link-product' onClick={() => {
                                                            dispatch(setTrueLoading())
                                                        }}>
                                                            <div className="product-profile">
                                                                <div className="product-image">
                                                                    <img src={`${item.productImage}`} alt="" className="product-image-wrapper" />
                                                                </div>
                                                                <div className="product-name">
                                                                    <h3>
                                                                        {item.productName}
                                                                    </h3>
                                                                </div>
                                                                <div className="product-price">
                                                                    <h2 style={{ color: "red" }}>{parseInt(item.productPrice).toLocaleString('vi-VN')}đ</h2>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))
                                            )

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
                )}

        </>
    )
}