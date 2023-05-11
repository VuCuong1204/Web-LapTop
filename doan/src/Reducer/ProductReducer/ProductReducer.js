import { createSlice } from "@reduxjs/toolkit";
import { productservice } from "../../Service/ProductService/ProductService";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: {},
        productChosse: {},
        optionRomRam: "",
        listoptionRomRam: []
    },
    reducers: {
        setProductAction: (state, action) => {
            state.products = action.payload;
        },
        setProductDetailAction: (state, action) => {
            state.products = action.payload;
            state.productChosse = action.payload;
        },
        setOptionRomRamAction: (state, action) => {
            state.optionRomRam = action.payload;
        },
        setListOptionRomRam: (state, action) => {
            state.listoptionRomRam = action.payload
        }
    }
});

export const getProductById = (data) => async (dispatch) => {
    const response = await productservice.getProduct(data);
    dispatch(setProductAction(response.data.data))
    const listOption = response.data.data.detailList.map((item) => {
        return {
            label: item.productRam + " - " + item.productRom,
            value: {
                RAM: item.productRam,
                ROM: item.productRom
            }
        }
    })
    dispatch(setListOptionRomRam(listOption))
}

export const getProduct = (data) => async (dispatch) => {
    const response = await productservice.getProductDetail(data);
    dispatch(setProductDetailAction(response.data.data))
}


export const { setProductAction, setProductDetailAction, setOptionRomRamAction, setListOptionRomRam } = productSlice.actions
export const stateProduct = (state) => state.product
export default productSlice.reducer