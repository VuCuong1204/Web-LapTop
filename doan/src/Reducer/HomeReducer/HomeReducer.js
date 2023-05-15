import { createSlice } from "@reduxjs/toolkit";
import { homeservice } from "../../Service/HomeService/HomeService";
import { setFalseLoading } from "../LoadingReducer/LoadingPageReducer";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        listProductType: [],
        listProduct: []
    },
    reducers: {
        setListProductType: (state, action) => {
            state.listProductType = action.payload
        },
        setListProduct: (state, action) => {
            state.listProduct = action.payload
        }
    },
});

export const getListProductTypeAction = () => async (dispatch) => {
    try {
        const response = await homeservice.getListProductType()
        if (response.status === 200) {
            dispatch(setListProductType(response.data.data))
            dispatch(setFalseLoading())
        }
        else {
            console.log("Error")
            dispatch(setFalseLoading())
        }
    }
    catch (err) {
        dispatch(setFalseLoading())
    }
}

export const getListProductAction = () => async (dispatch) => {
    try {
        const response = await homeservice.getListProduct()
        if (response.status === 200) {
            dispatch(setListProduct(response.data.data))
            dispatch(setFalseLoading())
        }
        else {
            console.log("Error")
            dispatch(setFalseLoading())
        }
    }
    catch (err) {
        dispatch(setFalseLoading())
    }

}

export const { setListProductType, setListProduct } = homeSlice.actions
export const stateHome = (state) => state.home
export default homeSlice.reducer