import { createSlice } from "@reduxjs/toolkit";
import { profileservice } from "../../Service/ProfileService/ProfileService";
import { openNotification } from "../../View/SupportView/Notification/Notification";
import { getUserInfo } from "../GlobalReducer/GlobalReducer";
import { setFalseLoadingSpin } from "../LoadingReducer/LoadingPageReducer";

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
    try {
        const response = await profileservice.editProfile(data);
        if (response.data.code === 0) {
            dispatch(getUserInfo(response.data.data[0]));
            sessionStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.data[0])
            );
            dispatch(setFalseLoadingSpin())
            openNotification("SUCCESS", "Đổi thông tin thành công")
        }
        else {
            dispatch(setFalseLoadingSpin())
            dispatch(setMessageNoticeEditProfile(response.data.msg))
            dispatch(openNotification("ERROR", "Đổi thông tin thất bại"))
        }
    } catch (error) {
        dispatch(setFalseLoadingSpin())
    }


}

export const { setMessageNoticeChangePassword, setMessageNoticeEditProfile } = profileSlice.actions
export const stateProfile = (state) => state.profile
export default profileSlice.reducer