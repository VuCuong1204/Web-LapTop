import { createSlice } from "@reduxjs/toolkit"
import { setFalseLoading, setTrueLoading } from "../LoadingReducer/LoadingPageReducer"
import { cartservice } from "../../Service/CartService/CartService"
import { openNotification } from "../../View/SupportView/Notification/Notification";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        listCart: [],
        listOptionCart: [],
        cartChoose: [],
        checkedAll: false,
        totalQuantity: 0,
        totalPrice: 0
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
        },
        setCheckedAll: (state, action) => {
            state.checkedAll = action.payload
        },
        setTotalQuantity: (state, action) => {
            state.totalQuantity = action.payload
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        }
    }
});

export const getListCartAction = (data) => async (dispatch) => {
    try {
        dispatch(setTrueLoading())
        const response = await cartservice.getListCart(data)
        dispatch(putListCartAction(response.data.data))
        const newList = response.data.data.filter(i => i.cartSelected === "1" && i.status === "0")
        dispatch(setCheckedAll(newList.length === response.data.data.length ? true : false))
        dispatch(setTotalQuantity(newList.length))
        if (newList.length > 0) {
            let a = 0;
            newList.map(item => {
                a = parseInt(a) + parseInt(item.totalPrice)
            })
            dispatch(setTotalPrice(a))
        }
        else {
            dispatch(setTotalPrice(0))
        }
        dispatch(setFalseLoading())
    }
    catch (err) {
        dispatch(setFalseLoading())
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra,vui lòng thử lại sau"))
    }
}

export const updateQuantityAction = (data) => async (dispatch) => {
    try {
        const response = await cartservice.updateQuantity(data);
        dispatch(putListCartAction(response.data.data))
        const newList = response.data.data.filter(i => i.cartSelected === "1" && i.status === "0")
        dispatch(setCheckedAll(newList.length === response.data.data.length ? true : false))
        dispatch(setTotalQuantity(newList.length))
        if (newList.length > 0) {
            let a = 0;
            newList.map(item => {
                a = parseInt(a) + parseInt(item.totalPrice)
            })
            dispatch(setTotalPrice(a))
        }
        else {
            dispatch(setTotalPrice(0))
        }
    }
    catch (err) {
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra,vui lòng thử lại sau"))
    }
}

export const setCheckedAction = (data) => async (dispatch) => {
    try {
        const response = await cartservice.setChecked(data);
        dispatch(putListCartAction(response.data.data))
        const newList = response.data.data.filter(i => i.cartSelected === "1" && i.status === "0")
        dispatch(setCheckedAll(newList.length === response.data.data.length ? true : false))
        dispatch(setTotalQuantity(newList.length))
        if (newList.length > 0) {
            let a = 0;
            newList.map(item => {
                a = parseInt(a) + parseInt(item.totalPrice)
            })
            dispatch(setTotalPrice(a))
        }
        else {
            dispatch(setTotalPrice(0))
        }
    }
    catch (err) {
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra,vui lòng thử lại sau"))
    }
}

export const setCheckedAllAction = (data) => async (dispatch) => {
    try {
        const response = await cartservice.setCheckedAll(data);
        dispatch(putListCartAction(response.data.data))
        const newList = response.data.data.filter(i => i.cartSelected === "1" && i.status === "0")
        dispatch(setCheckedAll(newList.length === response.data.data.length ? true : false))
        dispatch(setTotalQuantity(newList.length))
        if (newList.length > 0) {
            let a = 0;
            newList.map(item => {
                a = parseInt(a) + parseInt(item.totalPrice)
            })
            dispatch(setTotalPrice(a))
        }
        else {
            dispatch(setTotalPrice(0))
        }
    }
    catch (err) {
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra,vui lòng thử lại sau"))
    }
}

export const deleteCartAction = (data) => async (dispatch) => {
    try {
        const response = await cartservice.deleteCart(data);
        if (response.data.code === 0) {
            dispatch(putListCartAction(response.data.data))
            const newList = response.data.data.filter(i => i.cartSelected === "1" && i.status === "0")
            dispatch(setCheckedAll(newList.length === response.data.data.length ? true : false))
            dispatch(setTotalQuantity(newList.length))
            if (newList.length > 0) {
                let a = 0;
                newList.map(item => {
                    a = parseInt(a) + parseInt(item.totalPrice)
                })
                dispatch(setTotalPrice(a))
            }
            else {
                dispatch(setTotalPrice(0))
            }
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
            dispatch(putListCartAction(response.data.data))
            const newList = response.data.data.filter(i => i.cartSelected === "1")
            dispatch(setCheckedAll(newList.length === response.data.data.length ? true : false))
            dispatch(setTotalQuantity(newList.length))
            if (newList.length > 0) {
                let a = 0;
                newList.map(item => {
                    a = parseInt(a) + parseInt(item.totalPrice)
                })
                dispatch(setTotalPrice(a))
            }
            else {
                dispatch(setTotalPrice(0))
            }
            dispatch(openNotification("SUCCESS", "Bạn đã xóa sản phẩm ra khỏi giỏ hàng thành công"));
        }
        else {
            dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thử lại sau"))
        }
    }
    catch (err) {

    }
}

export const selected0 = (data) => async (dispatch) => {
    try {
        const response = await cartservice.setCheckedAll(data);
    }
    catch(err) {

    }
}

export const { putListCartAction, putListOptionCartAction, setCartChoose, setCheckedAll, setTotalQuantity, setTotalPrice } = cartSlice.actions
export const stateCart = (state) => state.cart
export default cartSlice.reducer