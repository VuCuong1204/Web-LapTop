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
import { billAdminSlice } from "./BillAdminReducer/BillAdminReducer";
import { billUserSlice } from "./BillReducer/BillReducer";

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
    cart: cartSlice.reducer,
    billadmin : billAdminSlice.reducer,
    billuser : billUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),

})

export default store;