import {combineReducers, configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import {authReducer} from "./slice/auth.slices";
import {paidReducer} from "./slice/paid.slice";
import {adminReducer} from "./slice/admin.slice";

const rootReducer = combineReducers ({
    auth:authReducer,
    paid:paidReducer,
    admin:adminReducer,
    token:adminReducer,
    password:adminReducer,
    profile:paidReducer,
    statistic:adminReducer,
    comments:paidReducer,
    group:paidReducer,
    ordersStatistic:adminReducer,


});

const setupStore =()=> configureStore({
    reducer:rootReducer,

    middleware: [
        // eslint-disable-next-line
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ]

    });

export {
    setupStore
}