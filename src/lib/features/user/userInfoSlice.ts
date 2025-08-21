import { TUserInfo } from "@/types/User/UserInfo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { userInfo: TUserInfo } = {
    userInfo: null
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<TUserInfo>) => {
            state.userInfo = action.payload;
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
        },
        updateUserInfo: (state, action: PayloadAction<Partial<NonNullable<TUserInfo>>>) => {
            if (state.userInfo) {
                state.userInfo = { ...state.userInfo, ...action.payload }
            }
        }
    }
})

export const { setUserInfo, clearUserInfo, updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;