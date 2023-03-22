import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {authServices} from "../../services/auth.service";

const initialState = {
    error:null,
    isAuth:null

};

const login = createAsyncThunk(
    'authSlice/login',
    async ({user}, { rejectWithValue })=>{
        try {
            const {data} = await authServices.login(user);
            return data

        }catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error)
            }
        }
    }
);

const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>
        builder
            .addCase(login.fulfilled,(state, action) => {
                state.isAuth = true;
                authServices.setTokens(action.payload);
                state.error = null;
            })
            .addCase(login.rejected,(state, action) => {
                state.error = action.payload;
            })

})

const {reducer:authReducer} = authSlice

const authActions = {
    login
}
export {
    authReducer,
    authActions
}