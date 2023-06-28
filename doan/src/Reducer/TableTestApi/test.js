import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

export const testSlice = createSlice({
  name: "test",
  initialState: {
    data: {},
    status : false
  },
  reducers: {
    getTodo: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const getData = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.publicapis.org/entries`);
    if (response.status === 200) {
      dispatch(getTodo(response.data));
    }
  } catch (err) {
  }
};

export const { getTodo } = testSlice.actions;
export const stateTest = (state) => state.test;
export default testSlice.reducer;
