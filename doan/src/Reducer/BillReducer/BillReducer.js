import { createSlice } from "@reduxjs/toolkit";
import { billadminservice } from "../../Service/BillAdminService/BillAdminService";
import { billservice } from "../../Service/BillService/BillService";
import { openNotification } from "../../View/SupportView/Notification/Notification";

export const billUserSlice = createSlice({
    name: "billuser",
    initialState: {
        listAllBillUser: [],
        listBillNeedAcceptUser: [],
        listBillDenieAcceptUser: [],
        listBillCompleteUser: [],
        listBillTraverUser : [],
        billLast : {},
    },
    reducers: {
        putListAllBillUser: (state, action) => {
            state.listAllBillUser = action.payload;
        },
        putListBillNeedAcceptUser: (state, action) => {
            state.listBillNeedAcceptUser = action.payload;
        },
        putListBillDenieAcceptUser: (state, action) => {
            state.listBillDenieAcceptUser = action.payload;
        },
        putBillListCompleteUser: (state, action) => {
            state.listBillCompleteUser = action.payload;
        },
        putBillListTraverUser  : (state,action) => {
            state.listBillTraverUser = action.payload;
        },
        putBillLast : (state,action) => {
            state.billLast = action.payload;
        }
    }
})

export const getListAllBillUser = (data) => async (dispatch) => {
    const response = await billservice.getListBillById(data);
    dispatch(putListAllBillUser(response.data.data))
}

export const getListBillNeedAcceptUser = (data) => async (dispatch) => {
    const response = await billservice.getListBillById(data);
    dispatch(putListBillNeedAcceptUser(response.data.data.filter(i=> i.status === "1")))
}

export const getListBillDenieAcceptUser = (data) => async (dispatch) => {
    const response = await billservice.getListBillById(data);
    dispatch(putListBillDenieAcceptUser(response.data.data.filter(i=> i.status === "0")))
}

export const getListBillTraverUser = (data) => async (dispatch) => {
    const response = await billservice.getListBillById(data);
    dispatch(putBillListTraverUser(response.data.data.filter(i=> i.status === "2")))
}

export const getListBillCompleteUser = (data) => async (dispatch) => {
    const response = await billservice.getListBillById(data);
    dispatch(putBillListCompleteUser(response.data.data.filter(i=> i.status === "3")))
}

export const changeStatusBillUser = (data) => async (dispatch) => {
    const response = await billservice.changeStatusBill(data);
    dispatch(putListAllBillUser(response.data.data))
    dispatch(putListBillDenieAcceptUser(response.data.data.filter(i=> i.status === "0")))
    dispatch(putListBillNeedAcceptUser(response.data.data.filter(i=> i.status === "1")))
    dispatch(putBillListTraverUser(response.data.data.filter(i=> i.status === "2")))
    dispatch(putBillListCompleteUser(response.data.data.filter(i=> i.status === "3")))
    if(response.data.code === 0) {
        dispatch(openNotification("SUCCESS", "Bạn đã thao tác thành công"))
    }
    else {
        dispatch(openNotification("ERROR", "Đã có lỗi xảy ra vui lòng thử lại sau"))
    }
}

export const getBillLast = (data) => async (dispatch) => {
    const response = await billservice.getListBillById(data);
    dispatch(putBillLast(response.data.data[0]))
}


export const { putListAllBillUser,putBillLast, putListBillNeedAcceptUser, putListBillDenieAcceptUser, putBillListCompleteUser , putBillListTraverUser} = billUserSlice.actions
export const stateBillUser = (state) => state.billuser
export default billUserSlice.reducer