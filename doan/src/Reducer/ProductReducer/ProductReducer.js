import { createSlice } from "@reduxjs/toolkit";
import { productservice } from "../../Service/ProductService/ProductService";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: {}
    },
    reducer: {
        setProductAction: (state, action) => {
            state.products = action.payload;
        },
        setProductDetailAction: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const getProductById = (data) => async (dispatch) => {
    const response = await productservice.getProduct(data);
    dispatch(setProductAction(response.data.data))
}
export const getProduct = (data) => async (dispatch) => {
    const response = await productservice.getProductDetail(data);
    dispatch(setProductDetailAction(response.data.data))
}


export const {setProductAction , setProductDetailAction} = productSlice.actions
export const stateProduct = (state) => state.product
export default productSlice.reducer