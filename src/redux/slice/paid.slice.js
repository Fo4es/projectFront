import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {paidService} from "../../services/paid.service";

const initialState={
    paid:[],
    search:[],

};

const getAll = createAsyncThunk(
    'paid/getAll',
    async ({page,name,email,age,course,status,course_format,course_type,order})=>{
        const {data} = await paidService.getAll(page,name,email,age,course,status,course_format,course_type,order)
        return data

    }
);
const patchComent = createAsyncThunk(
    'paid/pucth',
         async ({id,comments}) => {
    const {data} = await paidService.patchByID(id,comments);
    return data
}
)


const paidSlice = createSlice({
        name:'paid',
        initialState,
        reducers:{},
        extraReducers:(builder )=>{
            builder
                .addCase(getAll.fulfilled,(state, action) => {
                    state.paid = action.payload;
                })
                .addCase(patchComent.fulfilled,(state, action) => {
                    const current = state.paid.find(value => value.id === action.payload.id);
                    Object.assign(current, action.payload);
                    })
        }

    }
);
const {reducer:paidReducer,actions} = paidSlice

const paidActions = {
    getAll,
    patchComent
}
export {
    paidActions,
    paidReducer
}
