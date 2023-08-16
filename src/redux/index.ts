import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
    reducer: { 
        cartReducer : cartSlice,
        authReducer : authSlice,
    }
});

export default store;