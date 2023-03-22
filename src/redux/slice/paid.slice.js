import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
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
    comment:[],
    comments:[],
    prev:null,
    next:null,
    group:[],
    error:null

};

const getAll = createAsyncThunk(
    'paid/getAll',
    async ({page,name,surname,email,age,course,status,course_format,course_type,order,size,start_date,group})=>{
        const {data} = await paidService.getAll(page,name,surname,email,age,course,status,course_format,course_type,order,size,start_date,group)
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
    async ({id,element},{ rejectWithValue }) => {
        try {
            const {data} = await paidService.patchByID(id,element);
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

const getComments = createAsyncThunk(
    'getComments',
    async ({id})=>{
        const {data} = await paidService.getComments(id);
        return data
    }
);

const getGroup = createAsyncThunk(
    'getGroup',
    async ()=>{
        const {data} = await paidService.getGroup();
        return data
    }
);

const postGroup = createAsyncThunk(
    'postGroup',
    async ({group})=>{
        const {data} = await paidService.postGroup(group);
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
                    state.prev = action.payload.previous;
                    state.next = action.payload.next
                })
                .addCase(patchComent.fulfilled,(state, action) => {
                    const current2 = state.paid.results.find(value => value.id === action.payload.id);
                    Object.assign(current2, action.payload);
                    state.userForUpdate = null;
                    state.error = null;
                })
                .addCase(patchComent.rejected,(state, action) => {
                    state.error = action.payload
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
                    state.password = action.payload;
                    state.error = null;

                })
                .addCase(activateToken.rejected,((state, action) => {
                    state.error = action.payload
                }))

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
                    state.comments.push(action.payload);
                })
                .addCase(getComments.fulfilled,((state, action) => {
                    state.comments = action.payload;
                }))
                .addCase(getGroup.fulfilled,((state, action) => {
                    state.group = action.payload;
                }))
                .addCase(postGroup.fulfilled,(state, action) => {
                    state.group.results.push(action.payload);
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
    createComments,
    getComments,
    getGroup,
    postGroup

}
export {
    paidActions,
    paidReducer
}
