import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: true,
        loadingSpin: false
    },
    reducers: {
        setFalseLoading: (state) => {
            state.loading = false
        },
        setTrueLoading: (state) => {
            state.loading = true
        },
        setTrueLoadingSpin: (state) => {
            state.loadingSpin = true
        },
        setFalseLoadingSpin: (state) => {
            state.loadingSpin = false
        }
    },
});

export const { setFalseLoading, setTrueLoading, setTrueLoadingSpin, setFalseLoadingSpin } = loadingSlice.actions
export const stateLoadingPage = (state) => state.loading
export default loadingSlice.reducer