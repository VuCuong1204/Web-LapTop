import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { globalSlice } from "./GlobalReducer/GlobalReducer";
import { homeSlice } from "./HomeReducer/HomeReducer";
import { popUpSlice } from "./ModalReducer/ModalReducer";
import { profileSlice } from "./ProfileReducer/ProfileReducer";
import { testSlice } from "./TableTestApi/test";

const store = configureStore({
    reducer: {
        test: testSlice.reducer,
        global: globalSlice.reducer,
        profile: profileSlice.reducer,
        home: homeSlice.reducer,
        popup : popUpSlice.reducer,
    },
    

})

export default store;