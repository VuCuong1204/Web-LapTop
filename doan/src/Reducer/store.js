import { configureStore } from "@reduxjs/toolkit";
import { testSlice } from "./TableTestApi/test";
import { globalSlice } from "./GlobalReducer/GlobalReducer";

const store = configureStore({
    reducer : {
        test : testSlice.reducer,
        global : globalSlice.reducer,   
    }
})

export default store;