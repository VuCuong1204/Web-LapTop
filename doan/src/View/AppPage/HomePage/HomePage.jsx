import { Button } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getListProductTypeAction, stateHome } from '../../../Reducer/HomeReducer/HomeReducer'
import { openModalAction } from '../../../Reducer/ModalReducer/ModalReducer'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

export default function HomePage(props) {
  useEffect(() => {
    document.title = "Trang chủ"
    console.log(searchParams)
  })
  const { listProductType } = useSelector(stateHome);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListProductTypeAction())
  }, [])
  let name = [1, 2, 3, 5]
  let age = [2, 3, 4]

  let href = `/Login/1?name=${name}&age=${age}`
  useEffect(() => {
    console.log(href)
  })

  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  return (
    <>
      <Header />
      <div className="homepage">
        <div className="container">
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
          <Button
            danger
            onClick={() => {
              dispatch(openModalAction({ title: "Popup Test", ModalComponent: <Footer /> }))
            }}
          >Test PopUp</Button>
        </div>
      </div>
    </>
  )
}