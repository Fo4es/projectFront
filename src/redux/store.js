import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slice/auth.slices";
import {paidReducer} from "./slice/paid.slice";

const rootReducer = combineReducers ({
    auth:authReducer,
    paid:paidReducer,
    admin:paidReducer,
    token:paidReducer,
    password:paidReducer,
    profile:paidReducer,
    statistic:paidReducer,
});

const setupStore =()=> configureStore({
    reducer:rootReducer
});

export {
    setupStore
}