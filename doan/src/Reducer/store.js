import { configureStore } from "@reduxjs/toolkit";
import { testSlice } from "./TableTestApi/test";
import { globalSlice } from "./GlobalReducer/GlobalReducer";
import { profileSlice } from "./ProfileReducer/ProfileReducer";
import { homeSlice } from "./HomeReducer/HomeReducer";

const store = configureStore({
    reducer: {
        test: testSlice.reducer,
        global: globalSlice.reducer,
        profile: profileSlice.reducer,
        home: homeSlice.reducer
    }
})

export default store;