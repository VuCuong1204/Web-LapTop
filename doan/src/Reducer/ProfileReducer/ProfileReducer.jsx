import { createSlice } from "@reduxjs/toolkit";
import { profileservice } from "../../Service/ProfileService/ProfileService";
import { openNotification } from "../../View/SupportView/Notification/Notification";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../GlobalReducer/GlobalReducer";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        messageNoticeChangePassword: "",
        messageNoticeEditProfile: "",
    },
    reducers: {
        setMessageNoticeChangePassword: (state, action) => {
            state.messageNoticeChangePassword = action.payload
        }
        ,
        setMessageNoticeEditProfile: (state, action) => {
            state.messageNoticeEditProfile = action.payload
        }
    },
});

export const editProfileAction = (data) => async (dispatch) => {
    const response = await profileservice.editProfile(data);
    if (response.data.code === 0) {
        dispatch(getUserInfo(response.data.data[0]));
        sessionStorage.setItem(
            "userInfo",
            JSON.stringify(response.data.data[0])
        );
        openNotification("SUCCESS", "Đổi thông tin thành công")
    }
    else {
        dispatch(setMessageNoticeEditProfile(response.data.msg))
        dispatch(openNotification("ERROR", "Đổi thông tin thất bại"))
    }

}

export const { setMessageNoticeChangePassword , setMessageNoticeEditProfile } = profileSlice.actions
export const stateProfile = (state) => state.profile
export default profileSlice.reducer