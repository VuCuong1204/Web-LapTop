import { createSlice } from "@reduxjs/toolkit";

export const popUpSlice = createSlice({
    name: "popup",
    initialState: {
        visiable: false,
        ModalComponent: <></>,
        title: ""
    },
    reducers: {
        openModalAction: (state, action) => {
            console.log(action.payload)
            // state.visiable = true
            state.ModalComponent = action.payload
            // state.title = action.payload.title
        }
        ,
        closeModalAction: (state, action) => {
            state.visiable = false
            state.ModalComponent = <></>
            state.title = ""
        }
    },
});

export const { openModalAction, closeModalAction } = popUpSlice.actions;
export const statePopup = (state) => state.popup;
export default popUpSlice.reducer;
