import { createSlice } from "@reduxjs/toolkit";
import UserDataContext from "../utils/UserData";
import { useContext } from "react";
import { setCookie } from "../Cookies/CookieFunc";



const cartReducer = createSlice({
    name: "EcommCart",
    initialState: {
        Items: []
    },
    reducers: {
        Add_Item: (state, action) => {
            // console.log(action.payload);
            state.Items.push(action.payload)
            // console.log(state);
            // setCookie("Cart_Data",JSON.stringify(state.Items),10)
            

        },
        Decrement_Item: (state, action) => {
            const ExistingItem = state.Items.find((elem) => {
                return elem.id === action.payload
            })
            if (ExistingItem) {
                ExistingItem.Quantity -= 1;
            }
        },
        Increment_Item: (state, action) => {
            const ExistingItem = state.Items.find((elem) => {
                return elem.id === action.payload
            })
            if (ExistingItem) {
                ExistingItem.Quantity += 1;
            }
        },
        Remove_Item: (state, action) => {
            // console.log(action.payload);
            const FilteredArr = state.Items.filter((elem) => {
                // console.log(elem.id);
                return elem.id !== action.payload
            })
            state.Items = FilteredArr
            // setCookie("Cart_Data",JSON.stringify(state.Items),10)

        }
    }
})
export const { Add_Item, Decrement_Item, Increment_Item, Remove_Item } = cartReducer.actions
export default cartReducer.reducer;