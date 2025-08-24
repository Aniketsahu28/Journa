import { TActiveCategory } from "@/types/category/TActiveCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { activeCategory: TActiveCategory } = {
    activeCategory: null
}

const activeCategorySlice = createSlice({
    name: "activeCategory",
    initialState,
    reducers: {
        setActiveCategory: (state, action: PayloadAction<NonNullable<TActiveCategory>>) => {
            state.activeCategory = action.payload;
        },
    }
})

export const { setActiveCategory } = activeCategorySlice.actions;
export default activeCategorySlice.reducer;