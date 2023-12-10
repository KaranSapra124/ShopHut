import { createSlice } from "@reduxjs/toolkit";
// import { BackendUrl } from "../Secret/FrontendSecret";


const UserDataReducer = createSlice({
    name: "UserData",
    initialState: {
        User_Data: ""
    },
    reducers: {
        Add_User: (state, action) => {
           state.User_Data = action.payload
        },
      

    }
})
export const { Add_User } = UserDataReducer.actions
export default UserDataReducer.reducer;