import { createSlice } from "@reduxjs/toolkit";
import { homeservice } from "../../Service/HomeService/HomeService";
import { setFalseLoading } from "../LoadingReducer/LoadingPageReducer";
import { openNotification } from "../../View/SupportView/Notification/Notification";

export const searchByProducerSlice = createSlice({
    name: "search",
    initialState: {
        listProductSearch: [],
    },
    reducers: {
        setListProductSearch: (state, action) => {
            state.listProductSearch = action.payload
        },
    },
});

export const getListProductSearchAction = (data) => async (dispatch) => {
    try {
        const response = await homeservice.getListProduct()
        if (response.status === 200) {
            dispatch(setListProductSearch(response.data.data.filter(i => i.productTypeId === data)))
            dispatch(setFalseLoading())
        }
        else {
            dispatch(setFalseLoading())
        }
    }
    catch (err) {
        dispatch(openNotification("ERROR","Lỗi hệ thống"))
        dispatch(setFalseLoading())
    }

}
export const { setListProductSearch } = searchByProducerSlice.actions
export const stateSearch = (state) => state.search
export default searchByProducerSlice.reducer