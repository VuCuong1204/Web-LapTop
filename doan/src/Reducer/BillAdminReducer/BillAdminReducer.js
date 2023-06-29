import { createSlice } from "@reduxjs/toolkit";
import { billadminservice } from "../../Service/BillAdminService/BillAdminService";
import { notification } from "antd";
import { openNotification } from "../../View/SupportView/Notification/Notification";

export const billAdminSlice = createSlice({
    name: "billadmin",
    initialState: {
        listAllBill: [],
        listBillNeedAccept: [],
        listBillDenieAccept: [],
        listBillComplete: [],
        listBillTraver : [],
    },
    reducers: {
        putListAllBill: (state, action) => {
            state.listAllBill = action.payload;
        },
        putListBillNeedAccept: (state, action) => {
            state.listBillNeedAccept = action.payload;
        },
        putListBillDenieAccept: (state, action) => {
            state.listBillDenieAccept = action.payload;
        },
        putBillListComplete: (state, action) => {
            state.listBillComplete = action.payload;
        },
        putBillListTraver  : (state,action) => {
            state.listBillTraver = action.payload;
        }
    }
})

export const getListAllBill = (data) => async (dispatch) => {
    const response = await billadminservice.getListBill(data);
    dispatch(putListAllBill(response.data.data))
}

export const getListBillNeedAccept = (data) => async (dispatch) => {
    const response = await billadminservice.getListBill(data);
    dispatch(putListBillNeedAccept(response.data.data.filter(i=> i.status === "1")))
}

export const getListBillDenieAccept = (data) => async (dispatch) => {
    const response = await billadminservice.getListBill(data);
    dispatch(putListBillDenieAccept(response.data.data.filter(i=> i.status === "0")))
}

export const getListBillTraver = (data) => async (dispatch) => {
    const response = await billadminservice.getListBill(data);
    dispatch(putBillListTraver(response.data.data.filter(i=> i.status === "2")))
}

export const getListBillComplete = (data) => async (dispatch) => {
    const response = await billadminservice.getListBill(data);
    dispatch(putBillListComplete(response.data.data.filter(i=> i.status === "3")))
}

export const changeStatusBillAdmin = (data) => async (dispatch) => {
    const response = await billadminservice.changeStatusBillAdmin(data);
    dispatch(putListAllBill(response.data.data))
    dispatch(putListBillDenieAccept(response.data.data.filter(i=> i.status === "0")))
    dispatch(putListBillNeedAccept(response.data.data.filter(i=> i.status === "1")))
    dispatch(putBillListTraver(response.data.data.filter(i=> i.status === "2")))
    dispatch(putBillListComplete(response.data.data.filter(i=> i.status === "3")))
    if(response.data.code === 0) {
        dispatch(openNotification("SUCCESS", "Bạn đã thao tác thành công"))
    }
    else {
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thử lại sau"))
    }
}

export const changeStatusPaymentBillAdmin = (data) => async (dispatch) => {
    const response = await billadminservice.changeStatusPaymentBillAdmin(data);
    dispatch(putListAllBill(response.data.data))
    dispatch(putListBillDenieAccept(response.data.data.filter(i=> i.status === "0")))
    dispatch(putListBillNeedAccept(response.data.data.filter(i=> i.status === "1")))
    dispatch(putBillListTraver(response.data.data.filter(i=> i.status === "2")))
    dispatch(putBillListComplete(response.data.data.filter(i=> i.status === "3")))
    if(response.data.code === 0) {
        dispatch(openNotification("SUCCESS", "Bạn đã thao tác thành công"))
    }
    else {
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thử lại sau"))
    }
}

export const completeBillAction = (data) => async (dispatch) => {
    const response = await billadminservice.completeBill(data);
    dispatch(putListAllBill(response.data.data))
    dispatch(putListBillDenieAccept(response.data.data.filter(i=> i.status === "0")))
    dispatch(putListBillNeedAccept(response.data.data.filter(i=> i.status === "1")))
    dispatch(putBillListTraver(response.data.data.filter(i=> i.status === "2")))
    dispatch(putBillListComplete(response.data.data.filter(i=> i.status === "3")))
    if(response.data.code === 0) {
        dispatch(openNotification("SUCCESS", "Bạn đã thao tác thành công"))
    }
    else {
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thử lại sau"))
    }
}


export const { putListAllBill, putListBillNeedAccept, putListBillDenieAccept, putBillListComplete , putBillListTraver} = billAdminSlice.actions
export const stateBillAdmin = (state) => state.billadmin
export default billAdminSlice.reducer