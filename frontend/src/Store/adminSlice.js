import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    //define here
    status:false,
    role:'',
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storelogin: (state,action) => {
           console.log("into store ",action.payload);
           state.status=true;
           state.role = action.payload.role;
        },
        storelogout: (state) => {
            state.status=false;
            state.role='';
        }
    }
})
export const { storelogin,storelogout } = authSlice.actions;
export default authSlice.reducer