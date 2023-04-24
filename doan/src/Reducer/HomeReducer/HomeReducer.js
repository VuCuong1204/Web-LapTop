import { createSlice } from "@reduxjs/toolkit";
import { homeservice } from "../../Service/HomeService/HomeService";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        listProductType: []
    },
    reducers: {
        setListProductType: (state, action) => {
            state.listProductType = action.payload
        }
    },
});

export const getListProductTypeAction = () => async (dispatch) => {
    const response = await homeservice.getListProductType()
    if (response.status === 200) {
        dispatch(setListProductType(response.data.data))
    }
    else {
        console.log("Error")
    }
}

export const { setListProductType } = homeSlice.actions
export const stateHome = (state) => state.home
export default homeSlice.reducer