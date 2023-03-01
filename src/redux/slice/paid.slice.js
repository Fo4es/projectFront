import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {paidService} from "../../services/paid.service";

const initialState={
    paid:[],
    search:[],
    admin:[],
    token:null,
    password:null,
    userForUpdate:null

};

const getAll = createAsyncThunk(
    'paid/getAll',
    async ({page,name,email,age,course,status,course_format,course_type,order})=>{
        const {data} = await paidService.getAll(page,name,email,age,course,status,course_format,course_type,order)
        return data

    }
);
const getAdminUser = createAsyncThunk(
    'paid/getAdminUser',
    async ()=>{
        const {data} = await paidService.getAdminUsers()
        return data

    }
);
const patchComent = createAsyncThunk(
    'paid/pucth',
         async ({id,element}) => {
    const {data} = await paidService.patchByID(id,element);
    return data
}
)
const createUser = createAsyncThunk(
    'admin/create',
    async ({user})=>{
        const {data} = await paidService.createUser(user)
        return data
    }
)
const activateUser = createAsyncThunk(
    'admin/user',
    async ({id})=>{
        const {data} = await paidService.activateUser(id)
        return data
    }
)
const activateToken = createAsyncThunk(
    'admin/token',
    async ({token,ActivateUser})=>{
        const {data} = await paidService.activateToken(token,ActivateUser)
        return data
    }
)


const paidSlice = createSlice({
        name:'paid',
        initialState,
        reducers:{
            setUserForUpdate: (state, action) => {
                state.userForUpdate = action.payload;
            }
        },
        extraReducers:(builder )=>{
            builder
                .addCase(getAll.fulfilled,(state, action) => {
                    state.paid = action.payload;
                })
                .addCase(patchComent.fulfilled,(state, action) => {
                    const current = state.paid.find(value => value.id === action.payload.id);
                    Object.assign(current, action.payload);
                    state.userForUpdate = null
                    })
                .addCase(getAdminUser.fulfilled,(state, action) => {
                    state.admin = action.payload;
                })
                .addCase(createUser.fulfilled,(state, action) => {
                    state.admin.push(action.payload)
                })
                .addCase(activateUser.fulfilled,(state, action) => {
                    state.token = action.payload;
                })
                .addCase(activateToken.fulfilled,(state, action) => {
                    state.password = action.payload
                })
        }

    }
);
const {reducer:paidReducer,actions:{setUserForUpdate}} = paidSlice

const paidActions = {
    getAll,
    patchComent,
    getAdminUser,
    createUser,
    activateUser,
    activateToken,
    setUserForUpdate
}
export {
    paidActions,
    paidReducer
}
