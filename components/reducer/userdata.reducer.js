import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";



const UserData  = createSlice({
    name:"userdata",
    initialState:{
        userinfo:{}
    },
    reducers: {
        setUserData: (state, {payload: {data}})=>{
            state.userinfo = data
        }
    }
})

export const {setUserData} = UserData.actions
export default UserData.reducer