import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../utils";

// Initial state for auth state
const initialState : IAuthState = {
    isAuthenticated : false,
}

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        // Authentication method
        setAuthentication(state, action){
            state.isAuthenticated = action.payload;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;