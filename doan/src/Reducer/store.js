import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { globalSlice } from "./GlobalReducer/GlobalReducer";
import { homeSlice } from "./HomeReducer/HomeReducer";
import { popUpSlice } from "./ModalReducer/ModalReducer";
import { profileSlice } from "./ProfileReducer/ProfileReducer";
import { testSlice } from "./TableTestApi/test";
import { addressSlice } from "./AddressReducer/AddressReducer";
import { productSlice } from "./ProductReducer/ProductReducer";
import { loadingSlice } from "./LoadingReducer/LoadingPageReducer";
import { cartSlice } from "./CartReducer/CartReducer";

const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    popup: popUpSlice.reducer,
    global: globalSlice.reducer,
    profile: profileSlice.reducer,
    home: homeSlice.reducer,
    address: addressSlice.reducer,
    product: productSlice.reducer,
    loading: loadingSlice.reducer,
    cart: cartSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),

})

export default store;