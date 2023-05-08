import { Button } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getListProductAction, getListProductTypeAction, stateHome } from '../../../Reducer/HomeReducer/HomeReducer'
import { openModalAction } from '../../../Reducer/ModalReducer/ModalReducer'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

export default function HomePage(props) {
  useEffect(() => {
    document.title = "Trang chủ"
  })
  const { listProductType, listProduct } = useSelector(stateHome);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListProductTypeAction())
    dispatch(getListProductAction())
  }, [])
  let name = [1, 2, 3, 5]
  let age = [2, 3, 4]

  let href = `/Login/1?name=${name}&age=${age}`
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  return (
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
                      <Link to={`${href}`} style={{ width: "100%", height: "100%" }}>
                        <img src={`${item.productTypeImage}`} alt={`${item.manufacturer}`} className="image-product" />
                      </Link>
                    </div>

                  ))}
              </div>
            </div>
          </div>
          <div className="filter-list-product pt-2 mt-5" >
            <div className="d-flex" style={{ width: "100%" }}>
              {
                listProduct.map((item) => (
                  <div className="item-product item-product-container">
                    <Link to={`/ProductPage/${item.productId}`} className='link-product' onClick={() => {
                      console.log(item.productId)
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
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}