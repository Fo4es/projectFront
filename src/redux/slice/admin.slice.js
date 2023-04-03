import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {paidService} from "../../services/paid.service";

const initialState={
    admin:[],
    token:null,
    password:null,
    statistic:[],
    ban:null,
    error:null,
    nextAdmin:null,
    prevAdmin:null,
    ordersStatistic:[]
};

const getAdminUser = createAsyncThunk(
    'paid/getAdminUser',
    async ({page})=>{
        const {data} = await paidService.getAdminUsers(page)
        return data

    }
);

const createUser = createAsyncThunk(
    'admin/create',
    async ({user},{rejectWithValue})=> {
        try {
            const {data} = await paidService.createUser(user)
            return data
        }catch (error){
            if (error.response && error.response) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error)
            }
        }
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
    async ({token,ActivateUser}, { rejectWithValue })=> {
        try {

            const {data} = await paidService.activateToken(token, ActivateUser)
            return data
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error)
            }
        }
    }

)

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

const ordersStatistic = createAsyncThunk(
    'ordersStatistic',
    async ()=>{
        const {data} = await paidService.getOrdersStatistic();
        return data
    }
);

const adminSlice = createSlice({
        name:'admin',
        initialState,
        reducers:{},
        extraReducers:(builder )=>{
            builder
                .addCase(getAdminUser.fulfilled,(state, action) => {
                    state.admin = action.payload;
                    state.prevAdmin = action.payload.previous;
                    state.nextAdmin = action.payload.next
                })
                .addCase(createUser.fulfilled,(state, action) => {
                    state.admin.push(action.payload)
                    state.error = null
                })
                .addCase(createUser.rejected,(state, action) => {
                    state.error = action.payload
                })
                .addCase(activateUser.fulfilled,(state, action) => {
                    state.token = action.payload;
                })
                .addCase(activateToken.fulfilled,(state, action) => {
                    state.password = action.payload;
                    state.error = null;

                })
                .addCase(activateToken.rejected,((state, action) => {
                    state.error = action.payload
                }))
                .addCase(userStatistic.fulfilled,(state, action) => {
                    state.statistic = action.payload
                })
                .addCase(banUser.fulfilled,(state, action) => {
                    state.ban = action.payload
                })
                .addCase(ordersStatistic.fulfilled,(state, action) => {
                    state.ordersStatistic = action.payload;
                })
        }

    }
);
const {reducer:adminReducer,actions:{}} = adminSlice

const adminActions = {
    getAdminUser,
    createUser,
    activateUser,
    activateToken,
    userStatistic,
    banUser,
    ordersStatistic,
}
export {
    adminActions,
    adminReducer
}

