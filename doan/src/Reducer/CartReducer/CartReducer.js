import { createSlice } from "@reduxjs/toolkit"
import { setFalseLoading, setTrueLoading } from "../LoadingReducer/LoadingPageReducer"
import { cartservice } from "../../Service/CartService/CartService"
import { openNotification } from "../../View/SupportView/Notification/Notification";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        listCart: [],
        listOptionCart: [],
        cartChoose: []
    },
    reducers: {
        putListCartAction: (state, action) => {
            state.listCart = action.payload
        },
        putListOptionCartAction: (state, action) => {
            state.listOptionCart = action.payload
        },
        setCartChoose: (state, action) => {
            state.cartChoose = action.payload
        }
    }
});

export const getListCartAction = (data, id) => async (dispatch) => {
    try {
        dispatch(setTrueLoading())
        const response = await cartservice.getListCart(data)
        dispatch(putListCartAction(response.data.data))
        const listOptionNew = response.data.data.map((item) => {
            return item.cartId
        })
        const dataSave = response.data.data.filter(item => item.id_edit === id)
        dispatch(setCartChoose(dataSave))
        dispatch(putListOptionCartAction(listOptionNew))
        dispatch(setFalseLoading())
    }
    catch (err) {
        dispatch(setFalseLoading())
    }
}

export const updateQuantityAction = (data) => async (dispatch) => {
    try {
        const response = await cartservice.updateQuantity(data);
        dispatch(putListCartAction(response.data.data))
        const listOptionNew = response.data.data.map((item) => {
            return item.cartId
        })
        dispatch(putListOptionCartAction(listOptionNew))
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteCartAction = (data) => async (dispatch) => {
    try {
        const response = await cartservice.deleteCart(data);
        if (response.data.code === 0) {
            dispatch(putListCartAction(response.data.data))
            const listOptionNew = response.data.data.map((item) => {
                return item.cartId
            })
            dispatch(putListOptionCartAction(listOptionNew))
            dispatch(openNotification("SUCCESS", "Bạn đã xóa sản phẩm ra khỏi giỏ hàng thành công"));
        }
        else {
            dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thử lại sau"))
        }
    }
    catch (err) {

    }
}

export const addCartAction = (data) => async (dispatch) => {
    try {
        const response = await cartservice.addCart(data)
        if (response.data.code === 0) {
            const listOptionNew = response.data.data.map((item) => {
                return item.cartId
            })
            dispatch(putListOptionCartAction(listOptionNew))
            openNotification("SUCCESS", "Thêm sản phẩm vào giỏ hàng thành công");
        }
        else {
            dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thử lại sau"))
        }
    }
    catch (err) {

    }
}

export const { putListCartAction, putListOptionCartAction, setCartChoose } = cartSlice.actions
export const stateCart = (state) => state.cart
export default cartSlice.reducer