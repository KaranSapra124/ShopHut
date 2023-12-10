import {configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducers";
import UserReducers from "./reducers/UserReducers";

const ReduxReducers = {
    EcommCart:cartReducer,
    UseReducers:UserReducers
}
const store = configureStore({
    reducer:ReduxReducers
})

export default store;