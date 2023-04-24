import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getListProductTypeAction, stateHome } from '../../../Reducer/HomeReducer/HomeReducer'
import Header from '../../Header/Header'
import { Link } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export default function HomePage(props) {
  useEffect(() => {
    document.title = "Trang chủ"
  })
  const { listProductType } = useSelector(stateHome);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListProductTypeAction())
  }, [])

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
                      <Link to={`/Login/${item.productTypeId}`} style={{ width: "100%", height: "100%" }}>
                        <img src={`${item.productTypeImage}`} alt={`${item.manufacturer}`} className="image-product" />
                      </Link>
                    </div>

                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}