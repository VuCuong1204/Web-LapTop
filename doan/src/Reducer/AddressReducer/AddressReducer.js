import { createSlice } from "@reduxjs/toolkit";
import { addressservice } from "../../Service/AddressService/AddressService";
import { openNotification } from "../../View/SupportView/Notification/Notification";
import { closeModalAction } from "../ModalReducer/ModalReducer";
import { setFalseLoadingSpin } from "../LoadingReducer/LoadingPageReducer";

export const addressSlice = createSlice({
    name: "address",
    initialState: {
        listAddress: [],
    },
    reducers: {
        putListAddressAction: (state, action) => {
            state.listAddress = action.payload
        }
    }
})

export const getListAddressAction = (data) => async (dispatch) => {
    const response = await addressservice.getListAddress(data);
    dispatch(putListAddressAction(response.data.data))
}

export const addAddressAction = (data) => async (dispatch) => {
    const response = await addressservice.addAddress(data);
    if (response.data.code === 0) {
        dispatch(putListAddressAction(response.data.data))
        dispatch(closeModalAction())
        dispatch(openNotification("SUCCESS", "Thêm mới địa chỉ thành công"));
    }
    else {
        dispatch(openNotification("ERROR", "Thêm mới địa chỉ thất bại"));
    }
}

export const editAddressAction = (data) => async (dispatch) => {
    const response = await addressservice.editAddress(data);
    if (response.data.code === 0) {
        dispatch(putListAddressAction(response.data.data))
        dispatch(closeModalAction())
        dispatch(openNotification("SUCCESS", "Sửa địa chỉ thành công"));
    }
    else {
        dispatch(openNotification("ERROR", "Sửa địa chỉ thất bại"));
    }
}

export const deleteAddressAction = (data) => async (dispatch) => {
    try {
        const response = await addressservice.deleteAddress(data);
        dispatch(putListAddressAction(response.data.data))
        dispatch(setFalseLoadingSpin())
        dispatch(openNotification("SUCCESS", "Xóa địa chỉ thành công"))
    }
    catch (err) {
        dispatch(setFalseLoadingSpin())
    }
}

export const editDefaultAddressAction = (data) => async (dispatch) => {
    try {
        const response = await addressservice.editDefaultAddress(data);
        dispatch(putListAddressAction(response.data.data))
        dispatch(setFalseLoadingSpin())
        dispatch(openNotification("SUCCESS", "Đổi địa chỉ mặc định thành công"))
    }
    catch (err) {
        dispatch(setFalseLoadingSpin())
    }

}

export const { putListAddressAction } = addressSlice.actions
export const stateAddress = (state) => state.address
export default addressSlice.reducer