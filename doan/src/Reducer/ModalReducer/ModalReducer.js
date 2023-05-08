import { createSlice } from "@reduxjs/toolkit";

export const popUpSlice = createSlice({
    name: "popup",
    initialState: {
        visiable: false,
        title: "",
        ModalComponent: <></>,
    },
    reducers: {
        openModalAction: (state, action) => {
            state.visiable = true
            state.title = action.payload.title
            state.ModalComponent = action.payload.ModalComponent
        }
        ,
        closeModalAction: (state) => {
            state.title = ""
            state.visiable = false
            state.ModalComponent = <></>
        }
    },
});

export const { openModalAction, closeModalAction } = popUpSlice.actions;
export const statePopup = (state) => state.popup;
export default popUpSlice.reducer;
