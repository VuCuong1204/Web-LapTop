import { createSlice } from "@reduxjs/toolkit";
import { productservice } from "../../Service/ProductService/ProductService";
import { setFalseLoading } from "../LoadingReducer/LoadingPageReducer";
import { openNotification } from "../../View/SupportView/Notification/Notification";
import { addressservice } from "../../Service/AddressService/AddressService";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: {},
        productChosse: {},
        optionRomRam: "",
        listoptionRomRam: [],
        count: 0,
        listComment: [],
        defaultAddress: {}
    },
    reducers: {
        setProductAction: (state, action) => {
            state.products = action.payload;
        },
        setProductDetailAction: (state, action) => {
            state.products = action.payload;
            state.productChosse = action.payload;
        },
        setOptionRomRamAction: (state, action) => {
            state.optionRomRam = action.payload;
        },
        setListOptionRomRam: (state, action) => {
            state.listoptionRomRam = action.payload
        },
        increaseCount: (state, action) => {
            state.count = state.count + 1;
        },
        decreaseCount: (state, action) => {
            state.count = state.count - 1
        },
        setCount: (state, action) => {
            state.count = action.count
        },
        setListComment: (state, action) => {
            state.listComment = action.payload
        },
        setDefaultAdress: (state, action) => {
            state.defaultAddress = action.payload
        }
    }
});

export const getProductById = (data) => async (dispatch) => {
    try {
        const response = await productservice.getProduct(data);
        dispatch(setProductAction(response.data.data))
        const listOption = response.data.data.detailList.map((item) => {
            return {
                label: item.productRam + " - " + item.productRom,
                value: {
                    RAM: item.productRam,
                    ROM: item.productRom
                }
            }
        })
        dispatch(setListOptionRomRam(listOption))
        dispatch(setFalseLoading())
    }
    catch (err) {
        dispatch(setFalseLoading())
    }
}

export const getProduct = (data) => async (dispatch) => {
    try {
        const response = await productservice.getProductDetail(data);
        dispatch(setProductDetailAction(response.data.data))
        dispatch(setFalseLoading())
    }
    catch (err) {
        dispatch(setFalseLoading())
    }
}

export const getListCommentAction = (data) => async (dispatch) => {
    try {
        const response = await productservice.getListComment(data)
        dispatch(setListComment(response.data.data))
        dispatch(setFalseLoading())
    }
    catch (err) {
        dispatch(setFalseLoading())
    }
}

export const deleteCommentAction = (data) => async (dispatch) => {
    const response = await productservice.deleteComment(data)
    dispatch(setListComment(response.data.data))
    dispatch(setFalseLoading())
    dispatch(openNotification("SUCCESS", "Xóa bình luận thành công"))
}

export const addCommentAction = (data) => async (dispatch) => {
    const response = await productservice.addComment(data)
    dispatch(setListComment(response.data.data))
    dispatch(setFalseLoading())
    dispatch(openNotification("SUCCESS", "Cảm ơn bạn đã phản hồi :)"))
}

export const setDefaultAdressAction = (data) => async (dispatch) => {
    const response = await addressservice.getListAddress(data)
    dispatch(setDefaultAdress(response.data.data[0]))
}

export const { setProductAction, setProductDetailAction, setOptionRomRamAction, setListOptionRomRam, increaseCount, decreaseCount, setCount, setListComment, setDefaultAdress } = productSlice.actions
export const stateProduct = (state) => state.product
export default productSlice.reducer