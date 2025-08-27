import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    open: true,
    width: 288
}

const navigationSlice = createSlice({
    name: "navigaion",
    initialState,
    reducers: {
        setNavigationOpen: (state) => {
            state.open = !state.open;
        },
        setNavigationWidth: (state, action: PayloadAction<number>) => {
            state.width = action.payload;
        }
    }
})

export const { setNavigationOpen, setNavigationWidth } = navigationSlice.actions;
export default navigationSlice.reducer;