import { createSlice } from "@reduxjs/toolkit";
import { billadminservice } from "../../Service/BillAdminService/BillAdminService";
import { billservice } from "../../Service/BillService/BillService";

export const billUserSlice = createSlice({
    name: "billuser",
    initialState: {
        listAllBillUser: [],
        listBillNeedAcceptUser: [],
        listBillDenieAcceptUser: [],
        listBillCompleteUser: [],
        listBillTraverUser : [],
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


export const { putListAllBillUser, putListBillNeedAcceptUser, putListBillDenieAcceptUser, putBillListCompleteUser , putBillListTraverUser} = billUserSlice.actions
export const stateBillUser = (state) => state.billuser
export default billUserSlice.reducer