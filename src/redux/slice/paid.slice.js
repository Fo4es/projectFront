import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {paidService} from "../../services/paid.service";
import {authServices} from "../../services/auth.service";

const initialState={
    paid:[],
    search:[],
    admin:[],
    token:null,
    password:null,
    userForUpdate:null,
    profile:[],
    statistic:null,
    ban:null,
    comments:null

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

const usersMy = createAsyncThunk(
    'usersMy',
    async ()=>{
        const {data} = await paidService.usersMy();
        return data
    }
);

const userStatistic = createAsyncThunk(
    'userStatistic',
    async ({id})=>{
        const {data} = await paidService.usersStatistic(id);
        return data
    }
);

const banUser = createAsyncThunk(
    'banUser',
    async ({id,select})=>{
        const {data} = await paidService.banUsers(id,select);
        return data
    }
);

const createComments = createAsyncThunk(
    'createComments',
    async ({id,comment})=>{
        const {data} = await paidService.createComments(id,comment);
        return data
    }
);



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
                .addCase(usersMy.fulfilled,(state, action) => {
                    authServices.setUser(action.payload)
                })
                .addCase(userStatistic.fulfilled,(state, action) => {
                    state.statistic = action.payload
                })
                .addCase(banUser.fulfilled,(state, action) => {
                    state.ban = action.payload
                })
                .addCase(createComments.fulfilled,(state, action) => {
                    state.comments = action.payload
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
    setUserForUpdate,
    usersMy,
    userStatistic,
    banUser,
    createComments
}
export {
    paidActions,
    paidReducer
}
