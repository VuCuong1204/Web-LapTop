import { createSlice } from "@reduxjs/toolkit";
import { selected0 } from "../CartReducer/CartReducer";
import { checkoutservice } from "../../Service/CheckoutService/CheckoutService";
import { openNotification } from "../../View/SupportView/Notification/Notification";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    listCartChoose: [],
    totalPrice: 0,
    priceProduct: 0,
  },
  reducers: {
    putListCartChoose: (state, action) => {
      state.listCartChoose = action.payload
    },
    putTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    },
    putTotalPriceProduct: (state, action) => {
      state.priceProduct = action.payload
    }
  },
});

export const getListCartChoose = (data) => async (dispatch) => {
  const response = await checkoutservice.getListProductChoose(data);
  dispatch(putListCartChoose(response.data.data.filter(item => item.status === "0" && item.cartSelected === "1")))
  let a = 0;
  response.data.data.filter(i => i.status === "0" && i.cartSelected === "1").map(item => {
    a = parseInt(a) + parseInt(item.totalPrice)
  })
  dispatch(putTotalPriceProduct(a))
  a += 30000
  dispatch(putTotalPrice(a))
}

export const changeStatusCart = (data) => async (dispatch) => {
  const response = await checkoutservice.changeStatusCart(data);
  if (response.data.code !== 0) {
    dispatch(openNotification("ERROR", "Lỗi hệ thống"));
  }
}

export const addBill = (dataAddBill, dataAddCartBill, idAccount) => async (dispatch) => {
  const response = await checkoutservice.addnewBill(dataAddBill);
  if (response.data.code === 0) {
    var count = 0;
    for (var i in dataAddCartBill) {
      let formdata = new FormData();
      formdata.append('idBill', response.data.data[0].idBill);
      formdata.append('idCart', dataAddCartBill[i].cartId);
      formdata.append('idAccount', idAccount)
      const response2 = await checkoutservice.addCartBill(formdata);
      if(response2.data.code === 0) {
        console.log("check")
        count ++ ;
      }
    }
    if(count === dataAddCartBill.length) {
      dispatch(openNotification("SUCCESS","Tạo hóa đơn thành công vui lòng đợi xác nhận"));
    }
    else {
      dispatch(openNotification("ERROR","Có lỗi hệ thống"))
    }
  }
  else {
    dispatch(openNotification("ERROR", "Lỗi hệ thống"))
  }
}


export const { putListCartChoose, putTotalPrice, putTotalPriceProduct } = checkoutSlice.actions;
export const stateCheckout = (state) => state.checkout;
export default checkoutSlice.reducer;
