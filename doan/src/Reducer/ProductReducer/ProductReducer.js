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
        count: 1,
        listComment: [],
        defaultAddress: {},
        priceProduct: 0,
    },
    reducers: {
        setProductAction: (state, action) => {
            state.products = action.payload;
        },
        setProductDetailAction: (state, action) => {
            state.products = action.payload;
            state.productChosse = action.payload;
        },
        setOptionIdProduct: (state, action) => {
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
        },
        setPriceProduct: (state, action) => {
            state.priceProduct = action.payload
        }
    }
});

export const getProductById = (data) => async (dispatch) => {
    try {
        const response = await productservice.getProduct(data);
        dispatch(setProductAction(response.data.data))
        dispatch(setPriceProduct(response.data.data.detailList[0].productPrice))
        // const listOption = response.data.data.detailList.map((item) => {
        //     return {
        //         label: item.productRam + " - " + item.productRom,
        //         value: item.id_edit
        //     }
        // })
        // dispatch(setListOptionRomRam(listOption))
        dispatch(setFalseLoading())
    }
    catch (err) {
        dispatch(setFalseLoading())
    }
}

export const setListOptionRomRamAction = (data) => async (dispatch) => {
    try {
        const response = await productservice.getProduct(data);
        const listOption = response.data.data.detailList.map((item) => {
            return {
                label: item.productRam + " - " + item.productRom,
                value: item.id_edit
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
        dispatch(setPriceProduct(response.data.data.detailList.productPrice))
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
    dispatch(setDefaultAdress(response.data.data[0].address))
}

export const { setProductAction, setProductDetailAction, setOptionIdProduct, setListOptionRomRam, increaseCount, decreaseCount, setCount, setListComment, setDefaultAdress, setPriceProduct } = productSlice.actions
export const stateProduct = (state) => state.product
export default productSlice.reducer