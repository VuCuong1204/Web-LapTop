import { createSlice } from "@reduxjs/toolkit";
import { selected0 } from "../CartReducer/CartReducer";
import { checkoutservice } from "../../Service/CheckoutService/CheckoutService";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    listCartChoose: [],
    totalPrice: 0,
    priceProduct : 0,
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
  a+=30000
  dispatch(putTotalPrice(a))
}


export const { putListCartChoose, putTotalPrice , putTotalPriceProduct } = checkoutSlice.actions;
export const stateCheckout = (state) => state.checkout;
export default checkoutSlice.reducer;
