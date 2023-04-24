import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        visiable: false,
        ModalComponent: <></>,
        title: ""
    },
    reducers: {
        openModalAction: (state, action) => {
            state.visiable = true
            state.ModalComponent = action.payload.ModalComponent
            state.title = action.payload.title
        }
        ,
        closeModalAction: (state, action) => {
            state.visiable = false
            state.ModalComponent = <></>
            state.title = ""
        }
    },
});
