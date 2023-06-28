import { createSlice } from "@reduxjs/toolkit";
import { billadminservice } from "../../Service/BillAdminService/BillAdminService";

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


export const { putListAllBill, putListBillNeedAccept, putListBillDenieAccept, putBillListComplete , putBillListTraver} = billAdminSlice.actions
export const stateBillAdmin = (state) => state.billadmin
export default billAdminSlice.reducer