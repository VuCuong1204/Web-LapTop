import { createSlice } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { globalservice } from "../../Service/GlobalService.js/GlobalService";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    userInfo: {},
    messageNotice: "",
    messageNoticeSignin : "",
  },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
    },
    getMessageNotice: (state, action) => {
      state.messageNotice = action.payload;
    },
    getMessageNoticeSignin :(state,action) => {
      state.messageNoticeSignin = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = {};
    },
  },
});

export const { getUserInfo, getMessageNotice, logout ,getMessageNoticeSignin} = globalSlice.actions;
export const stateGlobal = (state) => state.global;
export default globalSlice.reducer;
