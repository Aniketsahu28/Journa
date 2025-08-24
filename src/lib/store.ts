import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userInfoReducer from "@/lib/features/user/userInfoSlice";
import activeCategoryReducer from "@/lib/features/category/activeCategorySlice";

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    activeCategory: activeCategoryReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["activeCategory"], // ✅ only persist whitelist slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
