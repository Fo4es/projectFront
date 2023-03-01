import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authServices} from "../../services/auth.service";

const initialState = {
    errors:null,
    isAuth:null

};

const login = createAsyncThunk(
    'authSlice/login',
    async ({user}, {rejectedWithValue})=>{
        try {
            const {data} = await authServices.login(user);
            console.log(data);
            return data

        }catch (e){
            return rejectedWithValue(e.response.data)
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
                console.log(action.payload);
                authServices.setTokens(action.payload)
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1);
                if(type === 'rejected') {
                    state.errors = action.payload;
                }else {
                    state.errors = null;
                }
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