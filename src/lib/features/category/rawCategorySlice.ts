import { TCategory } from "@/components/SideBar/types/TCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { rawCategory: TCategory } = {
    rawCategory: [],
};

const rawCategorySlice = createSlice({
    name: "rawCategory",
    initialState,
    reducers: {
        setRawCategory: (state, action: PayloadAction<TCategory>) => {
            state.rawCategory = action.payload;
        },
        addRawCategory: (state, action: PayloadAction<TCategory[number]>) => {
            state.rawCategory.push(action.payload);
        },
        updateRawCategory: (state, action: PayloadAction<{ id: number; name?: string; parentId?: number | null }>
        ) => {
            const { id, name, parentId } = action.payload;
            const category = state.rawCategory.find((cat) => cat.id === id);

            if (category) {
                if (name !== undefined) category.name = name;
                if (parentId !== undefined) category.parentId = parentId;
            }
        },
        deleteRawCategory: (state, action: PayloadAction<number>) => {
            state.rawCategory = state.rawCategory.filter(
                (cat) => cat.id !== action.payload
            );
        },
    },
});

export const {
    setRawCategory,
    addRawCategory,
    updateRawCategory,
    deleteRawCategory
} = rawCategorySlice.actions;

export default rawCategorySlice.reducer;
